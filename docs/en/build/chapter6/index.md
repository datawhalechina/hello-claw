# Chapter 6: The Unified Gateway — One Brain, Infinite Channels

> **Core question**: How can a single Agent brain "live" simultaneously across WhatsApp, Telegram, Discord, and other channels — and recognize you on each one?

---

You spent half an hour chatting with an Agent on WhatsApp: project progress, code style preferences, plans for next week. The collaboration was smooth; it had already learned your working habits.

The next day you open Telegram, wanting to pick up where you left off. The Agent's opening line: "Hello! How can I help you?"

It doesn't recognize you anymore.

This isn't a memory problem — those WhatsApp conversations still exist. The issue is that the Telegram instance simply has no idea what you did on WhatsApp. From its perspective, you're a stranger, and this is your first meeting.

Add Discord and it happens again. N platforms, N "first meetings." This is the first hard problem an Agent must solve when facing the real world — **platform silos**.

The unified gateway is the answer to tearing those silos down.

---

## I. The Problem of Platform Silos

Every platform has its own "language." Your user ID on WhatsApp is a phone number; on Telegram it's a string of digits; on Discord it's a Snowflake ID. The same person appears as three strangers who don't know each other across three platforms.

And it's more complicated than just different ID formats:

| Platform | User ID Format | Message Field | Auth Method |
|----------|---------------|---------------|-------------|
| Telegram | Pure numeric (e.g. `123456789`) | `message.text` | Bot Token |
| Discord | Snowflake ID (17–20 digits) | `message.content` | OAuth2 |
| Feishu | `open_id` (prefixed with `ou_`) | Nested JSON | tenant_access_token |

Three parsing schemas, three authentication flows. Without an abstraction layer, every new platform means carving out space in the system core and cramming in a batch of platform-specific code. Six months later, "Telegram support" and "intent reasoning" are deeply tangled — changing anything feels like defusing a bomb.

The sharpest pain isn't the format differences; it's **identity fragmentation**: the Agent doesn't know that "those three strangers are actually the same you."

---

## II. The Unified Gateway: One Entry Point, Infinite Channels

The core idea behind a Gateway is simple: place a translation layer between the platforms and the Agent brain.

```
┌──────────┐  ┌──────────┐  ┌──────────┐  ┌────────┐
│ WhatsApp │  │ Telegram │  │ Discord  │  │ Feishu │
└────┬─────┘  └────┬─────┘  └────┬─────┘  └───┬────┘
     │             │             │             │
     │    Per-platform adapters (dialect → common tongue)    │
     └──────────────────┬──────────────────────┘
                        │  Unified message format
                 ┌──────┴──────┐
                 │   Gateway   │
                 └──────┬──────┘
                        │
                 ┌──────┴──────┐
                 │  Agent Brain │  (always sees only "user" and "message")
                 └─────────────┘
```

The Agent brain always receives messages in a unified format: who sent it, which session it belongs to, and what was said. It has no idea — and never needs to know — whether a message came from Telegram or Discord.

The Gateway carries three core responsibilities. **Identity resolution**: translating each platform's opaque ID into "this is Alice." **Session routing**: dispatching messages from different channels to the correct conversation context without cross-contamination. **Format translation**: normalizing each platform's raw message structure into the standard format the Agent can process.

Once this boundary is established, the system gains freedom to evolve. The Agent brain's reasoning capabilities can be upgraded independently, undisturbed by channel churn; integrating a new platform requires zero changes to the Agent's code.

---

## III. The Adapter Pattern: The Cost of Onboarding a New Platform

What should the cost of adding a new platform be?

The ideal answer: **understand that platform's API, then implement one interface**. Zero changes to the Agent core.

OpenClaw achieves this through the `ChannelPlugin` interface. Each platform gets one adapter, responsible for bidirectional translation:

```
Inbound (user → Agent)
  Raw platform event  →  Adapter parses  →  Unified Message format  →  Agent

Outbound (Agent → user)
  Agent reply  →  Adapter renders  →  Platform-native format  →  User
```

The adapter is the translator, present at both ends of the pipeline. Inbound, it translates "platform dialect" into "system common tongue." Outbound, it translates the common tongue back into dialect. The Agent brain lives entirely in the world of common tongue, blissfully unaware that dialects exist.

The interface itself is intentionally two-tiered to keep the barrier to entry low:

```
ChannelPlugin Interface
├── [Required] Identity layer      ── the channel's unique identifier
├── [Required] Message layer       ── receive and send messages
└── [Optional] Extended capabilities
        ├── Streaming replies (typewriter effect)
        ├── Interactive buttons (Feishu cards, Discord components)
        ├── OAuth authentication
        └── Thread replies
```

A prototype adapter for a new platform only needs to implement the two required layers to get a working flow — receive messages, send messages. Additional capabilities can be added progressively as needed. Low floor, high ceiling: this is the hallmark of good extensible interface design.

There is an important design philosophy here: **let each platform shine**. The Gateway should not flatten all platforms down to the lowest common denominator — if Discord supports streaming output, let it stream; if Feishu supports a "typing" indicator, let it show. Platform-specific capabilities are declared through configuration, not through `if-else` branches buried in the code.

Take Discord and Feishu as examples — their capability toggles look quite different:

```json5
// Discord: enable streaming, so users see the Agent's output in real time
{
  channels: {
    discord: {
      enabled: true,
      streaming: true,
      actions: { messages: true, reactions: true, threads: true }
    }
  }
}

// Feishu: enable the typing indicator, giving users feedback while the Agent thinks
{
  channels: {
    feishu: {
      enabled: true,
      typingIndicator: true
    }
  }
}
```

Two platforms, two sets of capability switches, each playing to its strengths.

---

## IV. Graceful Degradation and Cross-Platform Identity

### Graceful Degradation: Unified Without Being Monotonous

The Agent always outputs replies in Markdown. This is a deliberate design choice: Markdown expresses content intent, not platform presentation. How that content is actually rendered is up to each platform's adapter.

```
            Agent outputs a Markdown reply
                        │
          ┌─────────────┼──────────────┐
          │             │              │
   Discord adapter  Feishu adapter  Plain-text platform
          │             │              │
   Embedded message  Interactive     Strip formatting
   card with syntax  button card     marks, content
   highlighted code  "Confirm/Cancel" fully preserved
          │             │              │
          └─────────────┼──────────────┘
                        │
              User sees the form best suited to their platform
```

Discord renders Markdown as structured cards with colored borders; Feishu turns "please confirm deployment" into two clickable buttons; platforms without rich text simply strip the formatting marks and present the content clearly as plain text.

The information is conveyed in full; only the "wrapper" differs, not the "content." **Unified without being monotonous, diverse without being chaotic** — this is the core value of the Gateway's outbound design.

Beyond format rendering, platform capability differences also show up in **interactive feedback**. A typical example: you ask the Agent on Discord to "analyze this project" — that takes a few seconds. With Discord streaming enabled, the system sends a placeholder message first, then continuously edits it as the Agent generates content — users watch the message update in real time, as if they can see the other side typing. Once the Agent finishes, the placeholder becomes the complete answer. Feishu lacks this capability, but Feishu has a typing indicator, which equally lets users know the Agent is thinking rather than silent.

Platforms with the capability provide a better experience; platforms without it still ensure basic functionality — that is the practical meaning of graceful degradation.

### Cross-Platform Identity Linking: One Memory, Everywhere

The identity fragmentation problem is solved through `identityLinks` configuration. The approach is explicit declaration: IDs on different platforms belong to the same person.

The first step is ID normalization. Every platform's user ID is converted to a `platform:rawId` format:

```
telegram:123456789
discord:987654321012345678
slack:U12345ABC
```

The second step is explicit binding. Declare in configuration that these three IDs all belong to "Alice":

```
identityLinks:
  "alice": ["telegram:123456789", "discord:987654321012345678"]
```

Once the binding is established, no matter which channel Alice messages from, the Agent recognizes her:

```
Alice sends a message on Telegram
  → Gateway normalizes ID: telegram:123456789
  → Queries identityLinks → matches "alice"
  → Loads Alice's preferences and memory → generates reply based on her habits

The next day Alice switches to Discord
  → Gateway normalizes ID: discord:987654321012345678
  → Queries identityLinks → matches "alice" again
  → Agent still recognizes her, preferences fully preserved
```

That said, not all information should be shared across channels:

| Information Type | Scope | Rationale |
|-----------------|-------|-----------|
| User preferences (code style, language habits, etc.) | Globally shared | This is "knowing you as a person" — not channel-specific |
| Current conversation context | Session-isolated | Conversations on different channels have their own rhythm and purpose |

Think of it as the Agent holding **two notebooks**:

- **Notebook one (shared memory)**: records long-term cross-channel information — your code style preferences, preferred languages, project conventions. All channels share this notebook; no matter which platform you arrive from, the Agent opens the same one.
- **Notebook two (independent context)**: each session's own conversation history. What you discussed on WhatsApp isn't in the Telegram notebook; what you asked on Telegram isn't in the WhatsApp notebook either.

This is why the same Agent recognizes you on both WhatsApp and Telegram (same preferences notebook), yet the conversations on each don't bleed into each other (each session's context notebook is isolated). **Channels are temporary choices; identity is a persistent reality.**

---

## V. Fault Tolerance and Message Splitting

### Error Classification: What Can Be Retried, What Cannot

Network hiccups, platform API rate limits, expired tokens — in a multi-channel architecture, send failures are a fact of life. The Gateway doesn't simply surface the error and walk away; it decides what to do based on the error type:

| Error Type | Description | Handling Strategy |
|-----------|-------------|-------------------|
| Channel not enabled | Channel is configured as disabled or not started | No retry — fail immediately (retrying won't help) |
| Rate limit | Platform returns a 429 error | Wait, then retry (temporary — will clear soon) |
| Transient error | Network hiccup, connection timeout | Automatic retry with exponential backoff |
| Hard send failure | Content violation, insufficient permissions | No retry — log the error, notify the user |

The core logic behind this classification: **determine whether the failure is temporary or permanent**. Temporary failures get a wait-and-retry; permanent failures fail fast and notify early.

When encountering retryable errors, the system uses an **exponential backoff** strategy — the wait time grows exponentially before each retry, allowing automatic recovery from transient failures without hammering the platform API.

### Long Message Auto-Splitting: Code Block Boundary Awareness

Different platforms impose length limits on individual messages (Discord defaults to 2000 characters, Telegram defaults to roughly 4096). When the Agent produces an oversized reply, the Gateway automatically splits it into multiple sends.

But there is an engineering detail here: **splitting must recognize code block boundaries and never cut in the middle of a code block**. Imagine a Python function split in half — the first message has only the top portion, and the second message starts abruptly mid-function. Readability suffers badly. A smart splitting strategy finds appropriate split points (paragraph boundaries, blank lines) and ensures every segment is semantically complete.

### Why This Layer Can Keep Scaling

At this point the full pipeline is fairly clear:

```
Platform event
→ Channel adapter
→ Normalization
→ Route to Agent
→ Assign to correct session
→ Enter message loop
→ Agent produces reply
→ Deliver according to platform capabilities
```

One final key question remains: **why can OpenClaw keep onboarding new platforms without having to rewrite the system each time?** The answer lives entirely in the `ChannelPlugin` boundary.

From a design perspective, the plugin mechanism's greatest value isn't "better code organization" — it's that **the system can finally evolve "platform-specific capabilities" and "Agent general capabilities" on separate tracks**.

For any new platform, the minimum required work is typically quite small:

1. Tell the system who you are;
2. Be able to read platform events in;
3. Be able to send system replies back out.

This is classic sound engineering: low barrier to entry, high ceiling for capability. Because plugin registration and capability declaration live at this layer, the Gateway can truly deliver on its promise: **when adding a new platform, you mainly change the plugin — you don't touch the Agent core.**

In other words, the unified gateway's real contribution isn't "multi-platform showmanship" — it's a long-term maintainable boundary.

---

## III. Practical Configuration

The previous sections covered "why it exists" and "how it runs." Now for the more practical question: **if you actually want to start using OpenClaw's Gateway, how should you configure it so things stay stable and you avoid the common pitfalls?**

### 3.1 Get a Minimum Viable Channel Working First

The most common mistake is connecting many platforms all at once and immediately enabling streaming, threads, rich text, and every other enhancement.

The more stable approach: **pick the platform you know best and get the minimum viable channel working first.**

A minimum viable channel means exactly four steps:

1. Messages are being received
2. They route to the correct Agent
3. They land in the correct session
4. Replies go back to the correct place

Once those four steps run cleanly, most of the core mechanisms in this chapter are already alive. Adding a second platform at that point becomes much easier to debug, because you already know: the Agent core itself works — any problem almost certainly lives in the new channel's adapter or configuration.

So the best starting point for newcomers isn't "enable everything" — it's: **get one channel working first, then add more.**

### 3.2 Four Things to Decide Before Configuring

When you actually start configuring the Gateway, write down the answers to these four questions first:

1. **Who should handle which messages?**
This corresponds to the routing layer. You need to clarify upfront: which channels default to which Agent, which channels or groups need explicit bindings, which accounts serve only certain kinds of tasks. If this isn't settled first, no amount of later display tuning will matter.

2. **Which platform IDs are actually the same person?**
This corresponds to `identityLinks`. The key principle here isn't "bind as many as possible" — it's: **only bind IDs when you are genuinely certain they belong to the same person.** Binding incorrectly causes the system to mix preferences or identity information that should never be shared.

3. **Which messages should count as the same session?**
This corresponds to `sessionKey` and `dmScope`. One rule to always keep in mind: **the same person does not automatically mean the same session.** You need to decide: should different channels each keep their own context, or should certain scenarios merge more tightly? How granularly should DMs be split? Should group chat threads be isolated?

4. **Which enhanced capabilities should be enabled now, and which can wait?**

| Phase | Priority Goal |
|-------|---------------|
| First | Ensure messages can be received, sent, and never cross-contaminated |
| Second | Then enable streaming, threads, actions, and other enhancements |

"Working" and "working well" are two different things. Make "working" solid first — only then is it worth discussing experience optimization.

### 3.3 Always Distinguish "Identity Sharing" from "Context Sharing"

This is the most common place to stumble in this chapter.

The precise distinction:

- `identityLinks` primarily answers "is this the same person?"
- Session configuration like `dmScope` primarily answers "should these messages count as the same session?"

These two are related, but they are not the same switch.

Use this table to clarify your goals before touching configuration:

| Goal | More Stable Approach |
|------|----------------------|
| Only want to recognize the same person across platforms | Do identity linking first; then cautiously decide whether sessions should merge |
| Want the same person to continue the same DM across platforms | Identity linking and session granularity must be designed together; confirm that `dmScope` truly allows removing the channel/account dimension |
| Multiple people sharing a bot, with absolutely no cross-contamination | Prefer finer-grained isolation like `per-channel-peer` |
| Group chat and threads should stay independent | Keep sessions split by group or thread |

So if you ever need cross-platform collaboration, the most important thing isn't "whether `identityLinks` exists" — it's: **you need to be clear in your own mind which layer you actually want to share.**

### 3.4 Multi-Channel Optimization: Secure the Floor Before Raising the Ceiling

Gateway can be tempting — once you see streaming, buttons, thread replies, rich text cards, and typing indicators, you want to turn everything on. But from an engineering standpoint, the recommended sequence is straightforward:

```
First ensure content is always delivered
→ Then ensure sessions are always correct
→ Then improve the presentation experience
→ Finally pursue platform-specific enhancements
```

The reason is simple: what users notice first is not "whether there's streaming output" — it's:

- Did it reply to me?
- Did the reply go to the right place?
- Are conversations getting mixed up?
- Does it recognize me as the same person?

When these fundamentals are unstable, the fancier your enhancements, the harder debugging becomes.

Graceful degradation isn't just an internal system design principle — it should be your configuration principle too:

**Make every platform "at least solidly functional" first, then work toward "especially good on a particular platform."**

### 3.5 When Problems Arise, Troubleshoot in a Fixed Order

Gateway problems can look varied, but they typically converge with this sequence:

1. **First, check whether the message actually came in.**
Confirm the channel plugin is running, the platform event reached your system, and the corresponding account is configured correctly. If messages aren't entering the system at all, nothing else matters.

2. **Then, check whether routing hit the correct Agent.**
If the message came in but went to the wrong Agent, check first: is the `bindings` configuration correct, is the default account and default routing misconfigured, did a more specific rule intercept it unexpectedly?

3. **Then, check whether the session was calculated correctly.**
If the Agent is right but context is clearly bleeding across conversations or breaking unexpectedly, check: is the `sessionKey` granularity wrong, is `dmScope` splitting DMs too coarsely or too finely, did `identityLinks` accidentally merge people who shouldn't share context?

4. **Finally, check platform capabilities and outbound adapters.**
Why is there no streaming? Why are buttons not showing? Why are long messages being split badly? Why is a reply going to the wrong channel or position? At this point, review the platform capability declarations, the outbound adapter, and the most recent return-path information — the picture will be much clearer.

A short phrase to remember the sequence:

```
First check: did it come in?
→ Then check: did it go to the right person?
→ Then check: was the session calculated correctly?
→ Finally check: display and experience
```

Troubleshooting in this order is almost always faster than diving into platform-specific details from the start.

---

## Summary

| Core Capability | Implementation |
|----------------|----------------|
| Unified entry point across platforms | Gateway as the single processing layer for all channel messages |
| Low-cost new platform onboarding | `ChannelPlugin` adapter interface — zero changes to core code |
| Consistent cross-platform experience | Bidirectional adapter translation — Agent sees only unified format |
| Graceful degradation | Outbound rendering decided by platform capability — content unchanged, wrapper varies |
| Unified cross-platform identity | `identityLinks` explicit binding — preferences shared globally, context isolated per session |
| Fault tolerance and retry | Error-type-based handling: transient errors get exponential backoff retry, permanent errors fail fast |
| Long message splitting | Auto-split by `textChunkLimit` — code block boundary aware, never cuts inside a code block |

The Gateway is the Agent's sensory system. It absorbs all the complexity of the external world — different IDs, formats, and authentication schemes across platforms — entirely within its own layer, letting the Agent brain live in a pure world of just "users" and "messages." The senses handle normalization; the brain handles reasoning. The clear, stable boundary between them is the fundamental guarantee of a long-lived, healthy system.

A well-designed Gateway is invisible — it does its work in silence, so the Agent can focus on what it's actually there to do.


---

→ [Chapter 7: The Security Sandbox](../chapter7/index.md)
