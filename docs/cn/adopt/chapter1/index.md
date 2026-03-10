# 第一章 拥有你的第一个 QQ AI 助手

这一章带你从零开始，在自己的 QQ 上拥有一个 AI 助手。

先看看最终效果——你将拥有一个这样的 QQ AI 助手：

![QQ 机器人聊天示例](/qq-bot-chat.jpg)

准备好了吗？让我们开始。

## 0. 最快上手：AutoClaw 一键安装（推荐新手）

> **什么是 AutoClaw？** [AutoClaw](https://autoglm.zhipuai.cn/autoclaw)（澳龙）是智谱推出的国内首个一键安装版 OpenClaw 桌面客户端。它把环境配置、模型接入、技能安装全部打包好了，下载即用，真正做到零门槛。

**为什么推荐先用 AutoClaw？**

- **一键安装**：像装普通软件一样，下载 → 双击 → 完成，无需安装 Node.js、无需配置 API Key，支持 macOS 和 Windows
- **预装 50+ 热门技能**：搜索、生图、浏览器操作、文档处理等开箱即用，无需单独配置各类 API
- **内置龙虾专属模型**：Pony-Alpha-2 针对 OpenClaw 场景深度优化，工具调用更稳、多步任务不掉链子
- **内置浏览器操作能力**：集成 AutoGLM Browser-Use，能自动完成多步骤、跨页面的复杂浏览器任务
- **一键接入飞书**：点击主界面的"一键接入飞书"，扫码登录后全程自动配置，无需手动操作（详见[第三章](/cn/adopt/chapter3/)）
- **模型随意切换**：默认 Pony-Alpha-2，也支持 GLM-5、DeepSeek、Kimi、MiniMax 等任意模型 API
- **免费积分**：新用户限时赠送 2000 积分，零成本上手

**安装步骤**：

1. 访问 [AutoClaw 官网](https://autoglm.zhipuai.cn/autoclaw)，下载对应系统的安装包（macOS / Windows）
2. 双击安装，打开 AutoClaw
3. 用国内手机号注册账号
4. 阅读并确认安全与风险指南
5. 开始和你的龙虾对话！

![AutoClaw 初始界面](/autoclaw.png)

就这么简单。打开后你会看到左侧的 **Agents**（智能体）、**IM Channels**（即时通讯渠道）、**Cron Jobs**（定时任务）三个标签页，中间是对话区域，底部可以选择模型（默认 Pony-Alpha-2）。左侧预置了多个智能体：AutoClaw（主助手）、沉思小助手、监控、Browser Agent 等。

**几个实用提示**：

- **Quick Setup**：首次对话前，界面中间会出现 "Quick Setup" 卡片，点击可以设置你的名字和角色，让 AutoClaw 更了解你。这个选项只在第一次对话前出现，如果错过了也没关系——直接在对话框里告诉 AutoClaw 你想要的设置，它一样会帮你配好
- **免费额度用完后**：点击右上角的 **Buy now** 购买积分包或月度会员即可继续使用
- **预装技能覆盖**：内容创作、办公自动化、代码开发、营销、金融等高频场景，安装完就能直接用

> **Tip**
> AutoClaw 运行的就是完整版 OpenClaw。本教程后续章节介绍的技能安装、定时任务、外部服务集成、工作区文件配置等功能，在 AutoClaw 中同样适用。你可以先用 AutoClaw 快速体验，再按需学习进阶配置。

---

**想手动安装？** 如果你更喜欢从头配置（或需要服务器部署、QQ 机器人接入等场景），继续往下走：**安装环境 → 配置模型 → 创建 QQ 机器人 → 开始聊天**。

## 1. 安装环境

OpenClaw 需要 Node.js 22+ 运行环境。如果你已经装过，跳到[第 2 步](#_2-配置-ai-模型)。

> **什么是终端（Terminal）？** 本教程需要在"终端"中输入命令。终端是一个文字界面，你输入命令，电脑执行：
>
> - **Windows**：按 `Win + X`，选择"终端"或"PowerShell"
>   <details>
>   <summary>查看 Windows 终端截图</summary>
>
>   ![Windows PowerShell 终端](/windows-powershell.png)
>
>   </details>
>
> - **macOS**：按 `Cmd + 空格`，搜索"Terminal"
> - **Linux**：按 `Ctrl + Alt + T`
>   <details>
>   <summary>查看 Linux 终端截图</summary>
>
>   ![Linux 终端](/linux-terminal.png)
>
>   </details>

### 1.1 安装 Node.js

> **什么是 Node.js？** OpenClaw 是用 JavaScript 编写的，Node.js 让它能在你的电脑上运行。你不需要学 JavaScript，装好就行。

根据你的操作系统选择安装方式：

**Windows 用户**：打开 PowerShell（管理员模式），运行一键安装脚本：

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
iwr -useb https://openclaw.ai/install.ps1 | iex
```

> 这个脚本会自动安装 Node.js 和 OpenClaw，装完可以直接跳到[第 2 步](#_2-配置-ai-模型)。

**macOS 用户**：

```bash
brew install node@22
```

> 没有 Homebrew？先运行：`/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`

**Linux 用户（含 WSL2）**：

```bash
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo bash -
sudo apt install -y nodejs
```

验证安装：

```bash
node --version
```

看到 `v22.x.x` 说明成功。

<details>
<summary>查看验证截图</summary>

![node --version 终端输出](/node-version.png)

</details>

<details>
<summary>Windows 用户：什么是 WSL2？如何安装？</summary>

WSL2（Windows Subsystem for Linux 2）让你在 Windows 上运行完整的 Linux 环境。**如果你不想折腾，直接用 PowerShell 即可，跳过此步骤。**

1. 以管理员身份打开 PowerShell
2. 运行：`wsl --install`
3. 重启电脑，按提示设置用户名和密码

之后在开始菜单搜索"Ubuntu"即可打开 WSL2 终端，按上面 Linux 的步骤安装 Node.js。

</details>

<details>
<summary>国内镜像加速（下载太慢时使用）</summary>

**Linux / macOS / WSL2**：

```bash
# nvm 镜像
export NVM_NODEJS_ORG_MIRROR=https://npmmirror.com/mirrors/node
echo 'export NVM_NODEJS_ORG_MIRROR=https://npmmirror.com/mirrors/node' >> ~/.bashrc

# npm 镜像
npm config set registry https://registry.npmmirror.com
```

**Windows**：

```powershell
nvm node_mirror https://npmmirror.com/mirrors/node
npm config set registry https://registry.npmmirror.com
```

</details>

<details>
<summary>使用 Trae CN 等 AI 编程助手辅助安装</summary>

如果你安装了 [Trae CN](https://www.trae.cn/)（字节跳动推出的免费 AI 编程助手），可以直接让它帮你完成环境安装：

1. 打开 Trae CN，新建对话
2. 输入：「帮我安装 Node.js 22 和 OpenClaw，我的系统是 [Windows/macOS/Linux]」
3. Trae CN 会生成并执行安装命令，你只需确认即可

其他 AI 编程助手（如 Cursor、Windsurf）也可以用同样的方式辅助安装。

</details>

### 1.2 安装 OpenClaw

> Windows 一键脚本已包含此步骤，如果你用了一键脚本可以跳过。

```bash
npm install -g openclaw@latest
```

> **什么是 npm？** npm 是 Node.js 自带的"软件安装器"，`-g` 表示全局安装。

验证：

```bash
openclaw --version
```

<details>
<summary>查看验证截图</summary>

![openclaw --version 终端输出](/openclaw-version.png)

</details>

## 2. 配置 AI 模型

OpenClaw 本身不包含 AI 大脑，需要连接一个"模型提供商"来获得智能。运行配置向导：

```bash
openclaw onboard --install-daemon
```

![openclaw onboard 配置向导界面](/openclaw-onboard.png)

向导会引导你完成所有配置。关键步骤：

**安全确认** → 选 **Yes**
**配置模式** → 选 **QuickStart**
**模型提供商** → 选 **Custom Provider**

然后输入以下信息（以 OpenRouter 免费模型为例）：

```
◇  API Base URL
│  https://openrouter.ai/api/v1

◇  API Key
│  sk-or-v1-你的密钥

◇  Endpoint compatibility
│  OpenAI-compatible

◇  Model ID
│  stepfun/step-3.5-flash:free
```

**推荐 OpenRouter**——注册即可使用免费模型（如 Step 3.5 Flash），无需充值，零成本完成全部教程练习。

向导后续会询问渠道、技能等配置，**建议都先跳过**——QQ 机器人我们手动配置更快。

> **还没有 API Key？** 展开下方指南获取。

<details>
<summary>获取 API Key：注册 OpenRouter（免费模型，零成本入门）</summary>

**第一步：注册账号**

1. 访问 [OpenRouter 官网](https://openrouter.ai)
2. 点击右上角 **Sign In**，支持 Google、GitHub、邮箱等多种方式快速注册

![OpenRouter 注册页面](/openrouter-signup.png)

**第二步：创建 API 密钥**

1. 注册登录后，点击右上角**头像** → 选择 **Settings**
2. 在左侧菜单选择 **API Keys**
3. 点击 **Create** 创建一个新的 API Key
4. 复制生成的密钥（以 `sk-or-v1-` 开头）

![OpenRouter API Key 创建页面](/openrouter-token.png)

> **重要**：API 密钥只会显示一次，请立即复制保存。丢失需重新创建。

**第三步：充值（可选）**

OpenRouter 上带 `:free` 后缀的模型完全免费，如 `stepfun/step-3.5-flash:free`，日常学习足够使用。如果你想使用更强的付费模型：

1. 点击左侧菜单的 **Credits** 进入充值页面
2. 点击 **Add Credits** 进行充值
3. OpenRouter 支持银联、VISA 等常见卡型，甚至还支持虚拟货币支付，非常方便
4. 建议第一次充值最低限额 **5 美金**，够练手了

![OpenRouter 充值页面](/openrouter-credits.png)

> **省心提示**：如果后期使用量较大，可以在充值页面开启 **Auto Top Up**（自动充值），余额不足时自动补充，避免使用中断。

</details>

<details>
<summary>备选方案：使用硅基流动（SiliconFlow）</summary>

如果你更倾向使用国内提供商，推荐硅基流动——新注册送 **16 元免费算力券**，支持支付宝/微信充值。

**注册与获取 API Key**：

1. 访问 [硅基流动官网](https://cloud.siliconflow.cn)，使用手机号注册
2. 登录后进入 [控制台](https://cloud.siliconflow.cn/account/ak)，创建 API 密钥（以 `sk-` 开头）

![硅基流动注册页面](/siliconflow-register.png)

![API 密钥创建页面](/siliconflow-api-key.png)

**向导中填写**：

```
◇  API Base URL
│  https://api.siliconflow.cn/v1

◇  API Key
│  sk-你的密钥

◇  Model ID
│  deepseek-ai/DeepSeek-V3
```

> **费用参考**：DeepSeek V3 模型，16 元约可进行 800-1500 次对话。

<details>
<summary>更多提供商的 API Key 获取方式</summary>

- **阶跃星辰（StepFun）**：访问 https://platform.stepfun.com 获取官方 API Key；或在 [OpenRouter](https://openrouter.ai/stepfun/step-3.5-flash:free) 直接使用 `stepfun/step-3.5-flash:free` 免费模型，零成本入门（推荐）
- **深度求索（DeepSeek）**：访问 https://platform.deepseek.com ，支持支付宝充值
- **通义千问（Qwen）**：访问 https://dashscope.console.aliyun.com ，阿里云旗下
- **月之暗面（Moonshot/Kimi）**：访问 https://platform.moonshot.cn
- **豆包（Doubao）**：访问 https://console.volcengine.com/ark ，火山方舟平台
- **混元（Hunyuan）**：访问 https://cloud.tencent.com/product/tclm ，hunyuan-lite 免费无限量
- **稀宇科技（MiniMax）**：访问 https://platform.minimaxi.com
- **智谱（GLM）**：访问 https://open.bigmodel.cn
- **文心一言（ERNIE）**：访问 https://console.bce.baidu.com/qianfan
- **OpenAI（GPT）**：访问 https://platform.openai.com ，需国际信用卡
- **Anthropic（Claude）**：访问 https://console.anthropic.com ，需国际信用卡
- **Google（Gemini）**：访问 https://aistudio.google.com ，有免费额度
- **xAI（Grok）**：访问 https://console.x.ai ，需国际信用卡

</details>

</details>

::: info Token 消耗提醒
随着对话轮数增加，上下文会越来越长，Token 消耗也会显著增加。即使是免费模型，长时间对话后也可能触发速率限制。建议：
- 使用更便宜的模型（如 `stepfun/step-3.5-flash:free` 等免费模型）
- 对于复杂任务，考虑使用 coding plan 模式进行操作
- 使用一段时间后注意检查 API 开销，避免意外费用
:::

<details>
<summary>进阶：跳过向导，手动编辑配置文件</summary>

直接编辑 `~/.openclaw/openclaw.json`：

```json
{
  "env": {
    "OPENROUTER_API_KEY": "sk-or-v1-你的密钥"
  },
  "models": {
    "mode": "merge",
    "providers": {
      "openrouter": {
        "baseUrl": "https://openrouter.ai/api/v1",
        "apiKey": "${OPENROUTER_API_KEY}",
        "api": "openai-completions",
        "models": [
          { "id": "stepfun/step-3.5-flash:free", "name": "Step 3.5 Flash (Free)" }
        ]
      }
    }
  },
  "agents": {
    "defaults": {
      "model": { "primary": "openrouter/stepfun/step-3.5-flash:free" }
    }
  }
}
```

</details>

## 3. 创建 QQ 机器人

腾讯 QQ 于 2026 年 3 月 7 日正式开放 OpenClaw 官方原生接入——个人免费、一键创建、无需编写代码。

### 3.1 注册并创建机器人

打开 [QQ 开放平台 OpenClaw 接入页面](https://q.qq.com/qqbot/openclaw/login.html)，使用手机 QQ 扫描二维码完成注册登录：

![QQ 开放平台注册页面](/qq-bot-register.png)

登录后点击"创建机器人"，设置机器人名称和头像。创建完成后，系统会生成 **AppID** 和 **AppSecret**，并显示部署指引：

![QQ 机器人配置部署页面](/qq-bot-deploy-browser.png)

> **重要**：出于安全考虑，AppSecret 不支持明文保存，二次查看将会强制重置，请立即复制并妥善保存。

### 3.2 安装配置

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

### 3.3 开始聊天

回到浏览器的部署页面，点击"扫描聊天"按钮，用手机 QQ 扫码即可找到你的机器人。试着发一条消息：

![QQ 机器人聊天示例](/qq-bot-chat.jpg)

恭喜！你已经拥有了自己的 QQ AI 助手。

> 你也可以直接在手机 QQ 中搜索机器人名称来找到它。

## 4. 验证与管理

除了 QQ 聊天，你还可以通过 Web 控制面板管理 OpenClaw：

```bash
openclaw status
```

<details>
<summary>查看 status 输出截图</summary>

![openclaw status 输出](/openclaw-status.png)

</details>

```bash
openclaw dashboard
```

浏览器会自动打开控制面板 `http://localhost:18789`：

![Web 控制面板浏览器界面](/openclaw-dashboard-browser.png)

> **什么是 localhost？** `localhost` 就是"本机"的意思，这个网页只有你自己能打开。

<details>
<summary>常用命令速查</summary>

```bash
# 查看状态
openclaw status

# 深度健康检查
openclaw status --deep

# 系统诊断和修复
openclaw doctor

# 重启 Gateway（修改配置后执行）
openclaw gateway restart

# 查看日志
openclaw logs --follow

# 重新配置
openclaw configure
```

</details>

<details>
<summary>如何卸载 OpenClaw</summary>

### 方式一：使用内置卸载命令（推荐）

```bash
# 交互式卸载
openclaw uninstall

# 完全卸载（非交互式，适用于自动化）
openclaw uninstall --all --yes
```

### 方式二：手动卸载

如果 CLI 已删除但服务仍在运行，按步骤手动清理：

**1. 停止网关服务：**
```bash
openclaw gateway stop
```

**2. 卸载系统服务：**
```bash
openclaw gateway uninstall
```

**3. 删除配置和状态数据：**
```bash
rm -rf ~/.openclaw
```

**4. 删除 CLI（根据安装方式选择）：**
```bash
# npm 安装
npm rm -g openclaw

# pnpm 安装
pnpm remove -g openclaw

# bun 安装
bun remove -g openclaw
```

> **注意**：卸载前建议备份你的 workspace 目录（`~/.openclaw/workspace`），其中包含重要数据。

</details>

## 5. 常见问题

**Q: 提示"API key not found"怎么办？**

A: 编辑 `~/.openclaw/openclaw.json`（Windows 上是 `C:\Users\你的用户名\.openclaw\openclaw.json`），确保 API 密钥配置正确。参考[第 2 步](#_2-配置-ai-模型)的配置示例。

**Q: QQ 机器人没有响应？**

A: 检查以下几点：
1. Gateway 是否在运行：`openclaw status`
2. QQ 渠道是否配置成功：`openclaw channels status`
3. Token 格式是否正确（`AppID:AppSecret`）
4. 尝试重启：`openclaw gateway restart`

**Q: 机器人回复很慢或超时？**

A: 可能是模型响应慢，尝试换一个更快的模型（如 `deepseek-ai/DeepSeek-V3`），或检查网络连接。

---

**下一步**：
- 想深入了解 OpenClaw 的配置和更多玩法？→ [第二章 命令行与配置详解](/cn/adopt/chapter2/)
- 想接入飞书或 Telegram？→ [第三章 移动端接入](/cn/adopt/chapter3/)
- 想让 OpenClaw 定时执行任务？→ [第四章 自动化任务入门](/cn/adopt/chapter4/)
