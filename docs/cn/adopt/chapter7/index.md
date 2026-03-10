# 第七章 多平台进阶与外部服务

> **前提**：本章假设你已完成[第三章](/cn/adopt/chapter3/)的平台接入和[第六章](/cn/adopt/chapter6/)的技能安装。

本章分为两部分：多平台的进阶配置（快捷命令、文件传输、多渠道协同、QQ 进阶方案）和外部服务集成（Google、Notion 等）。

## 第一部分：多平台进阶

## 4. 使用技巧

### 4.1 命令快捷方式

在移动端输入长指令不方便，可以在配置文件中设置快捷命令：

```jsonc
// openclaw.json
{
  "shortcuts": {
    "/status": "检查服务器状态，包括 CPU、内存、磁盘使用情况",
    "/logs": "显示最近 50 行应用日志",
    "/backup": "执行数据库备份并上传到云存储",
    "/deploy": "拉取最新代码并重启服务"
  }
}
```

这样你只需要发送 `/status`，OpenClaw 就会执行完整的检查流程。这些快捷命令本质上是预定义的 prompt，OpenClaw 会把它们展开成完整的指令再执行。

<details>
<summary>展开：带参数的快捷命令</summary>

你还可以设置带参数的快捷命令：

```jsonc
// openclaw.json
{
  "shortcuts": {
    "/search": "在项目中搜索包含 {query} 的文件",
    "/git": "执行 git 命令: {command}"
  }
}
```

使用时这样调用：`/search TODO` 或 `/git status`。

</details>

### 4.2 文件传输

移动端接入的另一个强大功能是文件传输。你可以在手机上拍一张照片发给 OpenClaw，让它识别图片中的文字；或者发送一个 Excel 文件，让它生成数据分析报告。

在 Telegram 中，直接发送文件即可。OpenClaw 会自动下载文件到服务器，然后根据文件类型选择合适的处理方式。比如：

- 图片文件：自动调用 OCR 识别文字
- CSV/Excel：生成数据统计和可视化图表
- PDF：提取文本内容并总结
- 代码文件：进行代码审查和优化建议

处理完成后，OpenClaw 会把结果文件发回给你。整个过程完全自动化，不需要你手动上传下载。

<details>
<summary>展开：语音输入配置</summary>

### 4.3 语音输入

如果你在开车或不方便打字，可以使用语音输入。Telegram 和飞书都支持语音消息，OpenClaw 会自动将语音转换成文字，然后执行对应的指令。

在配置中启用语音识别：

```jsonc
// openclaw.json
{
  "channels": {
    "telegram": {
      "enabled": true,
      "botToken": "xxxxx",
      "voiceRecognition": true,
      "language": "zh-CN"
    }
  }
}
```

发送语音消息后，OpenClaw 会先回复"正在识别语音..."，然后显示识别出的文字，最后执行指令并返回结果。

</details>

<details>
<summary>展开：安全加固建议</summary>

### 4.4 安全建议

移动端接入意味着 OpenClaw 可以从互联网访问，务必注意安全：

**使用白名单**：始终配置 `allowed_users`，限制只有你信任的人才能使用。即使是团队共享的机器人，也要明确列出所有成员的 ID。

**敏感操作二次确认**：对于删除文件、修改配置、重启服务等危险操作，可以设置二次确认：

```jsonc
// openclaw.json
{
  "security": {
    "requireConfirmation": ["delete", "rm", "restart", "shutdown"]
  }
}
```

当你发送包含这些关键词的指令时，OpenClaw 会先询问"确定要执行吗？回复 yes 确认"，只有收到确认后才会真正执行。

**定期检查日志**：OpenClaw 会记录所有通过移动端执行的操作。定期查看日志，确保没有异常活动：

```bash
openclaw logs --follow
```

**不要在公共网络下暴露端口**：如果你的 OpenClaw 运行在公网服务器上，务必配置防火墙，只允许来自飞书或 Telegram 官方服务器的请求。

</details>

<details>
<summary>展开：多渠道协同配置</summary>

### 4.5 多渠道协同

你可以同时启用飞书和 Telegram，在不同场景使用不同渠道。例如工作相关的任务通过飞书，个人事务通过 Telegram。所有对话历史都会同步到 OpenClaw 的记忆系统中，不会因为切换渠道而丢失上下文。

在配置中可以为不同渠道设置不同的权限：

```jsonc
// openclaw.json
{
  "channels": {
    "feishu": {
      "enabled": true,
      "allowedOperations": ["read", "write", "execute"]
    },
    "telegram": {
      "enabled": true,
      "allowedOperations": ["read", "execute"]
    }
  }
}
```

这样可以实现更细粒度的权限控制，比如在 Telegram 上只能查询信息，不能修改文件。

</details>

## 5. 实战案例

### 5.1 通勤路上处理紧急问题

早上你在地铁上，突然收到告警：生产服务器 CPU 使用率 100%。你立即打开 Telegram，发送：

```
/status
```

OpenClaw 返回详细的系统状态，发现是某个进程占用了大量 CPU。你继续发送：

```
帮我找出占用 CPU 最高的进程并重启它
```

OpenClaw 执行 `top` 命令找到问题进程，确认后重启。几分钟内问题解决，你甚至不需要打开电脑。

### 5.2 会议中快速生成报告

你在客户会议上，客户突然要求看最新的数据报告。你在桌下悄悄给飞书机器人发消息：

```
@OpenClaw 生成本周销售数据报告，包括总销售额、增长率、TOP 10 产品
```

OpenClaw 连接数据库，提取数据，生成 Excel 报告，然后发送到飞书。你下载后投屏给客户，整个过程不到 2 分钟。

### 5.3 旅行途中管理服务器

你在国外旅行，时差 8 小时。国内凌晨需要执行数据库备份，但你不想半夜起来操作。你提前设置了定时任务，但还是不放心，想在备份完成后确认一下。

你在 Telegram 上发送：

```
备份完成后通知我，并告诉我备份文件大小
```

OpenClaw 会在备份任务完成后主动给你发消息，即使你没有在线。这种异步通知让你可以安心睡觉，不用担心错过重要事件。

## 6. QQ 进阶接入

> **QQ 官方原生接入**已在[第三章](/cn/adopt/chapter3/#_1-qq-机器人-推荐国内用户)完成。本节介绍更灵活的第三方方案。

### NapCat 接入

如果你需要更灵活的配置，或者官方接入无法满足需求，可以使用 NapCat 框架将 OpenClaw 接入 QQ 个人账号。

#### 6.1 前置准备

在开始之前，需要：
- 已安装 OpenClaw（版本 >= 2026.2.1）
- 一个 QQ 账号用于登录机器人
- 安装 NapCat 框架

#### 6.2 安装 NapCat

NapCat 是一个第三方 QQ 机器人框架，可以让 OpenClaw 通过你的 QQ 账号收发消息。

> **什么是 Docker？** Docker 是一种"容器"技术，可以把软件和它需要的所有依赖打包在一起运行，避免环境配置问题。如果你没有安装 Docker，可以参考 [Docker 官方安装指南](https://docs.docker.com/get-docker/) 或跳过此方式，使用上面的官方原生接入。

**使用 Docker 安装（推荐）**：

```bash
docker run -d \
  --name napcat \
  -p 3001:3001 \
  -v $(pwd)/napcat/config:/app/napcat/config \
  mlikiowa/napcat-docker:latest
```

启动后访问 `http://localhost:3001` 进入 WebUI，使用 QQ 账号扫码登录。

**配置 WebSocket 服务**：

在 NapCat 配置中启用 WebSocket（通常在 `config/onebot11_<QQ号>.json`）：

```json
{
  "ws": {
    "enable": true,
    "host": "0.0.0.0",
    "port": 3001
  }
}
```

#### 6.3 安装 OpenClaw QQ 插件

```bash
openclaw plugins install @izhimu/qq
```

#### 6.4 配置 OpenClaw

**方法一：交互式配置**

```bash
openclaw onboard
```

按提示输入 NapCat 的 WebSocket 地址。

**方法二：手动配置**

```bash
openclaw config set channels.qq.wsUrl "ws://127.0.0.1:3001"
openclaw config set channels.qq.enabled true
```

#### 6.5 启动服务

```bash
openclaw gateway restart
```

#### 6.6 测试连接

在 QQ 中给机器人账号发送消息"你好"，如果收到回复说明接入成功。

#### 6.7 支持的功能

- ✅ 私聊消息收发
- ✅ 群聊消息（需 @机器人）
- ✅ 图片、文件、语音
- ✅ 消息回复
- ✅ 自动重连

#### 6.8 常见问题

**连接失败**：检查 NapCat 是否正常运行，确认 WebSocket 地址正确。

**消息无响应**：确认已完成 QQ 登录，检查配置 `openclaw config get channels.qq`。

---

### 官方接入 vs NapCat 对比

| 特性 | [官方原生接入](/cn/adopt/chapter3/#_1-qq-机器人-推荐国内用户) | NapCat 接入 |
|------|-------------|-------------|
| 配置难度 | ⭐ 简单（见第三章） | ⭐⭐⭐ 复杂 |
| 稳定性 | ⭐⭐⭐ 官方支持 | ⭐⭐ 依赖第三方 |
| 功能丰富度 | ⭐⭐ 基础功能 | ⭐⭐⭐ 完整功能 |
| 语音消息 | ❌ | ✅ |
| 账号限制 | 5个机器人/账号 | 无限制 |

**建议**：大多数用户使用[第三章](/cn/adopt/chapter3/)的**官方原生接入**即可。NapCat 适合需要语音消息或无账号限制的高级用户。

---

## 7. QClaw：腾讯官方一键启动方案

除了手动接入方式，腾讯还推出了 **QClaw** —— 一款 OpenClaw 一键启动包，让零基础用户也能轻松部署和使用小龙虾。

### 7.1 QClaw 核心特性

- **一键本地部署**：无需复杂配置，本地电脑轻松部署 OpenClaw
- **微信直连**：除飞书、钉钉、QQ 外，支持**个人微信**直接对话
- **混合路由模型**：集成国内多家热门大模型，智能选择最优模型
- **预制实用技能**：
  - 远程操控电脑、手机远程办公
  - 社媒自动运营涨粉
  - GitHub 项目自动开发

### 7.2 使用场景示例

**社媒运营**：让龙虾自动发小红书笔记，去热门帖子下面互动引流。

**智能关注**：让龙虾到平台上找 Claw 类产品博主，然后自动关注并给出总结。

**GitHub 自动开发**：点击后龙虾会本地拉起浏览器，自动登录 GitHub、建立仓库、提交代码。

### 7.3 获取方式

> 📢 **内测阶段**：目前 QClaw 处于内测阶段，邀请码可在相关社群获取，正式上线后将第一时间通知。

访问 [QClaw 官网](https://qclaw.qq.com) 了解更多详情。

---

## 第二部分：外部服务集成

> **网络提示**：本章部分服务（如 Google）在中国大陆无法直接访问，需要网络代理。如果你没有代理，可以跳过对应小节，只看自己用得到的部分。本章涉及的服务（Google、Notion、数据库等）需要你已有对应的账号。

在[第六章](/cn/adopt/chapter6/)中，我们学会了安装和使用技能。本节将深入实战，通过 Google Workspace、Notion 等技能将 OpenClaw 与你的日常工具连接起来，打造真正的自动化工作流。

## 1. Google Workspace 集成

> **网络提示**：Google 服务在中国大陆无法直接访问，需要网络代理。如果你没有代理，可以跳过本节，直接看第 2 节 Notion 集成或第 3 节飞书深度集成。

Google Workspace（gog）技能提供了 Gmail、Calendar、Drive、Docs、Sheets 的统一访问接口，是最常用的外部服务集成之一。

### 1.1 安装与配置

gog 技能依赖一个独立的命令行工具 `gog`，需要分三步完成配置：安装 gog CLI → 创建 Google OAuth 凭证 → 授权登录。

**第一步：安装 gog 技能和 gog CLI**

```bash
# 安装 OpenClaw 技能
clawhub install gog

# 安装 gog 命令行工具
brew install steipete/tap/gogcli
```

> **没有 Homebrew？** macOS 用户先运行：`/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`。Linux 用户参考 [gog 官网](https://gogcli.sh) 的安装方式。

验证安装成功：

```bash
gog --version
```

**第二步：创建 Google OAuth 凭证**

> **什么是 OAuth？** OAuth 是一种安全的授权方式，让 gog 可以代你访问 Google 服务，而不需要你提供 Google 密码。你需要在 Google Cloud Console 创建一个"凭证"，相当于给 gog 一把专属钥匙。

整个过程分三小步：启用 API → 配置同意屏幕 → 创建凭证。

**2a. 启用 Google API**

1. 访问 [Google Cloud Console](https://console.cloud.google.com/)，登录你的 Google 账号
2. 如果已有项目（顶部会显示项目名），直接使用即可；如果没有，点击顶部**项目选择器**（Google Cloud 标志旁边的下拉框）→ **New Project** 创建一个

![Google Cloud 项目创建](/google-cloud-project.png)

3. 在左侧菜单点击 **APIs & Services → Library**
4. 在搜索栏中输入 API 名称，逐个搜索并启用以下 API（点击进入后点蓝色 **Enable** 按钮）：

![在 API Library 搜索栏中搜索需要的 API](/google-library-search.png)

   - Gmail API
   - Google Calendar API
   - Google Drive API
   - Google Sheets API

**2b. 配置 OAuth 同意屏幕**

> 这一步告诉 Google"谁在请求访问用户数据"。不配置就无法创建凭证。

1. 在左侧菜单点击 **Google Auth platform → Branding**（如果首次进入会显示 **Get Started**，点击它）
2. 填写 **App name**（随便起，如"gog-cli"）和 **User support email**（填你自己的邮箱），点击 **Next**
3. **Audience** 选择 **External**（个人用户选这个），点击 **Next**
4. **Contact Information** 填写你的邮箱，点击 **Next**
5. 勾选同意 Google API Services User Data Policy，点击 **Continue** → **Create**
6. 进入 **Google Auth platform → Audience**，在 **Test users** 区域点击 **Add users**，添加你自己的 Gmail 地址，点击 **Save**

> **为什么要添加测试用户？** 选择 External 后，应用处于"测试"状态，只有被添加为测试用户的 Google 账号才能完成授权。把你自己的 Gmail 加进去就行。

**2c. 创建 OAuth 凭证并下载**

1. 在左侧菜单点击 **Google Auth platform → Clients**
2. 点击 **Create Client**
3. **Application type** 选择 **Desktop app**，名称随便填（如"gog"），点击 **Create**
4. 创建成功后，在凭证列表中找到刚创建的条目，点击右侧的**下载图标**（↓）
5. 下载得到 `client_secret_xxx.json` 文件，保存到你记得住的位置

**第三步：授权登录**

```bash
# 导入 OAuth 凭证
gog auth credentials /path/to/client_secret_xxx.json

# 授权你的 Google 账号（会自动打开浏览器完成登录）
gog auth add you@gmail.com --services gmail,calendar,drive,contacts,sheets,docs
```

> 把 `you@gmail.com` 替换成你的实际 Gmail 地址，`/path/to/client_secret_xxx.json` 替换成你下载的凭证文件路径。

运行后会自动打开浏览器进入 Google 授权页面。按以下步骤完成授权：

1. 登录你的 Google 账号（就是你添加为测试用户的那个 Gmail）
2. 一路点击 **Continue** 前进
3. 当出现 **Select what gog-cli can access** 页面时，点击 **Select all** 选中所有权限，然后点击 **Continue**

![Google OAuth 授权页面](/google-oauth.png)

验证授权成功：

```bash
gog auth list
```

![gog 授权成功状态](/gog-connection-status.png)

> **提示**：为了方便使用，建议设置默认账号环境变量，这样每次调用 gog 时不用重复指定账号：
> ```bash
> export GOG_ACCOUNT=you@gmail.com
> # 写入 shell 配置使其永久生效
> echo 'export GOG_ACCOUNT=you@gmail.com' >> ~/.bashrc
> ```

### 1.2 Gmail 管理

安装完成后，你可以用自然语言管理邮件：

```
查看今天的未读邮件，按重要程度排序
```

```
帮我回复张三的邮件，告诉他周五下午 3 点可以开会
```

```
搜索所有来自 hr@company.com 的邮件，生成摘要
```

### 1.3 Google Calendar

```
查看我这周的日程安排
```

```
帮我在周三下午 2 点创建一个 30 分钟的会议，邀请 alice@company.com
```

```
我下周哪天下午有空？帮我找出连续 2 小时的空闲时间段
```

### 1.4 Google Drive & Docs

```
在 Google Drive 中搜索包含"季度报告"的文档
```

```
创建一个新的 Google Sheets，包含本月销售数据的表格模板
```

## 2. Notion 集成

Notion 技能让 OpenClaw 成为你的知识库管理助手。

### 2.1 安装与配置

```bash
clawhub install notion
```

需要创建 Notion Integration（集成接口，让 OpenClaw 获得访问你 Notion 数据的权限）并获取 API Token：

1. 访问 https://www.notion.so/profile/integrations
2. 点击 **"+ New integration"**，填写集成名称、选择关联的 Workspace，其余必填项（Website、Privacy Policy URL 等）可以随意填写，然后点击 **Create**
3. 创建成功后会弹出 "Integration successfully created" 提示，点击 **Configure integration settings** 进入设置页面
4. 在设置页面找到 **OAuth Client Secret**（默认隐藏，点击旁边的显示按钮），点击复制——这就是你的 API Token

![Notion Integration 设置页面](/notion-integration.png)
5. 在 Notion 中打开需要访问的页面/数据库，点击右上角 **"..."** → **"Connections"** → 添加你刚创建的 Integration

### 2.2 数据库操作

```
在"项目任务"数据库中添加一条记录：任务名"完成前端重构"，状态"进行中"，优先级"高"
```

```
查询"Bug 追踪"数据库中所有状态为"待修复"的记录
```

### 2.3 页面管理

```
创建一个新的 Notion 页面"2026年3月周报"，包含本周 Git 提交摘要
```

```
更新"产品需求文档"页面，在功能列表中添加"暗黑模式支持"
```

## 3. 飞书深度集成

在第三章中我们介绍了飞书作为消息渠道的接入。通过飞书插件的完整能力，OpenClaw 可以深度操作飞书的办公生态（详见第六章第 7 节）。

### 3.1 云文档操作

```
帮我创建一个飞书文档，标题是"技术方案评审"，包含背景、方案、风险三个部分
```

### 3.2 多维表格

```
在"OKR 跟踪"多维表格中，将我负责的所有 KR 状态更新为最新进度
```

### 3.3 日程与任务

```
查看团队成员这周的忙闲情况，找一个所有人都有空的时间安排周会
```

## 4. 数据库集成

### 4.1 SQL Toolkit

```bash
clawhub install sql-toolkit
```

支持 PostgreSQL、MySQL、SQLite 的只读查询（这三种都是常见的数据库软件，用来存储和管理结构化数据，类似于功能更强大的 Excel 表格）：

```
连接生产数据库，查询最近 7 天的新增用户数，按天分组
```

```
查看 orders 表的结构，列出所有字段和类型
```

> **安全提示**：SQL Toolkit 默认只支持只读查询（SELECT），不允许执行 INSERT、UPDATE、DELETE 等写入操作。这是一个重要的安全设计。

### 4.2 配置数据库连接

```jsonc
// openclaw.json 中的 sql-toolkit 配置
{
  "skills": {
    "sql-toolkit": {
      "connections": {
        "production": {
          "type": "postgresql",
          "host": "localhost",
          "port": 5432,
          "database": "myapp",
          "user": "readonly_user",
          "password": "your_password"
        },
        "analytics": {
          "type": "mysql",
          "host": "analytics.company.com",
          "port": 3306,
          "database": "analytics"
        }
      }
    }
  }
}
```

## 5. 浏览器自动化

### 5.1 Playwright 技能

```bash
clawhub install playwright
```

Playwright 技能让 OpenClaw 可以控制无头浏览器，执行网页操作：

```
打开 https://example.com/dashboard，截图保存当前页面
```

```
登录公司内部系统，导出本月考勤数据为 CSV
```

```
监控竞品网站的定价页面，如果价格变化就通知我
```

### 5.2 注意事项

- 浏览器自动化消耗资源较多，建议在服务器上运行
- 需要安装 Playwright 浏览器依赖：`npx playwright install chromium`
- 涉及登录的操作需要妥善管理凭证

## 6. 智能家居

### 6.1 Home Assistant 集成

```bash
clawhub install home-assistant
```

```
打开客厅的灯，亮度调到 60%
```

```
每天晚上 11 点自动关闭所有灯光和空调
```

```
查看家里所有设备的状态
```

## 7. 集成最佳实践

**最小权限原则**：每个技能只授予必要的权限。Gmail 技能不需要 Drive 权限，数据库技能只需要只读权限。

**凭证安全**：所有 API Key 和 Token 存储在本地 `openclaw.json` 中，不要提交到 Git 仓库。建议将 `openclaw.json` 加入 `.gitignore`。

**错误处理**：外部服务可能出现超时、限流等问题。OpenClaw 会自动重试，但如果持续失败，检查 API 配额和网络连接。

**测试环境先行**：对于涉及写入操作的集成（如创建文档、发送邮件），先在测试账号上验证，确认行为符合预期后再切换到正式账号。

---

**下一步**：[第八章 多模型与成本优化](/cn/adopt/chapter8/)
