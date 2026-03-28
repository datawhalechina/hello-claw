# Chapter 2: The ReAct Loop — The Core Engine of an Agent

> **The core question**: You issue a command — how does the Agent turn it into a final result after a dozen steps? The key to that journey is a loop that continuously drives itself forward.

---

Ordinary AI answers **questions**. An Agent solves **tasks**.

The gap between those two words is much larger than it sounds. Answering a question takes one step — "What's the temperature in Beijing today?" — the AI checks and tells you 23°C, done. But solving a task often requires a dozen steps, and the direction of each step depends on the result of the previous one.

"Help me organize all the TODO comments in the project, categorize them by module, and generate a list ready for review" — that's not a question, it's an engineering job.

What OpenClaw can do is exactly this kind of thing. And the fundamental reason it can do it is a core engine called the **ReAct loop**.

Understand this loop, and you understand the essential difference between an Agent and an ordinary LLM.

---

## I. The Ceiling of "Answer Once"

Start with a familiar scenario. You open ChatGPT and ask it to analyze your project's code structure. It's smart — it tells you how to analyze it, even gives you a detailed analysis framework.

But if you actually want it to **analyze it for you** — it gets stuck. It can't see your code.

Even if you paste the code in and it tells you "there's a potential null pointer issue on line 47," and you want it to go ahead and fix it — it gets stuck again. It has no way to modify your files.

Even if you manually tell it how to fix it, come back tomorrow and it's a fresh start from zero.

This isn't ChatGPT being insufficiently smart. This is **the ceiling of single-turn question-and-answer mode**:

| Limitation | Root Cause |
|------------|------------|
| Cannot proactively gather information | No tools — can only rely on the user to feed it data manually |
| Cannot make sustained progress | Each response is independent; it can't build on the result of the previous step |
| Cannot self-correct | If the output goes wrong, it goes wrong — no mechanism to verify or adjust |
| Doesn't remember progress | Mid-task, the next conversation starts from zero |

The essence of single-turn dialogue is: you provide all the information, the AI produces an answer in one shot, and that's it.

But real tasks don't work that way. Real tasks are **dynamic** — you can't know all the information you'll need at the start, and the result of each step shapes the direction of the next. This requires a completely different way of working.

---

## II. The Birth of the Loop: Observe → Think → Act

In October 2022, researchers at Princeton University published a paper proposing a deceptively simple idea: **let language models alternate between reasoning and acting**.

The paper was called ReAct — Re for Reasoning, Act for Acting. The core insight: reasoning and action should not be separated. Think before acting, observe after acting, think again after observing — repeat until the task is done.

OpenClaw's core engine is built on this idea:

```
User Input
    ↓
  ┌─────────────────────────────────────────────┐
  │  ① Observe                                  │
  │     Receive the current state:              │
  │     · What the user sent                    │
  │     · What the tool returned last time      │
  │     · What the conversation history holds   │
  └───────────────────┬─────────────────────────┘
                      ↓
  ┌─────────────────────────────────────────────┐
  │  ② Think                                    │
  │     Hand context to the model for reasoning:│
  │     · Where has the task progressed?        │
  │     · What should happen next?              │
  │     · Call a tool, or reply to the user?    │
  └──────────────┬──────────────┬───────────────┘
                 │              │
           Call a tool     Task complete
                 │              │
                 ↓              ↓
  ┌──────────────────┐      Send to user
  │  ③ Act           │     (loop ends)
  │     Execute tool │
  │     Append result│
  │     to history   │
  └──────┬───────────┘
         │
         ↓
    Back to ① Observe
   (with new observations)
```

This loop has one critically important design detail: **the result of every tool call is appended to the conversation history**.

What does that mean? On the fifth round of reasoning, the model can "see" everything that happened in the previous four — which tools were used, what results came back, what errors were encountered. It's not guessing what happened; it's reading a complete action log and deciding the next step based on that log.

This is the fundamental fork in capability between an Agent and an ordinary LLM. **An ordinary LLM performs a one-shot computation; the ReAct loop performs continuous exploration** — each step stands on the shoulders of all previous steps, progressively converging on the goal.

### Why Serial Execution

You might wonder: can't multiple tools run in parallel to speed things up?

No — at least not within the same task. The reason is **causal consistency**:

```
"First create a file, then write content into it"

If executed in parallel:
  Create file  →  not yet complete
  Write content  →  file doesn't exist, write fails  ✗

If executed serially:
  Create file  →  success  →  Write content  →  success  ✓
```

In real tasks, the meaning of operation B often depends on the result of operation A. An Agent isn't executing a script in a static environment — it's advancing work in a world that keeps changing because of its actions. Serial execution is the inevitable requirement of this dynamic world.

### Where ReAct Sits Among Three Approaches

Before ReAct, two extreme approaches had been tried:

| School | Strategy | Fatal Weakness |
|--------|----------|----------------|
| Plan-first | Generate a complete plan upfront, then execute step by step | The plan rests on assumptions about the future; hard to correct when the unexpected happens |
| React-only | Perceive-act-perceive-act, no reasoning layer | No goal orientation; easily trapped in local optima |
| **ReAct** | **Every step is a complete observe-reason-act micro-loop** | Serial execution; cost of deep loops grows with history length |

The flaw in the plan-first approach: if step 3's input depends on step 2's output, and step 2's result is completely unknown before execution, the plan is wishful thinking. The flaw in the react-only approach: no reasoning layer means no internal representation of the goal — the Agent can't tell whether it's getting closer to or drifting away from the target.

ReAct takes the middle road: act with the best current judgment, let each step's result validate or revise prior assumptions. This more closely mirrors how humans actually work through complex tasks.

---

## III. How the Loop "Remembers"

The ReAct loop must span multiple steps to complete a task, which raises a critical question: how does the loop "know" at each step what it has already done?

The answer doesn't rely on the model's implicit memory — it relies on **explicit conversation history**.

### Working Memory: Living in the History

After every tool call, the result is appended to the conversation history — like taking real-time notes for itself. On the tenth round of reasoning, the model can read everything that happened in the previous nine steps: which tools were used, what results came back, what errors were encountered, how those errors were handled.

This ever-growing chain of history is the loop's **working memory**.

This design has an important characteristic: **complete transparency**. You can open the history and see step by step what decision the Agent made at each point and why. No black box, no hidden state. Transparency isn't an added feature — it's a natural product of this architecture.

### Three-Layer Memory Structure

Working memory has a physical limit — the model's context window. For tasks that span dozens of steps or multiple sessions, conversation history alone isn't enough. OpenClaw implements three layers of memory:

| Layer | Time Scope | Storage | Analogy |
|-------|-----------|---------|---------|
| Working memory | Current session | Conversation history (in memory) | Work files spread open on the desk |
| Long-term memory | Across sessions | MEMORY.md (filesystem) | A work notebook in the drawer |
| World knowledge | Fetched on demand | Read via tools | A library — you go when you need it |

The core principle of three-layer memory: **the right information appears at the right moment**. Not stuffing all information into the context at once, but loading on demand. Just like you don't move the entire library to your desk when working — the desk holds the files for the current task; more resources are fetched when needed.

### When History Gets Too Long: Context Compression

When a task is complex enough and the loop runs deep enough, conversation history keeps growing and eventually approaches the physical limit of the context window. OpenClaw's response is **progressive compression**:

```
Preventive compression (checked after each round):
  Context pressure exceeds threshold  →  Proactively compress early records into a summary  →  Free space for subsequent rounds

Overflow recovery (when the limit has already been exceeded):
  Immediately compress early messages into a summary, retain the most recent N rounds in full  →  Continue execution
```

Compression is information distillation: preserving "what happened" while compressing "how each step was done." The cost is losing fine-grained details from earlier steps; the gain is that the task can keep moving forward.

Proactive prevention is more elegant than reactive recovery — the task ends before the context is exhausted, rather than being forcibly interrupted by an overflow.

---

## IV. How the Loop "Heals Itself"

Traditional programs throw exceptions when they encounter errors — reasonable in closed systems, where all possible error conditions can be enumerated upfront and handled with preset logic.

But an Agent works in an open world. External APIs time out, files may not exist, command output may have unexpected formats, user intent may reveal a mismatch only partway through execution — no one can enumerate all possible failure cases in advance.

ReAct's approach to errors is a **philosophical reversal**:

```
Traditional model:
  Execute  →  Error  →  Throw exception / crash / preset error handler  →  Terminate

ReAct model:
  Execute  →  Error  →  Error appended to conversation history
                              ↓
                        Next reasoning round "sees" the error
                        "That approach doesn't work, because X —
                         so I should try Y"
                              ↓
                        Change direction, keep moving
```

**Errors are not triggers for program termination — they are signposts guiding the Agent toward the correct path.**

The Agent doesn't need to enumerate all possible error conditions upfront; it only needs the reasoning ability to replan based on error information. This gives the Agent a robustness similar to how humans solve problems — not avoiding attempts out of fear of mistakes, but relying on the ability to learn from errors to progressively converge on the goal.

One easily overlooked detail: the quality of tool return values directly affects loop efficiency.

A clear error message — "File not found: path does not exist, current working directory is `/home/user`" — lets the Agent find the right direction immediately in the next round. A vague error — "Operation failed" — may require several rounds before the Agent can diagnose the true cause.

Tool designers need to recognize: **a tool's return value is not just for the user to read — it's primarily for the model's reasoning in the next round**.

---

## V. How the Loop "Knows When to Stop"

An autonomous loop brings capability — and with it a new problem: when to stop?

Without a termination mechanism, an Agent might plunge endlessly in the wrong direction, consuming massive resources without realizing it. Or it might autonomously decide on a high-risk operation without obtaining user authorization. OpenClaw's answer is: **constrained autonomy** — not eliminating autonomy, but drawing clear boundaries around it.

### Three Termination Conditions

| Termination Type | Trigger Condition | Agent's Behavior |
|-----------------|-------------------|------------------|
| Normal termination | The model determines the task is complete | Generate the final reply and send it to the user |
| Safety termination | A resource or time boundary is reached | Report current progress and request instructions |
| Abnormal termination | Sustained failure with no recovery possible | Honestly report where it's stuck and why |

Safety termination and abnormal termination are equally important. **An Agent that can clearly say "I can't go further from here, because X" is far more trustworthy than one that silently gets stuck.** An honest failure report lets the user adjust the task description, provide additional information, or choose a different direction — rather than facing an unresponsive black box.

### Loop Detection: Recognizing "Spinning in Place"

There is a common form of runaway loop: the Agent repeats the same operations without making real progress. Tools keep failing but the Agent doesn't change direction, just retrying endlessly; or two operations cancel each other out, alternating back and forth while staying in the same place.

OpenClaw implements a loop detection mechanism — identifying repetitive behavior patterns with no progress, forcing a re-evaluation of strategy at the right moment, or requesting human intervention.

This is a safety net, not the primary flow-control mechanism. In the ideal case, the Agent's reasoning ability should self-identify and adjust before falling into a truly unproductive loop. When loop detection is triggered, it often signals that the task itself has some structural problem — either an inherent contradiction in the task definition, or an unreachable external resource required — the kind of situation that needs human intervention to redefine the problem.

### Human Intervention: Knowing When to Stop and Ask

Reducing intervention does not mean eliminating it. Some operations are irreversible — deleting files, sending external notifications, submitting changes that cannot be rolled back — the cost of the Agent deciding unilaterally is too high.

The framework for judging whether human confirmation is needed is simple:

- **Is it reversible?** Reading and analyzing are safe; deleting and sending externally require confirmation.
- **What is the scope?** Modifying a test file and modifying core configuration are on completely different risk scales.
- **Is there enough information?** When information is incomplete, asking is wiser than guessing.

OpenClaw's Ask mode (`off` / `on-miss` / `always`) codifies this judgment framework into configurable behavioral rules. The recommendation is to start conservatively, and as you build trust in the Agent's behavior, gradually loosen the constraints — **progressively building trust is more robust than delegating everything from the start**.

---

## VI. Putting It into Practice

The previous sections explained how the Agent Loop works. Now for the practical question: **given that OpenClaw is built to sustain multi-step tasks, how should you actually use it?**

### 6.1 First, Determine Whether It's a Complex Task

Many people approaching OpenClaw for the first time treat it as a "customizable chat AI."

This is understandable. OpenClaw has a relatively low barrier to customization, and for many people it may be their first experience building a custom Agent. The problem is that without understanding where its real strength lies, it's easy to hand it ordinary conversational tasks — things like:

- Explain a concept
- Translate a passage
- Polish an email
- Summarize some material

It can handle all of these, but the results are rarely meaningfully different from any ordinary chat model. That leads many people to a mistaken conclusion: **OpenClaw doesn't seem particularly special.**

The problem isn't that OpenClaw lacks capability — it's that the task never called on its actual capabilities.

As the earlier sections explained, what makes OpenClaw distinctive isn't that it's "better at conversation" — it's that it can take a task and keep pushing it forward on its own. Its advantage appears specifically with things that **can't be resolved in a single exchange**.

So the first thing to learn after understanding the Agent Loop is not which command to type, but to ask first: **is this actually a complex task worth handing to OpenClaw?**

"Complex" here doesn't necessarily mean difficult or large. More precisely, it means the task has characteristics like these:

- The number of steps isn't fixed upfront
- Intermediate feedback will change the direction
- It requires tools, files, commands, or external environment involvement
- The goal is clear, but the path shouldn't be scripted in advance

For example:

- "Explain virtual memory" — this is closer to a question. The value is in the answer itself, not the process.
- "Get the tests in my project to pass" — this is closer to a task. The value isn't in what to say, but in what comes next: reading code, running tests, reading errors, making changes.

The key shift for new users: stop asking "can OpenClaw do this?" and start asking "**does this task actually require multi-step progression to get done properly?**"

If the answer is no, an ordinary chat model will usually do fine.

If the answer is yes, that's where OpenClaw's advantage becomes real.

In short: **only when you've chosen the right kind of task will OpenClaw's strengths actually show. If the task is just a single exchange, it won't conjure any difference out of thin air.**

### 6.2 Then, Learn to Hand Off Tasks Properly

Once you've determined that something should be handed to OpenClaw as a task, the next thing to learn is how to hand it off clearly.

The least effective approach is usually "give it a fixed list of steps."

Rather than this:

```
First do A, then do B, then do C, finally produce D.
```

What usually works better for the Agent Loop is something like:

```
Help me accomplish X.
Use the smallest possible change to solve it.
Don't touch Y.
If you find it's a Z-type problem, tell me before continuing.
When done, explain what you changed and how you verified it.
```

Why does this work better? Because it gives the system what it actually needs:

1. **Goal** — what the end result should be
2. **Boundaries** — what's in scope, what isn't
3. **Completion criteria** — what "done" looks like
4. **Risk threshold** — what situations require checking with a human first
5. **Reporting format** — how to account for the result at the end

Not scripting the path is precisely the point. OpenClaw's value is in its ability to adjust course based on intermediate feedback. Lock the path in advance and the system can only follow it mechanically; define the goal and boundaries clearly and it has the room to push the task forward step by step.

There's one more thing that's easy to underestimate but genuinely important: **context budget is a real cost.**

The official [Context documentation](https://docs.openclaw.ai/concepts/context) is explicit that a single run's context includes the system prompt, session history, tool calls and results, attachments, and even tool schemas themselves. The official [System Prompt documentation](https://docs.openclaw.ai/concepts/system-prompt) also notes that bootstrap files in the workspace get injected into the prompt.

In plain terms: your task description, workspace instruction files, prior conversation, and tool output all compete for space in the same context window.

This has two direct practical consequences:

- Constraints that need to hold long-term should be stated clearly and stably — not scattered across casual back-and-forth
- On long tasks, you need to consciously manage context rather than assuming the model will "just keep remembering"

OpenClaw already provides the tools for this:

- `/status` — see current window pressure and session settings
- `/context list` — see what's currently injected
- `/context detail` — see a finer breakdown
- `/compact` — compress old history into a summary to free space for subsequent runs

So when you hand something to OpenClaw as a task, it's not just "submitting a request" — you're also starting to **manage context like you're managing an ongoing execution**.

### 6.3 Finally, Learn to Collaborate

Once something enters multi-step execution, the relationship between user and system changes.

In ordinary chat, the user is more like "the person asking questions." In task execution, the user is more like "a collaborator." This isn't an abstraction — it maps to a few very concrete habits.

**First, learn to watch the process.**

On a long task, checking, trial and error, backtracking, and retrying are all normal. It's not "stalling" — it's correcting direction based on new observations.

**Second, surface critical constraints early.**

If you realize any of the following, don't wait until the task is finished to mention it:

- Don't modify the public interface
- Read-only for now, no writes yet
- Don't touch this directory
- Ask before deleting files, sending messages, or running dangerous commands

The earlier these constraints are stated, the lower the chance the loop drifts somewhere unwanted.

**Third, correct course promptly.**

The Agent has self-correction ability, but that doesn't mean it will always find its way back on its own. When a direction is clearly wrong, the more effective move is usually not to wait silently — it's to reset the boundary directly:

```
Pause — don't continue down this path.
First explain to me why you reached this judgment.
```

Or:

```
Stop making changes.
Just do an inspection for now, and tell me your current conclusion and the evidence behind it.
```

**Fourth, treat confirmation as a normal part of collaboration, not a sign that something has gone wrong.**

OpenClaw's engineering boundaries are designed to accept that some actions should stop and wait for a human decision — especially high-risk, irreversible, or wide-impact operations. The ability to pause and ask at these moments is a sign that the system's boundaries are working correctly.

To compress this section into a few practical principles:

- Not everything needs to be handed off as a task
- When handing off a task, goal, boundaries, and completion criteria matter more than a scripted list of steps
- On long tasks, watch the process — don't wait only for the final line
- When direction goes wrong, surface information and correct course early
- Confirmation at high-risk points is collaboration, not interruption

**OpenClaw chose the Agent Loop — which means when we use it, we're not waiting for an answer. We're working alongside it to complete a task.**

---

## Summary

The ReAct loop answers a fundamental question: how do you evolve AI from "answer once" to "see a task through to completion"?

Not by making the model smarter, but through an architectural design: turning the result of every action into fuel for the next thought, turning every error into a signpost for adjusting direction, and stringing the entire process into a traceable action log.

| Core Loop Capability | How It's Implemented |
|----------------------|----------------------|
| Multi-step sustained progress | Results appended to history; each step decides based on that foundation |
| Cross-step state memory | Three-layer memory structure: working / long-term / world knowledge |
| Error self-healing | Errors are observations; failure is information, not termination |
| Controlled autonomy | Termination conditions + loop detection + human intervention timing |

**This loop is the operational foundation for OpenClaw's other five pillars.** The prompt system equips it with identity and rules; the tool system provides the hands and feet for interacting with the world; the message loop manages its concurrent scheduling; the unified gateway receives input from every channel; the security sandbox vets every tool call.

But understanding the loop is only half the picture. Knowing when a task genuinely calls for it, handing it off with a clear goal and boundaries rather than a scripted path, and staying engaged as a collaborator throughout — these are what determine whether the loop's capability is actually put to use.

One message comes in, six pillars work in concert, the ReAct loop turns — this is what a "digital living system" actually looks like in operation.

---

→ [Chapter 3: The Prompt System](/en/build/chapter3/index.md)
