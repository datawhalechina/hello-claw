---
prev:
  text: 'Chapter 4: Chat Platform Integration'
  link: '/en/adopt/chapter4'
next:
  text: 'Chapter 6: Agent Management'
  link: '/en/adopt/chapter6'
---

# Chapter 5: Model Management

> By the end of this chapter, your claw will be able to swap in any AI brain you want — free ones, the most powerful ones, local ones, and even automatically switch to another when one goes down.

> **Prerequisites**: You have completed the installation and basic model configuration from [Chapter 2](/en/adopt/chapter2/).

---

## 0. First, Understand: What Are Models and Providers?

OpenClaw has no AI brain of its own — it acts as a connector. Whichever brain you choose, that's the one it uses.

The model identifier format is `provider/model-name`, for example:

| Identifier | Meaning |
|------|------|
| `openrouter/qwen/qwen3.6-plus:free` | A free model on OpenRouter |
| `anthropic/claude-opus-4-6` | Anthropic's flagship model |
| `openai/gpt-5.4` | OpenAI's flagship model (default) |
| `ollama/llama3.3` | A model running locally on your machine |

---

## 1. Quick Start

Want to switch models? One command:

```bash
openclaw config set agents.defaults.model.primary "anthropic/claude-opus-4-6"
```

Or re-run the setup wizard and follow the prompts:

```bash
openclaw onboard
```

---

## 2. Primary Model, Fallback Models, and Image Model

For each conversation, OpenClaw selects a model in this order:

```
Primary model (primary)
  ↓ if down or rate-limited
Fallback model list (fallbacks), tried in order
  ↓ within each model
Rotation across multiple API Keys from the same provider
```

**Configuration tip**: Set your primary model to the most capable one available to you; use fallback models as a safety net or to save costs.

When sending images, if the primary model does not support image input, OpenClaw will automatically switch to the `imageModel`:

```json5
{
  agents: {
    defaults: {
      imageModel: {
        primary: "openai/gpt-5.4",
        fallbacks: ["google/gemini-3-pro-preview"]
      }
    }
  }
}
```

<details>
<summary>Want to restrict which models can be used?</summary>

Setting `agents.defaults.models` enables a **whitelist** — only the models in the list are allowed. You can also give models aliases for quick switching during a chat:

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

Once configured, use `/model Sonnet` in the chat to switch instantly — no need to remember the full ID. If `models` is not set, there are no restrictions and you can freely switch to any model.

</details>

---

## 3. Switching Models During a Chat

No restart needed — switch at any time:

| Command | Effect |
|------|------|
| `/model` | Open the model list and select by number |
| `/model 3` | Directly select the 3rd model |
| `/model openai/gpt-5.2` | Specify a model ID directly |
| `/model status` | View the current model and authentication status |

> The first `/` in a model ID separates the provider from the model name. Model names on OpenRouter contain `/` themselves, so you must include the provider prefix: `/model openrouter/moonshotai/kimi-k2`.

---

## 4. Managing Models via CLI

### Common Commands

```bash
openclaw models status                          # View current primary model + fallbacks + auth overview
openclaw models list                            # View configured models
openclaw models list --all                      # View all available models
openclaw models set openai/gpt-5.4        # Set the primary model
openclaw models set-image google/gemini-3-pro-preview  # Set the image model
```

### Aliases (for easier switching)

```bash
openclaw models aliases add Sonnet anthropic/claude-sonnet-4-5
openclaw models aliases add Opus anthropic/claude-opus-4-6
openclaw models aliases list
openclaw models aliases remove Sonnet
```

### Fallback Models

```bash
openclaw models fallbacks list
openclaw models fallbacks add openai/gpt-5.2
openclaw models fallbacks add google/gemini-3-pro-preview
openclaw models fallbacks remove openai/gpt-5.2
openclaw models fallbacks clear
```

<details>
<summary>What output flags does models status support?</summary>

- `--plain`: Output only the current primary model name (useful for scripts)
- `--json`: Machine-readable JSON
- `--check`: Automated check (exits with code 1 if missing/expired, code 2 if expiring soon)

Output includes: the current primary and fallback models, authentication status for each provider, and warnings for OAuth tokens expiring within 24 hours.

</details>

<details>
<summary>Want to find the best free models on OpenRouter?</summary>

```bash
openclaw models scan              # Auto-detect and rank free models
openclaw models scan --no-probe   # List only, without probing
openclaw models scan --set-default  # Set the top result as default after scanning
```

Ranking criteria: image support → tool-call latency → context window → parameter count. Requires `OPENROUTER_API_KEY`.

</details>

---

## 5. Choosing and Configuring Providers

OpenClaw supports two types of providers: **built-in** (just set an API key and go) and **custom** (connect any compatible interface via `models.providers`).

### 5.1 Built-in Providers

Just set the API key — no additional configuration required:

| Provider | Provider ID | Authentication | Example Model |
|--------|-------------|---------|---------|
| OpenAI | `openai` | `OPENAI_API_KEY` | `openai/gpt-5.4` |
| Anthropic | `anthropic` | `ANTHROPIC_API_KEY` | `anthropic/claude-opus-4-6` |
| OpenAI Code (Codex) | `openai-codex` | OAuth login | `openai-codex/gpt-5.3-codex` |
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

> **For more providers** and where to obtain them, see [Appendix E: Model Provider Selection Guide](/en/appendix/appendix-e).

<details>
<summary>OpenAI configuration details</summary>

```json5
{
  agents: {
    defaults: { model: { primary: "openai/gpt-5.4" } }
  }
}
```

**Authentication**: Set the `OPENAI_API_KEY` environment variable, or choose `openai-api-key` in the setup wizard.

**Transport protocol**: Defaults to `auto` (WebSocket preferred, SSE as fallback). Can be overridden per model:

```json5
{
  agents: {
    defaults: {
      models: {
        "openai/gpt-5.4": {
          params: { transport: "sse" }  // Force SSE
        }
      }
    }
  }
}
```

CLI shortcut: `openclaw onboard --auth-choice openai-api-key`

</details>

<details>
<summary>Anthropic configuration details</summary>

```json5
{
  agents: {
    defaults: { model: { primary: "anthropic/claude-opus-4-6" } }
  }
}
```

**Authentication (choose one)**:

1. **API Key (recommended)**: Set `ANTHROPIC_API_KEY`
2. **setup-token**: Run `claude setup-token`, then confirm with `openclaw models status`

> **Note**: setup-token is a technical compatibility option. Anthropic has previously restricted the use of subscription credentials outside of Claude Code. Using an API Key is recommended.

CLI shortcut: `openclaw onboard --auth-choice token`

</details>

<details>
<summary>OpenAI Code (Codex) configuration details</summary>

OpenAI Codex uses OAuth login (ChatGPT account) and **explicitly supports** use in external tools like OpenClaw.

```json5
{
  agents: {
    defaults: { model: { primary: "openai-codex/gpt-5.3-codex" } }
  }
}
```

CLI shortcut: `openclaw onboard --auth-choice openai-codex` or `openclaw models auth login --provider openai-codex`

</details>

<details>
<summary>Google Vertex / Antigravity / Gemini CLI</summary>

In addition to the API key-based Google Gemini, there are three other Google-related providers:

| Provider | ID | Authentication |
|--------|------|---------|
| Google Vertex | `google-vertex` | gcloud ADC |
| Antigravity | `google-antigravity` | OAuth plugin |
| Gemini CLI | `google-gemini-cli` | OAuth plugin |

**Antigravity / Gemini CLI** are unofficial integrations and require enabling the plugin first:

```bash
# Antigravity
openclaw plugins enable google-antigravity-auth
openclaw models auth login --provider google-antigravity --set-default

# Gemini CLI
openclaw plugins enable google-gemini-cli-auth
openclaw models auth login --provider google-gemini-cli --set-default
```

> **Risk warning**: Some users have reported Google account restrictions after using third-party clients. It is recommended to use a non-critical account and evaluate Google's terms of service yourself.

</details>

### 5.2 Chinese Domestic Model Providers

#### Moonshot AI Kimi

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

Available models: `kimi-k2.5`, `kimi-k2-0905-preview`, `kimi-k2-turbo-preview`, `kimi-k2-thinking`, `kimi-k2-thinking-turbo`

<details>
<summary>Kimi Coding (Anthropic-compatible interface)</summary>

```json5
{
  env: { KIMI_API_KEY: "sk-..." },
  agents: {
    defaults: { model: { primary: "kimi-coding/k2p5" } },
  }
}
```

</details>

#### Volcengine (Doubao)

```json5
{
  agents: {
    defaults: { model: { primary: "volcengine/doubao-seed-1-8-251228" } },
  }
}
```

CLI: `openclaw onboard --auth-choice volcengine-api-key`

<details>
<summary>All available Volcengine models</summary>

**Standard models** (provider: `volcengine`):

| Model ID | Name |
|---------|------|
| `volcengine/doubao-seed-1-8-251228` | Doubao Seed 1.8 |
| `volcengine/doubao-seed-code-preview-251028` | Doubao Seed Code |
| `volcengine/kimi-k2-5-260127` | Kimi K2.5 |
| `volcengine/glm-4-7-251222` | GLM 4.7 |
| `volcengine/deepseek-v3-2-251201` | DeepSeek V3.2 128K |

**Coding models** (provider: `volcengine-plan`):

| Model ID | Name |
|---------|------|
| `volcengine-plan/ark-code-latest` | ARK Code |
| `volcengine-plan/doubao-seed-code` | Doubao Seed Code |
| `volcengine-plan/kimi-k2.5` | Kimi K2.5 |
| `volcengine-plan/kimi-k2-thinking` | Kimi K2 Thinking |
| `volcengine-plan/glm-4.7` | GLM 4.7 |

</details>

#### Qwen (Free OAuth)

OAuth device code authentication — free access to Qwen Coder + Vision:

```bash
openclaw plugins enable qwen-portal-auth
openclaw models auth login --provider qwen-portal --set-default
```

Available models: `qwen-portal/coder-model`, `qwen-portal/vision-model`

<details>
<summary>More domestic providers (BytePlus, SiliconFlow, DeepSeek, etc.)</summary>

**BytePlus** (international version of Volcengine, shares the same model catalog):

```json5
{
  agents: {
    defaults: { model: { primary: "byteplus/seed-1-8-251228" } },
  }
}
```

CLI: `openclaw onboard --auth-choice byteplus-api-key`

All other providers are integrated via `models.providers` using OpenAI-compatible interfaces. Refer to Section 5.4 for the configuration format:

| Provider | API URL | Notes |
|--------|---------|------|
| SiliconFlow | `https://api.siliconflow.cn/v1` | New users get ¥16 in free credits |
| DeepSeek | `https://api.deepseek.com/v1` | — |
| StepFun | OpenAI compatible | — |
| MiniMax | `openclaw onboard --auth-choice minimax-api` | — |
| Z.AI (Zhipu) | Built-in provider, `ZAI_API_KEY` | — |
| Hunyuan (Tencent) | OpenAI compatible | — |
| ERNIE Bot (Baidu) | OpenAI compatible | — |

Configuration: Replace the `baseUrl` and `apiKey` in the Section 5.4 example with the corresponding provider's values.

</details>

### 5.3 Local Models

#### Ollama

Pull the model first, then configure:

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

When Ollama is running at `http://127.0.0.1:11434/v1`, it will be automatically discovered — no additional configuration needed.

<details>
<summary>vLLM (high-performance local inference server)</summary>

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

Connects to `http://127.0.0.1:8000/v1` by default.

</details>

### 5.4 Custom Providers (General Method)

Any OpenAI or Anthropic-compatible API can be integrated via `models.providers`:

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
          name: "MiniMax M2.7",
          contextWindow: 200000,
          maxTokens: 8192,
        }]
      }
    }
  }
}
```

<details>
<summary>Optional fields for custom providers</summary>

In the `models` array, each model object supports the following fields (all optional):

| Field | Default | Description |
|------|--------|------|
| `reasoning` | `false` | Whether the model supports reasoning/chain-of-thought |
| `input` | `["text"]` | Supported input types |
| `cost` | All 0 | `{ input, output, cacheRead, cacheWrite }` |
| `contextWindow` | `200000` | Context window size |
| `maxTokens` | `8192` | Maximum output token count |

It is recommended to set values that match the actual limits of your proxy/model.

**API compatibility mode** (`api` field):
- `openai-completions`: OpenAI Chat Completions compatible
- `anthropic-messages`: Anthropic Messages compatible

</details>

<details>
<summary>models.json registry mechanism</summary>

Custom provider configurations are written to `~/.openclaw/agents/<agentId>/models.json`. By default, `merge` mode is used (merged with the built-in catalog). You can also set `models.mode: "replace"` to completely replace the built-in catalog.

Merge priority rules:
- Existing non-empty `baseUrl` takes precedence
- `apiKey` not managed by SecretRef takes precedence
- Keys managed by SecretRef are refreshed from their source marker (environment variable name, etc.) and are not stored as plaintext
- Other fields are refreshed from the configuration and standard catalog

</details>

---

## 6. Advanced: Multi-Key Rotation and Failover

You don't need to worry about this for everyday use — OpenClaw handles errors automatically. But if you want precise control, expand the sections below for details.

<details>
<summary>Automatic rotation across multiple API Keys</summary>

When you have multiple API keys, OpenClaw will automatically switch to the next one upon rate limiting (429). Configure via environment variables:

```bash
# Method 1: Comma-separated
OPENAI_API_KEYS="sk-key1,sk-key2,sk-key3"

# Method 2: Numbered list
OPENAI_API_KEY_1="sk-key1"
OPENAI_API_KEY_2="sk-key2"

# Method 3: Live hot-swap (highest priority)
OPENCLAW_LIVE_OPENAI_KEY="sk-hot-key"
```

Priority: `OPENCLAW_LIVE_*` > `_API_KEYS` (comma list) > `_API_KEY` (single) > `_API_KEY_*` (numbered)

Rotation is only triggered on rate-limit errors; non-rate-limit errors fail immediately without trying the next key.

</details>

<details>
<summary>Model Failover</summary>

Failover happens in two stages: first, rotation across multiple keys from the same provider; if all fail, it switches to the next model in the `fallbacks` list.

```json5
{
  agents: {
    defaults: {
      model: {
        primary: "anthropic/claude-opus-4-6",
        fallbacks: [
          "openai/gpt-5.4",
          "google/gemini-3-pro-preview"
        ]
      }
    }
  }
}
```

If all Anthropic keys fail → automatically switches to OpenAI; if OpenAI also fails → switches to Google. Seamless for the user.

**Cooldown mechanism**: After a key error, it enters a cooldown with exponential backoff:

| Failure Count | Cooldown Duration |
|---------|---------|
| 1st failure | 1 minute |
| 2nd failure | 5 minutes |
| 3rd failure | 25 minutes |
| 4th+ failure | 1 hour (cap) |

Insufficient balance triggers a long-term ban (starting at 5 hours, doubling each time, capped at 24 hours). OpenRouter users are advised to enable Auto Top Up.

**Session stickiness**: Within the same session, OpenClaw will stick to the selected authentication configuration and will not rotate on every request (which benefits cache hits). To lock to a specific configuration, use `/model …@<profileId>` in the chat.

</details>

---

## 7. Frequently Asked Questions

**No response after switching models?**
Check whether you have set an `agents.defaults.models` whitelist — only models in the list can be used. Use `/model list` to see available models, or remove `agents.defaults.models` to lift the restriction.

**How do I handle the `/` in a model ID?**
The first `/` separates the provider from the model name. Model names on OpenRouter contain `/` themselves, so you must include the provider prefix: `openrouter/moonshotai/kimi-k2`.

**How do I confirm which model is currently in use?**
Run `openclaw models status` or send `/model status` in the chat.

**Can I mix local and cloud models?**
Yes — set the local model as a fallback, and it will switch automatically if the cloud goes down:

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

**Want to save costs?**
Use a cheaper model as primary and a flagship model as fallback; also configure multiple keys to spread rate limits:

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
