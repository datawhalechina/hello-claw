# Chapter 4: The Tool System — Four Building Blocks, Infinite Possibilities

> **Core question**: Why does giving an Agent only four tools make it more powerful than giving it a hundred?

---

Have you ever run into this scenario: you ask ChatGPT "find all the TODO comments in my project," and it earnestly replies — "you can use `grep -r TODO .` to search for them" — then stops.

It knows how to do it, but it **can't do it**. It's locked in a cage of plain text, able to speak but unable to act — a learned dreamer with boundless knowledge but no hands.

The tool system solves exactly this problem. It transforms an Agent from "telling you how to do something" to "doing it for you." But the tool system has a design dilemma: how many tools should you give an Agent?

OpenClaw's answer is surprising — four.

---

## I. The Tool Design Dilemma

Intuitively, more tools means more capability. One more tool, one more ability — shouldn't that make the Agent more powerful?

The reality is the opposite. LLMs choose tools based on the **description text** of each tool, not the underlying code. The more tools there are, the more crowded the description space becomes and the blurrier the boundaries. Once two tools have overlapping functionality, the LLM starts to hesitate when choosing — and hesitation means higher error rates.

There's also a counterintuitive corollary here: with fewer tools, each tool gets more description space, which allows for greater precision. Compare the description quality of the same `exec` tool in a "four-tool set" versus a "hundred-tool set" — the former can elaborate on parameter formats, applicable scenarios, and safety boundaries; the latter is forced to compress its description, resulting in less accurate LLM understanding and higher selection error rates. Restraint in the number of tools directly improves description quality, which in turn improves decision accuracy.

There is a nonlinear relationship between the number of tools and system health:

| Toolset State | Typical Problem | Result |
|--------------|----------------|--------|
| Too few tools | Insufficient capability, many tasks simply can't be completed | Agent is powerless |
| Appropriate number | Clear boundaries, each tool has its role | High accuracy, flexible combinations |
| Too many tools | Overlapping functionality, blurry description boundaries | Chaotic selection, declining accuracy |

The deeper issue is **cognitive load**. The health of a toolset is not measured by the number of tools, but by the **orthogonality** between tools — each tool only does its own thing, without overlapping with others.

This is the essence of the Unix philosophy: do one thing well; let programs work together.

---

## II. The Four Building Blocks: read / write / edit / exec

OpenClaw inherits this philosophy and distills it into four tools.

Their division of labor comes from a simple insight: perception needs a single unified channel, while action has three fundamentally different semantics — **create, modify, trigger**. Using human senses and limbs as an analogy:

| Tool | Core Capability | Human Sense Analogy | Core Role |
|------|----------------|--------------------|-----------|
| `read` | Acquire information | Eyes (perceiving the world) | Read files, understand the current state |
| `write` | Create content | Pen (writing and recording) | Create new files |
| `edit` | Modify content | Eraser + pen (editing and organizing) | Precisely modify existing files |
| `exec` | Execute operations | Hands (reaching the world) | Run commands, interact with external systems |

```
┌──────────────────────────────────────────────────┐
│                                                  │
│  Perceive World ──→  read (acquire info, understand state)  │
│                     ↓                            │
│  Think & Reason ←──  LLM (understand situation, make plan)  │
│                     ↓                            │
│  Change World  ──→  write (create new files)                │
│                     edit  (modify existing files)           │
│                     exec  (run commands, reach externals)   │
│                     ↓                            │
│  Observe Results ─────────────────────→ back to Perceive   │
│                                                  │
└──────────────────────────────────────────────────┘
```

One perception channel, three action channels — not arbitrary padding, but a deliberate division of labor.

You might ask: since `exec` can run any command, why design separate `read`, `write`, and `edit` tools? Couldn't you just use `cat`, `echo >`, and `sed`?

There's a subtle but important distinction here. `exec` is an all-purpose tool, and precisely because it's all-purpose, the LLM has to construct complete shell commands in its head when using it — raising the probability of errors. The value of specialized tools lies in:

| Scenario | exec Approach | Specialized Tool Approach | Extra Guarantees from Specialized Tool |
|---------|--------------|--------------------------|---------------------------------------|
| Read a file | `cat file.txt` | `read("file.txt")` | Three-layer context protection, won't overflow the context window |
| Write a file | `echo "content" > file` | `write("file.txt", content)` | Atomic write, semantics clearly mean "brand new creation" |
| Modify a file | `sed -i 's/old/new/g'` | `edit("file.txt", old, new)` | Exact match — reports an error if not found rather than making wrong edits |
| Run a command | — | `exec(command)` | Clear naming, observable, auditable |

**Constraints are freedom**: the clearer a tool's boundaries, the more accurately the LLM will choose it. Faced with a clear `read` tool, the LLM's probability of making the right decision is far higher than facing an all-purpose `exec` and having to compose commands on its own.

### read: Perceiving the World, Protecting Context

The LLM's context window is a limited resource. Loading a 10MB log file directly into it fills up the context, and the Agent will "forget" what it was doing.

`read` uses a three-layer mechanism to protect context:

```
Layer 1: Budget Awareness
  Calculate remaining context window space
  File exceeds budget → trigger truncation

Layer 2: Intelligent Truncation (differentiated by file type)
  Code files → preserve the head (imports + function signatures)
  Log files  → preserve the tail (the latest errors are most valuable)
  Config files → keep as complete as possible (config entries are interdependent)

Layer 3: Pagination Support
  Explicitly report how much content remains unread
  Agent can issue a second call to continue reading
```

There is an easy-to-overlook detail in the pagination mechanism: it's not just "can read large files" — it's "**proactively reports how much hasn't been read yet**." This transparency allows the Agent to make informed decisions, rather than being overconfident based on truncated information.

### write: Atomic Creation

`write` does one thing only: create new files.

Its most important feature is **atomic writing** — it first writes to a temporary file, then renames it to the target filename upon success. Renaming is an atomic operation at the OS level: it either completes or it doesn't, with no intermediate corrupted state.

The constraint of "only creates new files" is an intentional safeguard. It prevents scenarios where a typo in a filename accidentally overwrites existing content, and it keeps every `write` call in the tool history semantically clear — pure creation, not replacement.

### edit: Precise Modification, Fail-Safe

The design philosophy of `edit` can be summarized in one sentence: **better to report an error than to make a wrong edit**.

It requires both the old content and the new content to be provided, searches for an exact match in the file, and only replaces if found — returning an error if not found. This is fundamentally different from `sed`, which replaces all matching strings and can inadvertently modify multiple places. `edit` reports an error directly when it cannot find a unique match.

Errors are not a bad thing. When `edit` reports "specified content not found," that error itself conveys two high-value pieces of information: the file's current content is inconsistent with the Agent's memory, or the provided old content fragment is not precise enough. Both of these point directly to the next step — re-`read` the file, then retry.

Good error messages are not obstacles; they are **clues pointing to the next step**.

### exec: The Bridge to the External World

`exec` is the most powerful of the four tools. It can run any shell command and reach almost any external system — test suites, databases, build scripts, service management. Anything the command line can do, `exec` can do.

Two technical features worth noting:

**PTY (Pseudo Terminal) support** — simulates a real terminal environment, handling color codes, real-time output, and interactive prompts. Without PTY, many programs detect the non-terminal environment and change their behavior — for example, buffering all output until completion, or refusing to start interactive mode.

A concrete example: the Agent runs `npm init` to create a new project. This command brings up an interactive Q&A — "Package name: (my-project)", "Version: (1.0.0)"... Without PTY, the Agent's LLM cannot see these prompts, and the program hangs forever. PTY lets the Agent see the terminal's real-time output, read the prompt content, and then type the correct answers to continue the flow.

**Background process mode** — commands that run continuously, like a dev server, can be started in the background and return immediately. The Agent can then check the output or terminate it at any time. This allows the Agent to continue handling other tasks while the service is running.

The complete lifecycle of a background process is: **start → run in background → check output anytime → terminate anytime**. A real-world example: the Agent starts a dev server with `npm run dev` and immediately receives a process ID, then continues processing the user's next request; when needed, it checks the server logs or terminates it via the process ID — the server keeps running, and the Agent's main thread is never blocked.

| Tool | Core Capability | Key Design |
|------|----------------|-----------|
| `read` | Perceive the world, acquire information | Three-layer defense, context protection |
| `write` | Create new files | Atomic write, clear semantics |
| `edit` | Precisely modify existing files | Fail-safe, errors guide next steps |
| `exec` | Execute commands, reach externals | PTY support, background processes |

---

## III. The Power of Combination: How Four Tools Complete Complex Tasks

What each of the four tools can do on its own looks simple. Their true value lies in **combination**.

This is like primitive types in a programming language — integers, strings, and booleans are each extremely simple, but the data structures and algorithms composed from them can express arbitrarily complex computations. The atomicity of tools is not a limitation; it is the prerequisite for combination.

Consider a concrete example: "find all TODOs and generate a submittable list."

```
Step 1  exec(grep -r "TODO" . --include="*.ts")
          → Search for TODOs in all TypeScript files

Step 2  read(src/complex-module.ts)
          → Read files containing TODOs, confirm context

Step 3  write(TODO-report.md)
          → Generate a TODO list categorized by module
```

More complex tasks use the same four tools. Refactoring a function:

```
exec  → Search for all reference locations of the function
read  → Read the function definition and call context
edit  → Modify the function signature and implementation
edit  → Update each call site
exec  → Run the test suite
read  → Confirm the test results
```

This tool chain is not pre-programmed — it is **dynamically generated at runtime** by the LLM based on the task goal. After each step completes, the return value enters the conversation history and becomes the basis for the next round of reasoning — this is the direct embodiment of the ReAct loop at the tool level.

The layers of combination capability are progressive:

```
Atomic Operations  →  Single tool call (read / write / edit / exec)
       ↓
Tool Chains        →  Multi-tool sequential calls, completing task segments with internal logic
       ↓
Single Agent       →  Dynamic orchestration of tool chains, completing full tasks
       ↓
Multi-Agent        →  Multiple Agents collaborating, each calling its own toolset
```

Four building blocks, stacked to infinite heights.

---

## IV. exec's Safety Guardrails

Greater power means greater risk. `exec` can run any command — which means it can also run `rm -rf /`.

OpenClaw's design philosophy is: **don't restrict the tool's capability; define the boundary at the outer layer**. Tools focus on functionality, security focuses on boundaries — the two are decoupled and each handles its own concern. This way, constraints can be relaxed during development for rapid iteration and tightened to minimum privilege at production deployment, without any changes to the tool's own code.

Three-layer security architecture, from coarse to fine:

| Layer | Config | Options | Role |
|-------|--------|---------|------|
| Security mode | `tools.exec.security` | `deny` / `allowlist` / `full` | Define the basic permission boundary |
| Ask mode | `tools.exec.ask` | `off` / `on-miss` / `always` | When human confirmation is required |
| Safe command allowlist | `tools.exec.safeBins` | `jq`, `head`, `tail`… | Read-only safe commands, no extra approval needed |

**Security mode** determines "what can be done" — `deny` rejects everything, `allowlist` only permits allowlisted commands, `full` imposes no restrictions.

**Ask mode** determines "whether to ask before doing" — `off` executes directly, `on-miss` asks when the command is not on the allowlist, `always` asks every time.

**safeBins** is a fine-grained supplement — for purely read-only tools like `jq`, `head`, and `tail`, you can individually allowlist them without triggering a confirmation prompt every time you need to inspect file contents.

The recommendation is to start with a conservative configuration and gradually open things up as you build trust in the Agent's behavior — this is the same principle as the "progressively building trust" discussed in chapter 2.

---

## V. Skills: On-Demand Upper-Layer Extensions

The four tools address "what can be done," but there is another dimension: **knowing how to do it well**.

An Agent that understands code review and one that doesn't use exactly the same toolset — the difference is whether it knows: security vulnerabilities should be checked first, then performance issues; a certain pattern is an anti-pattern; a certain framework has specific best practices. This is not a tool problem; it is a **knowledge problem**.

This is what the Skills mechanism is for.

A skill is a Markdown file containing specialized knowledge, checklists, and decision guidelines for a specific domain. It doesn't add new tools; it tells the Agent how to use existing tools to handle domain-specific tasks more professionally.

Skills are not pre-loaded into the context. Instead, the Agent reads them on demand via `read` when it determines they are needed during task execution — only the knowledge currently in use is in the context:

```
Tool Extensions                 Skill Extensions
────────────────────────        ────────────────────────
Expand what Agent can do        Expand what Agent knows
High generality                 Strong domain specificity
Built into the runtime          Dynamically loaded from files on demand
Change execution capability     Change decision quality
Updates require code changes    Updates require only editing Markdown
```

This design has one direct benefit: **skill updates don't require restarting the system**. Edit the Markdown, save it, and the Agent naturally gets the latest version the next time it reads. Knowledge and the runtime are decoupled, keeping maintenance costs extremely low.

---

## VI. Putting It Into Practice

The first two sections covered the principles. This section covers one thing only: now that you understand how the tool system works, how do you design, configure, and use it more reliably?

### 6.1 First Distinguish Whether You're Missing a Tool, a Skill, or a Rule

The most common mistake when starting to configure an Agent is not "under-configuring" — it's **treating three completely different kinds of problems as if they were the same problem**.

A more reliable first step is to ask yourself: **what I'm actually missing right now — capability, knowledge, or behavioral constraints?**

Use this quick-reference table:

| Symptom | More likely missing |
|---------|-------------------|
| It can't read, write, run commands, or search the web at all | A tool |
| It can do the task, but not professionally or systematically | A skill |
| It acts when it shouldn't, or its output habits are wrong | A rule / config |

Some concrete examples:

| Your problem | The right fix |
|-------------|--------------|
| "It can't start the local test suite" | Check whether `exec` / `process` is in the tool policy |
| "It can search, but can't do systematic literature review" | Add a research skill |
| "I want it to confirm before deleting any file" | Update the default rule and configure approvals / policy |
| "It doesn't know where my project's entry file is" | Write it into `TOOLS.md` or another workspace config |

Put simply:

```
Missing hands       → add tools
Missing know-how    → add skills
Missing boundaries  → change rules
```

### 6.2 Start with a Small, Stable Tool Set, Then Scope Boundaries by Context

Once you understand the distinction above, the next step follows naturally: **don't start by trying to give the Agent everything — start by thinking about which small group of tools is most valuable right now**.

This is because the cost of a large tool set is not just security risk — it's also cognitive load.

More tools means:

- More boundaries the model has to distinguish between
- More prompt and schema overhead
- More complexity in configuration and debugging
- Harder for you to reason about "why did it choose that tool"

A more reliable approach is usually:

1. Start from the default profile that best matches your task
2. Make small adjustments with `allow` / `deny`
3. Only add specific tools when you hit a clear gap

For coding or local automation tasks, you'd typically start from a `coding`-style profile. If the Agent mainly handles messaging and channel replies, the `messaging` capability boundary is usually enough.

Also, don't think only in terms of "does this system need these tools" — think in terms of "does this Agent, in this context, need these tools." OpenClaw often runs more than one Agent at a time. You might have a primary Agent, a helper Agent that only sends messages, a sub-Agent that only handles local search, a channel Agent that only operates in one surface. These roles have fundamentally different risk profiles.

A rough breakdown:

| Agent type | Appropriate capability boundary |
|-----------|-------------------------------|
| Primary Agent | Can be broader, but still scoped to the task |
| Sub-Agent | Lean toward lightweight and local; avoid system-level capabilities |
| Messaging Agent | Focus on conversation, send, and read; no need for heavy local execution |
| Read-only analysis Agent | Can read, search, and inspect — not necessarily write or execute |

Compressed to one principle:

- If a capability can be scoped locally, don't make it global.
- If a task can be solved with read-only access, don't start by granting write access.
- If something can be done in a sandbox first, don't run it on the host.

### 6.3 Design for "Usable" and "Controllable" Together

A common mistake at this stage is: spend the first half just trying to get it running, then go back and bolt on security and controllability later.

But the tool system is not well-suited to that approach, **because every known case of tool-system security problems has gone through a tool call**.

Once the Agent is wired into external commands, file writes, web or channel operations, background processes, and multi-Agent collaboration, going back to add boundaries after the fact carries a much higher cost.

The more reliable approach is to think about "usable" and "controllable" together from the start.

Four habits worth building:

1. Grant minimum privilege by default
2. Design high-risk actions and their confirmation mechanisms together
3. Treat the sandbox as the default working environment, not a patch
4. Don't casually expand `safeBins` or `elevated`

One more thing worth flagging: **don't treat third-party skills as inherently harmless documentation**.

A skill may not directly execute code, but it can absolutely guide the model step by step toward high-risk actions. When designing the tool system, it's worth thinking through "how will this skill steer tool usage." A sufficiently well-crafted skill can lead the model toward high-risk behavior while making that trajectory invisible.

### 6.4 The One Takeaway from Chapter 4

If you've read through everything so far, the most important thing to take away from this chapter is not a list of tool names or the details of any specific config field — it's a more stable way of thinking:

**A mature tool system is never about giving the Agent as many capabilities as possible. It's about using a small set of clear primitives as the skeleton, layering on-demand extensions above them, and managing the whole system with layered boundaries.**

In other words:

```
A good tool system
is not stronger because it has more tools
it gets stronger over time because it stays clear
```

This connects directly back to Chapters 2 and 3:

- Chapter 2 told us: the system needs to be able to keep making progress
- Chapter 3 told us: the system needs stable defaults
- Chapter 4 tells us: the system also needs real hands — and those hands need to know when to reach out and when to stay still

---

## Chapter Summary

This chapter covered three things.

First, **the tool system bridges the gap from "knowing how" to "actually doing it."** Without it, an Agent is at best a chat assistant that gives advice; with it, the Agent can genuinely read, write, edit, and execute — and bring results back into the next round of reasoning.

Second, **OpenClaw's tool system is not a static list — it's a runtime chain.** Tools travel from the underlying skeleton through assembly, injection, filtering, execution, result-passing, and guardrails before they appear in any given run.

Third, **once you understand the mechanism, the most important thing is not to pile on more tools — it's to diagnose the right problem type and assign capability boundaries by context.** Missing a tool? Add a tool. Missing professional know-how? Add a skill. Missing behavioral constraints? Change the rules. Give less when you can. Layer when you can. Put it in the sandbox when you can.

If Chapter 4 comes down to one sentence:

**The real strength of an Agent's tool system is not in how many moves it knows — it's in knowing exactly when each move should and shouldn't be made.**

---

## Summary

Four primitive tools, dynamically orchestrated by an LLM, can accomplish arbitrarily complex local computing tasks. The secret is not in the tools themselves, but in the fact that the return value of every call flows back into the ReAct loop and becomes the basis for the next round of reasoning — tools are both the Agent's hands and its perceptual system.

| Tool / Mechanism | Problem Solved | Key Design |
|-----------------|---------------|-----------|
| `read` | Perceive the world, protect context | Three-layer defense (budget / truncation / pagination) |
| `write` | Create new content | Atomic write, clear semantics |
| `edit` | Precisely modify existing content | Better to error than to make wrong edits |
| `exec` | Reach the external world | Three-layer safety guardrails, PTY support |
| Skills | Extend domain knowledge | On-demand loading, zero maintenance cost |

Less is more — simplicity ensures orthogonality, orthogonality ensures composability, and composability is the true superpower.

The reason four building blocks are enough is not that they are individually powerful, but that they are **sufficiently orthogonal** — each one only does its own thing, without overlapping with the others, so they can be freely combined, and the resulting capability has no ceiling.

---

→ [Chapter 5: The Message Loop](../chapter5/index.md)
