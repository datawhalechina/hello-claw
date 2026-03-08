# 第三章 自动化任务入门

> **前提**：本章假设你已完成第一章的安装配置。定时任务的通知功能需要配合第二章的消息渠道（飞书/Telegram/QQ），但不是必须的——没有配置渠道时，任务仍会执行，只是结果只能在 Web 控制面板查看。

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
# 添加任务
openclaw cron add

# 编辑任务
openclaw cron edit <jobId>

# 查看所有任务
openclaw cron list

# 删除任务
openclaw cron rm <jobId>
```

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
> - **具体任务**通过 CLI（`openclaw cron add`）或对话创建，由 Gateway 存储在 `~/.openclaw/cron/jobs.json` 中。手动编辑该文件需要先停止 Gateway。
>
> 下面的 JSON 示例展示的是 `jobs.json` 中的任务定义格式，仅供理解参考，**推荐通过对话或 CLI 创建任务**。

<details>
<summary>展开：高级配置（条件执行、任务链、环境变量、错误处理）</summary>

### 4.1 条件执行

有时你希望任务只在特定条件下执行。可以在 prompt 中添加判断逻辑：

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

会显示所有任务的名称、执行时间、状态和上次运行结果。输出类似：

```
NAME            SCHEDULE        STATUS    LAST RUN           NEXT RUN
morning_brief   0 8 * * *       enabled   2026-03-06 08:00   2026-03-07 08:00
disk_alert      */30 * * * *    enabled   2026-03-06 09:00   2026-03-06 09:30
weekly_report   0 17 * * 5      enabled   2026-03-01 17:00   2026-03-08 17:00
```

查看任务的执行历史：

```bash
# 查看任务的执行历史
openclaw cron runs
```

### 5.2 手动触发

测试任务时不想等到定时时间，可以手动触发：

```bash
openclaw cron run morning_brief
```

OpenClaw 会立即执行这个任务，并实时显示执行过程和结果。这对于调试任务配置非常有用。

### 5.3 暂停和恢复

临时禁用某个任务：

```bash
openclaw cron disable morning_brief
```

恢复：

```bash
openclaw cron enable morning_brief
```

或者直接在 `~/.openclaw/cron/jobs.json` 对应条目中设置 `"enabled": false`（参见本章第 4 节的配置说明）。如果你要出差一周，可以临时禁用所有非关键任务，避免不必要的通知。

### 5.4 查看执行日志

查看任务的执行历史：

```bash
openclaw cron runs
```

会显示所有定时任务的执行记录，包括开始时间、状态和结果。如果需要更详细的日志，可以使用 `openclaw logs --follow` 查看实时网关日志。

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

**下一步**：[第四章 Skills 技能系统](/cn/adopt/chapter4/)

