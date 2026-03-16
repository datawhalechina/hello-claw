---
prev:
  text: '第4章 聊天平台接入'
  link: '/cn/adopt/chapter4'
next:
  text: '第6章 智能体管理'
  link: '/cn/adopt/chapter6'
---

# 第五章 模型管理

> 学完本章，你的龙虾就能换上任何你想要的 AI 大脑——免费的、最强的、本地的，甚至在一个挂掉时自动切换到另一个。

> **前置条件**：已完成[第二章](/cn/adopt/chapter2/)的安装和基础模型配置。

---

## 0. 先搞清楚：模型和提供商是什么？

OpenClaw 本身没有 AI 大脑，它负责连接——你选哪个大脑，它就用哪个。

模型标识格式是 `提供商/模型名`，比如：

| 标识 | 含义 |
|------|------|
| `openrouter/stepfun/step-3.5-flash:free` | OpenRouter 上的免费模型 |
| `anthropic/claude-opus-4-6` | Anthropic 的旗舰模型 |
| `openai/gpt-5.1-codex` | OpenAI 的编程专用模型 |
| `ollama/llama3.3` | 你电脑上本地运行的模型 |

---

## 1. 快速上手

想换个模型？一条命令：

```bash
openclaw config set agents.defaults.model.primary "anthropic/claude-opus-4-6"
```

或者重新跑向导，跟着提示走：

```bash
openclaw onboard
```

---

## 2. 主模型、备用模型、图片模型

每次对话，OpenClaw 按这个顺序选模型：

```
主模型（primary）
  ↓ 挂了或限流
备用模型列表（fallbacks），依次尝试
  ↓ 每个模型内部
同提供商的多个 API Key 之间轮换
```

**配置建议**：主模型选你用得到的最强的；备用模型做兜底或省钱。

发图片时，如果主模型不支持图片输入，OpenClaw 会自动切到 `imageModel`：

```json5
{
  agents: {
    defaults: {
      imageModel: {
        primary: "openai/gpt-5.1-codex",
        fallbacks: ["google/gemini-3-pro-preview"]
      }
    }
  }
}
```

<details>
<summary>想限制只能用哪些模型？</summary>

设置 `agents.defaults.models` 就启用了**白名单**，只有列表里的模型才能使用。同时还能给模型起别名，方便聊天中快速切换：

```json5
{
  agents: {
    defaults: {
      model: { primary: "anthropic/claude-sonnet-4-5" },
      models: {
        "anthropic/claude-sonnet-4-5": { alias: "Sonnet" },
        "anthropic/claude-opus-4-6": { alias: "Opus" },
      }
    }
  }
}
```

设置后，聊天中 `/model Sonnet` 就能直接切换，不用记完整 ID。不设置 `models` 则无限制，自由切换任意模型。

</details>

---

## 3. 聊天中切换模型

无需重启，随时切换：

| 命令 | 效果 |
|------|------|
| `/model` | 打开模型列表，用数字选 |
| `/model 3` | 直接选第 3 个 |
| `/model openai/gpt-5.2` | 直接指定模型 ID |
| `/model status` | 查看当前模型和认证状态 |

> 模型 ID 中的第一个 `/` 分隔提供商和模型名。OpenRouter 上的模型名本身含 `/`，必须带提供商前缀：`/model openrouter/moonshotai/kimi-k2`。

---

## 4. 命令行管理模型

### 常用命令

```bash
openclaw models status                          # 查看当前主模型 + 备用 + 认证概览
openclaw models list                            # 查看已配置的模型
openclaw models list --all                      # 查看全部可用模型
openclaw models set openai/gpt-5.1-codex        # 设置主模型
openclaw models set-image google/gemini-3-pro-preview  # 设置图片模型
```

### 别名（让切换更方便）

```bash
openclaw models aliases add Sonnet anthropic/claude-sonnet-4-5
openclaw models aliases add Opus anthropic/claude-opus-4-6
openclaw models aliases list
openclaw models aliases remove Sonnet
```

### 备用模型

```bash
openclaw models fallbacks list
openclaw models fallbacks add openai/gpt-5.2
openclaw models fallbacks add google/gemini-3-pro-preview
openclaw models fallbacks remove openai/gpt-5.2
openclaw models fallbacks clear
```

<details>
<summary>models status 有哪些输出标志？</summary>

- `--plain`：只输出当前主模型名（适合脚本）
- `--json`：机器可读 JSON
- `--check`：自动化检查（缺失/过期返回 exit 1，即将过期返回 exit 2）

输出内容包括：当前主模型和备用模型、每个提供商的认证状态、24 小时内即将过期的 OAuth Token 警告。

</details>

<details>
<summary>想找 OpenRouter 上最好的免费模型？</summary>

```bash
openclaw models scan              # 自动探测并排序免费模型
openclaw models scan --no-probe   # 只看列表，不探测
openclaw models scan --set-default  # 扫完直接设为默认
```

排名依据：图片支持 → 工具调用延迟 → 上下文窗口 → 参数量。需要 `OPENROUTER_API_KEY`。

</details>

---

## 5. 选择并配置提供商

OpenClaw 支持两类提供商：**内置**（直接设 API Key 就能用）和**自定义**（通过 `models.providers` 接入任何兼容接口）。

### 5.1 内置提供商

直接设 API Key 即可，无需额外配置：

| 提供商 | provider 标识 | 认证方式 | 示例模型 |
|--------|-------------|---------|---------|
| OpenAI | `openai` | `OPENAI_API_KEY` | `openai/gpt-5.1-codex` |
| Anthropic | `anthropic` | `ANTHROPIC_API_KEY` | `anthropic/claude-opus-4-6` |
| OpenAI Code (Codex) | `openai-codex` | OAuth 登录 | `openai-codex/gpt-5.3-codex` |
| OpenCode Zen | `opencode` | `OPENCODE_API_KEY` | `opencode/claude-opus-4-6` |
| Google Gemini | `google` | `GEMINI_API_KEY` | `google/gemini-3-pro-preview` |
| OpenRouter | `openrouter` | `OPENROUTER_API_KEY` | `openrouter/anthropic/claude-sonnet-4-5` |
| Z.AI (GLM) | `zai` | `ZAI_API_KEY` | `zai/glm-5` |
| xAI | `xai` | `XAI_API_KEY` | — |
| Mistral | `mistral` | `MISTRAL_API_KEY` | `mistral/mistral-large-latest` |
| Groq | `groq` | `GROQ_API_KEY` | — |
| Cerebras | `cerebras` | `CEREBRAS_API_KEY` | — |
| GitHub Copilot | `github-copilot` | `GH_TOKEN` | — |
| Hugging Face | `huggingface` | `HF_TOKEN` | `huggingface/deepseek-ai/DeepSeek-R1` |
| Kilo Gateway | `kilocode` | `KILOCODE_API_KEY` | `kilocode/anthropic/claude-opus-4.6` |
| Vercel AI Gateway | `vercel-ai-gateway` | `AI_GATEWAY_API_KEY` | `vercel-ai-gateway/anthropic/claude-opus-4.6` |

> **更多提供商**及获取地址见[附录 E 模型提供商选型指南](/cn/appendix/appendix-e)。

<details>
<summary>OpenAI 配置详情</summary>

```json5
{
  agents: {
    defaults: { model: { primary: "openai/gpt-5.1-codex" } }
  }
}
```

**认证**：设置环境变量 `OPENAI_API_KEY`，或在向导中选择 `openai-api-key`。

**传输协议**：默认 `auto`（WebSocket 优先，SSE 兜底）。可按模型覆盖：

```json5
{
  agents: {
    defaults: {
      models: {
        "openai/gpt-5.1-codex": {
          params: { transport: "sse" }  // 强制使用 SSE
        }
      }
    }
  }
}
```

CLI 快捷设置：`openclaw onboard --auth-choice openai-api-key`

</details>

<details>
<summary>Anthropic 配置详情</summary>

```json5
{
  agents: {
    defaults: { model: { primary: "anthropic/claude-opus-4-6" } }
  }
}
```

**认证方式（二选一）**：

1. **API Key（推荐）**：设置 `ANTHROPIC_API_KEY`
2. **setup-token**：运行 `claude setup-token`，然后 `openclaw models status` 确认

> **注意**：setup-token 是技术兼容方案，Anthropic 曾限制过在 Claude Code 以外使用订阅凭证。建议优先使用 API Key。

CLI 快捷设置：`openclaw onboard --auth-choice token`

</details>

<details>
<summary>OpenAI Code (Codex) 配置详情</summary>

OpenAI Codex 使用 OAuth 登录（ChatGPT 账号），**明确支持**在 OpenClaw 等外部工具中使用。

```json5
{
  agents: {
    defaults: { model: { primary: "openai-codex/gpt-5.3-codex" } }
  }
}
```

CLI 快捷设置：`openclaw onboard --auth-choice openai-codex` 或 `openclaw models auth login --provider openai-codex`

</details>

<details>
<summary>Google Vertex / Antigravity / Gemini CLI</summary>

除了 API Key 方式的 Google Gemini，还有三个 Google 相关提供商：

| 提供商 | 标识 | 认证方式 |
|--------|------|---------|
| Google Vertex | `google-vertex` | gcloud ADC |
| Antigravity | `google-antigravity` | OAuth 插件 |
| Gemini CLI | `google-gemini-cli` | OAuth 插件 |

**Antigravity / Gemini CLI** 是非官方集成，需先启用插件：

```bash
# Antigravity
openclaw plugins enable google-antigravity-auth
openclaw models auth login --provider google-antigravity --set-default

# Gemini CLI
openclaw plugins enable google-gemini-cli-auth
openclaw models auth login --provider google-gemini-cli --set-default
```

> **风险提示**：部分用户反映使用第三方客户端后 Google 账号受限。建议使用非关键账号，并自行评估 Google 服务条款。

</details>

### 5.2 国产模型提供商

#### 月之暗面 Kimi（Moonshot AI）

```json5
{
  agents: {
    defaults: { model: { primary: "moonshot/kimi-k2.5" } },
  },
  models: {
    mode: "merge",
    providers: {
      moonshot: {
        baseUrl: "https://api.moonshot.ai/v1",
        apiKey: "${MOONSHOT_API_KEY}",
        api: "openai-completions",
        models: [{ id: "kimi-k2.5", name: "Kimi K2.5" }],
      }
    }
  }
}
```

可用模型：`kimi-k2.5`、`kimi-k2-0905-preview`、`kimi-k2-turbo-preview`、`kimi-k2-thinking`、`kimi-k2-thinking-turbo`

<details>
<summary>Kimi Coding（Anthropic 兼容接口）</summary>

```json5
{
  env: { KIMI_API_KEY: "sk-..." },
  agents: {
    defaults: { model: { primary: "kimi-coding/k2p5" } },
  }
}
```

</details>

#### 火山引擎（豆包 Doubao）

```json5
{
  agents: {
    defaults: { model: { primary: "volcengine/doubao-seed-1-8-251228" } },
  }
}
```

CLI：`openclaw onboard --auth-choice volcengine-api-key`

<details>
<summary>火山引擎全部可用模型</summary>

**标准模型**（provider: `volcengine`）：

| 模型 ID | 名称 |
|---------|------|
| `volcengine/doubao-seed-1-8-251228` | 豆包 Seed 1.8 |
| `volcengine/doubao-seed-code-preview-251028` | 豆包 Seed Code |
| `volcengine/kimi-k2-5-260127` | Kimi K2.5 |
| `volcengine/glm-4-7-251222` | GLM 4.7 |
| `volcengine/deepseek-v3-2-251201` | DeepSeek V3.2 128K |

**编码模型**（provider: `volcengine-plan`）：

| 模型 ID | 名称 |
|---------|------|
| `volcengine-plan/ark-code-latest` | ARK Code |
| `volcengine-plan/doubao-seed-code` | 豆包 Seed Code |
| `volcengine-plan/kimi-k2.5` | Kimi K2.5 |
| `volcengine-plan/kimi-k2-thinking` | Kimi K2 Thinking |
| `volcengine-plan/glm-4.7` | GLM 4.7 |

</details>

#### 通义千问 Qwen（免费 OAuth）

OAuth 设备码认证，免费使用 Qwen Coder + Vision：

```bash
openclaw plugins enable qwen-portal-auth
openclaw models auth login --provider qwen-portal --set-default
```

可用模型：`qwen-portal/coder-model`、`qwen-portal/vision-model`

<details>
<summary>更多国产提供商（BytePlus、硅基流动、DeepSeek 等）</summary>

**BytePlus**（国际版火山引擎，共享模型目录）：

```json5
{
  agents: {
    defaults: { model: { primary: "byteplus/seed-1-8-251228" } },
  }
}
```

CLI：`openclaw onboard --auth-choice byteplus-api-key`

其他提供商均通过 `models.providers` 以 OpenAI 兼容方式接入，配置格式参考 5.4 节：

| 提供商 | API 地址 | 备注 |
|--------|---------|------|
| 硅基流动 SiliconFlow | `https://api.siliconflow.cn/v1` | 新用户 16 元免费额度 |
| 深度求索 DeepSeek | `https://api.deepseek.com/v1` | — |
| 阶跃星辰 StepFun | OpenAI 兼容 | — |
| 稀宇科技 MiniMax | `openclaw onboard --auth-choice minimax-api` | — |
| 智谱 Z.AI | 内置提供商，`ZAI_API_KEY` | — |
| 混元（腾讯） | OpenAI 兼容 | — |
| 文心一言（百度） | OpenAI 兼容 | — |

配置方式：将 5.4 节示例中的 `baseUrl` 和 `apiKey` 替换为对应提供商即可。

</details>

### 5.3 本地模型

#### Ollama

先拉取模型，再配置：

```bash
ollama pull llama3.3
```

```json5
{
  agents: {
    defaults: { model: { primary: "ollama/llama3.3" } }
  }
}
```

Ollama 在 `http://127.0.0.1:11434/v1` 运行时会被自动发现，无需额外配置。

<details>
<summary>vLLM（高性能本地推理服务器）</summary>

```bash
export VLLM_API_KEY="vllm-local"
```

```json5
{
  agents: {
    defaults: { model: { primary: "vllm/your-model-id" } }
  }
}
```

默认连接 `http://127.0.0.1:8000/v1`。

</details>

### 5.4 自定义提供商（通用方式）

任何 OpenAI 或 Anthropic 兼容的 API 都可以通过 `models.providers` 接入：

```json5
{
  agents: {
    defaults: {
      model: { primary: "lmstudio/minimax-m2.5-gs32" },
      models: { "lmstudio/minimax-m2.5-gs32": { alias: "Minimax" } },
    }
  },
  models: {
    providers: {
      lmstudio: {
        baseUrl: "http://localhost:1234/v1",
        apiKey: "LMSTUDIO_KEY",
        api: "openai-completions",
        models: [{
          id: "minimax-m2.5-gs32",
          name: "MiniMax M2.5",
          contextWindow: 200000,
          maxTokens: 8192,
        }]
      }
    }
  }
}
```

<details>
<summary>自定义提供商的可选字段</summary>

在 `models` 数组中，每个模型对象支持以下字段（均可省略）：

| 字段 | 默认值 | 说明 |
|------|--------|------|
| `reasoning` | `false` | 是否支持推理/思考链 |
| `input` | `["text"]` | 支持的输入类型 |
| `cost` | 全为 0 | `{ input, output, cacheRead, cacheWrite }` |
| `contextWindow` | `200000` | 上下文窗口大小 |
| `maxTokens` | `8192` | 最大输出 Token 数 |

建议设置与你的代理/模型实际限制匹配的值。

**API 兼容模式**（`api` 字段）：
- `openai-completions`：OpenAI Chat Completions 兼容
- `anthropic-messages`：Anthropic Messages 兼容

</details>

<details>
<summary>models.json 注册表机制</summary>

自定义提供商配置会写入 `~/.openclaw/agents/<agentId>/models.json`。默认使用 `merge` 模式（与内置目录合并），也可设置 `models.mode: "replace"` 完全替换。

合并优先级规则：
- 已有的非空 `baseUrl` 优先
- 非 SecretRef 管理的 `apiKey` 优先
- SecretRef 管理的 Key 会从源标记（环境变量名等）刷新，不直接存储明文
- 其他字段从配置和标准目录刷新

</details>

---

## 6. 进阶：多 Key 轮换与故障转移

日常使用不需要关心这些——OpenClaw 出错时会自动处理。但如果你想精确控制，展开看详情。

<details>
<summary>多个 API Key 自动轮换</summary>

有多个 API Key 时，遇到限流（429）会自动切换到下一个。通过环境变量配置：

```bash
# 方式一：逗号分隔
OPENAI_API_KEYS="sk-key1,sk-key2,sk-key3"

# 方式二：编号列表
OPENAI_API_KEY_1="sk-key1"
OPENAI_API_KEY_2="sk-key2"

# 方式三：实时热切（最高优先级）
OPENCLAW_LIVE_OPENAI_KEY="sk-hot-key"
```

优先级：`OPENCLAW_LIVE_*` > `_API_KEYS`（逗号列表）> `_API_KEY`（单个）> `_API_KEY_*`（编号）

轮换只在限流错误时触发；非限流错误直接失败，不尝试下一个 Key。

</details>

<details>
<summary>模型故障转移（Failover）</summary>

故障转移分两阶段：先在同提供商的多个 Key 之间轮换，全部失败后切换到 `fallbacks` 列表中的下一个模型。

```json5
{
  agents: {
    defaults: {
      model: {
        primary: "anthropic/claude-opus-4-6",
        fallbacks: [
          "openai/gpt-5.1-codex",
          "google/gemini-3-pro-preview"
        ]
      }
    }
  }
}
```

Anthropic 全部失败 → 自动切 OpenAI；OpenAI 也失败 → 切 Google。用户无感。

**冷却机制**：Key 出错后进入冷却，使用指数退避：

| 失败次数 | 冷却时间 |
|---------|---------|
| 第 1 次 | 1 分钟 |
| 第 2 次 | 5 分钟 |
| 第 3 次 | 25 分钟 |
| 第 4 次+ | 1 小时（上限） |

余额不足则触发长期禁用（起始 5 小时，每次翻倍，上限 24 小时）。建议 OpenRouter 用户开启 Auto Top Up。

**会话粘性**：同一会话内 OpenClaw 会固定使用选中的认证配置，不会每次请求都轮换（有利于缓存命中）。想锁定特定配置，聊天中用 `/model …@<profileId>`。

</details>

---

## 7. 常见问题

**切换模型后没有回复？**
检查是否设置了 `agents.defaults.models` 白名单——只有列表里的模型才能使用。用 `/model list` 查看可用模型，或删除 `agents.defaults.models` 取消限制。

**模型 ID 里的 `/` 怎么处理？**
第一个 `/` 分隔提供商和模型名。OpenRouter 上的模型名本身含 `/`，必须带提供商前缀：`openrouter/moonshotai/kimi-k2`。

**怎么确认现在用的是哪个模型？**
运行 `openclaw models status` 或聊天中发 `/model status`。

**本地模型和云端模型能混用吗？**
可以，把本地模型设为 fallback，云端挂了自动切本地：

```json5
{
  agents: {
    defaults: {
      model: {
        primary: "anthropic/claude-opus-4-6",
        fallbacks: ["ollama/llama3.3"]
      }
    }
  }
}
```

**想省钱？**
主模型用便宜的，旗舰模型做备用；同时配多个 Key 分散限流：

```json5
{
  agents: {
    defaults: {
      model: {
        primary: "anthropic/claude-sonnet-4-5",
        fallbacks: ["anthropic/claude-opus-4-6"]
      }
    }
  }
}
```

```bash
ANTHROPIC_API_KEYS="sk-key1,sk-key2"
```
