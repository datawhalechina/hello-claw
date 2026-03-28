# More Scenarios in Practice: Smart Home Control Assistant

> **Use case**: Home devices keep multiplying — lights, air conditioners, door locks, and cameras are scattered across different apps. You want a single entry point to automate control while keeping everything safe and manageable. This guide corresponds to the README scenario "Smart Home Control."

The biggest risk in smart home automation is "runaway automation." This guide puts safety boundaries and transparent feedback first, turning the three scenarios — arriving home, leaving home, and bedtime — into reusable, safe control flows.

## 1. What This Guide Can Help You With

- Trigger "arrive home", "leave home", or "sleep" modes with a single voice command or text message
- Low-risk tasks driven by weather and time (e.g., auto-close windows when it rains, auto-turn off lights at night) can go live directly
- High-risk devices (door locks, cameras, access control) will request confirmation before acting
- Failure retry + Feishu alerts are included to ensure someone is notified even when unattended

## 2. Copy This Prompt to Claw First

```text
Please help me build a "Smart Home Control Assistant" workflow:
1) Support three scenarios: arrive home, leave home, and sleep
2) Low-risk devices can execute automatically; high-risk devices (door locks / cameras) must be confirmed first
3) Weather and time trigger low-risk actions, e.g., close windows when it rains, turn off lights at night
4) After each execution, return a structured result: "Actions Taken / Current Status / Next Suggestion"
5) If execution fails, retry once, then send an alert
6) All output in English
```

## 3. Which Skills Are Needed

Here's what each Skill does:

- `skill-vetter`
  Link: <https://llmbase.ai/openclaw/skill-vetter/>
  Purpose: Safety check before installation.
- `home-assistant`
  Link: <https://playbooks.com/skills/openclaw/skills/home-assistant>
  Purpose: Unified control entry point for home devices.
- `weather`
  Link: <https://playbooks.com/skills/openclaw/openclaw/weather>
  Purpose: Trigger actions based on weather conditions, e.g., close windows when it rains.
- `feishu-send-message`
  Link: <https://playbooks.com/skills/openclaw/skills/feishu-send-message>
  Purpose: Send execution results and exception alerts.

Installation commands:

```bash
clawhub install skill-vetter
clawhub install home-assistant
clawhub install weather
clawhub install feishu-send-message
```

`feishu-send-message` security analysis page: <https://vett.sh/skills/clawhub.ai/lycohana/feishu-send-message>

For scheduling, the recommended approach is to use `openclaw cron` first and then set up Feishu reminders based on your team's preferences. The `feishu-cron-reminder` slug has not been fully confirmed as a public skill yet.

## 4. What You'll See Once It's Working

```text
[Arrive Home Mode]
Actions: lights on, AC adjusted (low-risk devices executed), high-risk devices awaiting "confirm execution"
Suggestion: Reply "arrive home mode + soft lighting" to turn on ambient lights

[Leave Home Mode]
Actions: lights off, power outlets off
Status: door lock / camera pending confirmation, exception alert sent
```

## 5. How to Configure It Step by Step

1. Classify devices by risk level (low: lights/curtains; medium: AC/humidifier; high: door locks/cameras)
2. Solidify three base scenarios (arrive home / leave home / sleep), defining actions and alert conditions for each
3. Set up two-step confirmation logic for high-risk devices: push a confirmation message first; only act upon receiving "confirm execution"
4. Define failure retry and fallback actions: fail → retry → if still failing, execute safe action and send alert
5. Use `openclaw cron` to schedule nightly uptime checks and weekend abnormal power consumption reports

## 6. If There's No Ready-Made Skill, Have Claw Build One

If there's no stable "Feishu scheduled reminder" skill available yet, send this message directly to Claw:

```text
Please generate a minimal viable home reminder skill that handles execution result notifications, failure alerts, and daily inspection summaries. The first version just needs to be able to send messages and output status.
```

If you want to take it further, turn it into a minimal `home-ops-reminder`:

```text
home-ops-reminder/
├── SKILL.md
└── scripts/
    └── notify.py
```

In `SKILL.md`, specify that this skill handles result notifications, failure alerts, and periodic inspections. In `notify.py`, implement three modes first (`result` / `alert` / `daily-check`), then invoke it with `openclaw cron`.

## 7. Further Optimization

- Connect an "occupancy" variable so that leave-home mode only turns off the AC when no one is home.
- Assign default device groups to each scenario (e.g., "arrive home mode" only turns on the living room light and TV by default).
- Add automation alerts based on device power consumption — if a device's power usage spikes, notify first before replacing it.

## 8. Frequently Asked Questions

**Q1: Devices from too many brands keep failing to link — what should I do?**
A: Start by connecting your high-frequency devices to Home Assistant, then expand gradually.

**Q2: Family members don't understand commands — the barrier to use is too high?**
A: Replace commands with scene-based phrases like "activate arrive home mode" — don't expose technical commands.

**Q3: Worried about accidental actions causing safety issues?**
A: Require two-step confirmation for high-risk actions, and always keep a manual emergency kill switch available.
