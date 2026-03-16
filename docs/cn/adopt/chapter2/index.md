---
prev:
  text: '第1章 AutoClaw 一键安装'
  link: '/cn/adopt/chapter1'
next:
  text: '第3章 初始配置向导'
  link: '/cn/adopt/chapter3'
---

# 第二章 OpenClaw 快速安装

> 本章结束时，你将在电脑上运行一个真正的 AI 助手——可以在终端对话，也可以通过浏览器控制面板管理它。全程大约 10 分钟。

> **想跳过这些？** [第一章](/cn/adopt/chapter1/)介绍了 **AutoClaw**——下载 → 双击 → 注册即用，内置模型和免费额度，无需终端操作。

## 0. 支持的平台

OpenClaw 可以运行在所有主流操作系统上，配套 App 提供语音、摄像头等额外能力。

| 平台 | Gateway 支持 | 配套应用 |
|------|-------------|---------|
| **macOS** | 原生支持 | 菜单栏应用 + 语音唤醒（Voice Wake） |
| **Windows** | 支持（强烈推荐 WSL2） | 计划中 |
| **Linux** | 原生支持 | 计划中 |
| **iOS** | — | 配套 App：Canvas 画布、摄像头、语音唤醒 |
| **Android** | — | 配套 App：Canvas 画布、摄像头、屏幕共享 |

> **手机用户提示**：即使不安装配套 App，你也可以通过 WhatsApp / Telegram 等聊天软件直接和 OpenClaw 对话——不需要额外安装任何东西。

<details>
<summary>Gateway 服务安装方式</summary>

Gateway 作为后台服务运行，有多种安装方式：

| 方式 | 命令 | 说明 |
|------|------|------|
| **向导安装（推荐）** | `openclaw onboard --install-daemon` | 一站式完成配置和服务安装 |
| **直接安装** | `openclaw gateway install` | 仅安装服务，不运行配置向导 |
| **配置流程** | `openclaw configure` | 在配置流程中选择安装 Gateway 服务 |
| **修复/迁移** | `openclaw doctor` | 自动检测并修复服务问题 |

服务注册方式因操作系统而异：
- **macOS**：LaunchAgent（`ai.openclaw.gateway`）
- **Linux / WSL2**：systemd 用户服务（`openclaw-gateway.service`）

</details>

<details>
<summary>VPS 与云主机部署</summary>

如果你想把 OpenClaw 部署在远程服务器上，以下是支持的托管平台：

| 平台 | 说明 |
|------|------|
| **VPS 通用** | 任意 VPS 均可，推荐干净的 Ubuntu LTS 基础镜像 |
| **Fly.io** | 容器化部署 |
| **Hetzner** | Docker 部署 |
| **GCP** | Compute Engine 虚拟机 |
| **exe.dev** | VM + HTTPS 代理 |

> **注意**：避免使用第三方"一键镜像"，推荐在干净的基础镜像上用安装脚本安装。远程访问控制面板可通过 Tailscale 等工具实现。

更多云部署方案见[附录 C 类 Claw 方案对比与选型](/cn/appendix/appendix-c)。

</details>

## 1. 安装

**官方推荐方式**是使用一键安装脚本——它会自动检测 Node.js、安装 CLI、并启动配置向导，一步到位。

<details>
<summary>什么是终端（Terminal）？</summary>

终端是一个文字界面，你输入命令，电脑执行。打开方式：

- **Windows**：按 `Win + X`，选择"终端"或"PowerShell"
- **macOS**：按 `Cmd + 空格`，搜索"Terminal"
- **Linux**：按 `Ctrl + Alt + T`

![Windows PowerShell 终端](./images/windows-powershell.png)

</details>

### macOS / Linux / WSL2

```bash
curl -fsSL https://openclaw.ai/install.sh | bash
```

脚本会自动完成 Node.js 检测与安装、OpenClaw CLI 全局安装、启动配置向导（onboard）。

> 只装不配？加 `--no-onboard` 跳过向导：`curl -fsSL https://openclaw.ai/install.sh | bash -s -- --no-onboard`

### Windows（PowerShell）

打开 PowerShell（管理员模式），运行：

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
iwr -useb https://openclaw.ai/install.ps1 | iex
```

> 这个脚本会自动安装 Node.js 和 OpenClaw，并**立即启动配置向导（onboard）**。向导会依次要求你配置模型提供商的 API Key、聊天平台渠道（QQ/飞书/Telegram 等）以及各类辅助 API（如搜索引擎 API）。**建议提前准备好至少一个模型 API Key**（获取方式见[第 2 步](#_2-配置-ai-模型)），其他配置可以先跳过，后续章节会详细介绍。

验证安装：

```bash
openclaw --version
```

<details>
<summary>查看验证截图</summary>

![openclaw --version 终端输出](./images/openclaw-version.png)

</details>

<details>
<summary>什么是 Node.js？</summary>

OpenClaw 需要 Node.js 22+ 运行环境。Node.js 让用 JavaScript 编写的 OpenClaw 能在你的电脑上运行。你不需要学 JavaScript——安装脚本会自动处理。如果你已经装过 Node.js 22+，脚本会跳过这一步。

</details>

<details>
<summary>Windows 用户：什么是 WSL2？如何安装？</summary>

WSL2（Windows Subsystem for Linux 2）让你在 Windows 上运行完整的 Linux 环境。**如果你不想折腾，直接用 PowerShell 即可，跳过此步骤。**

1. 以管理员身份打开 PowerShell
2. 运行：`wsl --install`
3. 重启电脑，按提示设置用户名和密码

之后在开始菜单搜索"Ubuntu"即可打开 WSL2 终端，使用上面 macOS / Linux 的安装脚本。

> OpenClaw 官方建议：在 Windows 上，**强烈推荐使用 WSL2** 运行 OpenClaw，兼容性和稳定性更好。

</details>

<details>
<summary>从源码构建（开发者 / 贡献者）</summary>

```bash
# 1. 克隆并构建
git clone https://github.com/openclaw/openclaw.git
cd openclaw
pnpm install
pnpm ui:build
pnpm build

# 2. 全局链接 CLI
pnpm link --global
# 或者跳过链接，在仓库内使用 pnpm openclaw ...

# 3. 运行配置向导
openclaw onboard --install-daemon
```

> 从源码构建需要 pnpm。VPS / 云主机用户推荐在干净的 Ubuntu LTS 基础镜像上用安装脚本安装。

</details>

## 2. 配置 AI 模型

OpenClaw 本身不包含 AI 大脑，需要连接一个"模型提供商"来获得智能。如果安装脚本已启动了配置向导，按下方说明填写即可；如果跳过了向导，手动运行：

```bash
openclaw onboard --install-daemon
```

![openclaw onboard 配置向导界面](./images/openclaw-onboard.png)

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

![OpenRouter 注册页面](./images/openrouter-signup.png)

**第二步：创建 API 密钥**

1. 注册登录后，点击右上角**头像** → 选择 **Settings**
2. 在左侧菜单选择 **API Keys**
3. 点击 **Create** 创建一个新的 API Key
4. 复制生成的密钥（以 `sk-or-v1-` 开头）

![OpenRouter API Key 创建页面](./images/openrouter-token.png)

> **重要**：API 密钥只会显示一次，请立即复制保存。丢失需重新创建。

**第三步：充值（可选）**

OpenRouter 上带 `:free` 后缀的模型完全免费，如 `stepfun/step-3.5-flash:free`，日常学习足够使用。如果你想使用更强的付费模型：

1. 点击左侧菜单的 **Credits** 进入充值页面
2. 点击 **Add Credits** 进行充值
3. OpenRouter 支持银联、VISA 等常见卡型，甚至还支持虚拟货币支付，非常方便
4. 建议第一次充值最低限额 **5 美金**，够练手了

![OpenRouter 充值页面](./images/openrouter-credits.png)

> **省心提示**：如果后期使用量较大，可以在充值页面开启 **Auto Top Up**（自动充值），余额不足时自动补充，避免使用中断。

</details>

<details>
<summary>备选方案：使用硅基流动 SiliconFlow（国内提供商）</summary>

如果你更倾向使用国内提供商，推荐硅基流动——新注册送 **16 元免费算力券**，支持支付宝/微信充值。

**注册与获取 API Key**：

1. 访问 [硅基流动官网](https://cloud.siliconflow.cn)，使用手机号注册
2. 登录后进入 [控制台](https://cloud.siliconflow.cn/account/ak)，创建 API 密钥（以 `sk-` 开头）

![硅基流动注册页面](./images/siliconflow-register.png)

![API 密钥创建页面](./images/siliconflow-api-key.png)

**在 QuickStart 向导中填写**：

```
◇  API Base URL
│  https://api.siliconflow.cn/v1

◇  API Key
│  sk-你的密钥

◇  Model ID
│  deepseek-ai/DeepSeek-V3
```

> **费用参考**：DeepSeek V3 模型，16 元约可进行 800-1500 次对话。

</details>

> **更多提供商**：OpenClaw 支持 15+ 模型提供商（DeepSeek、Qwen、Kimi、GLM、OpenAI、Claude 等），完整列表及获取地址见[附录 E 模型提供商选型指南](/cn/appendix/appendix-e)。

> **想了解配置文件结构？** 向导会自动生成配置文件，通常无需手动修改。如需了解每个字段的含义，详见[附录 G 配置文件详解](/cn/appendix/appendix-g)。

## 3. 验证与首次对话

安装配置完成后，验证运行状态：

```bash
openclaw status
```

<details>
<summary>查看 status 输出截图</summary>

![openclaw status 输出](./images/openclaw-status.png)

</details>

一切正常后，开始你的第一次对话：

```bash
openclaw tui
```

试着输入：`你好，请介绍一下你自己` —— 如果龙虾回复了，恭喜你，安装成功！

打开 Web 控制面板，可视化管理你的龙虾：

```bash
openclaw dashboard
```

浏览器会自动打开控制面板 `http://localhost:18789`：

![Web 控制面板浏览器界面](./images/openclaw-dashboard-browser.png)

> **什么是 localhost？** `localhost` 就是"本机"的意思，这个网页只有你自己能打开。

> 更多命令见[附录 F 命令速查表](/cn/appendix/appendix-f)。

## 4. 常见问题

**Q: Windows 上运行 `openclaw` 提示"命令未找到"？**

A: PowerShell 默认禁止执行脚本。以管理员身份运行：
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```
然后重新打开终端。如果仍然不行，建议使用[一键安装脚本](#_1-安装)重新安装。

**Q: 提示"API key not found"怎么办？**

A: 重新运行配置向导：`openclaw onboard`，按提示重新输入 API Key。也可以检查环境变量是否正确设置（如 `OPENROUTER_API_KEY`）。参考[第 2 步](#_2-配置-ai-模型)的配置示例。

**Q: 机器人回复很慢或超时？**

A: 可能是模型响应慢，尝试换一个更快的模型（如 `deepseek-ai/DeepSeek-V3`），或检查网络连接。

**Q: 安装脚本下载很慢或超时？**

A: 可能是网络问题。可以尝试使用代理，或者多试几次。如果始终无法下载，可以手动访问 `https://openclaw.ai/install.sh`（或 `.ps1`）保存到本地后执行。

## 5. 版本升级与维护

升级只需一条命令——重新运行安装脚本即可：

```bash
curl -fsSL https://openclaw.ai/install.sh | bash
```

脚本会自动检测现有安装并原地升级。升级后运行：

```bash
openclaw doctor           # 迁移配置 + 健康检查
openclaw gateway restart  # 重启网关
```

> 如果升级后遇到问题：再次运行 `openclaw doctor`，它通常会直接告诉你修复方法。社区求助：[Discord](https://discord.gg/clawd)

<details>
<summary>想了解更多升级方式？（npm/pnpm 手动升级、渠道切换、回滚）</summary>

### 更新前准备

升级前建议备份你的定制内容：配置文件、凭证 `~/.openclaw/credentials/`、工作区 `~/.openclaw/workspace/`。

### 全局安装（npm/pnpm）

```bash
npm i -g openclaw@latest
# 或
pnpm add -g openclaw@latest
```

切换更新渠道：

```bash
openclaw update --channel beta    # 尝鲜版
openclaw update --channel dev     # 开发版
openclaw update --channel stable  # 稳定版（默认）
```

更新后必须运行：

```bash
openclaw doctor
openclaw gateway restart
```

### 源码安装

```bash
openclaw update
```

或手动：

```bash
git pull
pnpm install
pnpm build
pnpm ui:build
openclaw doctor
```

### 控制 UI 更新

Dashboard 控制面板提供"更新并重启"功能，等同于 `openclaw update`（仅限源码安装）。

### 回滚指定版本

```bash
# 安装指定版本
npm i -g openclaw@<version>
openclaw doctor
openclaw gateway restart
```

源码安装按日期回滚：

```bash
git fetch origin
git checkout "$(git rev-list -n 1 --before=\"2026-01-01\" origin/main)"
pnpm install && pnpm build
openclaw gateway restart
```

### 启动 / 停止 / 重启 Gateway

```bash
openclaw gateway status    # 查看状态
openclaw gateway stop      # 停止
openclaw gateway restart   # 重启（应用配置变更）
openclaw logs --follow     # 实时查看日志
```

macOS/Linux 系统服务直接操作：

```bash
# macOS launchd
launchctl kickstart -k gui/$UID/bot.molt.gateway

# Linux systemd
systemctl --user restart openclaw-gateway.service
```

### openclaw doctor 做了什么

- 迁移已弃用的配置键和旧版配置文件位置
- 审计私信策略，对风险设置发出警告
- 检查 Gateway 健康状况，提供重启选项
- 迁移旧版 Gateway 服务（launchd/systemd）到当前版本

</details>

---

## 6. 卸载

卸载前建议先备份 `~/.openclaw/workspace`（包含对话历史和记忆文件）。

```bash
openclaw uninstall
```

<details>
<summary>需要手动卸载，或 CLI 已删除但服务仍在运行？</summary>

**手动完整卸载：**

```bash
openclaw gateway stop
openclaw gateway uninstall
rm -rf "${OPENCLAW_STATE_DIR:-$HOME/.openclaw}"
npm rm -g openclaw
# 或 pnpm remove -g openclaw

# macOS 应用（如有）
rm -rf /Applications/OpenClaw.app
```

> 使用了 `--profile` 时，对每个 `~/.openclaw-<profile>` 重复删除步骤。

**服务残留手动清理：**

macOS：
```bash
launchctl bootout gui/$UID/bot.molt.gateway
rm -f ~/Library/LaunchAgents/bot.molt.gateway.plist
```

Linux：
```bash
systemctl --user disable --now openclaw-gateway.service
rm -f ~/.config/systemd/user/openclaw-gateway.service
systemctl --user daemon-reload
```

Windows：
```powershell
schtasks /Delete /F /TN "OpenClaw Gateway"
Remove-Item -Force "$env:USERPROFILE\.openclaw\gateway.cmd"
```

</details>

---

## 7. 迁移到新机器

<details>
<summary>换电脑了，怎么把龙虾完整搬过去？</summary>

核心思路：**复制状态目录 + 工作区 → 安装 → doctor → 重启**。无需重新进行新手引导。

**要迁移什么：**

| 项目 | 默认路径 | 包含内容 |
|------|---------|---------|
| **状态目录** | `~/.openclaw/` | 配置、凭证、API 密钥、OAuth 令牌、会话历史、渠道状态 |
| **工作区** | `~/.openclaw/workspace/` | MEMORY.md、USER.md、Skills 笔记等智能体文件 |

两者都复制 = 完整迁移。只复制工作区 = 不保留会话和凭证。

**步骤 0 — 旧机器备份：**

```bash
openclaw gateway stop
cd ~
tar -czf openclaw-state.tgz .openclaw
```

**步骤 1 — 新机器安装：**

按[第 1 步](#_1-安装)安装 CLI，然后用 `scp` 或外部驱动器把 `openclaw-state.tgz` 复制过来并解压，覆盖新生成的 `~/.openclaw/`。

**步骤 2 — 运行 doctor + 重启：**

```bash
openclaw doctor
openclaw gateway restart
openclaw status
```

**验证：**
- [ ] `openclaw status` 显示 Gateway 正在运行
- [ ] 渠道仍然连接（WhatsApp 不需要重新配对）
- [ ] Dashboard 显示现有会话
- [ ] 工作区文件存在

**常见陷阱：**

- **只复制了配置文件**：不够，必须迁移整个 `~/.openclaw/` 文件夹（凭证存在 `credentials/` 子目录）
- **权限问题**：确保状态目录由运行 Gateway 的用户拥有，不要用 root 复制
- **备份安全**：`~/.openclaw/` 含 API 密钥等敏感信息，加密存储，勿通过不安全渠道传输

</details>
