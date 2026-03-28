# More Real-World Scenarios: Financial Data Analysis Assistant

> **Use case**: You need to watch market movements, read research reports, and track news every day, but the volume of information is overwhelming — easy to end up "reading a lot without any input for decisions." This guide corresponds to the README scenario "Financial Data Analysis."

This is not investment advice. It's about building a "collect → filter → summarize → alert" research pipeline where every conclusion has a source and a timestamp.

## 1. What This Guide Helps You Do

- Automatically collect market data, news, and announcements and group them into comparable themes
- Output a daily digest with sources and timestamps for easy review
- Automatically push alerts on abnormal movements, flagging "trigger condition + related assets"
- Persist daily reports to Feishu for easy daily reference

## 2. Copy This Prompt to Claw First

```text
Please help me build a "Financial Data Analysis Assistant":
1) The tracked asset pool is: ________ (example: NVDA, TSLA, 3 new energy companies)
2) Collect market data + news + major announcements daily, and output one structured daily report: Market Overview, Key Assets, Key Events, Risk Warnings, Tomorrow's Watch List
3) Immediately push an alert when price movement, volume, or announcement keywords exceed a threshold; conclusions must include source links + collection time
4) All output in English; append "For research assistance only, does not constitute investment advice" at the end
```

## 3. Which Skills You Need

A quick look at what each skill does:

- `skill-vetter`
  Link: <https://llmbase.ai/openclaw/skill-vetter/>
  Purpose: Security check before installation.
- `tavily-search`
  Link: <https://termo.ai/skills/liang-tavily-search>
  Purpose: Fetch news, announcements, and external information.
- `summarize`
  Link: <https://termo.ai/skills/summarize>
  Purpose: Compress research reports and news digests.
- `feishu-send-message`
  Link: <https://playbooks.com/skills/openclaw/skills/feishu-send-message>
  Purpose: Push daily reports and abnormal alerts.

Install with:

```bash
clawhub install skill-vetter
clawhub install tavily-search
clawhub install summarize
clawhub install feishu-send-message
```

For market data, you may find `alpha-vantage`-type skills, but their slugs are still changing. It's recommended to write a "quote fetch skill" or connect directly to your own API; do not treat unconfirmed slugs as stable public skills.

## 4. What You'll See Once It's Running

```text
[Market Overview]
Nasdaq up 1.8%, semiconductor sector with elevated volume, data filed under "Chips + AI" theme

[Key Assets]
NVDA +4.2% (high volume, AI inference chip logic); TSLA -2.4% (regulatory keyword triggered alert)

[Risk Warnings]
TSLA regulatory news still developing; recommend close monitoring of volume and announcement keywords

[Tomorrow's Watch List]
Continue monitoring NVDA analyst day progress + watch for new regulatory keywords
```

All of the above includes source links and collection timestamps, so you can paste them directly into your research log.

## 5. How to Set It Up Step by Step

1. Start by selecting 10–20 core assets/themes; set price change and volume thresholds for each
2. Define the daily report template (Market Overview, Key Assets, Key Events, Risk Warnings, Tomorrow's Watch List)
3. Use `tavily-search` for news and announcement retrieval; use `summarize` for research report compression
4. Set up anomaly detection rules (e.g., intraday movement exceeding 5%, volume doubling, or banned keyword appearances)
5. Attach source links + collection time to every conclusion, and push the daily digest or alert via `feishu-send-message`

## 6. If No Existing Skill Fits, Have Claw Build One

If you can't find a stable market data skill, don't worry — just send Claw this message:

```text
Please help me generate a minimal viable market data fetch skill. The first version only needs to do 3 things: pull prices for core assets, check whether thresholds are triggered, and output a daily report draft with sources and timestamps.
```

Let it sketch out the first version's approach, then consider building it into this skeleton:

```text
market-watch/
├── SKILL.md
└── scripts/
    └── quote.py
```

`SKILL.md` describes that the skill is responsible for fetching market data, evaluating thresholds, and generating summaries. The first version of `scripts/quote.py` does three things only: 1) fetch prices for core assets; 2) check whether thresholds are triggered; 3) output a daily report draft with sources and timestamps.

## 7. Further Optimization

- Deduplicate and merge results from multiple data sources to avoid pushing the same event twice
- Add a "theme overview" view that bundles related assets and supports splitting by sector/strategy
- Include an "action recommendation" column in alerts, such as "needs manual review / keep watching / position size warning"

## 8. Frequently Asked Questions

**Q1: Values differ across data sources. What do I do?**
A: Define a "primary data source"; use others only for cross-validation. Label the "data source" field in the summary.

**Q2: Too many alerts to keep up with. What do I do?**
A: Add a cooldown period, tier alerts by priority, or only alert when the anomaly score exceeds 80.

**Q3: Summaries are too generic and hard to act on. What do I do?**
A: Force the template to include a "tomorrow's watch points" + "trigger condition" section — conclusions are only actionable if they tell you what to watch for.
