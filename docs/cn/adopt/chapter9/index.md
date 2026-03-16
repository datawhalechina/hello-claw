---
prev:
  text: '第8章 网关运维'
  link: '/cn/adopt/chapter8'
next:
  text: '第10章 安全防护与威胁模型'
  link: '/cn/adopt/chapter10'
---

# 第九章 远程访问与网络

想在外面也能控制家里的龙虾？本章搞定远程访问。

> **前置条件**：已完成[第八章 网关运维](/cn/adopt/chapter8/)，Gateway 正常运行。

Gateway 默认只在本机运行（`127.0.0.1:18789`）。要从其他设备访问，你需要一条"通道"。**两分钟版本：** 推荐 Tailscale，安装后一行命令搞定。

## 1. 选哪种方案？

| 方案 | 适用场景 | 难度 |
|------|---------|------|
| **Tailscale 组网** | 多设备跨网络，体验最好 | ⭐⭐ |
| **SSH 隧道** | 有 SSH 就能用，最通用 | ⭐ |
| **LAN 直连** | 同一局域网内 | ⭐ |

不确定选哪个？**从 Tailscale 开始**——自动 HTTPS、无需手动转发、多设备共享。

## 2. SSH 隧道（最通用的方式）

在咖啡厅想连回家里的 Gateway？一行命令建立隧道：

```bash
ssh -N -L 18789:127.0.0.1:18789 user@远程主机IP
```

打开另一个终端验证：

```bash
openclaw status --deep
```

看到 Gateway 状态就说明通了。

<details>
<summary>嫌每次输长命令麻烦？配置 SSH Config 简化</summary>

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

**免密登录**：把公钥复制到远程主机，以后不再输密码：

```bash
ssh-copy-id -i ~/.ssh/id_rsa user@远程主机IP
```

</details>

**Token 认证**：如果 Gateway 开了认证，连接时还需要提供 token：

```bash
# macOS
launchctl setenv OPENCLAW_GATEWAY_TOKEN "你的token"

# Linux
export OPENCLAW_GATEWAY_TOKEN="你的token"
```

或者写入配置文件持久化：

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

> SSH 隧道让流量透明转发，URL 仍保持 `ws://127.0.0.1:18789`。

<details>
<summary>开机自动启动隧道（macOS LaunchAgent）</summary>

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

加载：

```bash
launchctl bootstrap gui/$UID ~/Library/LaunchAgents/ai.openclaw.ssh-tunnel.plist
```

常用管理命令：

```bash
ps aux | grep "ssh -N my-gateway" | grep -v grep  # 检查是否运行
lsof -i :18789                                      # 检查端口
launchctl kickstart -k gui/$UID/ai.openclaw.ssh-tunnel  # 重启
launchctl bootout gui/$UID/ai.openclaw.ssh-tunnel       # 停止
```

</details>

<details>
<summary>开机自动启动隧道（Linux systemd）</summary>

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

```bash
systemctl --user enable --now openclaw-tunnel
systemctl --user status openclaw-tunnel
```

</details>

## 3. Tailscale 组网（推荐方案）

[Tailscale](https://tailscale.com) 让你的所有设备像在同一局域网里——手机、笔记本、VPS 都能直接访问 Gateway，自动 HTTPS，无需手动转发端口。

### 3.1 最快上手：Tailscale Serve

用 CLI 配置 Tailscale Serve：

```bash
openclaw config set gateway.bind loopback
openclaw config set gateway.tailscale.mode serve
openclaw gateway restart
```

重启后，用 tailnet 内任意设备访问：`https://<你的MagicDNS地址>/`

或一行命令等效：

```bash
openclaw gateway --tailscale serve
```

> **前置**：需先安装 Tailscale 并 `tailscale up` 登录，tailnet 启用 HTTPS。

<details>
<summary>Serve 模式可以免 Token 吗？</summary>

可以。设置 `gateway.auth.allowTailscale: true` 后，tailnet 内的设备访问 Control UI 和 WebSocket **不需要 token**——Tailscale 身份头自动认证。

注意：`/v1/*`、`/tools/invoke` 等 HTTP API 端点**仍需 token 认证**。

如果主机上可能运行不可信代码，建议关闭：

```json5
{
  gateway: {
    auth: { allowTailscale: false },
  },
}
```

</details>

<details>
<summary>需要公网访问？用 Tailscale Funnel</summary>

Funnel 把 Gateway 暴露到公共互联网，**必须配置密码认证**：

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

CLI 等效：

```bash
openclaw gateway --tailscale funnel --auth password
```

> 密码建议用环境变量 `OPENCLAW_GATEWAY_PASSWORD`，不要写在配置文件里。

Funnel 限制：需要 Tailscale v1.38.3+、MagicDNS、HTTPS，只支持端口 443/8443/10000，macOS 需开源版客户端。

</details>

<details>
<summary>不用 Serve/Funnel，直接绑定 Tailnet IP</summary>

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

访问地址：`http://<tailscale-ip>:18789/`（注意：`127.0.0.1:18789` 此模式下不可用）

</details>

参考文档：[Tailscale Serve](https://tailscale.com/kb/1312/serve) · [Tailscale Funnel](https://tailscale.com/kb/1223/tailscale-funnel)

<details>
<summary>常见部署架构参考</summary>

**架构一：VPS 24 小时在线，笔记本远程控制**

笔记本经常合盖休眠？把 Gateway 跑在 VPS 或家庭服务器上：

![云服务器 24 小时在线部署架构：Gateway 部署在 VPS 上，笔记本通过 SSH 隧道远程连接](./images/OpenClaw云服务器.png)

```mermaid
flowchart LR

A["VPS / 家庭服务器
Gateway（24h Online）
Loopback 绑定"]

B["你的笔记本
远程控制"]

B -->|SSH / Tailscale Tunnel| A
```

推荐：Gateway `bind: "loopback"` + Tailscale Serve 或 SSH 隧道。

---

**架构二：台式机 + 笔记本**

macOS 用户可直接用 OpenClaw.app 的 **"Remote over SSH"** 模式：Settings → General → "OpenClaw runs" → 选 "Remote over SSH"。App 自动管理 SSH 隧道。

---

**架构三：笔记本是主力机，偶尔其他设备访问**

用 Tailscale Serve 暴露 Control UI，Gateway 保持 loopback 绑定即可。

</details>

<details>
<summary>消息是怎么从聊天软件流转到节点的？</summary>

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

关键点：节点不运行 Gateway，只是通过 WebSocket 连接的外围设备。一台主机只跑一个 Gateway（除非用 `--profile` 隔离）。

</details>

## 4. 凭证与认证

一句话规则：**显式参数（`--token`、`--password`）优先级最高，其次环境变量，最后配置文件。**

用 `--url` 覆盖连接地址时，配置文件里的凭证不会自动带上，需同时传 `--token` 或 `--password`。

<details>
<summary>完整凭证优先级表</summary>

**本地模式**：

```
Token: --token > OPENCLAW_GATEWAY_TOKEN > gateway.auth.token > gateway.remote.token
Password: --password > OPENCLAW_GATEWAY_PASSWORD > gateway.auth.password > gateway.remote.password
```

**远程模式**：

```
Token: gateway.remote.token > OPENCLAW_GATEWAY_TOKEN > gateway.auth.token
Password: --password > OPENCLAW_GATEWAY_PASSWORD > gateway.remote.password > gateway.auth.password
```

其他细节：
- `gateway.remote.token` / `gateway.remote.password` 是**客户端凭证**，不控制服务端认证
- `gateway.auth.token` 通过 SecretRef 配置但解析失败时，认证**直接失败**（不回退，避免掩盖配置错误）
- Remote probe/status 严格使用 `gateway.remote.token`，不回退本地 token
- 旧版 `CLAWDBOT_GATEWAY_*` 环境变量仅用于兼容

</details>

## 5. 安全最佳实践

> **黄金规则：Gateway 保持 loopback 绑定，除非你确定需要对外暴露。**

| 配置 | 建议 |
|------|------|
| Gateway 绑定 | `loopback` + SSH 或 Tailscale Serve（最安全） |
| 非 loopback 绑定 | **必须**配置 token 或 password 认证 |
| 明文 `ws://` | 仅限 loopback；私有网络需设 `OPENCLAW_ALLOW_INSECURE_PRIVATE_WS=1` |
| TLS 指纹锁定 | 远程 `wss://` 用 `gateway.remote.tlsFingerprint` 固定证书 |
| Tailscale Serve | 可 `allowTailscale: true` 免 token，HTTP API 仍需认证 |
| Funnel | **必须**使用 password 认证（自动强制） |
| 浏览器控制 | 视为 operator 权限——tailnet-only，谨慎节点配对 |

<details>
<summary>跨机器控制浏览器的安全配置</summary>

在浏览器所在机器运行节点（node host），两台机器同在 tailnet。Gateway 通过 WebSocket 将浏览器操作代理到节点，**不需要**额外的 Serve URL。**避免用 Funnel 做浏览器控制**——节点配对权限等同 operator。

</details>

<details>
<summary>连不上？故障排查</summary>

**SSH 隧道排查：**

```bash
ps aux | grep "ssh -N" | grep -v grep  # 隧道是否运行
lsof -i :18789                          # 端口是否被占用
openclaw status                         # 手动测试连接
```

**常见问题：**

| 症状 | 可能原因 | 解决方法 |
|------|---------|---------|
| `connection refused` | 隧道未建立或 Gateway 未运行 | 检查 SSH 隧道和 Gateway 状态 |
| `401 Unauthorized` | Token 不匹配 | 检查 `OPENCLAW_GATEWAY_TOKEN` 是否与 Gateway 配置一致 |
| Tailscale Serve 无法访问 | HTTPS 未启用 | 在 Tailscale 管理控制台启用 HTTPS |
| Funnel 启动失败 | 未配置密码或版本过低 | 设置 `auth.mode: "password"` 并升级 Tailscale |
| `--url` 参数认证失败 | `--url` 不复用配置文件凭证 | 同时传 `--token` 或 `--password` |

**验证远程连接：**

```bash
# 通过 SSH 隧道
ssh -N -L 18789:127.0.0.1:18789 my-gateway &
openclaw status --deep

# 通过 Tailscale
openclaw gateway status --url ws://<tailscale-ip>:18789 --token 你的token
```

</details>

## 小结

| 你的场景 | 推荐方案 |
|---------|---------|
| 有 SSH 就行，最简单 | SSH 隧道 + loopback |
| 多设备跨网络，最佳体验 | Tailscale Serve + loopback |
| 需要公网访问 | Tailscale Funnel + password |
| 同一局域网 | LAN 绑定 + token 认证 |
