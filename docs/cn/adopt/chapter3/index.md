# 第三章 初始配置向导

> 本章详解 OpenClaw 的首次配置体验——从「装好了，然后呢？」到「龙虾已就绪」的完整流程。

> **前置条件**：已完成[第二章 OpenClaw 手动安装](/cn/adopt/chapter2/)，OpenClaw CLI 已安装。

## 0. 全景：两条 Onboarding 路径

安装完 OpenClaw 后，你需要通过 **Onboarding（配置向导）** 告诉龙虾三件事：用谁的大脑（模型）、怎么联系你（渠道）、在哪里工作（工作区）。OpenClaw 提供两条路径：

![OpenClaw Onboarding](/OpenClaw-Onboarding.png)

```mermaid
flowchart TB

subgraph OB["OpenClaw Onboarding 路径"]

subgraph CLI["CLI 配置向导（跨平台）"]
A1["openclaw onboard"]
A2["终端交互式配置"]
A3["支持脚本化 / 非交互"]
A1 --> A2 --> A3
end

subgraph MAC["macOS 应用引导（仅 macOS）"]
B1["OpenClaw.app 启动"]
B2["图形化分步引导"]
B3["自动申请系统权限"]
B1 --> B2 --> B3
end

end

A3 --> C
B3 --> C

C["Gateway 启动
龙虾就绪 ✅"]
```

| 路径 | 适用场景 | 平台 |
|------|---------|------|
| **CLI 配置向导** | 需要完全控制、远程服务器、自动化脚本 | macOS / Linux / Windows (WSL2) |
| **macOS 应用引导** | 希望图形化引导、需要语音/摄像头等原生权限 | 仅 macOS |

> **已经在第二章跑过 `openclaw onboard` 了？** 那你已经完成了基本配置！本章帮你理解向导的每一步做了什么，以及如何利用高级选项微调配置。

---

## 1. CLI 配置向导（所有平台）

CLI 向导是最通用的 Onboarding 方式，适用于 macOS、Linux 和 Windows（WSL2）。

### 1.1 启动向导

```bash
openclaw onboard
```

> **想同时安装后台服务？** 加 `--install-daemon` 一步到位：
> ```bash
> openclaw onboard --install-daemon
> ```

### 1.2 QuickStart vs Advanced

向导启动后会问你第一个问题：**QuickStart（快速开始）** 还是 **Advanced（高级模式）**？

| 选项 | 自动配置内容 | 适合谁 |
|------|------------|--------|
| **QuickStart** | 本地 Gateway + 默认工作区 + 端口 18789 + Token 认证 + coding 工具策略 | 第一次用，想尽快聊天 |
| **Advanced** | 所有选项都可自定义 | 需要远程部署、Tailscale、特殊安全策略 |

<details>
<summary>QuickStart 默认配置一览</summary>

QuickStart 模式自动应用以下默认值：

| 配置项 | 默认值 | 说明 |
|--------|--------|------|
| Gateway 位置 | 本机（loopback） | 仅本机可访问 |
| 工作区 | `~/.openclaw/workspace/` | 或使用已有工作区 |
| Gateway 端口 | 18789 | 标准端口 |
| 认证方式 | Token（自动生成） | 即使本地也需认证 |
| 工具策略 | `tools.profile: "coding"` | 保留文件系统和运行时工具 |
| DM 隔离 | `session.dmScope: "per-channel-peer"` | 每个渠道独立会话 |
| Tailscale | 关闭 | 不暴露到 Tailnet |
| Telegram/WhatsApp DM | 白名单模式 | 会提示输入你的手机号 |

> 已有自定义 `tools.profile` 的用户不会被覆盖——向导尊重现有配置。

</details>

### 1.3 向导配置的六个步骤

无论选择哪种模式，向导都会依次走过这些步骤：

#### 步骤一：模型与认证

选择模型提供商和认证方式。支持的认证方式：

- **API Key**：直接粘贴密钥（最常用）
- **OAuth**：浏览器授权（部分提供商支持）
- **Setup Token**：一次性令牌

> 不确定选哪个？详见[第五章 模型管理](/cn/adopt/chapter5/)了解各提供商的接入方式。

<details>
<summary>安全提示：模型选择与工具安全</summary>

如果你的龙虾会运行工具（执行命令、调用 API）或处理来自 Webhook/Hooks 的外部内容，请注意：

- **优先选择最新一代的强模型**——较弱/较旧的模型更容易被提示词注入攻击
- **保持严格的工具策略**——避免使用 `tools.profile: "full"`（不限制模式），除非你完全信任所有输入来源
- 详见[第十章 安全防护](/cn/adopt/chapter10/)

</details>

<details>
<summary>密钥存储：明文 vs SecretRef</summary>

向导默认将 API Key 以明文存储在配置文件中。如果你需要更安全的存储方式：

**交互模式**：选择 Secret Reference 模式，可以指向环境变量或 Provider Ref（文件/可执行程序），向导会立即验证引用是否有效。

**非交互模式**：使用 `--secret-input-mode ref`，此时提供商的环境变量必须已设置：
```bash
export OPENAI_API_KEY="sk-..."
openclaw onboard --secret-input-mode ref --non-interactive
```

</details>

#### 步骤二：工作区

配置龙虾的工作目录，存放 IDENTITY.md、MEMORY.md 等工作区文件。

- 默认路径：`~/.openclaw/workspace/`
- 如果路径下已有工作区文件，向导会复用而非覆盖

#### 步骤三：Gateway 配置

设置 Gateway 的运行参数：

- **端口**：默认 18789
- **绑定地址**：默认 127.0.0.1（仅本机）
- **认证模式**：Token 或密码
- **Tailscale 暴露**：是否通过 Tailnet 访问

<details>
<summary>Gateway Token 与 SecretRef</summary>

在交互式 Token 模式下，你可以选择：
- **明文 Token**（默认）：存储在配置文件中
- **SecretRef**：通过环境变量或外部程序管理 Token

非交互模式下使用 SecretRef：
```bash
openclaw onboard --gateway-token-ref-env GATEWAY_TOKEN --non-interactive
```

注意：如果同时配置了 `gateway.auth.token` 和 `gateway.auth.password` 但未设置 `gateway.auth.mode`，后台服务安装会被阻止，直到你明确选择一种模式。

</details>

#### 步骤四：渠道接入

选择要连接的聊天平台：

- WhatsApp、Telegram、Discord、Google Chat
- Mattermost、Signal、BlueBubbles、iMessage

> 可以跳过，后续用 `openclaw channels add` 随时添加。各渠道详细配置见[第四章 Chat Provider](/cn/adopt/chapter4/)。

#### 步骤五：后台服务

安装 Gateway 后台服务，确保重启后自动运行：

- **macOS**：LaunchAgent（`ai.openclaw.gateway`）
- **Linux / WSL2**：systemd 用户服务（`openclaw-gateway.service`）

<details>
<summary>后台服务与 SecretRef 的注意事项</summary>

- 如果 Token 认证使用 SecretRef，后台服务安装时会验证引用有效性，但**不会**将解析后的 Token 持久化到服务环境中
- 如果配置的 SecretRef 无法解析，后台服务安装会被阻止，并给出修复建议
- 使用 `openclaw doctor` 可以自动检测和修复服务问题

</details>

#### 步骤六：健康检查与技能安装

向导的最后阶段：

1. **启动 Gateway** 并验证运行状态
2. **安装推荐技能**和可选依赖

> 想了解技能系统？详见[附录 D：技能开发与发布指南](/cn/appendix/appendix-d)。

### 1.4 Web 搜索配置

向导还包含一个 **Web 搜索** 配置步骤，让龙虾能使用 `web_search` 工具。支持的搜索提供商：

| 提供商 | 说明 |
|--------|------|
| Perplexity | AI 搜索引擎 |
| Brave | 隐私搜索 |
| Gemini | Google AI 搜索 |
| Grok | xAI 搜索 |
| Kimi | 月之暗面搜索 |

粘贴对应的 API Key 即可启用。也可以后续配置：

```bash
openclaw configure --section web
```

---

## 2. macOS 应用引导

如果你使用 macOS 上的 OpenClaw.app（Control UI），首次启动会进入图形化引导流程。

### 2.1 引导步骤总览

| 步骤 | 内容 | 操作 |
|------|------|------|
| ① | macOS 安全警告 | 点击「允许」 |
| ② | 本地网络发现 | 允许查找本地网络设备 |
| ③ | 安全须知 | 阅读信任模型说明 |
| ④ | 选择 Gateway 位置 | 本机 / 远程 / 稍后配置 |
| ⑤ | 系统权限申请 | 逐项授权 |
| ⑥ | 安装 CLI（可选） | 安装 `openclaw` 命令行工具 |
| ⑦ | Onboarding 对话 | 龙虾自我介绍 + 引导下一步 |

### 2.2 安全须知（步骤 ③）

应用会显示 OpenClaw 的信任模型说明：

- **默认定位**：个人助手——一个可信操作者边界
- **多用户场景**：需要拆分信任边界、最小化工具权限、参考[第十章 安全防护](/cn/adopt/chapter10/)
- **本地新安装**默认使用 `tools.profile: "coding"`，保留文件系统和运行时工具

### 2.3 Gateway 位置选择（步骤 ④）

| 选项 | 说明 |
|------|------|
| **This Mac（本机）** | 在本机运行 Gateway，应用直接配置认证和凭证 |
| **Remote（远程）** | 连接远程 Gateway（通过 SSH 或 Tailnet），不修改本机认证 |
| **Configure later（稍后配置）** | 跳过设置，应用保持未配置状态 |

<details>
<summary>Gateway 认证提示</summary>

- 向导现在即使对本地回环连接也会生成 Token，所以本地 WebSocket 客户端也需要认证
- 如果禁用认证，任何本地进程都能连接——仅在完全可信的机器上这样做
- 多机访问或非回环绑定时，请务必使用 Token 认证

</details>

### 2.4 系统权限（步骤 ⑤）

macOS 应用会请求以下 TCC 权限：

| 权限 | 用途 |
|------|------|
| **Automation（自动化）** | AppleScript 控制其他应用 |
| **Notifications（通知）** | 推送消息提醒 |
| **Accessibility（辅助功能）** | UI 交互控制 |
| **Screen Recording（屏幕录制）** | 截屏/屏幕共享 |
| **Microphone（麦克风）** | 语音输入 |
| **Speech Recognition（语音识别）** | 语音转文字 |
| **Camera（摄像头）** | 视觉输入 |
| **Location（定位）** | 位置感知 |

> 不需要的权限可以跳过，后续在 macOS「系统设置 → 隐私与安全性」中随时调整。

### 2.5 CLI 安装（步骤 ⑥）

应用可以通过 npm/pnpm 安装全局 `openclaw` CLI，这样终端命令和 LaunchAgent 定时任务都能正常工作。此步骤可选——如果你已经通过[第二章](/cn/adopt/chapter2/)安装了 CLI，可以跳过。

### 2.6 Onboarding 对话（步骤 ⑦）

完成设置后，应用会打开一个**专用的 Onboarding 对话会话**：

- 龙虾会自我介绍并引导你探索功能
- 这个对话与你的正常会话**分开**，不会干扰日常使用
- Gateway 端首次运行时会执行 Bootstrapping（引导启动），初始化工作区文件

---

## 3. 自定义模型提供商（Custom Provider）

如果向导内置列表中没有你想用的提供商——比如自建的 API 网关、公司内部模型服务、或其他兼容 OpenAI/Anthropic 接口的服务——可以选择 **Custom Provider**。

### 3.1 配置步骤

在向导的模型选择环节，选择 **Custom Provider**，然后依次填写：

| 步骤 | 内容 | 示例 |
|------|------|------|
| 1. 选择兼容类型 | OpenAI-compatible / Anthropic-compatible / Unknown（自动检测） | OpenAI-compatible |
| 2. 输入 Base URL | 提供商的 API 地址 | `https://api.mycompany.com/v1` |
| 3. 输入 API Key | 如果需要的话 | `sk-custom-...` |
| 4. 填写 Model ID | 模型标识符 | `gpt-4o` |
| 5. 设置别名（可选） | 方便记忆的短名称 | `company-gpt` |
| 6. 设置 Endpoint ID | 区分多个自定义端点 | `mycompany` |

<details>
<summary>多个自定义端点共存</summary>

每个 Custom Provider 通过 **Endpoint ID** 区分，所以你可以同时配置多个自定义端点：

```json
// openclaw.json 示例
{
  "models": {
    "providers": {
      "custom-company-a": {
        "type": "openai",
        "baseUrl": "https://api.company-a.com/v1",
        "apiKey": "sk-a-..."
      },
      "custom-company-b": {
        "type": "anthropic",
        "baseUrl": "https://api.company-b.com/v1",
        "apiKey": "sk-b-..."
      }
    }
  }
}
```

详见[附录 G：配置文件详解](/cn/appendix/appendix-g)。

</details>

---

## 4. 多智能体配置

OpenClaw 支持在同一实例下运行**多个独立智能体**，每个智能体有自己的工作区、会话和认证配置。

### 4.1 添加智能体

```bash
openclaw agents add <name>
```

不带 `--workspace` 参数时会启动交互式向导。

### 4.2 智能体配置项

| 配置项 | 说明 |
|--------|------|
| `agents.list[].name` | 智能体名称 |
| `agents.list[].workspace` | 工作区路径（默认 `~/.openclaw/workspace-<agentId>`） |
| `agents.list[].agentDir` | 智能体配置目录 |

<details>
<summary>非交互模式与消息路由</summary>

**非交互模式标志**：
```bash
openclaw agents add worker-bot \
  --model "openrouter/stepfun/step-3.5-flash:free" \
  --agent-dir ~/.openclaw/agents/worker \
  --bind "telegram:chat:12345" \
  --non-interactive
```

**消息路由**：通过 `--bind` 参数将特定渠道/对话绑定到某个智能体。向导也会引导你完成绑定配置。

这样你可以让不同的龙虾负责不同的聊天群或任务类型。

</details>

---

## 5. 重新配置与维护

### 5.1 重新运行向导

```bash
openclaw configure
```

> **与 `openclaw onboard` 的区别**：`configure` 用于修改现有配置，`onboard` 用于首次设置。两者流程类似，但 `configure` 不会重新安装后台服务。

### 5.2 重置配置

```bash
# 默认重置：配置、凭证、会话
openclaw onboard --reset

# 完整重置：包括工作区
openclaw onboard --reset --reset-scope full
```

> ⚠️ `--reset` 会清除现有配置，请谨慎使用。如果只是想修改某项配置，用 `openclaw configure` 更安全。

### 5.3 配置异常处理

如果配置文件损坏或包含过时的字段，向导会提示你先运行诊断：

```bash
openclaw doctor
```

`doctor` 命令会自动检测并修复常见问题，包括服务注册、配置格式和凭证有效性。详见[第八章 Doctor 诊断](/cn/adopt/chapter8/)。

<details>
<summary>非交互模式（脚本化部署）</summary>

在 CI/CD 或批量部署场景中，可以使用非交互模式跳过所有交互式提问：

```bash
openclaw onboard \
  --non-interactive \
  --auth-choice openai-api-key \
  --install-daemon
```

注意事项：
- `--json` 标志**不代表**非交互模式，它只是改变输出格式
- 非交互模式下必须通过命令行参数或环境变量提供所有必要配置
- 使用 `--secret-input-mode ref` 时，对应的环境变量必须已设置

</details>

---

## 6. 常见问题

**Q1：向导配置的文件存在哪里？**

主配置文件在 `~/.openclaw/openclaw.json`，工作区文件在 `~/.openclaw/workspace/`。详见[附录 G：配置文件详解](/cn/appendix/appendix-g)。

**Q2：跑完向导后最快的方式开始聊天是什么？**

直接在终端聊天：
```bash
openclaw chat
```

或打开浏览器 Dashboard（无需任何渠道配置）：
```bash
openclaw dashboard
```

详见[第十一章 Web 界面与客户端](/cn/adopt/chapter11/)。

**Q3：我用的模型提供商不在向导列表里怎么办？**

选择 **Custom Provider**，填入提供商的 API 地址和密钥即可。支持 OpenAI 兼容和 Anthropic 兼容两种接口格式。详见[本章第 3 节](#_3-自定义模型提供商-custom-provider)。

**Q4：Remote 模式具体做了什么？**

Remote 模式仅配置本地客户端连接远程 Gateway 的方式（SSH 隧道或 Tailnet 地址），**不会在远程主机上安装或修改任何东西**。远程主机的 Gateway 需要提前配置好。详见[第九章 远程访问与网络](/cn/adopt/chapter9/)。

**Q5：重新运行向导会覆盖我的现有配置吗？**

不会。除非你显式选择 Reset 或传入 `--reset` 参数，向导会保留现有配置，只修改你选择更改的部分。

---

**下一步**：

恭喜！领养篇 11 章全部完成 🦞 以下附录可按需查阅：

| 附录 | 内容简介 |
|------|---------|
| [附录 A：学习资源汇总](/cn/appendix/appendix-a) | 8 大类学习资源，80+ 精选链接 |
| [附录 B：社区之声与生态展望](/cn/appendix/appendix-b) | 6 大议题深度讨论 + 金句精选 |
| [附录 C：类 Claw 方案对比与选型](/cn/appendix/appendix-c) | 桌面客户端 / 托管服务 / 云厂商 / 开源自建 / 移动端 5 大类对比 |
| [附录 D：技能开发与发布指南](/cn/appendix/appendix-d) | SKILL.md 格式 + skill-creator + ClawHub 发布流程 |
| [附录 E：模型提供商选型指南](/cn/appendix/appendix-e) | 聚合网关 / 国内 / 国际 / 本地 4 大类系统对比 |
| [附录 F：命令速查表](/cn/appendix/appendix-f) | 按场景分类的全部 CLI 命令参考 |
| [附录 G：配置文件详解](/cn/appendix/appendix-g) | openclaw.json 各项参数逐项解读 |

- 想深入了解原理？→ [构建 Claw（开发篇）](/cn/build/)
