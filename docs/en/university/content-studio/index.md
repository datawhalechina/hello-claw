# Content Creation Studio: Social Media Operations, Writing Polish, and Multi-Platform Publishing

> **Use case**: Every day you're publishing content across multiple platforms — Xiaohongshu, WeChat Official Account, X/LinkedIn — and after the draft is ready you still have to manually adjust the tone, trim the length, and reformat for each channel. This article turns "topic selection → master draft → multi-platform rewrite → review" into a pipeline: let Lobster give you a usable draft first, then use an automated flow to generate versions for each platform.

## 1. What This Article Helps You Accomplish

- After you input a unified set of source material, Lobster generates a master draft, a polished version, and rewrites for each platform.
- Automatically record publish times and performance metrics for easier weekly review.
- Use fixed templates so every publish quickly moves into execution — no more writing content structures from scratch.

## 2. Copy This Prompt to Lobster First

```text
Please help me set up a "Content Creation Studio" workflow:
1) I give you a topic and source material; you first use summarize to compress the material into 3 key points;
2) Generate a solid master draft, then rewrite it into three platform versions: Xiaohongshu, WeChat Official Account, and X/LinkedIn;
3) Each platform version follows the corresponding tone and length, and includes a CTA at the end;
4) After writing, give me two polishing options (steady / punchy), and log the platform + publish time;
5) All results must be directly copy-pasteable to Feishu/Notion.
```

## 3. Which Skills You Need

- `skill-vetter`
  Link: <https://llmbase.ai/openclaw/skill-vetter/>
  Purpose: Ensure any newly installed skill has passed a security scan.
- `tavily-search`
  Link: <https://termo.ai/skills/liang-tavily-search>
  Purpose: Supplement research content, verify facts and data.
- `summarize`
  Link: <https://termo.ai/skills/summarize>
  Purpose: Compress long source material into a condensed key-points version.
- `notion`
  Link: <https://playbooks.com/skills/openclaw/skills/notion>
  Purpose: Serve as the content calendar and review-tracking backend.
- `social-content`
  Link: <https://playbooks.com/skills/openclaw/skills/social-content>
  Purpose: Execute platform rewrites and publishing recommendations.

Installation commands:

```bash
clawhub install skill-vetter
clawhub install tavily-search
clawhub install summarize
clawhub install notion
clawhub install social-content
```

## 4. What You'll See Once It's Running

```text
[Master Draft / Voice]
Title: Break Down an AI Agent into 3 Small Steps
Key points: Vault + Prompt + Tool — build a small agent in 5 minutes
CTA: Click "Start Hands-On" and I'll give you a practice challenge

[Platform Rewrites]
Xiaohongshu: Conversational, interactive questions, 150–250 characters
WeChat Official Account: Structured paragraphs, under 800 characters, authoritative tone
X: One hook sentence, two short paragraphs, closing question

[Polishing Options]
1) Steady: Strengthen logical flow, reduce trendy buzzwords
2) Punchy: Add a data hook + multiple action verbs

[Publish Log]
Notion card: Topic / Platform / 3 performance metrics
```

## 5. How to Set It Up Step by Step

1. Install skills: `clawhub install skill-vetter tavily-search summarize notion social-content`, and confirm Notion document/database permissions.
2. Build a content template: topic, core message, platform tone, CTA, key metrics.
3. Use `summarize` to compress the source material first, then have `tavily-search` fill in the latest examples, then hand off to `social-content` to produce platform versions.
4. Use `openclaw cron add` or a scheduled command to generate "content updates + publishing plan" every Tuesday and Thursday, and write the results to Notion.
5. After each publish, manually enter performance data (reads, engagement, conversions), then have Lobster generate "next week's optimization suggestions."

## 6. If There's No Ready-Made Skill, Have Claw Build One

If you want to package "content rewrite + data review" as a custom skill (for example `content-conductor`) but can't find a public slug, have Claw generate a minimal `SKILL.md` first:

```
name: content-conductor
description: Unified output of master draft, multi-platform versions, and review suggestions

Capabilities:
- Accept topic + source material + performance data
- Output steady master draft + Xiaohongshu/WeChat/X platform drafts
- Generate polishing suggestions + next-week optimization actions
- Write to Notion / Feishu

Preferred invocation: `python scripts/main.py "<topic>|<material>" --metrics "<data>"`
```

Implement it in 4 steps: 1) read inputs; 2) call summarize + social-content; 3) output three content sections; 4) write to Notion. Once it runs end-to-end, expand with CTA, platform strategy, and analytics dashboards.

## 7. Further Optimization

- Add "no slogans / no AI-speak" to the prompt, and use `social-content` to output two tone variants before choosing.
- Add a "content review" template: summarize today's data, compare with last time, list next-week actions.
- Use `tavily-search` to regularly refresh the factual database and avoid citing outdated information.

## 8. FAQ

**Q1: Each platform has a different tone — how do I ensure quality?**
A: "Write a solid master draft with the template first, then use social-content to rewrite it in different tones, and finally do a manual check on the most important platform."

**Q2: My content cadence is inconsistent. What do I do?**
A: Use openclaw cron to generate content every Tuesday and Thursday on a fixed schedule; after publishing, have Lobster immediately write a "review + next-week improvements" reminder.
