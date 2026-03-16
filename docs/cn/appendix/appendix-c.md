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
| **桌面客户端** | AutoClaw、ClawX、OneClaw、LobsterAI、EasyClaw | 想要 GUI 体验、不想碰终端的用户 | [第 4 节](#_4-桌面客户端) |
| **托管服务** | ArkClaw、Kimi Claw、MaxClaw、WorkBuddy | 只想用、不想管服务器的用户 | [第 5 节](#_5-托管服务) |
| **云厂商部署** | 腾讯云、阿里云、华为云、百度智能云等 | 想要独立服务器但省去安装步骤的用户 | [第 6 节](#_6-云厂商一键部署) |
| **开源自建** | OpenClaw、IronClaw、CoPaw、NanoClaw 等 | 想完全掌控、愿意折腾的技术用户 | [第 7 节](#_7-开源自建方案) |
| **移动端/IoT** | Xiaomi miclaw、MimiClaw、droidclaw | 手机端或嵌入式硬件场景 | [第 8 节](#_8-移动端与-iot-方案) |

> 本教程主线方案为 **OpenClaw 手动安装**（第二章）。如果你是零基础用户，建议从桌面客户端（[第 4 节](#_4-桌面客户端)）开始。

换个角度看——选 AI 就像买车，你得先知道自己是要越野、通勤、还是拉货：

| 阵营 | 定位 | 代表选手 | 适合谁 |
|------|------|---------|--------|
| **第一阵营：本地桌面与一键安装** | 开箱即用，注重隐私 | [LobsterAI](https://lobsterai.youdao.com)（网易有道）、[AutoClaw](https://autoglm.zhipuai.cn/autoclaw)（智谱）、[EasyClaw](https://easyclaw.cn)（猎豹）、[ClawX](https://clawx.com.cn)、[OneClaw](https://oneclaw.cn)、[WorkBuddy](https://workbuddy.tencent.com)（腾讯） | 打工人写日报、做 PPT，装在自己电脑里最踏实 |
| **第二阵营：公有云原生与一键部署** | 高扩展，企业级 | [阿里云](https://www.aliyun.com/benefit/scene/moltbot)、[腾讯云](https://cloud.tencent.com/act/pro/openclaw)、[火山引擎](https://www.volcengine.com/activity/codingplan)、[华为云](https://activity.huaweicloud.com/openclaw.html)、[百度智能云](https://cloud.baidu.com/doc/qianfan/s/tmlhtdwyj)、[京东云](https://www.ithome.com/0/927/614.htm) | 企业大规模应用协同 |
| **第三阵营：云端托管与移动跨端** | 跨平台便捷，免除本地算力烦恼 | [MaxClaw](https://maxclaw.ai/)（MiniMax）、[Kimi Claw](https://kimi.com)（月之暗面）、[ArkClaw](https://www.volcengine.com/experience/ark?mode=claw)（字节） | 只想用、不想管服务器 |
| **第四阵营：专业定制与极客硬件** | 进阶领域与低功耗场景 | [PicoClaw](https://github.com/sipeed/picoclaw)（树莓派）、[IronClaw](https://www.ironclaw.com)（安全重写）、[HiClaw](https://hiclaw.org/)（多智能体）、[MimiClaw](https://github.com/memovai/mimiclaw)（ESP32） | 极客玩家、安全敏感、多智能体协作 |

---

## 2. 快速选型：30 秒找到你的方案

> 别管技术参数了，对准你的场景和需求，闭眼选就完事了！

| 场景 | 推荐方案 | 一句话理由 |
|------|---------|-----------|
| 小白 / 个人轻办公 | [网易有道 LobsterAI](https://lobsterai.youdao.com) 或 [智谱 AutoClaw](https://autoglm.zhipuai.cn/autoclaw) | 开源免费 / 一键直装，基础功能拉满 |
| 零基础，不想绑定智谱 | [ClawX](https://clawx.com.cn) 或 [OneClaw](https://oneclaw.cn) + StepFun 免费模型 | 开源 GUI，自选提供商 |
| 重度文档分析师 | [Kimi Claw](https://kimi.com) | 200 万字长上下文，几十个文档扔进去直接吐核心摘要 |
| 微信生态协同 | [腾讯 QClaw](https://claw.guanjia.qq.com) | 唯一支持微信控制电脑 |
| 钉钉生态协同 | [阿里 CoPaw](https://copaw.bot/)（[GitHub](https://github.com/agentscope-ai/CoPaw)） | 钉钉原生集成，开源免费 |
| 飞书生态协同 | [字节 ArkClaw](https://www.volcengine.com/experience/ark?mode=claw) | 飞书深度集成 + Doubao-Seed-2.0 |
| 做 QQ 机器人 | [腾讯云](#_6-云厂商一键部署) 一键部署 | QQ 开放平台深度集成 |
| 一键安装 / 跨境出海 | [猎豹 EasyClaw](https://easyclaw.cn)（[国际版](https://easyclaw.com)） | 傅盛同款技能包，针对营销/小红书优化，双击安装零配置，兼顾国内与出海 |
| 只想用不想管 | [ArkClaw](https://www.volcengine.com/experience/ark?mode=claw) / [Kimi Claw](https://kimi.com) | 云端全托管，注册即用 |
| 想完全掌控配置 | [OpenClaw](https://github.com/openclaw/openclaw) 手动安装 | 本教程主线方案 |
| 安全敏感 / 企业内网 | [IronClaw](https://www.ironclaw.com)（[GitHub](https://github.com/nearai/ironclaw)） | WASM 沙盒 + 零遥测，Rust 安全重写 |
| 多智能体团队协作 | [HiClaw](https://hiclaw.org/)（[GitHub](https://github.com/higress-group/hiclaw)） | Manager-Worker 架构，人在回路中 |
| 预算为零 | [ClawX](https://clawx.com.cn) 或 [OneClaw](https://oneclaw.cn) + OpenRouter 免费模型 | 开源 GUI + 免费模型 = ¥0 |
| 预算最低（有付费） | [阿里云](#_6-云厂商一键部署) ¥9.9/月起 | 最低入门价，含海外节点 |
| 开发者 / 极客 | [PicoClaw](https://github.com/sipeed/picoclaw) | 10MB 极小体积，低资源占用，硬件友好 |
| 手机端随身 Agent | [MaxClaw](https://maxclaw.ai/) 移动 Web / 小米 miclaw（内测中） | 云端 / 系统级手机 Agent |
| 硬件 / 嵌入式 | [MimiClaw](https://github.com/memovai/mimiclaw) / [PicoClaw](https://github.com/sipeed/picoclaw) | ESP32 / 旧手机即可运行 |

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
> - 💰 **预算最低**：ClawX 或 OneClaw + StepFun 免费模型（零成本）
> - 🔒 **安全优先**：IronClaw 自建（WASM 沙盒 + 零遥测）
> - 🏢 **企业用途**：WorkBuddy（微信生态）/ ArkClaw（飞书生态）
> - 🤖 **多智能体**：HiClaw（Manager-Worker 架构）

---

## 4. 桌面客户端

不想碰终端？以下桌面客户端提供图形化界面，下载即用。

| 产品 | 开发商 | 开源 | 平台 | 内置模型 | 预装技能 | 浏览器操作 | 飞书 | QQ | 沙盒 | MCP | IM 远程 | 出海版 | 难度 | 官网 |
|------|--------|------|------|---------|---------|-----------|------|-----|------|-----|--------|--------|------|------|
| **AutoClaw（澳龙）** | 智谱 | ❌ 闭源 | macOS / Windows | Pony-Alpha-2 + 免费积分 | 50+（含浏览器 Agent） | ✅ AutoGLM | ✅ 扫码一键 | 需配置 | — | — | — | — | ★☆☆☆☆ | [官网](https://autoglm.zhipuai.cn/autoclaw) |
| **ClawX** | ValueCell AI | ✅ MIT | macOS / Windows / Linux | ❌ 需自备 | 通过 ClawHub | ❌ | 需手动配置 | 需配置 | — | — | — | — | ★★☆☆☆ | [GitHub](https://github.com/ValueCell-ai/ClawX) / [官网](https://clawx.com.cn) |
| **OneClaw** | OneClaw 社区 | ✅ 开源 | macOS / Windows / Linux | ❌ 需自备 | 通过 ClawHub | ❌ | 需手动配置 | 需配置 | — | — | — | — | ★★☆☆☆ | [GitHub](https://oneclaw.cn) |
| **LobsterAI（有道龙虾）** | 网易有道 | ✅ MIT | macOS / Windows / Linux | ❌ 需自备 | 16 内置 + 技能商店 5,000+ | ❌ | ✅ 钉钉/飞书 | ✅ 企微/QQ (v0.2.2+) | ✅ Alpine VM | ✅ | ✅ 钉钉/飞书/企微/QQ | — | ★☆☆☆☆ | [官网](https://lobsterai.youdao.com) / [GitHub](https://github.com/netease-youdao/LobsterAI) |
| **EasyClaw（猎豹）** | 猎豹移动 | ❌ 闭源 | macOS / Windows | ❌ 需自备 | 傅盛官方技能包（营销/小红书优化） | ❌ | ✅ 支持 | 需配置 | — | — | ✅ WhatsApp/Telegram/飞书 | ✅ 企业出海专版 | ★☆☆☆☆ | [国内版](https://easyclaw.cn) / [国际版](https://easyclaw.com) |

**怎么选？**

- **AutoClaw**：最适合零基础用户——下载、注册、开聊，全程不用碰终端。内置模型意味着连 API Key 都不需要。缺点是绑定智谱生态，无 Linux 版。
- **ClawX**：最适合想要 GUI 但不想绑定任何生态的用户。开源 + 三平台 + 提供商自选。内置 OpenClaw 运行时，无需另装 Node.js。
- **OneClaw**：与 ClawX 定位相似的开源桌面客户端，同样支持三平台 + 提供商自选。适合偏好轻量开源 GUI 的用户。
- **LobsterAI**：网易有道出品，国内首个 MIT 全开源桌面 Agent。16 项内置技能 + 技能商店 5,000+ + MCP 服务市场 15+，IM 覆盖最广（钉钉/飞书/企微/QQ/Telegram/Discord），Alpine VM 沙盒隔离，数据 100% 本地，无广告。适合想要**开源 + 安全 + 广泛 IM 支持**的用户。
- **EasyClaw**：猎豹移动出品，双击安装零配置。技能包针对营销/小红书场景优化，独家支持通过 WhatsApp/Telegram/飞书远程控制电脑。国内版 + 国际版 + Cloud 三端覆盖，适合**营销运营和跨境出海**。

> 本教程第一章详细介绍了 [AutoClaw 安装流程](/cn/adopt/chapter1/)。ClawX、OneClaw 和 LobsterAI 的安装也在第一章备选方案中提及。

---

## 5. 托管服务

不想管服务器？以下托管服务让你注册即用。

### 5.1 一键对比

| 产品 | 开发商 | 访问方式 | 底层模型 | 技能 | 云存储 | 免费额度 | 月费 | IM 集成 | 特色 | 适合谁 |
|------|--------|---------|---------|------|--------|---------|------|--------|------|--------|
| **ArkClaw** | 字节跳动/火山引擎 | Web 浏览器 | Doubao-Seed-2.0 | OpenClaw 兼容 | 40GB | Coding Plan Pro 含 | ¥9.9/首月起 | 飞书 | 专属 ECS 资源隔离 | 飞书用户/字节生态 |
| **Kimi Claw** | 月之暗面 | Web (kimi.com) | Kimi K2.5 | 5,000+ (ClawHub) | 40GB | ❌ 需 Allegretto 会员 | ~$39/月 | Telegram | BYOC 混合部署 | 国际化用户 |
| **MaxClaw** | MiniMax/稀宇科技 | Web + Telegram/Discord/Slack | MiniMax M2.5 (MoE) | 内置全栈工具包 | — | ✅ 欢迎积分 + 每日积分 | ~$16/月起 | Telegram/Discord/Slack | 多模态（图/视频）内置 | 性价比/多媒体需求 |
| **WorkBuddy / QClaw** | 腾讯 | 本地 + 企微 Web | Hunyuan + 多模型 | 20+ 预置技能包 | — | ✅ 5,000 欢迎积分 | 免费 | 微信/QQ/企微/钉钉/飞书 | 唯一支持微信 | 微信/企业用户 |

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

**链接：** [WorkBuddy 官网](https://workbuddy.tencent.com) | [QClaw](https://claw.guanjia.qq.com)

</details>

---

## 6. 云厂商一键部署

不想用全托管服务，但也不想从零搭建？各大云厂商提供预装 OpenClaw 的服务器镜像，一键购买即可使用。

### 6.1 一键对比

| 云厂商 | 一键部署 | 最低月费 | 推荐配置 | 绑定模型 | IM 集成 | 特色 | 适合谁 |
|--------|---------|---------|---------|---------|--------|------|--------|
| **腾讯云** | ✅ 镜像预装 | ~¥99/年 | 2核4G | 混元/GLM/Kimi/MiniMax | 企微/QQ/钉钉/飞书 | QQ 深度集成 | QQ 机器人用户 |
| **阿里云** | ✅ 镜像预装 | **¥9.9/月** | 2核4G | Qwen3.5-plus | 钉钉/飞书 | 最低价 + 海外节点 | 预算敏感/需海外 |
| **百度智能云** | ✅ 可视化面板 | 限时免费 | 2核4G | 文心/Qwen/DeepSeek | 钉钉/飞书 | 7 个官方千帆技能 | 百度模型生态 |
| **火山引擎** | ✅ ECS + ArkClaw 双模 | ¥9.9/月 | 2核4G | Doubao-Seed-2.0 | 飞书/企微 | 双模（ECS + ArkClaw） | 飞书用户 |
| **华为云** | ✅ 镜像预装 | ¥9.9/月 或 ¥68/年 | 2核2G | DeepSeek-V3.2/GLM-5/Kimi-K2 | 飞书/QQ/微信/钉钉 | ¥20 Token 代金券 | 新手/多 IM |
| **京东云** | ✅ 镜像 + 人工服务 | ¥9.9 起 | — | Kimi K2.5 | — | ¥399 人工远程部署 | 完全不想动手 |

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

| 项目 | 语言 | 官网 | 定位 | 安全隔离 | 数据存储 | 记忆系统 | 遥测 | 技能生态 | IM 支持 | MCP | 前置条件 | 适合谁 |
|------|------|------|------|---------|---------|---------|------|--------|--------|-----|---------|--------|
| **OpenClaw** | TypeScript (Node.js) | [GitHub](https://github.com/openclaw/openclaw) | 全功能 Agent 执行引擎（本教程主线） | Docker 沙盒 | SQLite | 文件级 (Markdown) | 可选 | ClawHub 16,000+ | 15+ 渠道 | ✅ | Node.js >= 22 | 想深入学习的技术用户 |
| **IronClaw** | Rust | [官网](https://www.ironclaw.com) / [GitHub](https://github.com/nearai/ironclaw) | 安全优先重写版 | WASM 沙盒 + 凭证保护 + 提示词注入防御 | PostgreSQL 15+ + pgvector | 混合全文 + 向量检索 | 零遥测，完全可审计 | 兼容 OpenClaw + 动态工具构建 | 兼容 OpenClaw 渠道 | ✅ | Rust 1.85+ / PostgreSQL 15+ | 安全敏感场景（企业内网/敏感数据） |

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
| **AlphaClaw** | TypeScript | OpenClaw 运维管理层：Web 面板 + 网关管理 + 自愈看门狗 + Git 自动备份 | [chrysb/alphaclaw](https://github.com/chrysb/alphaclaw) |
| **CoPaw** | Python | 阿里通义 AgentScope 团队出品，钉钉原生集成，长期记忆（ReMe 框架），支持本地模型 | [agentscope-ai/CoPaw](https://github.com/agentscope-ai/CoPaw) |
| **HiClaw** | Docker | Higress 社区多智能体协作平台，Manager-Worker 架构，人在回路中，内置 Matrix 服务器 | [higress-group/hiclaw](https://github.com/higress-group/hiclaw) |
| **GenericAgent** | Python | 复旦 A3 实验室极简自主 Agent，自组织/自学习/自进化，可自动安装/卸载 OpenClaw 等复杂系统 | [lsdefine/pc-agent-loop](https://github.com/lsdefine/pc-agent-loop) |
| **ClawRouter** | TypeScript | Agent 原生 LLM 智能路由，41+ 模型本地零延迟自动选路，ECO/AUTO/PREMIUM 三档省 92% 成本 | [BlockRunAI/ClawRouter](https://github.com/BlockRunAI/ClawRouter) |

<details>
<summary>各轻量方案适用场景</summary>

- **NanoClaw**：教科书级极简实现，代码量小到能完全读懂，每个组件清晰分离。适合**学习 Agent 原理和二次开发**。
- **ZeroClaw**：Rust Trait 系统实现全可替换组件架构，编译为零运行时开销原生二进制。适合**追求极致性能和可定制性**。
- **TinyClaw**：支持链式执行和扇出模式，每个 Agent 在隔离工作区中运行。适合**复杂多 Agent 工作流编排**。
- **AlphaClaw**：OpenClaw 的运维管理层（[GitHub](https://github.com/chrysb/alphaclaw)），提供密码保护 Web 面板、网关进程管理与自愈看门狗、Git 自动备份（每小时提交）、Webhook 调试工具。无锁定——移除后 Agent 照常运行。适合**服务器部署中需要 Web 运维面板**的用户。
- **CoPaw**：阿里通义 AgentScope 团队出品（[官网](https://copaw.bot/)），Apache 2.0 开源。钉钉原生集成 + 飞书/QQ/Discord 等渠道，内置 ReMe 长期记忆框架，支持 Ollama 本地模型。适合**钉钉生态用户**。
- **HiClaw**：Higress 社区多智能体协作平台（[官网](https://hiclaw.org/)），Manager-Worker 架构，基于 Matrix 协议通信，人在回路中。凭证存储在 AI 网关，支持多种 Agent 运行时。适合**多智能体团队协作**。
- **ClawRouter**：Agent 原生 LLM 智能路由器，本地 <1ms 自动选路，41+ 模型，三档路由策略（ECO/AUTO/PREMIUM）可省 92% 成本。适合**自建部署中优化多模型成本**。
- **GenericAgent**：复旦 A3 实验室极简自主 Agent，自组织/自学习/自进化，不依赖预定义工具链，能自主完成 OpenClaw 安装与卸载。提供[一键安装版](https://github.com/lsdefine/pc-agent-loop/release)。适合**通用自主 Agent 研究**。

</details>

### 7.3 开源方案综合对比

| 项目 | 语言 | 安装难度 | 资源占用 | 安全性 | 技能生态 | 多 Agent | IM 集成 | 适合场景 |
|------|------|---------|---------|--------|---------|---------|--------|---------|
| **OpenClaw** | TypeScript | ★★☆☆☆ | 中 | ★★★☆☆ | ★★★★★ | 有限 | ★★★★★ | 通用主力 |
| **IronClaw** | Rust | ★★★★☆ | 中 | ★★★★★ | ★★★★☆ | 有限 | ★★★★☆ | 安全敏感 |
| **CoPaw** | Python | ★★☆☆☆ | 中 | ★★★☆☆ | ★★★☆☆ | 有限 | ★★★★☆ | 钉钉生态 |
| **NanoClaw** | TypeScript | ★★☆☆☆ | 低 | ★★★☆☆ | ★★☆☆☆ | 无 | ★★☆☆☆ | 学习/定制 |
| **ZeroClaw** | Rust | ★★★☆☆ | 低 | ★★★☆☆ | ★★☆☆☆ | 无 | ★★☆☆☆ | 高性能 |
| **HiClaw** | Docker | ★★☆☆☆ | 中 | ★★★★☆ | ★★★☆☆ | ★★★★★ | ★★★☆☆ | 团队协作 |
| **GenericAgent** | Python | ★☆☆☆☆ | 低 | ★★★☆☆ | ★☆☆☆☆ | 无 | ★☆☆☆☆ | 通用自主Agent |
| **ClawRouter** | TypeScript | ★★☆☆☆ | 低 | ★★★★☆ | — | 无 | — | 多模型路由/降本 |

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
| **腾讯** | [WorkBuddy](https://workbuddy.tencent.com) + [QClaw](https://claw.guanjia.qq.com) + 企微/QQ 接入 + [腾讯云部署](https://cloud.tencent.com/act/pro/openclaw) + [SkillHub](https://skillhub.tencent.com) 技能镜像 | 本地 + 托管 + 云部署 | ✅ 部分内测 |
| **月之暗面** | [Kimi Claw](https://kimi.com) 托管版 | 托管服务 | ✅ 已上线 |
| **MiniMax** | [MaxClaw](https://maxclaw.ai/) 托管版 + 移动端 | 托管服务 | ✅ 已上线 |
| **网易有道** | [LobsterAI（有道龙虾）](https://lobsterai.youdao.com) MIT 全开源桌面 Agent + 技能商店 + MCP 市场（[GitHub](https://github.com/netease-youdao/LobsterAI)） | 桌面客户端 | ✅ 已上线 |
| **猎豹移动** | [EasyClaw](https://easyclaw.cn)（[国际版](https://easyclaw.com)）一键安装 + EasyClaw Cloud | 桌面客户端 | ✅ 已上线 |
| **阿里** | [阿里云一键部署](https://www.aliyun.com/benefit/scene/moltbot) + [CoPaw](https://copaw.bot/)（[GitHub](https://github.com/agentscope-ai/CoPaw)）+ [AgentBay](https://agentbay.space) | 云部署 + 开源桌面 | ✅ 已上线 |
| **百度** | [千帆一键体验](https://cloud.baidu.com/doc/qianfan/s/tmlhtdwyj) + 千帆 Skills | 云部署 | ✅ 已上线 |
| **华为** | [华为云一键部署](https://activity.huaweicloud.com/openclaw.html) + 小艺Claw（HarmonyOS 内置） | 云部署 + 移动端 | ✅ 已上线 / 🔒 小艺Claw 内测 |
| **京东** | 京东云一键部署 + [人工远程服务](https://www.ithome.com/0/927/614.htm) | 云部署 + 服务 | ✅ 已上线 |
| **小米** | Xiaomi miclaw 手机系统层 Agent | 移动端 | 🔒 内测 |
| **美团** | 小美（AI 生活小秘书，App Store 搜索"小美-AI生活小秘书"）+ 联合联想百应远程部署服务 | 移动 App + 远程服务 | ✅ 已上线 |
| **360** | [纳米AI](https://www.n.cn/)（多智能体蜂群架构）+ [SEAF 企业智能体平台](https://sea.n.cn/) | 消费端 + 企业端 | ✅ 已上线 |

> 这场竞争的本质是**入口之争**——谁能成为用户调用 AI 能力的默认界面。从聊天平台（微信/QQ/飞书）到桌面客户端、从云服务到手机系统层，各家都在抢占自己最擅长的位置。
