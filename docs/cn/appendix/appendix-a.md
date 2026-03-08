# 附录 A：命令速查表

OpenClaw 提供了丰富的命令行工具，本附录基于官方文档整理所有常用命令。

> 参考来源：[OpenClaw CLI Reference](https://docs.openclaw.ai/cli)

## 快速导航

- [安装与更新](#安装与更新)
- [初始化与配置](#初始化与配置)
- [网关管理](#网关管理)
- [Agent 管理](#agent-管理)
- [技能管理](#技能管理)
- [记忆管理](#记忆管理)
- [设备管理](#设备管理)
- [诊断与调试](#诊断与调试)
- [配置操作](#配置操作)
- [消息发送](#消息发送)
- [模型管理](#模型管理)
- [系统管理](#系统管理)

---

## 全局选项

```bash
openclaw [--dev] [--profile <name>] <command>

--dev              # 隔离状态到 ~/.openclaw-dev，并偏移默认端口
--profile <name>   # 隔离状态到 ~/.openclaw-<name>
--no-color         # 禁用 ANSI 颜色
--update           # 简写为 openclaw update（仅源码安装）
-V, --version, -v  # 打印版本并退出
```

---

## 安装与更新

### 安装 OpenClaw

```bash
# 通过 npm 安装（推荐）
npm install -g openclaw@latest

# 或通过 pnpm
pnpm add -g openclaw@latest
```

### 更新 OpenClaw

```bash
# 检查并更新到最新版本
openclaw update

# 切换到特定频道
openclaw update --channel stable|beta|dev

# 查看当前版本
openclaw --version
```

### 卸载 OpenClaw

```bash
# 卸载网关服务和本地数据（CLI 保留）
openclaw uninstall

# 指定范围卸载
openclaw uninstall --service --state --workspace --app --all

# 重置配置和状态（保留 CLI）
openclaw reset
openclaw reset --scope config+creds+sessions --yes
```

---

## 初始化与配置

### 初始化向导

```bash
# 交互式设置向导（推荐）
openclaw onboard

# 初始化并安装守护进程
openclaw onboard --install-daemon

# 非交互式模式
openclaw onboard --non-interactive --mode local

# 重置后重新初始化
openclaw onboard --reset
```

### 配置向导

```bash
# 交互式配置向导
openclaw configure

# 验证配置
openclaw doctor
openclaw doctor --fix          # 自动修复
openclaw doctor --deep         # 深度扫描
```

### 打开控制台

```bash
# 启动 Web Dashboard
openclaw dashboard
```

---

## 网关管理

网关（Gateway）是 OpenClaw 的核心服务，默认运行在 `ws://127.0.0.1:18789`。

### 启动网关

```bash
# 前台运行（调试模式）
openclaw gateway --port 18789 --verbose

# 指定绑定地址
openclaw gateway --bind loopback|lan|tailnet|auto|custom

# 使用 Token 认证
openclaw gateway --auth token --token <token>

# 使用密码认证
openclaw gateway --auth password --password <password>

# Tailscale 集成
openclaw gateway --tailscale serve|funnel

# 开发模式
openclaw gateway --dev
```

### 网关服务管理

```bash
# 查看网关服务状态
openclaw gateway status

# 安装为系统服务
openclaw gateway install

# 卸载服务
openclaw gateway uninstall

# 启动/停止/重启服务
openclaw gateway start
openclaw gateway stop
openclaw gateway restart

# 查看日志
openclaw logs
openclaw logs --lines 100
```

### 网关健康检查

```bash
# 获取网关健康状态
openclaw health
openclaw health --json
openclaw health --verbose

# 网关调用（RPC）
openclaw gateway call <method> --params '<json>'
```

---

## Agent 管理

### 列出所有 Agent

```bash
openclaw agents list
openclaw agents list --json
openclaw agents list --bindings
```

### 添加 Agent

```bash
# 交互式添加
openclaw agents add

# 指定名称添加
openclaw agents add [name]

# 非交互式添加
openclaw agents add my-agent \
  --workspace ~/.openclaw/workspace-my-agent \
  --model anthropic/claude-sonnet-4-5 \
  --bind whatsapp:personal \
  --non-interactive
```

### 绑定管理

```bash
# 查看绑定
openclaw agents bindings
openclaw agents bindings --agent <id>

# 添加绑定
openclaw agents bind --agent <id> --bind <channel[:accountId]>

# 移除绑定
openclaw agents unbind --agent <id> --bind <channel[:accountId]>
openclaw agents unbind --agent <id> --all
```

### 删除 Agent

```bash
openclaw agents delete <id>
openclaw agents delete <id> --force
```

### 运行 Agent

```bash
# 单次对话
openclaw agent --message "Hello" --to <dest>

# 指定会话
openclaw agent --message "Hello" --session-id <id>

# 指定思考级别
openclaw agent --message "Hello" --thinking high

# 本地模式（不通过网关）
openclaw agent --message "Hello" --local

# 指定渠道回复
openclaw agent --message "Hello" --channel whatsapp --deliver
```

---

## 技能管理

### 列出技能

```bash
openclaw skills list
openclaw skills list --eligible    # 仅显示就绪技能
openclaw skills list --json
openclaw skills list -v            # 显示缺失需求详情
```

### 查看技能详情

```bash
openclaw skills info <name>
```

### 检查技能状态

```bash
openclaw skills check
```

> 提示：使用 `npx clawhub` 搜索、安装和同步技能。

---

## 插件管理

### 列出插件

```bash
openclaw plugins list
openclaw plugins list --json
```

### 查看插件详情

```bash
openclaw plugins info <id>
```

### 安装插件

```bash
openclaw plugins install <path|.tgz|npm-spec>
```

### 启用/禁用插件

```bash
openclaw plugins enable <id>
openclaw plugins disable <id>
```

### 插件诊断

```bash
openclaw plugins doctor
```

---

## 记忆管理

### 查看记忆状态

```bash
openclaw memory status
```

### 索引记忆

```bash
openclaw memory index
```

### 搜索记忆

```bash
openclaw memory search "<query>"
openclaw memory search --query "<query>"
```

---

## 设备管理

### 列出设备

```bash
openclaw devices list
openclaw devices list --json
```

### 批准设备

```bash
openclaw devices approve [requestId]
openclaw devices approve --latest
```

### 拒绝设备

```bash
openclaw devices reject <requestId>
```

### 移除设备

```bash
openclaw devices remove <deviceId>
```

### 清除设备

```bash
openclaw devices clear --yes
openclaw devices clear --yes --pending
```

---

## 配对管理

### 列出配对请求

```bash
openclaw pairing list
openclaw pairing list [channel] --channel <channel> --account <id>
```

### 批准配对

```bash
openclaw pairing approve <channel> <code>
openclaw pairing approve --channel <channel> <code> --notify
```

---

## 渠道管理

### 列出渠道

```bash
openclaw channels list
openclaw channels list --json
```

### 查看渠道状态

```bash
openclaw channels status
openclaw channels status --probe
```

### 查看渠道日志

```bash
openclaw channels logs
openclaw channels logs --channel <name> --lines 200
```

### 添加渠道

```bash
# 交互式添加
openclaw channels add

# 非交互式添加 Telegram
openclaw channels add \
  --channel telegram \
  --account alerts \
  --name "Alerts Bot" \
  --token $TELEGRAM_BOT_TOKEN

# 非交互式添加 Discord
openclaw channels add \
  --channel discord \
  --account work \
  --name "Work Bot" \
  --token $DISCORD_BOT_TOKEN
```

### 移除渠道

```bash
openclaw channels remove --channel <channel> --account <id>
openclaw channels remove --channel <channel> --account <id> --delete
```

### 登录/登出

```bash
# WhatsApp Web 登录
openclaw channels login
openclaw channels login --channel whatsapp --account <id> --verbose

# 登出
openclaw channels logout
openclaw channels logout --channel <channel> --account <id>
```

---

## 消息发送

### 发送消息

```bash
openclaw message send --target +15555550123 --message "Hello"
```

### 发送投票

```bash
openclaw message poll \
  --channel discord \
  --target channel:123 \
  --poll-question "Snack?" \
  --poll-option Pizza \
  --poll-option Sushi
```

### 其他消息操作

```bash
openclaw message react
openclaw message reactions
openclaw message read
openclaw message edit
openclaw message delete
openclaw message pin
openclaw message unpin
```

---

## 模型管理

### 列出模型

```bash
openclaw models list
openclaw models status
```

### 设置模型

```bash
openclaw models set <model>
openclaw models set-image <model>
```

### 模型别名

```bash
openclaw models aliases list
openclaw models aliases add <alias> <model>
openclaw models aliases remove <alias>
```

### 模型回退

```bash
openclaw models fallbacks list
openclaw models fallbacks add <model>
openclaw models fallbacks remove <model>
openclaw models fallbacks clear
```

### 模型认证

```bash
openclaw models auth add
openclaw models auth setup-token
openclaw models auth paste-token
openclaw models auth order get|set|clear
```

---

## 配置操作

### 获取配置

```bash
openclaw config get <path>
openclaw config get agents.defaults.workspace
```

### 设置配置

```bash
openclaw config set <path> <value>
openclaw config set agents.defaults.heartbeat.every "2h"
```

### 删除配置

```bash
openclaw config unset <path>
```

### 配置文件路径

```bash
openclaw config file
```

### 验证配置

```bash
openclaw config validate
openclaw config validate --json
```

---

## 系统管理

### 系统事件

```bash
openclaw system event
```

### 心跳管理

```bash
openclaw system heartbeat last
openclaw system heartbeat enable
openclaw system heartbeat disable
```

### 在线状态

```bash
openclaw system presence
```

---

## 安全管理

### 安全审计

```bash
openclaw security audit
openclaw security audit --deep
openclaw security audit --fix
```

### 密钥管理

```bash
openclaw secrets reload
openclaw secrets audit
openclaw secrets configure
openclaw secrets apply --from <plan.json>
```

---

## 会话管理

### 列出会话

```bash
openclaw sessions list
openclaw sessions --json
openclaw sessions --verbose
```

### 查看状态

```bash
openclaw status
openclaw status --json
openclaw status --deep
openclaw status --usage
```

---

## 浏览器管理

```bash
openclaw browser status
openclaw browser start
openclaw browser stop
openclaw browser reset-profile
openclaw browser tabs
openclaw browser open <url>
openclaw browser screenshot
openclaw browser navigate <url>
```

---

## 定时任务

```bash
openclaw cron status
openclaw cron list
openclaw cron add
openclaw cron edit <id>
openclaw cron rm <id>
openclaw cron enable <id>
openclaw cron disable <id>
openclaw cron runs
openclaw cron run <id>
```

---

## 快捷命令别名

为提高效率，你可以设置常用命令的别名：

```bash
# 添加到 ~/.bashrc 或 ~/.zshrc
alias oc='openclaw'
alias ocg='openclaw gateway'
alias ocs='openclaw skills'
alias oca='openclaw agents'
alias ocd='openclaw dashboard'
alias ocdr='openclaw doctor'
alias occh='openclaw channels'

# 快速启动别名
alias ocstart='openclaw gateway start && openclaw dashboard'
alias ocstop='openclaw gateway stop'
alias ocrestart='openclaw gateway restart'
```

---

## 故障排查速查

| 问题 | 诊断命令 | 解决方案 |
|------|----------|----------|
| 网关无法启动 | `openclaw doctor` | 检查端口占用，查看日志 |
| Dashboard 无法访问 | `openclaw gateway status` | 确认网关运行，检查防火墙 |
| 渠道连接失败 | `openclaw channels status --probe` | 检查渠道配置和认证 |
| 模型连接失败 | `openclaw models status` | 验证 API 密钥和模型配置 |
| 设备配对失败 | `openclaw devices list` | 批准待处理设备 |
| 配置验证失败 | `openclaw config validate` | 根据错误提示修复配置 |

---

## 更多帮助

```bash
# 查看全局帮助
openclaw --help

# 查看子命令帮助
openclaw <command> --help

# 查看具体命令帮助
openclaw gateway --help
openclaw channels add --help
```

---

**提示**：本速查表基于 OpenClaw 官方文档整理，建议访问 [docs.openclaw.ai](https://docs.openclaw.ai) 获取最新信息。
