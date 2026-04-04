# Chapter 13: Writing Skills

If Chapter 12 was about "customizing OpenClaw through configuration toggles," then this chapter covers the other, more commonly used path: **packaging a new capability as a Skill — without touching core code or the channel adapter layer**.

This is one of OpenClaw's most practical customization interfaces. You don't need to fully understand the entire Gateway before you can wire together prompts, tool calls, external scripts, dependency gates, and Slash Commands into a complete pipeline.

This chapter answers exactly three questions:

- What files make up a Skill?
- How should the `SKILL.md` Frontmatter be written, and which fields does OpenClaw actually parse?
- When a Skill needs to call scripts, run long tasks, handle failures, and debug issues, how should it be organized?

---

## 1. Setting the Boundary First: A Skill Is Not "Plugin Code" — It's a "Capability Spec + Execution Constraints"

Many people, when first encountering Skills, assume they work like browser extensions or VS Code plugins — write an entry function, and the framework calls it automatically. OpenClaw does not work that way.

In OpenClaw, a Skill's primary identity is a **capability specification written for the model to read**. The system prompt only injects a condensed Skill list containing names, descriptions, and file paths. When the model determines that a task requires a particular Skill, it then uses `read` to load the corresponding `SKILL.md`.

This means the Skill mechanism operates in two phases:

1. **Discovery**: OpenClaw scans the skills directory, parses the metadata in `SKILL.md`, and decides whether this Skill is "visible."
2. **Execution**: After the model reads the Skill content, it follows the procedures inside to call tools like `bash`, `read`, `write`, `browser`, and `nodes`, or routes directly to a tool via a Slash Command.

So a Skill is more like an "executable work manual":

- `SKILL.md` tells the model when to use it, in what order to act, and which pitfalls to avoid.
- Directories like `impl/`, `scripts/`, and `references/` carry the actual implementation details.
- OpenClaw itself handles loading, filtering, caching, hot-reloading, and command exposure.

Understanding this boundary is important. You'll soon see that "async processing in a Skill" is not about writing `async/await` inside `SKILL.md` — it means offloading time-consuming work to external scripts or tools, with the Agent loop stringing them together.

---

## 2. What a Maintainable Skill Directory Should Look Like

Per the Agent Skills convention, a Skill is essentially a directory that must contain a `SKILL.md`. Beyond that, you can add implementation files, reference materials, and template assets based on task complexity.

A practical directory structure typically looks like this:

```text
~/.openclaw/workspace/
└── skills/
    └── weekly-report/
        ├── SKILL.md
        ├── impl/
        │   ├── collect.mjs
        │   └── render.mjs
        ├── references/
        │   └── report-style.md
        └── assets/
            └── report-template.md
```

It's worth keeping the roles of these parts distinct:

- `SKILL.md`: The only required file. Defines metadata, applicable scenarios, execution workflow, quality standards, and failure handling principles.
- `impl/`: Recommended location for scripts that actually execute — `node`, `python`, `uv`, `bash` wrappers, etc. The directory name is not mandatory, but `impl/` has the clearest semantics.
- `references/`: Holds examples, format specifications, domain knowledge, and interface notes for the Skill to `read` on demand at runtime.
- `assets/`: Holds templates, static samples, prompt fragments, and fixed configuration boilerplate.

One point that's easy to overlook: **don't pile all implementation details into `SKILL.md`**. If a procedure is already detailed enough to resemble a script, extract it to `impl/`. If a section is primarily examples and background material, move it to `references/`. Otherwise the Skill keeps growing, and the model has to read large amounts of irrelevant information every time — wasting context and increasing the chance of going off track.

In OpenClaw, Skills are discovered from multiple locations:

- Built-in Skills: distributed with the OpenClaw installation package
- Shared Skills: `~/.openclaw/skills`
- Current workspace Skills: `<workspace>/skills`
- Extra directories: `skills.load.extraDirs`
- Compatible `.agents/skills`: both personal and project-level directories are also scanned

If a Skill with the same name exists in multiple locations, OpenClaw resolves conflicts by priority:

```text
extraDirs < bundled < ~/.openclaw/skills < ~/.agents/skills < <project>/.agents/skills < <workspace>/skills
```

This priority system is ideal for "local overrides." For example, if you want to fix the prompt in an official Skill, you don't need to modify the upstream repository directly — just place a Skill with the same name in your own workspace, and the current project will use the local version first.

---

## 3. Frontmatter Is a Routing Entry Point, Not Decorative Information

### 3.1 Minimum Viable Format

A discoverable Skill needs at least two Frontmatter fields:

```markdown
---
name: weekly_report
description: Summarize this week's code, Issues, and todos, and generate a weekly report
---
```

Where:

- `name` is the skill identifier, and also the most commonly used key in configuration and command mapping
- `description` is the most important routing signal — whether the model picks the right Skill at the right moment depends largely on how accurately this is written

Don't write `description` as marketing copy. The best approach is usually "task object + action + boundary condition," for example:

- Good: `Analyze Git commits and Issue changes, generate a concise weekly report`
- Bad: `A very powerful, professional, and intelligent automated weekly report Skill`

The former tells the model what problem it solves; the latter just creates noise.

### 3.2 A Key Difference Between OpenClaw and the General Agent Skills Spec

OpenClaw is compatible with the Agent Skills directory layout and usage patterns, but its own Frontmatter parsing is **stricter**. When writing in practice, you should follow these two constraints:

1. **Keep regular fields on a single line**
2. **Express `metadata` as a single-line JSON object**

That is, the following format is most reliable in OpenClaw:

```markdown
---
name: weekly_report
description: Summarize this week's code, Issues, and todos, and generate a weekly report
homepage: https://docs.openclaw.ai/tools/skills
metadata: { "openclaw": { "emoji": "📝", "requires": { "bins": ["node", "git"], "env": ["GITHUB_TOKEN"] }, "primaryEnv": "GITHUB_TOKEN" } }
---
```

If you expand `metadata.openclaw` into multi-line nested YAML, some implementations in the Agent Skills ecosystem can accept it, but OpenClaw's current parsing pipeline may not handle it reliably. This is an "engineering reality" that must be clearly stated for tutorial readers.

### 3.3 Most Commonly Used Fields

The following fields are the ones you'll encounter most often in OpenClaw:

| Field | Purpose | Practical Advice |
| ---- | ---- | ---- |
| `name` | Skill identifier | Keep it stable; avoid frequent renames |
| `description` | Skill description | Write it as a "task description," not an advertisement |
| `homepage` | Documentation homepage | Makes it easy to trace the source in the UI and team docs |
| `metadata.openclaw.emoji` | UI icon | Display-only field, optional |
| `metadata.openclaw.os` | Supported platforms | Restrict to `darwin` / `linux` / `win32` |
| `metadata.openclaw.requires.bins` | Required binaries | e.g. `["uv", "ffmpeg"]` |
| `metadata.openclaw.requires.anyBins` | At least one binary required | e.g. when command names differ across platforms |
| `metadata.openclaw.requires.env` | Required environment variables | e.g. `["GITHUB_TOKEN"]` |
| `metadata.openclaw.requires.config` | Required config values | e.g. `["browser.enabled"]` |
| `metadata.openclaw.primaryEnv` | Primary environment variable | Pairs with `skills.entries.<name>.apiKey` |
| `metadata.openclaw.install` | Installation options | Provides brew/node/go/uv/download install hints to the UI |

Together these fields determine: **whether this Skill is eligible to appear in the current session**.

For example, if you write a Skill that requires `uv` and `JIRA_TOKEN`:

- If `uv` is not in `PATH`, the Skill will be deemed "conditions not met"
- If `JIRA_TOKEN` is not configured, the Skill will not enter the available list
- If you have sandboxing enabled, having `uv` on the host machine is not enough — the container must have it too

This is why Frontmatter is not decorative information — it is OpenClaw's **load gate**.

### 3.4 Extended Fields Related to User Commands

If you want a Skill to be exposed directly as a Slash Command, you'll also encounter these fields:

| Field | Purpose |
| ---- | ---- |
| `user-invocable` | Whether users can invoke it directly; defaults to `true` |
| `disable-model-invocation` | Whether to hide it from model prompts, keeping only manual invocation |
| `command-dispatch` | Command dispatch mode; OpenClaw currently supports `tool` |
| `command-tool` | Which tool to dispatch directly to |
| `command-arg-mode` | Argument forwarding mode; defaults to `raw` |

These fields are suitable for two things:

- Turning a Skill into an explicit `/xxx` command, reducing the model's decision-making overhead
- Bypassing model reasoning for high-certainty tasks, passing arguments directly to a tool for execution

For example, actions like "export logs," "flush cache," or "fetch daily report" — when the steps are fixed and the input structure is clear — are well-suited for direct command dispatch rather than letting the model improvise each time.

---

## 4. A Real, Runnable Minimal Example: Creating a current-time Skill

After all the concepts above, the best approach is to write one yourself.

Here we deliberately avoid a complex scenario and instead choose the smallest but complete example: **creating a Skill that retrieves the current machine time**. Its value isn't in how powerful it is, but in being short enough to walk you through the entire sequence — creating a directory, writing `SKILL.md`, letting OpenClaw discover it, and triggering it in a conversation.

To avoid confusion caused by differences in commands across platforms, this minimal example targets macOS / Linux first, calling the `date` command directly.

### 4.1 Step 1: Create the Directory

Create a Skill directory under the current workspace:

```bash
mkdir -p ~/.openclaw/workspace/skills/current-time
```

If your current project already has a dedicated workspace, you can also place it at:

```text
<workspace>/skills/current-time
```

As long as the directory contains a `SKILL.md` and the path is within a location OpenClaw can scan, it will work.

### 4.2 Step 2: Write the Minimal `SKILL.md`

Create a `SKILL.md` in the `current-time/` directory:

```markdown
---
name: current-time
description: Get the local time of the current machine and return it concisely
---

# Current Time

## When to Use

- The user asks "what time is it," "current time," or "local machine time"
- The user needs to confirm the local timezone time of the current machine

## Workflow

1. Use `bash` to run `date "+%Y-%m-%d %H:%M:%S %Z"` to get the current machine time.
2. If the command fails, clearly state the reason for the failure; do not fabricate a time.
3. Return only a concise result by default; do not add unnecessary explanation unless the user asks follow-up questions.

## Return Format

- Answer in English, for example: `The current machine time is 2026-03-10 14:30:25 CST.`
```

This example is intentionally minimal. Notice it does only three things:

- Uses `name` and `description` so the system can discover and route to it
- Uses "When to Use" to constrain the trigger scope, preventing the model from misusing it
- Uses "Workflow" to specify how tools should be called and how to handle failures

In other words, even without `impl/` or `references/`, a Skill can still stand on its own. For particularly simple tasks, **a `SKILL.md` alone is a completely valid minimal closed loop**.

### 4.3 Step 3: Verify That OpenClaw Discovered It

After writing it, don't rush to test it in a conversation. First run a static check with the CLI:

```bash
openclaw skills list
openclaw skills info current-time
openclaw skills check
```

Focus on three things:

- Can you see `current-time` in `list`?
- Does `info` show the correct name, description, and source path?
- Does `check` report any missing dependencies?

This example only depends on `bash` and `date`, which are normally available on macOS / Linux. But if your runtime environment is a minimal container, it's still worth checking once.

### 4.4 Step 4: Trigger It in a Real Conversation

Once the CLI check passes, try it in a conversation:

- "What time is it right now?"
- "Can you check the current machine time for me?"
- "What is the current system time and timezone?"

If everything is working correctly, OpenClaw will read `current-time/SKILL.md`, execute the `date` command, and return the current machine time.

If you just updated the Skill but it hasn't taken effect yet, try these in order:

1. Open a new session
2. Ask the Agent to run "refresh skills" once
3. Then ask your question again

This is because OpenClaw snapshots the skill list at session start, and an old session may not immediately see new files.

### 4.5 Step 5: Upgrade This Minimal Example into a "Proper" Skill

Once `current-time` is running, you can gradually evolve it along this path:

First upgrade: Add Frontmatter

- Add `homepage`
- Add `metadata.openclaw.emoji`
- Restrict `metadata.openclaw.os` when needed

Second upgrade: Add failure handling

- Provide next-step suggestions when the command fails
- Distinguish between "command not found" and "execution timeout"

Third upgrade: Add parameter support

- Support users asking "what time is it in New York?"
- Support format options, such as 24-hour format / ISO time

Fourth upgrade: Extract to scripts

- If the logic grows complex, move the `date` call and parameter handling to `impl/get-time.sh` or `impl/get-time.mjs`

This is the most typical growth path for Skill development: **start with a minimal closed loop to prove it works, then evolve incrementally — rather than designing a massive all-purpose Skill from the start**.

### 4.6 What This Example Actually Taught You

Although `current-time` is simple, it has walked through all the key actions of a Skill:

```text
Create directory
→ Write SKILL.md
→ Discovered by OpenClaw scan
→ Pass CLI check
→ Triggered in a real conversation
→ Continue iterating based on feedback
```

If readers can independently get this example running, they have gone beyond "understanding the concept" — they have actually completed their first Skill creation.

---

## 5. Where Does "Async Processing" in a Skill Actually Live

This is where many people are most easily confused.

`SKILL.md` is just a specification document; it is not a module that Node will directly execute. So when we talk about "async" in Skill development, we really mean the following types of scenarios:

- Needing to call a remote API
- Needing to run a script that takes tens of seconds
- Needing to process files, images, audio, or web pages in stages
- Needing to collect data first, then clean it, then generate the final output

In OpenClaw, the more reliable approach is not to force everything through a single overlong prompt, but to break tasks into **multi-step tool calls + external scripts**.

### 5.1 Recommended Decomposition Pattern

A mature Skill typically breaks async tasks into three layers:

1. **Skill layer**: Describes when to trigger, the step order, and error boundaries
2. **Script layer**: Completes the actual I/O, network requests, and format conversion in `impl/`
3. **Output layer**: Produces results as JSON, Markdown, or structured text, then hands them back to the Agent for aggregation

For example, a "weekly report generation" Skill might be organized like this:

```text
SKILL.md
  ├─ First check whether GITHUB_TOKEN is available
  ├─ Call {baseDir}/impl/collect.mjs to pull commits and Issues
  ├─ Save raw results as JSON
  ├─ Call {baseDir}/impl/render.mjs to generate a Markdown draft
  └─ Finally let the Agent polish the language and check for missing items
```

Two key points here:

- **Scripts handle the time-consuming and dirty work** — API requests, retries, pagination, file writes
- **The model handles judgment and wrap-up** — filling in context, verifying anomalies, translating technical results into human-readable text

This is far more reliable than cramming all logic into the model.

### 5.2 A Practical Skill Skeleton

The following example is not meant to be copied directly — it's a reference for "what kinds of content should go into a Skill":

```markdown
---
name: weekly_report
description: Summarize this week's code, Issues, and todos, and generate a concise weekly report
metadata: { "openclaw": { "emoji": "📝", "requires": { "bins": ["node", "git"], "env": ["GITHUB_TOKEN"] }, "primaryEnv": "GITHUB_TOKEN" } }
---

# Weekly Report

## When to Use

- The user explicitly mentions "weekly report," "this week's summary," or "this week's progress"
- The current repository is a Git project and reading local files is permitted

## Workflow

1. First confirm the current repository root directory and the statistical time range.
2. Use `bash` to run `{baseDir}/impl/collect.mjs --json` to collect commits, branches, and Issue information.
3. If the script fails, display the key errors first, then ask the user whether to narrow the scope or provide additional authentication information.
4. Write the collected results to a temporary JSON file to avoid re-fetching.
5. Use `{baseDir}/impl/render.mjs` to generate a Markdown draft.
6. Finally, only make necessary edits; do not fabricate progress that did not occur.

## Quality Requirements

- Prioritize facts and numbers; avoid vague generalizations
- Clearly distinguish "completed," "in progress," and "blocked"
- If data is incomplete, explicitly state what is missing
```

Three signals in this skeleton are especially important:

- **Trigger conditions are clearly stated**: reduces false triggers
- **What to do on failure is clearly stated**: prevents the model from hallucinating after a script failure
- **Quality standards are clearly stated**: gives the final output a stable editorial baseline

### 5.3 Engineering Principles for Async Scenarios

If a Skill will call scripts, access the network, or process large files, follow these guidelines:

1. **Have scripts output structured results.** Prefer JSON; don't just dump a large blob of natural language at the model.
2. **Make failures diagnosable.** Error messages should include at minimum the phase name, parameters, and a suggested action.
3. **Make steps re-runnable.** Keep collection and rendering separate so that only a failed segment needs to be re-run.
4. **Make paths explicit.** Use `{baseDir}` to point to the Skill root directory; don't hardcode absolute paths on the local machine.
5. **Keep side effects controlled.** Write temporary files to the workspace or an explicit temp directory by default; don't carelessly pollute the user's home directory.

These principles may not seem flashy, but they determine whether a Skill is "runnable once" or "something teammates are willing to use long-term."

---

## 6. The Most Common Pitfalls When Debugging

When a Skill goes wrong, it's usually not because "the main logic is broken" — it's because some small gate wasn't passed. When troubleshooting, work through the following sequence.

### 6.1 First Check Whether It Was Loaded

OpenClaw provides three of the most useful diagnostic commands:

```bash
openclaw skills list
openclaw skills list --eligible
openclaw skills info <skill-name>
openclaw skills check
```

These four commands answer four different questions:

- `list`: What Skills has the system actually discovered?
- `list --eligible`: Which ones are genuinely available in the current environment?
- `info`: A given Skill's metadata, source, and status
- `check`: What's missing — a binary, an environment variable, or a config value?

If a Skill is clearly in the directory but doesn't appear in `list`, check these first:

- Is the filename strictly `SKILL.md`?
- Is the directory hierarchy correct?
- Is `SKILL.md` too large or does it have a corrupted format?
- Does the path escape the workspace through a symlink?

OpenClaw performs security checks on path escapes of this kind and will not allow them unconditionally.

### 6.2 Then Check Whether the Session Cache Has Been Refreshed

OpenClaw takes a snapshot of available Skills **at session startup** and reuses it for subsequent turns by default. This means that after you edit `SKILL.md`, the change may not take effect immediately.

There are generally three ways to refresh:

1. Start a new session directly
2. Ask the Agent to run "refresh skills" once
3. Restart the Gateway, or rely on the file watcher to automatically update the snapshot on the next cycle

This is also why many people say "I clearly updated the description, but the model acts like it didn't see it." The problem is usually not the model — the session is still working from an old snapshot.

### 6.3 Then Check Whether Dependencies Are Only Installed on the Host, Not in the Sandbox

This is one of the most common pitfalls when debugging OpenClaw Skills.

Suppose your Skill depends on `ffmpeg`:

- `openclaw skills check` looks fine on the host machine
- But the current Agent is running inside a Docker sandbox
- The container image doesn't have `ffmpeg`

The end result: the Skill is deemed "available," but execution still fails.

So whenever your Agent runs in a sandbox, check both:

- Whether the binary exists on the host machine
- Whether the binary exists inside the container
- Whether `setupCommand` or a custom image has installed the dependency inside the container

### 6.4 Finally Check Whether Command Mapping or Descriptions Are Off

If the Skill loads and all dependencies are present, but the model still doesn't use it, there are two common causes:

- `description` is too vague; the model doesn't know what problem it solves
- Trigger conditions are written too broadly; the model can't determine when to use it

If a Slash Command isn't appearing, also check:

- Whether `user-invocable` has been disabled
- Whether the command name conflicts with an existing system command
- Whether `command-dispatch` is configured but no valid `command-tool` is provided

Don't underestimate this layer. Many so-called "model instability" issues turn out to be nothing more than metadata that wasn't written clearly enough for the model to make a confident choice.

---

## 7. Writing Skills That Can Be Maintained Long-Term, Not Just "Works on My Machine"

Truly mature Skills are often not the ones with the most features — they're the easiest to maintain. The following lessons come largely from consensus built through repeated real-world mistakes.

### 7.1 The Spec Handles Decisions, Not Implementation Details

`SKILL.md` should tell the model:

- When to trigger
- In what order to act
- In which situations to stop
- What the output should look like

Don't cram dozens of lines of Shell details or API parameter documentation in here. Those belong in `impl/` and `references/`.

### 7.2 Frontmatter Should Only Include Fields That Actually Affect Routing and Gating

Many people like to stuff large amounts of notes into Frontmatter, resulting in increasingly bloated metadata. But for OpenClaw, the fields that truly matter are those that affect **discovery, filtering, and invocation**. Other background information is better placed in the body.

### 7.3 Write Failure Paths Into the Skill

What disappoints people about a Skill most is not failure itself, but a Skill that pretends to succeed after failing.

So you should explicitly write into the Skill:

- What to do when a request times out
- What to do when authentication information is missing
- What to do when fetched results are empty
- How to report when some steps succeed and others fail

This will noticeably improve the end-user experience.

### 7.4 Test with a Minimal Closed Loop, Not the Full Pipeline from the Start

When developing a new Skill, verify in this order:

1. First confirm that `SKILL.md` is recognized by `openclaw skills list`
2. Then confirm that `openclaw skills check` shows all dependencies are met
3. Run scripts in `impl/` individually to verify stable output
4. Finally trigger the Skill in a real conversation

This way you can isolate problems much faster. Otherwise, when a real conversation fails, it's hard to immediately determine whether the issue is in metadata, scripts, permissions, or model routing.

---

## 8. Summary: Skills Are OpenClaw's "Minimal Reusable Customization Unit"

By now, the design of the Skill layer should be fairly clear.

It is not a heavyweight plugin system requiring you to register a bunch of lifecycle hooks; nor is it merely a prompt template, since it can also attach scripts, enforce dependency gates, handle command dispatch, and support hot-reloading. Put directly: it lands in a convenient spot — **lightweight enough, yet engineered enough, that teams can use it to solidify their domain capabilities without too much friction**.

What's truly worth mastering is not just how to write `SKILL.md`, but this complete pipeline:

```text
Frontmatter defines visibility
→ OpenClaw filters Skills based on the environment
→ The model loads SKILL.md on demand
→ The Skill calls tools or scripts to complete async tasks
→ CLI and logs help you diagnose loading, dependency, and execution issues
```

Once you internalize this layer, the subsequent chapters on "channel integration" and "complete customization examples" will be easier to follow — because by then you'll no longer see OpenClaw as a mysterious black box, but as a system you can peel apart and replace layer by layer.

---

## Further Reading

- Agent Skills official site: [agentskills.io/home](https://agentskills.io/home)
- OpenClaw Skills documentation: [docs.openclaw.ai/tools/skills](https://docs.openclaw.ai/tools/skills)
- OpenClaw Creating Skills guide: [docs.openclaw.ai/tools/creating-skills](https://docs.openclaw.ai/tools/creating-skills)
