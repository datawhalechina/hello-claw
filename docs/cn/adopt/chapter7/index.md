---
prev:
  text: '第6章 智能体管理'
  link: '/cn/adopt/chapter6'
next:
  text: '第8章 网关运维'
  link: '/cn/adopt/chapter8'
---

# 第七章 工具与定时任务

学完本章，你的龙虾就能自己找工具干活、定时执行任务了——搜网页、操浏览器、每天早上自动发天气，一个不落。

> **AutoClaw 用户**：[AutoClaw](/cn/adopt/chapter1/) 默认开启 `full` 工具配置档，无需手动配置。本章帮你理解工具系统，以便按需调整。

## 0. 工具 vs 技能

龙虾的"大脑"是模型（第二章配置），**工具（Tools）是它的"双手"**——没有工具只能聊天，有了工具才能干实事。

|  | Tools（工具） | Skills（技能） |
|---|---|---|
| **是什么** | OpenClaw 内置的底层能力 | 社区或用户编写的高层指令 |
| **举例** | 执行命令、读写文件、搜索网页 | "每天早上发晨间简报"、"总结网页" |
| **谁提供** | OpenClaw 核心代码 | ClawHub 技能市场 / 用户自己编写 |
| **如何管理** | `openclaw config set tools.*` CLI 命令 | `clawhub` CLI 安装/卸载 |

一句话：**Tools 是手脚，Skills 是招式。**

## 1. 工具配置档（Tool Profiles）

Tool Profile 控制龙虾"能做什么"，个人电脑上直接用 `full` 即可。

| 配置档 | 能力范围 | 适用场景 |
|--------|---------|---------|
| `full` | 无限制，所有工具可用 | **推荐**——个人电脑全能助手 |
| `coding` | 文件读写、命令执行、记忆、图片分析 | 开发者专用，不含消息和浏览器 |
| `messaging` | 消息收发、会话浏览、状态查看 | 纯聊天机器人 |
| `minimal` | 仅状态查看 | 最小权限 |

```bash
# 查看当前配置
openclaw config get tools.profile

# 设置为 full（推荐）
openclaw config set tools.profile full
openclaw gateway restart
```

> 如果龙虾只给建议、不执行操作，多半是配置档停在了旧版默认值 `messaging`——跑一遍上面的命令就好。

::: danger full 模式安全提示
`full` 模式下 OpenClaw 可在你的电脑上执行任意命令、读写任意文件。个人电脑上使用没问题（每次操作前都会请求确认），但**不要在生产服务器上使用 `full` 模式**。
:::

<details>
<summary>为特定 Agent 单独设置配置档</summary>

如果你运行多个 Agent（如一个全能助手 + 一个客服机器人），可以为每个 Agent 设置不同的配置档：

```json
{
  "tools": { "profile": "full" },
  "agents": {
    "list": [
      {
        "id": "support",
        "tools": { "profile": "messaging", "allow": ["slack"] }
      }
    ]
  }
}
```

上面的配置让默认 Agent 拥有全部工具，而 `support` Agent 只能收发消息和使用 Slack。

</details>

## 2. 内置工具一览

不需要逐个记住——龙虾会自动选工具，你只要确保配置档是 `full`。

| 分类 | 工具 | 说明 |
|------|------|------|
| **文件操作** | `read` `write` `edit` `apply_patch` | 读写文件，批量打补丁 |
| **命令执行** | `exec` `process` | 运行 Shell 命令、管理后台进程 |
| **网页** | `web_search` `web_fetch` | 搜索引擎查询、抓取网页内容 |
| **浏览器** | `browser` | 完整的浏览器自动化（点击、输入、截图） |
| **消息** | `message` | 跨渠道收发消息（飞书/QQ/Telegram 等） |
| **定时任务** | `cron` | 创建和管理定时 / 周期性任务 |
| **画布** | `canvas` | 驱动配套 App 的画布功能 |
| **设备** | `nodes` | 发现配套设备、拍照、录屏、获取位置 |
| **图片/PDF** | `image` `pdf` | 分析图片内容、解析 PDF 文档 |
| **网关** | `gateway` | 重启网关、查看和修改配置 |
| **会话** | `sessions_*` `agents_list` | 管理对话会话、生成子 Agent |

<details>
<summary>工具组（快捷分组）速查表</summary>

OpenClaw 提供预定义的工具组，方便在配置中批量引用：

| 工具组 | 包含的工具 |
|--------|-----------|
| `group:fs` | read, write, edit, apply_patch |
| `group:runtime` | exec, bash, process |
| `group:web` | web_search, web_fetch |
| `group:ui` | browser, canvas |
| `group:sessions` | sessions_list / history / send / spawn, session_status |
| `group:memory` | memory_search, memory_get |
| `group:automation` | cron, gateway |
| `group:messaging` | message |
| `group:nodes` | nodes |
| `group:openclaw` | 所有内置工具（不含插件） |

在后续的权限管理中会用到这些组名。

</details>

## 3. 联网搜索

想让龙虾告诉你今天的新闻或最新股价？配置联网搜索就行。

一行命令启动向导：

```bash
openclaw configure --section web
```

向导会让你选搜索引擎、填 API Key，完成后龙虾就能实时查网了。

配置完成后直接在对话里问：

```
今天有什么科技新闻？
帮我搜索"OpenClaw 最新版本"的更新内容
```

龙虾自动判断要不要联网，不用你指定。

> `web_fetch` 工具还能直接抓取指定网址的内容并转成文字。JavaScript 渲染的动态网页建议用下一节的浏览器工具。

<details>
<summary>支持哪些搜索引擎？</summary>

| 搜索引擎 | 说明 |
|---------|------|
| **Brave** | 隐私友好，免费额度充足，推荐入门使用 |
| **Perplexity** | AI 增强搜索，结果质量高 |
| **Kimi** | 国内可用，中文搜索优化 |
| **Gemini** | Google 搜索能力 |
| **Grok** | xAI 提供的搜索 |

</details>

## 4. 浏览器自动化

想让龙虾帮你填表单、截图、点按钮？浏览器工具默认已启用，直接说就行：

```
帮我打开百度搜索"今日天气"，截图给我看
打开 https://example.com，找到登录按钮并点击
```

龙虾会自动启动 Chrome、打开页面、识别元素、执行操作，最后截图给你确认。

> 前提：系统需要安装 Chrome 或 Chromium，大多数电脑已经预装。

如果浏览器未启用，运行：

```bash
openclaw config set browser.enabled true
openclaw gateway restart
```

<details>
<summary>浏览器支持哪些操作？</summary>

| 操作 | 说明 |
|------|------|
| `status` | 查看浏览器是否运行 |
| `start` / `stop` | 启动 / 关闭浏览器 |
| `open` | 打开指定 URL |
| `tabs` / `focus` / `close` | 标签页管理 |
| `snapshot` | 获取页面快照（识别可操作元素） |
| `screenshot` | 截取当前页面图片 |
| `act` | 交互操作：click / type / press / hover / drag / fill / resize / wait |
| `navigate` | 前进 / 后退 / 刷新 |
| `console` | 查看浏览器控制台日志 |
| `pdf` | 将当前页面导出为 PDF |
| `upload` | 上传文件 |

`snapshot` 有两种模式：`ai`（默认，Playwright 分析页面结构）和 `aria`（返回无障碍树）。`act` 操作需要引用 `snapshot` 返回的元素编号。

</details>

<details>
<summary>需要同时登录多个账号怎么办？</summary>

创建多个浏览器 Profile，每个有独立的 Cookie 和登录状态：

```json
{
  "browser": {
    "enabled": true,
    "defaultProfile": "chrome",
    "profiles": {
      "chrome": { "port": 18800 },
      "work": { "port": 18801 }
    }
  }
}
```

对话中指定用哪个：

```
用 work 浏览器打开飞书文档
```

Profile 命名：小写字母 + 数字 + 短横线，最长 64 字符。端口范围 18800–18899。

</details>

## 5. 定时任务（Cron）

想让龙虾每天早上给你推新闻？那就需要定时任务。

最简单的例子——每天早上 8 点发天气预报：

```bash
openclaw cron add --name "天气预报" --cron "0 8 * * *" \
  --message "查询今天的天气，发送给我" \
  --channel "feishu:chat:你的ChatID"
```

三种调度方式按需选：

```bash
# 固定周期：每 30 分钟执行一次
openclaw cron add --name "定期检查" --every 30m \
  --message "检查有没有需要我处理的事情"

# 一次性延时：20 分钟后提醒
openclaw cron add --name "提醒" --at 20m \
  --message "提醒：该休息一下了！"
```

管理任务：

```bash
openclaw cron list                   # 查看所有任务
openclaw cron run 天气预报           # 手动触发一次
openclaw cron runs --id <taskID>     # 查看执行历史
openclaw cron disable 天气预报       # 暂停
openclaw cron enable 天气预报        # 恢复
openclaw cron edit <jobId>           # 编辑
openclaw cron rm <jobId>             # 删除
```

> Cron 任务依赖 Gateway 持续运行。电脑关机期间的任务不会补执行，Gateway 重启后恢复。

> `--channel` 格式因平台而异：`feishu:chat:<ChatID>`、`telegram:chat:<ChatID>`、`qqbot:group:<groupid>`。完整格式见[附录 F 命令速查表](/cn/appendix/appendix-f)。

<details>
<summary>Cron 表达式速查（`分 时 日 月 周`）</summary>

| 表达式 | 含义 |
|--------|------|
| `0 8 * * *` | 每天早上 8:00 |
| `0 9 * * 1-5` | 工作日（周一到周五）上午 9:00 |
| `*/30 * * * *` | 每 30 分钟 |
| `0 20 * * 5` | 每周五晚上 8:00 |
| `0 0 1 * *` | 每月 1 日零点 |

不熟悉 Cron 语法？直接用 `--every`（周期间隔）或 `--at`（延时一次）更直观。

</details>

## 6. 命令执行（Exec）

`exec` 是龙虾"干活"的核心——安装软件、处理文件、运行脚本都靠它。直接说需求就行：

```
帮我创建一个文件叫 hello.txt，写上今天的日期和"Hello from OpenClaw!"
用 Python 写一个猜数字小游戏，保存为 game.py 并运行它
```

每次执行前龙虾都会请求你确认。

<details>
<summary>exec 参数与后台进程管理</summary>

| 参数 | 说明 | 默认值 |
|------|------|--------|
| `command` | 要执行的命令（必填） | — |
| `timeout` | 超时秒数，超时后终止 | 1800（30 分钟） |
| `background` | 立即后台运行 | false |
| `yieldMs` | 超过该毫秒数后自动切后台 | 10000（10 秒） |
| `pty` | 是否需要真实终端 | false |

后台运行的命令通过 `process` 工具管理：

| 操作 | 说明 |
|------|------|
| `list` | 列出所有后台进程 |
| `poll` | 获取新输出和退出状态 |
| `log` | 查看输出日志 |
| `write` | 向进程写入输入 |
| `kill` | 终止进程 |
| `clear` / `remove` | 清理已完成的进程 |

</details>

<details>
<summary>exec 安全策略</summary>

exec 工具有三种安全级别：

| 级别 | 说明 |
|------|------|
| `deny` | 完全禁止执行命令 |
| `allowlist` | 仅允许白名单中的命令 |
| `full` | 允许执行任何命令（需用户确认） |

如果你需要限制龙虾可以执行的命令范围，通过 `openclaw config set tools.exec.security allowlist` 配置安全级别，详见[附录 G](/cn/appendix/appendix-g)。

</details>

## 7. 工具权限管理

需要限制龙虾的能力？用 `tools.allow` 和 `tools.deny` 精确控制：

```bash
# 禁止浏览器
openclaw config set tools.deny '["browser"]'

# 只允许文件操作和搜索
openclaw config set tools.allow '["group:fs", "group:web"]'
```

`deny` 优先于 `allow`，匹配不区分大小写，支持 `*` 通配符。

<details>
<summary>按模型提供商限制工具</summary>

通过 `tools.byProvider` 为不同提供商设置不同权限：

```json
{
  "tools": {
    "profile": "coding",
    "byProvider": {
      "google-antigravity": { "profile": "minimal" }
    }
  }
}
```

`byProvider` 只能**收窄**权限，不能超出全局配置档的范围。支持 `provider`（如 `siliconflow`）或 `provider/model`（如 `openai/gpt-5.2`）两种粒度。

</details>

<details>
<summary>龙虾卡住反复做同一件事怎么办？</summary>

启用工具循环检测：

```json
{
  "tools": {
    "loopDetection": {
      "enabled": true,
      "warningThreshold": 10,
      "criticalThreshold": 20,
      "globalCircuitBreakerThreshold": 30
    }
  }
}
```

检测器识别三种循环模式：相同工具反复调用、轮询无进展、两个工具乒乓交替。默认关闭。

</details>

## 8. 插件工具

内置工具不够用？OpenClaw 支持插件扩展：

| 插件 | 说明 |
|------|------|
| **Lobster** | 工作流运行时，支持多步骤任务和可恢复的审批流程 |
| **LLM Task** | JSON 格式的 LLM 调用，用于结构化输出（可选 Schema 校验） |
| **Diffs** | 文件差异查看器，支持 PNG / PDF 渲染 |
| **Voice Call** | 语音通话插件 |
| **Zalo Personal** | Zalo 个人账号插件 |

安装和配置详见[附录 G 配置文件详解](/cn/appendix/appendix-g)。

<details>
<summary>工具是怎么让 AI 模型"看见"的？</summary>

OpenClaw 通过两个通道让模型感知工具：

1. **系统提示词**：人类可读的工具列表 + 使用指南
2. **工具 Schema**：结构化的函数定义，发送到模型 API

被 `tools.deny` 禁止的工具不会出现在这两个通道里，模型自然无从调用。

</details>

## 9. 常见问题

**龙虾只会聊天，不执行任何操作？**

工具配置档可能停在了 `messaging` 或 `minimal`：

```bash
openclaw config set tools.profile full
openclaw gateway restart
```

**联网搜索不可用？**

需要先配置搜索引擎 API Key：`openclaw configure --section web`。

**浏览器工具报错？**

先确认已启用（`openclaw config get browser.enabled`），再确保系统装了 Chrome 或 Chromium。Linux 无图形界面服务器需要 Chromium headless 模式；WSL2 用户可能需要额外配置，详见[附录 G](/cn/appendix/appendix-g)。

**定时任务没有执行？**

检查 Gateway 是否在运行（`openclaw status`）。关机期间的任务不会补执行。

**怎么看龙虾调用了哪些工具？**

在 Web 控制面板（`openclaw dashboard`）的对话详情里可以看到每次工具调用，也可以查日志：

```bash
openclaw logs --limit 50
```
