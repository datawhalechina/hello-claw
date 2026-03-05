---
layout: home

hero:
  name: "🦞 Hello Claw"
  text: "零基础入门 OpenClaw"
  tagline: 领养你的 AI 助理，或从零构建
  actions:
    - theme: brand
      text: 开始使用
      link: /cn/adopt/
    - theme: alt
      text: 深入开发
      link: /cn/build/

features:
  - title: 🦞 领养 Claw（使用篇）
    details: 快速上手 OpenClaw，学会配置、使用和扩展这个 AI 助理
  - title: 🛠️ 构建 Claw（开发篇）
    details: 从零实现一个简化版 AI Agent，深入理解其工作原理
  - title: 📱 移动端接入
    details: 通过 Telegram 和飞书实现随时随地的移动端控制
  - title: ⚡ 自动化任务
    details: 创建定时提醒、自动化报告和周期性工作流
  - title: 🔧 Skills 技能系统
    details: 理解技能概念、安装市场技能和开发自定义技能
  - title: 🤖 多模型支持
    details: 配置多个 LLM 模型、本地 Ollama 部署和 API 费用控制
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

1. **领养 Claw（使用篇）**：快速上手 OpenClaw，学会配置、使用和扩展这个 AI 助理
2. **构建 Claw（开发篇）**：从零实现一个简化版 AI Agent，深入理解其工作原理

**谁适合学习：**

- 想要一个随时待命的 AI 命令行助手的开发者
- 希望通过 Telegram/飞书远程控制 AI 的效率达人
- 对 OpenClaw 的技能系统和自动化能力感兴趣的学习者
- 想要理解并构建自己的 AI Agent 工具的技术爱好者

## 📖 教程目录

### 第一部分：领养 Claw

| 章节 | 简介 | 状态 |
| ---- | ---- | ---- |
| **写在开头** | OpenClaw 是什么、为什么要学习它以及如何使用本教程 | 🚧 |
| **快速上手** | | |
| 第一章 十分钟上手 OpenClaw | 一键安装、首次对话、核心功能体验和基础命令操作 | 🚧 |
| 第二章 理解 OpenClaw | 工作原理、架构设计、与 ChatGPT 的区别和安全注意事项 | 🚧 |
| 第三章 移动端接入 | 通过 Telegram 和飞书实现随时随地的移动端控制 | 🚧 |
| 第四章 自动化任务入门 | 创建定时提醒、自动化报告和周期性工作流 | 🚧 |
| **进阶实战** | | |
| 第五章 Skills 技能系统 | 理解技能概念、安装市场技能和开发自定义技能 | 🚧 |
| 第六章 外部服务集成 | 连接 Gmail、Google Calendar、文件系统和其他第三方服务 | 🚧 |
| 第七章 生产环境部署 | VPS 选择、远程部署、Docker 隔离和 24/7 运行配置 | 🚧 |
| 第八章 多模型与成本优化 | 配置多个 LLM 模型、本地 Ollama 部署和 API 费用控制 | 🚧 |
| **应用场景** | | |
| 第九章 个人助理系统 | 邮件管理、日程安排、信息整理和智能提醒的完整实现 | 🚧 |
| 第十章 内容创作工具链 | 写作辅助、灵感收集、素材管理和自动发布流程 | 🚧 |
| 第十一章 开发者效率提升 | 代码生成、Git 自动化、文档生成和测试辅助 | 🚧 |
| 第十二章 故障排查与优化 | 常见问题解决、性能调优和社区资源利用 | 🚧 |

### 第二部分：构建 Claw

| 章节 | 简介 | 状态 |
| ---- | ---- | ---- |
| **写在开头** | 为什么要从零构建 AI Agent、Nanobot 的 400 行实现和学习路线图 | 🚧 |
| **基础实现** | | |
| 第一章 Hello Agent | 50 行代码连接 LLM API 实现第一次对话 | 🚧 |
| 第二章 工具调用 | 实现 read 工具、解析 Function Calling 并执行 | 🚧 |
| 第三章 Agent Loop | 实现循环直到任务完成的 Agent 主循环 | 🚧 |
| 第四章 Bash 工具 | 添加执行 Shell 命令的能力 | 🚧 |
| **技能系统** | | |
| 第五章 解析 SKILL.md | 实现 YAML frontmatter 和 Markdown 指令解析器 | 🚧 |
| 第六章 技能加载与触发 | 扫描技能目录、环境变量注入和自动激活 | 🚧 |
| 第七章 编写第一个技能 | 从零编写一个天气查询技能 | 🚧 |
| **消息网关** | | |
| 第八章 Telegram Bot | 接入 Telegram 实现移动端控制 | 🚧 |
| 第九章 消息路由 | 设计统一的消息适配器处理多渠道输入 | 🚧 |
| 第十章 飞书集成 | 添加飞书渠道支持企业场景 | 🚧 |
| **记忆与自动化** | | |
| 第十一章 对话历史与 SOUL.md | 实现短期记忆、解析 Agent 身份和行为指令 | 🚧 |
| 第十二章 MEMORY.md 持久化 | 实现长期记忆的读写和自动更新 | 🚧 |
| 第十三章 Cron 调度器 | 实现定时任务的解析、调度和执行 | 🚧 |
| 第十四章 OpenClaw 源码导读 | 克隆 OpenClaw 仓库、理解目录结构、核心模块解析和关键代码走读 | 🚧 |

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

- **[2026-03-04]** 🦞 项目启动，规划"领养 Claw"和"构建 Claw"两大核心模块

> [!WARNING]
> 🧪 Beta公测版本提示：教程主体已完成，正在优化细节，欢迎大家提 Issue 反馈问题或建议。