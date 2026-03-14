# 技能实战：场景清单与选型原则

本栏目收录按场景整理的技能组合与落地流程，目标是用尽量少的技能，跑通可复用的自动化闭环。

技能来自两个入口：**ClawHub 原版** 与 **中文 ClawHub（腾讯 SkillHub）**。

[进入 ClawHub 原版](https://clawhub.ai/) | [进入中文 ClawHub（腾讯 SkillHub）](https://skillhub.tencent.com/#categories)

技能数量不宜过多。装太多会挤占上下文，导致响应变慢、判断变弱、排障成本升高。
目标只有一个：按场景精选，先保证稳定与可维护。

## 1. 第一推荐：先学会用 ClawHub

如果你只记住一个方法，就记这个：

1. 去 [ClawHub 原版](https://clawhub.ai/) 或 [中文 ClawHub（腾讯 SkillHub）](https://skillhub.tencent.com/#categories) 按分类搜技能  
2. 用 `clawhub install <skill-slug>` 安装  
3. 装完立刻做一个真实任务测试  

```bash
clawhub install <skill-slug>
```

ClawHub 是 OpenClaw 技能的“技能码头”：上传、版本化、检索、安装都围绕它。你可以按需使用原版入口或中文入口。  
想看更系统的分类清单与示例，直接看社区整理库：

- [awesome-openclaw-skills（5,000+ 分类技能清单）](https://github.com/VoltAgent/awesome-openclaw-skills)
- [ClawHub 原版](https://clawhub.ai/)
- [中文 ClawHub（腾讯 SkillHub）](https://skillhub.tencent.com/#categories)

如果你不想全局安装 CLI，也可以直接用一次性命令安装：

```bash
npx clawhub@latest install <skill-slug>
```

你也可以直接在网上搜这些关键词快速入门：

- `clawhub install`
- `clawhub skills`
- `clawhub openclaw`

## 2. 选课原则：龙虾变强的最短路径

- 新手建议常驻 **5~10 个**高频技能
- 先装“底盘技能”：搜索、浏览器、代码仓库、知识库、日历/邮件
- 每新增 1 个技能，都要用真实任务跑一遍
- 一周清理一次不常用技能，避免上下文污染

## 3. 技能菜单（按类别点菜）

下面是按 `list.md` 的类别思路整理的“菜单式缩略版”。  
每类先给你几个上手快、复用高的代表技能，详细列表去 Awesome 清单或 ClawHub 看完整版本。

| 类别（list.md） | 推荐缩略 skills（示例） | 适合场景 |
|---|---|---|
| Coding Agents & IDEs（1222） | `github`、`code-reviewer`、`git-ops` | 日常开发、PR 审查、仓库协作 |
| Browser & Automation（335） | `agent-browser`、`playwright`、`summarize` | 网页抓取、表单自动化、信息提炼 |
| Productivity & Tasks（206） | `todoist`、`notion`、`obsidian` | 任务管理、知识沉淀、个人工作流 |
| Communication（149） | `slack`、`agentmail`、`gog` | 消息收发、邮件处理、团队协同 |
| Search & Research（350） | `tavily-search`、`hackernews`、`summarize` | 联网检索、资讯跟踪、快速调研 |
| DevOps & Cloud（409） | `devops`、`aws-infra`、`azure-devops` | 部署运维、云资源管理、流水线 |
| Web & Frontend Development（938） | `agent-browser`、`playwright`、`github` | 前端联调、UI 测试、自动回归 |
| Calendar & Scheduling（65） | `caldav-calendar`、`gog`、`todoist` | 日程安排、冲突检测、提醒 |
| Notes & PKM（71） | `obsidian`、`notion`、`summarize` | 笔记归档、知识链接、长期记忆 |
| Security & Passwords（53） | `skill-vetter`、`1password`、`amai-id` | 技能安全检查、风险预警 |
| PDF & Documents（111） | `summarize`、`add-watermark-to-pdf`、`agentmail` | 文档摘要、报告处理、附件工作流 |
| Smart Home & IoT（43） | `home-assistant`、`weather`、`gog` | 家居自动化、生活助手联动 |

## 4. 建议课表（直接抄作业）

### 4.1 新手 5 件套

```bash
clawhub install skill-vetter
clawhub install tavily-search
clawhub install agent-browser
clawhub install github
clawhub install gog
```

### 4.2 进阶加装（按需二选一或三选一）

- 内容创作：`x-api`、`linkedin`、`blogburst`
- 运维工程：`devops`、`aws-infra`、`azure-devops`
- 个人助理：`weather`、`caldav-calendar`、`agentmail`

## 5. 深入学习入口

- 全量分类与海量技能库：  
  [awesome-openclaw-skills](https://github.com/VoltAgent/awesome-openclaw-skills)
- 技能发布、版本与安装入口：  
  [ClawHub 原版](https://clawhub.ai/) ｜ [中文 ClawHub（腾讯 SkillHub）](https://skillhub.tencent.com/#categories)
- 本教程 Tools 章节（工具集、定时任务、Web 搜索）：
  [第七章 工具与定时任务](/cn/adopt/chapter7/)
- 技能开发与发布流程：
  [附录 D 技能开发与发布指南](/cn/appendix/appendix-d)

**一句话毕业要求**：让龙虾“好用”的关键，不是装最多，而是装最合适。  
从这份菜单里先挑 5 个，跑通你自己的第一个自动化闭环，再继续加课。
