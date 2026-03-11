# 第二章 手动安装 OpenClaw

> 本章带你手动安装 OpenClaw 并配置 AI 模型。完成后你将拥有一个可以在终端对话的 AI 助手。

> **想跳过这些？** 如果你只想最快用上 AI 助手，[第一章 AutoClaw 一键安装](/cn/adopt/chapter1/)是更简单的选择。

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

::: tip 用 Trae CN 当安装助手（更省事）
如果你安装了 [Trae CN](https://www.trae.cn/)（字节跳动推出的免费 AI 编程助手），可以把它当作你的"本地安装/排障助手"，你只需要描述目标与当前报错即可。

- 安装环境：`帮我安装 Node.js 22，并告诉我如何验证安装是否成功（我的系统是 Windows/macOS/Linux）`
- 安装 OpenClaw：`帮我安装 openclaw@latest，并运行 openclaw --version 验证`
- 解决问题：`我执行 openclaw onboard 报错了，错误信息如下：... 请定位原因并给出修复步骤`
- 修改配置：`帮我打开并修改 openclaw.json，把模型 API Key 配好（Windows 路径是 C:\\Users\\用户名\\.openclaw\\openclaw.json；macOS/Linux 是 ~/.openclaw/openclaw.json）`
:::

### 1.1 安装 Node.js

> **什么是 Node.js？** OpenClaw 是用 JavaScript 编写的，Node.js 让它能在你的电脑上运行。你不需要学 JavaScript，装好就行。

根据你的操作系统选择安装方式：

**Windows 用户**：打开 PowerShell（管理员模式），运行一键安装脚本：

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
iwr -useb https://openclaw.ai/install.ps1 | iex
```

> 这个脚本会自动安装 Node.js 和 OpenClaw，并**立即启动配置向导（onboard）**。向导会依次要求你配置模型提供商的 API Key、聊天平台渠道（QQ/飞书/Telegram 等）以及各类辅助 API（如搜索引擎 API）。**建议提前准备好至少一个模型 API Key**（获取方式见[第 2 步](#_2-配置-ai-模型)），其他配置可以先跳过，后续章节会详细介绍。

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

::: details 国内镜像加速（下载太慢时使用）
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
:::

### 1.2 安装 OpenClaw

> Windows 一键脚本已包含此步骤（且会直接进入配置向导），如果你用了一键脚本可以跳到[第 2 步](#_2-配置-ai-模型)查看配置说明。

**macOS / Linux / WSL2 用户**：

```bash
npm install -g openclaw@latest
```

> **什么是 npm？** npm 是 Node.js 自带的"软件安装器"，`-g` 表示全局安装。

::: warning Windows 用户请勿使用 npm 安装
在 Windows 上通过 `npm install -g openclaw@latest` 安装后，可能会出现 `openclaw` 命令无法识别的问题。这是因为 Windows PowerShell 默认禁止执行脚本。请使用上方的 [一键安装脚本](#_1-1-安装-node-js)，它会自动处理执行策略。

如果你已经用 npm 安装了但找不到命令，在 PowerShell（管理员模式）中运行：
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```
然后重新打开终端即可。
:::

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

向导后续会询问渠道、技能等配置，**建议都先跳过**——后续章节会详细介绍。

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

## 4. 验证与管理

安装配置完成后，通过以下命令验证运行状态：

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

**Q: 机器人回复很慢或超时？**

A: 可能是模型响应慢，尝试换一个更快的模型（如 `deepseek-ai/DeepSeek-V3`），或检查网络连接。

---

**下一步**：
- 接入 QQ、飞书或 Telegram → [第三章 接入你的第一个聊天平台](/cn/adopt/chapter3/)
- 想深入了解配置和命令行？→ [第四章 命令行与基础配置](/cn/adopt/chapter4/)
