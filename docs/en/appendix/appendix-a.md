---
prev:
  text: 'Chapter 11: Web Interface & Clients'
  link: '/en/adopt/chapter11'
next:
  text: 'Appendix B: Community Voices & Ecosystem Outlook'
  link: '/en/appendix/appendix-b'
---

# Appendix A: Learning Resources Compendium

The biggest challenge in learning OpenClaw isn't the technology itself — it's information overload. Search "OpenClaw tutorial" and you'll find hundreds of articles, dozens of videos, and countless GitHub repositories. Some say "up and running in 10 minutes," others say "takes a month." Some recommend local deployment, others suggest running in the cloud.

**The purpose of this resource compendium is simple**: to help you find the most valuable resources in the sea of information, learn in a sensible order, and avoid unnecessary detours.

> **Reading tip**: Resources are organized into 8 categories. Within each category, they are listed in **recommended priority order** — items listed first are most suitable for the majority of readers. Items marked with ⭐ are editor's picks.

---

## I. Official Resources

> Official resources are the most authoritative, accurate, and up-to-date source of information. OpenClaw updates quickly, and community tutorials may lag behind, but official documentation is always the primary source.

### 1.1 Official Documentation & Repository

| Resource | URL | Description |
|----------|-----|-------------|
| OpenClaw Official Website | <https://openclaw.ai> | Product homepage, feature overview, quick start |
| OpenClaw Main Repository | <https://github.com/openclaw/openclaw> | Source code, issue tracking, release records |
| OpenClaw AI/ML API | <https://aimlapi.com> | API documentation and interface specifications |
| Official Skills Repository | <https://github.com/openclaw/skills> | Officially maintained OpenClaw skills library |

### 1.2 Skills Marketplace

| Resource | URL | Description |
|----------|-----|-------------|
| ⭐ ClawHub Skills Registry | <https://clawhub.ai> | Official Skills registry with 25,000+ available skills, supports search and discovery |
| Tencent SkillHub | <https://skillhub.tencent.com> | ClawHub domestic mirror with Chinese search, CDN acceleration, and curated Top 50 security-audited skills |

### 1.3 Official Community

| Resource | URL | Description |
|----------|-----|-------------|
| Discord Official Server | <https://discord.gg/openclaw> | Real-time technical discussion and Q&A |
| OpenClaw Community | <https://github.com/openclaw/community> | Discord community documentation and guidelines |
| Reddit r/LocalLLaMA | <https://reddit.com/r/LocalLLaMA> | Popular OpenClaw discussion board |

---

## II. Chinese Ecosystem Resources

> The Chinese community has contributed a wealth of high-quality resources to OpenClaw, including localized versions, in-depth tutorials, and plugins adapted for domestic platforms.

### 2.1 Chinese Community

| Resource | URL | Description |
|----------|-----|-------------|
| ⭐ OpenClaw Chinese Community | <https://clawd.org.cn> | Chinese community portal for domestic users to exchange experience, share knowledge, and help each other |
| Claw123 Resource Directory | <https://www.claw123.com> | OpenClaw Chinese resource navigation site, aggregating tutorials, tools, and community links |
| Awesome OpenClaw Asia | <https://awesome.tryopenclaw.asia> | Curated OpenClaw resource collection maintained by the Asia community |

### 2.2 Chinese Tutorials & Documentation

| Resource | URL | Description |
|----------|-----|-------------|
| ⭐ Hello Claw Tutorial | <https://github.com/datawhalechina/hello-claw> | Datawhale open-source tutorial, from zero to building an AI assistant (this tutorial) |
| ⭐ Awesome OpenClaw Tutorial | <https://github.com/xianyu110/awesome-openclaw-tutorial> | Complete Chinese tutorial with 350,000+ characters and 70+ hands-on cases |
| OpenClaw Chinese Docs | <https://github.com/yeuxuan/openclaw-docs> | 276 in-depth tutorials and source code analysis |
| AI-Driven Chinese Docs | <https://github.com/wszhxz/openclaw-chinese-docs> | Complete Chinese documentation maintained via AI-automated translation |
| Chinese Use Cases Collection | <https://github.com/AlexAnys/awesome-openclaw-usecases-zh> | 40 real-world scenarios adapted for the domestic ecosystem |
| Lobster Growth Diary | <https://sanwan.ai> | Fu Sheng's AI lobster "Sanwan" autonomous operation log, with hands-on tutorials covering skill configuration, heartbeat mechanisms, multi-agent collaboration, and more |

### 2.3 Chinese Localized Distributions

| Resource | URL | Description |
|----------|-----|-------------|
| ⭐ OpenClaw Localized Distribution | <https://github.com/1186258278/OpenClawChineseTranslation> | Auto-syncs with official updates every hour; fully localized CLI and Dashboard |
| OpenClaw Chinese Community Edition | <https://github.com/jiulingyun/openclaw-cn> | Deeply localized version with fully Chinese CLI/Web interface |

### 2.4 Domestic Platform Adaptations

| Resource | URL | Description |
|----------|-----|-------------|
| ⭐ OpenClaw China Plugin | <https://github.com/BytePioneer-AI/openclaw-china> | Plugin collection for domestic platforms including Feishu, DingTalk, and WeCom |
| Clawdbot Chinese Skills Library | <https://github.com/ClawdbotCN/awesome-openclaw-skills-zh> | AI tools marketplace aggregating hundreds of practical skills |

---

## III. Installation & Deployment

> Choose the installation method that best suits your environment and needs. Desktop clients are great for beginners, Docker works well for servers, and cloud solutions are ideal for zero-ops setups.

### 3.1 Desktop Clients (One-Click Install)

| Client | URL | Platform | Features |
|--------|-----|----------|----------|
| ⭐ AutoClaw | <https://autoglm.zhipuai.cn/autoclaw> | macOS / Windows | Pre-installed with 50+ skills, built-in Pony-Alpha-2 model, includes free tier |
| ClawX | <https://github.com/ValueCell-ai/ClawX> | macOS / Windows / Linux | Open-source Electron client, multi-platform, requires your own API key |
| IronClaw | <https://github.com/nearai/ironclaw> | macOS / Linux / Windows | Rust security rewrite, WASM sandbox, PostgreSQL backend |
| HiClaw | <https://github.com/higress-group/hiclaw> | Docker environment | Multi-agent collaboration platform with Manager-Worker architecture |

> See [Chapter 1: AutoClaw One-Click Installation](/en/adopt/chapter1/).

### 3.2 Docker Containerized Deployment

| Resource | URL | Description |
|----------|-----|-------------|
| ⭐ Docker Deployment Guide | <https://blog.csdn.net/LYX_WIN/article/details/157993447> | Complete tutorial for GPU/CPU dual-path containerized deployment |
| OpenClaw KasmVNC | <https://github.com/ddong8/openclaw-kasmvnc> | One-click browser remote desktop deployment with full container management |

### 3.3 Cloud & One-Click Deployment

| Resource | URL | Description |
|----------|-----|-------------|
| OpenClaw Launch | <https://openclaw.ai/launch> | 30-second one-click cloud deployment with model switching support |
| HuggingClaw | <https://github.com/democra-ai/HuggingClaw> | Free deployment on HuggingFace Spaces with 2vCPU + 16GB RAM |
| 1Panel One-Click Deploy | <https://github.com/1Panel-dev/1Panel> | Domestic VPS panel with one-click OpenClaw installation |
| MoltWorker | <https://github.com/cloudflare/moltworker> | Cloudflare's open-source OpenClaw deployment solution |
| Alibaba Cloud Deployment | <https://developer.aliyun.com/article/1713898> | Cloud server deployment and Skill hands-on tutorial |
| RemoteOpenClaw | <https://remoteopenclaw.com> | Hosted remote OpenClaw service — run without a local environment |

> See [Appendix F: Cloud Service Deployment Guide](/en/appendix/appendix-f).

### 3.4 Windows / Linux Installation

| Resource | URL | Description |
|----------|-----|-------------|
| Sandbox Mode Configuration | <https://www.toutiao.com/article/7607625142893625883> | Docker container isolation and filesystem protection |

> See [Chapter 2: OpenClaw Manual Installation](/en/adopt/chapter2/).

### 3.5 Local LLM Integration

| Resource | URL | Description |
|----------|-----|-------------|
| llama.cpp Deployment | <https://blog.csdn.net/Honmaple/article/details/157693340> | Local LLM deployment tutorial for WSL2 environment |
| Ollama Integration | <https://www.toutiao.comw.toutiao.com/article/7602483142699516435> | Domestic compute adaptation and toolchain ecosystem |
| MiniMax + Feishu | <https://www.toutiao.com/article/7612259016139391503> | Local Agent deployment solution with domestic models |

> See [Chapter 5: Model Management](/en/adopt/chapter5/).

---

## IV. Messaging Platform Integrations

> OpenClaw supports 15+ messaging platforms. The following resources help you quickly connect to various IM services.

| Resource | URL | Platforms Covered |
|----------|-----|-------------------|
| ⭐ Feishu Integration Guide | <https://www.toutiao.com/article/7614370801759912486> | Complete guide for the official Feishu plugin |
| Feishu Deployment Tutorial | <https://blog.csdn.net/m0_55049655/article/details/158623550> | Complete enterprise-grade Feishu deployment tutorial on CSDN |

> See [Chapter 4: Chat Provider Configuration](/en/adopt/chapter4/).

---

## V. Skill Development & Agent Templates

> Skills are OpenClaw's core extension mechanism. The following resources cover the complete path from using ready-made skills to developing your own.

### 5.1 Skill Recommendations & Installation

| Resource | URL | Description |
|----------|-----|-------------|
| ⭐ Awesome OpenClaw Skills | <https://github.com/VoltAgent/awesome-openclaw-skills> | Collection of 5,490+ skills, with 6,940 spam plugins filtered out |
| 2026 Must-Have Skills | <https://www.toutiao.com/article/7611601860910236179> | Installation and configuration of 4 essential skills |
| Plugin Installation Guide | <https://www.php.cn/faq/2161325.html> | Step-by-step instructions for adding CLI extensions |

### 5.2 Skill Development Tutorials

| Resource | URL | Description |
|----------|-----|-------------|
| ⭐ Step-by-Step Skills Configuration | <https://www.toutiao.com/article/7612296579612983846> | Professional workflows and tool integrations |

> See [Appendix D: Skill Development Templates](/en/appendix/appendix-d).

### 5.3 Agent Templates & Quick Start

| Resource | URL | Description |
|----------|-----|-------------|
| ⭐ Awesome OpenClaw Agents | <https://github.com/mergisi/awesome-openclaw-agents> | 100 production-ready AI Agent templates across 18 categories |
| CrewClaw | <https://crewclaw.com> | Deploy any Agent in 60 seconds, no Docker or terminal required |
| Agent Templates | <https://github.com/mergisi/awesome-openclaw-agents/tree/main/agents> | Ready-to-use SOUL.md configuration files |
| Quickstart Guide | <https://github.com/mergisi/awesome-openclaw-agents/tree/main/quickstart> | Launch an Agent with zero configuration in 5 minutes |

---

## VI. Advanced Learning

> Understanding the underlying principles lets you navigate complex scenarios with ease. The following resources help you advance from "can use it" to "mastery."

### 6.1 Architecture & Internals

| Resource | URL | Description |
|----------|-----|-------------|
| OpenClaw Architecture Analysis | <https://www.toutiao.com/article/7602243573023425060> | Underlying logic of agent execution, tool invocation, and browser operations |
| Intent & Conversation Management | <https://www.toutiao.com/article/7610070344208073259> | NLP recognition and slot-filling in practice |

### 6.2 Memory Systems & Knowledge Bases

| Resource | URL | Description |
|----------|-----|-------------|
| Mem0 Integration | <https://www.toutiao.com/article/7613455137884946959> | Token-efficient intelligent memory management |
| Knowledge Base Construction | <https://www.toutiao.com/article/7612927848772272667> | Best practices for SOPs and knowledge bases |
| ⭐ Memory LanceDB Pro | <https://github.com/win4r/memory-lancedb-pro> | Enhanced long-term memory plugin with hybrid retrieval and cross-encoder reranking |
| Agent Second Brain | <https://github.com/AgentSecondBrain/memU> | Complete second-brain system: voice notes → Obsidian + Todoist |
| Obsidian Vault RAG | <https://github.com/Obsidian68/vault-rag> | Connect OpenClaw to an Obsidian knowledge base with real-time Markdown indexing |

### 6.3 Browser Automation

| Resource | URL | Description |
|----------|-----|-------------|
| ⭐ OpenClaw + Playwright | <https://www.toutiao.com/article/7614706712441487915> | Natural language-driven browser automation |
| Browser Automation Skill | <https://www.toutiao.com/article/7613585763871080969> | Usage guide for the browser-automation skill |
| Agent-Browser | <https://github.com/vercel-labs/agent-browser> | Vercel's open-source AI agent browser tool |
| MCP Server Integration | <https://blog.csdn.net/LYX_WIN/article/details/157993447> | Playwright MCP browser automation |

<details>
<summary>WSLg Browser Fingerprint Bypass (For Research Purposes Only)</summary>

| Resource | URL | Description |
|----------|-----|-------------|
| WSLg + Fingerprint Bypass | <https://www.toutiao.com/article/7605101648096018978> | Dynamic browser fingerprint spoofing for anti-crawl evasion |

> **Note**: Browser fingerprint bypass techniques carry legal and ethical risks. Use only for legitimate security research and testing purposes.

</details>

### 6.4 Automated Workflows

| Resource | URL | Description |
|----------|-----|-------------|
| Office Automation Guide | <https://www.toutiao.com/article/7614155545884328499> | File processing and team collaboration scenarios |
| awesome-usecases Deep Dive | <https://blog.csdn.net/yangshangwei/article/details/158314655> | 30+ real, runnable scenarios |

### 6.5 Security Best Practices

| Resource | URL | Description |
|----------|-----|-------------|
| ⭐ AWS Security & Feature Enhancement Practices | <https://aws.amazon.com/cn/blogs/china/openclaw-security-and-feature-enhancement-practices/> | Security hardening and feature enhancement engineering practices after EC2 deployment (including lessons learned) |
| Security Hardening Guide | <https://github.com/rohitg00/awesome-openclaw> | Permission management and risk control |

> See [Chapter 10: Security & Threat Model](/en/adopt/chapter10/).

### 6.6 Evaluation & Benchmarking

| Resource | URL | Description |
|----------|-----|-------------|
| ⭐ PinchBench | <https://pinchbench.com> | The first real-task benchmark designed specifically for OpenClaw-class agents, covering 5 dimensions: file operations, data processing, web search, creative output, and tool invocation |
| ClawBench | <https://clawbench.net> | Standardized agent evaluation platform with 210 tasks, 14 domains, 4 difficulty levels, supporting cross-framework comparison with OpenClaw and others |
| ClawWork | <https://github.com/HKUDS/ClawWork> | From HKUST HKUDS, an AI economic capability benchmark based on nanobot, with 220 real GDPVal occupational tasks spanning 44 departments — agents are self-financing |

> **Why do agents need their own benchmarks?** General model leaderboards (MMLU, HumanEval, etc.) fail to reflect model performance in real agent scenarios. Capabilities like tool selection, file management, multi-source information synthesis, and error recovery can only be measured through end-to-end evaluation. PinchBench has models execute tasks in an environment with the exact same tools and workspace as a real OpenClaw instance, producing more meaningful results.

---

## VII. Ecosystem Tools & Clients

> Beyond the official interface, the community has developed a rich set of third-party tools covering visual management, mobile clients, observability, and more.

### 7.1 Visual Management Dashboards

| Tool | URL | Description |
|------|-----|-------------|
| ⭐ ClawPanel | <https://github.com/1186258278/ClawPanel> | OpenClaw visual management dashboard with built-in AI assistant |
| Nerve | <https://github.com/Nerve/nerve> | Self-hosted web cockpit with real-time streaming conversations |

### 7.2 Mobile & Web Clients

| Tool | URL | Description |
|------|-----|-------------|
| ClawApp | <https://github.com/qingchencloud/ClawApp> | Mobile H5 chat client with PWA support |
| MobileClaw | <https://github.com/mobileclaw/mobileclaw> | Mobile-first PWA client |
| PinchChat | <https://github.com/pinchchat/pinchchat> | Open-source WebChat UI with a ChatGPT-style interface |

> See [Chapter 11: Web Interface & Clients](/en/adopt/chapter11/).

### 7.3 AI Agent Communities

| Tool | URL | Description |
|------|-----|-------------|
| RockClaw | <https://rockclaw.ai> | AI citizen autonomous community — agents can register, contribute skills, earn "Xiami" currency, and participate in governance decisions |

### 7.4 Observability & Monitoring

| Tool | URL | Description |
|------|-----|-------------|
| Manifest | <https://github.com/manifest/manifest> | Real-time cost observability supporting 28+ models |
| Opik OpenClaw | <https://github.com/Anil-matcha/opik-openclaw> | Trace-level observability tracking |

---

## VIII. Comprehensive Resource Index

> The following are broad, multi-domain resource collections suitable for getting a complete picture of the OpenClaw ecosystem.

| Resource | URL | Description |
|----------|-----|-------------|
| ⭐ Awesome OpenClaw | <https://github.com/SamurAIGPT/awesome-openclaw> | The most comprehensive resource compendium with 100+ project links |
| CoClaw Community Resource Center | <https://coclaw.com> | Community-maintained OpenClaw resource hub covering guides, troubleshooting, config generation, and featured articles (unofficial) |
| Use Cases Collection | <https://github.com/hesamsheikh/awesome-openclaw-usecases> | Community application cases with 36 real-world validated scenarios |
| ZooClaw Help Center | <https://zooclaw.ai/help> | ZooClaw official help documentation and user guide |
| OpenClaw 101 | <https://openclaw101.dev> | OpenClaw beginner learning site covering core concepts and quick-start guides |
---

## Recommended Learning Paths

Choose the learning path that best fits your background and goals:

### Path 1: Complete Beginner (No Programming Experience)

```
Step 1: Read the introduction to this tutorial to understand what OpenClaw is
  ↓
Step 2: Follow Chapter 1 to install AutoClaw (one-click install, zero configuration)
  ↓
Step 3: Complete your first conversation in AutoClaw
  ↓
Step 4: Follow Chapter 4 to connect to a chat platform (Feishu recommended)
  ↓
Step 5: Explore ClawHub and install skills that interest you
```

### Path 2: Quick Deployment (Some Technical Background)

```
Step 1: Follow Chapter 2 to manually install OpenClaw
  ↓
Step 2: Use the OpenClaw Localized Distribution or HuggingClaw to get up and running quickly
  ↓
Step 3: Follow Chapter 5 to configure domestic model providers
  ↓
Step 4: Read scenario chapters as needed (Chapters 3 through 11)
```

### Path 3: Agent Developer (Building Custom Agents)

```
Step 1: Study the 100 templates in Awesome OpenClaw Agents
  ↓
Step 2: Learn the skill development templates in Appendix D
  ↓
Step 3: Read Part 2 of this tutorial: "Building a Claw"
  ↓
Step 4: Dive into memory enhancement solutions like Memory LanceDB Pro
```

### Path 4: Enterprise Deployment (Production Environment)

```
Step 1: Read Chapter 10 on security and threat modeling
  ↓
Step 2: Refer to Appendix F to choose a cloud deployment solution
  ↓
Step 3: Follow Chapter 8 to configure Gateway operations and management
  ↓
Step 4: Follow Chapter 9 to set up remote access and networking
  ↓
Step 5: Deploy observability tools (Manifest / Opik)
```

---

## A Final Word

The biggest obstacle to learning OpenClaw isn't technical difficulty — it's information overload and lack of direction.

The goal of this resource compendium is to help you find the most valuable resources in the vast sea of information, learn in a sensible order, and avoid unnecessary detours. But remember: **no amount of tutorials beats building one real project yourself**.

Start with the simplest thing: have OpenClaw send you a weather report every morning. Once that works, try something more complex. Every small success brings you one step closer to the ultimate goal of your own AI assistant.

**Four pieces of advice**:

- Don't pursue perfection — just get it running first
- Don't go it alone — when you hit a problem, ask the community
- Don't just learn without applying — put every feature you learn to use in your actual work
- Don't be afraid of making mistakes — the worst that can happen with OpenClaw is a reinstall

Happy learning!
