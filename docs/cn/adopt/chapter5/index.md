# 第五章 定时任务：让龙虾自动干活

> **前提**：本章假设你已完成第二章的安装配置。定时任务的通知功能需要配合第三章的消息渠道（飞书/Telegram/QQ），但不是必须的——没有配置渠道时，任务仍会执行，只是结果只能在 Web 控制面板查看。

OpenClaw 的定时任务（Cron）功能让 AI 可以主动工作，而不是被动等待你的指令。你可以让它每天早上发送简报，每小时检查服务器状态，或者每周生成工作总结。这些任务会在 Gateway 中持久化存储，即使重启也不会丢失。

## 1. 什么是 OpenClaw Cron

OpenClaw Cron 不是传统的 Linux cron，而是一个让 AI 按时间表主动执行任务的系统。它运行在 Gateway 中，支持三种调度方式：

- **at**（一次性）：在指定时间执行一次
- **every**（固定间隔）：每隔一段时间执行
- **cron**（表达式）：使用 cron 表达式精确控制（如 `0 8 * * *` 表示每天早上 8 点，格式为"分 时 日 月 周"）

任务可以在主会话中执行，也可以在独立会话中运行（推荐），避免干扰正常对话。

## 2. 创建定时任务

### 2.1 通过对话创建

最简单的方式是直接告诉 OpenClaw：

```
每天早上 8 点给我发送今日简报，包括天气、日程和重要邮件
```

OpenClaw 会自动创建定时任务并保存。你可以用自然语言描述任务，它会理解并配置。

### 2.2 使用命令行

```bash
# 添加定时任务（--name 必填，--channel 指定发送目标）
openclaw cron add --name "每日简报" --cron "30 7 * * *" --message "发送今日简报" --channel "telegram:chat:123456789"

# 添加间隔任务
openclaw cron add --name "健康检查" --every 10m --message "检查服务器状态" --channel "qqbot:c2c:your_openid"

# 添加一次性任务（20 分钟后执行）
openclaw cron add --name "提醒我" --at 20m --message "该休息了" --channel "telegram:chat:123456789"

# 查看所有任务
openclaw cron list

# 编辑任务
openclaw cron edit <jobId>

# 删除任务
openclaw cron rm <jobId>
```

> **为什么需要 `--channel`？** 定时任务是 OpenClaw **主动推送**的——它需要知道把结果发到哪里。这和你在 QQ/Telegram 里跟机器人聊天不同：聊天时机器人知道该回复谁（被动响应），但定时任务没有"发起者"，所以必须用 `--channel` 明确指定发送目标。
>
> **`--channel` 格式**：
> - Telegram 私聊：`telegram:chat:<你的ChatID>`（首次配对时机器人会告诉你 Chat ID，详见[第三章 3.3 配对验证](/cn/adopt/chapter3/#_3-3-配对验证)）
> - QQ 私聊：`qqbot:c2c:<openid>`
> - QQ 群聊：`qqbot:group:<groupid>`
>
> 如果不指定 `--channel`，任务仍会执行，但结果只能在 Web 控制面板（`openclaw dashboard`）中查看，不会推送到任何聊天渠道。

> **其他常用选项**：`--cron` 设置 cron 表达式（如 `"30 7 * * *"` 表示每天 7:30），`--every` 设置间隔（如 `10m`、`1h`），`--at` 设置一次性定时（如 `20m` 或 ISO 时间），`--announce` 将结果发送到聊天。完整选项运行 `openclaw cron add --help` 查看。

## 3. 实战案例

### 3.1 每日简报

```
每天早上 7:30 给我发送今日简报到 Telegram：
1. 北京天气和空气质量
2. 今天的日历事件
3. 未读邮件数量
4. GitHub 上的新通知
```

OpenClaw 会创建一个独立会话的定时任务，每天准时执行。

### 3.2 服务器监控

```
每 10 分钟检查服务器状态，如果 CPU 超过 90% 或内存超过 85% 就发送告警到飞书
```

这比传统监控更灵活，你可以随时调整阈值和告警规则。

### 3.3 周报生成

```
每周五下午 5 点生成本周工作总结：
- 统计 Git 提交次数和代码行数
- 列出完成的 Jira 任务
- 生成 Markdown 格式周报
- 发送到飞书工作群
```

### 3.4 数据备份

```
每天凌晨 2 点备份数据库到 S3，完成后通知我
```

### 3.5 定期清理

```
每周日凌晨 3 点清理 30 天前的日志文件，保留错误日志
```

## 4. 高级配置

> **定时任务的两层配置**：
>
> - **全局设置**在 `openclaw.json` 的 `cron` 字段中，控制是否启用、最大并发数等：
>   ```json
>   {
>     "cron": {
>       "enabled": true,
>       "maxConcurrentRuns": 2
>     }
>   }
>   ```
> - **具体任务**通过 CLI（`openclaw cron add --name "任务名" --cron "表达式" --message "内容"`）或对话创建，由 Gateway 存储在 `~/.openclaw/cron/jobs.json` 中。手动编辑该文件需要先停止 Gateway。
>
> 下面的 JSON 示例展示的是 `jobs.json` 中的任务定义格式，仅供理解参考，**推荐通过对话或 CLI 创建任务**。

<details>
<summary>展开：高级配置（条件执行、任务链、环境变量、错误处理）</summary>

### 4.1 条件执行

<<<<<<< Updated upstream
从计算理论的视角，OpenClaw 的技能系统可以用有限自动机（Finite Automaton）来形式化描述。一个技能的生命周期可表示为一个确定性有限自动机（DFA）五元组：

$$M = (Q, \Sigma, \delta, q_0, F)$$

其中：

- **Q**（状态集）= {Unregistered, Installed, Disabled, Gated, Active, HotReloading, SoftDeleted}，共 7 个状态
- **Σ**（输入字母表）= {install, uninstall, enable, disable, gate, grant, revoke, edit, hot-reload, soft-delete, restore}，共 11 个输入符号
- **δ**（转移函数）：定义状态之间的转换规则（见下方状态图）
- **q₀**（初始状态）= Unregistered
- **F**（接受状态集）= {Active}

状态转移关系如下：

```
Unregistered --install--> Installed --enable--> Active
Active --disable--> Disabled --enable--> Active
Active --gate--> Gated --grant--> Active
Gated --revoke--> Disabled
Active --edit--> HotReloading --hot-reload--> Active
Active --soft-delete--> SoftDeleted --restore--> Installed
Active --uninstall--> Unregistered
Disabled --uninstall--> Unregistered
SoftDeleted --uninstall--> Unregistered
```

其中 **Gated** 状态表示技能需要满足门控条件（如 API Key 配置）才能激活，**HotReloading** 状态用于开发时实时编辑技能而不中断会话。

这个形式化模型的意义在于：

1. **状态可预测**：技能在任意时刻只能处于一个确定状态，避免了"薛定谔的插件"问题
2. **转换可验证**：每个操作（输入符号）只能在特定状态下执行，非法操作会被拒绝
3. **生命周期可追踪**：通过记录状态转移序列，可以完整还原技能的使用历史
4. **会话一致性**：技能在会话启动时快照固定，保证了行为的形式正则性（formal regularity）

> 参考文献：*Agents as Automata*（arxiv.org/html/2510.23487v1）将 Agent 行为建模为有限自动机，*MetaAgent FSM*（arxiv.org/html/2507.22606v1）进一步将此框架扩展到多 Agent 编排。

在实际使用中，`clawhub install` 会自动将技能从 Unregistered → Installed → Active（合并为一步），但底层仍然遵循这个状态机模型。

</details>

## 2. ClawHub：技能注册表

OpenClaw 社区维护了一个名为 [ClawHub](https://clawhub.ai) 的技能注册表（类似 npm 之于 Node.js），源码托管在 `github.com/openclaw/clawhub`。你可以通过 `clawhub` 命令行工具或 [clawhub.ai](https://clawhub.ai) 网站浏览和管理技能。

### 2.0 安装 clawhub CLI

`clawhub` 是 ClawHub 技能注册表的命令行工具，需要单独安装：

```bash
npm i -g clawhub
```

安装后需要登录才能使用：

1. 访问 [clawhub.ai](https://clawhub.ai)，注册并登录
2. 点击右上角**用户头像**，选择 **Settings**
3. 在设置页面找到 **API tokens** 栏，点击 **Create token**
4. 复制生成的 Token（只显示一次，请立即保存）

![ClawHub API Token 创建页面](/clawhub-token.png)

5. 在终端执行：

```bash
clawhub login --token <你的token>
```

验证登录成功：

```bash
clawhub whoami
```


### 2.1 浏览和搜索技能

![clawhub search 终端输出](/clawhub-search.png)

```bash
# 列出所有可用技能
clawhub list

# 搜索特定类型的技能
clawhub search agent
clawhub search email
clawhub search database
```

### 2.2 安装技能

安装技能有两种方式：

**方式一：通过 clawhub CLI（推荐）**

```bash
clawhub install weather
```

OpenClaw 会自动下载技能文件到 `~/.openclaw/skills/weather/`，解析配置需求，然后引导你完成配置。

**方式二：通过聊天粘贴 GitHub URL**

直接在对话中粘贴包含 `SKILL.md` 的 GitHub 仓库 URL，OpenClaw 会自动识别并安装。

安装完成后可以立即测试：

```
帮我查一下明天的天气
```

### 2.3 管理已安装的技能

```bash
# 查看已安装的技能
clawhub list

# 更新单个技能
clawhub update weather

# 更新所有技能
clawhub update --all

# 卸载技能
clawhub uninstall weather
```

<details>
<summary>展开：技能文件结构详解（开发者参考）</summary>

## 3. 技能文件结构

### 3.1 SKILL.md 格式

每个技能的核心是一个 `SKILL.md` 文件，使用 YAML frontmatter 定义元数据：

```markdown
---
name: weather
description: 查询全球城市天气预报和空气质量
version: 1.2.0
requirements:
  - curl
---

# Weather Skill

当用户询问天气相关问题时，使用以下工具获取数据。

## 使用规则

1. 优先使用用户所在城市
2. 默认返回未来 3 天的天气
3. 如果用户关心空气质量，一并返回 AQI 数据

## 工具

### get_weather
- 参数：city (string), days (number, default: 3)
- 用途：获取指定城市未来 N 天的天气预报
```

frontmatter 字段说明：

| 字段 | 说明 | 必填 |
|------|------|------|
| name | 技能标识符（即技能的唯一英文短名，如 `weather`），用于安装和引用 | 是 |
| description | 一句话功能描述 | 是 |
| version | 语义化版本号 | 是 |
| requirements | 系统依赖列表（如 python3, curl） | 否 |
| user-invocable | 是否可由用户通过斜杠命令手动调用 | 否 |
| disable-model-invocation | 禁止模型自动调用，只能用户手动触发 | 否 |
| metadata | 单行 JSON，定义门控条件等高级配置 | 否 |

### 3.2 目录结构

一个完整的技能目录结构：

```
~/.openclaw/skills/weather/
├── SKILL.md          # 核心：技能说明和指令（唯一必需文件）
├── scripts/          # 可选：辅助脚本
│   └── fetch.sh
└── examples/         # 可选：使用示例
    └── demo.md
```

> **注意**：技能目录内没有 `config.yaml` 或 `tools.yaml`。所有技能配置统一在工作区级的 `openclaw.json` 中管理，而非分散在各技能目录中。

</details>

## 4. 新手必装：十大推荐技能

ClawHub 上有超过 16,000 个技能，质量参差不齐——有的非常实用，有的只是披着 Skill 壳的模型伪装，甚至有的会窃取你的 API Key。以下是从中精选的 10 个**安全且实用**的技能，建议按顺序安装：

### 第一个必装：安全守卫

```bash
clawhub install skill-vetter
```

**Skill Vetter** 会自动检测你后续安装的每一个技能，扫描是否存在危险行为（如窃取 API Key、上传个人信息）。**请务必第一个安装它**。

### 核心能力技能

| 序号 | 技能 | 安装命令 | 一句话说明 |
|------|------|---------|-----------|
| 2 | **Tavily Web Search** | `clawhub install tavily-search` | 专为 Agent 设计的联网搜索，结果全、新、简洁 |
| 3 | **Agent Browser** | `clawhub install agent-browser` | 让龙虾打开浏览器，抓取信息、填写表单、操作网页 |
| 4 | **Summarize** | `clawhub install summarize` | 对网页、PDF、图像、音频、YouTube 等内容生成摘要 |
| 5 | **Gog** | `clawhub install gog` | Google 全家桶：Gmail、Calendar、Drive、Docs 一键打包 |
| 6 | **GitHub** | `clawhub install github` | PR 管理、Issue 追踪、代码搜索、仓库操作，开发者必备 |
| 7 | **Obsidian** | `clawhub install obsidian` | 接入本地 Obsidian 笔记库，整理笔记、知识关联 |

### 进阶能力技能

| 序号 | 技能 | 安装命令 | 一句话说明 |
|------|------|---------|-----------|
| 8 | **Self-Improving Agent** | `clawhub install self-improving-agent` | 记录经验教训和纠正措施，让龙虾持续自我改进 |
| 9 | **Proactive Agent** | `clawhub install proactive-agent` | 赋予龙虾主动性，记住历史行为并根据环境变化自动执行任务 |
| 10 | **Capability Evolver** | `clawhub install capability-evolver` | 让龙虾自主进化——分析已有流程，在薄弱环节创造新 Skill 辅助迭代 |

> **一键安装全部**：你也可以直接告诉龙虾"帮我安装 skill-vetter、tavily-search、agent-browser"，它会帮你逐个下载安装。

### 更多精选技能

ClawHub 上技能数量庞大，社区项目 [awesome-openclaw-skills](https://github.com/VoltAgent/awesome-openclaw-skills) 从中精选了 **5,000+** 个高质量技能，按场景分类，过滤了大量低质和危险技能。如果上面 10 个不够用，去那里逛逛。

如果你想先从“菜单式分类”挑技能，再深入看安装和配置，先去 [龙虾大学：Skills 选修地图](/cn/adopt/lobster-university)。

---

## 5. 技能分类速查

以下按使用场景分类列出更多常用技能，方便按需选装：

<!-- TODO: 补充每个技能的使用截图 -->

### 5.1 生产力套件

| 技能 | 安装命令 | 功能 |
|------|---------|------|
| Google Workspace (gog) | `clawhub install gog` | Gmail、Calendar、Drive、Docs、Sheets 统一访问 |
| Notion | `clawhub install notion` | 数据库、页面同步，长期记忆存储 |
| Todoist | `clawhub install todoist` | 任务管理、标签、优先级、周期规则 |
| Slack | `clawhub install slack` | 消息发送、频道管理、文件上传 |
| Obsidian | `clawhub install obsidian` | Markdown 笔记库管理，支持 wikilink |

### 5.2 开发工具

| 技能 | 安装命令 | 功能 |
|------|---------|------|
| GitHub | `clawhub install github` | 仓库、Issue、PR 管理，REST API + GraphQL |
| Git Operations | `clawhub install git-ops` | 安全的 Git 命令执行 |
| Code Reviewer | `clawhub install code-reviewer` | Diff 分析、代码审查、Commit 消息生成 |
| SQL Toolkit | `clawhub install sql-toolkit` | PostgreSQL/MySQL/SQLite 只读查询 |
| CI/CD Pipeline | `clawhub install cicd-pipeline` | GitHub/GitLab/Jenkins 流水线控制 |

### 5.3 运维与基础设施

| 技能 | 安装命令 | 功能 |
|------|---------|------|
| DevOps Toolkit | `clawhub install devops` | Docker 编排、进程管理、健康监控 |
| AWS Infrastructure | `clawhub install aws-infra` | EC2、S3、Lambda 对话式管理 |
| Azure DevOps | `clawhub install azure-devops` | 项目、仓库、看板、流水线管理 |

### 5.4 内容与社交

| 技能 | 安装命令 | 功能 |
|------|---------|------|
| LinkedIn | `clawhub install linkedin` | 帖子生成、轮播图、定时发布 |
| X (Twitter) | `clawhub install x-api` | 推文、线程、媒体附件 |
| Blogburst | `clawhub install blogburst` | 长文内容自动拆分为社交媒体帖子 |

### 5.5 个人助理

| 技能 | 安装命令 | 功能 |
|------|---------|------|
| Weather | `clawhub install weather` | 天气、交通、航班实时数据 |
| Calendar Pro | `clawhub install caldav-calendar` | 多日历集成、冲突检测 |
| AgentMail | `clawhub install agentmail` | IMAP/SMTP 邮件管理、线程摘要、自动回复 |
| Home Assistant | `clawhub install home-assistant` | 智能家居设备控制 |

### 5.6 特殊技能

| 技能 | 安装命令 | 功能 |
|------|---------|------|
| Playwright | `clawhub install playwright` | 无头浏览器自动化、表单填写、数据提取 |
| Hacker News | `clawhub install hackernews` | 技术新闻摘要和个性化推送 |
| Self-Improving | `clawhub install self-improving` | 记录成功/失败执行，自我优化模式识别 |

## 6. 配置技能

安装后可以随时修改技能配置。技能配置统一存放在工作区级的 `openclaw.json` 中：
=======
有时你希望任务只在特定条件下执行。可以在 prompt 中添加判断逻辑：
>>>>>>> Stashed changes

```json
// jobs.json 任务定义格式（推荐通过 CLI 或对话创建）
{
  "cron": {
    "jobs": [
      {
        "name": "disk_alert",
        "schedule": "*/30 * * * *",
        "prompt": "检查磁盘使用率，如果超过 80% 就发送告警到 Telegram，否则不做任何操作",
        "enabled": true
      }
    ]
  }
}
```

OpenClaw 会智能地理解这个条件，只有在磁盘使用率超过 80% 时才会发送消息。这比传统的脚本更灵活，因为你不需要写 if-else 逻辑，只需要用自然语言描述条件即可。

你还可以设置更复杂的条件：

```json
{
  "cron": {
    "jobs": [
      {
        "name": "smart_backup",
        "schedule": "0 2 * * *",
        "prompt": "检查数据库大小，如果超过 1GB 就执行完整备份，否则只备份增量数据。备份完成后，如果是工作日就发送通知到飞书，如果是周末就发送到 Telegram",
        "enabled": true
      }
    ]
  }
}
```

### 4.2 任务链

多个任务可以组合成工作流：

```json
{
  "cron": {
    "jobs": [
      {
        "name": "weekly_report",
        "schedule": "0 17 * * 5",
        "prompt": "1. 读取本周 Git 提交记录\n2. 从 Jira 获取已完成任务\n3. 生成 Markdown 格式周报\n4. 发送到飞书工作群",
        "enabled": true
      }
    ]
  }
}
```

OpenClaw 会按顺序执行每个步骤，前一步的结果会传递给下一步。如果某一步失败，后续步骤会自动跳过，并记录失败原因。

你也可以设置任务依赖关系：

```json
{
  "cron": {
    "jobs": [
      {
        "name": "backup_db",
        "schedule": "0 2 * * *",
        "prompt": "备份数据库到本地",
        "enabled": true
      },
      {
        "name": "upload_backup",
        "schedule": "0 3 * * *",
        "depends_on": "backup_db",
        "prompt": "将备份文件上传到云存储",
        "enabled": true
      }
    ]
  }
}
```

这样 `upload_backup` 只有在 `backup_db` 成功执行后才会运行。

### 4.3 环境变量

如果任务需要访问外部服务，可以在配置中设置环境变量：

```json
{
  "cron": {
    "jobs": [
      {
        "name": "backup_db",
        "schedule": "0 2 * * *",
        "env": {
          "DB_HOST": "localhost",
          "DB_NAME": "myapp",
          "S3_BUCKET": "my-backups"
        },
        "prompt": "备份数据库到 S3：\n1. 使用 mysqldump 导出数据库\n2. 压缩文件\n3. 上传到 S3\n4. 删除本地临时文件",
        "enabled": true
      }
    ]
  }
}
```

环境变量会在任务执行时注入到 OpenClaw 的运行环境中。这样可以避免在 prompt 中硬编码敏感信息，也方便在不同环境（开发、测试、生产）使用不同的配置。

你还可以在全局配置中设置通用的环境变量：

```json
{
  "cron": {
    "global_env": {
      "TIMEZONE": "Asia/Shanghai",
      "NOTIFICATION_CHANNEL": "telegram"
    },
    "jobs": [
      {
        "name": "morning_brief",
        "schedule": "0 8 * * *",
        "prompt": "生成今日简报并发送到 ${NOTIFICATION_CHANNEL}",
        "enabled": true
      }
    ]
  }
}
```

### 4.4 错误处理和重试

定时任务可能因为网络问题、服务不可用等原因失败。你可以配置重试策略：

```json
{
  "cron": {
    "jobs": [
      {
        "name": "api_sync",
        "schedule": "0 */1 * * *",
        "prompt": "从 API 同步数据到本地数据库",
        "retry": {
          "max_attempts": 3,
          "delay": 60
        },
        "on_failure": {
          "notify": true,
          "channel": "telegram"
        },
        "enabled": true
      }
    ]
  }
}
```

如果任务失败，OpenClaw 会等待 60 秒后重试，最多重试 3 次。如果所有重试都失败，会发送通知到 Telegram。

</details>

## 5. 管理定时任务

### 5.1 查看任务状态

```bash
openclaw cron list
```

会显示所有任务的 ID、名称、调度方式、下次/上次执行时间、状态等信息：

![openclaw cron list 终端输出](/openclaw-cron-list.png)

> **字段说明**：`ID` 是任务唯一标识（后续管理任务时会用到），`Schedule` 显示调度类型和参数，`Next` 是距下次执行的时间，`Status` 为 `idle`（空闲等待中）或 `running`（正在执行）。

查看某个任务的执行历史（需要指定任务 ID，可从 `cron list` 获取）：

```bash
# 查看任务的执行历史（--id 为任务 ID）
openclaw cron runs --id 309d8d42-8f61-404b-abb2-c4f301999197
```

### 5.2 手动触发

测试任务时不想等到定时时间，可以手动触发：

```bash
openclaw cron run 每日简报
```

OpenClaw 会立即执行这个任务，并实时显示执行过程和结果。这对于调试任务配置非常有用。

### 5.3 暂停和恢复

临时禁用某个任务：

```bash
openclaw cron disable 每日简报
```

恢复：

```bash
openclaw cron enable 每日简报
```

或者直接在 `~/.openclaw/cron/jobs.json` 对应条目中设置 `"enabled": false`（参见本章第 4 节的配置说明）。如果你要出差一周，可以临时禁用所有非关键任务，避免不必要的通知。

### 5.4 查看执行日志

查看某个任务的执行历史：

```bash
openclaw cron runs --id <任务ID>
```

会显示该任务的执行记录，包括开始时间、状态和结果。任务 ID 可从 `openclaw cron list` 获取。如果需要更详细的日志，可以使用 `openclaw logs --follow` 查看实时网关日志。

<details>
<summary>展开：更多实战案例（服务器监控、自动化测试、数据同步、内容发布、智能提醒）</summary>

## 6. 进阶实战案例

### 6.1 服务器监控

```json
// jobs.json 任务定义格式（推荐通过 CLI 或对话创建）
{
  "cron": {
    "jobs": [
      {
        "name": "server_monitor",
        "schedule": "*/10 * * * *",
        "prompt": "检查服务器状态：\n- CPU 使用率超过 90% 时告警\n- 内存使用率超过 85% 时告警\n- 磁盘空间低于 10GB 时告警\n发送结果到 Telegram",
        "enabled": true
      }
    ]
  }
}
```

这个任务每 10 分钟检查一次服务器状态，只有在出现问题时才会发送通知。相比传统的监控系统，这种方式更灵活，你可以随时调整告警阈值，不需要修改复杂的配置文件。

### 6.2 自动化测试

```json
{
  "cron": {
    "jobs": [
      {
        "name": "nightly_test",
        "schedule": "0 1 * * *",
        "prompt": "运行完整测试套件：\n1. 拉取最新代码\n2. 安装依赖\n3. 运行测试\n4. 生成覆盖率报告\n5. 如果失败，发送详细日志到飞书",
        "enabled": true
      }
    ]
  }
}
```

每天凌晨 1 点自动运行测试，确保代码质量。如果测试失败，团队成员第二天上班就能看到详细的错误报告。

### 6.3 数据同步

```json
{
  "cron": {
    "jobs": [
      {
        "name": "sync_orders",
        "schedule": "*/5 * * * *",
        "env": {
          "API_KEY": "xxxxx",
          "DB_HOST": "localhost"
        },
        "prompt": "从电商平台 API 获取最近 5 分钟的新订单，写入本地数据库，如果有新订单就发送通知",
        "retry": {
          "max_attempts": 3,
          "delay": 30
        },
        "enabled": true
      }
    ]
  }
}
```

每 5 分钟同步一次订单数据，确保本地数据库和线上保持一致。如果 API 调用失败，会自动重试 3 次。

### 6.4 内容发布

```json
{
  "cron": {
    "jobs": [
      {
        "name": "auto_publish",
        "schedule": "0 9,14,18 * * *",
        "prompt": "从内容库中随机选择一篇文章，发布到微信公众号、知乎、小红书，记录发布结果",
        "enabled": true
      }
    ]
  }
}
```

每天 9 点、14 点、18 点自动发布内容，保持账号活跃度。OpenClaw 会智能地选择合适的内容，避免重复发布。

### 6.5 智能提醒

```json
{
  "cron": {
    "jobs": [
      {
        "name": "meeting_reminder",
        "schedule": "0 8 * * 1-5",
        "prompt": "读取今天的日历事件，如果有会议就提前 30 分钟提醒我，包含会议主题、时间、参会人员",
        "enabled": true
      }
    ]
  }
}
```

工作日早上 8 点检查今天的日程，有会议就提前提醒。比手机自带的日历提醒更智能，因为可以根据会议重要性调整提醒时间。

</details>

## 7. 最佳实践

**合理设置执行频率**：不要让任务执行得太频繁，否则会消耗大量 API token。一般来说，监控类任务 5-10 分钟一次即可，数据同步 15-30 分钟，报告生成每天或每周一次。

**使用条件判断减少通知**：不要每次执行都发送通知，只在有重要信息时才通知。比如监控任务只在出现问题时告警，而不是每次都报告"一切正常"。

**设置超时时间**：对于可能执行很久的任务，设置超时时间避免卡死：

```json
{
  "cron": {
    "jobs": [
      {
        "name": "long_task",
        "schedule": "0 2 * * *",
        "timeout": 3600,
        "prompt": "执行耗时的数据处理任务",
        "enabled": true
      }
    ]
  }
}
```

**分离关键任务和非关键任务**：把重要的任务（如备份、监控）和不重要的任务（如内容发布）分开配置，这样可以在需要时单独禁用非关键任务。

**定期检查任务执行情况**：每周查看一次任务执行统计，确保所有任务都正常运行。可以设置一个"健康检查"任务，每天汇总所有任务的执行情况。

---

**下一步**：[第六章 技能系统入门](/cn/adopt/chapter6/)
