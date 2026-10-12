# 163 Mail IMAP Examples: Quick Setup and Getting It Running

The goal of this directory is minimal:
Use as few files as possible to verify whether a Python script can read 163 mail.

The real connectivity verification for these examples was done in `WSL Ubuntu`.
But the Python mail-reading logic here is not bound to `WSL` — as long as your local Python environment can reach `imap.163.com:993`, you can follow along.

## Directory Contents

- `.env.example`: example configuration
- `.env`: your real local configuration, should not be committed
- `requirements.txt`: minimal dependencies
- `imap_connect_test.py`: connectivity and read test script
- `yesterday_mail_report.py`: reads "yesterday's" mail and outputs structured JSON
- `openclaw_setup_prompt.md`: prompt templates for having the lobster save scripts and set up cron itself

## Up and Running in 3 Minutes

### Step 1: Prepare `.env`

Copy `.env.example` to `.env`, then fill in your own account and authorization code:

```env
MAIL_HOST=imap.163.com
MAIL_PORT=993
MAIL_USER=your_name@163.com
MAIL_PASSWORD=replace_with_authorization_code
MAIL_FOLDER=INBOX
MAIL_FETCH_LIMIT=5
```

The most commonly filled-in-incorrectly fields:

- `MAIL_HOST` should be `imap.163.com`, not the web address `email.163.com`
- `MAIL_PASSWORD` should be the authorization code, not the web login password
- `MAIL_FETCH_LIMIT` controls how many of the most recent emails to read

### Step 2: Install Dependencies

If you have `python` locally:

```bash
pip install -r requirements.txt
```

If you prefer to use `uv` directly, you can skip separate installation and bring in dependencies at runtime:

```bash
uv run --with python-dotenv imap_connect_test.py
```

### Step 3: Run the Script

If you have `python` locally:

```bash
python imap_connect_test.py
```

If you are using `uv`:

```bash
uv run --with python-dotenv imap_connect_test.py
```

## What a Successful Run Looks Like

The script outputs a JSON block that will roughly contain:

- Whether the connection succeeded
- Whether login succeeded
- Whether the server supports `IMAP ID`
- The mailbox folder actually selected
- Total message count in the mailbox
- Subject, sender, date, and preview for the most recent `N` emails

If everything is working, you will see fields similar to these:

```json
{
  "tcp_tls": "success",
  "login_status": "OK",
  "connection": "login_success",
  "imap_id": {
    "id_supported": true,
    "id_sent": true,
    "id_status": "OK"
  },
  "mailbox": {
    "folder": "INBOX",
    "total_messages": 5,
    "fetched_items": [
      {
        "message_id": "5",
        "subject": "New device login alert",
        "from": "NetEase Mail Account Security <safe@service.netease.com>",
        "date": "Sat, 14 Mar 2026 11:59:43 +0800 (CST)",
        "preview": "..."
      }
    ]
  },
  "result": "success"
}
```

## What This Script Does Differently

Compared to a basic IMAP example, this script does one extra thing that is critical for 163:

- After `LOGIN`, it sends an `IMAP ID` first

If this step is missing, 163 may flag the script as an `Unsafe Login`.
This is not a theoretical concern — it is behavior that has been confirmed in real testing with the scripts in this directory.

## Handing It Over to OpenClaw / the Lobster

If you want the lobster to automatically report yesterday's mail every day rather than running it manually, it is worth separating responsibilities into three layers:

- Code layer: only reads the mailbox, filters by date, outputs structured results
- Prompt layer: handles categorization, summarization, tone, and report format
- Scheduler layer: handles when to trigger each day

### 1. Where to Put the Script

For the first version, the easiest approach is not to package it as a Skill right away, but to put the script directly in the lobster's current working directory.

A directory structure that works:

```text
your-openclaw-workspace/
  .env
  scripts/
    yesterday_mail_report.py
```

The recommended approach is to reuse this file directly:

- `examples/yesterday_mail_report.py`

If you prefer to "have the lobster save the script via conversation," you can reuse:

- `examples/openclaw_setup_prompt.md`

### 2. Where to Put Environment Variables

According to this repository's OpenClaw configuration documentation, the environment variable priority order is:

1. Parent process environment variables
2. `.env` in the current working directory
3. `~/.openclaw/.env`

So the shortest path is: put the mail-related variables in the **current working directory's `.env`**.

```env
MAIL_HOST=imap.163.com
MAIL_PORT=993
MAIL_USER=your_name@163.com
MAIL_PASSWORD=replace_with_authorization_code
MAIL_FOLDER=INBOX
```

### 3. How to Write the Prompt

Do not have the code directly generate the "daily report content."
The more reliable approach is to have the script output JSON, then have the lobster report based on the prompt.

You can give the lobster this prompt directly:

```text
Please run scripts/yesterday_mail_report.py in the current working directory.

Read the JSON output from the script and report only the mail from yesterday 00:00-23:59.

Organize the output into four categories:
1. Needs my attention
2. Security alerts
3. System notifications
4. Ignorable mail

For each email, keep only:
- Subject
- Sender
- Time
- One-sentence summary

End with a "Today's Priority Items" section.

If total_messages = 0, simply tell me: no new mail to report from yesterday.
```

### 4. Setting a Daily 9 AM Schedule

OpenClaw supports `cron` tasks.
If you want it to automatically report every morning at 9 AM, use:

```bash
openclaw cron add \
  --name "163 Yesterday Mail Summary" \
  --cron "0 9 * * *" \
  --session isolated \
  --message "Please run scripts/yesterday_mail_report.py in the current working directory. Read the JSON output and report only mail from yesterday 00:00-23:59, organized into: needs my attention, security alerts, system notifications, ignorable mail; if total_messages = 0, just tell me there is no new mail to report from yesterday." \
  --announce
```

Then confirm the task was created with:

```bash
openclaw cron list --json
```

Per this repository's documentation, tasks scheduled on the hour may be automatically spread across the `0-5` minute window.
So "9 AM" is more accurately described as a morning task targeting `9:00` as its trigger point.

### 4.1 If Your OpenClaw Is Running in WSL

If you are on the same Windows + WSL Ubuntu setup as the current test environment, two extra things to keep in mind:

- Start the gateway first, then test `cron`
- Use `cron list --json` as the default check; it makes it easier to confirm actual task state

In this test run, WSL required running this first:

```bash
systemctl --user start openclaw-gateway.service
```

Then:

```bash
openclaw cron status
openclaw cron list --json
```

If you run commands immediately after the gateway restarts, you may encounter:

```text
gateway closed (1006 abnormal closure)
```

The safer approach is to wait `2-3` seconds first, then retry.

This is more reliable.
In the current WSL environment, it is also recommended to use `cron list --json` as the primary check command: it is better suited for confirming actual task state and easier to integrate into automation later.

### 5. When to Package It as a Skill

If you are just getting it working for yourself, the current working directory + `.env` + `scripts/` is enough.
If you later want long-term reuse, or want multiple workspaces to be able to call it directly, then packaging it as a workspace skill is the right move.

The workspace skill location given in this repository's documentation is:

```text
~/.openclaw/workspace/skills/
```

### 6. Both Command-Based and Prompt-Based Are Valid Paths

There are actually two valid paths here:

- Command-based: you put the script yourself, create `.env` yourself, run `openclaw cron add` yourself
- Prompt-based: you send the script as an attachment to the lobster, and have it save the file and create the scheduled task itself

If this is your first time setting up this email assistant, the recommended approach is:

1. Use the command-based path to get the pipeline working first
2. Then use the prompt-based path to hand it over to the lobster

## What to Check When Things Fail

### 1. `LOGIN` Fails

Check first:

- Whether the authorization code is correct
- Whether `IMAP/SMTP` was successfully enabled on the web interface
- Whether you accidentally used the web login password

### 2. `LOGIN` Succeeds but Reading Mail Fails Afterward

Check first:

- Whether the script sends `IMAP ID`
- Whether the server has temporarily triggered a security block
- Whether the current network environment differs significantly from your usual login environment

### 3. Subject Reads Fine but Body Preview Looks Like a Pile of CSS

This is normal.
Many marketing emails and system notifications use HTML templates. The first version of the script is for connectivity and basic read verification, not a full body text cleaner.

## Offline Regression Tests

After installing the dependencies above, run this from the repository root:

```bash
python -m unittest discover -s tests -v
```

The tests use real `imaplib` and a local IMAP protocol fixture to check the CN/EN scripts and tutorial code, including message content and read flags. They require no mailbox account and never connect to a real mailbox. Both reading scripts use `BODY.PEEK[]`, preserving read/unread state even when `EXAMINE` fails and selection falls back to `SELECT`.

## What to Add Next

- Read only unread mail
- Extract body text more cleanly
- Download attachments
- Filter by sender or subject
- Scheduled polling
