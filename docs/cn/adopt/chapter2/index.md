# 第二章 命令行与配置详解

> **前提**：本章假设你已完成[第一章](/cn/adopt/chapter1/)的安装，拥有了一个可以正常使用的 QQ AI 助手。

第一章带你用最短路径拥有了 QQ AI 助手。本章深入介绍 OpenClaw 的配置向导、命令行工具和 Web 控制面板——帮你全面掌握 OpenClaw 的配置与管理能力。

## 1. 配置向导详解

第一章中我们快速跑完了 `openclaw onboard --install-daemon` 向导。这里详细解说每个步骤，方便你理解和日后重新配置。

### 1.1 启动向导

```bash
openclaw onboard --install-daemon
```

> **什么是 daemon？** daemon（守护进程）是一种在后台持续运行的程序。`--install-daemon` 参数让 OpenClaw 安装一个后台服务（Gateway），这样即使你关闭终端，QQ 机器人和其他功能也能继续工作。

### 1.2 安全确认

向导首先会询问安全确认：

```
◇  Do you want to proceed?
│  Yes
```

选择 **Yes** 继续。这一步确认你了解 OpenClaw 会在你的电脑上执行操作（如读写文件、运行命令）。

### 1.3 配置模式

```
◇  Select configuration mode
│  QuickStart
```

- **QuickStart**：推荐新用户使用，自动应用合理的默认配置
- **Advanced**：适合有经验的用户，可以逐项自定义所有设置

QuickStart 模式下，OpenClaw 会展示默认配置摘要：

```
◇  These are the defaults for QuickStart mode:
│  System prompt:  default
│  Timezone:       auto-detected
│  Tools profile:  full
│  Memory:         enabled
│  ...
```

> **什么是 Tools Profile？** `full` 表示 OpenClaw 可以执行命令、读写文件等完整操作。如果设为 `messaging`，它只能聊天不能干活。建议保持 `full`。

### 1.4 配置 AI 模型

这是向导的核心步骤。OpenClaw 本身不包含 AI 大脑，需要连接一个"模型提供商"。

```
◇  Select AI model provider
│  Custom Provider
```

选择 **Custom Provider** 可以接入硅基流动等国内提供商。然后依次输入：

```
◇  API Base URL
│  https://api.siliconflow.cn/v1

◇  API Key
│  sk-你的密钥

◇  Endpoint compatibility
│  OpenAI-compatible

◇  Model ID
│  deepseek-ai/DeepSeek-V3
```

> **国内用户推荐硅基流动（SiliconFlow）**——新注册送 **16 元免费算力券**，足够完成全部教程练习。如何注册和获取 API Key，详见[第一章第 2 节](/cn/adopt/chapter1/#_2-配置-ai-模型)的折叠指南。

<details>
<summary>其他模型提供商配置参考</summary>

| 提供商 | API Base URL | 推荐模型 | 备注 |
|-------|-------------|---------|------|
| 硅基流动 | `https://api.siliconflow.cn/v1` | `deepseek-ai/DeepSeek-V3` | 国内首推，新用户送 16 元 |
| 深度求索 | `https://api.deepseek.com/v1` | `deepseek-chat` | DeepSeek 官方 |
| 通义千问 | `https://dashscope.aliyuncs.com/compatible-mode/v1` | `qwen-max` | 阿里云旗下 |
| 月之暗面 | `https://api.moonshot.cn/v1` | `moonshot-v1-8k` | Kimi |
| 阶跃星辰 | `https://api.stepfun.com/v1` | `step-2-16k` | 有免费模型 |
| 混元 | `https://api.hunyuan.cloud.tencent.com/v1` | `hunyuan-lite` | 腾讯，hunyuan-lite 免费 |

所有提供商均选择 **OpenAI-compatible** 兼容模式。

</details>

### 1.5 配置聊天渠道（可选）

向导会列出可用的聊天渠道：

```
◇  Select channels to configure
│  ○ Telegram
│  ○ Discord
│  ○ Slack
│  ○ WhatsApp
│  ...
```

如果你已在第一章配置了 QQ 机器人，这里可以**直接跳过**。后续需要接入其他渠道时，参见[第三章 移动端接入](/cn/adopt/chapter3/)。

### 1.6 完成向导

向导最后会询问是否启用 Web 搜索、Skills（技能）和 Hooks（钩子）等功能。**新手建议都先跳过**，这些功能会在后续章节详细介绍。

向导完成后，Gateway（网关服务）会自动启动：

```
✔  Configuration saved
✔  Gateway daemon installed and started
```

## 2. Web 控制面板

OpenClaw 提供了一个本地 Web 控制面板，让你可以在浏览器中管理和使用 OpenClaw。

### 2.1 打开控制面板

```bash
openclaw dashboard
```

![openclaw dashboard 终端输出](/openclaw-dashboard-terminal.png)

浏览器会自动打开 `http://localhost:18789`：

![Web 控制面板浏览器界面](/openclaw-dashboard-browser.png)

> **什么是 localhost？** `localhost` 就是"本机"的意思，这个网页只有你自己能打开。`18789` 是端口号，就像门牌号一样区分不同的服务。

### 2.2 面板功能

Web 控制面板提供以下功能：

- **对话界面**：直接在浏览器中与 OpenClaw 聊天，和 QQ 机器人一样的 AI 能力
- **状态监控**：查看 Gateway 运行状态、已连接的渠道、模型配置
- **日志查看**：实时查看 OpenClaw 的运行日志
- **配置管理**：修改模型、渠道等配置（修改后需重启 Gateway）

## 3. 第一次 CLI 对话

除了 QQ 和 Web 面板，你还可以直接在终端中与 OpenClaw 对话：

```bash
openclaw chat
```

进入交互式对话后，试试让它执行一些任务：

```
帮我创建一个文件叫 hello.txt，写上今天的日期和"Hello from OpenClaw!"
```

如果 OpenClaw 成功创建了文件，说明它不仅能聊天，还能帮你干活。再试试更有趣的：

```
用 Python 写一个猜数字小游戏，保存为 game.py 并运行它
```

> **提示**：如果 OpenClaw 只给建议而不执行命令，可能是 Tools Profile 被设为了 `messaging`。运行以下命令修复：
> ```bash
> openclaw config set tools.profile full
> openclaw gateway restart
> ```

## 4. 状态检查与管理

### 4.1 查看运行状态

```bash
openclaw status
```

![openclaw status 输出](/openclaw-status.png)

这会显示 Gateway 是否在运行、已连接的渠道、使用的模型等关键信息。

### 4.2 深度健康检查

```bash
openclaw status --deep
```

深度检查会额外验证 API 连接、模型可用性等。

### 4.3 系统诊断

遇到问题时，运行诊断工具：

```bash
openclaw doctor
```

它会自动检查常见问题并给出修复建议。

### 4.4 查看日志

```bash
openclaw logs --follow
```

`--follow` 参数让日志实时滚动显示，按 `Ctrl + C` 退出。

### 4.5 重启 Gateway

修改配置后需要重启 Gateway 才能生效：

```bash
openclaw gateway restart
```

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

# 重新运行配置向导
openclaw configure

# 打开 Web 控制面板
openclaw dashboard
```

更完整的命令列表见[附录 A：命令速查表](/cn/appendix/appendix-a)。

</details>

## 5. 配置文件

OpenClaw 的所有配置存储在 `~/.openclaw/openclaw.json`（Windows 上是 `C:\Users\你的用户名\.openclaw\openclaw.json`）。

### 5.1 配置文件结构

```json
{
  "env": {
    "SILICONFLOW_API_KEY": "sk-你的密钥"
  },
  "models": {
    "mode": "merge",
    "providers": {
      "siliconflow": {
        "baseUrl": "https://api.siliconflow.cn/v1",
        "apiKey": "${SILICONFLOW_API_KEY}",
        "api": "openai-completions",
        "models": [
          { "id": "deepseek-ai/DeepSeek-V3", "name": "DeepSeek V3" }
        ]
      }
    }
  },
  "agents": {
    "defaults": {
      "model": { "primary": "siliconflow/deepseek-ai/DeepSeek-V3" }
    }
  }
}
```

> **模型标识格式**：`提供商/模型名`，例如 `siliconflow/deepseek-ai/DeepSeek-V3`。

### 5.2 添加多个模型

你可以在 `providers` 中添加多个提供商，然后在 `agents.defaults.model` 中选择默认使用哪个：

```json
{
  "models": {
    "providers": {
      "siliconflow": {
        "baseUrl": "https://api.siliconflow.cn/v1",
        "apiKey": "${SILICONFLOW_API_KEY}",
        "api": "openai-completions",
        "models": [
          { "id": "deepseek-ai/DeepSeek-V3", "name": "DeepSeek V3" },
          { "id": "Qwen/Qwen2.5-72B-Instruct", "name": "Qwen 2.5 72B" }
        ]
      }
    }
  }
}
```

更深入的多模型配置和成本优化见[第八章 多模型与成本优化](/cn/adopt/chapter8/)。

### 5.3 常见配置修改

**切换默认模型**：

修改 `agents.defaults.model.primary` 的值即可。例如切换到 Qwen：

```json
{
  "agents": {
    "defaults": {
      "model": { "primary": "siliconflow/Qwen/Qwen2.5-72B-Instruct" }
    }
  }
}
```

修改后运行 `openclaw gateway restart` 生效。

> **完整配置参考**：所有可用配置项见[附录 B：配置文件详解](/cn/appendix/appendix-b)。

## 6. 常见问题

**Q: 向导配置错了，怎么重新配置？**

A: 运行 `openclaw configure` 重新进入配置向导，或直接编辑 `~/.openclaw/openclaw.json`。

**Q: 提示"API key not found"怎么办？**

A: 检查 `~/.openclaw/openclaw.json` 中的 API 密钥配置是否正确。确保 `env` 中的密钥变量名和 `providers` 中引用的变量名一致。

**Q: Web 面板无法访问？**

A: 检查防火墙设置，确保端口 18789 未被占用。也可以尝试 `openclaw gateway restart` 重启服务。

**Q: OpenClaw 只会聊天不干活？**

A: 原因是 Tools Profile 被设置成了 `messaging`，运行以下命令修复：

```bash
openclaw config set tools.profile full
openclaw gateway restart
```

---

**下一步**：
- 想接入飞书或 Telegram？→ [第三章 移动端接入](/cn/adopt/chapter3/)
- 想让 OpenClaw 定时执行任务？→ [第四章 自动化任务入门](/cn/adopt/chapter4/)
- 想安装和使用技能？→ [第五章 Skills 技能系统](/cn/adopt/chapter5/)
