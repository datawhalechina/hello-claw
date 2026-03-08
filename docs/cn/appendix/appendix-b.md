# 附录 B：配置文件详解

OpenClaw 的配置系统灵活而强大，本附录基于官方文档详细解析各个配置项。

> 参考来源：[OpenClaw Configuration](https://docs.openclaw.ai/gateway/configuration)

## 配置文件位置

OpenClaw 读取可选的 JSON5 配置文件：

```
~/.openclaw/openclaw.json          # 主配置文件
~/.openclaw/.env                   # 环境变量文件
```

如果配置文件不存在，OpenClaw 使用安全默认值。

## 配置文件结构概览

```json5
{
  agents: { ... },           // Agent 配置
  channels: { ... },         // 渠道配置
  gateway: { ... },          // 网关配置
  session: { ... },          // 会话配置
  messages: { ... },         // 消息配置
  tools: { ... },            // 工具配置
  skills: { ... },           // 技能配置
  cron: { ... },             // 定时任务配置
  hooks: { ... },            // Webhook 配置
  bindings: [...],           // 绑定规则
  env: { ... },              // 环境变量
}
```

---

## 一、Agent 配置（agents）

### 1.1 默认配置（agents.defaults）

```json5
{
  agents: {
    defaults: {
      // 工作空间路径
      workspace: "~/.openclaw/workspace",
      
      // 模型配置
      model: {
        primary: "anthropic/claude-sonnet-4-5",
        fallbacks: ["openai/gpt-5.2"]
      },
      
      // 模型目录（用于 /model 命令）
      models: {
        "anthropic/claude-sonnet-4-5": {
          alias: "Sonnet"
        },
        "openai/gpt-5.2": {
          alias: "GPT"
        }
      },
      
      // 图片最大尺寸（像素）
      imageMaxDimensionPx: 1200,
      
      // 心跳配置
      heartbeat: {
        every: "30m",        // 30分钟、2小时等
        target: "last",      // last | whatsapp | telegram | discord | none
        directPolicy: "allow" // allow | block
      },
      
      // 沙盒配置
      sandbox: {
        mode: "non-main",    // off | non-main | all
        scope: "agent"       // session | agent | shared
      },
      
      // 工具配置
      tools: {
        enabled: true,
        profile: "full"
      }
    }
  }
}
```

**配置项说明：**

| 配置项 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `workspace` | string | ~/.openclaw/workspace | Agent 工作目录 |
| `model.primary` | string | - | 主模型，格式：provider/model |
| `model.fallbacks` | array | [] | 回退模型列表 |
| `imageMaxDimensionPx` | number | 1200 | 图片转录/工具图片缩放尺寸 |
| `heartbeat.every` | string | - | 心跳间隔（如 30m, 2h） |
| `sandbox.mode` | string | off | 沙盒模式 |

### 1.2 多 Agent 配置（agents.list）

```json5
{
  agents: {
    list: [
      {
        id: "home",
        default: true,
        workspace: "~/.openclaw/workspace-home",
        groupChat: {
          mentionPatterns: ["@openclaw", "openclaw"]
        }
      },
      {
        id: "work",
        workspace: "~/.openclaw/workspace-work",
        model: {
          primary: "anthropic/claude-opus-4-6"
        }
      }
    ]
  }
}
```

---

## 二、渠道配置（channels）

### 2.1 通用 DM 策略配置

所有渠道共享相同的 DM 策略模式：

```json5
{
  channels: {
    telegram: {
      enabled: true,
      botToken: "123:abc",
      dmPolicy: "pairing",      // pairing | allowlist | open | disabled
      allowFrom: ["tg:123"],    // 仅用于 allowlist/open
    },
    
    whatsapp: {
      enabled: true,
      allowFrom: ["+15555550123"],
      groups: {
        "*": {
          requireMention: true
        }
      }
    },
    
    discord: {
      enabled: true,
      botToken: "${DISCORD_BOT_TOKEN}",
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

| 策略 | 说明 |
|------|------|
| `pairing` | 未知发送者收到一次性配对码，需要批准 |
| `allowlist` | 仅 allowFrom 中的发送者 |
| `open` | 允许所有入站 DM（需要 allowFrom: ["*"]） |
| `disabled` | 忽略所有 DM |

### 2.2 群聊提及门控

```json5
{
  agents: {
    list: [
      {
        id: "main",
        groupChat: {
          mentionPatterns: ["@openclaw", "openclaw"]
        }
      }
    ]
  },
  
  channels: {
    whatsapp: {
      groups: {
        "*": {
          requireMention: true
        }
      }
    }
  }
}
```

---

## 三、网关配置（gateway）

```json5
{
  gateway: {
    port: 18789,
    bind: "loopback",           // loopback | lan | tailnet | auto | custom
    auth: {
      mode: "token",            // token | password
      token: "${OPENCLAW_GATEWAY_TOKEN}",
      password: "${OPENCLAW_GATEWAY_PASSWORD}",
      allowTailscale: true
    },
    tailscale: {
      mode: "off",              // off | serve | funnel
      resetOnExit: false
    },
    reload: {
      mode: "hybrid",           // hybrid | hot | restart | off
      debounceMs: 300
    }
  }
}
```

**绑定地址选项：**

| 值 | 说明 |
|----|------|
| `loopback` | 仅本地访问（127.0.0.1） |
| `lan` | 局域网可访问 |
| `tailnet` | Tailscale 网络 |
| `auto` | 自动检测 |
| `custom` | 自定义地址 |

**热重载模式：**

| 模式 | 行为 |
|------|------|
| `hybrid` | 热应用安全更改，自动重启关键更改（默认） |
| `hot` | 仅热应用安全更改，需要重启时记录警告 |
| `restart` | 任何配置更改都重启网关 |
| `off` | 禁用文件监视 |

---

## 四、会话配置（session）

```json5
{
  session: {
    dmScope: "per-channel-peer",  // main | per-peer | per-channel-peer | per-account-channel-peer
    
    threadBindings: {
      enabled: true,
      idleHours: 24,
      maxAgeHours: 0
    },
    
    reset: {
      mode: "daily",            // daily | idle | manual
      atHour: 4,
      idleMinutes: 120
    }
  }
}
```

**DM 范围选项：**

| 值 | 说明 |
|----|------|
| `main` | 共享会话 |
| `per-peer` | 每个对等方独立会话 |
| `per-channel-peer` | 每个渠道-对等方独立会话（推荐多用户） |
| `per-account-channel-peer` | 每个账户-渠道-对等方独立会话 |

---

## 五、消息配置（messages）

```json5
{
  messages: {
    groupChat: {
      mentionPatterns: ["@openclaw"]
    }
  }
}
```

---

## 六、工具配置（tools）

```json5
{
  tools: {
    profile: "full",              // messaging | default | coding | full | all
    enabled: true,
    web: {
      search: {
        apiKey: "${BRAVE_API_KEY}"
      }
    }
  }
}
```

**工具配置文件：**

| Profile | 说明 |
|---------|------|
| `messaging` | 仅聊天，无工具 |
| `default` | 基础工具集 |
| `coding` | 编程工具集 |
| `full` | 完整工具集 |
| `all` | 所有工具 |

---

## 七、技能配置（skills）

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

---

## 八、定时任务配置（cron）

```json5
{
  cron: {
    enabled: true,
    maxConcurrentRuns: 2,
    sessionRetention: "24h",
    runLog: {
      maxBytes: "2mb",
      keepLines: 2000
    }
  }
}
```

---

## 九、Webhook 配置（hooks）

```json5
{
  hooks: {
    enabled: true,
    token: "shared-secret",
    path: "/hooks",
    defaultSessionKey: "hook:ingress",
    allowRequestSessionKey: false,
    allowedSessionKeyPrefixes: ["hook:"],
    mappings: [
      {
        match: {
          path: "gmail"
        },
        action: "agent",
        agentId: "main",
        deliver: true
      }
    ]
  }
}
```

---

## 十、绑定配置（bindings）

```json5
{
  bindings: [
    {
      agentId: "home",
      match: {
        channel: "whatsapp",
        accountId: "personal"
      }
    },
    {
      agentId: "work",
      match: {
        channel: "whatsapp",
        accountId: "biz"
      }
    }
  ]
}
```

---

## 十一、环境变量配置（env）

```json5
{
  env: {
    OPENROUTER_API_KEY: "sk-or-...",
    vars: {
      GROQ_API_KEY: "gsk-..."
    },
    shellEnv: {
      enabled: true,
      timeoutMs: 15000
    }
  }
}
```

**环境变量来源（按优先级）：**

1. 父进程环境变量
2. 当前工作目录的 `.env` 文件
3. `~/.openclaw/.env` 文件（全局回退）

都不覆盖已存在的环境变量。

---

## 十二、配置分割（$include）

使用 `$include` 组织大型配置：

```json5
// ~/.openclaw/openclaw.json
{
  gateway: {
    port: 18789
  },
  agents: {
    $include: "./agents.json5"
  },
  broadcast: {
    $include: [
      "./clients/a.json5",
      "./clients/b.json5"
    ]
  }
}
```

**规则：**
- 单文件：替换包含的对象
- 文件数组：按顺序深度合并（后面的优先）
- 同级键：在 include 后合并（覆盖包含的值）
- 嵌套 include：支持最多 10 层深度
- 相对路径：相对于包含文件解析

---

## 十三、环境变量替换

在配置字符串值中引用环境变量：

```json5
{
  gateway: {
    auth: {
      token: "${OPENCLAW_GATEWAY_TOKEN}"
    }
  },
  models: {
    providers: {
      custom: {
        apiKey: "${CUSTOM_API_KEY}"
      }
    }
  }
}
```

**规则：**
- 仅匹配大写名称：`[A-Z_][A-Z0-9_]*`
- 缺失/空变量在加载时抛出错误
- 使用 `$${VAR}` 转义为字面量输出
- 在 `$include` 文件中同样有效
- 内联替换：`"${BASE}/v1"` → `"https://api.example.com/v1"`

---

## 十四、SecretRef 凭证

支持 SecretRef 对象的字段：

```json5
{
  models: {
    providers: {
      openai: {
        apiKey: {
          source: "env",
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
          source: "file",
          provider: "filemain",
          id: "/skills/entries/nano-banana-pro/apiKey"
        }
      }
    }
  },
  
  channels: {
    googlechat: {
      serviceAccountRef: {
        source: "exec",
        provider: "vault",
        id: "channels/googlechat/serviceAccount"
      }
    }
  }
}
```

**source 类型：**
- `env`：环境变量
- `file`：文件内容
- `exec`：命令执行输出

---

## 十五、完整配置示例

### 15.1 最小配置

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

### 15.2 本地开发配置

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

### 15.3 服务器部署配置

```json5
{
  agents: {
    defaults: {
      workspace: "~/.openclaw/workspace",
      model: {
        primary: "anthropic/claude-sonnet-4-5",
        fallbacks: ["openai/gpt-5.2"]
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
    bind: "lan",
    auth: {
      mode: "password",
      password: "${GATEWAY_PASSWORD}"
    }
  },
  
  session: {
    dmScope: "per-channel-peer"
  }
}
```

### 15.4 多 Agent 配置

```json5
{
  agents: {
    defaults: {
      model: {
        primary: "anthropic/claude-sonnet-4-5"
      }
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
        model: {
          primary: "anthropic/claude-opus-4-6"
        }
      }
    ]
  },
  
  bindings: [
    {
      agentId: "home",
      match: {
        channel: "whatsapp",
        accountId: "personal"
      }
    },
    {
      agentId: "work",
      match: {
        channel: "whatsapp",
        accountId: "biz"
      }
    }
  ]
}
```

---

## 十六、配置编辑方式

### 交互式向导

```bash
openclaw onboard          # 完整设置向导
openclaw configure        # 配置向导
```

### CLI 命令

```bash
openclaw config get agents.defaults.workspace
openclaw config set agents.defaults.heartbeat.every "2h"
openclaw config unset tools.web.search.apiKey
openclaw config file      # 查看配置文件路径
openclaw config validate  # 验证配置
```

### Web 控制台

打开 `http://127.0.0.1:18789`，使用 Config 标签页。

### 直接编辑

直接编辑 `~/.openclaw/openclaw.json`，网关会自动应用更改。

---

## 十七、严格验证

OpenClaw 只接受完全匹配 schema 的配置。未知键、格式错误的类型或无效值会导致网关**拒绝启动**。

验证失败时：
- 网关不会启动
- 只有诊断命令可用（`openclaw doctor`, `openclaw logs`, `openclaw health`, `openclaw status`）
- 运行 `openclaw doctor` 查看具体问题
- 运行 `openclaw doctor --fix` 应用修复

---

## 十八、热重载说明

### 支持热应用的配置

| 类别 | 字段 | 需要重启？ |
|------|------|------------|
| 渠道 | `channels.*` | 否 |
| Agent & 模型 | `agent`, `agents`, `models`, `routing` | 否 |
| 自动化 | `hooks`, `cron`, `agent.heartbeat` | 否 |
| 会话 & 消息 | `session`, `messages` | 否 |
| 工具 & 媒体 | `tools`, `browser`, `skills`, `audio`, `talk` | 否 |
| UI & 其他 | `ui`, `logging`, `identity`, `bindings` | 否 |

### 需要重启的配置

| 类别 | 字段 |
|------|------|
| 网关服务器 | `gateway.*`（端口、绑定、认证、Tailscale、TLS、HTTP） |
| 基础设施 | `discovery`, `canvasHost`, `plugins` |

例外：`gateway.reload` 和 `gateway.remote` 更改不会触发重启。

---

**提示**：本配置详解基于 OpenClaw 官方文档整理，完整参考请访问 [docs.openclaw.ai/gateway/configuration](https://docs.openclaw.ai/gateway/configuration)。
