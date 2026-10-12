"""Offline IMAP protocol regressions for the CN/EN email examples."""

import contextlib
import imaplib
import importlib.util
import os
from pathlib import Path
import re
import socketserver
import threading
import types
import unittest
from unittest.mock import patch


ROOT = Path(__file__).resolve().parents[1]
MESSAGE = (
    b"Subject: Example message\r\nFrom: sender@example.com\r\n"
    b"Date: Mon, 12 Oct 2026 09:00:00 +0800\r\n"
    b"Content-Type: text/plain; charset=utf-8\r\n\r\nExample body.\r\n"
)


class IMAPHandler(socketserver.StreamRequestHandler):
    """Scripted IMAP peer: RFC822 sets Seen; BODY.PEEK[] does not (RFC 3501)."""

    def handle(self):
        self.wfile.write(b"* OK Offline test server\r\n")
        readonly = False
        while line := self.rfile.readline():
            tag, command, *rest = line.rstrip(b"\r\n").split(b" ", 2)
            args = rest[0] if rest else b""
            self.server.commands.append(command)
            status = b"OK"
            if command == b"CAPABILITY":
                self.wfile.write(b"* CAPABILITY IMAP4rev1\r\n")
            elif command == b"LOGIN":
                pass
            elif command == b"LIST":
                self.wfile.write(b'* LIST () "/" "INBOX"\r\n')
            elif command in {b"EXAMINE", b"SELECT"}:
                if command == b"EXAMINE" and not self.server.allow_examine:
                    status = b"NO"
                else:
                    readonly = command == b"EXAMINE"
                    self.wfile.write(b"* 2 EXISTS\r\n* FLAGS (\\Seen)\r\n")
            elif command == b"SEARCH":
                self.wfile.write(b"* SEARCH 1 2\r\n")
            elif command == b"FETCH":
                message_id, attributes = args.split(b" ", 1)
                flags = self.server.flags[message_id]
                if attributes.upper() == b"(FLAGS)":
                    self.wfile.write(b"* " + message_id + b" FETCH (FLAGS ("
                                     + b" ".join(sorted(flags)) + b"))\r\n")
                elif attributes.upper() in {b"(RFC822)", b"(BODY.PEEK[])"}:
                    if not readonly and attributes.upper() == b"(RFC822)":
                        flags.add(b"\\Seen")
                    item = b"RFC822" if attributes.upper() == b"(RFC822)" else b"BODY[]"
                    self.wfile.write(b"* " + message_id + b" FETCH (" + item + b" {"
                                     + str(len(MESSAGE)).encode() + b"}\r\n" + MESSAGE
                                     + b")\r\n")
                else:
                    status = b"BAD"
            elif command == b"CLOSE":
                pass
            elif command == b"LOGOUT":
                self.wfile.write(b"* BYE Goodbye\r\n" + tag + b" OK LOGOUT completed\r\n")
                break
            else:
                status = b"BAD"
            self.wfile.write(tag + b" " + status + b" " + command + b" completed\r\n")


@contextlib.contextmanager
def mailbox(allow_examine):
    with socketserver.TCPServer(("127.0.0.1", 0), IMAPHandler) as server:
        server.allow_examine = allow_examine
        server.flags = {b"1": set(), b"2": {b"\\Seen"}}
        server.commands = []
        worker = threading.Thread(target=server.serve_forever, kwargs={"poll_interval": 0.01})
        worker.start()
        mail = None
        try:
            mail = imaplib.IMAP4(*server.server_address, timeout=2)
            yield mail, server
        finally:
            if mail is not None and mail.state != "LOGOUT":
                mail.logout()
            server.shutdown()
            worker.join(timeout=2)


def load_example(language, filename):
    path = ROOT / "docs" / language / "university/email-assistant/examples" / filename
    spec = importlib.util.spec_from_file_location("email_example", path)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


class EmailReadStateTests(unittest.TestCase):
    def test_examples_preserve_flags_with_examine_and_select_fallback(self):
        for language in ("cn", "en"):
            for filename in ("imap_connect_test.py", "yesterday_mail_report.py"):
                for allow_examine in (True, False):
                    with self.subTest(language=language, filename=filename, examine=allow_examine):
                        module = load_example(language, filename)
                        with mailbox(allow_examine) as (mail, server):
                            mail.login("offline", "offline")
                            if filename == "imap_connect_test.py":
                                result = module.fetch_latest_metadata(mail, "INBOX", 2)
                                items = result["fetched_items"]
                            else:
                                _, items, _, _ = module.fetch_yesterday_emails(mail, "INBOX")
                            self.assertEqual(len(items), 2)
                            self.assertEqual(items[0]["subject"], "Example message")
                            self.assertEqual(items[0]["preview"], "Example body.")
                            status, unread = mail.fetch(b"1", "(FLAGS)")
                            self.assertEqual(status, "OK")
                            self.assertNotIn(b"\\Seen", b" ".join(unread))
                            _, read = mail.fetch(b"2", "(FLAGS)")
                            self.assertIn(b"\\Seen", b" ".join(read))
                            self.assertEqual(b"SELECT" in server.commands, not allow_examine)

    def test_tutorial_code_preserves_unread_messages(self):
        for language in ("cn", "en"):
            with self.subTest(language=language):
                document = (ROOT / "docs" / language / "university/email-assistant/index.md").read_text(encoding="utf-8")
                code = next(code for code in re.findall(r"```python\n(.*?)```", document, re.S)
                            if "def fetch_recent_emails" in code)
                module = types.ModuleType("email_tutorial")
                exec(compile(code, "email-assistant/index.md", "exec"), module.__dict__)
                with mailbox(False) as (mail, server), patch.dict(os.environ, {
                    "MAIL_HOST": "offline.invalid", "MAIL_PORT": "993",
                    "MAIL_USER": "offline", "MAIL_PASSWORD": "offline",
                    "MAIL_FOLDER": "INBOX", "MAIL_FETCH_LIMIT": "2",
                }), patch.object(module.imaplib, "IMAP4_SSL", return_value=mail):
                    items = module.fetch_recent_emails()
                    self.assertEqual(len(items), 2)
                    self.assertEqual(items[0]["subject"], "Example message")
                    self.assertEqual(server.flags, {b"1": set(), b"2": {b"\\Seen"}})


if __name__ == "__main__":
    unittest.main(verbosity=2)
