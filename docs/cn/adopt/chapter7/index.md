# 第七章 多模型与成本优化

> **前提**：本章假设你已完成第一章的安装配置。如果你只使用一个模型提供商（如硅基流动），可以先跳过本章，等需要切换或优化费用时再回来看。

OpenClaw 不绑定任何单一 LLM（大语言模型）提供商。你可以同时配置 Claude、GPT、本地 Ollama 等多个模型，根据任务复杂度智能路由，在保证质量的同时大幅降低 API 费用。

> **什么是 Token？** 在 AI 模型计费中，Token 是文本的计量单位。1 个汉字约等于 1-2 个 Token，1 个英文单词约等于 1 个 Token。模型提供商按你消耗的 Token 数量收费——你发送的问题和 AI 的回答都会消耗 Token。

## 1. 支持的模型

### 1.1 云端模型

| 提供商 | 模型 | 特点 | 适合任务 |
|--------|------|------|---------|
| **硅基流动** | `siliconflow/deepseek-ai/DeepSeek-V3` | **国内推荐**，新用户 16 元免费 | 通用编码、中文任务 |
| 深度求索 | `deepseek/deepseek-chat` | 编码能力强 | 代码生成、调试 |
| 通义千问 | `qwen/qwen-max` | 阿里云生态，中文能力强 | 中文写作、企业应用 |
| 月之暗面 | `moonshot/moonshot-v1-128k` | 128K 长上下文 | 长文档分析 |
| 阶跃星辰 | `stepfun/step-2-16k` | 多模态、长上下文 | 图片理解、复杂推理 |
| 豆包 | `volcengine/doubao-seed-2-0-pro-260215` | 火山方舟平台，模型丰富 | 通用对话、编码 |
| 混元 | `hunyuan/hunyuan-turbos-latest` | hunyuan-lite 免费无限量 | 通用对话、翻译 |
| 稀宇科技 | `minimax/abab6.5s-chat` | 多模态支持 | 语音、图片处理 |
| 智谱 | `glm/glm-4-plus` | 清华技术背景，中文理解强 | 中文对话、知识问答 |
| 文心一言 | `ernie/ernie-4.0-8k` | 百度生态，中文内容生成 | 中文对话、写作 |
| OpenAI | `openai/gpt-5.4` | 最强综合能力 | 复杂推理、编码 |
| Anthropic | `anthropic/claude-opus-4-6` | 深度思考、长上下文 | 写作、分析、编码 |
| Google | `google/gemini-3.1-pro` | 多模态、大上下文窗口 | 多模态任务、长文档 |
| xAI | `xai/grok-4` | 实时信息接入 | 信息检索、对话 |

> **模型标识格式**：OpenClaw 统一使用 `provider/model-name` 格式标识模型。内置提供商包括：OpenAI、Anthropic、Google、xAI、Ollama、硅基流动、深度求索、通义千问、月之暗面、阶跃星辰、稀宇科技、火山引擎（豆包）、智谱、OpenRouter 等。混元、文心一言等其他提供商可通过自定义 OpenAI 兼容端点接入。
>
> **国内用户推荐**：[硅基流动（SiliconFlow）](https://cloud.siliconflow.cn)提供 OpenAI 兼容 API，新注册用户赠送 16 元算力券，支持支付宝/微信充值。详见第一章 4.2 节。通过硅基流动可直接访问 DeepSeek、Qwen、GLM 等多家模型，无需分别注册。

### 1.2 本地模型（Ollama）

| 模型 | 参数量 | 最低显存 | 特点 |
|------|--------|---------|------|
| Llama 3.3 | 70B | 48GB | 开源最强通用模型 |
| Qwen 2.5 | 72B | 48GB | 中文能力突出 |
| DeepSeek V3 | 671B（MoE，混合专家架构，虽然参数量大但实际显存需求低） | 24GB | 编码能力强 |
| Phi-4 | 14B | 8GB | 轻量级推理 |

## 2. 配置多模型

### 2.1 添加模型提供商

```bash
# 配置硅基流动（国内推荐）
openclaw config set llm.providers.siliconflow.baseUrl "https://api.siliconflow.cn/v1"
openclaw config set llm.providers.siliconflow.apiKey "sk-xxxxx"

# 添加 DeepSeek
openclaw config set llm.providers.deepseek.apiKey "sk-xxxxx"

# 添加豆包（火山引擎，内置提供商）
openclaw config set llm.providers.volcengine.apiKey "sk-xxxxx"

# 添加混元（腾讯，自定义 OpenAI 兼容端点）
openclaw config set llm.providers.hunyuan.baseUrl "https://api.hunyuan.cloud.tencent.com/v1"
openclaw config set llm.providers.hunyuan.apiKey "sk-xxxxx"

# 添加智谱（内置提供商）
openclaw config set llm.providers.glm.apiKey "sk-xxxxx"

# 添加本地 Ollama
openclaw config set llm.providers.ollama.baseUrl "http://localhost:11434"
```

### 2.2 设置默认模型

```bash
# 主模型：用于大多数任务
openclaw config set llm.default "siliconflow/deepseek-ai/DeepSeek-V3"

# 回退模型：主模型不可用时使用
openclaw config set llm.fallback "deepseek/deepseek-chat"
```

### 2.3 配置文件示例

```json
// openclaw.json
{
  "llm": {
    "default": "siliconflow/deepseek-ai/DeepSeek-V3",
    "fallback": "deepseek/deepseek-chat",
    "providers": {
      "siliconflow": {
        "baseUrl": "https://api.siliconflow.cn/v1",
        "apiKey": "sk-xxxxx",
        "models": ["deepseek-ai/DeepSeek-V3", "Qwen/Qwen2.5-72B-Instruct"]
      },
      "deepseek": {
        "apiKey": "sk-xxxxx",
        "models": ["deepseek-chat", "deepseek-coder"]
      },
      "ollama": {
        "baseUrl": "http://localhost:11434",
        "models": ["qwen2.5:72b", "deepseek-v3"]
      }
    }
  }
}
```

> **注意**：OpenClaw 的配置文件为 `openclaw.json`（JSON 格式），不是 YAML。

<details>
<summary>展开：模型路由策略配置</summary>

## 3. 模型路由策略

### 3.1 基于任务复杂度

OpenClaw 可以根据任务自动选择合适的模型：

```json
{
  "llm": {
    "routing": {
      "simple": "siliconflow/Qwen/Qwen2.5-7B-Instruct",
      "standard": "siliconflow/deepseek-ai/DeepSeek-V3",
      "complex": "deepseek/deepseek-chat"
    }
  }
}
```

运行时也可以通过命令快速切换模型：

```
/model fast
```

### 3.2 基于技能类型

不同技能可以指定不同的模型：

```json
{
  "skills": {
    "weather": {
      "model": "siliconflow/Qwen/Qwen2.5-7B-Instruct"
    },
    "code-reviewer": {
      "model": "deepseek/deepseek-chat"
    },
    "translator": {
      "model": "moonshot/moonshot-v1-128k"
    }
  }
}
```

</details>

<details>
<summary>展开：本地模型部署（Ollama）</summary>

## 4. 本地模型部署（Ollama）

### 4.1 安装 Ollama

```bash
# Linux
curl -fsSL https://ollama.ai/install.sh | sh

# macOS
brew install ollama
```

### 4.2 下载模型

```bash
# 下载 Qwen 2.5（推荐中文场景）
ollama pull qwen2.5:72b

# 下载 DeepSeek V3（推荐编码场景）
ollama pull deepseek-v3

# 轻量级模型（适合低配置机器）
ollama pull phi4:14b
```

### 4.3 配置 OpenClaw 使用本地模型

```bash
openclaw config set llm.providers.ollama.baseUrl "http://localhost:11434"
openclaw config set llm.default "ollama/qwen2.5:72b"
```

### 4.4 混合模式

推荐的混合部署：本地模型处理日常任务（零成本），复杂任务切换到云端 API：

```json
{
  "llm": {
    "default": "ollama/qwen2.5:72b",
    "fallback": "siliconflow/deepseek-ai/DeepSeek-V3",
    "routing": {
      "simple": "ollama/phi4:14b",
      "complex": "deepseek/deepseek-chat"
    }
  }
}
```

> **Ollama 自动发现**：OpenClaw 会自动查询 Ollama 的 `/api/tags` 和 `/api/show` 接口，发现本地已安装的模型，无需手动逐一配置。

</details>

## 5. 成本监控与优化

<details>
<summary>展开：成本监控与优化配置</summary>

### 5.1 查看 Token 消耗

```bash
# 查看今日消耗
openclaw usage today

# 查看本月统计
openclaw usage month

# 按技能查看消耗
openclaw usage --by-skill
```

### 5.2 设置预算上限

```json
{
  "llm": {
    "budget": {
      "daily": 5.00,
      "monthly": 100.00,
      "alert_at": 80
    }
  }
}
```

### 5.3 成本优化技巧

**使用缓存**：相同查询不重复调用 API。OpenClaw 内置了语义缓存，相似问题会复用之前的结果。

**精简 Prompt**：过长的系统提示词会增加每次调用的 Token 数。定期审查技能的提示词，去除冗余内容。

**选择合适的模型**：不要所有任务都用最贵的模型。简单任务用小模型（如硅基流动的 Qwen2.5-7B，约 ¥0.5/百万 tokens）就够了，不需要大模型（如 Claude Opus，约 ¥100/百万 tokens），价格相差上百倍。

**减少活跃技能**：每个活跃技能的说明都会加入上下文，增加 Token 消耗。只保留常用技能。

</details>

### 5.4 成本对比

| 使用模式 | 日均调用 | 月估算费用 |
|---------|---------|-----------|
| **硅基流动 DeepSeek V3** | 100 次 | **~¥20-50** |
| 混合路由（硅基流动 + Opus） | 100 次 | ~¥30-80 |
| 本地 Ollama + 云端回退 | 100 次 | ~¥5-15 |

## 6. 常见问题

**模型切换延迟**：不同模型的首次调用可能有冷启动延迟。Ollama 本地模型需要先加载到显存，首次响应会慢一些。

**本地模型质量不够**：对于复杂任务，本地模型确实不如 Claude Opus。建议设置自动回退：本地模型处理失败时自动切换到云端。

**API 限流**：大部分提供商都有 RPM（每分钟请求数）限制。如果遇到 429 错误，减少并发任务数或升级 API 套餐。

---

**下一步**：[第八章 个人助理系统](/cn/adopt/chapter8/)
