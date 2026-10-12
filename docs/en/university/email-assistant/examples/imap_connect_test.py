from __future__ import annotations

import email
import imaplib
import json
import os
import re
from pathlib import Path
from email.header import decode_header

from dotenv import dotenv_values


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


def parse_mailbox_name(line: bytes | str) -> str:
    text = line.decode("utf-8", errors="replace") if isinstance(line, bytes) else str(line)
    quoted = re.findall(r'"([^"]+)"', text)
    if quoted:
        return quoted[-1]
    parts = text.split()
    return parts[-1] if parts else ""


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


def clean_text(value: str) -> str:
    value = re.sub(r"<[^>]+>", " ", value)
    value = re.sub(r"\s+", " ", value)
    return value.strip()


def extract_text_preview(message: email.message.Message, max_chars: int = 120) -> str:
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


def send_imap_id(mail: imaplib.IMAP4_SSL) -> dict[str, object]:
    capability_status, capability_data = mail.capability()
    decoded_capabilities = decode_imap_items(capability_data)
    capability_blob = " ".join(decoded_capabilities).upper()

    result: dict[str, object] = {
        "capability_status": capability_status,
        "capabilities": decoded_capabilities,
        "id_supported": " ID" in f" {capability_blob} ",
    }

    if not result["id_supported"]:
        result["id_sent"] = False
        return result

    id_payload = (
        '("name" "hello-claw-imap-test" '
        '"version" "1.0" '
        '"vendor" "datawhale" '
        '"support-url" "https://github.com/datawhalechina/hello-claw")'
    )
    id_status, id_data = mail.xatom("ID", id_payload)
    result["id_sent"] = True
    result["id_status"] = id_status
    result["id_response"] = decode_imap_items(id_data)
    return result


def select_mailbox(mail: imaplib.IMAP4_SSL, preferred_folder: str) -> tuple[str, list[str]]:
    list_status, mailboxes = mail.list()
    available_folders: list[str] = []
    if list_status == "OK" and mailboxes:
        available_folders = [parse_mailbox_name(item) for item in mailboxes if item]

    candidates: list[str] = []
    attempts: list[str] = []
    for item in [preferred_folder, "INBOX", "Inbox", *available_folders]:
        name = item.strip()
        if name and name not in candidates:
            candidates.append(name)

    for candidate in candidates:
        for actual in [candidate, f'"{candidate}"']:
            if actual != candidate and '"' in candidate:
                continue
            for readonly in [True, False]:
                select_status, select_data = mail.select(actual, readonly=readonly)
                command_name = "EXAMINE" if readonly else "SELECT"
                attempts.append(f"{command_name} {actual} => {select_status} {select_data}")
                if select_status == "OK":
                    return actual, available_folders

    raise RuntimeError(
        "failed to select any mailbox; available folders: "
        + ", ".join(available_folders or ["<none>"])
        + " | attempts: "
        + " ; ".join(attempts)
    )


def fetch_latest_metadata(mail: imaplib.IMAP4_SSL, folder: str, limit: int) -> dict[str, object]:
    selected_folder, available_folders = select_mailbox(mail, folder)

    search_status, data = mail.search(None, "ALL")
    if search_status != "OK":
        raise RuntimeError("failed to search mailbox")

    message_ids = data[0].split()
    total_messages = len(message_ids)
    latest_ids = message_ids[-max(limit, 1):]

    latest_items: list[dict[str, object]] = []
    for message_id in reversed(latest_ids):
        fetch_status, fetch_data = mail.fetch(message_id, "(BODY.PEEK[])")
        if fetch_status != "OK" or not fetch_data or fetch_data[0] is None:
            continue

        raw_message = fetch_data[0][1]
        if not isinstance(raw_message, bytes):
            continue

        message = email.message_from_bytes(raw_message)

        latest_items.append(
            {
                "message_id": message_id.decode(),
                "subject": decode_mime_words(message.get("Subject", "")),
                "from": decode_mime_words(message.get("From", "")),
                "date": message.get("Date", ""),
                "preview": extract_text_preview(message),
            }
        )

    return {
        "folder": selected_folder,
        "available_folders": available_folders,
        "total_messages": total_messages,
        "fetched_items": latest_items,
    }


def main() -> None:
    env_path = Path(__file__).with_name(".env")
    config = {k: (v or "") for k, v in dotenv_values(env_path, encoding="utf-8-sig").items()}

    host = require_config(config, "MAIL_HOST")
    port = int((os.getenv("MAIL_PORT") or config.get("MAIL_PORT") or "993").strip())
    user = require_config(config, "MAIL_USER")
    password = require_config(config, "MAIL_PASSWORD")
    folder = (os.getenv("MAIL_FOLDER") or config.get("MAIL_FOLDER") or "INBOX").strip() or "INBOX"
    limit = int((os.getenv("MAIL_FETCH_LIMIT") or config.get("MAIL_FETCH_LIMIT") or "1").strip())

    result: dict[str, object] = {
        "host": host,
        "port": port,
        "user": mask_email(user),
    }

    mail = None
    try:
        mail = imaplib.IMAP4_SSL(host, port)
        result["tcp_tls"] = "success"
        login_status, _ = mail.login(user, password)
        result["login_status"] = login_status
        result["connection"] = "login_success"
        result["imap_id"] = send_imap_id(mail)
        result["mailbox"] = fetch_latest_metadata(mail, folder, limit)
        result["result"] = "success"
    except Exception as exc:
        result["result"] = "error"
        result["error"] = str(exc)
        print(json.dumps(result, ensure_ascii=False, indent=2))
        raise SystemExit(1)
    finally:
        try:
            if mail is not None:
                mail.logout()
        except Exception:
            pass

    print(json.dumps(result, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
