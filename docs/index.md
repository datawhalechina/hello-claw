---
layout: home

hero:
  name: "🦞 Hello Claw"
  text: "零基础入门 OpenClaw"
  tagline: 领养你的 AI 助理，或从零构建
  actions:
    - theme: brand
      text: 开始使用
      link: /cn/adopt/intro
    - theme: alt
      text: 🎓 龙虾大学
      link: /cn/university/
    - theme: alt
      text: 深入开发
      link: /cn/build/
    - theme: alt
      text: GitHub
      link: https://github.com/datawhalechina/hello-claw

features:
  - title: 🦞 领养 Claw（使用篇）
    details: 12 章 + 7 附录，5 层难度梯度，零基础到生产部署，任意层停下来都能用
  - title: 🛠️ 构建 Claw（开发篇）
    details: 15 章 3 层进阶，从拆解 OpenClaw 源码到分析替代方案，再到定制你自己的 Claw
  - title: 📱 QQ / 飞书 / Telegram 接入
    details: 三平台并行路线 + 选型矩阵，随时随地远程控制你的龙虾
  - title: ⚡ 定时任务与自动化
    details: cron / at / every 三种调度方式，创建定时提醒、自动化报告和周期性工作流
  - title: 🎓 龙虾大学
    details: 菜单式挑选 skills，先装最常用的 5~10 个，让龙虾更强且不污染上下文
  - title: 🤖 多模型与成本优化
    details: 多提供商配置、模型路由策略、Ollama 本地部署、成本监控
---

<script setup>
import { VPTeamMembers } from 'vitepress/theme'

const members = [
  {
    avatar: 'https://www.github.com/sanbuphy.png',
    name: '散步',
    title: '项目负责人',
    links: [
      { icon: 'github', link: 'https://github.com/sanbuphy' },
    ]
  }
]
</script>

## 项目简介

本项目是一个面向 OpenClaw 的完整学习教程，帮助你从零开始掌握这个强大的命令行 AI 助理系统。无论你是想快速上手使用 OpenClaw 提升效率，还是想深入理解其原理并构建自己的版本，本教程都能为你提供清晰的学习路径。

**本项目包含两大核心模块：**

1. **领养 Claw（使用篇）**：12 章 + 7 个附录，5 层难度梯度（光速上手 → 手动安装 → 日常使用 → 高级配置 → 高级场景），在任意层停下来都能用
2. **构建 Claw（开发篇）**：15 章，从拆解 OpenClaw 源码到分析替代方案，再到定制你自己的 Claw

**谁适合学习：**

- 零基础用户：想要一个随时待命的 AI 助手，不需要任何编程经验
- 效率达人：希望通过 QQ / 飞书 / Telegram 远程控制 AI
- 技术爱好者：对 OpenClaw 的技能系统和自动化能力感兴趣
- 开发者：想深入理解 Agent 架构并构建自己的版本

## 📖 教程目录

### 第一部分：领养 Claw（使用篇，12 章 + 附录 A-G）

| 章节 | 简介 | 状态 |
| ---- | ---- | ---- |
| **写在开头** | **OpenClaw 是什么、领养四步法、5 层难度路线图** | ✅ |
| **🔵 第一层：光速上手** | | |
| 第 1 章 AutoClaw 一键安装 | 下载 AutoClaw 桌面客户端，5 分钟零门槛体验 | ✅ |
| **🟢 第二层：手动安装** | | |
| 第 2 章 手动安装 OpenClaw | 终端介绍、Node.js 安装、npm install、onboard 配置向导、验证 | ✅ |
| 第 3 章 接入聊天平台 | QQ / 飞书 / Telegram 三平台并行路线 + 选型矩阵 | ✅ |
| **🟡 第三层：日常使用** | | |
| 第 4 章 命令行与基础配置 | onboard 向导详解、Web 面板、CLI 对话、openclaw.json 配置 | ✅ |
| 第 5 章 定时任务 | cron 全部命令、at/every/cron 三种调度、jobs.json | ✅ |
| 第 6 章 技能系统入门 | clawhub CLI 操作、十大推荐技能、基础配置 | ✅ |
| **🟠 第四层：高级配置** | | |
| 第 7 章 多平台与外部服务 | NapCat / QClaw / Google / Notion / SQL / Playwright / Home Assistant | ✅ |
| 第 8 章 多模型与成本优化 | 多提供商配置、模型路由策略、Ollama 本地部署、成本监控 | ✅ |
| 第 9 章 个性化定制 | 9 个工作区文件、记忆系统、自定义技能、MCP | ✅ |
| **🔴 第五层：高级场景** | | |
| 第 10 章 生产环境部署 | systemd / Docker / 安全加固 / ArkClaw 托管 | ✅ |
| 第 11 章 开发者效率提升 | 代码生成、Git 自动化、测试、文档、代码审查 | ✅ |
| 第 12 章 故障排查与维护 | 常见问题速查、日志诊断、性能优化、备份升级 | ✅ |
| **附录** | | |
| 附录 A：命令速查表 | 安装、配置、日志、cron、渠道等全部 CLI 命令参考 | ✅ |
| 附录 B：配置文件详解 | openclaw.json 各项参数说明 | ✅ |
| 附录 C：技能开发模板 | SKILL.md 格式 + tavily-search 实战案例解析 | ✅ |
| 附录 D：学习资源汇总 | 80+ 链接，官方文档、社区、推荐学习路径 | ✅ |
| 附录 E：云服务部署指南 | 4 厂商 × 8 维度对比 + 自建 vs 托管 vs ArkClaw 选型 | ✅ |
| 附录 F：社区之声与生态展望 | 6 大议题深度讨论 + 金句精选 | ✅ |
| 附录 G：安全防护指南 | 威胁模型、自查清单、防护措施、群聊安全 | ✅ |

### 第二部分：构建 Claw（开发篇，15 章）

| 章节 | 简介 | 状态 |
| ---- | ---- | ---- |
| **写在开头** | **为什么要从零构建你的 Claw、OpenClaw 复杂度困境与学习路线图** | ✅ |
| **🔵 第一层：OpenClaw 内部拆解**（第 1～6 章） | | |
| 第 1 章 核心定位与设计理念 | Agent Runtime vs Chatbot 本质区别、四个原语工具设计哲学 | ✅ |
| 第 2 章 整体架构解析 | Gateway、Bus、Agent、Provider 四大模块与消息流转 | ✅ |
| 第 3 章 提示词系统 | 7 个 Markdown 文件构成的提示词架构与热更新机制 | ✅ |
| 第 4 章 工具系统 | 四大原语工具详解、工具注册机制与 Skill 层次结构 | ✅ |
| 第 5 章 消息循环与事件驱动 | ReAct 循环执行流程、LLM 工具选择决策与心跳机制 | ✅ |
| 第 6 章 多渠道接入 | 钉钉/飞书/Telegram/QQ 接入适配、消息格式转换与标准化 | 🚧 |
| **🟢 第二层：已有案例分析**（第 7～10 章） | | |
| 第 7 章 轻量化方案 | NanoClaw 500 行复刻、Nanobot 4000 行实现、ZeroClaw | ✅ |
| 第 8 章 安全加固方案 | IronClaw 安全架构、权限控制、沙箱隔离与审计日志 | ✅ |
| 第 9 章 硬件方案 | PicoClaw 硬件选型、树莓派部署、低功耗优化 | ✅ |
| 第 10 章 案例对比总结 | 多维度对比矩阵、场景选型建议、定制决策树 | 🚧 |
| **🟡 第三层：定制你的 Claw**（第 11～15 章） | | |
| 第 11 章 定制路径概览 | 四级定制难度、适用场景与维护成本、学习路线 | 🚧 |
| 第 12 章 配置文件级定制 | config.json 结构、工具白名单、安全配置 | 🚧 |
| 第 13 章 Skill 编写 | Skill 文件结构、Frontmatter 格式、异步处理与调试 | 🚧 |
| 第 14 章 渠道接入 | 钉钉/飞书接入流程、渠道适配器编写、多渠道配置 | 🚧 |
| 第 15 章 完整定制案例 | 编程助手、个人效率助手、智能客服机器人实战 | 🚧 |

## 🦞 应用场景大全

<table>
  <tbody>
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
  </tbody>
</table>

## 🔥 最新动态

- **[2026-03-10]** ✅ 新增龙虾大学：菜单式 Skills 选修指南，让龙虾装上"战斗外挂"
- **[2026-03-10]** ✅ 更新构建 Claw 第 7-9 章：轻量化方案、安全加固方案、硬件方案
- **[2026-03-08]** ✅ 完成第 1-12 章：领养 Claw 使用篇全部完成
- **[2026-03-04]** 🦞 项目启动，规划"领养 Claw"和"构建 Claw"两大核心模块

> [!WARNING]
> 🧪 Beta 公测版本提示：教程主体已完成，正在优化细节，欢迎大家提 Issue 反馈问题或建议。
