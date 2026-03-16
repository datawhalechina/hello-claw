---
prev:
  text: '附录 C：类 Claw 方案对比与选型'
  link: '/cn/appendix/appendix-c'
next:
  text: '附录 E：模型提供商选型指南'
  link: '/cn/appendix/appendix-e'
---

# 附录 D：技能开发与发布指南

OpenClaw 的技能（Skill）系统是其核心扩展机制——通过编写一个 `SKILL.md` 文件，你就能让 AI Agent 学会新能力。本附录从零讲解技能的结构、开发流程和发布方式。

> **推荐工具**：Anthropic 官方出品的 [skill-creator](https://github.com/anthropics/skills/tree/main/skills/skill-creator) 是目前最成熟的技能开发辅助工具，本附录以它为主线。

---

## 一、技能是什么？

### Skills vs Tools

先分清两个概念：

| | Tools（工具） | Skills（技能） |
|---|---|---|
| **比喻** | 手脚和权限开关 | 小程序 / 插件 |
| **作用** | 决定 Agent 能不能做某类动作 | 给 Agent 增加特定能力 |
| **例子** | 文件读写、Shell 执行、网络请求 | 网络搜索、天气查询、代码审查 |

简单说：Tools 是"能力通道"，Skills 是"装进通道里的具体能力"。

### 技能三级加载

OpenClaw 按优先级从高到低加载技能：

| 优先级 | 类型 | 位置 | 说明 |
|:---:|------|------|------|
| 1 | 工作空间技能 | `~/.openclaw/workspace/skills/` | 当前工作空间专属，优先级最高 |
| 2 | 托管技能 | `~/.openclaw/skills/` | 通过 ClawHub 安装的共享技能 |
| 3 | 内置技能 | 随 OpenClaw 安装 | 官方捆绑，优先级最低 |

同名技能按优先级覆盖，采用懒加载策略（用到时才读取 SKILL.md 正文）。

---

## 二、技能的结构

每个技能是一个文件夹，核心是 `SKILL.md`：

```
my-skill/
├── SKILL.md           # 必需：技能定义文件（YAML frontmatter + Markdown 指令）
├── scripts/           # 可选：可执行脚本（搜索、API 调用等）
├── references/        # 可选：参考文档（按需加载，不占常驻上下文）
└── assets/            # 可选：模板、图标等静态资源
```

### SKILL.md 格式

`SKILL.md` 由两部分组成：**YAML frontmatter**（元数据）+ **Markdown 正文**（指令）。

````markdown
---
name: my-skill
description: 技能描述（最重要的字段——AI 根据它决定何时调用此技能）
user-invocable: true
disable-model-invocation: false
metadata:
  openclaw:
    requires:
      env:
        - MY_API_KEY
      bins:
        - node
---

# 技能指令

这里用 Markdown 写清楚 AI 应该怎么使用这个技能。

可以用 `{baseDir}` 引用技能所在目录，OpenClaw 运行时会自动替换为实际路径。
````

### Frontmatter 字段说明

| 字段 | 必填 | 说明 |
|------|:---:|------|
| `name` | 是 | 技能标识符，小写字母 + 连字符（如 `my-awesome-skill`） |
| `description` | 是 | **决定 AI 何时调用此技能**——写清楚"做什么"和"什么时候用" |
| `user-invocable` | 否 | 是否可通过斜杠命令手动调用（默认 `true`） |
| `disable-model-invocation` | 否 | 设为 `true` 则 AI 不会自动触发，只能手动调用（默认 `false`） |
| `homepage` | 否 | 技能或服务的官网链接 |
| `metadata.openclaw.requires.env` | 否 | 需要的环境变量（未设置时技能标记为"不可用"） |
| `metadata.openclaw.requires.bins` | 否 | 需要的系统命令（如 `node`、`python`、`curl`） |
| `metadata.openclaw.requires.config` | 否 | 需要的配置路径 |

### 三级加载机制

技能内容按需逐级加载，节省上下文窗口：

| 级别 | 内容 | 何时加载 | 建议大小 |
|:---:|------|---------|---------|
| 1 | `name` + `description` | 始终在上下文中 | ~100 词 |
| 2 | SKILL.md 正文 | 技能被触发时 | <500 行 |
| 3 | `references/` 中的文件 | 正文中指示读取时 | 不限 |

> **写作建议**：SKILL.md 正文控制在 500 行以内。如果内容较多，将详细文档放到 `references/` 目录，在正文中用"如需了解 X，请读取 `{baseDir}/references/x.md`"指引。

---

## 三、开发技能（推荐方式：skill-creator）

[skill-creator](https://github.com/anthropics/skills/tree/main/skills/skill-creator) 是 Anthropic 官方出品的技能开发辅助工具，它能引导你完成从构思到测试的完整流程。

> 本教程已将 skill-creator 的完整源码收录在 `docs/cn/appendix/skill-creator/` 目录，供离线参考。

### 安装 skill-creator

skill-creator 本身就是一个 OpenClaw 技能，安装方式与其他技能一致：

```bash
# 方式一：通过 ClawHub 安装（推荐）
clawhub install skill-creator

# 方式二：手动安装到工作空间
# 将 skill-creator 文件夹复制到：
# ~/.openclaw/workspace/skills/skill-creator/
```

安装后，skill-creator 会自动出现在 OpenClaw 的可用技能列表中：

```bash
openclaw skills list | grep skill-creator
```

### 使用流程

skill-creator 采用**对话式开发**——你只需要在聊天中描述想要的技能，它会引导你完成全部步骤：

**第一步：描述意图**

在 OpenClaw 聊天界面中，直接告诉 Agent 你想做什么：

```
帮我创建一个天气查询技能
```

或者更具体地：

```
我想做一个技能，用户问天气时自动调用和风天气 API 返回实时天气
```

skill-creator 会通过几个问题帮你明确需求：
- 这个技能让 Agent 做什么？
- 什么时候应该触发？（用户说什么话时）
- 输出是什么格式？
- 需要测试用例吗？

**第二步：自动生成 SKILL.md**

skill-creator 根据你的回答自动生成完整的 SKILL.md，包括：
- frontmatter 元数据（name、description、依赖声明）
- Markdown 指令正文
- 需要的脚本文件（如 API 调用脚本）

**第三步：测试与迭代**

skill-creator 会生成 2-3 个测试用例，模拟真实用户的对话场景，然后：

1. 用你的技能运行这些测试
2. 展示测试结果供你审阅
3. 根据你的反馈改进技能
4. 重复，直到你满意为止

<details>
<summary>skill-creator 的完整目录结构</summary>

```
skill-creator/
├── SKILL.md              # 技能定义（核心指令，约 480 行）
├── LICENSE.txt            # Apache 2.0 许可证
├── agents/               # 专用子代理指令
│   ├── grader.md          # 评分代理：评估断言是否通过
│   ├── comparator.md      # 比较代理：盲测 A/B 对比
│   └── analyzer.md        # 分析代理：解读基准测试结果
├── scripts/              # 自动化脚本
│   ├── run_loop.py        # 描述优化主循环
│   ├── run_eval.py        # 触发率评估
│   ├── improve_description.py  # 描述改进
│   ├── aggregate_benchmark.py  # 基准汇总
│   ├── generate_report.py      # 报告生成
│   ├── package_skill.py        # 技能打包
│   └── quick_validate.py       # 快速校验
├── references/
│   └── schemas.md         # JSON 数据结构规范
├── assets/
│   └── eval_review.html   # 评测结果审阅界面模板
└── eval-viewer/
    └── generate_review.py # 可视化评测结果查看器
```

</details>

<details>
<summary>skill-creator 进阶功能</summary>

**描述优化（Description Optimization）**

`description` 字段是 AI 决定是否调用技能的唯一依据。skill-creator 内置了自动优化流程：

1. 生成 20 个测试查询（10 个应触发 + 10 个不应触发）
2. 在你审阅并确认后，运行优化循环
3. 自动将评测集拆分为 60% 训练 / 40% 测试
4. 每轮迭代最多运行 3 次以获取可靠触发率
5. 最终选择测试集得分最高（而非训练集）的描述，避免过拟合

**盲测对比（Blind Comparison）**

想严格比较两个版本的技能？skill-creator 支持将两个版本的输出交给独立代理盲评——它不知道哪个是新版、哪个是旧版，只根据质量打分。

**基准测试（Benchmarking）**

每轮迭代自动生成 `benchmark.json`，包含：
- 各断言的通过率
- 用时和 Token 消耗对比
- 均值 ± 标准差 + 变化量

</details>

### 手动开发（不使用 skill-creator）

如果你更喜欢手动操作，步骤如下：

1. **创建目录**
   ```bash
   mkdir -p ~/.openclaw/workspace/skills/my-skill
   ```

2. **编写 SKILL.md**（参照本附录第二节的格式）

3. **验证**
   ```bash
   openclaw skills check
   openclaw skills info my-skill
   ```

4. **测试**：在聊天中发送触发关键词，观察技能是否正常工作。

---

## 四、实战案例：tavily-search 技能

以 ClawHub 上的 [tavily-search](https://clawhub.ai/arun-8687/tavily-search)（v1.0.0）为例，看一个真实技能的完整结构。这是一个通过 [Tavily API](https://tavily.com) 为 AI Agent 提供网络搜索能力的技能。

### 目录结构

```
tavily-search-1.0.0/
├── SKILL.md           # 技能定义（frontmatter + 使用说明）
├── _meta.json         # ClawHub 发布元数据
└── scripts/
    ├── search.mjs     # 网络搜索实现
    └── extract.mjs    # 网页内容提取实现
```

### SKILL.md 内容

```markdown
---
name: tavily
description: AI-optimized web search via Tavily API. Returns concise, relevant results for AI agents.
homepage: https://tavily.com
metadata: {"clawdbot":{"emoji":"...","requires":{"bins":["node"],"env":["TAVILY_API_KEY"]},"primaryEnv":"TAVILY_API_KEY"}}
---

# Tavily Search

AI-optimized web search using Tavily API. Designed for AI agents - returns clean, relevant content.

## Search

​```bash
node {baseDir}/scripts/search.mjs "query"
node {baseDir}/scripts/search.mjs "query" -n 10
node {baseDir}/scripts/search.mjs "query" --deep
node {baseDir}/scripts/search.mjs "query" --topic news
​```

## Options

- `-n <count>`: Number of results (default: 5, max: 20)
- `--deep`: Use advanced search for deeper research (slower, more comprehensive)
- `--topic <topic>`: Search topic - `general` (default) or `news`
- `--days <n>`: For news topic, limit to last n days

## Extract content from URL

​```bash
node {baseDir}/scripts/extract.mjs "https://example.com/article"
​```

Notes:
- Needs `TAVILY_API_KEY` from https://tavily.com
- Use `--deep` for complex research questions
- Use `--topic news` for current events
```

### 设计要点解读

**Frontmatter 设计**

| 字段 | 值 | 作用 |
|------|---|------|
| `name` | `tavily` | 安装后的技能标识符 |
| `description` | `AI-optimized web search...` | AI 根据这段描述判断何时调用——写清楚"做什么"是关键 |
| `homepage` | `https://tavily.com` | 方便用户注册获取 API Key |
| `metadata.requires.bins` | `["node"]` | 声明需要 Node.js，加载时自动检查 |
| `metadata.requires.env` | `["TAVILY_API_KEY"]` | 未设置时技能标记为"不可用"而非崩溃 |
| `metadata.primaryEnv` | `TAVILY_API_KEY` | 告诉配置向导该提示用户填哪个 Key |

**脚本设计模式**

`search.mjs` 核心逻辑（约 100 行）：

```javascript
// 1. 读取环境变量中的 API Key
const apiKey = (process.env.TAVILY_API_KEY ?? "").trim();
if (!apiKey) { console.error("Missing TAVILY_API_KEY"); process.exit(1); }

// 2. 调用 Tavily API
const resp = await fetch("https://api.tavily.com/search", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ api_key: apiKey, query, search_depth: searchDepth, ... }),
});

// 3. 格式化输出为 Markdown（AI 友好格式）
if (data.answer) console.log("## Answer\n" + data.answer);
for (const r of results) {
  console.log(`- **${r.title}** (relevance: ${(r.score * 100).toFixed(0)}%)`);
  console.log(`  ${r.url}`);
}
```

四条关键原则：

| 原则 | 做法 | 原因 |
|------|------|------|
| 输出 Markdown | `console.log("## Answer\n" + ...)` | AI Agent 能直接解析结构化结果 |
| 参数校验前置 | 缺 Key 时 `process.exit(1)` | 让 OpenClaw 捕获并提示用户，而非抛异常 |
| 结果截断 | `content.slice(0, 300)` | 避免输出过长占满上下文窗口 |
| `{baseDir}` 变量 | SKILL.md 中引用脚本路径 | 运行时自动替换为实际路径，无需硬编码 |

**配置方式**

安装后设置 API Key 即可使用：

```bash
# 设置环境变量（推荐写入 ~/.openclaw/.env）
echo 'TAVILY_API_KEY=tvly-你的密钥' >> ~/.openclaw/.env
```

安装时技能默认启用。如需手动管理，使用 `openclaw skills list` 查看状态。

---

## 五、发布到 ClawHub

技能开发完成后，你可以将它发布到 [ClawHub](https://clawhub.ai) 社区，让全世界的 OpenClaw 用户都能安装使用。

### 发布前准备

确保你的技能文件夹结构完整：

```
my-skill/
├── SKILL.md           # 必需：包含完整的 frontmatter 和指令
├── scripts/           # 可选：脚本文件
└── ...                # 其他辅助文件（纯文本）
```

> **注意**：ClawHub 只接受包含 `SKILL.md` 和纯文本文件的文件夹。二进制文件、图片等不支持上传。

### 发布步骤

**1. 登录 ClawHub**

访问 [clawhub.ai](https://clawhub.ai)，使用 GitHub 账号登录。

**2. 进入发布页面**

点击页面顶部的 **"Publish"** 按钮，进入技能发布界面：

![ClawHub 技能发布界面](./images/clawhub-publish-skill.png)

**3. 填写发布信息**

| 字段 | 说明 | 示例 |
|------|------|------|
| **Slug** | 技能的 URL 标识符（小写字母 + 连字符） | `hello-claw` |
| **Display name** | 技能显示名称 | `Hello Claw` |
| **Version** | 版本号，遵循 [语义化版本](https://semver.org/lang/zh-CN/)（SemVer） | `1.0.0` |
| **Tags** | 版本标签，默认 `latest` | `latest` |

**4. 上传技能文件夹**

将包含 `SKILL.md` 的文件夹拖拽到 **"Drop a folder"** 区域，或点击 **"Choose folder"** 手动选择。

上传后，页面右侧会显示检测到的 `SKILL.md` 文件。系统会自动去除外层包裹目录——你只需确保文件夹内有 `SKILL.md` 即可。

**5. 自动校验（Validation）**

ClawHub 会自动检查技能是否符合社区规则：

- `SKILL.md` 是否存在且格式正确
- frontmatter 是否包含必需的 `name` 和 `description`
- 文件是否为纯文本

校验通过后会显示 **"All checks passed"**。

**6. 确认许可证（License）**

默认许可证为 **MIT-0**（MIT No Attribution）：

> 允许任何人免费使用、修改和重新分发，无需署名。

勾选 **"I have the rights to this skill and agree to publish it under MIT-0"** 确认。

> **提示**：MIT-0 是目前最宽松的开源许可证之一，适合社区共享。如果你的技能包含专有内容，请在发布前确认许可证兼容性。

**7. 填写 Changelog（可选）**

简要描述这个版本的内容，例如：

```
Initial release of "Hello Claw Skill" - comprehensive skill mastery framework for OpenClaw ecosystem.
```

**8. 发布**

确认无误后，点击右下角的 **"Publish skill"** 按钮。发布成功后，其他用户即可通过以下命令安装：

```bash
clawhub install 你的用户名/my-skill
```

### 更新已发布的技能

修改技能后，只需递增版本号并重新上传：

1. 更新 SKILL.md 中的内容
2. 在发布页面填写新版本号（如 `1.0.0` → `1.1.0`）
3. 上传更新后的文件夹
4. 填写 Changelog 说明变更内容
5. 点击 Publish

用户可通过 `clawhub update` 获取最新版本。

---

## 六、技能管理

### CLI 命令

```bash
# 查看所有可用技能
openclaw skills list

# 仅显示就绪的技能
openclaw skills list --eligible

# 显示详细信息（包括缺失的依赖）
openclaw skills list -v

# 查看某个技能的详情
openclaw skills info <skill-name>

# 检查所有技能状态
openclaw skills check
```

### 通过 ClawHub 安装技能

```bash
# 搜索技能
clawhub search <关键词>

# 安装技能
clawhub install <技能名>

# 查看已安装的技能
clawhub list

# 更新技能
clawhub update <技能名>
clawhub update --all

# 卸载技能
clawhub uninstall <技能名>
```

> ClawHub CLI 的完整用法详见附录 A。

### 在配置中启用技能

通过 ClawHub 安装的技能默认启用。如需手动管理技能状态：

```bash
openclaw skills list              # 查看所有技能及状态
openclaw skills info <skill-name> # 查看某个技能的详情
```

如需在配置文件中精细控制技能启用/禁用，详见[附录 G 配置文件详解](/cn/appendix/appendix-g)。

### 配置凭证（SecretRef）

需要 API Key 的技能，推荐使用环境变量或 SecretRef 安全存储：

```bash
# 方式一：环境变量（最常用）
echo 'TAVILY_API_KEY=tvly-你的密钥' >> ~/.openclaw/.env

# 方式二：交互式配置 SecretRef
openclaw secrets configure

# 方式三：检查密钥状态
openclaw secrets audit --check
```

支持的 SecretRef `source` 类型：

| source | 说明 | 适用场景 |
|--------|------|---------|
| `env` | 从环境变量读取 | 最常用，适合本地开发 |
| `file` | 从文件读取 | 适合多人共享服务器 |
| `exec` | 从命令执行结果读取 | 适合集成密钥管理系统 |

---

## 七、插件开发

对于比技能更复杂的扩展需求（如自定义 Transport、新增 Tool 类型），可以开发插件：

```bash
# 列出已安装插件
openclaw plugins list

# 安装插件
openclaw plugins install <path|.tgz|npm-spec>

# 启用/禁用插件
openclaw plugins enable <id>
openclaw plugins disable <id>

# 插件诊断
openclaw plugins doctor
```

---

## 八、故障排查

### 技能无法加载

```bash
# 检查技能状态（会显示缺失的依赖）
openclaw skills check

# 查看详细信息
openclaw skills info <skill-name> -v

# 查看网关日志
openclaw logs --follow
```

常见原因：
- 缺少环境变量（`metadata.requires.env` 中声明的变量未设置）
- 缺少系统命令（`metadata.requires.bins` 中声明的命令未安装）
- SKILL.md 格式错误（frontmatter 缺少 `name` 或 `description`）

### 技能不触发

- 检查 `description` 是否准确描述了触发场景
- 确认 `disable-model-invocation` 未设为 `true`
- 尝试在描述中增加触发关键词（skill-creator 的描述优化功能可以帮助解决这个问题）

### 技能权限问题

确保技能目录有正确的读取权限：

```bash
# macOS / Linux
chmod -R 755 ~/.openclaw/workspace/skills/my-skill/
```

---

## 九、开发清单

开发技能前，用这份清单逐项确认：

- [ ] SKILL.md frontmatter 包含 `name` 和 `description`
- [ ] `description` 清晰描述触发条件和能力（AI 靠这个决定何时调用）
- [ ] 环境变量需求在 `metadata.requires.env` 中声明
- [ ] 系统命令依赖在 `metadata.requires.bins` 中声明
- [ ] 脚本输出 Markdown 格式（对 AI 友好）
- [ ] 敏感信息使用环境变量或 SecretRef，不硬编码
- [ ] 错误处理完善（缺少 Key 时 `exit(1)`，API 失败时输出清晰错误）
- [ ] 本地测试通过（`openclaw skills check` + 实际对话测试）
- [ ] 准备发布时：文件夹只含 SKILL.md 和纯文本文件
