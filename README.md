<div align="center">

<img src="asset/logo.png" alt="Hello Claw Logo" width="400">

<p align="center"><em>一个不起眼的仓库里，龙虾诞生了。<br>选一只，送它上学堂；或动手写一只不被定义的龙虾。<br>它的梦想，从第一天起就很大。</em></p>

# 哈喽！龙虾 👋 零基础领养、成长你的第一只龙虾

<p align="center"><em>Hello Claw：领养你的 AI 龙虾助理，从零构建属于你的智能助理，智能公司</em></p>

<p align="center">
  📌 <a href="https://datawhalechina.github.io/hello-claw/">在线阅读</a> | 💬 <a href="#交流群">加入交流群</a> | 🚀 <a href="https://github.com/datawhalechina/easy-vibe">还想学 vibecoding</a>
</p>

<p align="center">
    <a href="https://github.com/datawhalechina/hello-claw/stargazers" target="_blank">
        <img src="https://img.shields.io/github/stars/datawhalechina/hello-claw?color=660874&style=for-the-badge&logo=star&logoColor=white&labelColor=1a1a2e" alt="Stars"></a>
    <a href="https://github.com/datawhalechina/hello-claw/network/members" target="_blank">
        <img src="https://img.shields.io/github/forks/datawhalechina/hello-claw?color=660874&style=for-the-badge&logo=git-fork&logoColor=white&labelColor=1a1a2e" alt="Forks"></a>
    <a href="LICENSE" target="_blank">
        <img src="https://img.shields.io/badge/License-CC_BY_NC_SA_4.0-4ecdc4?style=for-the-badge&logo=creative-commons&logoColor=white&labelColor=1a1a2e" alt="License"></a>
</p>

<p align="center">
  <a href="README.md"><img alt="简体中文" src="https://img.shields.io/badge/简体中文-d9d9d9"></a>
  <a href="README_EN.md"><img alt="English" src="https://img.shields.io/badge/English-d9d9d9"></a>
</p>

</div>

> [!WARNING]
> 🧪 Beta公测版本提示：教程主体已完成，正在优化细节，欢迎大家提Issue反馈问题或建议。

## 项目简介

本项目是一个面向 OpenClaw 的完整学习教程，帮助你从零开始掌握这个强大的命令行 AI 助理系统。无论你是想快速上手使用 OpenClaw 提升效率，还是想深入理解其原理并构建自己的版本，本教程都能为你提供清晰的学习路径。

**本项目包含两大核心模块：**

1. **领养 Claw（使用篇）**：11 章 + 7 个附录，安装（Ch1-3）+ 核心配置（Ch4-6）+ 扩展运维（Ch7-9）+ 安全与客户端（Ch10-11），按需选读
2. **构建 Claw（开发篇）**：10 章，从拆解 OpenClaw 源码到分析替代方案，深入理解 Agent 架构

**谁适合学习：**

- 零基础用户：想要一个随时待命的 AI 助手，不需要任何编程经验
- 效率达人：希望通过 QQ / 飞书 / Telegram 远程控制 AI
- 技术爱好者：对 OpenClaw 的技能系统和自动化能力感兴趣
- 开发者：想深入理解 Agent 架构并构建自己的版本

**学习建议：**

- 零基础用户：从第一部分"领养 Claw"第 1 章开始，安装后按需选读核心配置、扩展运维等章节
- 开发者：可直接进入第二部分"构建 Claw"，拆解底层实现原理

## 🔥 最新动态

- **[2026-03-12]** ✅ 完成构建 Claw 第1-10章：核心架构解析（提示词系统、工具系统、消息循环、多渠道接入）、替代方案探索（轻量化、安全加固、硬件方案）、站在山巅回望总结
- **[2026-03-10]** ✅ 新增龙虾大学：菜单式 Skills 选修指南，让龙虾装上"战斗外挂"
- **[2026-03-08]** ✅ 完成领养 Claw 第1-11章：安装（AutoClaw + 手动安装 + 配置向导）、核心配置（聊天平台、模型、智能体）、扩展运维（工具与定时任务、网关、远程访问）、安全与客户端（安全防护、Web 界面）
- **[2026-03-04]** 🦞 项目启动，规划"领养 Claw"和"构建 Claw"两大核心模块

## 在线阅读

https://datawhalechina.github.io/hello-claw

## 📖 目录

### 第一部分：领养 Claw（使用篇，11 章 + 附录 A-G）

| 章节 | 简介 | 状态 |
| ---- | ---- | ---- |
| **写在开头** | **OpenClaw 是什么、领养四步法、学习路线图** | ✅ |
| **🔵 安装** | | |
| 第 1 章 AutoClaw 一键安装 | 下载 AutoClaw 桌面客户端，5 分钟零门槛体验 | ✅ |
| 第 2 章 OpenClaw 手动安装 | 终端介绍、Node.js 安装、npm install、onboard 配置向导 | ✅ |
| 第 3 章 初始配置向导 | CLI 向导、macOS 引导、Custom Provider、重新配置 | ✅ |
| **🟢 核心配置** | | |
| 第 4 章 聊天平台接入 | 支持平台总览、以飞书为例完整接入、配对与群聊 | ✅ |
| 第 5 章 模型管理 | 模型概念、CLI 管理、多提供商配置、API Key 轮换、故障转移 | ✅ |
| 第 6 章 智能体管理 | 多 Agent 管理、工作区、心跳、绑定规则 | ✅ |
| **🟡 扩展运维** | | |
| 第 7 章 工具与定时任务 | 工具集级别、定时任务（cron/at/every）、Web 搜索 | ✅ |
| 第 8 章 网关运维 | 启动管理、热更新、认证安全、密钥管理、沙箱策略、日志监控 | ✅ |
| 第 9 章 远程访问与网络 | SSH 隧道、Tailscale 组网、部署架构、安全最佳实践 | ✅ |
| **🔴 安全与客户端** | | |
| 第 10 章 安全防护与威胁模型 | 威胁全景、VM 隔离、信任边界、MITRE ATLAS、供应链安全 | ✅ |
| 第 11 章 Web 界面与客户端 | Dashboard、WebChat、Control UI、TUI、第三方客户端 | ✅ |
| **附录** | | |
| 附录 A：学习资源汇总 | 8 大类学习资源，80+ 链接，编者精选 | ✅ |
| 附录 B：社区之声与生态展望 | 6 大议题深度讨论 + 金句精选 | ✅ |
| 附录 C：类 Claw 方案对比与选型 | 桌面客户端 / 托管服务 / 云厂商 / 开源自建 / 移动端 5 大类 | ✅ |
| 附录 D：技能开发与发布指南 | SKILL.md 格式 + skill-creator + ClawHub 发布流程 | ✅ |
| 附录 E：模型提供商选型指南 | 聚合网关 / 国内 / 国际 / 本地 4 大类系统对比 | ✅ |
| 附录 F：命令速查表 | 安装、配置、日志、cron、渠道等全部 CLI 命令参考 | ✅ |
| 附录 G：配置文件详解 | openclaw.json 各项参数逐项解读 | ✅ |

---

### 第二部分：构建 Claw（开发篇，10 章）

| 章节 | 简介 | 状态 |
| ---- | ---- | ---- |
| **写在开头** | **为什么要从零构建你的 Claw、OpenClaw 复杂度困境与学习路线图** | ✅ |
| **🔵 第一层：OpenClaw 内部拆解**（第 1～6 章） | | |
| 第 1 章 架构设计哲学 | AI Agent 架构演化、OpenClaw 六大架构创新 | ✅ |
| 第 2 章 ReAct 循环 | Agent 的"思考-行动"引擎、循环执行流程 | ✅ |
| 第 3 章 提示词系统 | 提示词架构与热更新机制、持久人格设计 | ✅ |
| 第 4 章 工具系统 | 四大原语工具详解、工具注册与组合能力 | ✅ |
| 第 5 章 消息循环与事件驱动 | 泳道模型、心跳机制、并发安全与时间主动性 | ✅ |
| 第 6 章 统一网关 | Gateway 架构、多渠道接入与消息标准化 | ✅ |
| 第 7 章 安全沙箱 | 自由与约束的平衡、执行环境隔离与权限控制 | ✅ |
| **🟢 第二层：安全与优化**（第 8～10 章） | | |
| 第 8 章 轻量化方案 | NanoClaw、Nanobot、ZeroClaw 等社区变体 | ✅ |
| 第 9 章 安全加固方案 | IronClaw 安全架构、沙箱隔离与审计日志 | ✅ |
| 第 10 章 硬件方案 | PicoClaw 硬件选型、低功耗嵌入式部署 | ✅ |

---

> 🎉 **欢迎大家来贡献案例！**
>
> 如果你有独特的 OpenClaw 使用场景或实践经验，欢迎通过以下方式分享：
> - 提交 PR 添加你的案例到本章节
> - 提 Issue 描述你的使用场景
> - 加入社区讨论，与其他开发者交流
>
> 每一份贡献都能帮助更多人发现 OpenClaw 的可能性！

## 🦞 应用场景大全（持续更新）

<table align="center">
  <tr>
    <td valign="top" width="33%">
      <b>🌅 个人效率</b><br>
      • 早间简报（天气+日程+待办）<br>
      • 邮件自动分类与摘要<br>
      • 智能日程管理
    </td>
    <td valign="top" width="33%">
      <b>💻 编程开发</b><br>
      • 代码生成与审查<br>
      • 自动化测试与部署<br>
      • 文档自动生成
    </td>
    <td valign="top" width="33%">
      <b>📢 内容创作</b><br>
      • 社交媒体自动运营<br>
      • 写作辅助与润色<br>
      • 多平台内容发布
    </td>
  </tr>
  <tr>
    <td valign="top" width="33%">
      <b>🏢 商务销售</b><br>
      • 客户支持与CRM管理<br>
      • 销售线索自动跟进<br>
      • 会议预约与纪要
    </td>
    <td valign="top" width="33%">
      <b>🤖 多智能体协作</b><br>
      • 智能体团队项目管理<br>
      • 自动化工作流编排<br>
      • 知识库共享与检索
    </td>
    <td valign="top" width="33%">
      <b>🔧 更多场景</b><br>
      • 智能家居控制<br>
      • 金融数据分析<br>
      • 教育培训辅助
    </td>
  </tr>
</table>

##  贡献者名单

| 姓名 | 职责 | 简介 |
| :----| :---- | :---- |
| [桂子轩](https://github.com/zixuangui-rgb) | 核心贡献者 | - |
| [赵志民](https://github.com/zhimin-z) | 核心贡献者 | - |
| [李秀奇](https://github.com/li-xiu-qi) | 核心贡献者 | - |
| [散步](https://github.com/sanbuphy) | 核心贡献者 | - |

*欢迎更多贡献者加入*

## 🤝 参与贡献

- 如果你发现了一些问题，可以提 Issue 进行反馈，如果提完没有人回复你可以联系[保姆团队](https://github.com/datawhalechina/DOPMC/blob/main/OP.md)的同学进行反馈跟进
- 如果你想参与贡献本项目，可以提 Pull Request，如果提完没有人回复你可以联系[保姆团队](https://github.com/datawhalechina/DOPMC/blob/main/OP.md)的同学进行反馈跟进
- 如果你对 Datawhale 很感兴趣并想要发起一个新的项目，请按照 [Datawhale 开源项目指南](https://github.com/datawhalechina/DOPMC/blob/main/GUIDE.md)进行操作即可

<a id="交流群"></a>
## 💬 交流群

<div align="center">
<p>欢迎加入 Hello Claw 交流群，与其他开发者一起探讨学习：</p>
<img src="asset/wechat.jpg" width="300" alt="交流群二维码">
</div>

## 📧 关注我们

<div align=center>
<p>扫描下方二维码关注公众号：Datawhale</p>
<img src="https://raw.githubusercontent.com/datawhalechina/pumpkin-book/master/res/qrcode.jpeg" width = "180" height = "180">
</div>

## 📄 LICENSE

<div align="center">
<a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">
  <img
    alt="知识共享许可协议"
    style="border-width:0"
    src="https://img.shields.io/badge/license-CC%20BY--NC--SA%204.0-lightgrey"
  />
</a>
<br />
本作品采用
<a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">
  知识共享署名-非商业性使用-相同方式共享 4.0 国际许可协议
</a>
进行许可。
</div>

---

<div align="center">
  <h3>⭐ 如果这个项目对你有帮助，请给我们一个 Star ❤️</h3>
</div>
