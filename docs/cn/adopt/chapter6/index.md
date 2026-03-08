# 第六章 生产环境部署

到目前为止，你可能一直在本地运行 OpenClaw。但要让它真正成为 24/7 待命的 AI 助手，你需要将它部署到服务器上持续运行。本章介绍 VPS 选择、Docker 部署和远程管理的完整流程。

## 1. 为什么需要服务器部署

本地运行的限制很明显：电脑关机就停了，网络不稳定会断连，而且你无法随时随地使用。部署到服务器后：

- 定时任务（第三章）可以 24/7 准时执行
- 移动端（第二章）可以随时发送指令
- 多人可以共享同一个 OpenClaw 实例
- 系统资源更充足，处理速度更快

## 2. VPS 选择

### 2.1 国内推荐

| 服务商 | 最低配置 | 月费参考 | 适合场景 |
|--------|---------|---------|---------|
| 阿里云 ECS | 2 核 4G | ~70 元 | 飞书集成、国内服务 |
| 腾讯云 CVM | 2 核 4G | ~65 元 | 微信生态集成 |
| 火山引擎 | 2 核 4G | ~60 元 | 字节系产品集成 |

### 2.2 海外推荐

| 服务商 | 最低配置 | 月费参考 | 适合场景 |
|--------|---------|---------|---------|
| Hetzner | 2 核 4G | ~$5 | 性价比最高 |
| DigitalOcean | 2 核 4G | ~$12 | Telegram 集成 |
| AWS Lightsail | 2 核 4G | ~$10 | AWS 生态集成 |

### 2.3 配置建议

- **最低要求**：2 核 CPU、4GB 内存、40GB SSD
- **推荐配置**：4 核 CPU、8GB 内存、80GB SSD
- **操作系统**：Ubuntu 22.04 LTS 或 Debian 12

## 3. 基础部署

### 3.1 安装 OpenClaw

> Node.js 安装和 API Key 获取的详细步骤请参考[第一章](/cn/adopt/chapter1/)，这里只列出服务器部署的关键命令。

```bash
# SSH 连接到服务器
ssh user@your-server-ip

# 安装 Node.js 22（详见第一章第 2 节）
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo bash -
sudo apt-get install -y nodejs

# 安装 OpenClaw
npm install -g openclaw

# 验证安装
openclaw --version
```

### 3.2 配置 LLM API Key

使用第一章获取的 API Key 配置服务器端（以硅基流动为例）：

```bash
# 方式一：命令行配置
openclaw config set llm.provider "siliconflow"
openclaw config set llm.baseUrl "https://api.siliconflow.cn/v1"
openclaw config set llm.apiKey "sk-xxxxx"

# 方式二：使用环境变量（推荐生产环境，更安全）
export LLM_API_KEY="sk-xxxxx"
```

> **提示**：如果还没有 API Key，请先完成[第一章 4.2 节](/cn/adopt/chapter1/#_4-2-获取-api-key-以硅基流动为例)的注册步骤。

### 3.3 使用 systemd 保持运行

创建系统服务让 OpenClaw 在后台持续运行。OpenClaw 提供了自动生成 systemd 配置的命令：

```bash
# 自动安装 systemd 服务（推荐）
openclaw onboard --install-daemon
```

<details>
<summary>展开：手动配置 systemd 服务</summary>

如果需要手动配置：

```bash
sudo cat > /etc/systemd/system/openclaw.service << 'EOF'
[Unit]
Description=OpenClaw AI Agent
After=network.target

[Service]
Type=simple
User=openclaw
WorkingDirectory=/home/openclaw
ExecStart=/usr/bin/openclaw gateway start
Restart=always
RestartSec=10
Environment=NODE_ENV=production

[Install]
WantedBy=multi-user.target
EOF

sudo systemctl daemon-reload
sudo systemctl enable openclaw
sudo systemctl start openclaw
```

管理服务：

```bash
sudo systemctl status openclaw    # 查看状态
sudo systemctl restart openclaw   # 重启
journalctl -u openclaw -f         # 查看实时日志
```

</details>

## 4. Docker 部署（推荐）

Docker 提供了更好的隔离性和可移植性。

### 4.1 使用官方镜像

<!-- TODO: 补充 Docker 部署流程截图 -->

```bash
# 拉取镜像
docker pull ghcr.io/openclaw/openclaw:latest

# 创建配置目录
mkdir -p ~/openclaw-data

# 运行容器
docker run -d \
  --name openclaw \
  --restart always \
  -v ~/openclaw-data:/home/openclaw/.openclaw \
  -e LLM_API_KEY="sk-xxxxx" \
  -p 18789:18789 \
  ghcr.io/openclaw/openclaw:latest gateway start
```

> **注意**：容器内运行用户为 uid 1000（node）。宿主机挂载目录需确保权限正确：
> ```bash
> chown -R 1000:1000 ~/openclaw-data
```

### 4.2 使用 Docker Compose

```yaml
# docker-compose.yml
version: '3.8'
services:
  openclaw:
    image: ghcr.io/openclaw/openclaw:latest
    container_name: openclaw
    restart: always
    volumes:
      - ./data:/home/openclaw/.openclaw
    ports:
      - "18789:18789"
    environment:
      - LLM_API_KEY=${LLM_API_KEY}
      - NODE_ENV=production
    command: gateway start
```

启动：

```bash
# 创建 .env 文件
echo "LLM_API_KEY=sk-xxxxx" > .env

# 启动服务
docker compose up -d

# 查看日志
docker compose logs -f
```

### 4.3 更新版本

```bash
docker compose pull
docker compose up -d
```

<details>
<summary>展开：安全加固配置</summary>

## 5. 安全加固

### 5.1 创建专用用户

```bash
sudo useradd -m -s /bin/bash openclaw
sudo su - openclaw
```

### 5.2 防火墙配置

```bash
# 只开放必要端口
sudo ufw allow ssh
sudo ufw allow 443/tcp    # HTTPS（如果需要 Webhook）
sudo ufw enable
```

### 5.3 API Key 安全

- 使用环境变量而非明文配置文件
- 定期轮换 API Key
- 设置 API 调用上限

### 5.4 日志审计

```bash
# 查看 OpenClaw 操作日志
openclaw logs --last 100

# 监控异常操作
openclaw logs --level error --last 50
```

</details>

<details>
<summary>展开：监控与维护</summary>

## 6. 监控与维护

### 6.1 健康检查

OpenClaw 提供内置健康检查端点（默认端口 18789）：

```bash
# 存活检查（liveness）
curl http://localhost:18789/healthz

# 就绪检查（readiness）
curl http://localhost:18789/readyz
```

也可以设置一个定时任务让 OpenClaw 自我检查：

```
每小时检查一次自身状态，如果发现异常就发送告警到 Telegram
```

### 6.2 自动备份

```bash
# 备份配置和记忆
tar -czf openclaw-backup-$(date +%Y%m%d).tar.gz ~/openclaw-data/

# 设置定时备份（每天凌晨 3 点）
echo "0 3 * * * tar -czf /backups/openclaw-$(date +\%Y\%m\%d).tar.gz ~/openclaw-data/" | crontab -
```

### 6.3 磁盘管理

OpenClaw 的对话历史和日志会随时间增长。定期清理：

```bash
# 清理 30 天前的对话历史
openclaw cleanup --older-than 30d

# 查看磁盘使用
du -sh ~/openclaw-data/*
```

</details>

## 7. 常见问题

**服务启动失败**：检查 Node.js 版本（需要 22+）、API Key 是否正确、端口是否被占用。

**内存不足**：OpenClaw 运行时通常占用 500MB-1GB 内存。如果服务器内存紧张，考虑升级配置或使用 swap。

**网络超时**：如果使用海外 API 提供商，国内服务器可能需要代理。可以配置 HTTP_PROXY 环境变量。推荐使用硅基流动等国内提供商避免此问题。

**Docker 容器自动重启**：检查 `docker logs openclaw` 查看崩溃原因，通常是 API Key 过期或配置文件格式错误。

---

**下一步**：[第七章 多模型与成本优化](/cn/adopt/chapter7/)
