---
prev:
  text: '附录 F：命令速查表'
  link: '/cn/appendix/appendix-f'
next: false
---

# 附录 G：配置文件详解

OpenClaw 的所有行为——用哪个模型、连哪些渠道、多久心跳一次——都由一个 JSON5 配置文件（`~/.openclaw/openclaw.json`）控制。本附录逐项解读每个配置块，帮你理解"这个字段是干什么的"以及"什么时候需要改它"。

::: warning 优先使用 CLI 命令
**绝大多数配置都可以通过 CLI 命令完成**（如 `openclaw config set <key> <value>`），不需要手动编辑 JSON 文件。手动修改 JSON 容易漏逗号、多括号，导致配置解析失败、Gateway 无法启动。

本附录是**开发者参考文档**——当你需要了解配置文件的完整结构、批量修改配置、或排查配置问题时使用。日常使用请优先通过 CLI、配置向导（`openclaw onboard`）或 Web 控制面板（`openclaw dashboard`）管理配置。
:::

> **不想手写配置？** 推荐使用 [OpenClaw 配置生成器](https://coclaw.com/openclaw-config-generator/) 可视化生成配置，再对照本附录微调。

---

## 快速导航

| 配置块 | 控制什么 | 常见修改场景 |
|--------|---------|-------------|
| [agents](#一、agent-配置) | 模型选择、工作区、心跳、沙盒 | 换模型、加 Agent、调心跳频率 |
| [channels](#二、渠道配置) | 聊天平台接入、DM 策略、群聊 | 添加新平台、调整谁能私聊 |
| [gateway](#三、网关配置) | 端口、绑定地址、认证、热重载 | 远程访问、加密码、改端口 |
| [session](#四、会话配置) | 会话隔离、线程绑定、自动重置 | 多用户场景、调整记忆周期 |
| [tools](#五、工具配置) | 工具集级别、Web 搜索 | 启用/限制工具、配置搜索 API |
| [skills](#六、技能配置) | 技能启用与凭证 | 安装新技能后填入 API Key |
| [cron](#七、定时任务配置) | 并发、日志、会话保留 | 调整并发数、日志大小 |
| [hooks](#八、webhook-配置) | 外部事件触发 Agent | 对接 Gmail、GitHub 等 |
| [bindings](#九、绑定配置) | Agent ↔ 渠道映射 | 不同渠道用不同 Agent |
| [env](#十、环境变量) | API Key 等敏感信息 | 添加新提供商的 Key |
| [高级特性](#十一、高级特性) | $include、变量替换、SecretRef | 拆分大配置、安全存储凭证 |

---

## 配置文件位置

```
~/.openclaw/openclaw.json          # 主配置文件（JSON5 格式）
~/.openclaw/.env                   # 环境变量文件（存放 API Key 等）
```

配置文件不存在也能运行——OpenClaw 会使用安全默认值。可以通过 `openclaw config file` 确认实际路径。

## 配置文件整体结构

```json5
{
  agents: { ... },           // 智能体：模型、工作区、心跳
  channels: { ... },         // 渠道：Telegram / QQ / 飞书等
  gateway: { ... },          // 网关：端口、认证、热重载
  session: { ... },          // 会话：隔离策略、自动重置
  messages: { ... },         // 消息：群聊提及规则
  tools: { ... },            // 工具：启用级别、搜索配置
  skills: { ... },           // 技能：启用与凭证
  cron: { ... },             // 定时任务：并发、日志
  hooks: { ... },            // Webhook：外部事件触发
  bindings: [...],           // 绑定：Agent 与渠道的映射
  env: { ... },              // 环境变量：API Key 等
}
```

---

## 一、Agent 配置

Agent 是 OpenClaw 的核心——每个 Agent 有自己的模型、工作区和行为设置。

### 1.1 默认配置（agents.defaults）

所有 Agent 共享的默认值，单个 Agent 可以覆盖。

```json5
{
  agents: {
    defaults: {
      workspace: "~/.openclaw/workspace",

      // 模型：主模型 + 回退链
      model: {
        primary: "anthropic/claude-sonnet-4-5",
        fallbacks: ["openai/gpt-5.2"]
      },

      // 模型目录（让用户通过 /model 命令切换）
      models: {
        "anthropic/claude-sonnet-4-5": { alias: "Sonnet" },
        "openai/gpt-5.2": { alias: "GPT" }
      },

      imageMaxDimensionPx: 1200,     // 图片缩放上限（像素）

      // 心跳：Agent 定期主动发消息
      heartbeat: {
        every: "30m",                // 间隔：30m / 2h / 1d
        target: "last",              // 发给谁：last（最近对话） | 指定渠道 | none
        directPolicy: "allow"        // 是否允许直接消息：allow | block
      },

      // 沙盒：隔离工具执行环境
      sandbox: {
        mode: "non-main",            // off | non-main（非主 Agent 隔离） | all
        scope: "agent"               // session | agent | shared
      },

      // 工具
      tools: {
        enabled: true,
        profile: "full"
      }
    }
  }
}
```

**配置项速查：**

| 配置项 | 类型 | 默认值 | 什么时候改 |
|--------|------|--------|-----------|
| `workspace` | string | ~/.openclaw/workspace | 想把工作文件放到别的目录 |
| `model.primary` | string | — | 换主模型（格式 `provider/model`） |
| `model.fallbacks` | array | [] | 主模型挂了自动切换到备选 |
| `imageMaxDimensionPx` | number | 1200 | 图片太大占 Token，可以调小 |
| `heartbeat.every` | string | — | 调整 Agent 主动问候的频率 |
| `sandbox.mode` | string | off | 安全敏感场景建议开 `all` |

### 1.2 多 Agent 配置（agents.list）

一个 OpenClaw 实例可以运行多个 Agent——比如"家庭助手"和"工作助手"用不同模型：

```json5
{
  agents: {
    list: [
      {
        id: "home",
        default: true,                         // 默认 Agent
        workspace: "~/.openclaw/workspace-home",
        groupChat: {
          mentionPatterns: ["@openclaw", "openclaw"]
        }
      },
      {
        id: "work",
        workspace: "~/.openclaw/workspace-work",
        model: {
          primary: "anthropic/claude-opus-4-6"  // 工作用更强的模型
        }
      }
    ]
  }
}
```

> 多 Agent 需要配合[绑定配置](#九、绑定配置)，指定哪个 Agent 响应哪个渠道。

---

## 二、渠道配置

渠道决定了 OpenClaw 连接哪些聊天平台、谁能跟它说话。

### 2.1 渠道与 DM 策略

每个渠道可以独立设置"谁能私聊"策略：

```json5
{
  channels: {
    telegram: {
      enabled: true,
      botToken: "123:abc",
      dmPolicy: "pairing",           // 私聊策略（见下表）
      allowFrom: ["tg:123"],         // allowlist/open 模式下的白名单
    },

    whatsapp: {
      enabled: true,
      allowFrom: ["+15555550123"],
      groups: {
        "*": { requireMention: true } // 群聊必须 @ 才响应
      }
    },

    discord: {
      enabled: true,
      botToken: "${DISCORD_BOT_TOKEN}",  // 引用环境变量
      dmPolicy: "pairing",
      allowFrom: ["discord:123"]
    },

    slack: {
      enabled: true,
      botToken: "${SLACK_BOT_TOKEN}",
      dmPolicy: "pairing"
    }
  }
}
```

**DM 策略选项：**

| 策略 | 行为 | 适用场景 |
|------|------|---------|
| `pairing` | 陌生人收到配对码，需管理员批准 | 个人使用（推荐） |
| `allowlist` | 仅白名单内的用户可私聊 | 小团队 |
| `open` | 允许所有人私聊（需 `allowFrom: ["*"]`） | 公开服务 |
| `disabled` | 忽略所有私聊 | 仅群聊场景 |

### 2.2 群聊提及门控

群聊中，Agent 默认不会响应每条消息——需要被 @ 提及才会回复：

```json5
{
  agents: {
    list: [{
      id: "main",
      groupChat: {
        mentionPatterns: ["@openclaw", "openclaw"]  // 触发词
      }
    }]
  },
  channels: {
    whatsapp: {
      groups: {
        "*": { requireMention: true }   // 所有群都要 @
      }
    }
  }
}
```

> 渠道配置详见[第 4 章 Chat Provider 配置](/cn/adopt/chapter4/)。

---

## 三、网关配置

网关是 OpenClaw 的后台服务进程，所有消息收发都经过它。

```json5
{
  gateway: {
    port: 18789,                      // 监听端口
    bind: "loopback",                 // 绑定地址
    auth: {
      mode: "token",                  // 认证方式
      token: "${OPENCLAW_GATEWAY_TOKEN}",
      password: "${OPENCLAW_GATEWAY_PASSWORD}",
      allowTailscale: true            // Tailscale 连接免认证
    },
    tailscale: {
      mode: "off",                    // off | serve | funnel
      resetOnExit: false
    },
    reload: {
      mode: "hybrid",                // 配置变更时的重载策略
      debounceMs: 300
    }
  }
}
```

**绑定地址——决定谁能连：**

| 值 | 能访问的范围 | 安全性 |
|----|-------------|--------|
| `loopback` | 仅本机（127.0.0.1） | 最安全（默认） |
| `lan` | 局域网内所有设备 | 需配合认证 |
| `tailnet` | Tailscale 虚拟网络 | 端到端加密 |
| `auto` | 自动检测 | — |
| `custom` | 自定义地址 | 取决于配置 |

**热重载模式——改了配置要不要重启：**

| 模式 | 行为 | 选择建议 |
|------|------|---------|
| `hybrid` | 安全更改热应用，关键更改自动重启 | 推荐（默认） |
| `hot` | 仅热应用，需要重启时只记日志 | 不想被打断 |
| `restart` | 任何改动都重启 | 追求一致性 |
| `off` | 不监听配置文件变化 | 手动管理 |

> 网关管理详见[第 8 章](/cn/adopt/chapter8/)，远程访问详见[第 9 章](/cn/adopt/chapter9/)。

---

## 四、会话配置

会话决定了"谁和谁的对话算同一个上下文"。

```json5
{
  session: {
    dmScope: "per-channel-peer",      // 会话隔离粒度

    threadBindings: {                 // 线程绑定（Discord/Slack 等有线程的平台）
      enabled: true,
      idleHours: 24,                  // 线程空闲多久后解绑
      maxAgeHours: 0                  // 0 = 不限最大年龄
    },

    reset: {                          // 自动重置会话
      mode: "daily",                  // daily | idle | manual
      atHour: 4,                      // daily 模式：每天几点重置（24h 制）
      idleMinutes: 120                // idle 模式：空闲多久重置
    }
  }
}
```

**会话隔离粒度——影响"谁和谁共享记忆"：**

| 值 | 隔离方式 | 适用场景 |
|----|---------|---------|
| `main` | 所有人共享一个会话 | 单用户 |
| `per-peer` | 每人一个会话 | 简单多用户 |
| `per-channel-peer` | 每个平台的每人一个会话 | 多平台多用户（推荐） |
| `per-account-channel-peer` | 每个账号×平台×用户 | 多 Agent 多平台 |

---

## 五、工具配置

控制 Agent 能使用哪些工具（搜索、编程、文件操作等）。

```json5
{
  tools: {
    profile: "full",                  // 工具集级别
    enabled: true,
    web: {
      search: {
        apiKey: "${BRAVE_API_KEY}"    // Web 搜索需要的 API Key
      }
    }
  }
}
```

**工具集级别——从少到多：**

| Profile | 包含的工具 | 适用场景 |
|---------|----------|---------|
| `messaging` | 仅聊天，无工具 | 纯对话 |
| `default` | 基础工具集 | 日常使用 |
| `coding` | 编程工具集 | 开发者 |
| `full` | 完整工具集 | 全功能（推荐） |
| `all` | 所有工具（含实验性） | 尝鲜 |

---

## 六、技能配置

安装技能后，部分技能需要在配置中填入 API Key 才能启用。

```json5
{
  skills: {
    entries: {
      "nano-banana-pro": {
        enabled: true,
        apiKey: {
          source: "file",
          provider: "filemain",
          id: "/skills/entries/nano-banana-pro/apiKey"
        }
      }
    }
  }
}
```

> 技能管理用 `clawhub` CLI，详见[附录 D 技能开发与发布指南](/cn/appendix/appendix-d)。

---

## 七、定时任务配置

控制 Cron 任务的全局行为。

```json5
{
  cron: {
    enabled: true,
    maxConcurrentRuns: 2,             // 最多同时执行几个任务
    sessionRetention: "24h",          // 任务会话保留时长
    runLog: {
      maxBytes: "2mb",                // 日志文件大小上限
      keepLines: 2000                 // 保留最近多少行
    }
  }
}
```

> 定时任务的增删改查见[附录 F 命令速查表](/cn/appendix/appendix-f#定时任务)。

---

## 八、Webhook 配置

让外部服务（Gmail、GitHub、IoT 传感器等）通过 HTTP 触发 Agent 执行任务。

```json5
{
  hooks: {
    enabled: true,
    token: "shared-secret",           // 鉴权 Token（调用方需携带）
    path: "/hooks",                   // Webhook 路径前缀
    defaultSessionKey: "hook:ingress",
    allowRequestSessionKey: false,
    allowedSessionKeyPrefixes: ["hook:"],
    mappings: [
      {
        match: { path: "gmail" },     // 匹配 /hooks/gmail
        action: "agent",
        agentId: "main",
        deliver: true                 // 处理结果投递到渠道
      }
    ]
  }
}
```

> 例如收到 Gmail 新邮件通知后，Agent 自动摘要并推送到 Telegram。

---

## 九、绑定配置

多 Agent 场景下，绑定决定"哪个渠道的消息由哪个 Agent 处理"。

```json5
{
  bindings: [
    {
      agentId: "home",
      match: {
        channel: "whatsapp",
        accountId: "personal"         // 个人 WhatsApp → home Agent
      }
    },
    {
      agentId: "work",
      match: {
        channel: "whatsapp",
        accountId: "biz"              // 工作 WhatsApp → work Agent
      }
    }
  ]
}
```

---

## 十、环境变量

API Key 等敏感信息不要直接写在配置文件里——放在 `.env` 文件或环境变量中，配置文件通过 `${VAR}` 引用。

```json5
{
  env: {
    OPENROUTER_API_KEY: "sk-or-...",  // 直接设值（不推荐，建议用 .env）
    vars: {
      GROQ_API_KEY: "gsk-..."         // 额外变量
    },
    shellEnv: {
      enabled: true,                  // 从 shell 环境继承变量
      timeoutMs: 15000
    }
  }
}
```

**环境变量加载优先级**（先找到的优先）：

1. 父进程环境变量（如 systemd 传入的）
2. 当前工作目录的 `.env` 文件
3. `~/.openclaw/.env` 文件（全局兜底）

> 已存在的环境变量不会被覆盖。

---

## 十一、高级特性

以下特性在配置较复杂时才会用到，初学者可以跳过。

### 11.1 配置分割（$include）

配置文件太长？用 `$include` 拆分成多个文件：

```json5
// ~/.openclaw/openclaw.json
{
  gateway: { port: 18789 },
  agents: {
    $include: "./agents.json5"        // 单文件：整体替换
  },
  broadcast: {
    $include: [
      "./clients/a.json5",           // 多文件：按顺序深度合并
      "./clients/b.json5"
    ]
  }
}
```

**合并规则：**
- 单文件引入：替换当前对象
- 多文件引入：按顺序深度合并，后面的优先
- 同级键：合并后覆盖被引入的值
- 嵌套引入：最多 10 层
- 路径：相对于当前文件解析

### 11.2 环境变量替换

配置中的字符串值可以引用环境变量：

```json5
{
  gateway: {
    auth: {
      token: "${OPENCLAW_GATEWAY_TOKEN}"     // 整个值来自变量
    }
  },
  models: {
    providers: {
      custom: {
        baseUrl: "${API_BASE}/v1"            // 内联拼接
      }
    }
  }
}
```

**注意事项：**
- 变量名仅匹配大写字母+下划线：`[A-Z_][A-Z0-9_]*`
- 变量不存在或为空时，加载报错（防止误配置）
- 转义：`$${VAR}` 输出字面量 `${VAR}`
- 在 `$include` 文件中同样有效

### 11.3 SecretRef 凭证

对安全要求更高的场景，可以用 SecretRef 从外部系统获取凭证：

```json5
{
  models: {
    providers: {
      openai: {
        apiKey: {
          source: "env",              // 从环境变量读取
          provider: "default",
          id: "OPENAI_API_KEY"
        }
      }
    }
  },
  skills: {
    entries: {
      "nano-banana-pro": {
        apiKey: {
          source: "file",             // 从文件读取
          provider: "filemain",
          id: "/skills/entries/nano-banana-pro/apiKey"
        }
      }
    }
  },
  channels: {
    googlechat: {
      serviceAccountRef: {
        source: "exec",              // 从命令输出读取（如 Vault）
        provider: "vault",
        id: "channels/googlechat/serviceAccount"
      }
    }
  }
}
```

**source 类型：**

| 类型 | 来源 | 适用场景 |
|------|------|---------|
| `env` | 环境变量 | 简单场景（默认推荐） |
| `file` | 文件内容 | K8s Secret 挂载 |
| `exec` | 命令执行输出 | HashiCorp Vault 等密钥管理器 |

> 安全相关详见[第 10 章 安全防护与威胁模型](/cn/adopt/chapter10/)。

---

## 十二、完整配置示例

不知道怎么开始？找一个和你情况最接近的模板，复制后修改。

### 最小配置——刚装好，能用就行

```json5
// ~/.openclaw/openclaw.json
{
  agents: {
    defaults: {
      workspace: "~/.openclaw/workspace"
    }
  },
  channels: {
    whatsapp: {
      allowFrom: ["+15555550123"]
    }
  }
}
```

### 本地开发——用本地模型，不花钱

```json5
{
  agents: {
    defaults: {
      workspace: "~/.openclaw/workspace",
      model: {
        primary: "ollama/llama3.2"
      }
    }
  },
  gateway: {
    port: 18789,
    bind: "loopback",
    auth: {
      mode: "token",
      token: "dev-token"
    }
  }
}
```

### 服务器部署——远程访问 + 模型回退

```json5
{
  agents: {
    defaults: {
      workspace: "~/.openclaw/workspace",
      model: {
        primary: "anthropic/claude-sonnet-4-5",
        fallbacks: ["openai/gpt-5.2"]         // 主模型挂了自动切换
      }
    }
  },
  channels: {
    telegram: {
      enabled: true,
      botToken: "${TELEGRAM_BOT_TOKEN}",
      dmPolicy: "pairing"
    }
  },
  gateway: {
    port: 18789,
    bind: "lan",                               // 局域网可访问
    auth: {
      mode: "password",
      password: "${GATEWAY_PASSWORD}"
    }
  },
  session: {
    dmScope: "per-channel-peer"                // 每人独立会话
  }
}
```

### 多 Agent——家庭 + 工作分开

```json5
{
  agents: {
    defaults: {
      model: { primary: "anthropic/claude-sonnet-4-5" }
    },
    list: [
      {
        id: "home",
        default: true,
        workspace: "~/.openclaw/workspace-home"
      },
      {
        id: "work",
        workspace: "~/.openclaw/workspace-work",
        model: { primary: "anthropic/claude-opus-4-6" }
      }
    ]
  },
  bindings: [
    { agentId: "home", match: { channel: "whatsapp", accountId: "personal" } },
    { agentId: "work", match: { channel: "whatsapp", accountId: "biz" } }
  ]
}
```

---

## 十三、配置编辑方式

四种方式修改配置，选最顺手的：

| 方式 | 命令 / 操作 | 适合 |
|------|------------|------|
| 交互式向导 | `openclaw onboard` 或 `openclaw configure` | 初次配置 |
| CLI 命令 | `openclaw config set/get/unset` | 改单个值 |
| Web 控制台 | 打开 `http://127.0.0.1:18789` → Config 标签 | 可视化操作 |
| 直接编辑文件 | 编辑 `~/.openclaw/openclaw.json` | 批量修改 |

```bash
# CLI 示例
openclaw config get agents.defaults.workspace      # 读取
openclaw config set agents.defaults.heartbeat.every "2h"  # 设置
openclaw config unset tools.web.search.apiKey       # 删除
openclaw config file                                # 查看路径
openclaw config validate                            # 验证是否合法
```

> 直接编辑文件后，网关会自动检测变化并应用（取决于[热重载模式](#三、网关配置)）。

---

## 十四、注意事项

### 严格验证

OpenClaw 只接受完全匹配 schema 的配置。写错字段名、值类型不对、多了未知的键——网关都会**拒绝启动**。

遇到启动失败时：
1. 运行 `openclaw doctor` 查看具体哪里出错
2. 运行 `openclaw doctor --fix` 自动修复
3. 此时只有诊断命令可用：`openclaw doctor`、`openclaw logs`、`openclaw health`、`openclaw status`

### 热重载范围

改了配置不一定要重启。大部分配置改了立刻生效，只有网关核心参数需要重启：

| 不用重启（热生效） | 需要重启 |
|-------------------|---------|
| 渠道 `channels.*` | 网关端口、绑定、认证 `gateway.*` |
| Agent / 模型 `agents.*` `models.*` | 插件 `plugins` |
| 定时任务 `cron` / Webhook `hooks` | 服务发现 `discovery` |
| 会话 / 消息 / 工具 / 技能 / 日志 | — |

> 例外：`gateway.reload` 和 `gateway.remote` 改动不触发重启。

---

**提示**：本配置详解基于 OpenClaw 官方文档整理。配置项可能随版本更新，完整参考请访问 [OpenClaw Configuration](https://docs.openclaw.ai/gateway/configuration)。
