# 第十一章 故障排查与优化

使用 OpenClaw 的过程中难免会遇到各种问题。本章汇总了常见问题的解决方案、性能调优技巧和社区资源。

> **阅读建议**：第 1 节"常见问题速查"建议每个人都过一遍，遇到问题时能快速定位。后面的日志诊断、性能优化等内容可以等遇到具体问题时再展开阅读。

## 1. 常见问题速查

### 1.1 安装问题

| 问题 | 原因 | 解决方案 |
|------|------|---------|
| `npm install -g openclaw` 失败 | Node.js 版本过低 | 升级到 Node.js 22+ |
| 权限错误 | npm 全局安装权限不足 | 使用 `sudo` 或配置 npm prefix |
| 网络超时 | npm 源不可访问 | 切换为淘宝源：`npm config set registry https://registry.npmmirror.com` |

### 1.2 API 连接问题

| 问题 | 原因 | 解决方案 |
|------|------|---------|
| `401 Unauthorized` | API Key 无效或过期 | 检查并更新 API Key |
| `429 Too Many Requests` | 达到 API 调用限制 | 减少并发任务，或升级 API 套餐 |
| 连接超时 | 网络问题（尤其访问海外 API） | 配置网络代理（HTTP_PROXY 环境变量）或改用国内提供商（如硅基流动，参考第一章） |
| `503 Service Unavailable` | API 服务暂时不可用 | 等待恢复，或切换到备用模型 |

### 1.3 渠道接入问题

| 问题 | 原因 | 解决方案 |
|------|------|---------|
| Telegram 无响应 | Bot Token 错误或网络问题 | 检查 Token，确认代理配置 |
| 飞书消息不回复 | 权限未开通或未完成配对 | 检查飞书开放平台权限设置 |
| QQ 断线 | NapCat WebSocket 断开 | 检查 NapCat 运行状态，重新登录 |

### 1.4 技能问题

| 问题 | 原因 | 解决方案 |
|------|------|---------|
| `clawhub install` 失败 | 网络问题或技能名称错误 | 检查网络，确认技能名称（slug）正确 |
| 技能安装后不可用 | 缺少系统依赖 | 检查 SKILL.md 中的 requirements |
| API Key 配置后仍报错 | openclaw.json 格式错误 | 用 `openclaw config` 交互式配置 |

<details>
<summary>展开：日志诊断</summary>

## 2. 日志诊断

### 2.1 查看日志

```bash
# 查看实时日志（持续输出）
openclaw logs --follow

# 查看最近 100 条日志
openclaw logs --limit 100

# 以 JSON 格式输出（方便用 jq 等数据处理工具过滤，新手可忽略此选项）
openclaw logs --limit 100 --json

# 纯文本输出（无颜色）
openclaw logs --limit 50 --plain
```

### 2.2 日志级别

```json
// openclaw.json 中的 logging 配置
{
  "logging": {
    "level": "info",
    "file": true,
    "maxSize": "50mb",
    "maxFiles": 10
  }
}
```

开发调试时可以临时开启 debug 级别：

```bash
openclaw config set logging.level debug
openclaw gateway restart
```

</details>

<details>
<summary>展开：性能优化</summary>

## 3. 性能优化

### 3.1 响应速度

**减少活跃技能**：每个技能增加约 200-500 tokens 的上下文。10 个技能可能增加 3000-5000 tokens。

```bash
# 查看当前活跃技能数量
clawhub list --active

# 禁用不常用的技能
clawhub uninstall rarely-used-skill
```

**使用更快的模型**：对于简单任务，Haiku 比 Opus 快 5-10 倍。

**启用缓存**：

```json
{
  "cache": {
    "enabled": true,
    "ttl": 3600,
    "maxSize": "100mb"
  }
}
```

### 3.2 内存优化

```bash
# 查看 OpenClaw 内存使用
openclaw status --verbose

# 清理对话历史缓存
openclaw cleanup --conversations --older-than 7d

# 清理技能缓存
openclaw cleanup --skill-cache
```

### 3.3 Token 优化

```bash
# 查看每次调用的 Token 消耗
openclaw usage --detail

# 按技能统计
openclaw usage --by-skill --period month
```

</details>

<details>
<summary>展开：数据备份与恢复</summary>

## 4. 数据备份与恢复

### 4.1 需要备份的内容

```
~/.openclaw/
├── openclaw.json        # 配置文件（API Key、渠道设置）
├── SOUL.md              # 人格设定
├── MEMORY.md            # 长期记忆
├── skills/              # 已安装技能及配置
├── cron/                # 定时任务
└── conversations/       # 对话历史
```

### 4.2 备份命令

```bash
# 完整备份
tar -czf openclaw-backup-$(date +%Y%m%d).tar.gz ~/.openclaw/

# 只备份配置（不含对话历史）
tar -czf openclaw-config-$(date +%Y%m%d).tar.gz \
  ~/.openclaw/openclaw.json \
  ~/.openclaw/SOUL.md \
  ~/.openclaw/MEMORY.md \
  ~/.openclaw/skills/ \
  ~/.openclaw/cron/
```

### 4.3 恢复

```bash
# 恢复备份
tar -xzf openclaw-backup-20260307.tar.gz -C ~/

# 重启服务
openclaw gateway restart
```

</details>

<details>
<summary>展开：升级指南</summary>

## 5. 升级指南

### 5.1 升级 OpenClaw

```bash
# 查看当前版本
openclaw --version

# 升级到最新版
npm update -g openclaw

# Docker 用户
docker pull ghcr.io/openclaw/openclaw:latest
docker compose up -d
```

### 5.2 升级注意事项

- 升级前备份 `~/.openclaw/` 目录
- 查看 Release Notes 了解破坏性变更
- 大版本升级后可能需要重新配置部分技能

</details>

## 6. 社区资源

### 6.1 官方资源

| 资源 | 地址 |
|------|------|
| 官方文档 | https://openclaw.ai/docs |
| GitHub 仓库 | https://github.com/openclaw/openclaw |
| ClawHub 技能市场 | https://github.com/openclaw/clawhub |
| Discord 社区 | https://discord.gg/openclaw |

### 6.2 中文社区

| 资源 | 地址 |
|------|------|
| 本教程在线版 | https://datawhalechina.github.io/hello-claw |
| Datawhale 社区 | https://github.com/datawhalechina |

### 6.3 获取帮助

遇到问题时的排查步骤：

1. 先查本章的"常见问题速查"
2. 搜索 GitHub Issues
3. 到 Discord 社区提问
4. 提交 GitHub Issue（附上日志和复现步骤）

---

恭喜你完成了"领养 Claw"的全部内容！现在你已经掌握了 OpenClaw 的安装配置、移动端接入、自动化任务、技能系统、外部服务集成、生产部署、多模型优化和实际应用场景。

如果你想进一步了解 OpenClaw 的内部原理，或者从零构建自己的 AI Agent，请继续阅读第二部分"构建 Claw"。

---

**下一步**：[第二部分：构建 Claw](/cn/build/)
