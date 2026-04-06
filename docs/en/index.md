---
layout: home

hero:
  name: "<span class='hero-label'>HELLO CLAW</span>"
  text: "<span class='hero-line'>Bring OpenClaw</span><span class='hero-line'>fully into your <span class='hero-accent'>workflow</span></span>"
  tagline: Go from a five-minute setup to real-world scenarios in Lobster University, then all the way into source code, architecture, and customization.
  image:
    src: /home-preview.svg
    alt: Hello Claw homepage preview
  actions:
    - theme: brand
      text: Start Here
      link: /en/adopt/intro
    - theme: alt
      text: Explore University
      link: /en/university/
    - theme: alt
      text: Open Build Guide
      link: /en/build/
    - theme: alt
      text: GitHub
      link: https://github.com/datawhalechina/hello-claw

features:
  - title: Get Started Fast
    details: 11 chapters and 7 appendices covering installation, core setup, operations, security, and clients so you can get OpenClaw running first
    link: /en/adopt/intro
    linkText: Open guide
  - title: Build Your Own
    details: 15 chapters across 3 tiers, moving from source code walkthroughs and architecture to solution analysis and real customization
    link: /en/build/
    linkText: Explore internals
  - title: Remote Channels
    details: QQ, Feishu, and Telegram routes with practical setup guides and a selection matrix for remote control anywhere
    link: /en/adopt/chapter4
    linkText: View channels
  - title: Automation Flows
    details: Use cron, at, and every for reminders, reports, recurring jobs, and hands-off workflow orchestration
    link: /en/adopt/chapter7
    linkText: Automate work
  - title: Scenario Playbooks
    details: Lobster University turns common use cases into practical skill paths, so you can start with the 5-10 skills that matter most
    link: /en/university/intro
    linkText: Pick scenarios
  - title: Models & Cost
    details: Configure multiple providers, route models intelligently, deploy Ollama locally, and keep spending under control
    link: /en/adopt/chapter5
    linkText: Tune models
---

## Project Overview

This project is a comprehensive learning tutorial for OpenClaw, helping you master this powerful command-line AI assistant system from scratch. Whether you want to quickly get started using OpenClaw to boost productivity, or deep dive into its internals and build your own version, this tutorial provides a clear learning path.

**This project includes two core modules:**

1. **Adopt Claw (User Guide)**: 11 chapters + 7 appendices, covering Installation (Ch1-3) + Core Configuration (Ch4-6) + Operations & Extensions (Ch7-9) + Security & Clients (Ch10-11), read as needed
2. **Build Claw (Developer Guide)**: 15 chapters, from dissecting OpenClaw source code to analyzing alternatives to customizing your own Claw

**Who should learn this:**

- Zero-experience users: Want an AI assistant on standby, no programming experience needed
- Productivity enthusiasts: Want to remotely control AI via QQ / Feishu / Telegram
- Tech enthusiasts: Interested in OpenClaw's skill system and automation capabilities
- Developers: Want to deep dive into Agent architecture and build your own version

## 📖 Tutorial Contents

### Part 1: Adopt Claw (User Guide, 11 Chapters + Appendices A-G)

| Chapter | Description | Status |
| ---- | ---- | ---- |
| **Introduction** | **What is OpenClaw, the four-step adoption method, learning roadmap** | ✅ |
| **🔵 Installation** | | |
| Chapter 1: AutoClaw Quick Install | Download AutoClaw desktop client, 5-minute zero-barrier experience | ✅ |
| Chapter 2: OpenClaw Manual Install | Terminal intro, Node.js installation, npm install, onboard wizard | ✅ |
| Chapter 3: Initial Configuration | CLI wizard, macOS guided setup, Custom Provider, reconfiguration | ✅ |
| **🟢 Core Configuration** | | |
| Chapter 4: Chat Platform Integration | Supported platforms overview, complete Feishu integration example, pairing & group chats | ✅ |
| Chapter 5: Model Management | Model concepts, CLI management, multi-provider config, API Key rotation, failover | ✅ |
| Chapter 6: Agent Management | Multi-agent management, workspaces, heartbeat, binding rules | ✅ |
| **🟡 Operations & Extensions** | | |
| Chapter 7: Tools & Scheduled Tasks | Tool levels, scheduled tasks (cron/at/every), web search | ✅ |
| Chapter 8: Gateway Operations | Startup management, hot reload, auth security, key management, sandbox policies, log monitoring | ✅ |
| Chapter 9: Remote Access & Networking | SSH tunnels, Tailscale networking, deployment architecture, security best practices | ✅ |
| **🔴 Security & Clients** | | |
| Chapter 10: Security & Threat Models | Threat landscape, VM isolation, trust boundaries, MITRE ATLAS, supply chain security | ✅ |
| Chapter 11: Web UI & Clients | Dashboard, WebChat, Control UI, TUI, third-party clients | ✅ |
| **Appendices** | | |
| Appendix A: Learning Resources | 8 categories of learning resources, 80+ links, editor's picks | ✅ |
| Appendix B: Community Voice & Ecosystem | 6 major topics in-depth + best quotes | ✅ |
| Appendix C: Claw Alternatives Comparison | Desktop clients / managed services / cloud providers / self-hosted / mobile, 5 categories | ✅ |
| Appendix D: Skill Development Guide | SKILL.md format + skill-creator + ClawHub publishing workflow | ✅ |
| Appendix E: Model Provider Guide | Aggregation gateways / domestic / international / local, 4 categories | ✅ |
| Appendix F: Command Cheat Sheet | All CLI command reference for installation, config, logs, cron, channels, etc. | ✅ |
| Appendix G: Config File Reference | openclaw.json parameter-by-parameter walkthrough | ✅ |

### Part 2: Build Claw (Developer Guide, 15 Chapters)

| Chapter | Description | Status |
| ---- | ---- | ---- |
| **Introduction** | **Why build your Claw from scratch, OpenClaw's complexity challenges & learning roadmap** | ✅ |
| **🔵 Tier 1: OpenClaw Internals** (Chapters 1-7) | | |
| Chapter 1: Core Design Philosophy | Agent Runtime vs Chatbot differences, four primitive tools design philosophy | ✅ |
| Chapter 2: Architecture Overview | Gateway, Bus, Agent, Provider — four core modules & message flow | ✅ |
| Chapter 3: Prompt System | 7 Markdown files prompt architecture, hot reload mechanism, Token optimization | ✅ |
| Chapter 4: Tool System | Four primitive tools deep dive, tool registration, tool descriptions' impact on LLM accuracy, Skill hierarchy | ✅ |
| Chapter 5: Message Loop & Event-Driven | ReAct loop execution flow, LLM tool selection, heartbeat & automation | ✅ |
| Chapter 6: Unified Gateway | Gateway architecture, multi-channel integration & message standardization | ✅ |
| Chapter 7: Security Sandbox | Freedom vs constraints, execution environment isolation & permission control | ✅ |
| **🟢 Tier 2: Custom Solutions** (Chapters 8-10) | | |
| Chapter 8: Lightweight Solutions | NanoClaw, Nanobot, ZeroClaw and other community variants | ✅ |
| Chapter 9: Security Hardening | IronClaw security architecture, sandbox isolation & audit logs | ✅ |
| Chapter 10: Hardware Solutions | PicoClaw hardware selection, low-power embedded deployment | ✅ |
| **🟡 Tier 3: Customize Your Claw** (Chapters 11-15) | | |
| Chapter 13: Skill Development | Skill file structure, Frontmatter format, async handling & debugging | ✅ |

## 🦞 Use Cases

<table>
  <tbody>
  <tr>
    <td valign="top" width="33%">
      <b>🌅 Personal Productivity</b><br>
      • Morning briefing (weather + calendar + to-dos)<br>
      • Email auto-classification & summary<br>
      • Smart scheduling
    </td>
    <td valign="top" width="33%">
      <b>💻 Development</b><br>
      • Code generation & review<br>
      • Automated testing & deployment<br>
      • Documentation generation
    </td>
    <td valign="top" width="33%">
      <b>📢 Content Creation</b><br>
      • Social media automation<br>
      • Writing assistance & polishing<br>
      • Multi-platform publishing
    </td>
  </tr>
  <tr>
    <td valign="top" width="33%">
      <b>🏢 Business & Sales</b><br>
      • Customer support & CRM<br>
      • Sales lead auto-follow-up<br>
      • Meeting scheduling & notes
    </td>
    <td valign="top" width="33%">
      <b>🤖 Multi-Agent Collaboration</b><br>
      • Agent team project management<br>
      • Automated workflow orchestration<br>
      • Knowledge base sharing & retrieval
    </td>
    <td valign="top" width="33%">
      <b>🔧 More Scenarios</b><br>
      • Smart home control<br>
      • Financial data analysis<br>
      • Education & training
    </td>
  </tr>
  </tbody>
</table>

## 🔥 Latest Updates

- **[2026-03-10]** ✅ New Lobster University: Menu-style Skills elective guide, equip your lobster with "combat power-ups"
- **[2026-03-10]** ✅ Updated Build Claw Chapters 7-9: Lightweight, Security Hardening, Hardware Solutions
- **[2026-03-08]** ✅ Completed Chapters 1-11: Adopt Claw user guide fully complete
- **[2026-03-04]** 🦞 Project launched with "Adopt Claw" and "Build Claw" core modules
