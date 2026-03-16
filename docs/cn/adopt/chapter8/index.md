---
prev:
  text: '第7章 工具与定时任务'
  link: '/cn/adopt/chapter7'
next:
  text: '第9章 远程访问与网络'
  link: '/cn/adopt/chapter9'
---

# 第八章 网关运维

Gateway 是龙虾的神经中枢。本章教你管理它——启动、监控、排障。

> **前置条件**：已完成[第二章 OpenClaw 快速安装](/cn/adopt/chapter2/)，Gateway 已安装并运行。

## 0. Gateway 是什么？

Gateway 是 OpenClaw 的核心后台进程，负责连接聊天平台、调度 AI 模型、管理会话与工具。一台机器通常只运行一个 Gateway，默认监听 `ws://127.0.0.1:18789`，仅本机可访问。

```
用户消息 → [飞书/QQ/Telegram] → Gateway → AI 模型 → 用户
                                    ↕
                              控制面板 / CLI
```

## 1. 启动与管理

```bash
# 启动
openclaw gateway --port 18789

# 查看状态
openclaw gateway status    # 显示 "Runtime: running" + "RPC probe: ok" = 正常
openclaw status            # 整体状态

# 实时日志
openclaw logs --follow
```

### 作为系统服务运行（推荐）

注册为系统服务后开机自启、崩溃自动重启：

```bash
openclaw gateway install   # 安装服务
openclaw gateway restart   # 重启（应用配置变更）
openclaw gateway stop      # 停止
```

- **macOS**：LaunchAgent（`ai.openclaw.gateway`）
- **Linux / WSL2**：systemd 用户服务（`openclaw-gateway.service`）

<details>
<summary>开发者模式（Dev Profile）</summary>

独立的开发环境，不影响主 Gateway：

```bash
openclaw --dev setup
openclaw --dev gateway --allow-unconfigured
openclaw --dev status
```

Dev 模式使用隔离的状态/配置目录，默认端口 19001。

</details>

## 2. 配置管理

配置文件为 JSON5 格式（支持注释和尾逗号），结构详见[附录 G](/cn/appendix/appendix-g)。

| 编辑方式 | 命令/操作 |
|---------|---------|
| 配置向导 | `openclaw onboard` |
| CLI | `openclaw config set <key> <value>` |
| Web 控制面板 | `openclaw dashboard` |
| 直接编辑（不推荐） | 手动改 JSON 容易出错，详见[附录 G](/cn/appendix/appendix-g) |

**配置写错会怎样**：Gateway 拒绝启动，运行 `openclaw doctor` 查看原因，`openclaw doctor --fix` 自动修复。

### 配置热更新

通过 CLI 修改配置后**大部分设置自动生效，无需重启**。只有 `gateway.*`（端口、绑定、认证、TLS）和 `discovery`、`plugins` 等基础设施字段需要重启。

```json5
{
  gateway: {
    reload: { mode: "hybrid", debounceMs: 300 },  // 默认值
  },
}
```

<details>
<summary>热更新 vs 需要重启：完整对照表</summary>

| 类别 | 字段 | 需要重启？ |
|------|------|-----------|
| 渠道 | `channels.*`、`web` | 否 |
| Agent 与模型 | `agent`、`agents`、`models`、`routing` | 否 |
| 自动化 | `hooks`、`cron`、`agent.heartbeat` | 否 |
| 会话与消息 | `session`、`messages` | 否 |
| 工具与媒体 | `tools`、`browser`、`skills`、`audio`、`talk` | 否 |
| UI 与杂项 | `ui`、`logging`、`identity`、`bindings` | 否 |
| Gateway 服务器 | `gateway.*`（端口、绑定、认证、TLS、HTTP） | **是** |
| 基础设施 | `discovery`、`canvasHost`、`plugins` | **是** |

> `gateway.reload` 和 `gateway.remote` 是例外——修改它们不会触发重启。

</details>

<details>
<summary>环境变量</summary>

OpenClaw 读取环境变量的优先级：

1. 父进程传入的环境变量
2. 当前工作目录的 `.env` 文件
3. `~/.openclaw/.env`（全局兜底）

`.env` 文件不会覆盖已有的环境变量。你也可以在配置文件中内联设置：

```json5
{
  env: {
    OPENROUTER_API_KEY: "sk-or-...",
    vars: { GROQ_API_KEY: "gsk-..." },
  },
}
```

如果 Gateway 运行在 systemd/launchd 下，建议把 API Key 放在 `~/.openclaw/.env` 中，确保守护进程能读取。

</details>

<details>
<summary>配置 RPC（程序化更新）</summary>

控制面板写操作（`config.apply`、`config.patch`、`update.run`）有速率限制：每 60 秒最多 3 次请求（按 deviceId + clientIp 计算）。超限时返回 `UNAVAILABLE` 和 `retryAfterMs`。

</details>

<details>
<summary>常用配置模板</summary>

**推荐起步配置**：

```json5
{
  identity: {
    name: "Clawd",
    theme: "helpful assistant",
    emoji: "🦞",
  },
  agent: {
    workspace: "~/.openclaw/workspace",
    model: { primary: "anthropic/claude-sonnet-4-5" },
  },
  channels: {
    whatsapp: {
      allowFrom: ["+15555550123"],
      groups: { "*": { requireMention: true } },
    },
  },
}
```

**多平台配置**：

```json5
{
  agent: { workspace: "~/.openclaw/workspace" },
  channels: {
    whatsapp: { allowFrom: ["+15555550123"] },
    telegram: {
      enabled: true,
      botToken: "YOUR_TOKEN",
      allowFrom: ["123456789"],
    },
    discord: {
      enabled: true,
      token: "YOUR_TOKEN",
      dm: { allowFrom: ["123456789012345678"] },
    },
  },
}
```

**纯本地模型**：

```json5
{
  agent: {
    workspace: "~/.openclaw/workspace",
    model: { primary: "lmstudio/minimax-m2.5-gs32" },
  },
  models: {
    mode: "merge",
    providers: {
      lmstudio: {
        baseUrl: "http://127.0.0.1:1234/v1",
        apiKey: "lmstudio",
        api: "openai-responses",
        models: [
          {
            id: "minimax-m2.5-gs32",
            name: "MiniMax M2.5 GS32",
            reasoning: false,
            input: ["text"],
            cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
            contextWindow: 196608,
            maxTokens: 8192,
          },
        ],
      },
    },
  },
}
```

更多配置模板见[附录 G 配置文件详解](/cn/appendix/appendix-g)。

</details>

## 3. 认证与安全

Gateway 默认只监听本机（`127.0.0.1`）。**如需从外部访问（LAN、Tailnet），必须配置认证**，否则 Gateway 拒绝启动。

```json5
{
  gateway: {
    bind: "loopback",  // loopback | lan | tailnet | custom
    auth: { mode: "token", token: "你的网关密码" },
  },
}
```

### 模型 API Key

推荐放在 `~/.openclaw/.env`（守护进程场景必须放这里）：

```bash
cat >> ~/.openclaw/.env <<'EOF'
ANTHROPIC_API_KEY=sk-ant-...
OPENROUTER_API_KEY=sk-or-...
EOF

openclaw models status   # 验证
```

<details>
<summary>密钥管理（SecretRef）</summary>

对于生产环境，OpenClaw 支持 **SecretRef**——不需要把密钥明文写在配置文件中。支持三种来源：

**环境变量引用**：
```json5
{ source: "env", provider: "default", id: "OPENAI_API_KEY" }
```

**文件引用**：
```json5
{ source: "file", provider: "filemain", id: "/providers/openai/apiKey" }
```

**外部命令引用**（支持 1Password、HashiCorp Vault、sops 等）：
```json5
{ source: "exec", provider: "vault", id: "providers/openai/apiKey" }
```

配置密钥提供者：

```json5
{
  secrets: {
    providers: {
      default: { source: "env" },
      filemain: {
        source: "file",
        path: "~/.openclaw/secrets.json",
        mode: "json",
      },
      vault: {
        source: "exec",
        command: "/usr/local/bin/openclaw-vault-resolver",
        args: ["--profile", "prod"],
        passEnv: ["PATH", "VAULT_ADDR"],
      },
    },
  },
}
```

密钥管理命令：

```bash
openclaw secrets audit --check    # 检查明文密钥
openclaw secrets configure        # 交互式配置 SecretRef
openclaw secrets reload           # 刷新密钥快照
```

SecretRef 解析是**启动时一次性完成**的（不是每次请求时），解析失败会阻止 Gateway 启动。运行时使用内存中的快照，避免密钥提供者故障影响请求路径。

**1Password 集成示例**：

```json5
{
  secrets: {
    providers: {
      onepassword_openai: {
        source: "exec",
        command: "/opt/homebrew/bin/op",
        allowSymlinkCommand: true,
        trustedDirs: ["/opt/homebrew"],
        args: ["read", "op://Personal/OpenClaw QA API Key/password"],
        passEnv: ["HOME"],
        jsonOnly: false,
      },
    },
  },
  models: {
    providers: {
      openai: {
        baseUrl: "https://api.openai.com/v1",
        models: [{ id: "gpt-5", name: "gpt-5" }],
        apiKey: { source: "exec", provider: "onepassword_openai", id: "value" },
      },
    },
  },
}
```

</details>

<details>
<summary>反向代理认证（Trusted Proxy）</summary>

如果 OpenClaw 运行在身份感知代理（Pomerium、Caddy + OAuth、nginx + oauth2-proxy）后面，可以使用 `trusted-proxy` 模式：

```json5
{
  gateway: {
    bind: "loopback",
    trustedProxies: ["10.0.0.1"],
    auth: {
      mode: "trusted-proxy",
      trustedProxy: {
        userHeader: "x-forwarded-user",
        allowUsers: ["nick@example.com"],
      },
    },
  },
}
```

**nginx + oauth2-proxy 示例**：

```nginx
location / {
    auth_request /oauth2/auth;
    auth_request_set $user $upstream_http_x_auth_request_email;

    proxy_pass http://openclaw:18789;
    proxy_set_header X-Auth-Request-Email $user;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
}
```

> **安全警告**：此模式将认证完全委托给代理。必须确保：代理是唯一入口、`trustedProxies` 最小化、代理会覆盖（而非追加）转发头。启用后 `openclaw security audit` 会标记为 critical——这是故意的提醒。

</details>

<details>
<summary>安全审计与安全模型</summary>

定期运行安全审计（特别是修改配置或暴露网络后）：

```bash
openclaw security audit           # 基本审计
openclaw security audit --deep    # 深度审计
openclaw security audit --fix     # 自动修复
```

它会检查：Gateway 认证暴露、浏览器控制暴露、提权 allowlist、文件权限等常见问题。

**核心安全原则**：OpenClaw 采用**个人助理信任模型**——每个 Gateway 一个可信操作者。它不是敌对多租户安全边界。如果需要多用户隔离，应分开 Gateway + 凭证（最好分开操作系统用户/主机）。

</details>

## 4. 日志与健康检查

### 查看日志

```bash
openclaw logs --follow          # 实时
openclaw logs --limit 100       # 最近 100 条
openclaw logs --limit 100 --json  # JSON 格式
```

日志文件默认在 `/tmp/openclaw/openclaw-YYYY-MM-DD.log`。`--verbose` 只影响控制台输出；要在文件日志中捕获详细信息，设置 `logging.level: "debug"`。

<details>
<summary>日志级别配置</summary>

```json5
{
  logging: {
    level: "info",           // 文件日志级别
    consoleLevel: "info",    // 控制台日志级别
    consoleStyle: "pretty",  // pretty | compact | json
    redactSensitive: "tools",
  },
}
```

</details>

### 健康检查

```bash
openclaw status          # 总体状态（Gateway、渠道、会话）
openclaw status --deep   # 深度检查（含渠道探测）
openclaw health --json   # JSON 格式快照
```

### Doctor 自动诊断

遇到任何问题，先跑 `openclaw doctor`——它会自动检测并修复大多数常见问题。

```bash
openclaw doctor          # 交互式诊断
openclaw doctor --fix    # 自动修复
openclaw doctor --deep   # 扫描多余 Gateway 安装
```

<details>
<summary>Doctor 检查项完整列表</summary>

1. **可选更新**（git 安装时可选拉取最新代码）
2. **UI 协议刷新**（Protocol Schema 更新时重建控制面板 UI）
3. **健康检查 + 重启提示**
4. **技能状态摘要**（可用/缺失/阻塞）
5. **配置规范化**（遗留值格式迁移）
6. **OpenCode 提供商覆盖警告**
7. **遗留磁盘布局迁移**（会话、Agent 目录、WhatsApp 认证）
8. **遗留 Cron 存储迁移**
9. **状态完整性检查**（目录缺失、权限、云同步警告）
10. **模型认证健康**（OAuth 过期、冷却/禁用状态）
11. **Hooks 模型验证**
12. **沙箱镜像修复**
13. **Gateway 服务迁移和清理**
14. **安全警告**
15. **systemd linger 检查**（Linux）
16. **技能状态**
17. **Gateway 认证检查**
18. **运行时与端口诊断**
19. **运行时最佳实践**（Node vs Bun 检查）

</details>

## 5. Heartbeat 心跳机制

心跳让龙虾定时主动检查——不是被动等消息，而是主动巡逻。每次心跳都是完整的 Agent 对话轮，**间隔越短越烧 Token**。

```json5
{
  agents: {
    defaults: {
      heartbeat: {
        every: "30m",   // 每 30 分钟一次
        target: "last", // 发送到最近联系的渠道
      },
    },
  },
}
```

在工作区创建 `~/.openclaw/workspace/HEARTBEAT.md` 告诉龙虾检查什么。没有需要关注的事情时，龙虾回复 `HEARTBEAT_OK` 并静默；有重要事项才发送提醒。

```markdown
# 心跳检查清单

- 快速扫描：收件箱有紧急邮件吗？
- 如果某个任务被阻塞，在下次对话时提醒我
```

> 省钱：保持 `HEARTBEAT.md` 简短，或设置 `target: "none"` 只内部运行不发消息。

<details>
<summary>心跳高级配置</summary>

**活跃时段**（避免深夜打扰）：

```json5
{
  agents: {
    defaults: {
      heartbeat: {
        every: "30m",
        target: "last",
        activeHours: {
          start: "09:00",
          end: "22:00",
          timezone: "Asia/Shanghai",
        },
      },
    },
  },
}
```

**多 Agent 独立心跳**：

```json5
{
  agents: {
    defaults: {
      heartbeat: { every: "30m", target: "last" },
    },
    list: [
      { id: "main", default: true },
      {
        id: "ops",
        heartbeat: {
          every: "1h",
          target: "telegram",
          to: "12345678",
          prompt: "检查服务器状态，如果一切正常回复 HEARTBEAT_OK。",
        },
      },
    ],
  },
}
```

**可见性控制**（按渠道定制）：

- `showOk: false`（默认）：静默吞掉 `HEARTBEAT_OK`
- `showAlerts: true`（默认）：发送告警内容
- `useIndicator: true`（默认）：发出指示器事件

**手动触发心跳**：

```bash
openclaw system event --text "检查紧急跟进事项" --mode now
```

**轻量上下文模式**：

设置 `lightContext: true` 让心跳只注入 `HEARTBEAT.md`，减少上下文大小和 Token 消耗。

**推理过程透传**：

设置 `includeReasoning: true` 额外发送 `Reasoning:` 前缀的推理过程消息，方便了解龙虾为什么决定通知你。建议在群聊中关闭此选项。

</details>

## 6. 沙箱与工具策略

两个独立的安全控制层：

| 控制层 | 作用 | 配置 |
|--------|------|------|
| **沙箱** | 工具**在哪里**运行（Docker 容器 vs 宿主机） | `agents.defaults.sandbox.mode` |
| **工具策略** | **哪些工具**可用 | `tools.allow` / `tools.deny` |

```json5
{
  agents: {
    defaults: {
      sandbox: { mode: "non-main" },  // off | non-main | all
    },
  },
  tools: {
    deny: ["browser", "canvas"],  // deny 总是优先
  },
}
```

- `non-main`：群聊/渠道会话在 Docker 沙箱中运行，主会话直接在宿主机运行
- `all`：所有会话都沙箱化

```bash
openclaw sandbox explain   # 查看当前生效策略
```

<details>
<summary>工具分组（快捷写法）</summary>

工具策略支持 `group:*` 分组写法：

```json5
{
  tools: {
    sandbox: {
      tools: {
        allow: ["group:runtime", "group:fs", "group:sessions", "group:memory"],
      },
    },
  },
}
```

可用分组：

| 分组 | 包含工具 |
|------|---------|
| `group:runtime` | exec, bash, process |
| `group:fs` | read, write, edit, apply_patch |
| `group:sessions` | sessions_list, sessions_history 等 |
| `group:memory` | memory_search, memory_get |
| `group:ui` | browser, canvas |
| `group:automation` | cron, gateway |
| `group:messaging` | message |
| `group:openclaw` | 所有内置工具（不含插件工具） |

</details>

<details>
<summary>沙箱 Docker 镜像与设置</summary>

默认镜像：`openclaw-sandbox:bookworm-slim`

```bash
# 构建基础沙箱镜像
scripts/sandbox-setup.sh

# 构建功能更全的镜像（含 curl、jq、nodejs、python3、git）
scripts/sandbox-common-setup.sh

# 构建沙箱浏览器镜像
scripts/sandbox-browser-setup.sh
```

默认沙箱容器**没有网络**访问。如需网络，设置 `agents.defaults.sandbox.docker.network`。

**自定义绑定挂载**：

```json5
{
  agents: {
    defaults: {
      sandbox: {
        docker: {
          binds: ["/home/user/source:/source:ro", "/var/data/myapp:/data:ro"],
        },
      },
    },
  },
}
```

> **安全注意**：绑定挂载会穿透沙箱文件系统。OpenClaw 会阻止危险的绑定源（如 `docker.sock`、`/etc`、`/proc`、`/sys`）。敏感挂载建议使用 `:ro`。

**容器内一次性初始化**（`setupCommand`）：

```json5
{
  agents: {
    defaults: {
      sandbox: {
        docker: {
          setupCommand: "apt-get update && apt-get install -y curl jq",
          network: "bridge",        // 安装包需要网络
          readOnlyRoot: false,      // 安装包需要写权限
          user: "0:0",             // 安装包需要 root
        },
      },
    },
  },
}
```

</details>

## 7. 远程访问与网络

### 网络模型

Gateway 默认只监听本机回环地址（`127.0.0.1:18789`）。远程访问有三种方式：

| 方式 | 适用场景 | 推荐度 |
|------|---------|--------|
| **Tailscale / VPN** | 跨网络安全访问 | 推荐 |
| **SSH 隧道** | 任何有 SSH 的环境 | 通用兜底 |
| **LAN 绑定** | 局域网内访问 | 需配合认证 |

### SSH 隧道（最简单）

```bash
ssh -N -L 18789:127.0.0.1:18789 user@远程主机
```

然后本地客户端连接 `ws://127.0.0.1:18789`。即使通过 SSH 隧道，配置了认证的 Gateway 仍然要求客户端发送 token/password。

### Tailscale 绑定

```json5
{
  gateway: {
    bind: "tailnet",
    auth: {
      mode: "token",
      token: "你的网关密码",
    },
    tailscale: { mode: "serve" },
  },
}
```

<details>
<summary>LAN 发现（Bonjour / mDNS）</summary>

Gateway 可以通过 Bonjour 在局域网内广播自己的 WebSocket 端点，方便客户端自动发现：

- 服务类型：`_openclaw-gw._tcp`
- TXT 记录包含端口、TLS 状态、Tailnet DNS 等提示信息

**Bonjour 限制**：仅限同一局域网，不跨网络。跨网络请使用 Tailscale 或 SSH。

调试命令（macOS）：

```bash
dns-sd -B _openclaw-gw._tcp local.    # 浏览实例
dns-sd -L "<实例名>" _openclaw-gw._tcp local.  # 解析详情
```

**跨网络 Bonjour（Wide-Area DNS-SD over Tailscale）**：

如果节点和 Gateway 在不同网络，可以通过 Tailscale 配合 unicast DNS-SD 实现跨网络发现：

```json5
{
  gateway: { bind: "tailnet" },
  discovery: { wideArea: { enabled: true } },
}
```

一次性 DNS 服务器设置：`openclaw dns setup --apply`

禁用广播：设置环境变量 `OPENCLAW_DISABLE_BONJOUR=1`。

</details>

<details>
<summary>多 Gateway 运行（高级）</summary>

大多数场景只需一个 Gateway。如果需要严格隔离或冗余（比如救援 Bot），可以运行多个 Gateway。

**每个实例必须唯一的配置**：

- `gateway.port`（或 `--port`）
- `OPENCLAW_CONFIG_PATH`
- `OPENCLAW_STATE_DIR`
- `agents.defaults.workspace`

**推荐使用 Profile 隔离**：

```bash
# 主 Gateway
openclaw --profile main gateway --port 18789

# 救援 Gateway
openclaw --profile rescue gateway --port 19001

# 分别安装为系统服务
openclaw --profile main gateway install
openclaw --profile rescue gateway install

# 分别检查状态
openclaw --profile main status
openclaw --profile rescue status
```

端口间距建议：至少间隔 20 个端口，避免派生端口（浏览器 CDP 等）冲突。

</details>

<details>
<summary>Gateway 锁机制</summary>

Gateway 使用 TCP 端口绑定作为锁——同一端口只能运行一个实例。

- 如果端口被占用，启动时抛出 `GatewayLockError`
- 进程退出（包括崩溃和 SIGKILL）时，操作系统自动释放端口
- 不需要额外的锁文件或清理步骤

如果端口被其他进程占用，使用 `openclaw gateway --port <其他端口>` 或 `--force` 强制释放。

</details>

<details>
<summary>HTTP API 端点（开发者 / 集成场景）</summary>

## 8. HTTP API 端点

Gateway 可以提供 HTTP API 端点，**默认关闭**，需手动启用。

> **安全警告**：HTTP 端点 = 完整操作者权限。**不要暴露在公网**，仅限 loopback / Tailnet / 私有网络。

### OpenAI Chat Completions 兼容端点

```json5
{
  gateway: {
    http: { endpoints: { chatCompletions: { enabled: true } } },
  },
}
```

```bash
curl -sS http://127.0.0.1:18789/v1/chat/completions \
  -H 'Authorization: Bearer 你的网关密码' \
  -H 'Content-Type: application/json' \
  -d '{"model": "openclaw:main", "messages": [{"role":"user","content":"你好"}]}'
```

支持流式输出：加 `"stream": true`，响应格式为 SSE，以 `data: [DONE]` 结束。

### OpenResponses 兼容端点

```json5
{
  gateway: {
    http: { endpoints: { responses: { enabled: true } } },
  },
}
```

```bash
curl -sS http://127.0.0.1:18789/v1/responses \
  -H 'Authorization: Bearer 你的网关密码' \
  -H 'Content-Type: application/json' \
  -d '{"model": "openclaw:main", "input": "你好"}'
```

### Tools Invoke 端点（默认开启）

```bash
curl -sS http://127.0.0.1:18789/tools/invoke \
  -H 'Authorization: Bearer 你的网关密码' \
  -H 'Content-Type: application/json' \
  -d '{"tool": "sessions_list", "action": "json", "args": {}}'
```

### Agent 选择

通过 `model` 字段选择 Agent：`"openclaw:main"`、`"openclaw:beta"`、`"agent:ops"`。
或通过 Header：`x-openclaw-agent-id: main`。

### CLI Backends（本地 AI CLI 备用通道）

```bash
openclaw agent --message "hi" --model claude-cli/opus-4.6
openclaw agent --message "hi" --model codex-cli/gpt-5.4
```

作为 fallback 配置：

```json5
{
  agents: {
    defaults: {
      model: {
        primary: "anthropic/claude-opus-4-6",
        fallbacks: ["claude-cli/opus-4.6"],
      },
    },
  },
}
```

限制：CLI Backend 模式无 OpenClaw 工具调用，不支持流式输出。

</details>

<details>
<summary>后台命令执行（exec / process 工具）</summary>

Gateway 通过 `exec` 工具运行 Shell 命令，`process` 工具管理后台任务。

### exec 工具参数

| 参数 | 说明 |
|------|------|
| `command` | 要执行的命令（必填） |
| `background` | 立即后台执行 |
| `timeout` | 超时秒数，默认 1800（30 分钟） |
| `yieldMs` | 自动后台化延迟，默认 10000ms |
| `elevated` | 在宿主机运行（沙箱模式下） |

前台命令直接返回输出；后台命令返回 `sessionId`，后续用 `process` 工具查询。

### process 工具操作

| 操作 | 说明 |
|------|------|
| `list` | 列出运行中和已完成的后台任务 |
| `poll` | 读取新输出（含退出状态） |
| `log` | 读取完整输出日志（支持 offset + limit） |
| `write` | 发送 stdin 输入 |
| `kill` | 终止后台任务 |
| `clear` | 清除已完成任务的内存记录 |

```json5
{
  tools: {
    exec: {
      backgroundMs: 10000,   // 自动后台化延迟（毫秒）
      timeoutSec: 1800,      // 超时（秒）
      cleanupMs: 1800000,    // 完成后清理延迟（毫秒）
      notifyOnExit: true,    // 后台任务退出时触发心跳通知
    },
  },
}
```

> 后台任务在进程重启时丢失（不持久化到磁盘）。

</details>

## 10. 故障排查

遇到问题时，按顺序运行：

```bash
openclaw status                    # 总体状态
openclaw gateway status            # Gateway 状态
openclaw logs --follow             # 实时日志
openclaw doctor                    # 自动诊断（大多数问题到这里就解决了）
openclaw channels status --probe   # 渠道探测
```

### 常见问题速查

**Gateway 拒绝启动**：

| 报错 | 原因 | 解决 |
|------|------|------|
| `refusing to bind gateway ... without auth` | 非 loopback 绑定但未配置认证 | 配置 `gateway.auth.token` |
| `another gateway instance is already listening` / `EADDRINUSE` | 端口被占用 | 换端口或 `--force` |
| `Gateway start blocked: set gateway.mode=local` | 配置了 remote 模式 | 设置 `gateway.mode="local"` |

**没有回复**：

| 现象 | 检查项 |
|------|--------|
| 渠道已连接但无回复 | DM 策略（pairing / allowlist）、群聊提及规则（requireMention） |
| 配对待审批 | `openclaw pairing list --channel <渠道>` |
| 消息被策略过滤 | 日志中搜索 `blocked`、`pairing request`、`mention required` |

**控制面板无法连接**：

| 报错 | 解决 |
|------|------|
| `device identity required` | 非安全上下文或缺少设备认证 |
| `unauthorized` | 认证令牌不匹配，检查 `gateway.auth.token` |
| `gateway connect failed` | 检查 URL/端口是否正确 |

**心跳 / Cron 不工作**：

```bash
openclaw cron list                        # 查看 Cron 任务
openclaw cron runs --id <jobId> --limit 20  # 查看执行历史
openclaw system heartbeat last            # 上次心跳信息
```

常见原因：Cron 未启用、活跃时段外被跳过、DM 策略阻止投递（`directPolicy: "block"`）。

<details>
<summary>升级后出现问题</summary>

升级后大多数问题是配置漂移或更严格的默认值被强制执行：

1. **认证和 URL 行为变化**
   - `gateway.mode=remote` 时 CLI 可能指向远程
   - 检查 `openclaw config get gateway.mode` 和 `gateway.auth.mode`

2. **绑定和认证规则更严格**
   - 非 loopback 绑定现在必须配置认证
   - `gateway.token`（旧）不等于 `gateway.auth.token`（新）

3. **配对和设备身份状态变化**
   - 检查 `openclaw devices list` 和 `openclaw pairing list`

如果服务配置和运行时不一致，重新安装服务元数据：

```bash
openclaw gateway install --force
openclaw gateway restart
```

</details>

<details>
<summary>浏览器工具故障</summary>

```bash
openclaw browser status
openclaw browser start --browser-profile openclaw
openclaw browser profiles
openclaw doctor
```

常见问题：
- `Failed to start Chrome CDP on port` — 浏览器进程启动失败
- `browser.executablePath not found` — 配置的路径无效
- `Chrome extension relay is running, but no tab is connected` — 扩展 relay 未连接

</details>

## 11. 常见问题

**Q: 配置写错了 Gateway 不启动怎么办？**

A: `openclaw doctor`——它会告诉你哪里出错，`--fix` 自动修复大部分问题。

**Q: 端口和绑定的优先级？**

A: 端口：`--port` > `OPENCLAW_GATEWAY_PORT` > `gateway.port` > `18789`。绑定：CLI 覆盖 > `gateway.bind` > `loopback`。

**Q: 心跳太频繁会不会很贵？**

A: 会。建议：间隔 `1h` 以上、`HEARTBEAT.md` 保持简短、或设 `target: "none"` 只做内部检查。

**Q: 沙箱和提权（Elevated）是什么关系？**

A: 沙箱决定工具在哪里运行。提权是沙箱的"逃逸口"——在沙箱中但需要在宿主机执行命令时使用。`openclaw sandbox explain` 查看当前策略。

**Q: 多人共用一个 Gateway 安全吗？**

A: OpenClaw 是**单用户个人助理模型**，不是多租户系统。多人共用 = 共享工具授权。需要隔离时运行独立 Gateway 实例。

**Q: 如何在本地模型和云端模型之间切换？**

A: 详见[第五章 模型管理](/cn/adopt/chapter5/)。简短版：`models.mode: "merge"` + `model.fallbacks`，本地挂掉自动切云端。
