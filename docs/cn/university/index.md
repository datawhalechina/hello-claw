# 技能实战：场景索引与选用原则

本节按场景整理技能组合与部署工作流，目标是用尽可能少的技能跑通可复用的自动化循环。

技能来源有两处：**ClawHub（原版）** 与 **中文 ClawHub（腾讯 SkillHub）**。

[打开 ClawHub（原版）](https://clawhub.ai/) | [打开中文 ClawHub（腾讯 SkillHub）](https://skillhub.tencent.com/#categories)

保持技能数量精简。安装过多技能会占满上下文窗口，导致响应变慢、判断力下降、调试成本上升。
只有一个目标：按场景选用，优先兼顾稳定性与可维护性。

## 1. 首要推荐：先学会用 ClawHub

如果只记一件事，记这个：

1. 前往 [ClawHub（原版）](https://clawhub.ai/) 或 [中文 ClawHub（腾讯 SkillHub）](https://skillhub.tencent.com/#categories)，按分类搜索技能
2. 用 `clawhub install <skill-slug>` 安装
3. 安装后立即用真实任务测试

```bash
clawhub install <skill-slug>
```

ClawHub 是 OpenClaw 技能的"技能码头"：上传、版本管理、搜索、安装均通过它完成。可按需使用原版或中文入口。
如需更系统的分类索引与示例，可直接查阅社区维护的仓库：

- [awesome-openclaw-skills（5000+ 分类技能）](https://github.com/VoltAgent/awesome-openclaw-skills)
- [ClawHub（原版）](https://clawhub.ai/)
- [中文 ClawHub（腾讯 SkillHub）](https://skillhub.tencent.com/#categories)

如果不想全局安装 CLI，也可以使用一次性命令：

```bash
npx clawhub@latest install <skill-slug>
```

也可以在线搜索以下关键词快速入门：

- `clawhub install`
- `clawhub skills`
- `clawhub openclaw`

## 2. 选用原则：让利爪更强的最短路径

- 新手应始终保持 **5–10** 个高频技能处于激活状态
- 优先安装"底盘技能"：搜索、浏览器、代码仓库、知识库、日历/邮件
- 每新增一个技能，先用真实任务跑一遍
- 每周清理低频技能，避免上下文污染

## 3. 技能菜单（按分类排序）

以下是按 `list.md` 分类结构整理的菜单式汇总。
每个分类列出几个易上手、高复用的代表性技能。完整列表请查阅 Awesome 索引或 ClawHub。

| 分类（list.md） | 推荐技能（示例） | 适用场景 |
|---|---|---|
| 编码智能体 & IDE（1222） | `github`、`code-reviewer`、`git-ops` | 日常开发、PR 审查、仓库协作 |
| 浏览器 & 自动化（335） | `agent-browser`、`playwright`、`summarize` | 网页抓取、表单自动化、信息提取 |
| 生产力 & 任务（206） | `todoist`、`notion`、`obsidian` | 任务管理、知识沉淀、个人工作流 |
| 沟通协作（149） | `slack`、`agentmail`、`gog` | 消息推送、邮件处理、团队协调 |
| 搜索 & 研究（350） | `tavily-search`、`hackernews`、`summarize` | 网页搜索、新闻追踪、快速调研 |
| DevOps & 云（409） | `devops`、`aws-infra`、`azure-devops` | 部署、云资源管理、流水线 |
| Web & 前端开发（938） | `agent-browser`、`playwright`、`github` | 前端集成、UI 测试、自动化回归 |
| 日历 & 日程（65） | `caldav-calendar`、`gog`、`todoist` | 排期、冲突检测、提醒 |
| 笔记 & PKM（71） | `obsidian`、`notion`、`summarize` | 笔记归档、知识关联、长期记忆 |
| 安全 & 密码（53） | `skill-vetter`、`1password`、`amai-id` | 技能安全检查、风险预警 |
| PDF & 文档（111） | `summarize`、`add-watermark-to-pdf`、`agentmail` | 文档摘要、报告处理、附件工作流 |
| 智能家居 & IoT（43） | `home-assistant`、`weather`、`gog` | 家庭自动化、生活助手集成 |

## 4. 推荐课程（可直接复制）

### 4.1 新手五件套

```bash
clawhub install skill-vetter
clawhub install tavily-search
clawhub install agent-browser
clawhub install github
clawhub install gog
```

### 4.2 进阶扩展（按需选一两个）

- 内容创作：`x-api`、`linkedin`、`blogburst`
- DevOps 工程：`devops`、`aws-infra`、`azure-devops`
- 个人助理：`weather`、`caldav-calendar`、`agentmail`

## 5. 延伸阅读

- 完整分类索引与大型技能库：
  [awesome-openclaw-skills](https://github.com/VoltAgent/awesome-openclaw-skills)
- 技能发布、版本管理与安装：
  [ClawHub（原版）](https://clawhub.ai/) | [中文 ClawHub（腾讯 SkillHub）](https://skillhub.tencent.com/#categories)
- 本教程工具章节（工具集、定时任务、网页搜索）：
  [第七章：工具与定时任务](/cn/adopt/chapter7/)
- 技能开发与发布工作流：
  [附录 D：技能开发与发布指南](/cn/appendix/appendix-d)
- 技能开发实战（本地健康管理）：
  [技能开发实战：本地健康管理助手](/cn/university/local-health-assistant/)

**一句话毕业要求**：让利爪"好用"的关键不是安装最多的技能，而是安装对的技能。
先从这份菜单挑 5 个，跑通自己的第一个自动化循环，再持续扩充。

## 6. `awesome-openclaw-skills` 示例套装

以下套装从 [awesome-openclaw-skills（5000+ 分类技能）](https://github.com/VoltAgent/awesome-openclaw-skills) 中精选而来，可直接复制使用，按场景整理了第一批候选技能。

### 6.1 开发协作（Coding + PR）

- [`github`](https://clawhub.ai/steipete/github)：查询和操作仓库、issue、PR 与发布版本
- [`code-reviewer`](https://clawhub.ai/skills?nonSuspicious=true&q=code-reviewer)：审查变更并暴露风险
- [`git-ops`](https://clawhub.ai/skills?nonSuspicious=true&q=git-ops)：自动化常见 Git 工作流
- [`summarize`](https://clawhub.ai/skills?nonSuspicious=true&q=summarize)：快速摘要 PR 和文档

示例任务：

```text
帮我审查这个仓库过去 7 天内创建的高优先级 issue，建议修复优先级排序，并生成 PR 审查清单。
```

### 6.2 调研与搜索（Search + Browser）

- [`tavily-search`](https://clawhub.ai/bert-builder/tavily)：搜索网络获取最新信息
- [`hackernews`](https://clawhub.ai/skills?nonSuspicious=true&q=hackernews)：聚合技术新闻
- [`agent-browser`](https://clawhub.ai/thesethrose/agent-browser)：执行浏览器步骤并提取结构化内容
- [`summarize`](https://clawhub.ai/skills?nonSuspicious=true&q=summarize)：压缩长内容并提炼要点

示例任务：

```text
帮我调研近 3 个月关于"OpenClaw 多智能体编排"的文章，整理成对比表，并给出落地建议。
```

### 6.3 个人生产力（Calendar + Email + Tasks）

- [`caldav-calendar`](https://clawhub.ai/asleep123/caldav-calendar)：查询日程并检测冲突
- [`agentmail`](https://clawhub.ai/adboio/agentmail)：邮件收发工作流
- [`todoist`](https://clawhub.ai/skills?nonSuspicious=true&q=todoist)：任务拆解与跟踪
- [`gog`](https://clawhub.ai/skills?nonSuspicious=true&q=gog)：协调 Google 生态的 Gmail、日历和云盘

示例任务：

```text
每天早上 9:00 给我发一份"每日简报"，包含日程冲突、今日前三任务，以及昨晚的重要未读邮件。
```

### 6.4 运维自动化（DevOps + Cloud）

- [`devops`](https://clawhub.ai/tkuehnl/agentic-devops)：脚本化常见运维操作
- [`aws-infra`](https://clawhub.ai/skills?nonSuspicious=true&q=aws-infra)：检查 AWS 资源
- [`azure-devops`](https://clawhub.ai/pals-software/azure-devops)：集成流水线与项目管理
- [`playwright`](https://clawhub.ai/skills?nonSuspicious=true&q=playwright)：Web 控制台回归检查

示例任务：

```text
每周一执行一次生产环境巡检：证书到期、实例健康状态、失败流水线，然后生成修复建议。
```

### 6.5 安全与风控

- [`skill-vetter`](https://clawhub.ai/spclaudehome/skill-vetter)：安装技能前的安全健康检查
- [`1password`](https://clawhub.ai/skills?nonSuspicious=true&q=1password)：凭据存储与检索
- [`amai-id`](https://clawhub.ai/skills?nonSuspicious=true&q=amai-id)：身份与风险验证
- [`summarize`](https://clawhub.ai/skills?nonSuspicious=true&q=summarize)：摘要安全公告与漏洞通知

示例任务：

```text
安装任何新技能前，先进行风险扫描，输出三种结果之一：可安全安装、需人工审核、禁止安装。
```

### 6.6 文档处理（PDF + 知识库）

- [`add-watermark-to-pdf`](https://clawhub.ai/skills?nonSuspicious=true&q=add-watermark-to-pdf)：批量处理 PDF
- [`agentmail`](https://clawhub.ai/adboio/agentmail)：附件路由
- [`obsidian`](https://clawhub.ai/skills?nonSuspicious=true&q=obsidian)：笔记与知识沉淀
- [`notion`](https://clawhub.ai/tyler6204/better-notion)：同步至团队知识库

示例任务：

```text
为本周收到的所有 PDF 报告加水印、生成摘要，并同步至 Notion 和 Obsidian 的"周报资料"文件夹。
```
