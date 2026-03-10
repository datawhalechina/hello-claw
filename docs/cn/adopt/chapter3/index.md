# 第三章 接入你的第一个聊天平台

> **前提**：本章假设你已完成[第二章](/cn/adopt/chapter2/)的手动安装。如果你用的是 [AutoClaw](/cn/adopt/chapter1/)，可以跳过本章——AutoClaw 已内置飞书一键接入。

OpenClaw 装好了，接下来让它连上你的聊天工具——这样你随时随地发一条消息，它就能在电脑上帮你干活。

## 选哪个平台？

如果你还没决定接入哪个 IM 平台，参考下表快速选择：

| 对比维度 | QQ（本章第 1 节） | 飞书 | Telegram |
|---------|-------------------|------|----------|
| **适合谁** | 个人用户、学生 | 企业用户、团队协作 | 技术用户、需要海外访问 |
| **接入难度** | ⭐ 最简单 | ⭐⭐ 需创建企业应用 | ⭐⭐ 需海外网络 |
| **消息功能** | 文字、图片 | 文字、图片、文件、富文本 | 文字、图片、文件、语音 |
| **独特优势** | 国内用户最多，配置最简单 | 深度集成文档/日历/表格，可作为"数字分身" | 无审核限制，API 最开放，支持 Markdown |
| **网络要求** | 无特殊要求 | 无特殊要求 | 需要科学上网 |
| **群聊支持** | ✅ 需 @机器人 | ✅ 需 @机器人 | ✅ 需 @机器人 |
| **多平台同时接入** | ✅ | ✅ | ✅ |

> **建议**：
> - 还没接过任何平台？从 QQ 开始，最简单
> - 公司用飞书办公？强烈推荐接入飞书，能帮你操作文档、日历、多维表格
> - 追求最大灵活性？Telegram 的 API 最开放，无消息审核，适合开发者
>
> OpenClaw 支持**同时接入多个平台**，你可以在 QQ 和朋友聊天、在飞书处理工作、在 Telegram 做开发——它们共享同一个 AI 大脑。

---

## 1. QQ 机器人（推荐国内用户）

腾讯 QQ 于 2026 年 3 月 7 日正式开放 OpenClaw 官方原生接入——个人免费、一键创建、无需编写代码。

### 1.1 注册并创建机器人

打开 [QQ 开放平台 OpenClaw 接入页面](https://q.qq.com/qqbot/openclaw/login.html)，使用手机 QQ 扫描二维码完成注册登录：

![QQ 开放平台注册页面](/qq-bot-register.png)

登录后点击"创建机器人"，设置机器人名称和头像。创建完成后，系统会生成 **AppID** 和 **AppSecret**，并显示部署指引：

![QQ 机器人配置部署页面](/qq-bot-deploy-browser.png)

> **重要**：出于安全考虑，AppSecret 不支持明文保存，二次查看将会强制重置，请立即复制并妥善保存。

### 1.2 安装配置

按照部署页面的指引，在终端依次执行三条命令：

**安装 QQBot 插件**：

```bash
openclaw plugins install @sliverp/qqbot@latest
```

**配置绑定 QQ 机器人**：

```bash
openclaw channels add --channel qqbot --token "你的AppID:你的AppSecret"
```

> Token 格式为 `AppID:AppSecret`，中间用英文冒号分隔。例如：`"1903127255:tqkcPCOnbQCuclyY"`

**重启网关**：

```bash
openclaw gateway restart
```

执行完成后终端会显示配置成功信息。

<details>
<summary>查看终端输出截图</summary>

![QQ 机器人配置终端输出](/qq-bot-deploy-terminal.png)

</details>

### 1.3 开始聊天

回到浏览器的部署页面，点击"扫描聊天"按钮，用手机 QQ 扫码即可找到你的机器人。试着发一条消息：

![QQ 机器人聊天示例](/qq-bot-chat.jpg)

恭喜！你已经拥有了自己的 QQ AI 助手。

> 你也可以直接在手机 QQ 中搜索机器人名称来找到它。

### 常见问题

**Q: QQ 机器人没有响应？**

A: 检查以下几点：
1. Gateway 是否在运行：`openclaw status`
2. QQ 渠道是否配置成功：`openclaw channels status`
3. Token 格式是否正确（`AppID:AppSecret`）
4. 尝试重启：`openclaw gateway restart`

---

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
- 已安装 OpenClaw（参考[第二章](/cn/adopt/chapter2/)）
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

---

## 3. Telegram 接入（推荐个人用户）

> **网络提示**：Telegram 在中国大陆无法直接访问，需要网络代理（VPN）。如果你没有代理，建议使用飞书（第 2 节）或 QQ 机器人（第 1 节）接入。

Telegram 是全球流行的即时通讯应用，接入简单且功能强大。相比飞书，Telegram 更适合个人使用，而且支持端到端加密，隐私性更好。如果你不需要团队协作，只是想要一个随身的 AI 助理，Telegram 是最佳选择。

OpenClaw 内置了 Telegram 集成支持，配置简单，是最易接入的渠道之一。

### 3.1 创建 Telegram Bot

![Telegram BotFather 创建机器人示意图](/telegram-botfather.png)

打开 Telegram，搜索 `@BotFather`（蓝色认证标识，这是 Telegram 官方的机器人管理工具）。找到后有两种方式创建机器人：

**方式一：手动输入命令**

在 BotFather 的聊天栏中直接输入 `/newbot`，然后按照对话引导完成创建。

**方式二：通过菜单操作**

点击 BotFather 主页的 **Open** 按钮进入对话，然后点击 **Create a New Bot** 选项，同样会进入创建流程。

两种方式效果完全一样，BotFather 都会依次询问：

1. **显示名称**（Name）：可以随意取，如"MyOpenClawBot"
2. **用户名**（Username）：必须以 `bot` 结尾，例如 `openclaw_assistant_bot`

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

![openclaw channels add 向导界面](/openclaw-channels-add.png)

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

### 3.3 配对验证

配置完成后，你需要和机器人完成一次"配对"，让 OpenClaw 知道谁是机器人的主人。

**第一步：找到你的机器人**

在 Telegram 中搜索你刚创建的机器人用户名（如 `@openclaw_assistant_bot`），点击进入对话。

**第二步：发起配对**

点击对话底部的 **Start**（开始）按钮，或发送任意消息。机器人会回复一条配对信息：

![Telegram 机器人配对信息](/openclaw-telegram-bot.png)

> 这条消息包含两个重要信息：
> - **Pairing code**（配对码）：如 `6KKG7C7K`，下一步需要在终端中批准
> - **Your Telegram user id**（用户 ID）：如 `8561283145`，这就是你的 **Chat ID**——请记下来，[第五章 定时任务](/cn/adopt/chapter5/)的 `--channel` 参数需要用到它

**第三步：批准配对**

复制消息中的配对码，在终端执行：

```bash
openclaw pairing approve telegram 6KKG7C7K
```

> 把 `6KKG7C7K` 替换成你实际收到的配对码。

批准成功后，回到 Telegram 再给机器人发一条消息，它就能正常回复了。配对完成后，**日常聊天不需要任何额外配置**——直接和机器人对话即可。

> **Chat ID 的用途**：配对消息中的 `user id`（如 `8561283145`）是你的 Chat ID。日常聊天用不到它，但如果你想让 OpenClaw **定时主动给你发消息**（如每日简报），需要在创建定时任务时通过 `--channel` 参数指定发送目标：
>
> ```bash
> # 示例：每天 7:30 发送简报到你的 Telegram
> openclaw cron add --name "每日简报" --cron "30 7 * * *" --message "发送今日简报" --channel "telegram:chat:8561283145"
> ```
>
> 把 `8561283145` 替换成你自己的 Chat ID。详见[第五章 定时任务](/cn/adopt/chapter5/)。

<details>
<summary>安全加固（可选）</summary>

```bash
# 仅允许特定用户（填入 Chat ID）
openclaw config set channels.telegram.allowFrom "[8561283145,987654321]"

# 限制群聊访问（群 Chat ID 以 -100 开头）
openclaw config set channels.telegram.allowedChatIds "[-1001234567890]"
```

> **如何获取群组 Chat ID？** 把 [@RawDataBot](https://t.me/RawDataBot) 拉进群，它会自动发送一条包含 `"chat": {"id": -100xxxxxxxxxx}` 的消息，那个负数就是群组的 Chat ID。拿到后可以把 RawDataBot 踢出群。

</details>

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

---

**下一步**：
- 想了解更多命令和配置？→ [第四章 命令行与基础配置](/cn/adopt/chapter4/)
- 想让龙虾定时执行任务？→ [第五章 定时任务](/cn/adopt/chapter5/)
- QQ 进阶（NapCat）/ 飞书深度集成 / 多渠道协同 → [第七章 多平台进阶与外部服务](/cn/adopt/chapter7/)
