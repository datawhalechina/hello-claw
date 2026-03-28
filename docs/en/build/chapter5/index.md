# Chapter 5: Message Loops and Event-Driven Design — The Heartbeat of an Agent

> **Core question**: If you and a colleague send messages to an Agent at the same time, will the two requests get tangled up? When nobody is talking to the Agent, can it proactively find problems on its own?

---

Start with a familiar scenario. You're looking for a coffee shop in an unfamiliar city. You don't stand at the hotel door and mentally plan every possible route before stepping outside — you take one step, decide at the intersection, backtrack if you go wrong, adjust after asking for directions. An Agent handles tasks the exact same way: the result of each action determines where to go next.

But reality is a bit more complicated. Imagine it's three in the afternoon. You're refactoring a module and send the Agent two messages in quick succession — "create output.csv first," immediately followed by "write the analysis results to that file." At the same time, your colleague is using the same Agent instance to run a test script.

Four messages, arriving almost simultaneously. If the system "processes on receipt," what happens? The write operation might run before the create operation and throw a "file not found" error; your refactoring context and your colleague's test context might contaminate each other; the result is a mess for everyone.

This isn't an edge case — it's the everyday reality of a running Agent. **Message arrival is unordered and concurrent, but the Agent is stateful** — this contradiction is the core problem a message system must solve.

This chapter discusses two design decisions: the **swim lane model** lets Agents run reliably in concurrent environments; the **heartbeat mechanism** gives Agents proactive agency in the time dimension. Together, they answer the most fundamental question in Agent architecture: is it a "tool," or a true "collaborator"?

---

## I. The Out-of-Order Problem in a Concurrent World

### Why "Process on Receipt" Doesn't Work

For a single user, "reply in order" seems like an obvious given. But think about it for a moment and you'll realize that message **arrival** and message **execution** are two different things.

Users type fast, networks are unstable, multiple sessions are active at once — in these situations, messages don't line up neatly waiting to be processed.

| Problem | Consequence |
|---------|-------------|
| Concurrent conflict | Two messages modify the same file simultaneously, corrupting data |
| Out-of-order execution | "Create file" and "write to file" run out of order; the latter can't find the result of the former |
| Context contamination | Messages from different users' sessions get mixed together; the Agent loses track of who it's talking to |

These three problems point to the same underlying contradiction: the Agent has state, but message arrival is unordered. Resolving this requires inserting a scheduling layer between message arrival and message execution — a **command queue**.

A command queue is not a performance optimization; it is a correctness guarantee. Without it, an Agent's state can enter an inconsistent state at any moment under concurrent pressure.

### From "Request-Response" to "Event-Driven"

Traditional software uses a request-response pattern: you send a request, wait for the result, then move on. This works fine for operations with predictable execution times.

But an Agent's execution time is unpredictable — a question might be answered in three seconds or might take five minutes. And message sources are not limited to one: user instructions, scheduled tasks, and sub-Agent callbacks all need to be handled uniformly.

This is where the advantages of an event-driven model truly shine: messages enter the queue first, then the scheduler picks them out in order for execution. **The sender and the executor are decoupled in time** — the person who sent the message doesn't have to sit and wait; the executor handles things at its own pace.

More importantly, this model unifies message sources: user messages, heartbeat triggers, and Cron expirations are all, architecturally, "one message entering the queue." The scheduler is only responsible for ordered execution, regardless of where the message came from.

---

## II. The Swim Lane Model: Where Order Comes From

### One Rule, Two Effects

The core scheduling strategy of the command queue is called the **swim lane model**, and it has just two rules:

- **Within the same lane**: messages are strictly serial (one finishes before the next is processed)
- **Across different lanes**: messages are fully parallel (neither waits for the other)

**One lane = one session**

```
Lane A (Session A): Message 1 ──────────────── Message 2 ──→ Message 3
                    Sequential execution, strictly serial

Lane B (Session B):      Message 4 ──→ Message 5
                                   Fully parallel with A, no interference

Lane C (Session C):         Message 6 ──────────────────→ Message 7
```

Your messages run in order in Lane A, your colleague's messages advance simultaneously in Lane B, and the two lines don't interfere with each other. A 5-minute refactoring task won't block your colleague's quick query.

### Why "Session" Is the Isolation Unit

A session is a natural isolation boundary, and the reason is **causal consistency**.

You send "create the file first, then write the content" — the second message carries an implicit assumption: the first one is already done. This kind of sequential dependency is everywhere within a single conversation. Serial execution is the way to encode this human common sense into the architecture.

Whereas different users' sessions have no such causal relationship. Your operations and your colleague's operations are independent of each other. The isolation granularity of the swim lane model perfectly matches the actual scope of causal dependency — avoiding both extremes of "all messages in a single queue" (over-serialization, slowing everyone down) and "parallelizing within the same session too" (under-serialization, creating disorder).

Isolation also brings an engineering benefit: **a failure in one lane doesn't contaminate other lanes**. If a session enters a dead loop or an abnormal state, the scheduler can terminate that lane while other sessions continue running normally.

This fault isolation is the "session-level" link in a larger fault-tolerance system. The complete three-tier fault-tolerance approach is: **task-level** (retry or switch strategies when a single tool call fails) → **session-level** (isolate and recover when a lane goes abnormal, without affecting other sessions) → **service-level** (monitoring and fallback for the entire system). The swim lane model operates at the second tier — the tier where isolation value is most clearly demonstrated.

### Swim Lanes Are Not Just "User Sessions"

The isolation boundary of a swim lane is "task type," not just "user session." OpenClaw divides tasks into four types of lanes:

| Lane Type | Description |
|-----------|-------------|
| User session lane | One lane per user session, handling regular conversation requests |
| Cron lane | Scheduled tasks run independently, without occupying user session queues |
| Sub-Agent lane | Sub-Agent calls and callbacks execute in isolated lanes |
| Nested task lane | Nested tasks have their own isolated execution context |

This means: a long-running Cron task won't block a user's real-time request; a sub-Agent failure won't propagate back and contaminate the main session. Isolation is system-wide, not only for multi-user concurrency.

---

## III. Five Queue Modes

### What Happens to New Messages While the Agent Is Busy

The swim lane model solves the problem of "different users not waiting on each other." But there's another scenario without an answer: **what happens when a new message from the same user arrives while the Agent is busy?**

"Wait until it's done" isn't always right. Sometimes the user realizes the direction is wrong and needs to course-correct immediately; sometimes it's just supplementary information and waiting is fine; sometimes the user genuinely needs to interrupt the current task.

Different intentions require different handling strategies. OpenClaw defines five queue modes:

| Mode | Behavior | Use Case |
|------|----------|----------|
| `collect` | After the Agent finishes, merge and follow up with any pending messages | Default case; user can wait |
| `steer` | Inject immediately into the current run, guiding the Agent to adjust direction | "No, do X first, then Y" |
| `followup` | Queue until the current task completes, then process | Tasks with an explicit ordering dependency |
| `interrupt` | Immediately interrupt the current run and process the new message | Emergency stop or directional error |
| `queue` | Standard sequential mode, execute in order | Ordinary sequential tasks |

### Modes Are Engineering Expressions of User Intent

Note: the same message may correspond to a different mode depending on timing.

"Do X first" — if the task has just begun, use `steer` while there's still time to adjust; if the task is nearly complete, use `followup` and schedule X after completion.

The five modes correspond to five different user mindsets:
- `collect` assumes the user trusts the Agent to complete the current task
- `interrupt` assumes the user believes the current direction is already wrong
- `steer` assumes the user wants to fine-tune without losing current progress

Explicitly modeling these mindsets as scheduling parameters is the engineering approach to concretizing user control. Users don't need to understand queue implementations; they just need to choose the mode that best matches their intent.

### Loop Detection: The Safety Net for System Robustness

Queue modes address the problem of "what does the user want," but there's another class of silent failures to prevent: an Agent getting stuck in a loop of tool calls, repeatedly doing the same thing with no progress. OpenClaw has four built-in loop detection mechanisms:

| Type | Detection Target |
|------|-----------------|
| `generic_repeat` | Calling the same tool more than N times with essentially the same parameters |
| `known_poll_no_progress` | Polling a status where the result never changes substantively |
| `ping_pong` | Two operations canceling each other out in alternation (e.g., delete then create, create then delete) |
| `global_circuit_breaker` | A global circuit breaker that forcibly terminates when overall call count exceeds the limit, as a last resort |

When a loop is detected, the system interrupts the current execution and reports to the user, avoiding pointless consumption of tokens and time. The first three target specific patterns; the last is the final safety net — whatever the cause of a runaway loop, it will be caught at the global level.

---

## IV. The Heartbeat Mechanism: The Agent's "Biological Clock"

### A Butler Who Only Speaks When Asked

The swim lane model and queue modes solve the problem of "how to handle messages." But a more fundamental question remains unaddressed: **if no messages arrive, what can the Agent do?**

Imagine a butler who only speaks when you ask. You'd never know: an important email went unaddressed three hours ago, the monitoring service has stopped responding, a background task is waiting for instructions.

What you need is a butler who proactively "wakes up" to check.

This is the problem the heartbeat mechanism solves. It gives the Agent a third layer of time awareness:

```
Layer 1: Knowing what time it is now
  └─ Inject the current timestamp into the prompt; can make time-related judgments

       ↓

Layer 2: Knowing how long it's been since the last interaction
  └─ Persist session state; sense the "duration of silence"

       ↓

Layer 3: Proactively triggering itself at a scheduled time  ← What the heartbeat implements
  └─ Set an "alarm," autonomously execute a checklist at agreed-upon times
```

Most Agent frameworks stop at layer one; a few reach layer two. **Layer three is the dividing line between a "tool" and a "collaborator"** — an Agent that has it no longer merely responds; it has its own rhythm.

### HEARTBEAT.md: The Checklist

The implementation of the heartbeat mechanism is deliberately kept simple: write a checklist in natural language in `HEARTBEAT.md`, and the Agent executes it item by item each time it is periodically awakened.

```markdown
# Heartbeat checklist

- Quick scan of inbox — any urgent emails?
- Check background task status — anything stuck?
- If any user has been waiting for a reply for more than 2 hours, send a reminder
```

**The mechanism (periodic wakeup) is provided by the system; the content (what to check) is decided by the user.** The two are separated, allowing the heartbeat mechanism to serve any use case without needing to know the user's specific needs in advance.

Changing the checklist requires no code changes, no redeployment. Edit the file, save it, and the next heartbeat runs according to the new checklist.

### HEARTBEAT_OK: The Philosophy of Silence

The most elegant design in the heartbeat mechanism is not how it triggers, but how it **avoids disturbing**.

If every heartbeat pushed a notification — even if the content is just "all clear" — users would quickly start ignoring all notifications, and truly important information would get buried along with them. This is why most proactive-design features fail: the system becomes "too chatty."

The solution is a convention: when there's nothing to report after a check, the Agent simply replies `HEARTBEAT_OK`, and the system **silently discards** it — the user perceives nothing.

```
Heartbeat triggers
  ↓
Agent reads HEARTBEAT.md, checks each item
  ↓
  ├── Nothing requires attention → reply HEARTBEAT_OK → system discards it, user unaware
  │
  └── Something requires attention → reply with actual content → user receives notification
```

This reflects a more general principle: **the value of proactivity lies in speaking only when there is something meaningful to say.** Uneventful heartbeats produce zero disturbance; notifications only go out when there's content. `HEARTBEAT_OK` turns "silence" from a default behavior into an explicit architectural choice.

### Heartbeat vs. Cron: Two Kinds of Proactivity

OpenClaw provides two scheduling mechanisms, each with its own focus:

| Dimension | Heartbeat | Cron Task |
|-----------|-----------|-----------|
| Trigger mode | Fixed-interval periodic trigger | Standard time expression, precise to a specific moment |
| Execution context | Main session, with full conversation history | Optionally an isolated independent session |
| Task nature | Continuous status monitoring | Deterministic tasks at a precise point in time |
| Silence mechanism | HEARTBEAT_OK; discarded when there's nothing to report | Configurable whether to push |

Recommendation: if you need execution at a precise moment ("send the weekly report every Monday") → use Cron; if you need continuous status monitoring ("check for urgent messages at any time") → use Heartbeat. The two can be combined, each handling the scenarios it handles best.

More specific decision criteria:

| Your Need | Recommendation | Typical Example |
|-----------|---------------|----------------|
| Execution at a precise moment | Cron | "Send weekly report every Monday at 9 AM" |
| Continuous status monitoring | Heartbeat | "Check for urgent messages at any time" |
| Clear conversational context | Heartbeat | Executes in the main session; can see the full history |
| System tasks decoupled from conversation | Cron | Generate reports, clear cache, back up data |

The essential difference between the two is **context ownership**: the heartbeat executes in the main session, so the Agent can see the full conversation history and reference past conversation content (e.g., "the user mentioned last time they wanted to track this task"). Cron tasks are better suited for system-level tasks decoupled from a specific conversation — generating reports, clearing caches.

---

## V. Practical Configuration: Staying Grounded

The previous four sections covered the underlying principles. This section is more concrete: **if you're actually starting to use this system, how should you configure it — and how do you avoid tying yourself in knots?**

### Start with Stability, Not Maximum Flexibility

When most people first encounter these configuration options, the instinct is: "The system is this powerful — shouldn't I turn on all the flexible modes?"

Usually not. For someone just getting started, what matters most is not "can it immediately course-correct intelligently," but: **is its behavior stable, predictable, and easy to review?**

A more grounded starting configuration looks like this:

| Setting | Starting Recommendation |
|---------|------------------------|
| Default queue mode | Start with `collect` |
| Concurrency | Keep it conservative; don't set global concurrency too high |
| Heartbeat | Write a short, focused checklist to begin with |
| Cron | Reserve it for tasks that genuinely need precise scheduling |

Why start with `collect`? Because it aligns with most people's intuitions: finish what's currently in progress, hold any new input, then pick everything up afterward. That makes behavior easier to observe and easier to reason about. Once you're comfortable with the system, you can introduce `steer` or `interrupt` for scenarios that warrant them.

### How to Choose Among the Four Common Modes

If you want a single practical decision table, this is it:

| Your actual intent | Better-suited mode |
|--------------------|-------------------|
| "I'm just adding context — finish what you're doing first" | `collect` |
| "Keep the order right — finish this before starting the next" | `followup` |
| "Don't stop, but adjust to this new direction immediately" | `steer` |
| "Stop now — this direction is already wrong" | `interrupt` |

The easiest to confuse are `steer` and `interrupt`. The difference is simple: `steer` is "turn while still moving"; `interrupt` is "brake first, then start fresh."

If the current run still has value worth preserving, use `steer`. If the current run is clearly wrong and continuing would only waste time, use `interrupt`.

`followup` earns its place when you need to make the ordering explicit. It works well for unambiguous task chains, like:

```
Run the tests first
  → Once the tests finish, compile the list of failures
  → Once that's done, write up the fix recommendations
```

In these situations, `followup` is often more precise than `collect`, because it doesn't just mean "deal with it later" — it means "this step is definitely next."

### Divide Responsibilities Between Heartbeat and Cron

A practical combination that works well:

```
Heartbeat:
  Lightweight monitoring, follow-ups, gentle reminders

Cron:
  Precise execution, reports, routine scheduled tasks
```

Consider a student research project: heartbeat checks periodically whether any experiments have completed, whether a collaborator has sent new messages, whether there's anything to follow up on; cron runs a fixed summary of experiment results every evening.

With this split, each does its own job: heartbeat keeps the Agent "alive and aware"; cron keeps it "on schedule."

The reverse doesn't work as well. Using cron for continuous monitoring feels rigid, because cron is a hammer that fires at a fixed moment — it's good at "do this at exactly this time," but not at "keep watching the current session for anything new." Using heartbeat to carry all scheduled tasks creates confusion too, because heartbeat's purpose is status monitoring, not a timetable.

The better mental model is not "pick one" — it's: **let heartbeat handle what needs watching, let cron handle what needs a precise time.**

### When Troubleshooting, Check Scheduling First, Then the Model

When something goes wrong, most people's first instinct is: "Did the model misunderstand something?"

Sometimes that's the cause. But in the message system layer, the more common root cause is that things went wrong earlier in the pipeline. A more reliable troubleshooting sequence:

1. Did this message land in the right session?
2. Did it land in the right lane?
3. Does the current queue mode actually match your intent?
4. Was heartbeat or cron skipped, delayed, or silently handled?
5. Only then — suspect the model's reasoning.

A useful way to remember it: **check whether the queue was set up right before you blame the person doing the work.**

In practice, this often looks like:

- You think the system "never responded" — it was actually still queued behind a long-running task.
- You think heartbeat "stopped working" — it was returning `HEARTBEAT_OK` normally, or running an internal check without sending anything externally.
- You think cron "didn't execute" — it ran in an isolated session, and its output isn't in your current chat window.

None of these are model-reasoning problems; they're runtime mechanics. Once you establish this troubleshooting order, most issues become much faster to pinpoint.

---

**The one-line takeaway for this section:** For most people, the best approach is not to start with the system tuned to maximum flexibility — it's to let it run stable, quiet, and predictable first, then gradually open up more proactive capabilities as you get comfortable.

---

## Summary

| Core Mechanism | Problem Solved | Key Design |
|----------------|---------------|------------|
| Command queue | Out-of-order execution from concurrent message arrival | Enter the queue first, then execute in order; unify all message sources |
| Swim lane model | Isolation and ordering for multi-session concurrency | Intra-session serial for causality; inter-session parallel for throughput |
| Five queue modes | Precise expression of user intent | collect / steer / followup / interrupt / queue |
| Heartbeat mechanism | Agent lacks proactive agency in the time dimension | Periodic wakeup + HEARTBEAT.md checklist + HEARTBEAT_OK silence |
| Cron task | Deterministic tasks that need to execute at a precise moment | Standard time expression; optional isolated session |

The swim lane model and heartbeat mechanism together endow Agents with two properties that traditional software lacks — **guaranteed causal ordering within a session**, and **time-driven autonomous proactivity**.

The difference is this: a **tool** only exists when you invoke it, waiting for you to activate it. A **collaborator** has its own rhythm, already doing what needs to be done before you need it. Without the swim lane model, an Agent under concurrent conditions is untrustworthy; without the heartbeat mechanism, an Agent is merely a passive-response tool.

The silent design of `HEARTBEAT_OK` illustrates: the core of proactivity is not "disturbing the user more frequently," but "speaking only when there is something meaningful to say" — restraint itself is a capability, and it is the engineering wisdom that allows proactive mechanisms to survive in the long run.

---

→ [Chapter 6: The Unified Gateway](../chapter6/index.md)
