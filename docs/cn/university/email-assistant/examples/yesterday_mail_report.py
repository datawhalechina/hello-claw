from __future__ import annotations

import email
import imaplib
import json
import os
import re
from datetime import datetime, timedelta
from email.header import decode_header
from email.utils import parsedate_to_datetime
from pathlib import Path

from dotenv import dotenv_values

MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]


def require_config(config: dict[str, str], name: str) -> str:
    value = (os.getenv(name) or config.get(name, "")).strip()
    if not value:
        raise RuntimeError(f"missing required config: {name}")
    return value


def mask_email(value: str) -> str:
    local, _, domain = value.partition("@")
    if not local or not domain:
        return "***"
    if len(local) <= 4:
        masked_local = local[0] + "***"
    else:
        masked_local = local[:3] + "***" + local[-2:]
    return f"{masked_local}@{domain}"


def decode_imap_items(items: list[bytes] | tuple[bytes, ...] | None) -> list[str]:
    decoded: list[str] = []
    for item in items or []:
        if isinstance(item, bytes):
            decoded.append(item.decode("utf-8", errors="replace"))
        else:
            decoded.append(str(item))
    return decoded


def decode_mime_words(value: str) -> str:
    if not value:
        return ""
    parts = decode_header(value)
    decoded: list[str] = []
    for text, encoding in parts:
        if isinstance(text, bytes):
            decoded.append(text.decode(encoding or "utf-8", errors="replace"))
        else:
            decoded.append(str(text))
    return "".join(decoded)


def parse_mailbox_name(line: bytes | str) -> str:
    text = line.decode("utf-8", errors="replace") if isinstance(line, bytes) else str(line)
    quoted = re.findall(r'"([^"]+)"', text)
    if quoted:
        return quoted[-1]
    parts = text.split()
    return parts[-1] if parts else ""


def clean_text(value: str) -> str:
    value = re.sub(r"<[^>]+>", " ", value)
    value = re.sub(r"\s+", " ", value)
    return value.strip()


def extract_text_preview(message: email.message.Message, max_chars: int = 160) -> str:
    text_candidates: list[str] = []

    if message.is_multipart():
        for part in message.walk():
            content_type = part.get_content_type()
            content_disposition = (part.get("Content-Disposition") or "").lower()
            if "attachment" in content_disposition:
                continue
            if content_type not in {"text/plain", "text/html"}:
                continue
            payload = part.get_payload(decode=True)
            if payload is None:
                continue
            charset = part.get_content_charset() or "utf-8"
            text = payload.decode(charset, errors="replace")
            text_candidates.append(clean_text(text))
    else:
        payload = message.get_payload(decode=True)
        if payload is not None:
            charset = message.get_content_charset() or "utf-8"
            text_candidates.append(clean_text(payload.decode(charset, errors="replace")))

    for candidate in text_candidates:
        if candidate:
            return candidate[:max_chars]
    return ""


def send_imap_id(mail: imaplib.IMAP4_SSL) -> None:
    capability_status, capability_data = mail.capability()
    if capability_status != "OK":
        return

    capability_blob = " ".join(decode_imap_items(capability_data)).upper()
    if " ID" not in f" {capability_blob} ":
        return

    id_payload = (
        '("name" "hello-claw-mail-report" '
        '"version" "1.0" '
        '"vendor" "datawhale" '
        '"support-url" "https://github.com/datawhalechina/hello-claw")'
    )
    mail.xatom("ID", id_payload)


def select_mailbox(mail: imaplib.IMAP4_SSL, preferred_folder: str) -> str:
    list_status, mailboxes = mail.list()
    available_folders: list[str] = []
    if list_status == "OK" and mailboxes:
        available_folders = [parse_mailbox_name(item) for item in mailboxes if item]

    candidates: list[str] = []
    for item in [preferred_folder, "INBOX", "Inbox", *available_folders]:
        name = item.strip()
        if name and name not in candidates:
            candidates.append(name)

    for candidate in candidates:
        for actual in [candidate, f'"{candidate}"']:
            if actual != candidate and '"' in candidate:
                continue
            for readonly in [True, False]:
                select_status, _ = mail.select(actual, readonly=readonly)
                if select_status == "OK":
                    return actual

    raise RuntimeError("failed to select mailbox")


def format_imap_date(value: datetime.date) -> str:
    return f"{value.day:02d}-{MONTHS[value.month - 1]}-{value.year}"


def fetch_yesterday_emails(
    mail: imaplib.IMAP4_SSL, folder: str
) -> tuple[str, list[dict[str, str]], datetime.date, datetime.date]:
    selected_folder = select_mailbox(mail, folder)

    today = datetime.now().astimezone().date()
    yesterday = today - timedelta(days=1)
    since_date = format_imap_date(yesterday)
    before_date = format_imap_date(today)

    search_status, data = mail.search(None, "SINCE", since_date, "BEFORE", before_date)
    if search_status != "OK":
        raise RuntimeError("failed to search mailbox")

    message_ids = data[0].split()
    items: list[dict[str, str]] = []

    for message_id in reversed(message_ids):
        fetch_status, fetch_data = mail.fetch(message_id, "(BODY.PEEK[])")
        if fetch_status != "OK" or not fetch_data or fetch_data[0] is None:
            continue

        raw_message = fetch_data[0][1]
        if not isinstance(raw_message, bytes):
            continue

        message = email.message_from_bytes(raw_message)
        date_value = message.get("Date", "")
        try:
            parsed_date = parsedate_to_datetime(date_value)
            date_text = parsed_date.astimezone().strftime("%Y-%m-%d %H:%M:%S %z")
        except Exception:
            date_text = date_value

        items.append(
            {
                "subject": decode_mime_words(message.get("Subject", "")),
                "from": decode_mime_words(message.get("From", "")),
                "date": date_text,
                "preview": extract_text_preview(message),
            }
        )

    return selected_folder, items, yesterday, today


def main() -> None:
    env_path = Path(__file__).with_name(".env")
    config = {k: (v or "") for k, v in dotenv_values(env_path, encoding="utf-8-sig").items()}

    host = require_config(config, "MAIL_HOST")
    port = int((os.getenv("MAIL_PORT") or config.get("MAIL_PORT") or "993").strip())
    user = require_config(config, "MAIL_USER")
    password = require_config(config, "MAIL_PASSWORD")
    folder = (os.getenv("MAIL_FOLDER") or config.get("MAIL_FOLDER") or "INBOX").strip() or "INBOX"

    mail = None
    try:
        mail = imaplib.IMAP4_SSL(host, port)
        mail.login(user, password)
        send_imap_id(mail)
        selected_folder, items, report_date, today = fetch_yesterday_emails(mail, folder)
        result = {
            "mailbox": mask_email(user),
            "folder": selected_folder,
            "report_date": report_date.isoformat(),
            "window": {
                "since": report_date.isoformat(),
                "before": today.isoformat(),
            },
            "total_messages": len(items),
            "items": items,
        }
        print(json.dumps(result, ensure_ascii=False, indent=2))
    finally:
        try:
            if mail is not None:
                mail.logout()
        except Exception:
            pass


if __name__ == "__main__":
    main()
