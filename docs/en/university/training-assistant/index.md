# More Scenarios in Practice: Education & Training Assistant

> **Use case**: Whether learning independently or running team training, common problems are "forgetting what you learned, inconsistent practice, and untraceable progress." This guide corresponds to the README scenario "Education & Training Assistant."

The core goal is not to "learn more" — it's to turn "learning plan → practice evaluation → progress review" into a loop you can run through every day.

## 1. What This Guide Can Help You With

- Automatically generate trackable weekly or topic-based learning plans
- After each session, automatically produce practice questions, categorize mistakes, and set review cadences
- Output a weekly progress report with metrics each week, easy to share between managers and learners
- Automatically detect learners who have fallen behind and recover their progress, avoiding the "dropout mid-course" problem

## 2. Copy This Prompt to Claw First

```text
Please help me build an "Education & Training Assistant" workflow:
1) My learning goal is: master ________ within 8 weeks (replace with your team goal)
2) Output a weekly plan including: this week's goal, learning content, practice tasks, and completion criteria
3) After each study session, automatically generate 5 basic questions, 2 application questions, and 1 reflection question, and categorize mistakes by "unclear concept / unfamiliar steps / difficulty applying to new contexts"
4) Schedule review reminders on days 1, 3, 7, and 14, and output a weekly report: completion rate, accuracy trend, and key areas to reinforce next week
5) All output in English; show the plan first, then the quiz and review suggestions
```

## 3. Which Skills Are Needed

Here's what each Skill does:

- `skill-vetter`
  Link: <https://llmbase.ai/openclaw/skill-vetter/>
  Purpose: Run a safety check before installation to avoid adding unverified skills.
- `feishu-doc`
  Links: <https://www.tmser.com/2026/03/02/%E6%AF%8F%E5%A4%A9%E4%B8%80%E4%B8%AAopenclaw-skill-feishu-doc/>, <https://clawhub.ai/skills/feishu-doc>
  Purpose: Save training materials, learning records, and weekly reports for the whole team to view.
- `summarize`
  Link: <https://termo.ai/skills/summarize>
  Purpose: Compress long handouts and materials into key points to reduce reading load.
- `tavily-search`
  Link: <https://termo.ai/skills/liang-tavily-search>
  Purpose: Supplement external case studies, the latest materials, and explanatory notes.

Installation commands:

```bash
clawhub install skill-vetter
clawhub install feishu-doc
clawhub install summarize
clawhub install tavily-search
```

Scheduled reminder skills don't have a unified slug yet. The recommended approach is to use `openclaw cron` + Feishu, or write a simple reminder skill yourself. Do not list `feishu-cron-reminder` as a verified public slug.

## 4. What You'll See Once It's Working

```text
[Week 1 Learning Plan]
Goal: Understand the basic components of an AI Agent
Learning content: Read 2 introductory articles, complete 1 case study
Quiz: 5 basic questions + 2 application questions + 1 reflection question

[Review Schedule]
Day 1: Review terminology
Day 3: Redo missed questions
Day 7: Write out answers to scenario-based questions

[Key Areas to Reinforce Next Week]
1) Tool invocation boundaries
2) Layered prompt design
3) Breaking down scenario-based workflows
```

## 5. How to Configure It Step by Step

1. Build a learning plan template (weekly goal + learning content + practice tasks + completion criteria)
2. Use `summarize` to compress long handouts, and `tavily-search` to supplement case study materials
3. Configure quiz generation rules (what each question type — basic, application, reflection — is responsible for)
4. Define mistake categorization (concept / steps / transfer), and schedule review reminders for days 1, 3, 7, and 14
5. Let `feishu-doc` retain training materials and weekly reports; use `openclaw cron` to reliably output weekly reports and reminders

## 6. If There's No Ready-Made Skill, Have Claw Build One

If you can't find an existing reminder skill, send this message to Claw first:

```text
Please generate a minimal viable training reminder skill. The first version should only handle learning plans, review reminders, and weekly report summaries — no complex backend needed.
```

If it can already generate a first-version structure, turn it into a minimal `training-reminder`:

```text
training-reminder/
├── SKILL.md
└── scripts/
    └── review.py
```

In `SKILL.md`, specify that it handles generating learning plans, review reminders, and weekly report summaries. The first version of `review.py` only needs to accept a `--goal` parameter, generate a plan and review suggestions, and output structured text.

## 7. Further Optimization

- Add a "falling behind" alert: if a learner misses 3 reminders in a row, trigger a suggestion for human intervention
- Attach key data charts to weekly reports (progress bars, accuracy trends) and archive them to Feishu Docs
- Have Claw automatically generate "coach scripts" and use them to respond to learners who need to fill gaps

## 8. Frequently Asked Questions

**Q1: The plan is too ambitious and impossible to execute — what should I do?**
A: Scale each weekly goal down to a granularity that "can be completed within 3 hours."

**Q2: Practice question quality is too low — what should I do?**
A: Add the constraint "generate questions based on real work scenarios" to the prompt to avoid purely memory-based questions.

**Q3: A learner drops out midway — what should I do?**
A: Monitor 3 consecutive missed reminders, then trigger human intervention and reduce the plan's workload.
