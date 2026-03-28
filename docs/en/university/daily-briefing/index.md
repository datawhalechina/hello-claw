# Lobster University: Morning Briefing Automation (Weather + Calendar + To-Dos)

> **Use case**: Every morning before work, you're switching between your weather app, calendar, and task tool — what should take 5 minutes often turns into 20; and the conflict alerts and priorities that matter most are the easiest things to miss. The goal of this scenario is: **at a fixed time each day, one message tells you "what deserves your attention most today."**

This article does one thing: integrate "weather + calendar + to-dos" into a reusable morning briefing workflow. Get the minimum closed loop running first, feel the security of knowing your day's rhythm in 30 seconds, then gradually add fields to match your habits.

## 1. What This Article Helps You Accomplish

Once set up, you'll receive a consistent structured morning briefing every day containing at least three blocks of information:

- Today's weather and comfort reminder (whether to bring an umbrella, whether there's a temperature swing)
- Calendar conflicts and key meetings (prioritize "conflicts" and "first meeting of the day")
- Top 3 to-dos (by priority, not quantity)

This lets you:

- Stop switching between 3 to 5 apps before starting work
- Surface risks early (late arrival risk, scheduling conflicts, task overload)
- Complete your daily plan launch in under 30 seconds every morning

## 2. Copy This Prompt to Lobster First

```text
Please help me set up a "Morning Briefing Automation" workflow:
1) Generate a briefing in English every weekday at 07:50
2) Include only: today's weather, today's schedule and conflicts, Top 3 to-dos
3) Each section is at most 3 lines; close with one "Today's Recommendation"
4) If a data source fails, don't error out the whole thing — write "currently unavailable" and output the remaining sections
5) Send all results via Feishu; on failure, prompt directly with "Please manually check source data"
```

If you also want to emphasize task priority:

```text
For to-dos, only keep P1/P2 or tasks due today — do not output a long list.
```

## 3. Which Skills You Need

Here's what each Skill does:

- `skill-vetter`
  Link: <https://llmbase.ai/openclaw/skill-vetter/>
  Purpose: Security check before installation to avoid adding untrusted skills.
- `weather`
  Link: <https://playbooks.com/skills/openclaw/openclaw/weather>
  Purpose: Provides weather and comfort reminders — the weather source in the briefing.
- `caldav-calendar`
  Link: <https://playbooks.com/skills/openclaw/skills/caldav-calendar>
  Purpose: Read the schedule and detect conflicts.
- `todoist`
  Link: <https://playbooks.com/skills/openclaw/skills/todoist>
  Purpose: Read to-dos and filter out what truly matters.
- `feishu-send-message`
  Link: <https://playbooks.com/skills/openclaw/skills/feishu-send-message>
  Purpose: Deliver the compiled briefing to Feishu.

Installation commands:

```bash
clawhub install skill-vetter
clawhub install weather
clawhub install caldav-calendar
clawhub install todoist
clawhub install feishu-send-message
```

| Skill | Purpose | Without It |
| --- | --- | --- |
| `skill-vetter` | Security check before skill installation | May add untrusted skills directly to production |
| `weather` | Provides weather and temperature-swing alerts | Briefing lacks weather context, suggestions are incomplete |
| `caldav-calendar` | Read schedule and detect conflicts | Cannot alert on double-bookings or late-arrival risk |
| `todoist` | Pull tasks and filter by priority | To-dos become a "long list" that's hard to act on |
| `feishu-send-message` | Push to Feishu at a fixed time | Requires manual triggering, unreliable |

## 4. What You'll See Once It's Running

```text
[Morning Briefing | 2026-03-25 Wednesday]
Weather: Cloudy, 16–24°C, afternoon showers, feels warm
Schedule: 09:30 Product Review; 14:00 Client Sync (conflicts with 14:00 Delivery Standup)
Top 3 To-Dos: 1) Complete regression check 2) Write weekly report 3) Follow up with Client A
Today's Recommendation: Resolve the conflict first; send regression results before 16:00.
```

## 5. How to Set It Up Step by Step

### Step 1: Install and Verify Skills

Install each skill listed above, then query weather, calendar, and to-dos individually to confirm all three return data successfully.

### Step 2: Lock In the Briefing Template

Use this fixed structure:

```text
[Morning Briefing | Today]
Weather: Cloudy (16–24°C), feels warm
Schedule: 09:30 Product Review; 14:00 Client Sync
Conflict: 14:00 overlaps with Delivery Standup
Top 3 To-Dos: 1) Regression check 2) Weekly report 3) Follow up Client A
Recommendation: Resolve conflict first, then enter deep work.
```

### Step 3: Add a `cron` Trigger

```
openclaw cron add \
  --name "morning-briefing" \
  --cron "50 7 * * 1-5" \
  --message "Please generate today's morning briefing: weather, schedule/conflicts, Top 3 to-dos, and close with one 'Today's Recommendation'."
```

### Step 4: Prepare Fallback Handling

When any data source fails, write "currently unavailable" and ensure the currently available content is still pushed.

## 6. If There's No Ready-Made Skill, Have Claw Build One

If the Feishu push channel is missing capabilities, use `openclaw cron` first to set up a "failure alert" action:

```text
If the Feishu push fails, just return "Current notification channel is unavailable" — I will publish manually.
```

## 7. Further Optimization

- To add more sections, add "Key Reminders" or "Today's Wins" to the template.
- For midday or evening coverage, stabilize the morning briefing first and then add an additional `cron`.

## 8. FAQ

**Q1: The briefing is too long to read through. What do I do?**
A: Limit each section to at most 3 lines and keep just one "recommended action."

**Q2: To-dos always pull in many low-priority tasks?**
A: Explicitly state "only output P1/P2 or tasks due today" in the prompt and cap it at 3 items.

**Q3: It's also pushing on weekends and disrupting my rest?**
A: Change the `cron` to a weekdays-only expression: `1-5`.

**Q4: Schedule conflicts aren't being detected?**
A: Explicitly ask the model to "check for time overlaps and mark the conflict window" in the instruction — don't just ask it to "list the schedule."
