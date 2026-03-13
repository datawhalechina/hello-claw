# 第九章 远程访问与网络

> 本章介绍如何从其他设备远程访问你的 OpenClaw Gateway：SSH 隧道、Tailscale 组网、macOS 客户端配置和安全最佳实践。读完本章，你将能从任何地方安全地控制你的 Gateway。

> **前置条件**：已完成[第八章 网关运维](/cn/adopt/chapter8/)，Gateway 已安装并正常运行。

## 0. 为什么需要远程访问？

Gateway 默认只监听本机回环地址（`127.0.0.1:18789`），这意味着只有运行 Gateway 的那台机器才能访问它。但在实际使用中，你经常需要：

- **笔记本远程控制**：台式机 24 小时运行 Gateway，笔记本随时连接
- **手机/平板接入**：iOS/Android 节点连接到家中或云端的 Gateway
- **服务器部署**：Gateway 运行在 VPS 上，本地设备远程访问

核心思路很简单：**Gateway 在哪台机器上运行，那台机器就是"大脑"**，其他设备都是通过网络连接到它的"遥控器"。

## 1. 三种远程方案一览

| 方案 | 适用场景 | 难度 | 推荐度 |
|------|---------|------|--------|
| **SSH 隧道** | 有 SSH 访问权限的任何环境 | ⭐ | 通用兜底 |
| **Tailscale 组网** | 跨网络安全访问 | ⭐⭐ | 最推荐 |
| **LAN 直连** | 同一局域网内 | ⭐ | 需配合认证 |

> **简单原则**：如果你不确定用哪种，先用 SSH 隧道——它在任何有 SSH 的环境下都能工作。如果你需要更好的体验（自动 HTTPS、无需手动转发），用 Tailscale。

## 2. SSH 隧道（最通用的方式）

SSH 隧道的原理是把远程 Gateway 的端口"映射"到你的本地机器，让本地客户端以为 Gateway 就在本机运行。

### 2.1 快速开始

**Step 1：建立隧道**

```bash
ssh -N -L 18789:127.0.0.1:18789 user@远程主机IP
```

> `-N` 表示只做端口转发，不执行远程命令。`18789` 是 Gateway 的默认端口。

**Step 2：验证连接**

打开另一个终端窗口：

```bash
openclaw status        # 应显示远程 Gateway 的状态
openclaw status --deep  # 深度健康检查
```

如果看到 Gateway 状态输出，说明隧道已经通了。

### 2.2 配置 SSH Config（推荐）

每次输入完整命令很麻烦，可以在 SSH 配置文件中保存连接信息。

编辑 `~/.ssh/config`，添加：

```
Host my-gateway
    HostName 172.27.187.184        # 替换为你的远程主机 IP
    User jefferson                  # 替换为你的用户名
    LocalForward 18789 127.0.0.1:18789
    IdentityFile ~/.ssh/id_rsa
```

之后只需：

```bash
ssh -N my-gateway
```

### 2.3 免密码登录

首次设置时，把你的公钥复制到远程主机：

```bash
ssh-copy-id -i ~/.ssh/id_rsa user@远程主机IP
```

输入一次密码后，以后连接不再需要密码。

### 2.4 Gateway Token 认证

即使通过 SSH 隧道连接，如果 Gateway 配置了认证（推荐），客户端仍需提供 token。

设置 Gateway token 环境变量：

```bash
# macOS
launchctl setenv OPENCLAW_GATEWAY_TOKEN "你的token"

# Linux
export OPENCLAW_GATEWAY_TOKEN="你的token"
```

或者在配置文件中持久化远程连接信息：

```json5
{
  gateway: {
    mode: "remote",
    remote: {
      url: "ws://127.0.0.1:18789",
      token: "你的token",
    },
  },
}
```

> 当 Gateway 绑定在 loopback 时，URL 保持 `ws://127.0.0.1:18789`，SSH 隧道负责把流量转发到远程。

<details>
<summary>macOS 隧道自动启动（LaunchAgent）</summary>

每次手动启动 SSH 隧道很麻烦，可以创建 macOS Launch Agent 实现开机自动启动。

**创建 plist 文件**

保存为 `~/Library/LaunchAgents/ai.openclaw.ssh-tunnel.plist`：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN"
  "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key>
    <string>ai.openclaw.ssh-tunnel</string>
    <key>ProgramArguments</key>
    <array>
        <string>/usr/bin/ssh</string>
        <string>-N</string>
        <string>my-gateway</string>
    </array>
    <key>KeepAlive</key>
    <true/>
    <key>RunAtLoad</key>
    <true/>
</dict>
</plist>
```

**加载 Launch Agent**

```bash
launchctl bootstrap gui/$UID ~/Library/LaunchAgents/ai.openclaw.ssh-tunnel.plist
```

隧道会：
- 开机自动启动
- 崩溃后自动重连
- 在后台静默运行

**常用管理命令**

```bash
# 检查隧道是否运行
ps aux | grep "ssh -N my-gateway" | grep -v grep

# 检查端口占用
lsof -i :18789

# 重启隧道
launchctl kickstart -k gui/$UID/ai.openclaw.ssh-tunnel

# 停止隧道
launchctl bootout gui/$UID/ai.openclaw.ssh-tunnel
```

</details>

<details>
<summary>Linux 隧道自动启动（systemd）</summary>

在 Linux 上可以用 systemd 实现自动启动。

创建 `~/.config/systemd/user/openclaw-tunnel.service`：

```ini
[Unit]
Description=OpenClaw SSH Tunnel
After=network-online.target

[Service]
ExecStart=/usr/bin/ssh -N -L 18789:127.0.0.1:18789 my-gateway
Restart=always
RestartSec=10

[Install]
WantedBy=default.target
```

启用并启动：

```bash
systemctl --user enable --now openclaw-tunnel
systemctl --user status openclaw-tunnel  # 检查状态
```

</details>

## 3. Tailscale 组网（推荐方案）

[Tailscale](https://tailscale.com) 是一个零配置 VPN 工具，能让你的设备像在同一局域网一样互联。OpenClaw 内置了 Tailscale 集成，提供三种模式。

### 3.1 三种 Tailscale 模式

| 模式 | 说明 | 适用场景 |
|------|------|---------|
| `serve` | 通过 Tailscale Serve 暴露（tailnet 内部） | 个人使用，推荐 |
| `funnel` | 通过 Tailscale Funnel 公开到互联网 | 需要公网访问 |
| `off` | 不使用 Tailscale（默认） | 纯 SSH 或 LAN |

另外还有一种不通过 Serve/Funnel 的 **直接绑定** 模式（`gateway.bind: "tailnet"`）。

### 3.2 Tailscale Serve（推荐）

最安全的方案：Gateway 保持 loopback 绑定，Tailscale 提供 HTTPS 加密和路由。

```json5
{
  gateway: {
    bind: "loopback",
    tailscale: { mode: "serve" },
  },
}
```

配置后访问：`https://<你的MagicDNS地址>/`

> **Tailscale Serve 的优势**：自动 HTTPS 证书、tailnet 内免 token 认证（需开启 `allowTailscale`）、无需手动端口转发。

<details>
<summary>免 Token 认证（Tailscale 身份验证）</summary>

当 `tailscale.mode = "serve"` 且 `gateway.auth.allowTailscale: true` 时，Tailscale 会注入身份头（`tailscale-user-login`），Gateway 通过本地 Tailscale 守护进程验证请求者身份。

这意味着 tailnet 内的设备访问 Control UI 和 WebSocket **不需要 token/password**。

但注意：
- **HTTP API 端点**（如 `/v1/*`、`/tools/invoke`）**仍需 token/password 认证**
- 这种免 token 模式假设 Gateway 主机是可信的
- 如果主机上可能运行不受信任的代码，应禁用此功能：

```json5
{
  gateway: {
    auth: { allowTailscale: false },
  },
}
```

</details>

### 3.3 直接绑定 Tailnet IP

不使用 Serve/Funnel，让 Gateway 直接监听 Tailscale 分配的 IP：

```json5
{
  gateway: {
    bind: "tailnet",
    auth: {
      mode: "token",
      token: "你的token",
    },
  },
}
```

从其他 Tailnet 设备连接：
- Control UI：`http://<tailscale-ip>:18789/`
- WebSocket：`ws://<tailscale-ip>:18789`

> 注意：这种模式下 `http://127.0.0.1:18789` 不可用。

### 3.4 Tailscale Funnel（公网访问）

Funnel 会把 Gateway 暴露到公共互联网。**必须配置密码认证**：

```json5
{
  gateway: {
    bind: "loopback",
    tailscale: { mode: "funnel" },
    auth: {
      mode: "password",
      password: "替换为强密码",
    },
  },
}
```

> 建议使用环境变量 `OPENCLAW_GATEWAY_PASSWORD` 代替在配置文件中写明密码。

**Funnel 限制**：
- 需要 Tailscale v1.38.3+
- 需要启用 MagicDNS 和 HTTPS
- 只支持端口 443、8443、10000
- macOS 需要使用开源版 Tailscale 客户端
- **不注入身份头**，所以无法免 token 认证

### 3.5 CLI 快捷命令

```bash
openclaw gateway --tailscale serve                   # 启用 Serve
openclaw gateway --tailscale funnel --auth password   # 启用 Funnel
```

<details>
<summary>Tailscale 前置条件</summary>

- 安装 Tailscale CLI 并登录（`tailscale up`）
- **Serve**：tailnet 需启用 HTTPS（CLI 会提示）
- **Funnel**：需要 v1.38.3+、MagicDNS、HTTPS 和 funnel 节点属性
- macOS Funnel 需要开源版 Tailscale app

参考文档：
- [Tailscale Serve 概览](https://tailscale.com/kb/1312/serve)
- [Tailscale Funnel 概览](https://tailscale.com/kb/1223/tailscale-funnel)

</details>

## 4. 常见部署架构

### 架构一：云服务器 24 小时在线

**适合场景**：笔记本经常合盖休眠，但需要 Gateway 始终在线。

![云服务器 24 小时在线部署架构：Gateway 部署在 VPS 上，笔记本通过 SSH 隧道远程连接](/OpenClaw云服务器.png)

```mermaid
flowchart LR

A["VPS / 家庭服务器
Gateway（24h Online）
Loopback 绑定"]

B["你的笔记本
远程控制"]

B -->|SSH / Tailscale Tunnel| A
```

推荐配置：
- Gateway `bind: "loopback"`
- 使用 Tailscale Serve 或 SSH 隧道访问

### 架构二：台式机 + 笔记本

**适合场景**：台式机运行 Gateway，笔记本作为遥控器。

macOS 用户可以使用 OpenClaw.app 的 **"Remote over SSH"** 模式：

1. 打开 OpenClaw.app → Settings → General → "OpenClaw runs"
2. 选择 "Remote over SSH"
3. App 会自动管理 SSH 隧道，WebChat 和健康检查"开箱即用"

### 架构三：笔记本运行 Gateway，其他设备访问

**适合场景**：笔记本是主力机，偶尔需要从其他设备访问。

- 从其他机器通过 SSH 隧道连接，或
- 用 Tailscale Serve 暴露 Control UI，Gateway 保持 loopback

## 5. 消息流转路径

理解消息如何在 Gateway 和节点之间流转，有助于排查远程访问问题：

```
Telegram 消息
    ↓
Gateway 接收消息
    ↓
Gateway 运行 Agent，决定是否调用节点工具
    ↓
Gateway 通过 WebSocket 调用节点（node.* RPC）
    ↓
节点返回结果
    ↓
Gateway 回复 Telegram
```

**关键点**：
- 节点**不**运行 Gateway 服务，它们只是外围设备
- 只有一个 Gateway 应该运行在一台主机上（除非使用 `--profile` 隔离）
- macOS app 的"节点模式"只是通过 WebSocket 连接到 Gateway 的客户端

## 6. 凭证与认证

远程访问时，正确配置凭证至关重要。Gateway 的凭证解析遵循严格的优先级顺序。

### 6.1 基本规则

- **显式凭证**（`--token`、`--password`）始终优先
- **CLI `--url` 覆盖**：不会复用配置文件中的凭证，必须同时传 `--token` 或 `--password`
- **环境变量 URL 覆盖**：只使用环境变量中的凭证

### 6.2 本地模式凭证优先级

```
Token: --token > OPENCLAW_GATEWAY_TOKEN > gateway.auth.token > gateway.remote.token
Password: --password > OPENCLAW_GATEWAY_PASSWORD > gateway.auth.password > gateway.remote.password
```

### 6.3 远程模式凭证优先级

```
Token: gateway.remote.token > OPENCLAW_GATEWAY_TOKEN > gateway.auth.token
Password: --password > OPENCLAW_GATEWAY_PASSWORD > gateway.remote.password > gateway.auth.password
```

<details>
<summary>凭证解析细节</summary>

- `gateway.remote.token` / `gateway.remote.password` 是**客户端凭证来源**，不控制服务端认证
- 本地调用路径在 `gateway.auth.*` 未设置时，可以回退到 `gateway.remote.*`
- 如果 `gateway.auth.token` 通过 SecretRef 配置但解析失败，认证**直接失败**（不会回退到 remote，避免掩盖配置错误）
- Remote probe/status 的 token 检查默认是严格的：只使用 `gateway.remote.token`，不回退本地 token
- 旧版 `CLAWDBOT_GATEWAY_*` 环境变量仅用于兼容调用路径

</details>

## 7. 安全最佳实践

### 黄金规则

> **保持 Gateway loopback 绑定，除非你确定需要对外暴露。**

### 安全检查清单

| 配置 | 建议 |
|------|------|
| Gateway 绑定 | `loopback` + SSH 或 Tailscale Serve（最安全） |
| 非 loopback 绑定 | **必须**配置 token 或 password 认证 |
| 明文 `ws://` | 仅限 loopback。私有网络需设置 `OPENCLAW_ALLOW_INSECURE_PRIVATE_WS=1` |
| TLS 指纹锁定 | 远程 wss:// 连接用 `gateway.remote.tlsFingerprint` 固定证书 |
| Tailscale Serve | 可用 `allowTailscale: true` 免 token，但 HTTP API 仍需认证 |
| Funnel | **必须**使用 password 认证（自动强制） |
| 浏览器控制 | 视为 operator 权限——tailnet-only + 谨慎节点配对 |

<details>
<summary>浏览器代理控制的安全注意</summary>

如果你在一台机器上运行 Gateway，但想在另一台机器上控制浏览器：

- 在浏览器所在机器运行节点（node host），两台机器保持在同一 tailnet
- Gateway 会通过 WebSocket 将浏览器操作代理到节点
- **不需要**额外的 Serve URL 或控制服务器
- **避免用 Funnel 做浏览器控制**——节点配对应视同 operator 权限

</details>

## 8. 故障排查

### 隧道连不上

```bash
# 检查 SSH 隧道是否运行
ps aux | grep "ssh -N" | grep -v grep

# 检查端口是否被占用
lsof -i :18789

# 手动测试连接
openclaw status
```

### 常见问题

| 症状 | 可能原因 | 解决方法 |
|------|---------|---------|
| `connection refused` | 隧道未建立或 Gateway 未运行 | 检查 SSH 隧道和 Gateway 状态 |
| `401 Unauthorized` | Token 不匹配 | 检查 `OPENCLAW_GATEWAY_TOKEN` 是否与 Gateway 配置一致 |
| Tailscale Serve 无法访问 | HTTPS 未启用 | 在 Tailscale 管理控制台启用 HTTPS |
| Funnel 启动失败 | 未配置密码或版本过低 | 设置 `auth.mode: "password"` 并升级 Tailscale |
| `--url` 参数认证失败 | `--url` 不复用配置文件凭证 | 同时传 `--token` 或 `--password` |

### 验证远程连接

```bash
# 通过 SSH 隧道
ssh -N -L 18789:127.0.0.1:18789 my-gateway &
openclaw status --deep

# 通过 Tailscale
openclaw gateway status --url ws://<tailscale-ip>:18789 --token 你的token
```

## 小结

| 你的场景 | 推荐方案 |
|---------|---------|
| 有 SSH 就行，最简单 | SSH 隧道 + loopback |
| 多设备跨网络，最佳体验 | Tailscale Serve + loopback |
| 需要公网访问 | Tailscale Funnel + password |
| 同一局域网 | LAN 绑定 + token 认证 |

**下一步**：
- 安全防护与威胁模型 → [第十章](/cn/adopt/chapter10/)
- Gateway 运维细节（配置热更新、日志、心跳、沙箱等）→ [第八章](/cn/adopt/chapter8/)
- 查看完整配置参考 → [附录 G 配置文件详解](/cn/appendix/appendix-g)
- 查看命令速查 → [附录 F 命令速查表](/cn/appendix/appendix-f)
