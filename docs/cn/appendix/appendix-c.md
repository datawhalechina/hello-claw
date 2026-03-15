---
prev:
  text: '附录 B：社区之声与生态展望'
  link: '/cn/appendix/appendix-b'
next:
  text: '附录 D：技能开发与发布指南'
  link: '/cn/appendix/appendix-d'
---

# 附录 C：类 Claw 方案对比与选型指南

> 最后更新：2026-03-13 | 价格与功能可能随时调整，请以各产品官网最新信息为准。

OpenClaw 的爆发催生了一个庞大的"龙虾生态"——从开源框架到商业托管、从桌面客户端到嵌入式设备、从个人助手到企业级多智能体平台。本附录系统梳理所有主流类 Claw 方案，帮你根据自身需求快速选型。

**目录**

- [1. 全景总览](#_1-全景总览)
- [2. 快速选型：30 秒找到你的方案](#_2-快速选型-30-秒找到你的方案)
- [3. 自建 vs 托管决策框架](#_3-自建-vs-托管决策框架)
- [4. 桌面客户端](#_4-桌面客户端)
- [5. 托管服务](#_5-托管服务)
- [6. 云厂商一键部署](#_6-云厂商一键部署)
- [7. 开源自建方案](#_7-开源自建方案)
- [8. 移动端与 IoT 方案](#_8-移动端与-iot-方案)
- [9. 百虾大战：国内大厂全景图](#_9-百虾大战-国内大厂全景图)

---

## 1. 全景总览

类 Claw 方案可分为五大类：

| 分类 | 代表产品 | 适合谁 | 详见 |
|------|---------|--------|------|
| **桌面客户端** | AutoClaw、ClawX、LobsterAI、EasyClaw | 想要 GUI 体验、不想碰终端的用户 | [第 4 节](#_4-桌面客户端) |
| **托管服务** | ArkClaw、Kimi Claw、MaxClaw、WorkBuddy | 只想用、不想管服务器的用户 | [第 5 节](#_5-托管服务) |
| **云厂商部署** | 腾讯云、阿里云、华为云、百度智能云等 | 想要独立服务器但省去安装步骤的用户 | [第 6 节](#_6-云厂商一键部署) |
| **开源自建** | OpenClaw、IronClaw、CoPaw、NanoClaw 等 | 想完全掌控、愿意折腾的技术用户 | [第 7 节](#_7-开源自建方案) |
| **移动端/IoT** | Xiaomi miclaw、MimiClaw、droidclaw | 手机端或嵌入式硬件场景 | [第 8 节](#_8-移动端与-iot-方案) |

> 本教程主线方案为 **OpenClaw 手动安装**（第二章）。如果你是零基础用户，建议从桌面客户端（[第 4 节](#_4-桌面客户端)）开始。

换个角度看——选 AI 就像买车，你得先知道自己是要越野、通勤、还是拉货：

| 阵营 | 定位 | 代表选手 | 适合谁 |
|------|------|---------|--------|
| **第一阵营：本地桌面与一键安装** | 开箱即用，注重隐私 | [LobsterAI](https://lobsterai.youdao.com/)（网易有道）、[AutoClaw](https://autoglm.zhipuai.cn/autoclaw)（智谱）、[EasyClaw](https://easyclaw.com/)（猎豹）、[ClawX](https://clawx.com.cn)、[WorkBuddy](https://workbuddy.tencent.com)（腾讯） | 打工人写日报、做 PPT，装在自己电脑里最踏实 |
| **第二阵营：公有云原生与一键部署** | 高扩展，企业级 | [阿里云](https://www.aliyun.com/benefit/scene/moltbot)、[腾讯云](https://cloud.tencent.com/act/pro/openclaw)、[火山引擎](https://www.volcengine.com/activity/codingplan)、[华为云](https://activity.huaweicloud.com/openclaw.html)、[百度智能云](https://cloud.baidu.com/doc/qianfan/s/tmlhtdwyj)、[京东云](https://www.ithome.com/0/927/614.htm) | 企业大规模应用协同 |
| **第三阵营：云端托管与移动跨端** | 跨平台便捷，免除本地算力烦恼 | [MaxClaw](https://maxclaw.ai/)（MiniMax）、[Kimi Claw](https://kimi.com)（月之暗面）、[ArkClaw](https://www.volcengine.com/experience/ark?mode=claw)（字节） | 只想用、不想管服务器 |
| **第四阵营：专业定制与极客硬件** | 进阶领域与低功耗场景 | [PicoClaw](https://github.com/sipeed/picoclaw)（树莓派）、[IronClaw](https://www.ironclaw.com/)（安全重写）、[HiClaw](https://hiclaw.org/)（多智能体）、[MimiClaw](https://github.com/memovai/mimiclaw)（ESP32） | 极客玩家、安全敏感、多智能体协作 |

---

## 2. 快速选型：30 秒找到你的方案

> 别管技术参数了，对准你的场景和需求，闭眼选就完事了！

| 场景 | 推荐方案 | 一句话理由 |
|------|---------|-----------|
| 小白 / 个人轻办公 | [网易有道 LobsterAI](https://lobsterai.youdao.com/) 或 [智谱 AutoClaw](https://autoglm.zhipuai.cn/autoclaw) | 开源免费 / 一键直装，基础功能拉满 |
| 零基础，不想绑定智谱 | [ClawX](https://clawx.com.cn) + StepFun 免费模型 | 开源 GUI，自选提供商 |
| 重度文档分析师 | [Kimi Claw](https://kimi.com) | 200 万字长上下文，几十个文档扔进去直接吐核心摘要 |
| 微信生态协同 | [腾讯 QClaw](https://claw.guanjia.qq.com/) | 唯一支持微信控制电脑 |
| 钉钉生态协同 | [阿里 CoPaw](https://copaw.bot/)（[GitHub](https://github.com/agentscope-ai/CoPaw)） | 钉钉原生集成，开源免费 |
| 飞书生态协同 | [字节 ArkClaw](https://www.volcengine.com/experience/ark?mode=claw) | 飞书深度集成 + Doubao-Seed-2.0 |
| 做 QQ 机器人 | [腾讯云](#_6-云厂商一键部署) 一键部署 | QQ 开放平台深度集成 |
| 跨境出海 | [猎豹 EasyClaw](https://easyclaw.com/) | 出海专版，国际化支持 + 本地化部署 |
| 只想用不想管 | [ArkClaw](https://www.volcengine.com/experience/ark?mode=claw) / [Kimi Claw](https://kimi.com) | 云端全托管，注册即用 |
| 想完全掌控配置 | [OpenClaw](https://github.com/openclaw/openclaw) 手动安装 | 本教程主线方案 |
| 安全敏感 / 企业内网 | [IronClaw](https://www.ironclaw.com/)（[GitHub](https://github.com/nearai/ironclaw)） | WASM 沙盒 + 零遥测，Rust 安全重写 |
| 多智能体团队协作 | [HiClaw](https://hiclaw.org/)（[GitHub](https://github.com/higress-group/hiclaw)） | Manager-Worker 架构，人在回路中 |
| 预算为零 | [ClawX](https://clawx.com.cn) + OpenRouter 免费模型 | 开源 GUI + 免费模型 = ¥0 |
| 预算最低（有付费） | [阿里云](#_6-云厂商一键部署) ¥9.9/月起 | 最低入门价，含海外节点 |
| 开发者 / 极客 | [PicoClaw](https://github.com/sipeed/picoclaw) | 10MB 极小体积，低资源占用，硬件友好 |
| 手机端随身 Agent | [MaxClaw](https://maxclaw.ai/) 移动 Web / 小米 miclaw（内测中） | 云端 / 系统级手机 Agent |
| 硬件 / 嵌入式 | [MimiClaw](https://github.com/memovai/mimiclaw) / [PicoClaw](https://github.com/sipeed/picoclaw) | ESP32 / 旧手机即可运行 |

### 编者亲测：三种最佳入门组合

> 以下三种组合经过实际测试，覆盖零成本、零门槛、高性能三种需求，选一个就够了。

| 组合 | 客户端 | 模型 | 月费 | 适合谁 |
|------|--------|------|------|--------|
| **零成本入门** | [ClawX](#_4-桌面客户端) | OpenRouter `stepfun/step-3.5-flash:free` | ¥0 | 对小白最友好，免费 + GUI + 自选提供商 |
| **零门槛体验** | [AutoClaw](#_4-桌面客户端) | 内置 Pony-Alpha-2 | ¥0（送积分） | 不想配置任何东西，开箱即用 |
| **微信直连** | [WorkBuddy](https://workbuddy.tencent.com) | 混元 + 多模型 | 免费（送积分） | 微信/企业微信/QQ 用户，直接给助手发消息 |
| **一键傅盛同款** | [EasyClaw](https://easyclaw.com/) | 自备 API Key | 免费 | 想要"三万"专属技能包，免配置体验 |

- **组合一**：ClawX 是开源 GUI 客户端，配合 OpenRouter 的免费模型，完全零成本。注册 OpenRouter → 获取 API Key → 在 ClawX 中配置即可。详见[第 1 章](/cn/adopt/chapter1/) + [第 2 章](/cn/adopt/chapter2/)。
- **组合二**：AutoClaw（澳龙）下载即用，内置智谱 Pony-Alpha-2 模型，新用户赠送积分。适合完全不想碰配置的用户。详见[第 1 章](/cn/adopt/chapter1/)。
- **组合三**：WorkBuddy 是腾讯推出的职场 AI Agent，直接给微信助手发送需求即可，无需配置服务器。支持微信/企业微信/QQ 直连，方便有效，适合微信生态用户。
- **组合四**：EasyClaw 是猎豹移动推出的一键安装客户端，支持 Windows/Mac 和 EasyClaw Cloud。立即下载，体验傅盛同款"三万"专属技能包，一键安装免除繁琐配置，集成各家顶级模型。

---

## 3. 自建 vs 托管决策框架

选好场景后，下一步是决定**怎么部署**。以下框架帮你在四种部署模式之间做出选择：

| 维度 | 自建部署（本教程主线） | 桌面客户端 | 云厂商一键部署 | 全托管 SaaS |
|------|---------------------|-----------|---------------|------------|
| **代表** | OpenClaw 手动安装 | AutoClaw / ClawX | 腾讯云/阿里云等 | ArkClaw / Kimi Claw |
| **控制权** | ★★★★★ 完全掌控 | ★★★★☆ 大部分 | ★★★★☆ 大部分 | ★★☆☆☆ 受限 |
| **运维成本** | 需自行维护 | 几乎无 | 半托管 | 零运维 |
| **月费** | 仅电费/VPS | 免费/按需买积分 | ¥10-100/月 | ¥10-300/月 |
| **数据主权** | 完全本地 | 本地 | 云端（可控） | 云端（受限） |
| **灵活性** | ★★★★★ 最高 | ★★★☆☆ 中等 | ★★★★☆ 较高 | ★★☆☆☆ 最低 |
| **上手难度** | ★★★☆☆ 需终端 | ★☆☆☆☆ 下载即用 | ★★☆☆☆ 买了就能用 | ★☆☆☆☆ 注册即用 |
| **适合谁** | 想深入学习的技术用户 | 零基础用户 | 想省事但保留控制的用户 | 只想用不想管的用户 |

**决策建议：**

> - 🎯 **新手首选**：AutoClaw（零门槛）→ 熟悉后迁移到 OpenClaw（完全掌控）
> - 💰 **预算最低**：ClawX + StepFun 免费模型（零成本）
> - 🔒 **安全优先**：IronClaw 自建（WASM 沙盒 + 零遥测）
> - 🏢 **企业用途**：WorkBuddy（微信生态）/ ArkClaw（飞书生态）
> - 🤖 **多智能体**：HiClaw（Manager-Worker 架构）

---

## 4. 桌面客户端

不想碰终端？以下桌面客户端提供图形化界面，下载即用。

| | AutoClaw（澳龙） | ClawX | LobsterAI（有道龙虾） | EasyClaw（猎豹） |
|---|---|---|---|---|
| **开发商** | 智谱 (Zhipu AI) | ValueCell AI | 网易有道 | 猎豹移动 |
| **开源** | ❌ 闭源 | ✅ MIT 开源 | ✅ MIT 开源 | ❌ 闭源 |
| **支持平台** | macOS / Windows | macOS / Windows / Linux | macOS / Windows | macOS / Windows |
| **内置模型** | Pony-Alpha-2 + 免费积分 | ❌ 需自备 API Key | ❌ 需自备 API Key | ❌ 需自备 API Key |
| **预装技能** | 50+（含浏览器 Agent） | 通过 ClawHub 安装 | 内置技能商店 | 傅盛官方技能包 |
| **浏览器操作** | ✅ AutoGLM Browser-Use | ❌ | ❌ | ❌ |
| **飞书接入** | ✅ 扫码一键 | 需手动配置 | ✅ 支持 | ✅ 支持 |
| **QQ 接入** | 需配置 | 需配置 | ✅ 支持 (v0.2.2+) | 需配置 |
| **沙盒隔离** | — | — | ✅ Alpine Linux VM | — |
| **MCP 支持** | — | — | ✅ | — |
| **IM 远程控制** | — | — | — | ✅ WhatsApp/Telegram/飞书 |
| **出海版** | — | — | — | ✅ 企业出海专版 |
| **上手难度** | ★☆☆☆☆ | ★★☆☆☆ | ★☆☆☆☆ | ★☆☆☆☆ |
| **官网** | [autoglm.zhipuai.cn/autoclaw](https://autoglm.zhipuai.cn/autoclaw) | [GitHub](https://github.com/ValueCell-ai/ClawX) / [clawx.com.cn](https://clawx.com.cn) | [lobsterai.youdao.com](https://lobsterai.youdao.com/) / [GitHub](https://github.com/netease-youdao/LobsterAI) | [easyclaw.com](https://easyclaw.com/) |

**怎么选？**

- **AutoClaw**：最适合零基础用户——下载、注册、开聊，全程不用碰终端。内置模型意味着连 API Key 都不需要。缺点是绑定智谱生态，无 Linux 版。
- **ClawX**：最适合想要 GUI 但不想绑定任何生态的用户。开源 + 三平台 + 提供商自选。**Linux 用户的唯一 GUI 选项**。内置 OpenClaw 运行时，无需另装 Node.js。
- **LobsterAI**：大厂出品（网易有道），IM 集成最广（钉钉/飞书/企微/QQ/Telegram/Discord），内置沙盒安全隔离，有自己的技能商店。适合想要安全 + 广泛 IM 支持的用户。
- **EasyClaw**：猎豹移动 CEO 傅盛亲自推广，主打双击安装零配置、3 分钟上手。独家特色是通过 WhatsApp/Telegram/飞书远程控制电脑，并提供**出海企业专版**，适合跨境出海场景。

> 本教程第一章详细介绍了 [AutoClaw 安装流程](/cn/adopt/chapter1/)。ClawX 和 LobsterAI 的安装也在第一章备选方案中提及。

---

## 5. 托管服务

不想管服务器？以下托管服务让你注册即用。

### 5.1 一键对比

| | ArkClaw | Kimi Claw | MaxClaw | WorkBuddy / QClaw |
|---|---|---|---|---|
| **开发商** | 字节跳动/火山引擎 | 月之暗面 | MiniMax/稀宇科技 | 腾讯 |
| **访问方式** | Web 浏览器 | Web (kimi.com) | Web + Telegram/Discord/Slack | 本地 + 企微 Web |
| **底层模型** | Doubao-Seed-2.0 | Kimi K2.5 | MiniMax M2.5 (MoE) | Hunyuan + 多模型 |
| **技能数量** | OpenClaw 兼容 | 5,000+ (ClawHub) | 内置全栈工具包 | 20+ 预置技能包 |
| **云存储** | 40GB | 40GB | — | — |
| **免费额度** | Coding Plan Pro 含 | ❌ 需 Allegretto 会员 | ✅ 欢迎积分 + 每日积分 | ✅ 5,000 欢迎积分 |
| **付费价格** | ¥9.9/首月起 | ~$39/月 | ~$16/月起 | 免费 |
| **IM 集成** | 飞书 | Telegram | Telegram/Discord/Slack | 微信/QQ/企微/钉钉/飞书 |
| **特色功能** | 专属 ECS 资源隔离 | BYOC 混合部署 | 多模态（图/视频）内置 | 唯一支持微信 |
| **适合谁** | 飞书用户/字节生态 | 国际化用户 | 性价比/多媒体需求 | 微信/企业用户 |

### 5.2 各托管服务详解

<details>
<summary>ArkClaw（火山方舟）</summary>

字节跳动旗下火山引擎推出的云端全托管 OpenClaw，2026 年 3 月 9 日上线。

**核心优势：**
- 零运维——打开浏览器即可使用，无需安装任何软件
- 专属 ECS 云资源（一对一隔离），40GB 云存储
- 7×24 在线，飞书深度集成（含官方 OpenClaw 插件）
- 支持模型：Doubao-Seed-2.0、Kimi K2.5、MiniMax M2.5、GLM

**定价：**
- Coding Plan Lite：¥9.9/首月（含 7 天 ArkClaw 试用）
- Coding Plan Pro：永久包含 ArkClaw（订阅期内）
- Coding Plan 同时支持 Claude Code、Cursor、Cline 等开发工具

**链接：** [火山引擎 ArkClaw](https://www.volcengine.com/experience/ark?mode=claw) | [Coding Plan](https://www.volcengine.com/activity/codingplan)

</details>

<details>
<summary>Kimi Claw（月之暗面）</summary>

月之暗面将 OpenClaw 原生集成到 kimi.com 平台，2026 年 2 月 15 日上线。

**核心优势：**
- 5,000+ 社区技能（通过 ClawHub）
- 40GB 云文件存储
- BYOC（Bring Your Own Claw）：可连接自建 OpenClaw 实例，实现混合部署
- 搜索增强（集成 Yahoo Finance 等实时数据源）
- Telegram 群聊自动化

**定价：**
- 需 Allegretto 会员及以上（约 $39/月）
- 免费版不包含完整 OpenClaw 功能

**链接：** [Kimi.com](https://kimi.com)

</details>

<details>
<summary>MaxClaw（MiniMax / 稀宇科技）</summary>

MiniMax 推出的全托管云端 Agent，2026 年 2 月 25 日上线。

**核心优势：**
- MoE 架构（229B 参数，~10B 活跃），成本为 Claude 3.5 Sonnet 的 1/7 ~ 1/20
- 内置全栈工具：图像/视频理解、网页提取、视觉搜索、文生图/视频
- 无需外部 API Key，所有能力内置
- 200K+ tokens 持久记忆
- 一键 10 秒云端部署

**定价：**
- 免费层：欢迎积分 + 每日积分（有并发限制）
- Basic：~$16/月起（Basic/Pro/Ultra 三档）

**链接：** [MaxClaw 官网](https://maxclaw.ai/) | [agent.minimax.io](https://agent.minimax.io)

</details>

<details>
<summary>WorkBuddy / QClaw（腾讯）</summary>

腾讯推出两款产品：WorkBuddy（职场 Agent）和 QClaw（微信/QQ 控制），2026 年 3 月 9 日上线。

**WorkBuddy：**
- 本地安装的职场 AI Agent，20+ 预置技能包（发票处理、报告生成、数据任务）
- 兼容 OpenClaw 技能生态 + MCP 支持
- 多模型切换：混元、DeepSeek、GLM、Kimi、MiniMax
- 接入企微/QQ/飞书/钉钉
- 已在腾讯内部 2,000+ 非技术员工（HR、行政、运营）中测试

**QClaw（内测中）：**
- 一键部署 OpenClaw + 原生微信/QQ 集成
- **唯一支持通过微信控制电脑的方案**（13 亿+ 用户平台）
- 企微接入降至 3 步

**定价：**
- WorkBuddy：免费 + 5,000 欢迎积分
- QClaw：未定价（内测阶段）

**链接：** [WorkBuddy 官网](https://workbuddy.tencent.com) | [QClaw](https://claw.guanjia.qq.com/)

</details>

---

## 6. 云厂商一键部署

不想用全托管服务，但也不想从零搭建？各大云厂商提供预装 OpenClaw 的服务器镜像，一键购买即可使用。

### 6.1 一键对比

| 对比维度 | 腾讯云 | 阿里云 | 百度智能云 | 火山引擎 | 华为云 | 京东云 |
|---------|--------|--------|-----------|---------|--------|--------|
| **一键部署** | ✅ 镜像预装 | ✅ 镜像预装 | ✅ 可视化面板 | ✅ ECS + ArkClaw 双模 | ✅ 镜像预装 | ✅ 镜像 + 人工服务 |
| **最低月费** | ~¥99/年 | **¥9.9/月** | 限时免费 | ¥9.9/月 | ¥9.9/月 或 ¥68/年 | ¥9.9 起 |
| **推荐配置** | 2核4G | 2核4G | 2核4G | 2核4G | 2核2G | — |
| **绑定模型** | 混元/GLM/Kimi/MiniMax | Qwen3.5-plus | 文心/Qwen/DeepSeek | Doubao-Seed-2.0 | DeepSeek-V3.2/GLM-5/Kimi-K2 | Kimi K2.5 |
| **IM 集成** | 企微/QQ/钉钉/飞书 | 钉钉/飞书 | 钉钉/飞书 | 飞书/企微 | 飞书/QQ/微信/钉钉 | — |
| **特色** | QQ 深度集成 | 最低价 + 海外节点 | 7 个官方千帆技能 | 双模（ECS + ArkClaw） | ¥20 Token 代金券 | ¥399 人工远程部署 |
| **适合谁** | QQ 机器人用户 | 预算敏感/需海外 | 百度模型生态 | 飞书用户 | 新手/多 IM | 完全不想动手 |

### 6.2 各云厂商详解

<details>
<summary>腾讯云</summary>

腾讯云轻量应用服务器提供 OpenClaw 预装镜像，与 QQ 开放平台深度集成。

**部署流程：**
1. 购买轻量应用服务器 → 选择 OpenClaw 应用镜像
2. 等待 1-2 分钟初始化
3. 浏览器访问服务器 IP，进入配置界面
4. 填入模型 API Key（支持混元、GLM、Kimi、MiniMax 等）
5. 如需接入 QQ：在 QQ 开放平台创建机器人，填入 AppID/AppSecret

**费用：** ~¥99/年起（2核2G）；Coding Plan ¥40（含多模型接入）

**技能加速：** 腾讯同期推出 [SkillHub](https://skillhub.tencent.com)，作为 ClawHub 的国内镜像，提供 13,000+ 技能的中文搜索与 CDN 加速下载，并精选 Top 50 经安全审计的技能。安装方式：`curl -fsSL https://skillhub-1251783334.cos.ap-guangzhou.myqcloud.com/install/install.sh | sh`，之后用 `skillhub install <技能名>` 即可。

**链接：** [腾讯云 OpenClaw](https://cloud.tencent.com/act/pro/openclaw) | [国际版](https://www.tencentcloud.com/act/pro/intl-openclaw) | [SkillHub](https://skillhub.tencent.com)

</details>

<details>
<summary>阿里云</summary>

阿里云轻量应用服务器提供 OpenClaw 预装镜像，入门价最低，地域选择最丰富。

**优势：**
- **¥9.9/月** 起步（限时促销），全场最低
- 国内节点 + 中国香港、美国等海外节点（适合访问 OpenAI/Google 等海外服务）
- 百炼（Bailian）平台集成，默认 Qwen3.5-plus 模型
- Coding Plan Lite ¥10/月（18,000 次请求/月），新用户有免费试用
- [AgentBay](https://agentbay.space) 第三方托管平台，无需自建服务器

**费用：** ¥9.9/月（促销）/ ¥68/年（标准 2核2G）

**链接：** [阿里云 OpenClaw ¥9.9](https://www.aliyun.com/benefit/scene/moltbot) | [部署指南](https://help.aliyun.com/zh/simple-application-server/use-cases/quickly-deploy-and-use-openclaw)

</details>

<details>
<summary>百度智能云</summary>

百度智能云提供 OpenClaw 部署方案，与千帆平台深度整合，贡献了 7 个官方技能到 ClawHub。

**优势：**
- 零成本一键体验（限时限量，500 台/天，先到先得）
- 千帆平台 7 个官方技能：搜索、百科、学术检索、内容生成、深度研究 Agent
- 支持文心、Qwen、DeepSeek 等国产模型

**注意：** 方案较新（2026 年 2 月推出），功能和文档可能还在完善中。

**链接：** [百度智能云 OpenClaw](https://cloud.baidu.com/product/BCC/moltbot.html) | [千帆一键体验](https://cloud.baidu.com/doc/qianfan/s/tmlhtdwyj)

</details>

<details>
<summary>火山引擎</summary>

火山引擎（字节跳动）提供**双模方案**：ECS 自建部署 + ArkClaw 全托管 SaaS。

**ECS 部署：** 购买 ECS 实例 → SSH 登录 → 手动安装 OpenClaw。无一键部署镜像，适合有运维经验的用户。

**ArkClaw 全托管：** 见[第 5 节 ArkClaw 详情](#_5-2-各托管服务详解)。

**Coding Plan 一览：**
- Lite：¥9.9/首月（含 7 天 ArkClaw 试用）
- Pro：永久含 ArkClaw，支持 Doubao-Seed-2.0、Kimi-K2.5、GLM-4.7、DeepSeek-V3.2

**链接：** [火山引擎 OpenClaw 文档](https://www.volcengine.com/docs/6396/2189942) | [Coding Plan](https://www.volcengine.com/activity/codingplan)

</details>

<details>
<summary>华为云</summary>

华为云 Flexus L 实例提供 OpenClaw 预装镜像，活动期 2026 年 3 月 11 日 – 4 月 15 日。

**优势：**
- ¥9.9/首月（所有用户）或 ¥68/首年（新客）
- 部署完成即赠 **¥20 Token 代金券**（30 天有效），适用 DeepSeek-V3.2、GLM-5、Kimi-K2
- 支持飞书/QQ/微信/钉钉四大 IM
- 3 步部署：购买 → 配置模型 → 接入 IM

**链接：** [华为云 OpenClaw 活动页](https://activity.huaweicloud.com/openclaw.html)

</details>

<details>
<summary>京东云</summary>

京东云提供两种方案：轻量服务器镜像部署 + **¥399 人工远程部署服务**。

**轻量服务器：** ¥9.9 起，预装 OpenClaw 镜像。

**人工远程部署（¥399）：**
- 通过「京东 3C 数码服务自营旗舰店」购买
- 工程师一对一远程部署（30 天内完成）
- 联合联想百应推出，预装百应 AI 技能
- 默认 Kimi K2.5 模型
- 要求 Windows 11 23H2+、8GB RAM、20GB SSD

> **唯一提供人工部署服务的方案**，适合完全不想动手的用户。

**链接：** [京东云 OpenClaw 报道](https://www.ithome.com/0/927/614.htm)

</details>

---

## 7. 开源自建方案

以下方案面向想要完全掌控的技术用户。如果你是新手，建议先从[桌面客户端](#_4-桌面客户端)或[托管服务](#_5-托管服务)入门。

### 7.1 全功能框架

| | OpenClaw | IronClaw |
|---|---|---|
| **语言** | TypeScript (Node.js) | Rust |
| **官网** | [github.com/openclaw/openclaw](https://github.com/openclaw/openclaw) | [ironclaw.com](https://www.ironclaw.com/) / [GitHub](https://github.com/nearai/ironclaw) |
| **定位** | 全功能 Agent 执行引擎（本教程主线） | 安全优先重写版 |
| **安全隔离** | Docker 沙盒 | WASM 沙盒 + 凭证保护 + 提示词注入防御 |
| **数据存储** | SQLite | PostgreSQL 15+ + pgvector |
| **记忆系统** | 文件级 (Markdown) | 混合全文 + 向量检索 |
| **遥测** | 可选 | 零遥测，完全可审计 |
| **技能生态** | ClawHub 16,000+ | 兼容 OpenClaw + 动态工具构建 |
| **IM 支持** | 15+ 渠道 | 兼容 OpenClaw 渠道 |
| **MCP 支持** | ✅ | ✅ |
| **前置条件** | Node.js >= 22 | Rust 1.85+ / PostgreSQL 15+ |
| **适合谁** | 想深入学习的技术用户 | 安全敏感场景（企业内网/敏感数据） |

<details>
<summary>IronClaw 安装步骤</summary>

前置条件：PostgreSQL 15+（需启用 pgvector 扩展）。

::: code-group

```bash [macOS]
brew install ironclaw
```

```bash [Linux / WSL2]
curl --proto '=https' --tlsv1.2 -LsSf https://github.com/nearai/ironclaw/releases/latest/download/ironclaw-installer.sh | sh
```

```powershell [Windows]
# 下载 MSI 安装包或使用 PowerShell 脚本
# 详见 https://github.com/nearai/ironclaw/releases
```

:::

数据库初始化：

```bash
createdb ironclaw
psql -d ironclaw -c 'CREATE EXTENSION IF NOT EXISTS vector;'
```

> IronClaw 适合**对安全性有严格要求**的用户（如企业内网部署、敏感数据处理），代价是安装门槛更高。如果你是新手，建议先从 AutoClaw 或 OpenClaw 开始。

</details>

### 7.2 轻量/极简/专项方案

以下项目各有侧重——极简设计、安全定制、多智能体协作或本地模型支持，适合学习、定制或特定场景。

| 项目 | 语言 | 定位 | GitHub |
|------|------|------|--------|
| **NanoClaw** | TypeScript | 容器沙盒隔离，极简设计，易于理解和扩展 | [qwibitai/nanoclaw](https://github.com/qwibitai/nanoclaw) |
| **ZeroClaw** | Rust | Trait 驱动、零开销架构，全可替换核心，跨环境部署 | [zeroclaw-labs/zeroclaw](https://github.com/zeroclaw-labs/zeroclaw) |
| **TinyClaw** | Shell/TS | 多智能体多团队，链式执行 + 扇出，隔离工作区 | [TinyAGI/tinyclaw](https://github.com/TinyAGI/tinyclaw) |
| **AlphaClaw** | — | 社区衍生方案 | [chrysb/alphaclaw](https://github.com/chrysb/alphaclaw) |
| **CoPaw** | Python | 阿里通义 AgentScope 团队出品，钉钉原生集成，长期记忆（ReMe 框架），支持本地模型 | [agentscope-ai/CoPaw](https://github.com/agentscope-ai/CoPaw) |
| **HiClaw** | Docker | Higress 社区多智能体协作平台，Manager-Worker 架构，人在回路中，内置 Matrix 服务器 | [higress-group/hiclaw](https://github.com/higress-group/hiclaw) |
| **GenericAgent** | Python | 复旦 A3 实验室极简自主 Agent，自组织/自学习/自进化，可自动安装/卸载 OpenClaw 等复杂系统 | [lsdefine/pc-agent-loop](https://github.com/lsdefine/pc-agent-loop) |

<details>
<summary>各轻量方案适用场景</summary>

- **NanoClaw**：想要一个代码量小到能完全读懂的 Agent 框架？NanoClaw 是教科书级别的极简实现，每个组件都清晰分离，非常适合学习和二次开发。
- **ZeroClaw**：追求极致性能和可定制性？ZeroClaw 用 Rust 的 Trait 系统实现完全可替换的组件架构，编译为零运行时开销的原生二进制。
- **TinyClaw**：需要多个 Agent 团队协作？TinyClaw 支持链式执行和扇出模式，每个 Agent 在隔离工作区中运行，适合复杂工作流编排。
- **CoPaw**：阿里通义团队基于 AgentScope 框架打造的开源 Agent 工作台（[官网](https://copaw.bot/) / [GitHub](https://github.com/agentscope-ai/CoPaw)），Apache 2.0 开源。钉钉原生集成，也支持飞书/QQ/Discord/iMessage 等渠道。内置 ReMe（Remember Me, Refine Me）长期记忆框架、Tool Guard 安全层、主动心跳定时任务。支持 Ollama/llama.cpp/MLX 本地模型。适合**钉钉生态用户**和想要国产开源替代方案的开发者。
- **HiClaw**：Higress 社区推出的多智能体协作平台（[官网](https://hiclaw.org/) / [GitHub](https://github.com/higress-group/hiclaw)）。Manager-Worker 架构：一个管理者智能体协调多个工作者并行处理复杂任务，基于 Matrix 开放协议通信，人在回路中（实时观察/介入/纠正）。工作者只使用消费级 Token，真实凭证存储在 Higress AI 网关中。支持 OpenClaw、NanoClaw、ZeroClaw 等多种运行时。前置条件 Docker Desktop（macOS/Windows）或 Docker Engine（Linux）。适合**需要多智能体团队协作**的场景。
- **GenericAgent**：复旦大学 A3 实验室（与深圳夸夸菁领科技合作）研发的极简自主 Agent 框架，追求自组织、自学习、自进化。不依赖预定义工具链，而是通过理解系统环境自主决策——例如它能在极少提示下自动完成 OpenClaw 的安装和彻底卸载（含进程清理、配置残留、依赖回收）。提供[一键安装版](https://github.com/lsdefine/pc-agent-loop/release)，支持 Windows/macOS/Linux。

</details>

### 7.3 开源方案综合对比

| 维度 | OpenClaw | IronClaw | CoPaw | NanoClaw | ZeroClaw | HiClaw | GenericAgent |
|------|----------|----------|-------|----------|----------|--------|-------------|
| **语言** | TypeScript | Rust | Python | TypeScript | Rust | Docker | Python |
| **安装难度** | ★★☆☆☆ | ★★★★☆ | ★★☆☆☆ | ★★☆☆☆ | ★★★☆☆ | ★★☆☆☆ | ★☆☆☆☆ |
| **资源占用** | 中 | 中 | 中 | 低 | 低 | 中 | 低 |
| **安全性** | ★★★☆☆ | ★★★★★ | ★★★☆☆ | ★★★☆☆ | ★★★☆☆ | ★★★★☆ | ★★★☆☆ |
| **技能生态** | ★★★★★ | ★★★★☆ | ★★★☆☆ | ★★☆☆☆ | ★★☆☆☆ | ★★★☆☆ | ★☆☆☆☆ |
| **多 Agent** | 有限 | 有限 | 有限 | 无 | 无 | ★★★★★ | 无 |
| **IM 集成** | ★★★★★ | ★★★★☆ | ★★★★☆ | ★★☆☆☆ | ★★☆☆☆ | ★★★☆☆ | ★☆☆☆☆ |
| **适合场景** | 通用主力 | 安全敏感 | 钉钉生态 | 学习/定制 | 高性能 | 团队协作 | 通用自主Agent |

---

## 8. 移动端与 IoT 方案

### 8.1 移动端

| 产品 | 开发商 | 平台 | 定位 | 状态 |
|------|--------|------|------|------|
| **Xiaomi miclaw** | 小米 | Android（小米 17 系列） | 系统级手机 Agent，覆盖人-车-家全生态 | 🔒 内测 |
| **MaxClaw** | MiniMax | Web（移动端访问） | 云端 Agent，手机浏览器可用 | ✅ 已上线 |
| **droidclaw** | UnitedByAI | Android | OpenClaw 移动端适配，轻量自动化 | [开源](https://github.com/UnitedByAI/droidclaw) |

<details>
<summary>Xiaomi miclaw 详情</summary>

小米 miclaw 是首个**系统级**移动端 OpenClaw 方案（非第三方 App），2026 年 3 月 6 日开启限量内测。

**特色：**
- 基于小米自研 **MiMo** 大模型，针对手机场景优化
- 50+ 手机核心能力和生态服务打包为可调用工具
- 覆盖小米「人-车-家」全生态（手机 + 智能家居 + 汽车）
- 长期记忆系统
- 端云混合私密计算，明确承诺不用用户数据训练模型

**限制：** 仅限小米 17 系列机型，邀请制内测，未公布公开发布时间。

**参考：** [TechNode 报道](https://technode.com/2026/03/06/xiaomi-begins-limited-closed-beta-of-openclaw-like-mobile-ai-agent-xiaomi-miclaw/) | [AIBase 报道](https://news.aibase.com/news/26152)

</details>

### 8.2 嵌入式 / IoT

| 项目 | 语言 | 硬件 | 定位 | GitHub |
|------|------|------|------|--------|
| **PicoClaw** | Go | 旧 Android 手机 / 树莓派 / 低配 VPS | 超低资源 Agent，单二进制部署 | [sipeed/picoclaw](https://github.com/sipeed/picoclaw) |
| **MimiClaw** | C | ESP32-S3 | 无操作系统，USB 供电持续运行 | [memovai/mimiclaw](https://github.com/memovai/mimiclaw) |
| **zclaw** | C | ESP32 | 最小化 AI 助手 | [tnm/zclaw](https://github.com/tnm/zclaw) |
| **NullClaw** | Zig | 通用嵌入式 | 极小二进制，低内存，高可移植 | [nullclaw/nullclaw](https://github.com/nullclaw/nullclaw) |

> 嵌入式方案适合 IoT 爱好者和硬件极客。如果你想在一块 ESP32 开发板上跑 AI 助手，MimiClaw 和 zclaw 可以实现。PicoClaw 则可以让一台闲置的旧 Android 手机变成 24/7 运行的个人 Agent。

---

## 9. 百虾大战：国内大厂全景图

2026 年初，OpenClaw 在国内引发了一场"百虾大战"——15 家头部科技公司迅速跟进，推出各自的类 Claw 产品或部署方案。

| 公司 | 产品/方案 | 类型 | 状态 |
|------|----------|------|------|
| **智谱** | [AutoClaw（澳龙）](https://autoglm.zhipuai.cn/autoclaw)一键安装版 | 桌面客户端 | ✅ 已上线 |
| **字节跳动** | [ArkClaw](https://www.volcengine.com/experience/ark?mode=claw) 全托管 + 飞书适配 + 火山引擎云部署 | 托管 + 云部署 | ✅ 已上线 |
| **腾讯** | [WorkBuddy](https://workbuddy.tencent.com) + [QClaw](https://claw.guanjia.qq.com/) + 企微/QQ 接入 + [腾讯云部署](https://cloud.tencent.com/act/pro/openclaw) + [SkillHub](https://skillhub.tencent.com) 技能镜像 | 本地 + 托管 + 云部署 | ✅ 部分内测 |
| **月之暗面** | [Kimi Claw](https://kimi.com) 托管版 | 托管服务 | ✅ 已上线 |
| **MiniMax** | [MaxClaw](https://maxclaw.ai/) 托管版 + 移动端 | 托管服务 | ✅ 已上线 |
| **网易有道** | [LobsterAI](https://github.com/netease-youdao/LobsterAI) 桌面 Agent（已开源） | 桌面客户端 | ✅ 已上线 |
| **猎豹移动** | [EasyClaw](https://easyclaw.com/) 一键安装 + 出海企业版 | 桌面客户端 | ✅ 已上线 |
| **阿里** | [阿里云一键部署](https://www.aliyun.com/benefit/scene/moltbot) + [CoPaw](https://copaw.bot/)（[GitHub](https://github.com/agentscope-ai/CoPaw)）+ [AgentBay](https://agentbay.space) | 云部署 + 开源桌面 | ✅ 已上线 |
| **百度** | [千帆一键体验](https://cloud.baidu.com/doc/qianfan/s/tmlhtdwyj) + 千帆 Skills | 云部署 | ✅ 已上线 |
| **华为** | [华为云一键部署](https://activity.huaweicloud.com/openclaw.html) + 小艺Claw（HarmonyOS 内置） | 云部署 + 移动端 | ✅ 已上线 / 🔒 小艺Claw 内测 |
| **京东** | 京东云一键部署 + [人工远程服务](https://www.ithome.com/0/927/614.htm) | 云部署 + 服务 | ✅ 已上线 |
| **小米** | Xiaomi miclaw 手机系统层 Agent | 移动端 | 🔒 内测 |
| **美团** | 小美（AI 生活小秘书，App Store 搜索"小美-AI生活小秘书"）+ 联合联想百应远程部署服务 | 移动 App + 远程服务 | ✅ 已上线 |
| **360** | [纳米AI](https://www.n.cn/)（多智能体蜂群架构）+ [SEAF 企业智能体平台](https://sea.n.cn/) | 消费端 + 企业端 | ✅ 已上线 |

> 这场竞争的本质是**入口之争**——谁能成为用户调用 AI 能力的默认界面。从聊天平台（微信/QQ/飞书）到桌面客户端、从云服务到手机系统层，各家都在抢占自己最擅长的位置。
