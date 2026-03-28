# Lobster University: Smart Calendar Management (Conflict Detection + Scheduling + Meeting Notes)

> **Use case**: Your day is a constant cycle of "scheduling, rescheduling, writing up notes, and chasing action items." The real pain isn't that you don't know how to manage a calendar — it's that **schedules change too fast and coordination costs too much**. The goal of this button-style scenario is to upgrade calendar management from "recording events" to "driving outcomes."

This article focuses on a single, actionable closed loop: automated pre-meeting prep, structured in-meeting note capture, post-meeting action item tracking, and surfacing scheduling conflicts early enough to handle on the same day.

## 1. What This Article Helps You Accomplish

Once set up, you'll have a "calendar-driven execution" workflow:

- Daily automatic detection of conflicting meetings and high-risk time blocks
- Automatic pre-meeting prep checklists (goals, background, open questions)
- Automatic post-meeting summaries distributed with action items (owner + due date)

Common outcomes:

- Significantly fewer last-minute reschedules and double-bookings
- Higher meeting quality — no more "meeting ends, nothing happens"
- More trackable follow-through: who does what, by when, and how far along

## 2. Copy This Prompt to Lobster First

```text
Please help me set up a "Smart Calendar Management" workflow:
1) Daily scan of today's and the next 3 days' schedule
2) Automatically detect conflicting meetings, overlong meetings (>90 min), and meetings with no agenda
3) For key meetings, auto-generate a pre-meeting prep checklist: goals, decision points, required materials, open questions
4) After each meeting, auto-generate minutes that must include: conclusions, decisions, risks, action items, owners, and due dates
5) Send a daily reminder for overdue action items and push results to Feishu
6) All output in English — lead with a summary, then a detailed version
```

For external client meetings, add:

```text
When an external meeting is rescheduled, first generate a draft email for my review before sending.
```

## 3. Which Skills You Need

Here's what each Skill does:

- `skill-vetter`
  Link: <https://llmbase.ai/openclaw/skill-vetter/>
  Purpose: Security scan before installation to prevent high-risk skills from entering your workflow.
- `caldav-calendar`
  Link: <https://playbooks.com/skills/openclaw/skills/caldav-calendar>
  Purpose: Read schedules, detect conflicts, create calendar events.
- `feishu-send-message`
  Link: <https://playbooks.com/skills/openclaw/skills/feishu-send-message>
  Purpose: Send reminders, meeting minutes, and daily scan results.
- `agentmail`
  Link: <https://docs.agentmail.to/integrations/openclaw>
  Purpose: Handle external scheduling emails and confirmation emails.
- `todoist`
  Link: <https://playbooks.com/skills/openclaw/skills/todoist>
  Purpose: Write post-meeting action items into your task management system.

Installation commands:

```bash
clawhub install skill-vetter
clawhub install caldav-calendar
clawhub install feishu-send-message
clawhub install agentmail
clawhub install todoist
```

| Skill | Purpose | Without It |
| --- | --- | --- |
| `skill-vetter` | Security scan before installation | Hard to identify high-risk skills in time |
| `caldav-calendar` | Free/busy lookup, conflict detection, event creation | Core meeting scheduling capability |
| `feishu-send-message` | Push reminders and meeting minute files | Information stays local, collaboration breaks down |
| `agentmail` | External scheduling and confirmation emails | Cross-org communication still requires manual handling |
| `todoist` | Write action items into task system | Post-meeting items lack ongoing tracking |

`feishu-cron-reminder` currently has no stable slug — use the `openclaw cron + feishu-send-message` combination instead.

## 4. What You'll See Once It's Running

```text
[Daily Calendar Scan]
Conflict: 14:00 Client Sync overlaps with 14:00 Delivery Standup by 30 minutes
Suggestion: Keep Client Sync, push Delivery Standup to 15:00

[Pre-Meeting Prep]
09:30 Product Review
- Goal: Confirm scope of homepage redesign
- Required materials: Requirements doc v2, last meeting notes
- Discussion points: Timeline, release window

[Meeting Minutes]
Conclusion: Only deliver the homepage Hero section this week
Action items:
- Li Si: Finalize UI design by Thursday
- Wang Wu: Submit frontend effort estimate by Friday
```

## 5. How to Set It Up Step by Step

### Step 1: Capture Conflict Detection

Have Lobster scan today's and the next 3 days' schedule, confirm it can identify overlapping events, and output conflict windows with suggested resolutions.

### Step 2: Lock In the Pre-Meeting Prep Template

Define a prep checklist for each key meeting (goals, required materials, open questions, required decisions) and have Lobster populate it continuously.

### Step 3: Configure Post-Meeting Output and Action Items

Have Lobster generate meeting minutes 5 minutes after a meeting ends, including conclusions, decisions, risks, and action items (owner + deadline), then write them to Todoist.

### Step 4: Add a `cron` Daily Scan

```
openclaw cron add \
  --name "calendar-health-check" \
  --cron "0 8 * * 1-5" \
  --message "Please scan today's and the next 3 days' schedule, and output conflicts, overlong meetings (>90 min), and meetings with no agenda, along with suggested resolutions."
```

### Step 5: Verify the Closed Loop

Simulate a full flow against these checkpoints:

1. Conflict is surfaced with a suggested resolution
2. Meeting minutes arrive within 15 minutes of the meeting ending
3. All action items have an owner, a deadline, and are written to Todoist
4. Overdue action items receive a daily reminder

## 6. If There's No Ready-Made Skill, Have Claw Build One

When `feishu-cron-reminder` has no stable slug, have Claw combine `openclaw cron` + `feishu-send-message` to create the reminder action:

```text
If the reminder fails, just return "Current notification channel is unavailable" — I will publish manually.
```

## 7. Further Optimization

- Automatically write weekly meeting quality metrics to Notion for long-term observation.
- For multi-timezone coverage, add timezone detection and configurable time slots to the `cron` logic.
- To keep each reminder shorter, limit output to 3 lines and include a "next action" nudge in the "suggestion."

## 8. FAQ

**Q1: Too many conflicts — notification noise is overwhelming. What do I do?**
A: Set the threshold to "only alert when overlap exceeds 30 minutes" and restrict alerts to high-priority meetings only.

**Q2: Meeting minutes frequently missing an owner?**
A: Make `owner` a required field in the prompt — when missing, require the response to return "TBD" rather than omitting it.

**Q3: High risk of sending the wrong reschedule email to external parties?**
A: Default all outbound emails to "draft mode + manual confirmation before sending" — never auto-send externally.

**Q4: Action items are written to the task system but nobody follows up?**
A: Add a daily reminder for P1 tasks, and auto-summarize "incomplete action items" before the weekly meeting.

## 9. Related Reading

- [Email Assistant in Practice (163)](/en/university/email-assistant/)
- [Voice Research in Practice](/en/university/voice-research/)
- [Vibe Coding in Practice](/en/university/vibe-coding/)
- [Chapter 7: Tools and Scheduled Tasks](/en/adopt/chapter7/)
