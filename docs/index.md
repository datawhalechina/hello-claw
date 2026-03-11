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
      link: /cn/adopt/lobster-university
    - theme: alt
      text: 深入开发
      link: /cn/build/
    - theme: alt
      text: GitHub
      link: https://github.com/datawhalechina/hello-claw

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
  - title: 🎓 龙虾大学
    details: 菜单式挑选 skills，先装最常用的 5~10 个，让龙虾更强且不污染上下文
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
| **附录** | | |
| 附录 A：命令速查表 | 常用命令行工具完整参考 | ✅ |
| 附录 B：配置文件详解 | 配置文件各项参数说明 | ✅ |
| 附录 C：技能开发模板 | 技能开发示例代码和最佳实践 | ✅ |
| 附录 D：学习资源汇总 | 官方文档、社区链接和推荐学习路径 | ✅ |
| 附录 E：云服务部署指南 | 腾讯云、阿里云等云厂商一键部署方案汇总 | ✅ |

### 第二部分：构建 Claw

| 章节 | 简介 | 状态 |
| ---- | ---- | ---- |
| **写在开头** | 为什么要从零构建你的 Claw、OpenClaw 复杂度困境与学习路线图 | 🚧 |
| **第一板块：OpenClaw 内部拆解** | | |
| 第一章 核心定位与设计理念 | Agent Runtime vs Chatbot 本质区别、四个原语工具设计哲学 | 🚧 |
| 第二章 整体架构解析 | Gateway、Bus、Agent、Provider 四大模块与消息流转 | 🚧 |
| 第三章 提示词系统 | 7个 Markdown 文件构成的提示词架构与热更新机制 | 🚧 |
| 第四章 工具系统 | 四大原语工具详解、工具注册机制与 Skill 层次结构 | 🚧 |
| 第五章 消息循环与事件驱动 | ReAct 循环执行流程、LLM 工具选择决策与心跳机制 | 🚧 |
| 第六章 多渠道接入 | 渠道适配器设计、Telegram/Discord/飞书/钉钉接入 | 🚧 |
| **第二板块：已有案例分析** | | |
| 第七章 轻量化方案 | NanoClaw 500行复刻、Nanobot 4000行实现、ZeroClaw | 🚧 |
| 第八章 安全加固方案 | IronClaw 安全架构、权限控制、沙箱隔离与审计日志 | 🚧 |
| 第九章 硬件方案 | PicoClaw 硬件选型、树莓派部署、低功耗优化 | 🚧 |
| 第十章 案例对比总结 | 多维度对比矩阵、场景选型建议、定制决策树 | 🚧 |
| **第三板块：定制你的 Claw** | | |
| 第十一章 定制路径概览 | 四级定制难度、适用场景与维护成本、学习路线 | 🚧 |
| 第十二章 配置文件级定制 | config.json 结构、工具白名单、安全配置 | 🚧 |
| 第十三章 Skill 编写 | Skill 文件结构、Frontmatter 格式、异步处理与调试 | 🚧 |
| 第十四章 渠道接入 | 钉钉/飞书接入流程、渠道适配器编写、多渠道配置 | 🚧 |
| 第十五章 完整定制案例 | 编程助手、个人效率助手、智能客服机器人实战 | 🚧 |

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
