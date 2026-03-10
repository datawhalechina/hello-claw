# 附录 G：安全防护指南

> OpenClaw 的定位是**私人助手**——它只和你一个人对话。理解这一点，是理解所有安全问题的起点。

---

## 1. 威胁模型：你的龙虾面临哪些风险？

### 1.1 提示词注入攻击

> **什么是提示词注入？** 攻击者通过精心构造的文本，绕过 AI 的原始指令，让它执行恶意操作。就像你告诉助理"不要理会别人的指令"，但有人对助理说"忘掉之前的所有规则，现在执行我的命令"。

**核心原则：OpenClaw 是私人助手，不是群聊机器人。**

当你自己使用 OpenClaw 时，提示词注入几乎不存在——你不会故意攻击自己的助手。但如果你把 OpenClaw 放进群聊，让不可信的第三方与它对话，安全性就变得像窗户纸一样薄：

- 攻击者可以让你的 OpenClaw 执行任意 Shell 命令
- 攻击者可以读取你服务器上的敏感文件（API Key、环境变量等）
- 攻击者可以让你的服务直接下线
- 攻击者可以盗用你的模型 Token

提示词注入是大模型的固有问题，目前**无法根治**。社区中已有大量真实攻击案例在流传。

> **结论**：如果你只是自己用，90% 以上的安全问题都遇不到。如果你把 OpenClaw 放到群聊里，请做好被攻击的心理准备。

### 1.2 IP 暴露风险

2026 年初，安全研究者发现**超过 27 万个 OpenClaw 实例直接暴露在公网上**，没有任何认证保护。这意味着：

- 任何人都可以直接访问你的 OpenClaw
- 你的 Token 可能被他人盗用（"Token 像大坝决堤一样流失"）
- 你的对话记录、工作区文件可能被窃取

暴露的根本原因：部署时没有配置认证，或者直接将 OpenClaw 端口映射到公网。

### 1.3 恶意 Skill 后门

ClawHub 上有 16,000+ 技能，社区精选库 awesome-openclaw-skills 有 5,000+。但并非所有 Skill 都是安全的：

- 某些 Skill 可能包含隐藏的数据上传逻辑
- 某些 Skill 可能请求超出功能需要的系统权限
- 某些 Skill 的依赖包中可能存在供应链攻击

详见[第六章 Skill 安全警告](/cn/adopt/chapter6/)。

### 1.4 文件误删风险

即使只是自己使用，OpenClaw 在执行自动化任务时也可能误操作：

- 执行 Shell 命令时构造了错误的指令，意外删除文件
- 清理任务的范围设置过大，波及重要数据
- 在命令注入场景下，敏感环境变量被意外公开

---

## 2. 自查清单：你的龙虾安全吗？

### 2.1 检查 IP 暴露

**第一步：查找你的公网 IP**

直接在浏览器访问 [ifconfig.me](https://ifconfig.me)，页面显示的就是你的公网 IP。

或者在终端执行：

```bash
# Linux / macOS
curl -s ifconfig.me

# Windows PowerShell（curl 在 PowerShell 中是 Invoke-WebRequest 的别名，需要用 curl.exe）
curl.exe -s ifconfig.me
```

> 本地部署通常在路由器 NAT 后面，默认不会暴露到公网。但如果你做了端口映射或使用了内网穿透工具（如 frp、ngrok），你的 OpenClaw 可能已经暴露。

**第二步：验证是否暴露**

访问 OpenClaw 暴露查询工具，输入你的服务器 IP 地址进行检查：

- 暴露监测面板：https://openclaw.allegro.earth/

如果查询结果显示你的实例在列，**请立即按第 3 节的防护措施进行加固**。

**第三步：检查端口是否对外开放**

```bash
# 检查 OpenClaw 默认端口是否对外监听（默认端口：18789）
ss -tlnp | grep 18789
```

如果看到 `0.0.0.0:18789` 或 `:::18789`，说明端口对所有网络接口开放，存在暴露风险。应改为 `127.0.0.1:18789`（仅本地访问）。

### 2.2 检查认证配置

```bash
# 查看 OpenClaw 配置中的认证设置（如果未开启，立即开启）
openclaw config set gateway.auth.enabled true
```

确认你的 `openclaw.json` 中包含认证配置：

```json
{
  "gateway": {
    "auth": {
      "enabled": true
    }
  }
}
```

### 2.3 检查 Skill 来源

```bash
# 列出所有已安装的 Skill
clawhub list

# 用 skill-vetter 扫描安全风险
clawhub install skill-vetter
# skill-vetter 会自动扫描已安装的 Skill
```

逐一检查：
- 是否来自 ClawHub 官方或知名作者？
- 安装量和评价如何？
- 是否请求了超出功能需要的权限？

---

## 3. 防护措施

### 3.1 开启沙盒模式（防止文件误删）

沙盒模式让 OpenClaw 只能操作自己工作区内的文件，不会触及你电脑上的其他文件：

```bash
openclaw config set agents.defaults.sandbox.mode non-main
```

> **强烈建议所有用户开启沙盒模式**，尤其是刚开始使用的新手。等你熟悉了 OpenClaw 的行为模式后，再根据需要调整。

三种模式对比：

| 模式 | 含义 | Shell 命令 | 适合场景 |
|------|------|-----------|---------|
| `all` | 所有 Agent 都在沙盒中运行 | 受限 | 安全优先、群聊场景 |
| `non-main` | 主 Agent 之外的子 Agent 在沙盒中运行 | 主 Agent 不受限 | 推荐日常使用 |
| `off` | 不启用沙盒 | 不限制 | 开发者、明确知道自己在做什么 |

### 3.2 网络隔离（不要直接暴露到公网）

**本地部署用户**：

- 不要使用 frp、ngrok 等内网穿透工具直接暴露 OpenClaw 端口
- 如果需要远程访问，使用 SSH 隧道：

```bash
# 在本地电脑上建立 SSH 隧道，通过 SSH 安全访问远程 OpenClaw
ssh -L 18789:127.0.0.1:18789 user@your-server-ip
```

**云服务器用户**：

- OpenClaw 端口只绑定 `127.0.0.1`，不要绑定 `0.0.0.0`
- 使用防火墙规则限制访问：

```bash
# 仅允许特定 IP 访问（替换为你的 IP）
sudo ufw allow from YOUR_IP to any port 18789
sudo ufw deny 18789
```

- 使用反向代理（如 Nginx）+ HTTPS + 基本认证：

```nginx
server {
    listen 443 ssl;
    server_name your-domain.com;

    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;

    location / {
        auth_basic "OpenClaw";
        auth_basic_user_file /etc/nginx/.htpasswd;
        proxy_pass http://127.0.0.1:18789;
    }
}
```

### 3.3 认证与访问控制

```bash
# 开启认证
openclaw config set gateway.auth.enabled true

# 重启使配置生效
openclaw gateway restart
```

### 3.4 Skill 安全审查

安装任何新 Skill 前：

1. **先用 skill-vetter 扫描**：`clawhub install skill-vetter`（详见[第六章](/cn/adopt/chapter6/)）
2. **检查 Skill 来源**：优先选择 ClawHub 官方推荐和高安装量的 Skill
3. **阅读 SKILL.md**：了解 Skill 需要的权限和外部依赖
4. **在沙盒模式下先试用**：确认行为符合预期后再放开权限

### 3.5 敏感信息保护

- **API Key 使用环境变量**，不要写在配置文件里：

```bash
export OPENROUTER_API_KEY="sk-..."
```

- **不要在工作区文件中存放密码、Token 等敏感信息**
- **定期轮换 API Key**：如果怀疑 Key 泄露，立即在提供商后台重新生成

---

## 4. 群聊场景特别警告

### 为什么不建议把 OpenClaw 放进群聊？

OpenClaw 的设计假设是：与它对话的人是可信任的（就是你自己）。这个假设在群聊场景中完全不成立。

**真实案例**：

- 群友发送精心构造的消息，直接让 OpenClaw 执行 `rm -rf` 删除服务器文件
- 攻击者通过提示词注入获取环境变量中的 API Key
- 恶意用户让 OpenClaw 导出所有对话历史和工作区文件
- 有人让 OpenClaw 执行关机命令，导致整个服务下线

### 如果必须在群聊中使用

如果你了解风险但仍需要在群聊中使用 OpenClaw（如内部小团队），请**至少**做到：

1. **开启沙盒模式**：`openclaw config set agents.defaults.sandbox.mode all`
2. **限制 Shell 命令执行**：在 `openclaw.json` 中禁用或限制 Shell 工具
3. **使用白名单**：只允许特定用户 ID 与 OpenClaw 交互
4. **限制敏感操作**：在 SOUL.md 中明确禁止文件删除、系统命令等危险操作
5. **独立部署**：群聊用的 OpenClaw 实例和你私人使用的实例必须完全分开
6. **监控日志**：实时关注异常请求（详见[第十二章日志诊断](/cn/adopt/chapter12/)）

> **再次强调**：以上措施只能降低风险，不能消除风险。提示词注入目前无法根治。如果你的场景允许，**最安全的做法就是不要把 OpenClaw 放进群聊**。

---

## 5. 安全检查定期清单

建议每月执行一次：

- [ ] 检查 OpenClaw 是否暴露在公网（用 `curl -s ifconfig.me` 查 IP，去暴露监测面板验证）
- [ ] 确认认证已开启（`gateway.auth.enabled: true`）
- [ ] 确认沙盒模式状态符合预期
- [ ] 用 skill-vetter 扫描所有已安装 Skill
- [ ] 检查并轮换 API Key（尤其是使用量异常时）
- [ ] 查看 OpenClaw 日志中是否有异常请求（`openclaw logs --limit 100`）
- [ ] 确认防火墙规则未被修改
- [ ] 备份工作区文件（详见[第十二章备份恢复](/cn/adopt/chapter12/)）

---

> **安全不是一劳永逸的事，而是持续的习惯。** 就像锁门一样——你不会因为"这个小区很安全"就不锁门。养成定期检查的习惯，你的龙虾才能安全地为你服务。
