---
prev:
  text: 'Appendix B: Community Voices and Ecosystem Outlook'
  link: '/en/appendix/appendix-b'
next:
  text: 'Appendix D: Skill Development and Publishing Guide'
  link: '/en/appendix/appendix-d'
---

# Appendix C: Claw-Like Solutions Comparison and Selection Guide

The explosion of OpenClaw has spawned a vast "lobster ecosystem" — from open-source frameworks to commercial hosting, from desktop clients to embedded devices, from personal assistants to enterprise-grade multi-agent platforms. This appendix systematically covers all mainstream Claw-like solutions to help you quickly find the right fit for your needs.

**Table of Contents**

- [1. Full Landscape Overview](#_1-full-landscape-overview)
- [2. Quick Selection: Find Your Solution in 30 Seconds](#_2-quick-selection-find-your-solution-in-30-seconds)
- [3. Self-Hosted vs. Managed: Decision Framework](#_3-self-hosted-vs-managed-decision-framework)
- [4. Desktop Clients](#_4-desktop-clients)
- [5. Managed Services](#_5-managed-services)
- [6. Cloud Provider One-Click Deployment](#_6-cloud-provider-one-click-deployment)
- [7. Open-Source Self-Hosted Solutions](#_7-open-source-self-hosted-solutions)
- [8. Mobile and IoT Solutions](#_8-mobile-and-iot-solutions)
- [9. The Hundred-Shrimp Battle: A Panorama of Chinese Tech Giants](#_9-the-hundred-shrimp-battle-a-panorama-of-chinese-tech-giants)

---

## 1. Full Landscape Overview

Claw-like solutions fall into five major categories:

| Category | Representative Products | Who It's For | See |
|----------|------------------------|--------------|-----|
| **Desktop Clients** | AutoClaw, ClawX, OneClaw, LobsterAI, EasyClaw, Molili, QoderWork, BocLaw, YuanqiAIBot | Users who want a GUI experience without touching a terminal | [Section 4](#_4-desktop-clients) |
| **Managed Services** | ArkClaw, Kimi Claw, MaxClaw, WorkBuddy, DuClaw, AstronClaw | Users who just want to use it without managing servers | [Section 5](#_5-managed-services) |
| **Cloud Provider Deployment** | Tencent Cloud, Alibaba Cloud, Huawei Cloud, Baidu AI Cloud, iFlytek, etc. | Users who want a dedicated server but want to skip the installation steps | [Section 6](#_6-cloud-provider-one-click-deployment) |
| **Open-Source Self-Hosted** | OpenClaw, IronClaw, CoPaw, ChatClaw, NanoClaw, etc. | Technical users who want full control and are willing to tinker | [Section 7](#_7-open-source-self-hosted-solutions) |
| **Mobile/IoT** | Xiaomi miclaw, Redfinger Operator, JVSClaw, MimiClaw, droidclaw | Mobile or embedded hardware scenarios | [Section 8](#_8-mobile-and-iot-solutions) |

> The main solution covered in this tutorial is **OpenClaw manual installation** (Chapter 2). If you are a beginner, it is recommended to start with a desktop client ([Section 4](#_4-desktop-clients)).

Looking at it from another angle — choosing an AI is like buying a car; you need to know first whether you're going off-road, commuting, or hauling cargo:

| Camp | Positioning | Representative Products | Who It's For |
|------|-------------|------------------------|--------------|
| **Camp 1: Local Desktop & One-Click Install** | Out-of-the-box, privacy-focused | [LobsterAI](https://lobsterai.youdao.com) (NetEase Youdao), [AutoClaw](https://autoglm.zhipuai.cn/autoclaw) (Zhipu AI), [EasyClaw](https://easyclaw.cn) (Cheetah Mobile), [Molili](https://molili.dangbei.com/) (Dangbei), [QoderWork](https://qoder.com/qoderwork) (Alibaba), [BocLaw](https://www.bocloud.com.cn) (Bocloud), [ClawX](https://clawx.com.cn), [OneClaw](https://oneclaw.cn), [WorkBuddy](https://workbuddy.tencent.com) (Tencent) | Office workers writing daily reports and making PPTs — most reassuring when installed on your own computer |
| **Camp 2: Public Cloud Native & One-Click Deployment** | Highly scalable, enterprise-grade | [Alibaba Cloud](https://www.aliyun.com/benefit/scene/moltbot), [Tencent Cloud](https://cloud.tencent.com/act/pro/openclaw), [Volcengine](https://www.volcengine.com/activity/codingplan), [Huawei Cloud](https://activity.huaweicloud.com/openclaw.html), [Baidu AI Cloud](https://cloud.baidu.com/doc/qianfan/s/tmlhtdwyj), [iFlytek](https://astronclaw.com), [JD Cloud](https://www.ithome.com/0/927/614.htm) | Large-scale enterprise collaboration |
| **Camp 3: Cloud Managed & Cross-Platform Mobile** | Cross-platform convenience, no local compute required | [MaxClaw](https://maxclaw.ai/) (MiniMax), [Kimi Claw](https://kimi.com) (Moonshot AI), [ArkClaw](https://www.volcengine.com/experience/ark?mode=claw) (ByteDance), [DuClaw](https://cloud.baidu.com/product/duclaw) (Baidu), [AstronClaw](https://astronclaw.com) (iFlytek), [JVSClaw](https://www.aliyun.com/product/jvsclaw) (Alibaba Cloud) | Just want to use it without managing servers |
| **Camp 4: Professional Custom & Geek Hardware** | Advanced domains and low-power scenarios | [NemoClaw](https://nemoclaw.bot) (NVIDIA enterprise security stack), [WindClaw](https://windclaw.wind.com.cn) (Wind investment research), [PicoClaw](https://github.com/sipeed/picoclaw) (Raspberry Pi), [IronClaw](https://www.ironclaw.com) (security rewrite), [HiClaw](https://hiclaw.org/) (multi-agent), [MimiClaw](https://github.com/memovai/mimiclaw) (ESP32) | Geek enthusiasts, security-sensitive use cases, investment research/finance, multi-agent collaboration |

---

## 2. Quick Selection: Find Your Solution in 30 Seconds

> Forget the technical specs — just match your scenario and needs, then pick with confidence!

| Scenario | Recommended Solution | One-Line Reason |
|----------|---------------------|-----------------|
| Beginner / Light personal office use | [NetEase Youdao LobsterAI](https://lobsterai.youdao.com) or [Zhipu AutoClaw](https://autoglm.zhipuai.cn/autoclaw) | Open-source & free / one-click install, full basic features |
| Zero experience, don't want to be locked into Zhipu | [ClawX](https://clawx.com.cn) or [OneClaw](https://oneclaw.cn) + StepFun free models | Open-source GUI, choose your own provider |
| Heavy document analyst | [Kimi Claw](https://kimi.com) | 2-million-character long context — throw in dozens of documents and get instant core summaries |
| WeChat ecosystem collaboration | [Tencent QClaw](https://claw.guanjia.qq.com) | The only solution that supports controlling your PC via WeChat |
| DingTalk ecosystem collaboration | [Alibaba CoPaw](https://copaw.bot/) ([GitHub](https://github.com/agentscope-ai/CoPaw)) | Native DingTalk integration, open-source and free |
| Feishu ecosystem collaboration | [ByteDance ArkClaw](https://www.volcengine.com/experience/ark?mode=claw) | Deep Feishu integration + Doubao-Seed-2.0 |
| Building a QQ bot | [Tencent Cloud](#_6-cloud-provider-one-click-deployment) one-click deployment | Deep QQ Open Platform integration |
| One-click install / going global | [Cheetah EasyClaw](https://easyclaw.cn) ([International](https://easyclaw.com)) | Fu Sheng's signature skill pack, optimized for marketing/Xiaohongshu, double-click install zero-config, covers domestic and overseas markets |
| Just want to use it, don't want to manage anything | [ArkClaw](https://www.volcengine.com/experience/ark?mode=claw) / [Kimi Claw](https://kimi.com) | Fully cloud-managed, register and go |
| Want full control over configuration | [OpenClaw](https://github.com/openclaw/openclaw) manual install | Main solution in this tutorial |
| Security-sensitive / enterprise intranet | [IronClaw](https://www.ironclaw.com) ([GitHub](https://github.com/nearai/ironclaw)) | WASM sandbox + zero telemetry, Rust security rewrite |
| Enterprise GPU-accelerated Agent | [NVIDIA NemoClaw](https://nemoclaw.bot) ([GitHub](https://github.com/NVIDIA/NemoClaw)) | OpenClaw + safety guardrails + Nemotron local inference, released at GTC 2026 |
| Multi-agent team collaboration | [HiClaw](https://hiclaw.org/) ([GitHub](https://github.com/higress-group/hiclaw)) | Manager-Worker architecture, human in the loop |
| Zero budget | [ClawX](https://clawx.com.cn) or [OneClaw](https://oneclaw.cn) + OpenRouter free models | Open-source GUI + free models = ¥0 |
| Minimal budget (with paid options) | [Alibaba Cloud](#_6-cloud-provider-one-click-deployment) from ¥9.9/month | Lowest entry price, includes overseas nodes |
| Developer / Geek | [PicoClaw](https://github.com/sipeed/picoclaw) | 10MB ultra-small footprint, low resource usage, hardware-friendly |
| Deep Chinese language optimization | [Dangbei Molili](https://molili.dangbei.com/) | Deep adaptation for Chinese models, WeChat remote control, VLA visual manipulation |
| Investment research / financial analysis | [Wind WindClaw](https://windclaw.wind.com.cn) | Direct Wind financial database connection, multi-agent investment research workflow |
| Zero-deployment, use right in the browser | [Baidu DuClaw](https://cloud.baidu.com/product/duclaw) | No server needed, use in the browser, ¥17.8/month |
| Mobile cross-app automation | [Baidu Redfinger Operator](https://cloud.baidu.com/product/redfinger) | World's first mobile OpenClaw, cross-app automated interactions |
| Mobile one-tap agent setup | [Alibaba Cloud JVSClaw](https://www.aliyun.com/product/jvsclaw) | 6-core 12G cloud sandbox, 3-minute setup on mobile |
| Mobile on-the-go Agent | [MaxClaw](https://maxclaw.ai/) mobile web / Xiaomi miclaw (in beta) | Cloud-based / system-level mobile Agent |
| Agent security protection | [Tencent Lobster Guardian](https://guanjia.qq.com) | AI security sandbox, full-process behavior protection and traceability |
| Hardware / embedded | [MimiClaw](https://github.com/memovai/mimiclaw) / [PicoClaw](https://github.com/sipeed/picoclaw) | Runs on ESP32 / old phones |

---

## 3. Self-Hosted vs. Managed: Decision Framework

Once you've chosen your scenario, the next step is deciding **how to deploy**. The following framework helps you choose between four deployment modes:

| Dimension | Self-Hosted (Main tutorial path) | Desktop Client | Cloud Provider One-Click | Fully Managed SaaS |
|-----------|----------------------------------|----------------|--------------------------|-------------------|
| **Representative** | OpenClaw manual install | AutoClaw / ClawX | Tencent Cloud / Alibaba Cloud, etc. | ArkClaw / Kimi Claw |
| **Control** | ★★★★★ Full control | ★★★★☆ Mostly | ★★★★☆ Mostly | ★★☆☆☆ Limited |
| **Ops cost** | Must maintain yourself | Nearly zero | Semi-managed | Zero ops |
| **Monthly cost** | Electricity / VPS only | Free / buy credits as needed | ¥10–100/month | ¥10–300/month |
| **Data sovereignty** | Fully local | Local | Cloud (controllable) | Cloud (limited) |
| **Flexibility** | ★★★★★ Highest | ★★★☆☆ Medium | ★★★★☆ High | ★★☆☆☆ Lowest |
| **Learning curve** | ★★★☆☆ Requires terminal | ★☆☆☆☆ Download and use | ★★☆☆☆ Buy and use | ★☆☆☆☆ Register and use |
| **Who it's for** | Technical users who want to learn in depth | Zero-experience users | Users who want convenience but retain control | Users who just want to use it |

**Decision Recommendations:**

> - 🎯 **Beginner's first choice**: AutoClaw (zero barrier) → then migrate to OpenClaw (full control) once familiar
> - 💰 **Lowest budget**: ClawX or OneClaw + StepFun free models (zero cost)
> - 🔒 **Security first**: IronClaw self-hosted (WASM sandbox + zero telemetry)
> - 🏢 **Enterprise use**: WorkBuddy (WeChat ecosystem) / ArkClaw (Feishu ecosystem)
> - 🤖 **Multi-agent**: HiClaw (Manager-Worker architecture)

---

## 4. Desktop Clients

Don't want to touch a terminal? The following desktop clients offer a graphical interface — download and use immediately.

| Product | Developer | Open Source | Platform | Built-in Model | Pre-installed Skills | Browser Control | Feishu | QQ | Sandbox | MCP | IM Remote | International | Difficulty | Website |
|---------|-----------|-------------|----------|---------------|---------------------|-----------------|--------|----|---------|-----|-----------|---------------|------------|---------|
| **AutoClaw** | Zhipu AI | ❌ Closed | macOS / Windows | Pony-Alpha-2 + free credits | 50+ (incl. browser Agent) | ✅ AutoGLM | ✅ One-tap QR scan | Requires config | — | — | — | — | ★☆☆☆☆ | [Website](https://autoglm.zhipuai.cn/autoclaw) |
| **ClawX** | ValueCell AI | ✅ MIT | macOS / Windows / Linux | ❌ Bring your own | Via ClawHub | ❌ | Manual config | Requires config | — | — | — | — | ★★☆☆☆ | [GitHub](https://github.com/ValueCell-ai/ClawX) / [Website](https://clawx.com.cn) |
| **OneClaw** | OneClaw Community | ✅ Open source | macOS / Windows / Linux | ❌ Bring your own | Via ClawHub | ❌ | Manual config | Requires config | — | — | — | — | ★★☆☆☆ | [GitHub](https://oneclaw.cn) |
| **LobsterAI** | NetEase Youdao | ✅ MIT | macOS / Windows / Linux | ❌ Bring your own | 16 built-in + 5,000+ in skill store | ❌ | ✅ DingTalk/Feishu | ✅ WeCom/QQ (v0.2.2+) | ✅ Alpine VM | ✅ | ✅ DingTalk/Feishu/WeCom/QQ | — | ★☆☆☆☆ | [Website](https://lobsterai.youdao.com) / [GitHub](https://github.com/netease-youdao/LobsterAI) |
| **EasyClaw** | Cheetah Mobile | ❌ Closed | macOS / Windows / iOS / Android | ❌ Bring your own | Fu Sheng's "Three Wan" skill pack (office/marketing/Xiaohongshu) | ❌ | ✅ Feishu/DingTalk | ✅ WeCom/QQ | — | — | ✅ Feishu/WeCom/DingTalk/WhatsApp/Telegram | ✅ Enterprise international edition | ★☆☆☆☆ | [Domestic](https://easyclaw.cn) / [International](https://easyclaw.com) |
| **YuanqiAIBot** | Cheetah Mobile | ❌ Closed | macOS / Windows | ❌ Bring your own | File handling / system operations / office creation | ❌ | ✅ Feishu/DingTalk | — | — | — | ✅ Feishu/DingTalk | — | ★☆☆☆☆ | [Website](https://yuanqiai.net) |
| **Molili** | Dangbei | ❌ Closed | macOS / Windows | ❌ Bring your own (deep adaptation for Chinese models) | Chinese-optimized skills | ✅ VLA visual control | — | — | — | — | ✅ WeChat remote control | — | ★☆☆☆☆ | [Website](https://molili.dangbei.com/) |
| **QoderWork** | Alibaba | ❌ Closed | macOS / Windows | ❌ Bring your own | Ask/Agent/Quest three modes + custom Skills | ❌ | — | — | — | ✅ | — | — | ★★☆☆☆ | [Website](https://qoder.com/qoderwork) |
| **BocLaw** | Bocloud | ❌ Closed | macOS / Windows / Linux / Web | ❌ Bring your own | Developer + knowledge worker skills | ❌ | — | — | — | — | ✅ Enterprise IM | — | ★☆☆☆☆ | [Website](https://www.bocloud.com.cn) |

**How to choose?**

- **AutoClaw**: Best for zero-experience users — download, register, start chatting, never touch a terminal. Built-in models mean no API key needed. Downsides: locked into Zhipu ecosystem, no Linux version.
- **ClawX**: Best for users who want a GUI without being locked into any ecosystem. Open-source + three platforms + provider of your choice. Includes the OpenClaw runtime, no need to install Node.js separately.
- **OneClaw**: An open-source desktop client with a similar positioning to ClawX, also supporting three platforms + provider of your choice. Suitable for users who prefer a lightweight open-source GUI.
- **LobsterAI**: Made by NetEase Youdao, China's first fully MIT open-source desktop Agent. 16 built-in skills + 5,000+ in the skill store + 15+ MCP marketplace services, broadest IM coverage (DingTalk/Feishu/WeCom/QQ/Telegram/Discord), Alpine VM sandbox isolation, 100% local data, no ads. Best for users who want **open-source + security + broad IM support**.
- **EasyClaw**: Made by Cheetah Mobile, Fu Sheng's signature "Three Wan" skill pack, double-click install zero-config. Has a mobile app (iOS/Android), can connect directly to Feishu, WeCom, DingTalk, QQ, and other common work apps. Best for **company office work, marketing operations, and cross-border expansion**.
- **YuanqiAIBot**: Also made by Cheetah Mobile, positioned as a "domestic OpenClaw", focused on file handling (PDF/Word/PPT parsing), system operations (mouse/keyboard control, software installation), and office creation (writing/PPT generation/transcription), with remote control via Feishu/DingTalk.
- **Molili**: Made by Dangbei, a desktop client with deep Chinese language optimization, connected to Chinese models (DeepSeek, MiniMax, Qwen, Kimi, Zhipu GLM), supports WeChat remote PC control + VLA visual manipulation.
- **QoderWork**: Made by Alibaba, a locally-running desktop Agent supporting three modes: Ask (Q&A), Agent (auto-execution), Quest (complex tasks), with MCP protocol + custom Skills.
- **BocLaw**: Made by Bocloud, an AI collaboration platform for developers and knowledge workers, full platform support (including Web sandbox mode), 100% local data, supports private cloud and air-gapped deployment, free for individuals.

> Chapter 1 of this tutorial covers the [AutoClaw installation process](/en/adopt/chapter1/) in detail. ClawX, OneClaw, and LobsterAI installation is also mentioned as alternatives in Chapter 1.

---

## 5. Managed Services

Don't want to manage servers? The following managed services let you register and start immediately.

### 5.1 Quick Comparison

| Product | Developer | Access | Underlying Model | Skills | Cloud Storage | Free Tier | Monthly Fee | IM Integration | Highlights | Who It's For |
|---------|-----------|--------|-----------------|--------|---------------|-----------|-------------|----------------|------------|--------------|
| [**ArkClaw**](https://www.volcengine.com/experience/ark?mode=claw) | ByteDance / Volcengine | Web browser | Doubao-Seed-2.0 | OpenClaw compatible | 40GB | Included in Coding Plan Pro | From ¥9.9/first month | Feishu | Dedicated ECS resource isolation | Feishu users / ByteDance ecosystem |
| [**Kimi Claw**](https://kimi.com) | Moonshot AI | Web (kimi.com) | Kimi K2.5 | 5,000+ (ClawHub) | 40GB | ❌ Requires Allegretto membership | ~$39/month | Telegram | BYOC hybrid deployment | International users |
| [**MaxClaw**](https://maxclaw.ai/) | MiniMax | Web + Telegram/Discord/Slack | MiniMax M2.5 (MoE) | Built-in full-stack toolkit | — | ✅ Welcome credits + daily credits | From ~$16/month | Telegram/Discord/Slack | Built-in multimodal (image/video) | Cost-effective / multimedia needs |
| [**WorkBuddy**](https://workbuddy.tencent.com) / [**QClaw**](https://claw.guanjia.qq.com) | Tencent | Local + WeCom Web | Hunyuan + multiple models | 20+ pre-built skill packs | — | ✅ 5,000 welcome credits | Free | WeChat/QQ/WeCom/DingTalk/Feishu | Only solution supporting WeChat | WeChat / enterprise users |
| [**DuClaw**](https://cloud.baidu.com/product/duclaw) | Baidu | Web browser | ERNIE / DeepSeek / Kimi-K2.5 / GLM-5 / MiniMax-M2.5 | Pre-built Skills incl. Baidu Search / Baike / academic | — | ✅ Limited-time offer | ¥17.8/month | — | Zero deployment, browser-ready, multi-model switching | Light users who don't want to manage servers |
| [**AstronClaw**](https://astronclaw.com) | iFlytek | Web browser | Spark X2 / MiniMax-M2.5 / Kimi-K2.5 / GLM-5 | 10,000+ Skills | — | ✅ Limited-time offer | ¥16.8/month | WeCom/DingTalk/Feishu | Cloud sandbox isolation, one-click deployment | iFlytek model ecosystem users |
| [**PineClaw**](https://pineclaw.com) | Pine AI | API/SDK + OpenClaw plugins | — | OpenClaw plugins + ClawHub skills + MCP servers | — | — | — | — | AI voice call agent: auto-dials customer service, negotiates bills, cancels subscriptions, 93% success rate | Users needing phone call automation |

---

## 6. Cloud Provider One-Click Deployment

Don't want a fully managed service, but also don't want to build from scratch? Major cloud providers offer server images with OpenClaw pre-installed — buy and use immediately.

### 6.1 Quick Comparison

| Cloud Provider | One-Click Deployment | Minimum Monthly Fee | Recommended Config | Bundled Models | IM Integration | Highlights | Who It's For |
|----------------|---------------------|--------------------|--------------------|----------------|----------------|------------|--------------|
| [**Tencent Cloud**](https://cloud.tencent.com/act/pro/openclaw) | ✅ Pre-installed image | ~¥99/year | 2 cores 4G | Hunyuan/GLM/Kimi/MiniMax | WeCom/QQ/DingTalk/Feishu | Deep QQ integration + [SkillHub](https://skillhub.tencent.com) skill images | QQ bot users |
| [**Alibaba Cloud**](https://www.aliyun.com/benefit/scene/moltbot) | ✅ Pre-installed image | **¥9.9/month** | 2 cores 4G | Qwen3.5-plus | DingTalk/Feishu | Lowest price + overseas nodes + [AgentBay](https://agentbay.space) | Budget-conscious / needs overseas |
| [**Baidu AI Cloud**](https://cloud.baidu.com/doc/qianfan/s/tmlhtdwyj) | ✅ Visual panel | Limited-time free | 2 cores 4G | ERNIE/Qwen/DeepSeek | DingTalk/Feishu | 7 official Qianfan skills | Baidu model ecosystem |
| [**Volcengine**](https://www.volcengine.com/activity/codingplan) | ✅ ECS + ArkClaw dual mode | ¥9.9/month | 2 cores 4G | Doubao-Seed-2.0 | Feishu/WeCom | Dual mode (ECS + ArkClaw) | Feishu users |
| [**Huawei Cloud**](https://activity.huaweicloud.com/openclaw.html) | ✅ Pre-installed image | ¥9.9/month or ¥68/year | 2 cores 2G | DeepSeek-V3.2/GLM-5/Kimi-K2 | Feishu/QQ/WeChat/DingTalk | ¥20 token voucher | Beginners / multi-IM |
| [**JD Cloud**](https://www.ithome.com/0/927/614.htm) | ✅ Image + human service | From ¥9.9 | — | Kimi K2.5 | — | ¥399 remote manual deployment | Those who don't want to do anything |
| [**iFlytek**](https://astronclaw.com) | ✅ Cloud one-click deployment | ¥16.8/month | Cloud sandbox | Spark X2/MiniMax-M2.5/Kimi-K2.5/GLM-5 | WeCom/DingTalk/Feishu | 10,000+ Skills + sandbox isolation | iFlytek ecosystem users |

---

## 7. Open-Source Self-Hosted Solutions

The following solutions are for technical users who want full control. If you are a beginner, it is recommended to start with [desktop clients](#_4-desktop-clients) or [managed services](#_5-managed-services) first.

### 7.1 Full-Featured Frameworks

| Project | Language | Website | Positioning | Security Isolation | Data Storage | Memory System | Telemetry | Skill Ecosystem | IM Support | MCP | Prerequisites | Who It's For |
|---------|----------|---------|-------------|-------------------|-------------|---------------|-----------|-----------------|------------|-----|---------------|--------------|
| **OpenClaw** | TypeScript (Node.js) | [GitHub](https://github.com/openclaw/openclaw) | Full-featured Agent execution engine (main tutorial solution) | Docker sandbox | SQLite | File-level (Markdown) | Optional | ClawHub 25,000+ | 15+ channels | ✅ | Node.js >= 22 | Technical users who want to learn in depth |
| **IronClaw** | Rust | [Website](https://www.ironclaw.com) / [GitHub](https://github.com/nearai/ironclaw) | Security-first rewrite | WASM sandbox + credential protection + prompt injection defense | PostgreSQL 15+ + pgvector | Hybrid full-text + vector retrieval | Zero telemetry, fully auditable | OpenClaw compatible + dynamic tool building | OpenClaw-compatible channels | ✅ | Rust 1.85+ / PostgreSQL 15+ | Security-sensitive scenarios (enterprise intranet / sensitive data) |
| **NemoClaw** | Python | [Website](https://nemoclaw.bot) / [GitHub](https://github.com/NVIDIA/NemoClaw) | NVIDIA enterprise security stack (OpenClaw + guardrails) | OpenShell policy guardrails + Agent Toolkit security layer | — | — | Privacy router + local inference | OpenClaw compatible + NVIDIA Agent Toolkit | OpenClaw-compatible channels | ✅ | NVIDIA GPU (RTX/DGX) | Enterprise-grade secure deployment + GPU-accelerated inference |

### 7.2 Lightweight / Minimalist / Specialized Solutions

The following projects each have a distinct focus — minimalist design, security customization, multi-agent collaboration, or local model support — suitable for learning, customization, or specific scenarios.

| Project | Language | Positioning | GitHub |
|---------|----------|-------------|--------|
| **NanoClaw** | TypeScript | Container sandbox isolation, minimalist design, easy to understand and extend | [qwibitai/nanoclaw](https://github.com/qwibitai/nanoclaw) |
| **ZeroClaw** | Rust | Trait-driven, zero-overhead architecture, fully replaceable core, cross-environment deployment | [zeroclaw-labs/zeroclaw](https://github.com/zeroclaw-labs/zeroclaw) |
| **TinyClaw** | Shell/TS | Multi-agent multi-team, chained execution + fan-out, isolated workspaces | [TinyAGI/tinyclaw](https://github.com/TinyAGI/tinyclaw) |
| **AlphaClaw** | TypeScript | OpenClaw ops management layer: Web panel + gateway management + self-healing watchdog + Git auto-backup | [chrysb/alphaclaw](https://github.com/chrysb/alphaclaw) |
| **CoPaw** | Python | Made by Alibaba Qwen AgentScope team, native DingTalk integration, long-term memory (ReMe framework), supports local models | [agentscope-ai/CoPaw](https://github.com/agentscope-ai/CoPaw) |
| **HiClaw** | Docker | Higress community multi-agent collaboration platform, Manager-Worker architecture, human in the loop, built-in Matrix server | [higress-group/hiclaw](https://github.com/higress-group/hiclaw) |
| **GenericAgent** | Python | Minimalist autonomous Agent from Fudan A3 Lab, self-organizing/self-learning/self-evolving, can automatically install/uninstall complex systems like OpenClaw | [lsdefine/pc-agent-loop](https://github.com/lsdefine/pc-agent-loop) |
| **ClawRouter** | TypeScript | Agent-native LLM intelligent routing, 41+ models with local zero-latency auto-routing, ECO/AUTO/PREMIUM tiers save up to 92% costs | [BlockRunAI/ClawRouter](https://github.com/BlockRunAI/ClawRouter) |
| **nanobot** | Python | Made by HKUST HKUDS, only 1% the code size of OpenClaw, research-friendly, one-command pip install, supports 10+ IM channels | [HKUDS/nanobot](https://github.com/HKUDS/nanobot) |
| **ClawWork** | Python | Made by HKUST HKUDS, AI Coworker economic benchmark: 220 GDPVal tasks, 44 professions, $10 survival challenge, based on nanobot | [HKUDS/ClawWork](https://github.com/HKUDS/ClawWork) |
| **MetaClaw** | Python | Online RL evolution layer, Agent self-learns and self-evolves from interactions, no GPU needed, one-click injection into OpenClaw | [aiming-lab/MetaClaw](https://github.com/aiming-lab/MetaClaw) |
| **AutoResearchClaw** | Python | Made by aiming-lab, automated research workflow: literature search, experiment design, data analysis, paper writing, end-to-end AI research assistant | [aiming-lab/AutoResearchClaw](https://github.com/aiming-lab/AutoResearchClaw) |
| **MiniClaw** | TypeScript | Minimalist OpenClaw alternative, run on Telegram directly using Claude Pro/ChatGPT Plus subscriptions, zero API cost | [htlin222/mini-claw](https://github.com/htlin222/mini-claw) |
| **ChatClaw** | Go | Made by Zhima AI, 30MB package installs in one minute, built-in skill marketplace + knowledge base + memory + MCP + scheduled tasks, covers WhatsApp/Telegram/Slack/Discord/Gmail/DingTalk/WeCom/QQ/Feishu | [zhimaAi/ChatClaw](https://github.com/zhimaAi/ChatClaw) |

### 7.3 Open-Source Solutions Comprehensive Comparison

| Project | Language | Install Difficulty | Resource Usage | Security | Skill Ecosystem | Multi-Agent | IM Integration | Suitable For |
|---------|----------|--------------------|----------------|----------|-----------------|-------------|----------------|--------------|
| **OpenClaw** | TypeScript | ★★☆☆☆ | Medium | ★★★☆☆ | ★★★★★ | Limited | ★★★★★ | General workhorse |
| **IronClaw** | Rust | ★★★★☆ | Medium | ★★★★★ | ★★★★☆ | Limited | ★★★★☆ | Security-sensitive |
| **NemoClaw** | Python | ★★☆☆☆ | Medium-High (GPU) | ★★★★★ | ★★★★☆ | Limited | ★★★★☆ | Enterprise security + GPU inference |
| **CoPaw** | Python | ★★☆☆☆ | Medium | ★★★☆☆ | ★★★☆☆ | Limited | ★★★★☆ | DingTalk ecosystem |
| **NanoClaw** | TypeScript | ★★☆☆☆ | Low | ★★★☆☆ | ★★☆☆☆ | None | ★★☆☆☆ | Learning / customization |
| **ZeroClaw** | Rust | ★★★☆☆ | Low | ★★★☆☆ | ★★☆☆☆ | None | ★★☆☆☆ | High performance |
| **HiClaw** | Docker | ★★☆☆☆ | Medium | ★★★★☆ | ★★★☆☆ | ★★★★★ | ★★★☆☆ | Team collaboration |
| **GenericAgent** | Python | ★☆☆☆☆ | Low | ★★★☆☆ | ★☆☆☆☆ | None | ★☆☆☆☆ | General autonomous Agent |
| **ClawRouter** | TypeScript | ★★☆☆☆ | Low | ★★★★☆ | — | None | — | Multi-model routing / cost reduction |
| **nanobot** | Python | ★☆☆☆☆ | Low | ★★★☆☆ | ★★☆☆☆ | None | ★★★★☆ | Academic research / rapid prototyping |
| **ClawWork** | Python | ★★☆☆☆ | Medium | ★★★☆☆ | — | None | ★★★★☆ | Agent economic benchmarking |
| **MetaClaw** | Python | ★☆☆☆☆ | Low | ★★★☆☆ | ★★★☆☆ | None | — | Agent self-evolution / RL |
| **AutoResearchClaw** | Python | ★☆☆☆☆ | Low | ★★★☆☆ | ★★☆☆☆ | None | — | Automated research |
| **MiniClaw** | TypeScript | ★☆☆☆☆ | Low | ★★★☆☆ | ★☆☆☆☆ | None | ★☆☆☆☆ | Subscription reuse / minimalist |
| **ChatClaw** | Go | ★☆☆☆☆ | Low | ★★★☆☆ | ★★★☆☆ | None | ★★★★★ | Full IM coverage / open-source self-hosted |

---

## 8. Mobile and IoT Solutions

### 8.1 Mobile

| Product | Developer | Platform | Positioning | Status |
|---------|-----------|----------|-------------|--------|
| **Xiaomi miclaw** | Xiaomi | Android (Xiaomi 17 series) | System-level mobile Agent, MiMo model, 50+ tools, covers human-car-home full ecosystem, edge-cloud hybrid privacy computing | 🔒 Beta |
| **Redfinger Operator** | Baidu | Android (iOS coming soon) | World's first mobile OpenClaw application, cross-app automated interaction (food delivery, ride-hailing, etc.), natural language commands | ✅ Live |
| **JVSClaw** | Alibaba Cloud | iOS / Android / iPad / Web | Mobile one-tap agent setup, dedicated 6-core 12G cloud sandbox (ClawSpace) per user, 3-minute onboarding | ✅ Live |
| **MaxClaw** | MiniMax | Web (mobile access) | Cloud Agent, accessible via mobile browser | ✅ Live |
| **droidclaw** | UnitedByAI | Android | OpenClaw mobile adaptation, lightweight automation | [Open source](https://github.com/UnitedByAI/droidclaw) |

### 8.2 Embedded / IoT

| Project | Language | Hardware | Positioning | GitHub |
|---------|----------|----------|-------------|--------|
| **PicoClaw** | Go | Old Android phones / Raspberry Pi / low-spec VPS | Ultra-low resource Agent, single binary deployment | [sipeed/picoclaw](https://github.com/sipeed/picoclaw) |
| **MimiClaw** | C | ESP32-S3 | No operating system, powered by USB and runs continuously | [memovai/mimiclaw](https://github.com/memovai/mimiclaw) |
| **zclaw** | C | ESP32 | Minimal AI assistant | [tnm/zclaw](https://github.com/tnm/zclaw) |
| **NullClaw** | Zig | General embedded | Ultra-small binary, low memory, highly portable | [nullclaw/nullclaw](https://github.com/nullclaw/nullclaw) |

> Embedded solutions are suitable for IoT enthusiasts and hardware geeks. If you want to run an AI assistant on an ESP32 development board, MimiClaw and zclaw can make that happen. PicoClaw can turn an idle old Android phone into a 24/7 personal Agent.

---

## 9. The Hundred-Shrimp Battle: A Panorama of Chinese Tech Giants

![The Hundred-Shrimp Battle](./images/百虾大战.jpg)

In early 2026, OpenClaw sparked a "Hundred-Shrimp Battle" in China — 20+ tech companies quickly followed suit, launching their own Claw-like products or deployment solutions.

| Company | Product / Solution | Type | Status |
|---------|-------------------|------|--------|
| **Zhipu AI** | [AutoClaw](https://autoglm.zhipuai.cn/autoclaw) one-click install edition | Desktop client | ✅ Live |
| **ByteDance** | [ArkClaw](https://www.volcengine.com/experience/ark?mode=claw) fully managed + Feishu integration + Volcengine cloud deployment | Managed + cloud deployment | ✅ Live |
| **Tencent** | [WorkBuddy](https://workbuddy.tencent.com) + [QClaw](https://claw.guanjia.qq.com) + [Lobster Guardian](https://guanjia.qq.com) (AI security sandbox) + [Tencent Cloud deployment](https://cloud.tencent.com/act/pro/openclaw) + [SkillHub](https://skillhub.tencent.com) + [Lexiang MCP](https://github.com/tencent-lexiang/lexiang-mcp-server) | Local + managed + cloud + security | ✅ Partial beta |
| **Moonshot AI** | [Kimi Claw](https://kimi.com) managed edition | Managed service | ✅ Live |
| **MiniMax** | [MaxClaw](https://maxclaw.ai/) managed edition + mobile | Managed service | ✅ Live |
| **NetEase Youdao** | [LobsterAI](https://lobsterai.youdao.com) fully MIT open-source desktop Agent + skill store + MCP marketplace ([GitHub](https://github.com/netease-youdao/LobsterAI)) | Desktop client | ✅ Live |
| **Cheetah Mobile** | [EasyClaw](https://easyclaw.cn) ([International](https://easyclaw.com)) one-click install + [YuanqiAIBot](https://yuanqiai.net) desktop Agent | Desktop client | ✅ Live |
| **Alibaba** | [Alibaba Cloud one-click deployment](https://www.aliyun.com/benefit/scene/moltbot) + [CoPaw](https://copaw.bot/) ([GitHub](https://github.com/agentscope-ai/CoPaw)) + [QoderWork](https://qoder.com/qoderwork) desktop Agent + [JVSClaw](https://www.aliyun.com/product/jvsclaw) mobile + [AgentBay](https://agentbay.space) | Cloud deployment + desktop + mobile | ✅ Live |
| **Baidu** | [Qianfan one-click experience](https://cloud.baidu.com/doc/qianfan/s/tmlhtdwyj) + [DuClaw](https://cloud.baidu.com/product/duclaw) zero-deployment managed + [Redfinger Operator](https://cloud.baidu.com/product/redfinger) mobile | Cloud deployment + managed + mobile | ✅ Live |
| **iFlytek** | [AstronClaw](https://astronclaw.com) cloud one-click deployment, 10,000+ Skills, Spark X2 model | Cloud deployment + managed | ✅ Live |
| **Huawei** | [Huawei Cloud one-click deployment](https://activity.huaweicloud.com/openclaw.html) + Xiaoyi Claw (built into HarmonyOS) | Cloud deployment + mobile | ✅ Live / 🔒 Xiaoyi Claw in beta |
| **JD** | JD Cloud one-click deployment + [remote human service](https://www.ithome.com/0/927/614.htm) | Cloud deployment + service | ✅ Live |
| **Xiaomi** | Xiaomi miclaw system-level phone Agent | Mobile | 🔒 Beta |
| **Dangbei** | [Molili](https://molili.dangbei.com/) Chinese-optimized desktop client, deep adaptation for Chinese models, WeChat remote control + VLA visual manipulation | Desktop client | ✅ Live |
| **Wind** | [WindClaw](https://windclaw.wind.com.cn) AI investment research agent platform, direct Wind financial database connection, multi-Agent investment research workflow | Desktop client (vertical) | ✅ Public beta |
| **Bocloud** | [BocLaw](https://www.bocloud.com.cn) developer AI collaboration platform, full platform + Web sandbox, local data, free for individuals | Desktop client | ✅ Live |
| **Zhima AI** | [ChatClaw](https://github.com/zhimaAi/ChatClaw) Go open-source Agent, 30MB package, full coverage of 9 major IM channels | Open-source desktop | ✅ Live |
| **Meituan** | Xiaomei (AI life assistant, search "Xiaomei-AI Life Assistant" on App Store) + joint remote deployment service with Lenovo Baiying | Mobile App + remote service | ✅ Live |
| **360** | [Nano AI](https://www.n.cn/) (multi-agent swarm architecture) + [SEAF enterprise agent platform](https://sea.n.cn/) | Consumer + enterprise | ✅ Live |

> The essence of this competition is a **battle for the entry point** — whoever becomes the default interface through which users invoke AI capabilities wins. From chat platforms (WeChat/QQ/Feishu) to desktop clients, from cloud services to phone system layers, every company is racing to occupy the position where they are strongest.
