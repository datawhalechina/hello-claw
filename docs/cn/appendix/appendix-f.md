---
prev:
  text: '附录 E：模型提供商选型指南'
  link: '/cn/appendix/appendix-e'
next:
  text: '附录 G：配置文件详解'
  link: '/cn/appendix/appendix-g'
---

# 附录 F：命令速查表

刚装好 OpenClaw，面对几十条命令不知从何下手？这份速查表把所有 CLI 命令按使用场景分好了类——从安装到日常操作，从渠道管理到故障排查，**需要什么查什么**，不必通读。

> **阅读提示**：带 ⭐ 的是最高频命令，装完就会用到。带 🔧 的是进阶运维命令，日常使用不一定碰得到。每条命令的行内注释说明了它的用途。

---

## 快速导航

| 场景 | 跳转 | 一句话说明 |
|------|------|-----------|
| 刚装好，想试试 | [安装与更新](#安装与更新) | 安装、升级、卸载 |
| 第一次配置 | [初始化与配置](#初始化与配置) | 向导、诊断、Dashboard |
| 终端里直接聊 | [终端对话](#终端对话) | TUI 交互聊天、单次 Agent 调用 |
| 让 OpenClaw 跑起来 | [网关管理](#网关管理) | 启动、停止、健康检查 |
| 连接聊天平台 | [渠道管理](#渠道管理) | 添加 Telegram / QQ / 飞书等渠道 |
| 管理多个 Agent | [Agent 管理](#agent-管理) | 创建、绑定、运行 Agent |
| 安装技能 | [技能与插件](#技能与插件) | 浏览、安装、启用技能和插件 |
| 选择和切换模型 | [模型管理](#模型管理) | 设置模型、回退、别名 |
| 定时自动执行 | [定时任务](#定时任务) | Cron 任务的增删改查 |
| 发消息、投票 | [消息发送](#消息发送) | 主动发送消息和互动 |
| 调参数 | [配置操作](#配置操作) | 读写配置项 |
| 沙箱与安全 | [沙箱与安全](#沙箱与安全) | 沙箱隔离、审批、安全审计 |
| 出问题了 | [诊断与调试](#诊断与调试) | 日志、Doctor、备份恢复 |
| 其他高级功能 | [更多命令](#更多命令) | 记忆、设备、浏览器、DNS、Webhook 等 |

---

## 全局选项

所有 `openclaw` 命令都支持以下选项：

```bash
openclaw [--dev] [--profile <name>] [--log-level <level>] <command>

--dev              # 隔离开发环境（状态存到 ~/.openclaw-dev，端口自动偏移）
--profile <name>   # 自定义隔离环境（状态存到 ~/.openclaw-<name>）
--log-level <level>  # 全局日志级别覆盖（silent|fatal|error|warn|info|debug|trace）
--no-color         # 禁用终端颜色输出
-V, --version      # 查看版本号
```

> 多套环境互不干扰：`--dev` 适合调试，`--profile` 适合同时运行多个实例（如一个生产、一个测试）。

---

## 安装与更新

### ⭐ 安装 OpenClaw

**Windows 用户**（以管理员身份打开 PowerShell）：

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
iwr -useb https://openclaw.ai/install.ps1 | iex
```

> 一键脚本会自动安装 Node.js 和 OpenClaw，装完直接进入配置向导。

**macOS / Linux / WSL2 用户**：

```bash
npm install -g openclaw@latest      # npm 安装（推荐）
# 或
pnpm add -g openclaw@latest         # pnpm 安装
```

> 前置条件：Node.js >= 22。详见[第 2 章 手动安装](/cn/adopt/chapter2/)。

### 更新与卸载

```bash
openclaw update                      # ⭐ 更新到最新版
openclaw update --channel stable|beta|dev  # 切换到指定更新频道
openclaw --version                   # 查看当前版本

openclaw uninstall                   # 卸载网关服务和本地数据（保留 CLI）
openclaw uninstall --all             # 完全卸载
openclaw reset                       # 重置配置和状态（保留 CLI）
openclaw reset --scope config+creds+sessions --yes  # 精确重置指定范围
```

---

## 初始化与配置

装好之后的第一步：运行配置向导。

### ⭐ 配置向导

```bash
openclaw onboard                     # 交互式设置向导（推荐首次使用）
openclaw onboard --install-daemon    # 设置并安装守护进程（开机自启）
openclaw onboard --non-interactive --mode local  # 非交互模式（脚本部署用）
openclaw onboard --reset             # 重新运行向导（覆盖现有配置）
```

### ⭐ 配置验证

配置完不确定对不对？用 Doctor 一键诊断：

```bash
openclaw doctor                      # 自动诊断常见问题
openclaw doctor --fix                # 诊断并自动修复
openclaw doctor --deep               # 深度扫描（检查更多项目）
```

### 重新配置

```bash
openclaw configure                   # 重新打开交互式配置向导
```

### ⭐ 打开控制面板

```bash
openclaw dashboard                   # 启动 Web Dashboard（浏览器自动打开）
```

> 详见[第 3 章 初始配置向导](/cn/adopt/chapter3/)。

---

## 终端对话

不需要浏览器，不需要聊天平台，直接在终端里和 OpenClaw 对话。SSH 远程、服务器、Docker 容器——有终端就能聊。

### ⭐ TUI 交互模式

```bash
openclaw tui                         # 打开终端聊天界面（连接到 Gateway）
```

### 单次 Agent 调用

不需要交互界面，发一条消息就走：

```bash
openclaw agent --message "帮我总结今天的日程"                  # 本地执行
openclaw agent --message "Hello" --to +15555550123 --deliver  # 执行并投递到聊天渠道
openclaw agent --message "分析报告" --thinking high            # 使用深度思考
```

### 搜索文档

```bash
openclaw docs                        # 搜索 OpenClaw 官方文档
```

> 详见[第 11 章 Web 界面与客户端](/cn/adopt/chapter11/)。

---

## 网关管理

网关（Gateway）是 OpenClaw 的核心后台服务，所有消息收发、技能调用都通过它。默认地址 `ws://127.0.0.1:18789`。

### ⭐ 日常管理

```bash
openclaw gateway status              # 查看网关是否在运行
openclaw gateway start               # 启动网关服务
openclaw gateway stop                # 停止网关服务
openclaw gateway restart             # 重启（修改配置后需要重启生效）
```

### 启动选项

需要自定义启动方式时使用：

```bash
openclaw gateway --port 18789 --verbose     # 前台运行（调试模式，日志直接输出）
openclaw gateway --bind loopback            # 仅本机访问（默认，最安全）
openclaw gateway --bind lan                 # 局域网访问
openclaw gateway --bind tailnet             # Tailscale 网络访问
openclaw gateway --auth token --token <t>   # Token 认证
openclaw gateway --auth password --password <p>  # 密码认证
openclaw gateway --tailscale serve|funnel   # 通过 Tailscale 暴露服务
openclaw gateway --dev                      # 开发模式
```

### 服务安装

```bash
openclaw gateway install             # 安装为系统服务（开机自启）
openclaw gateway uninstall           # 卸载系统服务
```

### 健康检查

```bash
openclaw health                      # 🔧 网关健康状态
openclaw health --json               # JSON 格式输出（适合脚本解析）
openclaw health --verbose            # 详细信息
openclaw gateway call <method> --params '<json>'  # 🔧 直接调用网关 RPC 方法
```

> 详见[第 8 章 Gateway 运维与管理](/cn/adopt/chapter8/)。

---

## 渠道管理

渠道就是 OpenClaw 连接的聊天平台——Telegram、QQ、飞书、Discord、WhatsApp 等。

### ⭐ 添加渠道

```bash
openclaw channels add                # 交互式添加（推荐，有引导）

# 非交互式添加示例：
openclaw channels add \
  --channel telegram \
  --account alerts \
  --name "Alerts Bot" \
  --token $TELEGRAM_BOT_TOKEN

openclaw channels add \
  --channel discord \
  --account work \
  --name "Work Bot" \
  --token $DISCORD_BOT_TOKEN
```

### 查看状态

```bash
openclaw channels list               # ⭐ 列出所有已添加渠道
openclaw channels list --json        # JSON 格式
openclaw channels status             # 查看各渠道连接状态
openclaw channels status --probe     # 主动探测连接（更准确）
openclaw channels logs               # 查看渠道日志
openclaw channels logs --channel <name> --limit 200  # 指定渠道、限制条数
```

### 移除渠道

```bash
openclaw channels remove --channel <channel> --account <id>
openclaw channels remove --channel <channel> --account <id> --delete  # 同时删除数据
```

### 登录 / 登出（WhatsApp 等需要扫码的平台）

```bash
openclaw channels login              # 打开扫码登录
openclaw channels login --channel whatsapp --account <id> --verbose
openclaw channels logout             # 登出
openclaw channels logout --channel <channel> --account <id>
```

### ⭐ 配对管理

配对是 OpenClaw 的安全机制——新用户首次对话时需要审批。

```bash
openclaw pairing list                # 查看待审批配对请求
openclaw pairing approve <channel> <code>           # 批准配对
openclaw pairing approve --channel <channel> <code> --notify  # 批准并通知对方
```

> 详见[第 4 章 Chat Provider 配置](/cn/adopt/chapter4/)。

---

## Agent 管理

Agent 是 OpenClaw 的智能体——每个 Agent 有自己的模型、工作区和绑定渠道。

### 查看 Agent

```bash
openclaw agents list                 # ⭐ 列出所有 Agent
openclaw agents list --json          # JSON 格式
openclaw agents list --bindings      # 显示各 Agent 绑定了哪些渠道
```

### 添加 Agent

```bash
openclaw agents add                  # ⭐ 交互式添加（推荐）
openclaw agents add [name]           # 指定名称

# 非交互式（自动化部署用）：
openclaw agents add my-agent \
  --workspace ~/.openclaw/workspace-my-agent \
  --model anthropic/claude-sonnet-4-5 \
  --bind whatsapp:personal \
  --non-interactive
```

### 绑定渠道

一个 Agent 可以绑定多个渠道，一个渠道也可以被多个 Agent 共享。

```bash
openclaw agents bindings                              # 查看所有绑定关系
openclaw agents bindings --agent <id>                  # 查看指定 Agent 的绑定
openclaw agents bind --agent <id> --bind <channel[:accountId]>    # 添加绑定
openclaw agents unbind --agent <id> --bind <channel[:accountId]>  # 移除绑定
openclaw agents unbind --agent <id> --all              # 移除全部绑定
```

### 运行 Agent（手动触发）

```bash
openclaw agent --message "Hello" --to <dest>           # 发送一条消息
openclaw agent --message "Hello" --session-id <id>     # 在指定会话中发送
openclaw agent --message "Hello" --thinking high       # 使用深度思考
openclaw agent --message "Hello" --local               # 本地模式（不经网关）
openclaw agent --message "Hello" --channel whatsapp --deliver  # 发送并投递到渠道
```

### 删除 Agent

```bash
openclaw agents delete <id>          # 删除 Agent
openclaw agents delete <id> --force  # 强制删除（跳过确认）
```

---

## 技能与插件

技能（Skill）扩展 OpenClaw 的能力——搜索、日程、智能家居等都靠技能实现。插件（Plugin）则是更底层的扩展机制。

### 技能管理

```bash
openclaw skills list                 # ⭐ 列出已安装技能
openclaw skills list --eligible      # 仅显示可用技能（依赖已满足）
openclaw skills list -v              # 显示详情（含缺失依赖）
openclaw skills list --json          # JSON 格式
openclaw skills info <name>          # 查看技能详情
openclaw skills check                # 检查技能健康状态
```

> 安装新技能用 `clawhub` CLI，不是 `openclaw skills`。详见[附录 D 技能开发与发布指南](/cn/appendix/appendix-d)。

```bash
# clawhub 常用命令
npm i -g clawhub                     # 安装 clawhub CLI
clawhub search <keyword>             # 搜索技能
clawhub install <skillname>          # 安装技能
clawhub list                         # 列出已安装
clawhub update --all                 # 更新全部技能
clawhub uninstall <skillname>        # 卸载技能
```

### 插件管理

```bash
openclaw plugins list                # 列出已安装插件
openclaw plugins list --json         # JSON 格式
openclaw plugins info <id>           # 查看插件详情
openclaw plugins install <path|.tgz|npm-spec>  # 安装插件
openclaw plugins enable <id>         # 启用插件
openclaw plugins disable <id>        # 禁用插件
openclaw plugins doctor              # 插件诊断
```

---

## 模型管理

OpenClaw 支持多家模型提供商，使用 `provider/model-name` 格式标识模型。

### ⭐ 常用操作

```bash
openclaw models list                 # 列出可用模型
openclaw models status               # 查看当前使用的模型和状态
openclaw models set <model>          # 切换默认文本模型
openclaw models set-image <model>    # 切换默认图像模型
```

### 模型别名

嫌模型名太长？设置别名：

```bash
openclaw models aliases list                    # 查看别名列表
openclaw models aliases add <alias> <model>     # 添加别名（如 gpt → openai/gpt-4o）
openclaw models aliases remove <alias>          # 移除别名
```

### 模型回退

当主模型不可用时自动切换到备选模型：

```bash
openclaw models fallbacks list       # 查看回退链
openclaw models fallbacks add <model>           # 添加回退模型
openclaw models fallbacks remove <model>        # 移除回退模型
openclaw models fallbacks clear      # 清空回退链
```

### 模型认证

```bash
openclaw models auth add             # 🔧 添加模型提供商认证
openclaw models auth setup-token     # 🔧 设置 Token
openclaw models auth paste-token     # 🔧 粘贴 Token
openclaw models auth order get|set|clear  # 🔧 管理提供商优先级
```

> 模型配置详见[第 5 章 模型管理](/cn/adopt/chapter5/)，提供商对比见[附录 E 模型提供商选型指南](/cn/appendix/appendix-e)。

---

## 定时任务

让 OpenClaw 按时间规则自动执行任务——晨间简报、定时提醒、数据巡检都靠它。

### ⭐ 常用操作

```bash
openclaw cron list                   # 查看所有定时任务
openclaw cron status                 # 任务执行状态概览

# 添加任务（三种触发方式）：
openclaw cron add --name "晨间简报" --cron "0 8 * * *" --message "今日天气和日程" --channel "telegram:chat:123"
openclaw cron add --name "定时提醒" --every 10m --message "该喝水了"
openclaw cron add --name "延迟任务" --at 20m --message "20 分钟后提醒我"
```

### 管理任务

```bash
openclaw cron edit <id>              # 编辑任务
openclaw cron rm <id>                # 删除任务（注意是 rm，不是 delete）
openclaw cron enable <id>            # 启用任务
openclaw cron disable <id>           # 禁用任务
openclaw cron run <id>               # 立即手动触发一次
openclaw cron runs                   # 查看执行历史
```

### Channel 格式参考

`--channel` 参数格式因平台而异：

```
telegram:chat:<ChatID>
qqbot:c2c:<openid>
qqbot:group:<groupid>
feishu:chat:<ChatID>
discord:channel:<ChannelID>
```

---

## 消息发送

不通过聊天平台，直接在终端发消息：

### 发送消息

```bash
openclaw message send --target +15555550123 --message "Hello"
```

### 发送投票

```bash
openclaw message poll \
  --channel discord \
  --target channel:123 \
  --poll-question "午饭吃什么？" \
  --poll-option 火锅 \
  --poll-option 寿司
```

### 其他消息操作

```bash
openclaw message react               # 添加表情反应
openclaw message reactions            # 查看反应
openclaw message read                 # 标记已读
openclaw message edit                 # 编辑消息
openclaw message delete               # 删除消息
openclaw message pin                  # 置顶消息
openclaw message unpin                # 取消置顶
```

---

## 配置操作

OpenClaw 的配置可以通过 CLI 直接读写（配置文件结构详见[附录 G](/cn/appendix/appendix-g)）。

```bash
openclaw config get <path>           # 读取配置项
openclaw config get agents.defaults.workspace  # 示例：读取默认工作区路径

openclaw config set <path> <value>   # 设置配置项
openclaw config set agents.defaults.heartbeat.every "2h"  # 示例：设置心跳间隔
openclaw config set tools.profile full                     # 示例：设置工具配置
openclaw config set logging.level debug                    # 示例：开启调试日志

openclaw config unset <path>         # 删除配置项
openclaw config file                 # 查看配置文件路径
openclaw config validate             # 验证配置是否合法
openclaw config validate --json      # JSON 格式输出验证结果
```

> 配置文件完整说明见[附录 G](/cn/appendix/appendix-g)。

---

## 诊断与调试

遇到问题时，按这个顺序排查：Doctor → 日志 → 状态 → 安全审计。

### ⭐ 第一步：Doctor 诊断

```bash
openclaw doctor                      # 自动检测常见问题
openclaw doctor --fix                # 检测并自动修复
openclaw doctor --deep               # 深度扫描
```

### 查看日志

```bash
openclaw logs --follow               # ⭐ 实时跟踪日志流（类似 tail -f）
openclaw logs --limit 100            # 最近 100 条日志
openclaw logs --limit 100 --json     # JSON 格式（便于搜索）
openclaw logs --limit 50 --plain     # 纯文本格式
```

### 查看系统状态

```bash
openclaw status                      # ⭐ 运行状态总览
openclaw status --deep               # 深度健康检查
openclaw status --json               # JSON 格式
openclaw status --usage              # 包含用量信息
```

### 🔧 安全审计

```bash
openclaw security audit              # 安全审计
openclaw security audit --deep       # 深度安全扫描
openclaw security audit --fix        # 检测并自动修复安全问题
```

### 🔧 密钥管理

```bash
openclaw secrets reload              # 重新加载密钥
openclaw secrets audit               # 密钥安全审计
openclaw secrets configure           # 配置密钥
openclaw secrets apply --from <plan.json>  # 从计划文件批量应用
```

> 安全相关详见[第 10 章 安全防护与威胁模型](/cn/adopt/chapter10/)。

---

## 沙箱与安全

### 沙箱管理

沙箱为 Agent 提供隔离的运行环境，防止操作影响宿主系统：

```bash
openclaw sandbox list                # 列出沙箱容器
openclaw sandbox start               # 启动沙箱
openclaw sandbox stop                # 停止沙箱
```

> 沙箱详见[第 8 章 Gateway 运维](/cn/adopt/chapter8/)和[第 10 章 安全防护](/cn/adopt/chapter10/)。

### 执行审批

Agent 执行敏感操作时需要人工审批：

```bash
openclaw approvals list              # 查看待审批操作
openclaw approvals approve <id>      # 批准
openclaw approvals deny <id>         # 拒绝
```

### 🔧 Agent Hooks

```bash
openclaw hooks list                  # 列出已注册的 Agent Hook
openclaw hooks add                   # 添加 Hook
openclaw hooks remove <id>           # 移除 Hook
```

---

## 更多命令

以下命令使用频率较低，按需查阅。

### 记忆管理

OpenClaw 会自动记住对话上下文，这些命令用于手动管理记忆：

```bash
openclaw memory status               # 记忆系统状态
openclaw memory index                # 手动触发记忆索引
openclaw memory search "<query>"     # 搜索记忆内容
```

### 设备管理

远程设备（手机、平板等）连接到 OpenClaw 时需要审批：

```bash
openclaw devices list                # 列出所有设备
openclaw devices list --json         # JSON 格式
openclaw devices approve [requestId] # 批准设备
openclaw devices approve --latest    # 批准最新请求
openclaw devices reject <requestId>  # 拒绝设备
openclaw devices remove <deviceId>   # 移除已授权设备
openclaw devices clear --yes         # 清除所有设备
openclaw devices clear --yes --pending  # 仅清除待审批设备
```

### 浏览器管理

OpenClaw 内置了无头浏览器，用于网页操作类技能：

```bash
openclaw browser status              # 浏览器状态
openclaw browser start               # 启动浏览器
openclaw browser stop                # 停止浏览器
openclaw browser reset-profile       # 重置浏览器配置
openclaw browser tabs                # 查看打开的标签页
openclaw browser open <url>          # 打开网页
openclaw browser screenshot          # 截图
openclaw browser navigate <url>      # 导航到指定 URL
```

### 会话管理

```bash
openclaw sessions list               # 列出所有会话
openclaw sessions --json             # JSON 格式
openclaw sessions --verbose          # 详细信息
```

### 系统管理

```bash
openclaw system event                # 查看系统事件
openclaw system heartbeat last       # 最近一次心跳时间
openclaw system heartbeat enable     # 启用心跳
openclaw system heartbeat disable    # 禁用心跳
openclaw system presence             # 在线状态
```

### 备份与恢复

```bash
openclaw backup create               # 创建本地备份归档
openclaw backup verify               # 验证备份完整性
openclaw backup list                 # 列出已有备份
```

### Node 管理（无头节点）

在远程服务器上运行无头节点，由网关统一调度：

```bash
openclaw node start                  # 🔧 启动 Node Host 服务
openclaw node stop                   # 🔧 停止 Node Host
openclaw nodes list                  # 🔧 列出网关管理的所有节点
openclaw nodes pair                  # 🔧 配对新节点
```

### DNS 与网络发现

```bash
openclaw dns status                  # 🔧 DNS 发现状态（Tailscale + CoreDNS）
```

### Webhook

```bash
openclaw webhooks list               # 🔧 列出已配置的 Webhook
openclaw webhooks add                # 🔧 添加 Webhook
openclaw webhooks remove <id>        # 🔧 移除 Webhook
```

### 联系人与群组查询

```bash
openclaw directory self              # 查询自己的 ID
openclaw directory peers             # 查询联系人 ID
openclaw directory groups            # 查询群组 ID
```

### ACP（Agent Control Protocol）

```bash
openclaw acp status                  # 🔧 ACP 协议状态
```

### Shell 自动补全

```bash
openclaw completion                  # 生成 Shell 补全脚本（支持 bash/zsh/fish）
```

### iOS 配对

```bash
openclaw qr                         # 生成 iOS 配对二维码
```

### 用量统计与清理

```bash
openclaw usage today                 # 今日 Token 用量
openclaw usage month                 # 月度用量
openclaw usage --by-skill            # 按技能统计

openclaw cleanup --conversations --older-than 7d   # 清理旧对话
openclaw cleanup --skill-cache       # 清理技能缓存
openclaw cleanup --older-than 30d    # 清理 30 天前的数据
```

---

## 快捷别名

把常用命令设成短别名，省去重复敲长命令：

```bash
# 添加到 ~/.bashrc 或 ~/.zshrc
alias oc='openclaw'
alias oct='openclaw tui'
alias ocg='openclaw gateway'
alias ocs='openclaw skills'
alias oca='openclaw agents'
alias ocd='openclaw dashboard'
alias ocdr='openclaw doctor'
alias occh='openclaw channels'

# 一键启停
alias ocstart='openclaw gateway start && openclaw dashboard'
alias ocstop='openclaw gateway stop'
alias ocrestart='openclaw gateway restart'
```

---

## 故障速查

| 症状 | 先试这个 | 还不行的话 |
|------|----------|-----------|
| 网关启动失败 | `openclaw doctor --fix` | 检查端口占用：`lsof -i :18789` |
| Dashboard 打不开 | `openclaw gateway status` | 确认网关在运行，检查防火墙 |
| 渠道连不上 | `openclaw channels status --probe` | 检查 Token 是否过期，查看渠道日志 |
| 模型调用失败 | `openclaw models status` | 验证 API Key，检查余额 |
| 设备配对不成功 | `openclaw devices list` | 批准待处理请求 |
| 配置不生效 | `openclaw config validate` | 重启网关：`openclaw gateway restart` |
| TUI 连不上 | `openclaw gateway status` | 确认网关在运行，检查端口 |
| 什么都没用 | `openclaw doctor --deep` | 查看日志：`openclaw logs --limit 50` |

---

## 获取帮助

记不住命令？任何地方加 `--help`：

```bash
openclaw --help                      # 所有顶级命令
openclaw <command> --help             # 某个命令的子命令
openclaw channels add --help          # 具体命令的参数说明
```

---

**提示**：本速查表基于 OpenClaw 官方 CLI Reference 整理。命令可能随版本更新，建议访问 [OpenClaw 官方文档](https://docs.openclaw.ai/cli) 获取最新信息。
