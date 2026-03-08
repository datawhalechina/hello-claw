# 第二章 移动端接入

OpenClaw 的真正威力在于随时随地的移动端控制。无论你在通勤路上、咖啡厅，还是出差途中，都可以通过手机给 OpenClaw 发送指令，让它在你的电脑或服务器上执行任务。本章会介绍如何接入飞书、Telegram 和 QQ 三个主流平台。

## 1. 为什么需要移动端接入

OpenClaw 如果只能在电脑上使用，那就失去了它最大的价值。想象一下：你在外面开会，服务器突然告警；你在通勤路上，需要紧急处理一个任务；你在度假，但还要关注项目进展。这些场景下，如果没有移动端接入，OpenClaw 就只是个摆设。

移动端接入不是"锦上添花"，而是 OpenClaw 的核心能力。只有接入飞书或 Telegram，你才能真正把 OpenClaw 变成 24/7 随时待命的 AI 助理。无论你在哪里，只需要发一条消息，OpenClaw 就会立即在服务器上执行任务并返回结果。这种随时随地的控制能力，才是 OpenClaw 区别于传统 AI 工具的关键。

## 2. 飞书接入（推荐企业用户）

飞书是国内企业广泛使用的协作平台，接入 OpenClaw 后可以在工作群里直接调用 AI 助理，非常适合团队协作场景。相比个人使用的 Telegram，飞书的优势在于可以和团队成员共享同一个 OpenClaw 实例，实现协同工作。

### 2.1 前置准备

在开始之前，确保：
- 已安装 OpenClaw（参考第一章）
- 拥有飞书账号，且具备创建企业自建应用的权限
- 网络环境支持 WebSocket 长连接（无需公网 IP）

### 2.2 创建飞书机器人

访问 [飞书开放平台](https://open.feishu.cn/app)，点击"创建企业自建应用"。

填写应用信息：
- **应用名称**：如"OpenClaw 助理"（可自定义）
- **应用描述**：个人 AI 助手
- **应用图标**：可以用龙虾 emoji 🦞 或上传自定义图标

创建完成后，进入"凭证与基础信息"页面，记下 **App ID** 和 **App Secret**。这两个密钥非常重要，务必妥善保管，不要泄露给他人。

### 2.3 配置应用权限

**第一步：批量导入权限（推荐）**

进入"权限管理"页面，点击"批量导入"按钮，粘贴以下 JSON 配置一键导入所需权限：

```json
{
  "scopes": {
    "tenant": [
      "contact:contact.base:readonly",
      "docx:document:readonly",
      "im:chat:read",
      "im:chat:update",
      "im:message.group_at_msg:readonly",
      "im:message.p2p_msg:readonly",
      "im:message.pins:read",
      "im:message.pins:write_only",
      "im:message.reactions:read",
      "im:message.reactions:write_only",
      "im:message:readonly",
      "im:message:recall",
      "im:message:send_as_bot",
      "im:message:send_multi_users",
      "im:message:send_sys_msg",
      "im:message:update",
      "im:resource",
      "application:application:self_manage",
      "cardkit:card:write",
      "cardkit:card:read"
    ],
    "user": [
      "contact:user.employee_id:readonly",
      "offline_access","base:app:copy",
      "base:field:create",
      "base:field:delete",
      "base:field:read",
      "base:field:update",
      "base:record:create",
      "base:record:delete",
      "base:record:retrieve",
      "base:record:update",
      "base:table:create",
      "base:table:delete",
      "base:table:read",
      "base:table:update",
      "base:view:read",
      "base:view:write_only",
      "base:app:create",
      "base:app:update",
      "base:app:read",
      "board:whiteboard:node:create",
      "board:whiteboard:node:read",
      "calendar:calendar:read",
      "calendar:calendar.event:create",
      "calendar:calendar.event:delete",
      "calendar:calendar.event:read",
      "calendar:calendar.event:reply",
      "calendar:calendar.event:update",
      "calendar:calendar.free_busy:read",
      "contact:contact.base:readonly",
      "contact:user.base:readonly",
      "contact:user:search",
      "docs:document.comment:create",
      "docs:document.comment:read",
      "docs:document.comment:update",
      "docs:document.media:download",
      "docs:document:copy",
      "docx:document:create",
      "docx:document:readonly",
      "docx:document:write_only",
      "drive:drive.metadata:readonly",
      "drive:file:download",
      "drive:file:upload",
      "im:chat.members:read",
      "im:chat:read",
      "im:message",
      "im:message.group_msg:get_as_user",
      "im:message.p2p_msg:get_as_user",
      "im:message:readonly",
      "search:docs:read",
      "search:message",
      "space:document:delete",
      "space:document:move",
      "space:document:retrieve",
      "task:comment:read",
      "task:comment:write",
      "task:task:read",
      "task:task:write",
      "task:task:writeonly",
      "task:tasklist:read",
      "task:tasklist:write",
      "wiki:node:copy",
      "wiki:node:create",
      "wiki:node:move",
      "wiki:node:read",
      "wiki:node:retrieve",
      "wiki:space:read",
      "wiki:space:retrieve",
      "wiki:space:write_only"
    ]
  }
}
```

> 💡 **提示**：批量导入会自动开通所有必要的权限，包括消息收发、云文档操作、多维表格、日历等完整能力。如果你只需要基础聊天功能，可以只开通 `im:message` 和 `im:chat` 相关权限。

**第二步：手动开通权限（备选）**

如果不使用批量导入，可以手动搜索并开通以下核心权限：

| 权限名称 | 说明 |
|---------|------|
| `im:message:send_as_bot` | 以机器人身份发送消息 |
| `im:message:readonly` | 读取消息内容 |
| `im:message:update` | 更新已发送的消息 |
| `im:message:recall` | 撤回消息 |
| `im:chat:read` | 读取群组信息 |
| `im:chat:update` | 更新群组信息 |
| `contact:contact.base:readonly` | 读取通讯录基本信息 |
| `docx:document:readonly` | 读取飞书文档 |
| `docx:document:create` | 创建飞书文档 |
| `docx:document:write_only` | 编辑飞书文档 |

开通权限后，点击"提交审核"。如果你是企业管理员，可以直接通过；如果不是，需要联系管理员审核。

### 2.4 配置事件订阅

进入"事件与回调" → "事件配置"，选择"长连接"接收事件（推荐，无需公网 IP）。

添加必要事件：
- `im.message.receive_v1` - 接收消息事件

保存配置。长连接模式的优势是不需要配置回调地址，OpenClaw 会主动连接飞书服务器获取消息。

### 2.5 安装并配置 OpenClaw 飞书插件

**方法一：命令行向导（推荐）**

```bash
# 添加飞书渠道
openclaw channels add

# 按提示操作：
# 1. 选择 Feishu/Lark (飞书) 渠道
# 2. 输入 App ID 和 App Secret
# 3. 配置私聊策略（默认配对模式）
# 4. 配置群组策略（默认白名单）

# 重启网关使配置生效
openclaw gateway restart
```

**方法二：手动配置**

```bash
# 安装飞书插件
openclaw plugins install @openclaw/feishu

# 编辑配置文件
openclaw config
```

在配置界面中：
1. 选择渠道：feishu
2. 链接：default（国内环境）
3. 输入 App ID 和 App Secret
4. 域名：选择「中国」
5. 群组权限：如需支持群聊，选择「是」
6. 保存配置并重启网关

### 2.6 发布应用并激活机器人

**发布应用**：
1. 飞书应用管理 → "版本管理与发布"
2. 创建版本 → 提交审核 → 发布上线

**激活机器人（配对模式）**：
1. 将机器人添加至飞书私聊或群聊
2. 发送任意消息，机器人会返回配对码
3. 在 OpenClaw 终端输入：
   ```bash
   openclaw pairing approve feishu <配对码>
   ```

**测试功能**：

向机器人发送测试指令：

```
帮我查看当前时间
```

如果机器人能正常回复，说明接入成功。你也可以测试更复杂的指令：

```
@OpenClaw 帮我查看服务器磁盘使用情况
```

OpenClaw 会执行 `df -h` 命令并把结果发回飞书。

### 2.7 常见问题

**权限问题**：确保已开通所有必要权限，未开通会导致功能异常。可以在飞书开放平台的"权限管理"页面检查。

**连接失败**：检查网络是否正常，WebSocket 连接是否被防火墙拦截。可以在 OpenClaw 日志中查看详细错误信息。

**配置不生效**：修改配置后必须重启 OpenClaw 网关才能生效。

**版本兼容**：建议使用 OpenClaw v2026.3+ 版本以获得最佳飞书支持。

## 3. Telegram 接入（推荐个人用户）

Telegram 是全球流行的即时通讯应用，接入简单且功能强大。相比飞书，Telegram 更适合个人使用，而且支持端到端加密，隐私性更好。如果你不需要团队协作，只是想要一个随身的 AI 助理，Telegram 是最佳选择。

OpenClaw 通过 grammY Bot API 框架实现 Telegram 集成，支持长轮询（默认）和 Webhook 两种消息接收模式，是最易配置的渠道之一。

### 3.1 创建 Telegram Bot

打开 Telegram，搜索 `@BotFather`（蓝色认证标识，这是 Telegram 官方的机器人管理工具）。发送 `/newbot` 命令开始创建。

BotFather 会询问机器人的名称和用户名：
- **显示名称**：可以随意，如"MyOpenClawBot"
- **用户名**：必须以 `bot` 结尾，例如 `openclaw_assistant_bot`

创建成功后，BotFather 会返回一个 **Bot Token**，格式类似 `123456789:ABCdefGHIjklMNOpqrsTUVwxyz`。妥善保存这个 Token，不要泄露给他人。

这个 Token 就是你的机器人的唯一凭证。任何人拿到这个 Token 都可以控制你的机器人，所以一定要保密。如果不小心泄露了，可以在 BotFather 中使用 `/revoke` 命令撤销旧 Token 并生成新的。

**可选设置**：
- 发送 `/setuserpic` 上传机器人头像
- 发送 `/setdescription` 添加功能说明

### 3.2 配置 OpenClaw

**方法一：命令行向导（推荐）**

```bash
# 添加 Telegram 渠道
openclaw channels add

# 按提示操作：
# 1. 选择 "Telegram (Bot API)"
# 2. 粘贴 Bot Token
# 3. 选择私聊策略（默认 pairing，需配对验证）
# 4. 配置群聊策略（默认 @提及才响应）
# 5. 选择消息接收模式（默认长轮询）

# 重启网关
openclaw gateway restart
```

**方法二：手动配置**

```bash
# 启用 Telegram 渠道
openclaw config set channels.telegram.enabled true

# 设置 Bot Token
openclaw config set channels.telegram.botToken "你的Token"

# 配置私聊策略（pairing/allowlist/open/disabled）
openclaw config set channels.telegram.dmPolicy "pairing"

# 配置群聊（@提及才响应）
openclaw config set channels.telegram.groups.requireMention true

# 重启网关生效
openclaw gateway restart
```

### 3.3 配对验证与安全设置

**获取个人 Chat ID**（配对必需）：
1. 搜索并打开 `@userinfobot`
2. 发送任意消息，获取数字 ID（如 123456789）

**完成配对**：
1. 向机器人发送任意消息
2. 终端执行：
   ```bash
   openclaw pairing approve telegram <你的ChatID>
   ```
3. 或在 OpenClaw 控制台批准配对请求

**安全加固**（可选）：

```bash
# 仅允许特定用户
openclaw config set channels.telegram.allowFrom "[123456789,987654321]"

# 限制群聊访问
openclaw config set channels.telegram.allowedChatIds "[-1001234567890]"
```

### 3.4 开始使用

在 Telegram 中搜索你创建的 Bot 用户名，点击"Start"开始对话。发送指令测试：

```
帮我创建一个名为 test.txt 的文件，内容是今天的日期
```

OpenClaw 会在服务器上执行操作并返回结果。你还可以发送文件给 Bot，让它处理后返回。比如发送一个 CSV 文件，让它生成数据分析报告；发送一张图片，让它提取文字内容。

### 3.5 Telegram 的独特优势

相比飞书，Telegram 有几个独特的优势。首先是跨平台支持更好，在 iOS、Android、Windows、macOS、Linux 甚至网页版都能无缝使用。其次是消息同步非常快，几乎没有延迟。最重要的是隐私保护，Telegram 的端到端加密确保你和机器人的对话不会被第三方窃听。

另外，Telegram Bot 支持自定义键盘。你可以在配置中设置常用命令按钮：

```bash
openclaw config set channels.telegram.customKeyboard '[["/status","/logs"],["/backup","/restart"]]'
```

这样在聊天界面底部会出现这些按钮，点击即可快速发送命令。

### 3.6 常见问题

**机器人无响应**：
- 检查 Bot Token 正确性
- 确认已完成配对（`openclaw pairing list` 查看）
- 检查网络连接（中国大陆可能需要代理）
- 重启网关：`openclaw gateway restart`

**群聊中不响应**：
- 确认已 @机器人
- 检查群聊 ID 是否在白名单中
- 重新邀请机器人进群

## 4. 使用技巧

### 4.1 命令快捷方式

在移动端输入长指令不方便，可以在配置文件中设置快捷命令：

```json
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

```json
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

```json
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

```json
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
openclaw logs --channel telegram --last 100
```

**不要在公共网络下暴露端口**：如果你的 OpenClaw 运行在公网服务器上，务必配置防火墙，只允许来自飞书或 Telegram 官方服务器的请求。

</details>

<details>
<summary>展开：多渠道协同配置</summary>

### 4.5 多渠道协同

你可以同时启用飞书和 Telegram，在不同场景使用不同渠道。例如工作相关的任务通过飞书，个人事务通过 Telegram。所有对话历史都会同步到 OpenClaw 的记忆系统中，不会因为切换渠道而丢失上下文。

在配置中可以为不同渠道设置不同的权限：

```json
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

## 6. QQ 接入（推荐国内个人用户）

QQ 是国内最流行的即时通讯工具之一。OpenClaw 支持两种 QQ 接入方式：

1. **官方原生接入**（推荐）：腾讯官方支持，2026年3月7日开放，个人免费使用
2. **NapCat 接入**：基于 NTQQ 的第三方框架，更灵活但需要额外配置

### 方式一：官方原生接入（推荐）

腾讯 QQ 于 2026 年 3 月 7 日正式开放 OpenClaw 官方原生接入，成为国内首个为 OpenClaw 提供专属接入支持的主流社交平台。

#### 6.1.1 特点与限制

**特点**：
- ✅ 个人免费使用，无需企业资质
- ✅ 一键创建，1 分钟完成配置
- ✅ 无需编写代码
- ✅ 官方稳定支持

**限制**：
- 1 个 QQ 账号最多创建 5 个机器人
- 需要 QQ 开放平台账号

#### 6.1.2 创建 QQ 机器人

**步骤 1：访问官方入口**

打开 [QQ 开放平台 OpenClaw 接入页面](https://q.qq.com/qqbot/openclaw/login.html)

**步骤 2：扫码登录**

使用手机 QQ 扫描二维码，快速完成注册并登录开发者账号。

**步骤 3：创建机器人**

点击"创建机器人"，设置：
- **机器人名称**：如"我的 OpenClaw 助手"
- **头像**：自定义或使用默认头像

创建完成后，系统会生成机器人的 **AppID** 和 **AppSecret**（Token），务必妥善保存。

#### 6.1.3 配置 OpenClaw

**安装 QQBot 插件**：

```bash
openclaw plugins install @sliverp/qqbot@latest
```

**添加 QQ 渠道**：

```bash
openclaw channels add --channel qqbot --token "你的AppID:你的AppSecret"
```

> 注意：Token 格式为 `AppID:AppSecret`，中间用英文冒号分隔

**重启网关**：

```bash
openclaw gateway restart
```

#### 6.1.4 开始对话

1. 打开手机 QQ
2. 搜索你创建的机器人名称
3. 点击"开始对话"即可与 OpenClaw 交互

#### 6.1.5 配置示例

也可以通过配置文件手动设置：

```json
{
  "channels": {
    "qqbot": {
      "enabled": true,
      "appId": "你的AppID",
      "token": "你的AppSecret"
    }
  }
}
```

---

### 方式二：NapCat 接入

如果你需要更灵活的配置，或者官方接入无法满足需求，可以使用 NapCat 框架将 OpenClaw 接入 QQ 个人账号。

#### 6.2.1 前置准备

在开始之前，需要：
- 已安装 OpenClaw（版本 >= 2026.2.1）
- 一个 QQ 账号用于登录机器人
- 安装 NapCat 框架

#### 6.2.2 安装 NapCat

NapCat 是基于 NTQQ 的 QQ 机器人框架，支持 OneBot 11 协议。



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

#### 6.2.3 安装 OpenClaw QQ 插件

```bash
openclaw plugins install @izhimu/qq
```

#### 6.2.4 配置 OpenClaw

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

#### 6.2.5 启动服务

```bash
openclaw gateway restart
```

#### 6.2.6 测试连接

在 QQ 中给机器人账号发送消息"你好"，如果收到回复说明接入成功。

#### 6.2.7 支持的功能

- ✅ 私聊消息收发
- ✅ 群聊消息（需 @机器人）
- ✅ 图片、文件、语音
- ✅ 消息回复
- ✅ 自动重连

#### 6.2.8 常见问题

**连接失败**：检查 NapCat 是否正常运行，确认 WebSocket 地址正确。

**消息无响应**：确认已完成 QQ 登录，检查配置 `openclaw config get channels.qq`。

---

### 两种方式的对比

| 特性 | 官方原生接入 | NapCat 接入 |
|------|-------------|-------------|
| 配置难度 | ⭐ 简单 | ⭐⭐⭐ 复杂 |
| 稳定性 | ⭐⭐⭐ 官方支持 | ⭐⭐ 依赖第三方 |
| 功能丰富度 | ⭐⭐ 基础功能 | ⭐⭐⭐ 完整功能 |
| 私聊支持 | ✅ | ✅ |
| 群聊支持 | ✅ | ✅ |
| 文件传输 | ✅ | ✅ |
| 语音消息 | ❌ | ✅ |
| 企业认证 | ❌ 不需要 | ❌ 不需要 |
| 账号限制 | 5个机器人/账号 | 无限制 |

**建议**：
- 新手用户：使用**官方原生接入**，配置简单，稳定可靠
- 高级用户：使用 **NapCat 接入**，功能更完整，可自定义程度高

---

**下一步**：[第三章 自动化任务入门](/cn/adopt/chapter3/)
