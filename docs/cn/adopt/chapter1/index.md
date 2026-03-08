# 第一章 十分钟上手 OpenClaw

这一章会带你完成 OpenClaw 的安装，从环境准备到运行配置向导，整个过程不超过 10 分钟。

## 1. 系统要求

- **操作系统**：macOS、Linux、或 Windows（直接使用 PowerShell 即可，进阶用户可选 WSL2）
- **Node.js**：22 或更高版本
- **内存**：至少 1GB，推荐 4GB
- **端口**：18789 需要可用（端口就像电脑上的"门牌号"，程序通过它通信。一般不需要额外操作，除非你安装了其他占用该端口的软件）

<details>
<summary>Windows 用户：什么是 WSL2？如何安装？</summary>

WSL2（Windows Subsystem for Linux 2）让你在 Windows 上运行完整的 Linux 环境，很多开发工具在 Linux 下兼容性更好。**如果你不想折腾，也可以直接在 Windows 下使用 PowerShell，跳过此步骤。**

**安装步骤**（需要 Windows 10 2004 及以上版本，或 Windows 11）：

1. 以管理员身份打开 PowerShell（右键开始菜单 → "终端(管理员)"或"PowerShell(管理员)"）
2. 运行以下命令，一键安装 WSL2 和 Ubuntu：

```powershell
wsl --install
```

3. 安装完成后**重启电脑**
4. 重启后会自动弹出 Ubuntu 窗口，按提示设置用户名和密码
5. 设置完成后，你就拥有了一个 Linux 终端环境

之后在开始菜单搜索"Ubuntu"即可打开 WSL2 终端。本教程后续的 `bash` 命令都可以在这个终端中运行。

> **提示**：如果 `wsl --install` 报错，可能需要先在"控制面板 → 程序 → 启用或关闭 Windows 功能"中勾选"适用于 Linux 的 Windows 子系统"和"虚拟机平台"，然后重启电脑再试。

</details>

> 如果你是全新安装，可以跳过版本检查，直接进入下一步安装 Node.js。如果你之前安装过 Node.js，可以检查版本：`node --version`，版本低于 22 需要升级。

> **什么是终端（Terminal）？**
>
> 本教程的很多操作需要在"终端"中输入命令。终端是一个文字界面，你输入命令，电脑执行。不同操作系统打开终端的方式不同：
>
> - **Windows**：按 `Win + X`，选择"终端"或"PowerShell"；或在开始菜单搜索"PowerShell"
> - **macOS**：按 `Cmd + 空格`，搜索"Terminal"并打开；或在"应用程序 → 实用工具"中找到"终端"
> - **Linux**：按 `Ctrl + Alt + T`；或在应用菜单中搜索"Terminal"
>
> 打开后你会看到一个黑色（或白色）的窗口，里面有一个闪烁的光标，这就是终端。后续所有 `bash` 代码块中的命令都在这里输入。

## 2. 安装 Node.js

> **什么是 Node.js？** Node.js 是一个让 JavaScript 语言能在电脑上运行的平台。OpenClaw 是用 JavaScript 编写的，所以需要先安装 Node.js 才能运行它。你不需要学会 JavaScript，只需要安装好 Node.js 就行。

> **国内网络提示**：下面的安装方法默认从国外服务器下载，速度可能较慢。如果遇到下载超时，请参考本节末尾的"国内镜像加速"。

### Windows 用户（不使用 WSL2）

**方案一：使用一键安装脚本（推荐）**

打开 PowerShell（管理员模式），**先运行以下命令允许执行脚本**（Windows 默认禁止运行网络脚本，这一步是解除限制）：

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

提示确认时输入 `Y` 回车。然后运行一键安装：

```powershell
iwr -useb https://openclaw.ai/install.ps1 | iex
```

这个脚本会自动下载并安装 Node.js 和 OpenClaw，全程无需手动操作。

**方案二：手动安装**

> **什么是 nvm？** nvm（Node Version Manager）是一个 Node.js 版本管理工具，可以帮你安装和切换不同版本的 Node.js。如果你只需要装一个版本，用方案一更简单。

1. 下载 nvm-windows：访问 [github.com/coreybutler/nvm-windows/releases](https://github.com/coreybutler/nvm-windows/releases) 下载 `nvm-setup.exe`
2. 安装后重新打开 PowerShell（管理员模式）
3. 安装 Node.js 22：

```powershell
nvm install 22
nvm use 22
```

### Windows 用户（使用 WSL2）

如果你已经按照上面的步骤安装了 WSL2，打开 Ubuntu 终端（开始菜单搜索"Ubuntu"），然后按照下面"Linux 用户"的步骤操作即可。

### macOS 用户

**方案一：使用 Homebrew 安装（推荐）**

Homebrew 是 macOS 上最流行的软件包管理器，类似于手机上的"应用商店"，可以用一行命令安装各种开发工具。

如果你还没有安装 Homebrew，先在终端运行：

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

安装完 Homebrew 后，再安装 Node.js：

```bash
brew install node@22
```

**方案二：使用官方安装包（不想装 Homebrew 的用户）**

访问 [Node.js 官网](https://nodejs.org/)，下载 macOS 安装包（.pkg 文件），双击运行安装即可。注意选择 22.x 版本。

### Linux 用户（含 WSL2）

**方案一：apt 直接安装（推荐，最简单）**

> **术语说明**：`curl` 是一个下载工具，用来从网上获取文件；`sudo` 是"以管理员身份运行"的意思，安装软件时需要管理员权限。

```bash
# 添加 NodeSource 仓库并安装 Node.js 22
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo bash -
sudo apt install -y nodejs

# 验证
node --version
```

> 这是最简单的方式，两条命令搞定。适用于 Ubuntu、Debian 及 WSL2。运行时会要求输入密码，输入你的登录密码即可（输入时屏幕不会显示字符，这是正常的）。

**方案二：使用 nvm 管理多版本**

如果你需要在多个 Node.js 版本间切换，可以使用 nvm：

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc   # 重新加载终端配置，让 nvm 命令生效
nvm install 22
nvm use 22
```

### 国内镜像加速

国内网络访问国外服务器可能较慢甚至超时。以下是各平台的镜像加速方案。

<details>
<summary>Linux / macOS / WSL2 镜像加速</summary>

**apt 方式（推荐）**：NodeSource 仓库一般国内可以直接访问。如果 `curl` 下载太慢，可以尝试先设置代理，或者直接用 nvm + 镜像的方式。

**nvm 方式加速**：

```bash
# 设置 nvm 从淘宝镜像下载 Node.js
export NVM_NODEJS_ORG_MIRROR=https://npmmirror.com/mirrors/node

# 写入配置文件，永久生效
echo 'export NVM_NODEJS_ORG_MIRROR=https://npmmirror.com/mirrors/node' >> ~/.bashrc
source ~/.bashrc

nvm install 22
```

**npm 镜像**（安装完 Node.js 后设置）：

```bash
npm config set registry https://registry.npmmirror.com
```

</details>

<details>
<summary>Windows（非 WSL2）镜像加速</summary>

**nvm-windows 镜像**：

```powershell
nvm node_mirror https://npmmirror.com/mirrors/node
nvm install 22
nvm use 22
```

**npm 镜像**：

```powershell
npm config set registry https://registry.npmmirror.com
```

</details>

> **验证镜像设置**：运行 `npm config get registry`，如果输出 `https://registry.npmmirror.com/` 说明设置成功。

## 3. 安装 OpenClaw

全局安装 OpenClaw CLI（CLI 即"命令行界面"，就是在终端里通过输入命令来操作的工具）：

> **什么是 npm？** npm（Node Package Manager）是 Node.js 自带的"软件安装器"。安装好 Node.js 后，npm 就自动可用了。下面这条命令的意思是：用 npm 把 OpenClaw 安装到电脑上（`-g` 表示全局安装，让你在任何目录都能使用 `openclaw` 命令）。

```bash
npm install -g openclaw@latest
```

验证安装：

```bash
openclaw --version
```

看到版本号说明安装成功。

## 4. 运行配置向导

安装完成后，运行配置向导：

```bash
openclaw onboard --install-daemon
```

这个命令会启动交互式配置向导，并安装后台守护进程（守护进程就是在后台默默运行的程序，让 OpenClaw 在你不操作时也能保持在线）。

### 4.1 选择模型提供商

向导首先会询问你使用哪个 AI 模型。OpenClaw 本身不包含 AI 大脑，它需要连接一个"模型提供商"的服务来获得智能。你需要在提供商那里注册账号，获取一个 **API Key**（类似于访问密码），OpenClaw 用它来调用 AI 服务。

**国内用户强烈推荐硅基流动（SiliconFlow）**——新注册用户可获得 **16 元免费算力券**，足够完成本教程的全部练习，无需国际信用卡。

| 推荐路径 | 适合用户 | 费用 |
|---------|---------|------|
| **硅基流动** | 国内用户（首选） | 新用户 16 元免费 |
| 通义千问 | 国内用户（备选） | 阿里云生态，企业级支持 |
| 豆包 | 国内用户（备选） | 火山方舟平台，模型丰富 |
| 混元 | 国内用户（备选） | hunyuan-lite 免费无限量 |
| 深度求索 / 月之暗面 / 阶跃星辰 / 稀宇科技 / 智谱 / 文心一言 | 国内用户（其他选择） | 支持支付宝，按量计费 |
| OpenRouter | 海外用户 | 需国际信用卡，按量计费 |
| OpenAI | 海外用户 | 需国际信用卡，按量计费 |
| Anthropic | 海外用户 | 需国际信用卡，按量计费 |
| Google | 海外用户 | 需国际信用卡，有免费额度 |
| xAI | 海外用户 | 需国际信用卡，按量计费 |

### 4.2 获取 API Key：以硅基流动为例

> 如果你已有其他提供商的 API Key，可跳过本节，直接看 4.3。

**第一步：注册账号**

1. 访问 [硅基流动官网](https://cloud.siliconflow.cn)
2. 点击右上角"注册"，使用手机号注册（也支持微信扫码登录）
3. 注册成功后自动获得 **16 元免费算力券**

<!-- TODO: 补充硅基流动注册页面截图 -->

**第二步：创建 API 密钥**

1. 登录后进入 [控制台](https://cloud.siliconflow.cn/account/ak)
2. 左侧菜单选择"API 密钥"
3. 点击"创建新 API 密钥"
4. 复制生成的密钥（以 `sk-` 开头）

<!-- TODO: 补充 API 密钥创建页面截图 -->

> **重要**：API 密钥只会显示一次，请立即复制保存到安全的地方。如果丢失，需要重新创建。

**第三步：充值（可选）**

免费额度用完后，在控制台"费用中心"充值，支持支付宝和微信支付。

> **费用参考**：使用 DeepSeek V3 模型，16 元约可进行 800-1500 次对话。日常轻度使用每月 10-30 元足够。

<details>
<summary>其他提供商的 API Key 获取方式</summary>

- **深度求索（DeepSeek）**：访问 https://platform.deepseek.com ，注册后在控制台创建密钥，支持支付宝充值
- **通义千问（Qwen）**：访问 https://dashscope.console.aliyun.com ，阿里云旗下，中文能力突出，企业级支持
- **月之暗面（Moonshot/Kimi）**：访问 https://platform.moonshot.cn ，国内团队，中文理解能力强
- **阶跃星辰（StepFun）**：访问 https://platform.stepfun.com ，多模态能力强，支持长上下文
- **豆包（字节跳动/Doubao）**：访问 https://console.volcengine.com/ark ，火山方舟平台，支持 doubao-seed 系列模型，按量计费
- **混元（腾讯/Hunyuan）**：访问 https://cloud.tencent.com/product/tclm ，hunyuan-lite 免费无限量使用，支持多模态
- **稀宇科技（MiniMax）**：访问 https://platform.minimaxi.com ，支持语音和多模态
- **智谱（GLM）**：访问 https://open.bigmodel.cn ，清华技术背景，中文理解能力强
- **文心一言（百度/ERNIE）**：访问 https://console.bce.baidu.com/qianfan ，百度生态，中文内容生成
- **OpenRouter**：访问 https://openrouter.ai ，一个 Key 可访问多家模型（含上述所有海外模型）
- **OpenAI（GPT）**：访问 https://platform.openai.com ，最新旗舰模型 GPT-5.4，需国际信用卡
- **Anthropic（Claude）**：访问 https://console.anthropic.com ，最新旗舰模型 Claude Opus 4.6，需国际信用卡
- **Google（Gemini）**：访问 https://aistudio.google.com ，最新旗舰模型 Gemini 3.1 Pro，有免费额度
- **xAI（Grok）**：访问 https://console.x.ai ，最新旗舰模型 Grok-4，需国际信用卡

</details>

### 4.3 在向导中配置

在配置向导中选择提供商，然后输入 API Key：

```
◇  Model/auth provider
│  ○ DeepSeek
│  ○ Kimi
│  ○ OpenRouter
│  ● Custom（自定义 API 端点）← 硅基流动选这个
```

选择 `Custom` 后，按提示输入：

- **API Base URL**：`https://api.siliconflow.cn/v1`
- **API Key**：粘贴你刚才复制的密钥
- **默认模型**：`deepseek-ai/DeepSeek-V3`（推荐）

也可以跳过向导，后续通过命令行手动配置：

```bash
openclaw config set llm.provider "siliconflow"
openclaw config set llm.baseUrl "https://api.siliconflow.cn/v1"
openclaw config set llm.apiKey "sk-xxxxx"
openclaw config set llm.default "deepseek-ai/DeepSeek-V3"
```

### 4.4 配置聊天渠道（可选）

向导会询问是否配置 Slack、Telegram 等聊天渠道。如果暂时不需要，可以选择跳过，后续通过 `openclaw configure` 添加。

### 4.5 配置技能（可选）

向导会显示可用的技能列表，询问是否安装。建议先跳过，等熟悉基本操作后再安装。

配置完成后，向导会自动启动 Gateway 守护进程。

## 5. 验证安装

检查 Gateway 状态：

```bash
openclaw status
```

看到 `Gateway service: running` 说明安装成功。Gateway（网关）是 OpenClaw 的核心服务，负责接收你的指令、调用 AI 模型、执行任务。

打开 Web 控制面板：

```bash
openclaw dashboard
```

浏览器会自动打开 `http://localhost:18789`，你可以在这里和 OpenClaw 对话。

> **什么是 localhost？** `localhost` 就是"本机"的意思，指你自己的电脑。`http://localhost:18789` 表示访问本机 18789 端口上运行的服务。这个网页只有你自己能打开，外人无法访问。

## 6. 第一次对话

在控制面板试试以下指令：

```
帮我创建一个文件叫 hello.txt，写上今天的日期和"Hello from OpenClaw!"
```

如果 OpenClaw 成功创建了文件并告诉你完成，恭喜，一切就绪！再试试更有趣的：

```
用 Python 写一个猜数字小游戏，保存为 game.py 并运行它
```

> **提示**：如果 OpenClaw 只给建议而不执行命令，参见本章末尾 FAQ 的"Tools Profile"问题。

## 7. 费用与成本控制

使用硅基流动的 16 元免费额度，足够你完成前几章的学习。日常使用的费用取决于你的调用频率和模型选择。

**省钱技巧**：
- 简单任务用小模型（如 Qwen2.5-7B），复杂任务才用大模型（如 DeepSeek V3）
- 第七章会详细介绍多模型路由和成本优化策略

<details>
<summary>进阶：Coding Plan 订阅模式（适合重度用户）</summary>

如果你每天大量使用 OpenClaw，按 Token 计费可能不够经济。一些平台提供固定月费的 Coding Plan 订阅服务（如阿里云百炼、智谱 GLM），以包月价格访问编码优化模型。

配置方法：运行 `openclaw configure`，在向导中选择 Coding Plan 提供商并输入订阅 API Key。也可以在 Web 控制面板"配置" → "All Settings" 中手动添加。

> 对于大多数用户，硅基流动的按量计费已经足够经济，不需要订阅 Coding Plan。

</details>

## 8. 常用命令

### 基础命令

```bash
# 查看整体状态
openclaw status

# 深度健康检查
openclaw status --deep

# 系统诊断和修复
openclaw doctor

# 查看版本
openclaw --version

# 查看帮助
openclaw --help
```

<details>
<summary>更多命令：Gateway 管理、模型管理、渠道管理、日志调试</summary>

### Gateway 管理

```bash
# 查看 Gateway 状态
openclaw gateway status

# 启动 Gateway
openclaw gateway start

# 停止 Gateway
openclaw gateway stop

# 重启 Gateway（修改配置后必须执行）
openclaw gateway restart

# 前台运行并显示日志（调试用）
openclaw gateway run --verbose
```

### 模型管理

```bash
# 列出可用模型
openclaw models list

# 查看模型状态
openclaw models status

# 设置默认模型
openclaw models set <provider/model>

# 检查 API 认证
openclaw models auth
```

### 渠道管理

```bash
# 列出所有渠道
openclaw channels list

# 查看渠道连接状态
openclaw channels status

# 添加新渠道
openclaw channels add

# 登录渠道（如扫码登录 WhatsApp）
openclaw channels login

# 登出渠道
openclaw channels logout
```

### 日志和调试

```bash
# 实时查看日志
openclaw logs --follow

# 查看最近日志
openclaw logs
```

</details>

## 9. 常见问题

**Q: OpenClaw 只会聊天不干活，让它执行命令却只给建议？**

A: 这是 2026.3.2 版本后最常见的问题，原因是 Tools Profile 被设置成了 messaging。有两种修复方法：

方法一：命令行修复（推荐）

```bash
# 查看当前 profile
openclaw config get tools

# 如果不是 full，切换成 full
openclaw config set tools.profile full

# 重启 gateway
openclaw gateway restart
```

方法二：Web 界面修复

1. 访问 http://localhost:18789（本地模式默认端口）
2. 点击左侧"配置"或"Agents"
3. 找到对应的 Agent，点击旁边的"tools"
4. 选择"Full"选项
5. 保存并重启

或者直接编辑配置文件，找到 tools 部分改成：

```json
"tools": {
  "profile": "full"
}
```

**Q: 提示"API key not found"怎么办？**

A: 编辑配置文件 `openclaw.json`（位于 `~/.openclaw/openclaw.json`，Windows 上是 `C:\Users\你的用户名\.openclaw\openclaw.json`），确保 API 密钥配置正确。你可以用任何文本编辑器（如记事本、VS Code）打开它。例如使用硅基流动：

```json
{
  "llm": {
    "provider": "siliconflow",
    "baseUrl": "https://api.siliconflow.cn/v1",
    "apiKey": "sk-xxxxx",
    "default": "deepseek-ai/DeepSeek-V3"
  }
}
```

**Q: Web 面板无法访问？**

A: 检查防火墙设置，确保端口 18789 未被占用。可以在配置文件中修改端口号。

**Q: 命令执行失败？**

A: 确认 OpenClaw 有足够的文件系统权限。某些操作可能需要明确授权。

---

**下一步**：[第二章 移动端接入](/cn/adopt/chapter2/)
