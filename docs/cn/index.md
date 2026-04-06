---
layout: home

hero:
  name: "<span class='hero-label'>HELLO CLAW</span>"
  text: "<span class='hero-line'>让 OpenClaw</span><span class='hero-line'>真正进入你的 <span class='hero-accent'>工作流</span></span>"
  tagline: 从 5 分钟上手，到龙虾大学里的真实场景，再到源码拆解与定制开发，帮你把一个能用的 AI 助理，变成真正适合自己的工作系统。
  image:
    src: /home-preview.svg
    alt: Hello Claw 首页预览
  actions:
    - theme: brand
      text: 开始上手
      link: /cn/adopt/intro
    - theme: alt
      text: 浏览大学
      link: /cn/university/intro
    - theme: alt
      text: 查看构建篇
      link: /cn/build/
    - theme: alt
      text: GitHub
      link: https://github.com/datawhalechina/hello-claw

features:
  - title: 从零上手
    details: 11 章 + 7 附录，覆盖安装、核心配置、扩展运维、安全与客户端，帮你先把 OpenClaw 跑起来
    link: /cn/adopt/intro
    linkText: 查看使用篇
  - title: 深入构建
    details: 10 章系统拆解 + 1 个实战收束，从源码拆解、架构理解，到 Skill 封装与场景衔接，逐步构建属于你的 Claw
    link: /cn/build/
    linkText: 查看开发篇
  - title: 远程接入
    details: QQ、飞书、Telegram 三路并行，配上选型矩阵与实操指南，让你的龙虾真正随叫随到
    link: /cn/adopt/chapter4
    linkText: 查看接入指南
  - title: 自动化编排
    details: 支持 cron、at、every 三种调度方式，定时提醒、自动报告、周期性任务都能落地
    link: /cn/adopt/chapter7
    linkText: 查看自动化
  - title: 场景实战
    details: 龙虾大学按真实问题设计案例，建议先选最常用的 5 到 10 个技能，快速补齐战斗力
    link: /cn/university/intro
    linkText: 进入龙虾大学
  - title: 模型与成本优化
    details: 覆盖多服务商配置、模型路由、Ollama 本地部署与费用监控，性能和成本一起兼顾
    link: /cn/adopt/chapter5
    linkText: 查看模型方案
---

## 项目简介

本项目是 OpenClaw 的系统学习教程，帮助你从零开始掌握这款强大的命令行 AI 助理系统。无论你是想快速上手使用 OpenClaw 提升工作效率，还是想深入研究其原理并构建属于自己的版本，本教程都提供了清晰的学习路径。

**本项目包含两大核心模块：**

1. **领养 Claw（使用篇）**：11 章 + 7 附录，覆盖安装（1-3 章）+ 核心配置（4-6 章）+ 扩展运维（7-9 章）+ 安全与客户端（10-11 章），按需阅读
2. **构建 Claw（开发篇）**：15 章，从拆解 OpenClaw 源码到分析同类方案再到定制属于你的 Claw

**适合哪些人学习：**

- 零基础用户：想要一个随时待命的 AI 助理，无需编程基础
- 效率达人：想通过 QQ / 飞书 / Telegram 远程操控 AI
- 技术爱好者：对 OpenClaw 的技能系统和自动化能力感兴趣
- 开发者：想深入研究 Agent 架构并构建自己的版本

## 📖 教程内容

### 第一部分：领养 Claw（使用篇，11 章 + 附录 A-G）

| 章节 | 内容简介 | 状态 |
| ---- | ---- | ---- |
| **写在开头** | **OpenClaw 是什么、四步领养法、学习路线图** | ✅ |
| **🔵 安装** | | |
| 第1章：AutoClaw 一键安装 | 下载 AutoClaw 桌面客户端，5 分钟零门槛体验 | ✅ |
| 第2章：OpenClaw 手动安装 | 终端入门、Node.js 安装、npm install、onboard 向导 | ✅ |
| 第3章：初始配置向导 | CLI 向导、macOS 引导设置、自定义 Provider、重新配置 | ✅ |
| **🟢 核心配置** | | |
| 第4章：聊天平台接入 | 支持平台概览、飞书完整接入示例、配对与群聊 | ✅ |
| 第5章：模型管理 | 模型概念、CLI 管理、多服务商配置、API Key 轮换、故障转移 | ✅ |
| 第6章：智能体管理 | 多智能体管理、工作区、心跳、绑定规则 | ✅ |
| **🟡 扩展运维** | | |
| 第7章：工具与定时任务 | 工具层级、定时任务（cron/at/every）、网络搜索 | ✅ |
| 第8章：网关运维 | 启动管理、热重载、鉴权安全、密钥管理、沙箱策略、日志监控 | ✅ |
| 第9章：远程访问与网络 | SSH 隧道、Tailscale 组网、部署架构、安全最佳实践 | ✅ |
| **🔴 安全与客户端** | | |
| 第10章：安全防护与威胁模型 | 威胁图谱、VM 隔离、信任边界、MITRE ATLAS、供应链安全 | ✅ |
| 第11章：Web 界面与客户端 | Dashboard、WebChat、Control UI、TUI、第三方客户端 | ✅ |
| **附录** | | |
| 附录 A：学习资源汇总 | 8 大类学习资源，80+ 链接，编者推荐 | ✅ |
| 附录 B：社区之声与生态展望 | 6 大议题深度解析 + 金句精选 | ✅ |
| 附录 C：类 Claw 方案对比与选型 | 桌面客户端 / 托管服务 / 云服务商 / 自建 / 移动端，5 大类 | ✅ |
| 附录 D：技能开发与发布指南 | SKILL.md 格式 + skill-creator + ClawHub 发布工作流 | ✅ |
| 附录 E：模型提供商选型指南 | 聚合网关 / 国内 / 国际 / 本地，4 大类 | ✅ |
| 附录 F：命令速查表 | 安装、配置、日志、定时、通道等所有 CLI 命令参考 | ✅ |
| 附录 G：配置文件详解 | openclaw.json 逐参数解读 | ✅ |

### 第二部分：构建 Claw（开发篇，10章 + 1 实战章）

| 章节 | 内容简介 | 状态 |
| ---- | ---- | ---- |
| **写在开头** | **为什么从零构建你的 Claw、OpenClaw 的复杂度挑战与学习路线图** | ✅ |
| **🔵 第一层：OpenClaw 内部拆解**（第1-7章） | | |
| 第1章：架构设计哲学 | Agent Runtime 与 Chatbot 的区别、四原语工具设计哲学 | ✅ |
| 第2章：架构全览 | Gateway、Bus、Agent、Provider——四大核心模块与消息流转 | ✅ |
| 第3章：提示词系统 | 7 个 Markdown 文件提示词架构、热重载机制、Token 优化 | ✅ |
| 第4章：工具系统 | 四原语工具深入解析、工具注册、工具描述对 LLM 精准度的影响、技能体系 | ✅ |
| 第5章：消息循环与事件驱动 | ReAct 循环执行流程、LLM 工具选择、心跳与自动化 | ✅ |
| 第6章：统一网关 | 网关架构、多渠道接入与消息标准化 | ✅ |
| 第7章：安全沙箱 | 自由与约束、执行环境隔离与权限控制 | ✅ |
| **🟢 第二层：定制方案**（第8-10章） | | |
| 第8章：轻量化方案 | NanoClaw、Nanobot、ZeroClaw 及其他社区变体 | ✅ |
| 第9章：安全加固方案 | IronClaw 安全架构、沙箱隔离与审计日志 | ✅ |
| 第10章：硬件方案 | PicoClaw 硬件选型、低功耗嵌入式部署 | ✅ |
| **🟡 第三层：从原理到实战** | | |
| 实战章：技能开发 | Skill 文件结构、Frontmatter 格式、异步处理与调试，并衔接“龙虾大学”的场景案例 | ✅ |

## 🦞 应用场景

<table>
  <tbody>
  <tr>
    <td valign="top" width="33%">
      <b>🌅 个人效率</b><br>
      • 早报推送（天气 + 日历 + 待办）<br>
      • 邮件自动分类与摘要<br>
      • 智能日程管理
    </td>
    <td valign="top" width="33%">
      <b>💻 开发辅助</b><br>
      • 代码生成与审查<br>
      • 自动化测试与部署<br>
      • 文档自动生成
    </td>
    <td valign="top" width="33%">
      <b>📢 内容创作</b><br>
      • 社交媒体自动化<br>
      • 写作辅助与润色<br>
      • 多平台发布
    </td>
  </tr>
  <tr>
    <td valign="top" width="33%">
      <b>🏢 商业与销售</b><br>
      • 客户支持与 CRM<br>
      • 销售线索自动跟进<br>
      • 会议调度与纪要
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
      • 教育与培训
    </td>
  </tr>
  </tbody>
</table>

## 🔥 最新更新

- **[2026-03-10]** ✅ 新增龙虾大学：菜单式技能选修指南，给龙虾装备"战斗力加成"
- **[2026-03-10]** ✅ 更新构建篇第7-9章：轻量化、安全加固、硬件方案
- **[2026-03-08]** ✅ 完成第1-11章：领养 Claw 使用篇全部完成
- **[2026-03-04]** 🦞 项目启动，包含"领养 Claw"与"构建 Claw"两大核心模块
