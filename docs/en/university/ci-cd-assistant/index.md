# Automated Testing and Deployment: CI/CD Assistant in Practice

> **Use case**: Every commit means manually watching Jenkins/GitHub Actions, and teammates constantly asking "has it deployed yet?" in Feishu. This article hands off the repetitive steps — "commit → verify → notify → advance" — to Lobster: get automated feedback running first, then gradually add automated fixes.

## 1. What This Article Helps You Accomplish

- First: automate the "three things you must monitor every release" — build status, failure summary, and next action.
- Second: lock in a pre-release checklist that blocks progress whenever an unapproved step is encountered.
- Third: turn "post-release health checks" into scheduled tasks so both healthy and abnormal states deliver structured results to Feishu.

## 2. Copy This Prompt to Lobster First

```text
Please help me set up a CI/CD assistant:
1) After a commit or merge, read the latest pipeline status; on failure, list the failed stage, error summary, and next troubleshooting commands;
2) On success, run the pre-release checklist (confirm tests, config, and database migrations all pass) — stop and alert me if any item fails;
3) Production deployments must wait for my confirmation; test environment can proceed automatically;
4) After deployment, monitor health endpoints, error rate, and response time for 20 minutes — notify Feishu immediately on any anomaly;
5) All messages output in "Status / Risk / Next Action" format.
```

## 3. Which Skills You Need

- `skill-vetter`
  Link: <https://llmbase.ai/openclaw/skill-vetter/>
  Purpose: Security check before installation to prevent untrusted skills from running in production.
- `github`
  Link: <https://playbooks.com/skills/openclaw/skills/github>
  Purpose: Read the status and logs of PRs, Actions, and Releases.
- `devops`
  Link: <https://playbooks.com/skills/openclaw/skills/devops>
  Purpose: Execute pre-release checks, deployment commands, and health scans.
- `claude-code`
  Link: <https://playbooks.com/skills/openclaw/skills/claude-code>
  Purpose: Optional — used to generate fix suggestions or auto-complete commands.
- `gog`
  Link: <https://playbooks.com/skills/openclaw/skills/gog>
  Purpose: Save release records, weekly reports, and audit trails.

Installation commands:

```bash
clawhub install skill-vetter
clawhub install github
clawhub install devops
clawhub install claude-code
clawhub install gog
```

## 4. What You'll See Once It's Running

```text
[Status]
Latest CI: Failed
Failed stage: integration-test

[Risk]
payment-service timed out on test case 3 — suspected dependency service not ready.

[Next Action]
1) Check whether the payment mock in the test environment is running;
2) If the issue cannot be reproduced within 10 minutes, add a 5-second startup delay first;
3) Production deployment requires my confirmation before proceeding.
```

## 5. How to Set It Up Step by Step

1. Install the skills and run `skill-vetter run` to check security; run `clawhub install github devops` and confirm access to the target repo and deployment environment.
2. Build the pre-release checklist inside `openclaw prompt`: include test pass, database migration, config set, and rollback command available.
3. Add an `openclaw cron add` that triggers a health scan message every day / 5 minutes after each release.
4. Write a fixed failure summary template (stage, error, suggested command, who to involve); write a success template: "entering pre-release checklist → awaiting my confirmation → continue deployment."
5. Enable `claude-code` for PR draft generation only when needed — by default, require manual confirmation before any automated action.

## 6. If There's No Ready-Made Skill, Have Claw Build One

Most CI/CD nodes can use the public skills above, but if you want to package the "release checklist" as a standalone skill — for example `release-checker` — have Claw write a minimal `SKILL.md` first, which takes about a minute:

```
name: release-checker
description: Check the release checklist and decide whether to proceed with deployment

Main tasks:
- Confirm tests, config, and migrations pass
- Output a three-part reply: "Status / Risk / Next Action"
- Block and explain next steps on failure

Preferred invocation: `python scripts/main.py "<user input>"`
```

Then write `scripts/main.py` in 4 steps: read the pipeline, validate the checklist, output structured results, return a Feishu notification. Once it runs end-to-end once, you have a custom skill — the remaining steps can be refined from there.

## 7. Further Optimization

- Use `claude-code` to summarize failure logs and reduce reading time in Feishu.
- Add an `openclaw cron` that automatically writes the past 7 days of release results to gog every week.
- If the team needs it, add a "release risk allowlist" so Lobster checks first whether manual approval is required.

## 8. FAQ

**Q1: Can production be fully automated?**
A: Start with test environment automated and production manual confirmation; once stable, use `devops` to execute production commands, but keep the "manual confirmation" switch in place.

**Q2: When CI fails, I don't want to read through a pile of logs. What do I do?**
A: Add "only output failed stage + fastest troubleshooting command + who needs to be involved" to the prompt, and apply keyword filtering on errors at the script level.
