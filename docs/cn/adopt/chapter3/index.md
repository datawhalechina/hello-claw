# 第三章 移动端接入

OpenClaw 的真正威力在于随时随地的移动端控制。无论你在通勤路上、咖啡厅，还是出差途中，都可以通过手机给 OpenClaw 发送指令，让它在你的电脑或服务器上执行任务。

> **QQ 机器人用户**：如果你还没有完成 QQ 机器人的接入，请先阅读[第一章](/cn/adopt/chapter1/)——它会带你从零开始完成环境安装和 QQ AI 助手的创建。

本章介绍飞书和 Telegram 的接入方式，以及 QQ 的进阶配置选项。

## 1. 为什么需要移动端接入

OpenClaw 如果只能在电脑上使用，那就失去了它最大的价值。想象一下：你在外面开会，服务器突然告警；你在通勤路上，需要紧急处理一个任务；你在度假，但还要关注项目进展。这些场景下，如果没有移动端接入，OpenClaw 就只是个摆设。

移动端接入不是"锦上添花"，而是 OpenClaw 的核心能力。只有接入飞书或 Telegram，你才能真正把 OpenClaw 变成 24/7 随时待命的 AI 助理。无论你在哪里，只需要发一条消息，OpenClaw 就会立即在服务器上执行任务并返回结果。这种随时随地的控制能力，才是 OpenClaw 区别于传统 AI 工具的关键。

## 2. 飞书接入（推荐企业用户）

飞书是国内企业广泛使用的协作平台，接入 OpenClaw 后可以在工作群里直接调用 AI 助理，非常适合团队协作场景。相比个人使用的 Telegram，飞书的优势在于可以和团队成员共享同一个 OpenClaw 实例，实现协同工作。

### 2.1 飞书官方插件（强烈推荐）

飞书官方推出了 OpenClaw 专属插件，让你的 AI 助手以"你的身份"在飞书中完成工作，而非仅仅作为第三方机器人。

**核心优势**：

| 能力类别 | 具体功能 |
|---------|---------|
|  **消息** | 读取群聊/单聊历史、消息发送与回复、消息搜索、图片/文件下载 |
|  **文档** | 创建云文档、更新云文档、读取文档内容 |
| **多维表格** | 创建/管理多维表格、数据表、字段、记录（增删改查、批量操作、高级筛选）、视图 |
| **日历日程** | 日历管理、日程创建/查询/修改/删除/搜索、参会人管理、忙闲查询 |
| **任务** | 任务创建/查询/更新/完成、清单管理、子任务、评论 |

**为什么强烈推荐？**

- **真正的数字分身**：以你的身份完成工作（回消息、写文档、生成多维表格），而非以机器人身份
- **更懂你的工作**：获取飞书内的海量上下文（消息、文档、会议纪要、多维表格、日程、任务等）
- **更顺畅的沟通**：提供消息流式生成等高级功能
- **中文生态更好**：飞书是国内平台，有中文界面、文档和客服，更容易上手
- **开放能力更强**：获取更多工作中必要的上下文，玩法更多

> 📖 **详细说明**：参考[《OpenClaw飞书官方插件上线》](https://www.feishu.cn/content/article/7613711414611463386)

### 2.2 前置准备

在开始之前，确保：
- 已安装 OpenClaw（参考第一章）
- 拥有飞书账号，且具备创建企业自建应用的权限
- 网络环境正常即可（飞书使用"长连接"技术——即 OpenClaw 主动与飞书服务器保持连接，消息实时送达，不需要你有固定 IP 或做额外网络配置）

### 2.3 创建飞书应用

**第一步：进入飞书开放平台**

访问 [飞书开放平台](https://open.feishu.cn/app)，使用飞书账号登录。

> **国际版 Lark 用户**：请访问 [Lark Open Platform](https://open.larksuite.com/app)，并在配置中设置 `domain: "lark"`。

**第二步：创建企业自建应用**

<!-- TODO: 补充飞书开放平台首页截图（创建企业自建应用按钮位置） -->

1. 点击"创建企业自建应用"

> **个人用户也能用**：即使你不是企业管理员，也可以创建飞书应用。飞书允许个人用户创建"企业自建应用"用于个人测试和使用，不需要企业认证。

2. 填写应用信息：
   - **应用名称**：如"OpenClaw 助理"（可自定义）
   - **应用描述**：个人 AI 助手
   - **应用图标**：可以用龙虾 emoji 🦞 或上传自定义图标
3. 点击"创建"进入应用详情页

**第三步：启用机器人能力**

进入"添加应用能力" → "机器人"页面：
1. 开启机器人能力
2. 配置机器人相关设置（显示名称、描述等）

**第四步：获取应用凭证**

进入"凭证与基础信息"页面，记下 **App ID** 和 **App Secret**。这两个密钥非常重要，务必妥善保管，不要泄露给他人。

<!-- TODO: 补充飞书应用凭证页面截图（App ID 和 App Secret 位置） -->

### 2.4 配置应用权限

**第一步：批量导入权限（推荐）**

<!-- TODO: 补充飞书权限管理页面截图（批量导入按钮位置） -->

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

> 💡 **提示**：批量导入会自动开通所有必要的权限，包括消息收发、云文档操作、多维表格、日历等完整能力。

**基础权限说明（必开）**：

| 权限范围 | 权限类型 | 功能描述 |
|---------|---------|---------|
| `contact:user.base:readonly` | User info | 获取基础用户信息 |
| `im:message` | Messaging | 收发消息 |
| `im:message.p2p_msg:readonly` | DM | 读取机器人的私信消息 |
| `im:message.group_at_msg:readonly` | Group | 接收群内@机器人的消息 |
| `im:message:send_as_bot` | Send | 以机器人身份发送消息 |
| `im:resource` | Media | 上传/下载图片/文件 |

**可选全功能权限**：

| 权限范围 | 权限类型 | 功能描述 |
|---------|---------|---------|
| `im:message.group_msg` | Group | 读取群内所有消息（敏感） |
| `im:message:readonly` | Read | 获取消息历史记录 |
| `im:message:update` | Edit | 编辑/更新已发送的消息 |
| `im:message:recall` | Recall | 撤回已发送的消息 |
| `im:message.reactions:read` | Reactions | 查看消息的互动反馈 |

开通权限后，点击"提交审核"。如果你是企业管理员，可以直接通过；如果不是，需要联系管理员审核。

### 2.5 配置事件订阅

> ⚠️ **重要提醒**：在配置事件订阅前，请确保已完成以下步骤：
> - 已运行 `openclaw channels add` 添加了 Feishu 渠道
> - 网关处于启动状态（可通过 `openclaw gateway status` 检查）

进入"事件与回调" → "事件配置"：

1. 选择"使用长连接接收事件"（即 WebSocket 模式，让飞书和 OpenClaw 保持实时连接，推荐，无需公网 IP）
2. 添加事件：`im.message.receive_v1`（接收消息）

⚠️ **注意**：如果网关未启动或渠道未添加，长连接设置将保存失败。

保存配置。长连接模式的优势是不需要配置回调地址，OpenClaw 会主动连接飞书服务器获取消息。

### 2.6 安装飞书插件并配置

飞书官方插件已上线，支持完整的飞书生态集成。

**方式一：通过安装向导添加（推荐）**

如果您刚安装完 OpenClaw，可以直接运行向导：

```bash
openclaw onboard
```

向导会引导您完成：
- 创建飞书应用并获取凭证
- 配置应用凭证
- 启动网关

**方式二：通过命令行添加**

如果您已经完成了初始安装，可以用以下命令添加飞书渠道：

```bash
openclaw channels add
```

按交互式提示操作：
1. 选择 "Feishu/Lark (飞书)" 渠道
2. 输入 App ID 和 App Secret
3. 配置私聊策略（默认配对模式）
4. 配置群组策略（默认白名单）

**方式三：手动配置（高级）**

```bash
# 安装飞书插件
openclaw plugins install @openclaw/feishu

# 使用命令行设置配置
openclaw config set channels.feishu.appId "<App_ID>"
openclaw config set channels.feishu.appSecret "<App_Secret>"
openclaw config set channels.feishu.enabled true
openclaw config set channels.feishu.connectionMode websocket
openclaw config set channels.feishu.dmPolicy pairing
openclaw config set channels.feishu.groupPolicy allowlist
openclaw config set channels.feishu.requireMention true
```

**重启网关生效**：

```bash
openclaw gateway restart
```

**✅ 完成配置后，您可以使用以下命令管理网关**：

```bash
openclaw gateway status      # 查看网关运行状态
openclaw gateway restart     # 重启网关以应用新配置
openclaw logs --follow       # 查看实时日志
```

### 2.7 发布应用

1. 进入飞书应用管理 → "版本管理与发布"
2. 点击"创建版本"
3. 填写版本信息（版本号、更新说明等）
4. 提交审核并发布
5. 等待管理员审批（企业自建应用通常自动通过）

### 2.8 配对授权

**第一步：发送测试消息**

在飞书中找到您创建的机器人，发送一条消息（如"你好"）。

**第二步：获取配对码**

默认情况下，机器人会回复一个配对码。您需要批准此代码才能开始对话。

> 💡 **提示**：此时您也可以在 OpenClaw WebUI 中直接与 🦞 对话，让它帮忙完成配对步骤。

**第三步：批准配对**

在 OpenClaw 终端输入：

```bash
openclaw pairing approve feishu <配对码>
```

或在 WebUI 中点击批准按钮。

<!-- TODO: 补充配对流程截图（配对码提示和批准操作界面） -->

**第四步：测试功能**

配对成功后，向机器人发送测试指令：

```
帮我查看当前时间
```

如果机器人能正常回复，说明接入成功！您也可以测试更复杂的指令：

```
@OpenClaw 帮我查看服务器磁盘使用情况
```

OpenClaw 会执行 `df -h` 命令并把结果发回飞书。

### 2.9 常见问题

**权限问题**：确保已开通所有必要权限，未开通会导致功能异常。可以在飞书开放平台的"权限管理"页面检查。建议直接使用批量导入功能导入完整权限配置。

**连接失败**：
- 检查网络是否正常，WebSocket 连接是否被防火墙拦截
- 确认网关已启动：`openclaw gateway status`
- 查看 OpenClaw 日志获取详细错误信息：`openclaw logs --follow`

**长连接保存失败**：
- 确保已运行 `openclaw channels add` 添加 Feishu 渠道
- 确保网关处于启动状态

**配置不生效**：修改配置后必须重启 OpenClaw 网关才能生效：`openclaw gateway restart`

**版本兼容**：建议使用 OpenClaw v2026.3+ 版本以获得最佳飞书支持。

## 3. Telegram 接入（推荐个人用户）

> **网络提示**：Telegram 在中国大陆无法直接访问，需要网络代理（VPN）。如果你没有代理，建议使用飞书（第 2 节）或 [QQ 机器人](/cn/adopt/chapter1/#_3-创建-qq-机器人)（第一章）接入。

Telegram 是全球流行的即时通讯应用，接入简单且功能强大。相比飞书，Telegram 更适合个人使用，而且支持端到端加密，隐私性更好。如果你不需要团队协作，只是想要一个随身的 AI 助理，Telegram 是最佳选择。

OpenClaw 内置了 Telegram 集成支持，配置简单，是最易接入的渠道之一。

### 3.1 创建 Telegram Bot

<!-- TODO: 补充 Telegram BotFather 对话截图（/newbot 创建流程和 Token 返回） -->

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

> **什么是 Chat ID？** Chat ID 是 Telegram 给每个用户分配的唯一数字编号，类似于你的"身份证号"。OpenClaw 通过它来识别谁在和机器人对话。

1. 在 Telegram 中搜索并打开 `@userinfobot`（这是一个查询 ID 的工具机器人）
2. 给它发送任意消息，它会回复你的数字 ID（如 123456789）

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
openclaw logs --follow
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

## 6. QQ 进阶接入

> **QQ 官方原生接入**已在[第一章](/cn/adopt/chapter1/#_3-创建-qq-机器人)完成。本节介绍更灵活的第三方方案。

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

| 特性 | [官方原生接入](/cn/adopt/chapter1/#_3-创建-qq-机器人) | NapCat 接入 |
|------|-------------|-------------|
| 配置难度 | ⭐ 简单（见第一章） | ⭐⭐⭐ 复杂 |
| 稳定性 | ⭐⭐⭐ 官方支持 | ⭐⭐ 依赖第三方 |
| 功能丰富度 | ⭐⭐ 基础功能 | ⭐⭐⭐ 完整功能 |
| 语音消息 | ❌ | ✅ |
| 账号限制 | 5个机器人/账号 | 无限制 |

**建议**：大多数用户使用[第一章](/cn/adopt/chapter1/)的**官方原生接入**即可。NapCat 适合需要语音消息或无账号限制的高级用户。

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

**下一步**：[第四章 自动化任务入门](/cn/adopt/chapter4/)
