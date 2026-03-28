# Documentation Automation: Standardized Knowledge Capture Assistant

> **Use case**: Manuals, weekly reports, and config notes are often cobbled together with copy-paste, and updating one version means touching 3 separate documents. This guide wires "source material → template → structured document" into a single pipeline — automatically generating readable content and distributing it on demand.

## 1. What This Guide Helps You Do

- Input a product or process update once, and output a "readable draft."
- Automatically shape content into a fixed template (background, steps, notes) for easy sharing with customers or internally.
- Automatically write relevant material into a knowledge base, and use a single prompt to have Claw generate multiple document versions.

## 2. Copy This Prompt to Claw First

```text
Please help me write a new document:
1) Start by reading this source material: <material link>, and extract 3 core points;
2) Produce an operation workflow structured as: Background, Objective, Steps, Verification, Notes;
3) Write three separate sections: "Training Version", "Customer Version", and "Internal Weekly Report Version";
4) Each section must have subheadings, bullet points, and actionable items;
5) Output should be ready to paste directly into Feishu/Notion.
```

## 3. Which Skills You Need

- `skill-vetter`
  Link: <https://llmbase.ai/openclaw/skill-vetter/>
  Purpose: Run a security scan before installing any skill.
- `feishu-doc`
  Link: <https://www.tmser.com/2026/03/02/%E6%AF%8F%E5%A4%A9%E4%B8%80%E4%B8%AAopenclaw-skill-feishu-doc/>
  Purpose: Write generated content to your team's Feishu documents or weekly report templates.
- `notion`
  Link: <https://playbooks.com/skills/openclaw/skills/notion>
  Purpose: Automatically save versions, add tags, and link tasks.
- `summarize`
  Link: <https://termo.ai/skills/summarize>
  Purpose: Compress lengthy source material into key points.
- `tavily-search`
  Link: <https://termo.ai/skills/liang-tavily-search>
  Purpose: Fill in facts, citations, or examples.

Install with:

```bash
clawhub install skill-vetter
clawhub install feishu-doc
clawhub install notion
clawhub install summarize
clawhub install tavily-search
```

## 4. What You'll See Once It's Running

```text
[Background]
Upstream releases a 2026Q1 new feature brief mentioning "automated scheduling + report linkage."

[Steps]
1) Extract 3 key capabilities from the material (scheduling, reporting, team checkpoints);
2) Write out "operation workflow + acceptance actions";
3) Produce three perspectives: "Customer Version" / "Training Version" / "Weekly Report Version";
4) Write the final content to a Feishu document.

[Next Steps]
1) Post the customer version to the group chat for confirmation;
2) Put the training version into a Notion learning card;
3) Set a reminder for the next editing cycle.
```

## 5. How to Set It Up Step by Step

1. Install skills: `clawhub install skill-vetter feishu-doc notion summarize tavily-search`, and confirm the Feishu document and Notion directory are writable.
2. Organize source material into cards (e.g., OneNote/Google Doc), then use `summarize` to compress them into 3–5 key points.
3. Write a prompt template: define the output structure (background, objective, actions) and note the writing tone for each version.
4. Use `openclaw cron add` to schedule a recurring "content auto-review" task: read the latest material, generate a new document, and write the result to Feishu.
5. Use Notion task cards to link each step to a to-do item: draft, review, publish, retrospective.

## 6. If No Existing Skill Fits, Have Claw Build One

If you want to wrap a "document template" into a custom skill but can't find an existing slug, ask Claw to write a `doc-assembler` for you:

```
name: doc-assembler
description: Automatically organizes source material into a structured document and syncs it to Feishu

Capabilities:
- Extract keywords from source material
- Output background, steps, and notes according to a template
- Generate "Customer / Internal / Retrospective" versions
- Write output to a target document or weekly report
Workflow: Prefer running via `python scripts/main.py "<material>"`
```

First write 4 blocks of pseudocode: read material, call `summarize`, assemble the template, output to Feishu. Once it runs end-to-end, you can treat it as a reusable skill and add conditional logic or multilingual support later.

## 7. Further Optimization

- Use `tavily-search` to add the latest data, and append the citation date and source at the end.
- Add a "version diff" table telling the team which 3 key points changed each time.
- Convert output to Markdown + PDF and hand it off to a layout tool for automatic publishing.

## 8. Frequently Asked Questions

**Q1: I only have 10 minutes of source material — not enough content. What do I do?**
A: Use `summarize` to extract keywords first, then ask Claw to fill in context and examples. You can add "please provide 2 related case studies."

**Q2: The generated document always feels too AI-written. How do I fix that?**
A: In the prompt, explicitly state "maintain XX style, avoid using XX words," and ask Claw to output two versions each time — "original style / professional style" — then choose manually.
