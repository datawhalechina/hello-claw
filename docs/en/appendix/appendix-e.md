---
prev:
  text: 'Appendix D: Skill Development and Publishing Guide'
  link: '/en/appendix/appendix-d'
next:
  text: 'Appendix F: Command Quick Reference'
  link: '/en/appendix/appendix-f'
---

# Appendix E: Model Provider Selection Guide

The core capability of OpenClaw comes from large language models. Choosing the right model provider directly determines how intelligent your lobster is, how fast it responds, and how much you spend each month. This appendix systematically covers all major model providers to help you quickly select based on your budget, network environment, and use case.

**Table of Contents**

- [1. Landscape Overview](#_1-landscape-overview)
- [2. Quick Selection: Find Your Solution in 30 Seconds](#_2-quick-selection-find-your-solution-in-30-seconds)
- [3. Aggregation Gateways (Recommended for Beginners)](#_3-aggregation-gateways-recommended-for-beginners)
- [4. Domestic Model Providers](#_4-domestic-model-providers)
- [5. International Model Providers](#_5-international-model-providers)
- [6. Local Deployment](#_6-local-deployment)
- [7. Selection Decision Framework](#_7-selection-decision-framework)
- [8. Pricing Quick Reference](#_8-pricing-quick-reference)

---

## 1. Landscape Overview

Model providers can be divided into four categories:

| Category | Representatives | Best For |
|----------|----------------|----------|
| **Aggregation Gateways** | OpenRouter, SiliconFlow | One key for multiple models, ideal for beginners |
| **Domestic Direct** | DeepSeek, Qwen, GLM, Kimi, Doubao, Hunyuan, etc. | Direct connection in China, Alipay payments, low latency |
| **International Direct** | OpenAI, Anthropic, Google, xAI, Mistral | Pursuing top model capabilities, requires VPN or overseas nodes |
| **Local Deployment** | Ollama, LM Studio | Completely offline, zero cost, data stays on device |

> **Tutorial recommended path**: Zero-cost onboarding with **OpenRouter free models** (Chapter 2) → Switch to **SiliconFlow** for daily use (top domestic paid choice) → Go direct with **DeepSeek / OpenAI / Anthropic** for maximum performance.

---

## 2. Quick Selection: Find Your Solution in 30 Seconds

**Choose based on your situation:**

| Your Situation | Recommended Solution | Reason |
|---------------|---------------------|--------|
| Zero cost, don't want to spend anything | [**OpenRouter**](#_3-1-openrouter) + `qwen/qwen3.6-plus:free` | Free model, sign up and use immediately |
| China-based user, want to spend the least | [**DeepSeek**](#_4-1-quick-comparison) direct | Best domestic value, ¥1/million tokens |
| China-based user, want an all-in-one experience | [**SiliconFlow**](#_3-2-siliconflow) | 200+ models aggregated, new users get ¥16 |
| Need the strongest reasoning capability | [**OpenAI**](#_5-1-quick-comparison) o3 / GPT-5 | Currently best overall, requires VPN |
| Need the strongest coding capability | [**Anthropic**](#_5-1-quick-comparison) Claude Opus 4.5 | Benchmark in programming |
| Need ultra-long context | [**Google**](#_5-1-quick-comparison) Gemini 2.5 Pro | 1M token context window |
| Need search augmentation | [**Perplexity**](#_5-2-provider-details) | Built-in real-time search, answers with citations |
| Data cannot leave the device | [**Ollama**](#_6-local-deployment) + DeepSeek R1 | Completely local, zero network dependency |
| Want free unlimited usage | [**Hunyuan**](#_4-2-provider-details) hunyuan-lite | Tencent free model, no limits |
| Budget-conscious + quality required | [**DeepSeek**](#_4-1-quick-comparison) V3 | ¥1/million tokens, close to GPT-4 level |
| Programming + code completion | [**Mistral**](#_5-2-provider-details) Codestral | Model optimized specifically for code |

---

## 3. Aggregation Gateways (Recommended for Beginners)

Don't want to register for a bunch of accounts? Aggregation gateways let you access multiple models with **a single API Key**, and switch between models freely.

### 3.1 OpenRouter

> **The default recommended solution in Chapter 2 of this tutorial.**

[OpenRouter](https://openrouter.ai) is the world's largest model aggregation gateway, connecting to 300+ models including OpenAI, Anthropic, Google, Meta, Mistral, DeepSeek, and virtually all major providers.

**Key Advantages:**
- **Free models available**: `qwen/qwen3.6-plus:free`, `google/gemma-3-4b-it:free`, etc. — zero-cost onboarding
- **One key for all models**: Generate one API Key after registration and switch models using the `provider/model-name` format
- **Transparent pricing**: Prices displayed directly on each model page, pay-as-you-go, no monthly fees
- **Accessible in China**: Directly accessible in some regions, or via domestic proxies like SiliconFlow

**Pricing Model:**
- Free models: $0 (rate limits apply)
- Paid models: Each provider's original price + small markup (usually 5–15%)
- Payment methods: International credit card, Crypto

**OpenClaw Configuration:**
```bash
# Environment variable
export OPENROUTER_API_KEY="sk-or-v1-..."

# Set model
# openclaw models set openrouter/qwen/qwen3.6-plus:free
```

**Link:** [openrouter.ai](https://openrouter.ai)

### 3.2 SiliconFlow

> **Top choice for domestic paid use cases.**

[SiliconFlow](https://cloud.siliconflow.cn) is China's leading model aggregation platform, providing a unified API for 200+ open-source and commercial models.

**Key Advantages:**
- **New users get ¥16**: Credited upon registration, enough for several days of use
- **Direct connection in China**: No VPN required, low latency
- **Alipay payments**: Most convenient for China-based users
- **Rich model selection**: Full coverage of DeepSeek, Qwen, GLM, Llama, Mistral, and more
- **Free models available**: Some open-source models offer free inference quotas

**Pricing Model:**
- New users: ¥16 free credit
- Pay-as-you-go: Price varies by model, usually slightly higher than direct connection
- Top-up methods: Alipay, WeChat Pay

**OpenClaw Configuration:**
```bash
export SILICONFLOW_API_KEY="sk-..."

# Model format: siliconflow:provider/model-name
# Example: siliconflow:deepseek-ai/DeepSeek-V3
```

**Link:** [cloud.siliconflow.cn](https://cloud.siliconflow.cn)

### 3.3 Vercel AI Gateway

[Vercel AI Gateway](https://sdk.vercel.ai/docs/ai-sdk-core/settings#api-configuration) is Vercel's unified AI gateway, primarily targeting developers.

**Features:**
- Unified SDK (`ai` npm package) to access multiple models
- Built-in load balancing, failover, caching
- Deep integration with the Vercel deployment platform
- Better suited for application development rather than direct use with OpenClaw

> Vercel AI Gateway is more of a development framework than an API proxy. For OpenClaw users, OpenRouter and SiliconFlow are more straightforward choices.

### 3.4 Aggregation Gateway Comparison

| | OpenRouter | SiliconFlow | Vercel AI Gateway |
|---|---|---|---|
| **Model Count** | 300+ | 200+ | Depends on config |
| **Free Models** | ✅ Multiple | ✅ Some | — |
| **New User Benefits** | — | ¥16 free credit | — |
| **Direct Access in China** | Some regions | ✅ | ✅ |
| **Alipay** | ❌ | ✅ | — |
| **OpenClaw Integration** | ✅ Native support | ✅ Native support | Manual configuration required |
| **Best For** | Overseas users / free model seekers | China-based users / paid first choice | Developers |

---

## 4. Domestic Model Providers

Common advantages of domestic providers: **direct connection without VPN**, **Alipay/WeChat Pay**, **optimized for Chinese**.

### 4.1 Quick Comparison

| Provider | Flagship Model | Input Price (¥/million tokens) | Output Price (¥/million tokens) | Free Quota | Context | Highlights |
|----------|---------------|-------------------------------|--------------------------------|-----------|---------|-----------|
| **DeepSeek** | DeepSeek V3 | 1 | 2 | New user credit | 128K | Best value, strong reasoning |
| **DeepSeek** | DeepSeek R1 | 4 | 16 | — | 128K | Deep reasoning, math/coding |
| **Qwen** | Qwen3.5-plus | 2 | 6 | Free quota available | 128K | Alibaba, excellent Chinese comprehension |
| **GLM** | GLM-5 | 5 | 5 | New user credit | 128K | Academic background, strong tool calling |
| **Moonshot** | Kimi K2.5 | 8 | 8 | Limited free | 256K | Ultra-long context |
| **Doubao** | Doubao-Seed-2.0 | 0.3 | 0.6 | Included in Coding Plan | 128K | ByteDance, ultra-low price |
| **Hunyuan** | hunyuan-lite | **Free** | **Free** | **Unlimited** | 32K | Tencent free model |
| **Hunyuan** | hunyuan-pro | 15 | 50 | — | 128K | Tencent flagship |
| **MiniMax** | MiniMax-M2.7 | 1 | 4 | Welcome credits | 200K+ | MoE architecture, multimodal |
| **StepFun** | Step-3.5-flash | Free (via OR) | Free (via OR) | Free via OpenRouter | 128K | Free through OpenRouter |
| **ERNIE** | ERNIE-4.5-turbo | 4 | 12 | Free quota available | 128K | Baidu ecosystem |

> **Pricing note**: The above are direct API prices (March 2026). Prices may differ slightly when using aggregation gateways (SiliconFlow/OpenRouter).

### 4.2 Provider Details

<details>
<summary>DeepSeek — Best Value King</summary>

[DeepSeek](https://platform.deepseek.com) has become one of the most popular domestic API providers thanks to its open-source strategy and exceptional value.

**Model Lineup:**
- **DeepSeek V3**: General-purpose flagship, 128K context, MoE architecture (671B params, 37B active), performance close to GPT-4o at 1/30 the price
- **DeepSeek R1**: Deep reasoning model, excels at math, coding, logical reasoning, chain-of-thought output
- **DeepSeek Coder**: Code-specialized model

**Advantages:**
- Among the strongest comprehensive capabilities of domestic models
- Extremely low price (V3 input ¥1/million tokens)
- Alipay top-up supported
- Open-source model can be deployed locally (via Ollama)
- API compatible with OpenAI format, easy integration

**Notes:**
- May queue during peak hours (highly popular)
- R1 model output is slower (deep reasoning takes time)

**OpenClaw Configuration:**
```bash
export DEEPSEEK_API_KEY="sk-..."
# model: "deepseek:deepseek-chat"      # V3
# model: "deepseek:deepseek-reasoner"  # R1
```

**Link:** [platform.deepseek.com](https://platform.deepseek.com)

</details>

<details>
<summary>Qwen (Alibaba Cloud Bailian)</summary>

[Qwen](https://dashscope.console.aliyun.com) is Alibaba Cloud's large model platform, providing API services through the Bailian (DashScope) platform.

**Model Lineup:**
- **Qwen3.5-plus**: Flagship general model, 128K context
- **Qwen3.5-turbo**: High-value version
- **Qwen-VL**: Visual understanding model
- **Qwen-Audio**: Audio understanding model
- **Qwen-Coder**: Code-specialized

**Advantages:**
- Excellent Chinese comprehension (trained on Alibaba e-commerce + search data)
- Complete model lineup (text/vision/audio/code)
- Free quota for new users
- Function Calling supported
- Coding Plan Lite ¥10/month (18,000 requests)

**OpenClaw Configuration:**
```bash
export DASHSCOPE_API_KEY="sk-..."
# model: "qwen:qwen-max"
# model: "qwen:qwen-plus"
```

**Link:** [dashscope.console.aliyun.com](https://dashscope.console.aliyun.com) | [Bailian Platform](https://bailian.console.aliyun.com)

</details>

<details>
<summary>GLM (Zhipu AI)</summary>

[Zhipu AI](https://open.bigmodel.cn) was incubated by Tsinghua University and is one of China's earliest large model companies.

**Model Lineup:**
- **GLM-5**: Latest flagship, overall capability benchmarked against GPT-4o
- **GLM-4-plus**: Balanced value
- **GLM-4-flash**: Low-cost fast response
- **CogView**: Image generation
- **CogVideoX**: Video generation

**Advantages:**
- Strong academic background (Tsinghua KEG Lab)
- Outstanding Tool Use capability — OpenClaw's skill system depends on this
- AutoClaw's built-in Pony-Alpha-2 is based on GLM architecture
- Free quota for new users

**OpenClaw Configuration:**
```bash
export ZHIPUAI_API_KEY="..."
# model: "glm:glm-4-plus"
```

**Link:** [open.bigmodel.cn](https://open.bigmodel.cn)

</details>

<details>
<summary>Moonshot / Kimi</summary>

[Moonshot](https://platform.moonshot.cn) is known for ultra-long context, with Kimi K2.5 supporting a 256K token context window.

**Model Lineup:**
- **Kimi K2.5**: Flagship model, 256K context
- **Moonshot-v1-128k**: 128K context version
- **Moonshot-v1-32k**: 32K economy version

**Advantages:**
- Ultra-long context (256K) — ideal for processing long documents and large codebases
- Kimi Claw managed service (see [Appendix C](/en/appendix/appendix-c))
- Search-augmented capability (integrates Yahoo Finance and other data sources)

**Notes:**
- Price is on the higher end among domestic providers
- Large token consumption in long-context scenarios

**OpenClaw Configuration:**
```bash
export MOONSHOT_API_KEY="sk-..."
# model: "moonshot:moonshot-v1-128k"
```

**Link:** [platform.moonshot.cn](https://platform.moonshot.cn) | [Kimi.com](https://kimi.com)

</details>

<details>
<summary>Doubao (Volcengine Ark)</summary>

[Volcengine Ark](https://console.volcengine.com/ark) is ByteDance's model service platform, providing the Doubao series of models.

**Model Lineup:**
- **Doubao-Seed-2.0**: Latest flagship, MoE architecture
- **Doubao-pro**: General high-performance
- **Doubao-lite**: Lightweight and fast

**Advantages:**
- **Extremely low price**: Input ¥0.3/million tokens, output ¥0.6/million tokens (possibly the lowest among mainstream models)
- Deep integration with ArkClaw fully managed service (see [Appendix C](/en/appendix/appendix-c))
- Coding Plan: Starting from ¥9.9/first month, supports ArkClaw + Claude Code + Cursor simultaneously
- Deep Feishu integration

**Notes:**
- Model capability is in the top tier domestically but not the absolute best
- Some features require a Coding Plan subscription

**OpenClaw Configuration:**
```bash
export ARK_API_KEY="..."
# Need to create inference endpoint in Volcengine Ark console
# model: "doubao:doubao-seed-2.0"
```

**Link:** [console.volcengine.com/ark](https://console.volcengine.com/ark) | [Coding Plan](https://www.volcengine.com/activity/codingplan)

</details>

<details>
<summary>Hunyuan (Tencent)</summary>

[Tencent Hunyuan](https://cloud.tencent.com/product/tclm) offers a complete model lineup from free to flagship.

**Model Lineup:**
- **hunyuan-lite**: **Free and unlimited** — currently the only mainstream model that is completely free with no usage limits
- **hunyuan-standard**: Standard version
- **hunyuan-pro**: Flagship version

**Advantages:**
- **hunyuan-lite free and unlimited** — run OpenClaw 24/7 at zero cost
- Deep integration with Tencent Cloud deployment (see [Appendix C](/en/appendix/appendix-c))
- QQ/WeCom/WeChat ecosystem synergy
- Function Calling supported

**Notes:**
- hunyuan-lite has limited capability (32K context, suitable for simple tasks)
- Flagship version is priced higher among domestic providers

**OpenClaw Configuration:**
```bash
export HUNYUAN_SECRET_ID="..."
export HUNYUAN_SECRET_KEY="..."
# model: "hunyuan:hunyuan-lite"   # free
# model: "hunyuan:hunyuan-pro"    # flagship
```

**Link:** [cloud.tencent.com/product/tclm](https://cloud.tencent.com/product/tclm)

</details>

<details>
<summary>MiniMax</summary>

[MiniMax](https://platform.minimaxi.com) is known for its MoE architecture and multimodal capabilities.

**Model Lineup:**
- **MiniMax-M2.7**: Flagship MoE model (229B params, ~10B active), 200K+ context
- **MiniMax-Text**: Text-specialized
- **MiniMax-VL**: Visual understanding

**Advantages:**
- MoE architecture keeps costs low (fewer active parameters, cheaper inference)
- Built-in multimodal (image/video understanding, text-to-image/video)
- MaxClaw fully managed service (see [Appendix C](/en/appendix/appendix-c))
- 200K+ long context

**OpenClaw Configuration:**
```bash
export MINIMAX_API_KEY="..."
# model: "minimax:MiniMax-M2.7"
```

**Link:** [platform.minimaxi.com](https://platform.minimaxi.com) | [MaxClaw](https://maxclaw.ai/)

</details>

<details>
<summary>StepFun</summary>

[StepFun](https://platform.stepfun.com) specializes in high-performance reasoning models.

**Model Lineup:**
- **Step-3.5**: Flagship model
- **Step-3.5-flash**: Lightweight fast version — **available for free via OpenRouter**

**Advantages:**
- `qwen/qwen3.6-plus:free` is free via OpenRouter (the onboarding solution in Chapter 2 of this tutorial)
- Direct API pricing is also competitive
- Fast inference speed

> If you use StepFun's free model via OpenRouter, you do not need to register a separate StepFun account.

**Link:** [platform.stepfun.com](https://platform.stepfun.com)

</details>

<details>
<summary>ERNIE (Baidu Qianfan)</summary>

[Baidu Qianfan](https://console.bce.baidu.com/qianfan) provides the ERNIE series of models.

**Model Lineup:**
- **ERNIE-4.5-turbo**: Flagship version
- **ERNIE-4.0**: Previous-generation flagship
- **ERNIE-Speed/Lite**: Economy versions

**Advantages:**
- Backed by Baidu search data, rich Chinese knowledge base
- Qianfan platform provides 7 official OpenClaw skills
- Free trial quota available
- Integrated with Baidu Cloud deployment solutions (see [Appendix C](/en/appendix/appendix-c))

**Link:** [console.bce.baidu.com/qianfan](https://console.bce.baidu.com/qianfan) | [Qianfan Documentation](https://cloud.baidu.com/doc/qianfan)

</details>

<details>
<summary>Z.AI</summary>

[Z.AI](https://z.ai) provides model API services.

**Features:**
- One of the officially supported providers for OpenClaw
- For specific pricing and model details, please refer to the official website

**Link:** [z.ai](https://z.ai)

</details>

---

## 5. International Model Providers

International providers generally offer the most cutting-edge model capabilities, but **require a VPN** and **international credit card payments**. If you are in China and cannot connect directly, you can access these models indirectly through [OpenRouter](#_3-1-openrouter) or [SiliconFlow](#_3-2-siliconflow).

### 5.1 Quick Comparison

| Provider | Flagship Model | Input Price ($/million tokens) | Output Price ($/million tokens) | Free Quota | Context | Highlights |
|----------|---------------|-------------------------------|--------------------------------|-----------|---------|-----------|
| **OpenAI** | GPT-5 | ~30 | ~60 | ❌ | 128K | Best overall, most complete ecosystem |
| **OpenAI** | GPT-4o | ~2.5 | ~10 | ❌ | 128K | High-value multimodal |
| **OpenAI** | o3 | ~15 | ~60 | ❌ | 200K | Deep reasoning |
| **Anthropic** | Claude Opus 4.5 | ~15 | ~75 | ❌ | 200K | Best for coding, extra-long output |
| **Anthropic** | Claude Sonnet 4.5 | ~3 | ~15 | ❌ | 200K | Value coding |
| **Google** | Gemini 2.5 Pro | ~1.25 | ~10 | ✅ Free tier | **1M** | Ultra-long context champion |
| **Google** | Gemini 2.5 Flash | ~0.15 | ~0.6 | ✅ Free tier | 1M | Extreme value |
| **xAI** | Grok 4 | ~5 | ~15 | ✅ Free credits | 128K | Real-time info (X/Twitter) |
| **Mistral** | Mistral Large | ~2 | ~6 | ✅ Free tier | 128K | European open-source leader |
| **Mistral** | Codestral | ~0.3 | ~0.9 | ✅ Free tier | 256K | Code-specialized, FIM support |
| **Perplexity** | Sonar Pro | ~3 | ~15 | ❌ | 128K | Search-augmented, with citations |

> **Pricing note**: The above are reference prices as of March 2026. Please refer to each provider's official website for actual prices. OpenAI/Anthropic prices change frequently.

### 5.2 Provider Details

<details>
<summary>OpenAI — Industry Standard</summary>

[OpenAI](https://platform.openai.com) is the pioneer of the large model industry. The GPT series has long led in overall capability.

**Model Lineup:**
- **GPT-5.4**: Default OpenClaw model, strongest overall capability (with gpt-5.4-mini and gpt-5.4-nano pre-configured)
- **GPT-5**: Previous flagship
- **GPT-4o**: Multimodal flagship, supports text/image/audio input
- **GPT-4o-mini**: Lightweight and high-value
- **o3 / o3-mini**: Deep reasoning models (similar to DeepSeek R1, but stronger)
- **o1**: Previous-generation reasoning model

**Advantages:**
- Consistently leads in overall capability
- Most complete ecosystem (function calling, JSON mode, structured output)
- Best native OpenClaw support (many skills default to OpenAI format)
- Strong multimodal capabilities (image understanding, audio)

**Notes:**
- VPN required
- International credit card required (Visa/Mastercard)
- Price is on the higher end among mainstream providers
- Chinese phone numbers cannot register (overseas or virtual number required)

**OpenClaw Configuration:**
```bash
export OPENAI_API_KEY="sk-..."
# model: "openai:gpt-4o"
# model: "openai:o3"
```

**Link:** [platform.openai.com](https://platform.openai.com)

</details>

<details>
<summary>Anthropic (Claude) — King of Coding</summary>

[Anthropic](https://console.anthropic.com)'s Claude series excels in coding, long-text processing, and safety.

**Model Lineup:**
- **Claude Opus 4.5**: Flagship, industry-best coding capability
- **Claude Sonnet 4.5**: Value coding option
- **Claude Haiku 4.5**: Lightweight and fast

**Advantages:**
- Industry benchmark for coding capability (consistently leads SWE-bench rankings)
- 200K context window
- Outstanding safety design (Constitutional AI)
- Extra-long output capability (generate thousands of lines of code in one request)

**Notes:**
- VPN required
- International credit card required
- API price is high (Opus 4.5 output $75/million tokens)
- Rate limits are relatively strict

**OpenClaw Configuration:**
```bash
export ANTHROPIC_API_KEY="sk-ant-..."
# model: "anthropic:claude-sonnet-4-5-20250514"
```

> **Anthropic Vertex Integration**: Supports calling Claude models directly via Google Vertex AI, including GCP authentication and auto-discovery. For teams already running on Google Cloud, this path requires no separate Anthropic API Key.

**Link:** [console.anthropic.com](https://console.anthropic.com)

</details>

<details>
<summary>Google (Gemini) — Ultra-Long Context</summary>

[Google AI Studio](https://aistudio.google.com) provides the Gemini series of models, renowned for their ultra-long context windows.

**Model Lineup:**
- **Gemini 2.5 Pro**: Flagship, **1M token context** (one million!)
- **Gemini 2.5 Flash**: Lightweight and fast, also supports 1M context
- **Gemini 2.5 Flash-8B**: Ultra-lightweight

**Advantages:**
- **1M token context** — can ingest an entire book or codebase in one go
- Free tier available (AI Studio is free with rate limits)
- Strong multimodal capabilities (native support for image, video, audio input)
- Gemini 2.5 Flash is extremely affordable ($0.15/million tokens input)

**Notes:**
- VPN required (AI Studio)
- Chinese language support not as strong as domestic models
- Free tier has rate limits

**OpenClaw Configuration:**
```bash
export GOOGLE_API_KEY="..."
# model: "google:gemini-2.5-pro"
# model: "google:gemini-2.5-flash"
```

**Link:** [aistudio.google.com](https://aistudio.google.com) | [Vertex AI](https://cloud.google.com/vertex-ai)

</details>

<details>
<summary>xAI (Grok)</summary>

[xAI](https://console.x.ai), founded by Elon Musk, has Grok models deeply integrated with the X/Twitter platform.

**Model Lineup:**
- **Grok 4**: Latest flagship
- **Grok 3**: Previous-generation flagship

**Advantages:**
- Real-time information access (integrates X/Twitter data stream)
- Free API credits for new users
- Humorous conversational experience

**Notes:**
- VPN required
- International credit card required
- Model ecosystem and tool calling support not as complete as OpenAI

**Link:** [console.x.ai](https://console.x.ai)

</details>

<details>
<summary>Mistral — European Open-Source Leader</summary>

[Mistral](https://mistral.ai) is Europe's most important AI company, known for open-source models and coding capabilities.

**Model Lineup:**
- **Mistral Large**: Flagship general model, 128K context
- **Codestral**: Designed specifically for code, 256K context, supports Fill-in-the-Middle (FIM)
- **Mistral Small**: Lightweight economy version
- **Pixtral**: Visual understanding model

**Advantages:**
- Free tier available (some models free on La Plateforme)
- **Codestral excels at code**: Optimized for programming, supports 80+ languages
- Open-source models can be deployed locally
- European data compliance (GDPR)

**OpenClaw Configuration:**
```bash
export MISTRAL_API_KEY="..."
# model: "mistral:mistral-large-latest"
# model: "mistral:codestral-latest"
```

**Link:** [mistral.ai](https://mistral.ai) | [La Plateforme](https://console.mistral.ai)

</details>

<details>
<summary>Perplexity — Search Augmented</summary>

[Perplexity](https://docs.perplexity.ai) provides search-augmented model APIs, where answers automatically include web citation sources.

**Model Lineup:**
- **Sonar Pro**: Flagship search-augmented model
- **Sonar**: Standard version

**Advantages:**
- **Built-in real-time web search** — no need to configure search skills separately
- Answers automatically include citation sources (URLs)
- Ideal for scenarios requiring real-time information (news, research, fact-checking)

**Notes:**
- Higher price (search cost included in token price)
- Not suitable for pure creative/coding scenarios
- VPN required

**Link:** [docs.perplexity.ai](https://docs.perplexity.ai)

</details>

---

## 6. Local Deployment

Don't want to send your data to the cloud? Local deployment runs models entirely on your computer — **zero cost, zero latency, complete privacy**. The trade-off is that sufficient hardware is required, and model capability is usually weaker than cloud flagships.

| | Ollama | LM Studio |
|---|---|---|
| **Type** | CLI tool | GUI application |
| **Supported Platforms** | macOS / Linux / Windows | macOS / Linux / Windows |
| **Interface** | Command line | Graphical UI (beginner-friendly) |
| **Model Format** | GGUF (llama.cpp) | GGUF (llama.cpp) |
| **Model Library** | ollama.com/library | Built-in model search and download |
| **API Compatibility** | ✅ OpenAI format (localhost:11434) | ✅ OpenAI format (localhost:1234) |
| **Resource Usage** | Low (inference only) | Medium (includes GUI) |
| **Best For** | Technical users / experienced with terminal | Beginners / prefer GUI |

<details>
<summary>Ollama Quick Start</summary>

```bash
# Install
curl -fsSL https://ollama.com/install.sh | sh   # Linux/macOS
# Windows: Download installer from ollama.com

# Download and run models
ollama pull deepseek-r1:8b        # 8B param version, requires ~6GB VRAM/RAM
ollama pull qwen2.5:14b           # 14B param version, requires ~10GB
ollama pull llama3.3:8b           # Meta Llama 3.3

# Start API server (default http://localhost:11434)
ollama serve
```

**OpenClaw Configuration:**
```bash
# Set local model
# openclaw models set ollama/deepseek-r1:8b
```

**Hardware Recommendations:**

| Model Size | Minimum RAM | Recommended GPU | Recommended Use Case |
|-----------|------------|----------------|---------------------|
| 1–3B | 4GB | None needed | Simple Q&A |
| 7–8B | 8GB | 6GB VRAM | Daily chat, simple coding |
| 14B | 16GB | 12GB VRAM | More complex tasks |
| 32B+ | 32GB+ | 24GB+ VRAM | Near cloud quality |

> **Apple Silicon users**: The unified memory in M-series chips is especially well-suited for local models. A 16GB M4 can run 8B models smoothly; 24GB+ can run 14B models.

</details>

<details>
<summary>LM Studio Quick Start</summary>

1. Download and install from [lmstudio.ai](https://lmstudio.ai)
2. Open the app and search for a model (e.g., "deepseek")
3. One-click download, click "Start" to launch
4. Enable "Local Server" in settings (default http://localhost:1234)

**Advantage:** Pure GUI operation, ideal for users unfamiliar with the command line. Built-in model performance testing lets you see inference speed at a glance.

</details>

<details>
<summary>Hugging Face Open-Source Models</summary>

[Hugging Face](https://huggingface.co) is the world's largest open-source model hosting platform, where virtually all open-source large models are published.

**Usage Methods:**
- **Direct download**: Download GGUF format model files and load with Ollama or LM Studio
- **Inference API**: Hugging Face provides cloud inference API (free tier available)
- **Inference Endpoints**: Paid dedicated inference instance deployment

**Recommended Open-Source Models:**

| Model | Parameters | Features | HF Link |
|-------|-----------|----------|---------|
| DeepSeek R1 | 1.5B–671B | Deep reasoning, multiple sizes | deepseek-ai/DeepSeek-R1 |
| Qwen 2.5 | 0.5B–72B | Balanced general-purpose | Qwen/Qwen2.5 |
| Llama 3.3 | 8B–70B | Meta open-source flagship | meta-llama/Llama-3.3 |
| Mistral | 7B–24B | European open-source | mistralai/ |
| Gemma 3 | 2B–27B | Google open-source | google/gemma-3 |

> Open-source models typically need quantization (e.g., Q4_K_M) to run on consumer-grade hardware. Ollama provides quantized versions by default.

</details>

---

## 7. Selection Decision Framework

### 7.1 Four-Dimension Evaluation

Choosing a model provider requires balancing four dimensions:

| Dimension | Suggested Weight | Description |
|-----------|----------------|-------------|
| **Capability** | Core | The model's reasoning, coding, Chinese language, and tool calling abilities |
| **Cost** | Important | API price × your usage volume = monthly expenditure |
| **Accessibility** | Prerequisite | Can you access it directly from your network, and is the payment method available |
| **Ecosystem** | Bonus | Level of integration with OpenClaw, community support |

### 7.2 Scenario-Based Recommendations

| Scenario | First Choice | Alternative | Reason |
|---------|-------------|-------------|--------|
| **Zero-cost onboarding** | OpenRouter free models | Hunyuan hunyuan-lite | Free to use, quick experience |
| **Daily domestic use** | SiliconFlow + DeepSeek V3 | Qwen | Best value, all-in-one |
| **Deep reasoning / math** | DeepSeek R1 | OpenAI o3 | R1 is direct in China and cheaper |
| **Programming / development** | Anthropic Claude Sonnet 4.5 | Mistral Codestral | Strongest coding capability |
| **Ultra-long document processing** | Google Gemini 2.5 Pro | Moonshot Kimi K2.5 | 1M context |
| **Real-time information queries** | Perplexity Sonar | xAI Grok | Built-in search |
| **Multimodal (image/video)** | OpenAI GPT-4o | Google Gemini 2.5 | Native multimodal |
| **Enterprise compliance** | Anthropic Claude | Mistral (GDPR) | Safety/compliance design |
| **Complete privacy** | Ollama + local models | LM Studio | Data stays on device |
| **24/7 low-cost operation** | Hunyuan hunyuan-lite | Doubao Doubao-lite | Free / ultra-low price |

### 7.3 Model Capability Tiers (2026 Q1 Reference)

The following image, widely circulated in the community as the "LLM Throne" chart, visually shows the standings of today's mainstream models:

![LLM Rankings — Community-recognized model capability tier chart](./images/model-ranking.jpg)

> Image source: Community creation, for reference only. Actual rankings vary by benchmark and use case.

**T0 (Top Tier):** GPT-5, Claude Opus 4.5, Gemini 2.5 Pro, o3
> Strongest overall capability, suitable for complex reasoning, high-quality creation, and difficult coding tasks. Highest price.

**T1 (Main Force):** GPT-4o, Claude Sonnet 4.5, DeepSeek V3/R1, Grok 4, Qwen3.5-plus, GLM-5
> Fully capable for daily use, excellent value. DeepSeek V3 achieves near-T0 capability at 1/30 the price.

**T2 (Economy):** GPT-4o-mini, Gemini 2.5 Flash, Doubao-Seed-2.0, DeepSeek V3 (via aggregation), Step-3.5-flash
> Best choice for simple tasks, extremely low price, fast response.

**T3 (Free / Local):** Hunyuan hunyuan-lite, OpenRouter free models, Ollama local models
> Zero-cost operation, limited capability, suitable for exploration and lightweight scenarios.

---

## 8. Pricing Quick Reference

> The following are API portal addresses and key information for each provider. Prices are for reference only — please check each provider's official website for real-time pricing.

### 8.1 Domestic Providers

| Provider | Portal | Payment | Free Quota | Notes |
|----------|--------|---------|-----------|-------|
| **SiliconFlow** | [cloud.siliconflow.cn](https://cloud.siliconflow.cn) | Alipay/WeChat | ¥16 new user | Aggregation platform, widest model selection |
| **DeepSeek** | [platform.deepseek.com](https://platform.deepseek.com) | Alipay | New user credit | Best value |
| **Qwen** | [dashscope.console.aliyun.com](https://dashscope.console.aliyun.com) | Alipay | Free quota available | Alibaba Cloud |
| **GLM** | [open.bigmodel.cn](https://open.bigmodel.cn) | Alipay/WeChat | New user credit | Tsinghua affiliated |
| **Moonshot** | [platform.moonshot.cn](https://platform.moonshot.cn) | Alipay | Limited free | Ultra-long context |
| **Doubao** | [console.volcengine.com/ark](https://console.volcengine.com/ark) | Alipay | Included in Coding Plan | ByteDance, ultra-low price |
| **Hunyuan** | [cloud.tencent.com/product/tclm](https://cloud.tencent.com/product/tclm) | WeChat/Alipay | **lite free unlimited** | Tencent |
| **MiniMax** | [platform.minimaxi.com](https://platform.minimaxi.com) | Alipay | Welcome credits | MoE multimodal |
| **StepFun** | [platform.stepfun.com](https://platform.stepfun.com) | Alipay | — | Or use OpenRouter for free |
| **ERNIE** | [console.bce.baidu.com/qianfan](https://console.bce.baidu.com/qianfan) | Alipay | Free quota available | Baidu ecosystem |

### 8.2 International Providers

| Provider | Portal | Payment | Free Quota | Accessible in China |
|----------|--------|---------|-----------|---------------------|
| **OpenRouter** | [openrouter.ai](https://openrouter.ai) | International card/Crypto | ✅ Free models | Some regions |
| **OpenAI** | [platform.openai.com](https://platform.openai.com) | International card | ❌ | ❌ VPN required |
| **Anthropic** | [console.anthropic.com](https://console.anthropic.com) | International card | ❌ | ❌ VPN required |
| **Google** | [aistudio.google.com](https://aistudio.google.com) | International card | ✅ Free tier | ❌ VPN required |
| **xAI** | [console.x.ai](https://console.x.ai) | International card | ✅ Free credits | ❌ VPN required |
| **Mistral** | [console.mistral.ai](https://console.mistral.ai) | International card | ✅ Free tier | ❌ VPN required |
| **Perplexity** | [docs.perplexity.ai](https://docs.perplexity.ai) | International card | ❌ | ❌ VPN required |

### 8.3 Local Deployment

| Tool | Download | Cost | Notes |
|------|---------|------|-------|
| **Ollama** | [ollama.com](https://ollama.com) | Free | CLI tool, first choice for technical users |
| **LM Studio** | [lmstudio.ai](https://lmstudio.ai) | Free | GUI application, beginner-friendly |
| **Hugging Face** | [huggingface.co](https://huggingface.co) | Free (download) | Open-source model hosting platform |
