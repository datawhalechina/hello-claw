---
prev:
  text: '第11章 Web 界面与客户端'
  link: '/cn/adopt/chapter11'
next:
  text: '附录 B：社区之声与生态展望'
  link: '/cn/appendix/appendix-b'
---

# 附录 A：学习资源汇总

学习 OpenClaw 最大的挑战不是技术本身，而是信息过载。搜索"OpenClaw 教程"会看到上百篇文章、几十个视频、无数个 GitHub 仓库——有人说"10 分钟上手"，有人说"需要一个月"；有人推荐本地部署，有人建议云端运行。

**这份资源汇总的目的很简单**：帮你在信息海洋中找到最有价值的资源，按照合理的顺序学习，避免走弯路。

> **阅读提示**：资源按用途分为 8 大类。每个类别内按**推荐优先级**排列——排在前面的更适合大多数读者。带 ⭐ 标记的为编者精选。

---

## 一、官方资源

> 官方资源是最权威、最准确、最及时的信息来源。OpenClaw 更新很快，社区教程可能滞后，但官方文档永远是第一手资料。

### 1.1 官方文档与仓库

| 资源 | 地址 | 说明 |
|------|------|------|
| OpenClaw 官方网站 | <https://openclaw.ai> | 产品首页、功能概览、快速入门 |
| OpenClaw 主仓库 | <https://github.com/openclaw/openclaw> | 源码、Issue 跟踪、Release 记录 |
| OpenClaw AI/ML API | <https://aimlapi.com> | API 文档与接口规范 |
| 官方 Skills 仓库 | <https://github.com/openclaw/skills> | OpenClaw 官方维护的技能库 |

### 1.2 技能市场

| 资源 | 地址 | 说明 |
|------|------|------|
| ⭐ ClawHub Skills Registry | <https://clawhub.ai> | 官方 Skills 注册中心，16,000+ 可用技能，支持搜索与发现 |
| 腾讯 SkillHub | <https://skillhub.tencent.com> | ClawHub 国内镜像，中文搜索 + CDN 加速 + 精选 Top 50 安全审计技能 |

### 1.3 官方社区

| 资源 | 地址 | 说明 |
|------|------|------|
| Discord 官方服务器 | <https://discord.gg/openclaw> | 实时技术交流与问题解答 |
| OpenClaw Community | <https://github.com/openclaw/community> | Discord 社区文档与规范 |
| Reddit r/LocalLLaMA | <https://reddit.com/r/LocalLLaMA> | OpenClaw 热门讨论板块 |

---

## 二、中文生态资源

> 中文社区为 OpenClaw 贡献了大量高质量资源，包括汉化版本、深度教程和国内平台适配插件。

### 2.1 中文社区

| 资源 | 地址 | 说明 |
|------|------|------|
| ⭐ OpenClaw 中文社区 | <https://clawd.org.cn> | 国内用户交流、经验分享、问题互助的中文社区门户 |

### 2.2 中文教程与文档

| 资源 | 地址 | 说明 |
|------|------|------|
| ⭐ Hello Claw 教程 | <https://github.com/datawhalechina/hello-claw> | Datawhale 开源教程，从零领养到构建 AI 助手（本教程） |
| ⭐ Awesome OpenClaw 教程 | <https://github.com/xianyu110/awesome-openclaw-tutorial> | 35 万字完整中文教程，70+ 实战案例 |
| OpenClaw 中文文档 | <https://github.com/yeuxuan/openclaw-docs> | 276 篇深度教程与源码剖析 |
| AI 驱动中文文档 | <https://github.com/wszhxz/openclaw-chinese-docs> | AI 自动化翻译维护的完整中文文档 |
| 中文用例大全 | <https://github.com/AlexAnys/awesome-openclaw-usecases-zh> | 40 个真实场景，国内生态适配 |
| 龙虾养成日记 | <https://sanwan.ai> | 傅盛 AI 龙虾"三万"自主运营实录，含技能配置、心跳机制、多 Agent 协作等实战教程 |

### 2.3 中文汉化与发行版

| 资源 | 地址 | 说明 |
|------|------|------|
| ⭐ OpenClaw 汉化发行版 | <https://github.com/1186258278/OpenClawChineseTranslation> | 每小时自动同步官方更新，CLI + Dashboard 全中文 |
| OpenClaw 中文社区版 | <https://github.com/jiulingyun/openclaw-cn> | 深度汉化版本，CLI/Web 全中文界面 |

### 2.4 国内平台适配

| 资源 | 地址 | 说明 |
|------|------|------|
| ⭐ OpenClaw 中国插件 | <https://github.com/BytePioneer-AI/openclaw-china> | 飞书 / 钉钉 / 企业微信等国内平台插件集合 |
| Clawdbot 中文技能库 | <https://github.com/ClawdbotCN/awesome-openclaw-skills-zh> | 汇集数百款实用技能的 AI 工具集市 |

---

## 三、安装与部署

> 根据你的环境和需求，选择最适合的安装方式。桌面客户端适合新手，Docker 适合服务器，云端方案适合零运维。

### 3.1 桌面客户端（一键安装）

| 客户端 | 地址 | 平台 | 特点 |
|--------|------|------|------|
| ⭐ AutoClaw（澳龙） | <https://autoglm.zhipuai.cn/autoclaw> | macOS / Windows | 预装 50+ 技能，内置 Pony-Alpha-2 模型，有免费额度 |
| ClawX | <https://github.com/ValueCell-ai/ClawX> | macOS / Windows / Linux | 开源 Electron 客户端，多平台，需自备 API Key |
| IronClaw | <https://github.com/nearai/ironclaw> | macOS / Linux / Windows | Rust 安全重写版，WASM 沙盒，PostgreSQL 后端 |
| HiClaw | <https://github.com/higress-group/hiclaw> | Docker 环境 | 多智能体协作平台，Manager-Worker 架构 |

> 详见[第一章 AutoClaw 一键安装](/cn/adopt/chapter1/)。

### 3.2 Docker 容器化部署

| 资源 | 地址 | 说明 |
|------|------|------|
| ⭐ Docker 部署指南 | <https://blog.csdn.net/LYX_WIN/article/details/157993447> | GPU / CPU 双路径容器化部署完整教程 |
| Mac Docker 部署 | <https://www.toutiao.com/group/7613726227169395206> | 5 分钟在 Docker 中跑起 OpenClaw |
| OpenClaw KasmVNC | <https://github.com/ddong8/openclaw-kasmvnc> | 浏览器远程桌面一键部署，带完整容器管理 |

### 3.3 云端与一键部署

| 资源 | 地址 | 说明 |
|------|------|------|
| OpenClaw Launch | <https://openclaw.ai/launch> | 30 秒一键云端部署，支持模型切换 |
| HuggingClaw | <https://github.com/democra-ai/HuggingClaw> | HuggingFace Spaces 免费部署，2vCPU + 16GB RAM |
| 1Panel 一键部署 | <https://github.com/1Panel-dev/1Panel> | 国产 VPS 面板，支持 OpenClaw 一键安装 |
| MoltWorker | <https://github.com/cloudflare/moltworker> | Cloudflare 开源的 OpenClaw 部署方案 |
| 阿里云部署 | <https://developer.aliyun.com/article/1713898> | 云服务器部署与 Skill 实操教程 |

> 详见[附录 F：云服务部署指南](/cn/appendix/appendix-f)。

### 3.4 Windows / Linux 安装

| 资源 | 地址 | 说明 |
|------|------|------|
| Windows 安装教程 | <https://www.toutiao.com/group/7614711135060754971> | 保姆级 PowerShell 安装指南 |
| 沙盒模式配置 | <https://www.toutiao.com/group/7607625142893625883> | Docker 容器隔离与文件系统保护 |

> 详见[第二章 OpenClaw 手动安装](/cn/adopt/chapter2/)。

### 3.5 本地大模型集成

| 资源 | 地址 | 说明 |
|------|------|------|
| llama.cpp 部署 | <https://blog.csdn.net/Honmaple/article/details/157693340> | WSL2 环境本地大模型部署教程 |
| Ollama 集成 | <https://www.toutiao.com/group/7602483142699516435> | 国产算力适配与工具链生态 |
| MiniMax + 飞书 | <https://www.toutiao.com/group/7612259016139391503> | 国产模型本地 Agent 部署方案 |

> 详见[第五章 模型管理](/cn/adopt/chapter5/)。

---

## 四、消息平台集成

> OpenClaw 支持 15+ 消息平台。以下资源帮助你快速接入各类 IM。

| 资源 | 地址 | 覆盖平台 |
|------|------|---------|
| ⭐ 飞书集成指南 | <https://www.toutiao.com/group/7614370801759912486> | 飞书官方插件完整指南 |
| 飞书部署教程 | <https://blog.csdn.net/m0_55049655/article/details/158623550> | CSDN 企业级飞书部署完整教程 |
| 微信 / Telegram / Discord | <https://www.toutiao.com/group/7610316711539950132> | 多平台消息通道配置 |
| Slack / Signal / iMessage | <https://www.toutiao.com/group/7614458834022613544> | 企业 IM 集成方案 |

> 详见[第四章 Chat Provider 配置](/cn/adopt/chapter4/)。

---

## 五、技能开发与 Agent 模板

> 技能（Skill）是 OpenClaw 的核心扩展机制。以下资源覆盖从使用现成技能到自主开发的完整路径。

### 5.1 技能推荐与安装

| 资源 | 地址 | 说明 |
|------|------|------|
| ⭐ Awesome OpenClaw Skills | <https://github.com/VoltAgent/awesome-openclaw-skills> | 5,490+ Skills 集合，已过滤 6,940 个垃圾插件 |
| 2026 必装 Skills 推荐 | <https://www.toutiao.com/group/7611601860910236179> | 4 个核心技能安装与配置 |
| 插件安装指南 | <https://www.php.cn/faq/2161325.html> | CLI 扩展功能添加步骤说明 |

### 5.2 技能开发教程

| 资源 | 地址 | 说明 |
|------|------|------|
| ⭐ Skills 配置手把手教程 | <https://www.toutiao.com/group/7612296579612983846> | 专业化工作流与工具集成 |
| 前端开发者技能库搭建 | <https://www.toutiao.com/group/7614486886799426088> | 从入门到进阶实战 |

> 详见[附录 D：技能开发模板](/cn/appendix/appendix-d)。

### 5.3 Agent 模板与快速启动

| 资源 | 地址 | 说明 |
|------|------|------|
| ⭐ Awesome OpenClaw Agents | <https://github.com/mergisi/awesome-openclaw-agents> | 100 个生产就绪 AI Agent 模板，18 个分类 |
| CrewClaw | <https://crewclaw.com> | 60 秒部署任意 Agent，无需 Docker 和终端 |
| Agent Templates | <https://github.com/mergisi/awesome-openclaw-agents/tree/main/agents> | 即拿即用的 SOUL.md 配置文件 |
| Quickstart Guide | <https://github.com/mergisi/awesome-openclaw-agents/tree/main/quickstart> | 5 分钟零配置启动 Agent |

---

## 六、进阶学习

> 理解底层原理，才能在复杂场景中游刃有余。以下资源帮你从"会用"进阶到"精通"。

### 6.1 架构与原理

| 资源 | 地址 | 说明 |
|------|------|------|
| ⭐ 完整架构全解 | <https://www.toutiao.com/group/7610063314768446006> | AI 私人助理工作流程详解 |
| OpenClaw 架构解析 | <https://www.toutiao.com/group/7602243573023425060> | 智能体执行、工具调用、浏览器操作底层逻辑 |
| 意图与对话管理 | <https://www.toutiao.com/group/7610070344208073259> | NLP 识别与槽位填充实战 |
| 分布式 AI 代理 | <https://www.toutiao.com/group/7614498988393333294> | 跨设备联动与多 Agent 协作 |

### 6.2 记忆系统与知识库

| 资源 | 地址 | 说明 |
|------|------|------|
| ⭐ 记忆系统深度拆解 | <https://www.toutiao.com/group/7603715229905666569> | 长期 / 精炼记忆工作原理 |
| 记忆系统架构解析 | <https://www.toutiao.com/group/7606549081040667188> | Markdown 到混合检索实现 |
| Mem0 集成方案 | <https://www.toutiao.com/group/7613455137884946959> | 省 Token 的智能记忆管理 |
| 知识库构建 | <https://www.toutiao.com/group/7612927848772272667> | SOP 与知识库最佳实践 |
| ⭐ Memory LanceDB Pro | <https://github.com/win4r/memory-lancedb-pro> | 增强型长期记忆插件，支持混合检索和跨编码器重排序 |
| Agent Second Brain | <https://github.com/AgentSecondBrain/memU> | 完整的第二大脑系统，语音笔记 → Obsidian + Todoist |
| Obsidian Vault RAG | <https://github.com/Obsidian68/vault-rag> | OpenClaw 连接 Obsidian 知识库，实时 Markdown 索引 |

### 6.3 浏览器自动化

| 资源 | 地址 | 说明 |
|------|------|------|
| ⭐ OpenClaw + Playwright | <https://www.toutiao.com/group/7614706712441487915> | 自然语言驱动浏览器自动化 |
| 浏览器自动化技能 | <https://www.toutiao.com/group/7613585763871080969> | browser-automation 技能使用指南 |
| Agent-Browser | <https://github.com/vercel-labs/agent-browser> | Vercel 开源 AI 代理浏览器工具 |
| MCP Server 集成 | <https://blog.csdn.net/LYX_WIN/article/details/157993447> | Playwright MCP 浏览器自动化 |

<details>
<summary>WSLg 浏览器指纹绕过（仅供研究）</summary>

| 资源 | 地址 | 说明 |
|------|------|------|
| WSLg + 指纹绕过 | <https://www.toutiao.com/group/7605101648096018978> | 动态伪装浏览器指纹反爬 |

> **注意**：浏览器指纹绕过技术存在法律与道德风险，请仅用于合法的安全研究与测试目的。

</details>

### 6.4 自动化工作流

| 资源 | 地址 | 说明 |
|------|------|------|
| ⭐ 自动化工作流实操 | <https://www.toutiao.com/group/7614476588058427946> | 从配置到 3 个核心场景实战 |
| 自动化办公指南 | <https://www.toutiao.com/group/7614155545884328499> | 文件处理与团队协作场景 |
| awesome-usecases 详解 | <https://blog.csdn.net/yangshangwei/article/details/158314655> | 30+ 真实可运行场景 |

### 6.5 安全最佳实践

| 资源 | 地址 | 说明 |
|------|------|------|
| ⭐ AWS 安全与功能增强实践 | <https://aws.amazon.com/cn/blogs/china/openclaw-security-and-feature-enhancement-practices/> | EC2 部署后的安全防护与功能增强工程实践（踩坑记录） |
| 安全加固指南 | <https://github.com/rohitg00/awesome-openclaw> | 权限管理与风险防控 |

> 详见[第十章 安全防护与威胁模型](/cn/adopt/chapter10/)。

### 6.6 评测与基准测试

| 资源 | 地址 | 说明 |
|------|------|------|
| ⭐ PinchBench | <https://pinchbench.com> | 首个专为 OpenClaw 类 Agent 设计的真实任务基准测试，覆盖文件操作、数据处理、Web 搜索、创意输出、工具调用 5 大维度 |
| PinchBench 源码 | <https://github.com/pinchbench/skill> | 开源评测框架，含任务集与自动评分，由 [Kilo.ai](https://kilo.ai) 团队维护 |

> **为什么需要 Agent 专属基准？** 通用模型排行榜（MMLU、HumanEval 等）无法反映模型在真实 Agent 场景中的表现——选择工具、管理文件、多源信息综合、错误恢复等能力，只有端到端评测才能衡量。PinchBench 让模型在与真实 OpenClaw 完全一致的工具和工作区环境中执行任务，结果更具参考价值。

### 6.7 历史版本与演进

| 资源 | 地址 | 说明 |
|------|------|------|
| Clawdbot → Moltbot → OpenClaw | <https://www.toutiao.com/group/7601730056133804571> | 历史版本部署实战汇总 |
| 从新手到中级教程 | <https://www.toutiao.com/group/7613221725324444202> | 沙盒模式与工作空间探索 |

---

## 七、生态工具与客户端

> 除了官方界面，社区开发了丰富的第三方工具，涵盖可视化管理、移动端、可观测性等领域。

### 7.1 可视化管理面板

| 工具 | 地址 | 说明 |
|------|------|------|
| ⭐ ClawPanel | <https://github.com/1186258278/ClawPanel> | OpenClaw 可视化管理面板，内置 AI 助手 |
| Nerve | <https://github.com/Nerve/nerve> | 自托管 Web 驾驶舱，实时流式对话 |

### 7.2 移动端与 Web 客户端

| 工具 | 地址 | 说明 |
|------|------|------|
| ClawApp | <https://github.com/qingchencloud/ClawApp> | 手机端 H5 聊天客户端，支持 PWA |
| MobileClaw | <https://github.com/mobileclaw/mobileclaw> | 移动优先 PWA 客户端 |
| PinchChat | <https://github.com/pinchchat/pinchchat> | 开源 WebChat UI，ChatGPT 风格界面 |

> 详见[第十一章 Web 界面与客户端](/cn/adopt/chapter11/)。

### 7.3 可观测性与监控

| 工具 | 地址 | 说明 |
|------|------|------|
| Manifest | <https://github.com/manifest/manifest> | 实时成本可观测性，28+ 模型支持 |
| Opik OpenClaw | <https://github.com/Anil-matcha/opik-openclaw> | 链路级可观测性追踪 |

---

## 八、综合资源索引

> 以下是涵盖多个领域的综合性资源汇总，适合全面了解 OpenClaw 生态。

| 资源 | 地址 | 说明 |
|------|------|------|
| ⭐ Awesome OpenClaw | <https://github.com/SamurAIGPT/awesome-openclaw> | 最全面的资源汇总，100+ 项目链接 |
| CoClaw 社区资源中心 | <https://coclaw.com> | 社区维护的 OpenClaw 资源枢纽，覆盖指南、排错、配置生成与专题文章（非官方） |
| 用例集合 | <https://github.com/hesamsheikh/awesome-openclaw-usecases> | 社区应用案例，36 个真实场景验证 |
| OpenClaw 生态 TOP6 工具 | <https://www.toutiao.com/group/7613671784054866473> | 部署、托管、监控一站式方案 |

---

## 推荐学习路径

根据你的背景和目标，选择最适合的学习路径：

### 路径一：完全新手（零编程经验）

```
第一步：阅读本教程导言，了解 OpenClaw 是什么
  ↓
第二步：按第一章安装 AutoClaw（一键安装，零配置）
  ↓
第三步：在 AutoClaw 中完成第一次对话
  ↓
第四步：按第四章接入一个聊天平台（推荐飞书）
  ↓
第五步：探索 ClawHub 安装感兴趣的技能
```

### 路径二：想快速部署（有一定技术基础）

```
第一步：按第二章手动安装 OpenClaw
  ↓
第二步：使用 OpenClaw 汉化发行版 或 HuggingClaw 快速跑起来
  ↓
第三步：按第五章配置国内模型提供商
  ↓
第四步：按需阅读场景章节（第三 ~ 十一章）
```

### 路径三：Agent 开发者（想构建自定义 Agent）

```
第一步：研究 Awesome OpenClaw Agents 的 100 个模板
  ↓
第二步：学习附录 D 的技能开发模板
  ↓
第三步：阅读本教程第二部分「构建 Claw」
  ↓
第四步：深入 Memory LanceDB Pro 等记忆增强方案
```

### 路径四：企业部署（生产环境）

```
第一步：阅读第十章安全防护与威胁模型
  ↓
第二步：参考附录 F 选择云服务部署方案
  ↓
第三步：按第八章配置 Gateway 运维与管理
  ↓
第四步：按第九章设置远程访问与网络
  ↓
第五步：部署可观测性工具（Manifest / Opik）
```

---

## 写在最后

学习 OpenClaw 最大的障碍不是技术难度，而是信息过载和缺乏方向。

这份资源汇总的目标，是帮你在茫茫信息海洋中找到最有价值的资源，按照合理的顺序学习，避免走弯路。但请记住：**看再多教程，不如动手做一个真实的项目**。

从最简单的开始：让 OpenClaw 每天早上给你发送天气预报。成功后，再尝试更复杂的场景。每一个小成功，都会让你更接近"AI 助手"的终极目标。

**四条建议**：

- 不要追求完美，先让它跑起来
- 不要孤军奋战，遇到问题就问社区
- 不要只学不用，每学一个功能就用到实际工作中
- 不要害怕出错，OpenClaw 最坏的结果就是重装

祝你学习愉快！
