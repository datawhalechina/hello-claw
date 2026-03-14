# 第十三章 Skill 编写

如果说第十二章讲的是“通过配置开关定制 OpenClaw”，那么这一章讲的就是另一条更常用的路：**不改核心代码，也不碰渠道适配层，而是把一项新能力封装成 Skill**。

这是 OpenClaw 很实用的一层定制接口。你不用先吃透整个 Gateway，也能把提示词、工具调用、外部脚本、依赖门禁和 Slash Command 串成一条完整链路。

本章我们只回答三个问题：

- 一个 Skill 到底由哪些文件组成？
- `SKILL.md` 的 Frontmatter 应该怎么写，哪些字段是 OpenClaw 真的会解析的？
- 当 Skill 需要调用脚本、跑长任务、处理失败和调试排错时，应该怎么组织？

---

## 1. 先把边界说清楚：Skill 不是“插件代码”，而是“能力说明书 + 执行约束”

很多人第一次接触 Skill，会误以为它和浏览器插件、VS Code 插件差不多，写一个入口函数，框架自动调用。OpenClaw 不是这个思路。

在 OpenClaw 里，Skill 的第一身份是一个**给模型阅读的能力说明书**。系统提示词里只会注入一个精简后的 Skill 列表，包含名称、描述和文件路径；当模型判断某项任务需要某个 Skill 时，才会进一步用 `read` 去加载对应的 `SKILL.md`。

这意味着 Skill 的工作机制有两个阶段：

1. **被发现**：OpenClaw 扫描技能目录，解析 `SKILL.md` 的元数据，决定这个 Skill 是否“可见”。
2. **被执行**：模型读取 Skill 内容后，按其中的流程去调用 `bash`、`read`、`write`、`browser`、`nodes` 等工具，或者通过 Slash Command 直达某个工具。

所以，Skill 更像一份“可执行工作手册”：

- `SKILL.md` 负责告诉模型“什么时候用我、按什么顺序做、哪些坑不能踩”。
- `impl/`、`scripts/`、`references/` 这些目录则承载真正的实现细节。
- OpenClaw 自己负责做加载、筛选、缓存、热更新和命令暴露。

理解这个边界很重要。后面你会发现，所谓“Skill 的异步处理”，本质上并不是在 `SKILL.md` 里写 `async/await`，而是把耗时工作拆给外部脚本或工具，再由 Agent 循环把它们串起来。

---

## 2. 一个可维护的 Skill 目录应该长什么样

按 Agent Skills 的约定，一个 Skill 本质上就是一个目录，里面必须有 `SKILL.md`。除此之外，你可以按任务复杂度追加实现文件、参考资料和模板资源。

一个比较实用的目录结构通常是这样：

```text
~/.openclaw/workspace/
└── skills/
    └── weekly-report/
        ├── SKILL.md
        ├── impl/
        │   ├── collect.mjs
        │   └── render.mjs
        ├── references/
        │   └── report-style.md
        └── assets/
            └── report-template.md
```

这几个部分的职责建议分清：

- `SKILL.md`：唯一必需文件。定义元数据、适用场景、执行流程、质量标准和失败处理原则。
- `impl/`：推荐放真正要执行的脚本，比如 `node`、`python`、`uv`、`bash` 封装器。目录名不是强制的，但 `impl/` 语义最清楚。
- `references/`：放示例、格式规范、领域知识、接口注意事项，供 Skill 在运行时按需 `read`。
- `assets/`：放模板、静态样例、提示词片段、固定配置样板。

这里有一个容易忽略的点：**不要把所有实现细节都堆进 `SKILL.md`**。如果一段流程已经细到接近脚本了，就应该抽到 `impl/`；如果一段说明主要是示例和背景资料，就应该挪到 `references/`。否则 Skill 会越来越长，模型每次都要读取大量无关信息，既浪费上下文，也更容易走偏。

在 OpenClaw 里，Skill 会从多个位置被发现：

- 内置 Skills：随 OpenClaw 安装包一起分发
- 共享 Skills：`~/.openclaw/skills`
- 当前工作区 Skills：`<workspace>/skills`
- 额外目录：`skills.load.extraDirs`
- 兼容 `.agents/skills`：个人级和项目级目录也会被扫描

如果同名 Skill 同时存在，OpenClaw 会按优先级覆盖：

```text
extraDirs < bundled < ~/.openclaw/skills < ~/.agents/skills < <project>/.agents/skills < <workspace>/skills
```

这套优先级非常适合做“本地覆盖”。比如你想修一个官方 Skill 的提示词，不用直接改上游仓库，只要在自己的工作区里放一个同名 Skill，当前项目就会优先使用本地版本。

---

## 3. Frontmatter 是路由入口，不是装饰信息

### 3.1 最小可用格式

一个能被发现的 Skill，至少需要两项 Frontmatter：

```markdown
---
name: weekly_report
description: 汇总本周代码、Issue 和待办，生成一份中文周报
---
```

其中：

- `name` 是技能标识名，也是配置项和命令映射时最常用的 key
- `description` 是最重要的路由线索，模型能不能在合适的时候选中它，很大程度取决于这一句写得准不准

这里不要把 `description` 写成宣传文案。最好的写法通常是“任务对象 + 动作 + 边界条件”，例如：

- 好：`分析 Git 提交和 Issue 变更，生成简洁的中文周报`
- 差：`一个非常强大、专业、智能的自动化周报 Skill`

前者告诉模型它解决什么问题，后者只是在制造噪音。

### 3.2 OpenClaw 和通用 Agent Skills 规范的一个关键差异

OpenClaw 兼容 Agent Skills 的目录布局和使用方式，但它自己的 Frontmatter 解析**更严格**。实际写作时，你最好遵守这两个约束：

1. **普通字段尽量单行写完**
2. **`metadata` 用单行 JSON 对象表达**

也就是说，下面这种写法在 OpenClaw 里最稳：

```markdown
---
name: weekly_report
description: 汇总本周代码、Issue 和待办，生成一份中文周报
homepage: https://docs.openclaw.ai/tools/skills
metadata: { "openclaw": { "emoji": "📝", "requires": { "bins": ["node", "git"], "env": ["GITHUB_TOKEN"] }, "primaryEnv": "GITHUB_TOKEN" } }
---
```

如果你把 `metadata.openclaw` 展开成多行嵌套 YAML，Agent Skills 生态里有些实现能接受，但 OpenClaw 当前解析链路未必稳妥。这是写给教程读者时必须明确指出的“工程现实”。

### 3.3 最常用字段

下面这些字段是你在 OpenClaw 里最常碰到的：

| 字段 | 作用 | 实战建议 |
| ---- | ---- | ---- |
| `name` | Skill 名称 | 尽量稳定，不要频繁改名 |
| `description` | 技能描述 | 写成“任务描述”，不要写成广告语 |
| `homepage` | 文档主页 | 方便在 UI 和团队文档里追溯来源 |
| `metadata.openclaw.emoji` | UI 图标 | 纯展示字段，可选 |
| `metadata.openclaw.os` | 支持平台 | 限定 `darwin` / `linux` / `win32` |
| `metadata.openclaw.requires.bins` | 依赖二进制 | 例如 `["uv", "ffmpeg"]` |
| `metadata.openclaw.requires.anyBins` | 至少满足一个二进制 | 例如不同平台命令名不一致时使用 |
| `metadata.openclaw.requires.env` | 依赖环境变量 | 例如 `["GITHUB_TOKEN"]` |
| `metadata.openclaw.requires.config` | 依赖配置项 | 例如 `["browser.enabled"]` |
| `metadata.openclaw.primaryEnv` | 主环境变量 | 方便和 `skills.entries.<name>.apiKey` 配套 |
| `metadata.openclaw.install` | 安装方案 | 给 UI 提供 brew/node/go/uv/download 安装提示 |

这些字段共同决定的是：**这个 Skill 有没有资格出现在当前会话里**。

举个例子，如果你写了一个需要 `uv` 和 `JIRA_TOKEN` 的 Skill：

- `uv` 不在 `PATH` 里，Skill 会被判定为“不满足条件”
- `JIRA_TOKEN` 没有配置，Skill 也不会进入可用列表
- 如果你启用了沙箱，宿主机有 `uv` 还不够，容器里也得有

这就是为什么 Frontmatter 不是装饰信息，而是 OpenClaw 的**加载门禁**。

### 3.4 和用户命令相关的扩展字段

如果你希望 Skill 直接暴露成 Slash Command，还会碰到这些字段：

| 字段 | 作用 |
| ---- | ---- |
| `user-invocable` | 是否允许用户直接调用，默认 `true` |
| `disable-model-invocation` | 是否从模型提示词中隐藏，只保留手动调用 |
| `command-dispatch` | 命令派发模式，OpenClaw 目前支持 `tool` |
| `command-tool` | 直接派发到哪个工具 |
| `command-arg-mode` | 参数转发模式，默认 `raw` |

这类字段适合做两种事情：

- 把 Skill 变成明确的 `/xxx` 命令，减少模型判断成本
- 对高确定性任务绕过模型推理，直接把参数交给工具执行

例如“导出日志”“刷新缓存”“抓取日报”这类动作，如果步骤固定、输入结构清晰，就很适合走命令直达，而不是每次都让模型自由发挥。

---

## 4. 一个真实可运行的最小示例：创建 current-time Skill

上面讲了这么多概念，最好的办法还是自己动手写一个。

这里我们故意不选复杂场景，而是选一个最小但完整的例子：**创建一个“获取当前机器时间”的 Skill**。它的价值不在于功能有多强，而在于它足够短，能帮助你把“创建目录、编写 `SKILL.md`、让 OpenClaw 发现它、在对话里触发它”这一整套动作走一遍。

为了避免不同平台命令差异带来的干扰，下面这个最小示例先以 macOS / Linux 为主，直接调用 `date` 命令。

### 4.1 第一步：创建目录

先在当前工作区下创建一个 Skill 目录：

```bash
mkdir -p ~/.openclaw/workspace/skills/current-time
```

如果你当前项目已经有独立工作区，也可以把它放在：

```text
<workspace>/skills/current-time
```

只要最终目录里存在 `SKILL.md`，并且路径位于 OpenClaw 可扫描的位置即可。

### 4.2 第二步：编写最小版 `SKILL.md`

在 `current-time/` 目录下创建一个 `SKILL.md`：

```markdown
---
name: current-time
description: 获取当前机器的本地时间并用简洁中文返回
---

# Current Time

## 何时使用

- 用户询问“现在几点”“当前时间”“本机时间”
- 用户需要确认当前机器的本地时区时间

## 工作流程

1. 使用 `bash` 执行 `date "+%Y-%m-%d %H:%M:%S %Z"` 获取当前本机时间。
2. 如果命令执行失败，明确说明失败原因，不要编造时间。
3. 默认只返回简洁结果；除非用户追问，否则不要附带多余解释。

## 返回格式

- 使用中文回答，例如：`当前机器时间是 2026-03-10 14:30:25 CST。`
```

这个例子有意保持极简，你可以注意它只做了三件事：

- 用 `name` 和 `description` 让系统能发现并路由到它
- 用“何时使用”约束触发范围，避免模型乱用
- 用“工作流程”规定工具调用方式和失败行为

也就是说，哪怕没有 `impl/`、没有 `references/`，一个 Skill 依然可以成立。对于特别简单的任务，**只有 `SKILL.md` 也是完全合法的最小闭环**。

### 4.3 第三步：验证 OpenClaw 是否发现了它

写完之后，不要急着进对话测试，先用 CLI 做静态检查：

```bash
openclaw skills list
openclaw skills info current-time
openclaw skills check
```

你应该重点看三件事：

- `list` 里能不能看到 `current-time`
- `info` 里名称、描述、来源路径是否正确
- `check` 是否提示缺少依赖

这个例子只依赖 `bash` 和 `date`，在 macOS / Linux 上通常不会缺。但如果你的运行环境是极简容器，依然值得检查一次。

### 4.4 第四步：在真实对话里触发它

当 CLI 检查通过后，再去对话里试：

- “现在几点？”
- “帮我看一下当前机器时间”
- “当前系统时间和时区是什么？”

如果一切正常，OpenClaw 会读取 `current-time/SKILL.md`，执行 `date` 命令，然后返回当前机器时间。

如果你刚改完 Skill 却没有生效，优先尝试：

1. 开一个新会话
2. 让 Agent 执行一次“refresh skills”
3. 再重新提问

因为 OpenClaw 会对会话中的技能列表做快照，旧会话不一定立刻看到新文件。

### 4.5 第五步：把这个最小示例升级成“像样的” Skill

当 `current-time` 跑通以后，你就可以顺着这条路线一点点升级：

第一步升级：补 Frontmatter

- 加上 `homepage`
- 加上 `metadata.openclaw.emoji`
- 需要时限定 `metadata.openclaw.os`

第二步升级：补失败处理

- 命令失败时给出下一步建议
- 区分“命令不存在”和“执行超时”

第三步升级：补参数能力

- 支持用户问“纽约现在几点”
- 支持格式选项，比如 24 小时制 / ISO 时间

第四步升级：抽离脚本

- 如果逻辑越来越复杂，把 `date` 调用和参数处理抽到 `impl/get-time.sh` 或 `impl/get-time.mjs`

这就是 Skill 开发最典型的成长路径：**先用一个极小的闭环证明它可用，再逐步演进，而不是一开始就设计一个庞大的万能 Skill**。

### 4.6 这个例子到底让你学到了什么

虽然 `current-time` 很简单，但它已经把 Skill 的关键动作全部走了一遍：

```text
创建目录
→ 编写 SKILL.md
→ 被 OpenClaw 扫描发现
→ 通过 CLI 检查
→ 在真实会话中触发
→ 根据反馈继续迭代
```

如果读者能独立把这个例子跑通，他就已经不再是“看懂概念”，而是真的完成了第一次 Skill 创建。

---

## 5. Skill 的“异步处理”到底落在哪里

这是很多人最容易误解的地方。

`SKILL.md` 只是说明书，本身不是一个会被 Node 直接执行的模块。所以我们在 Skill 开发里谈“异步”，真正指的是下面几类场景：

- 需要请求远程 API
- 需要跑一个几十秒的脚本
- 需要分阶段处理文件、图片、音频或网页
- 需要先采集，再清洗，再生成最终输出

在 OpenClaw 里，比较稳的做法不是在一份超长提示词里硬扛，而是把任务拆成**多步工具调用 + 外部脚本**。

### 5.1 推荐的拆分方式

一个成熟的 Skill，通常会把异步任务拆成三层：

1. **Skill 层**：描述什么时候触发、步骤顺序和错误边界
2. **脚本层**：在 `impl/` 中完成真正的 I/O、网络请求、格式转换
3. **产出层**：把结果落成 JSON、Markdown 或结构化文本，再交回给 Agent 汇总

比如一个“周报生成” Skill，可以这样组织：

```text
SKILL.md
  ├─ 先检查 GITHUB_TOKEN 是否可用
  ├─ 调用 {baseDir}/impl/collect.mjs 拉取提交与 Issue
  ├─ 将原始结果保存为 JSON
  ├─ 调用 {baseDir}/impl/render.mjs 生成 Markdown 草稿
  └─ 最后由 Agent 进行语言润色和缺失项检查
```

这里的关键点有两个：

- **脚本负责耗时和脏活**，比如 API 请求、重试、分页、文件写入
- **模型负责判断和收尾**，比如补齐上下文、核对异常、把技术结果翻译成人能读的文字

这比把所有逻辑塞给模型稳定得多。

### 5.2 一个实用的 Skill 骨架

下面这个例子不是为了直接复制，而是给你一个“该把哪些内容写进 Skill”的参考：

```markdown
---
name: weekly_report
description: 汇总本周代码、Issue 和待办，生成一份简洁的中文周报
metadata: { "openclaw": { "emoji": "📝", "requires": { "bins": ["node", "git"], "env": ["GITHUB_TOKEN"] }, "primaryEnv": "GITHUB_TOKEN" } }
---

# Weekly Report

## 何时使用

- 用户明确提到“周报”“本周总结”“本周进展”
- 已知当前仓库是 Git 项目，且允许读取本地文件

## 工作流程

1. 先确认当前仓库根目录与统计时间范围。
2. 使用 `bash` 运行 `{baseDir}/impl/collect.mjs --json` 收集提交、分支和 Issue 信息。
3. 如果脚本失败，先展示关键错误，再询问用户是否缩小范围或补充认证信息。
4. 将采集结果写成临时 JSON，避免重复抓取。
5. 使用 `{baseDir}/impl/render.mjs` 生成 Markdown 草稿。
6. 最后只做必要润色，不要编造未出现的进展。

## 质量要求

- 优先保留事实和数量，不要空泛拔高
- 明确区分“已完成”“进行中”“阻塞项”
- 如果数据不完整，要直接说明缺口
```

这个骨架里有三个信号非常重要：

- **触发条件写清楚**：减少误触发
- **失败时怎么办写清楚**：避免模型在脚本失败后继续硬编
- **质量标准写清楚**：让最终输出有稳定的审稿标准

### 5.3 异步场景下的几个工程原则

如果 Skill 会调用脚本、访问网络或处理大文件，建议坚持下面几条：

1. **让脚本输出结构化结果**。优先 JSON，不要只吐给模型一大坨自然语言。
2. **让失败可诊断**。错误信息至少带上阶段名、参数和建议动作。
3. **让步骤可重跑**。采集和渲染分离，失败时能只重跑一段。
4. **让路径显式化**。用 `{baseDir}` 指向 Skill 根目录，不要写死本机绝对路径。
5. **让副作用可控**。默认把临时文件写到工作区或明确的临时目录，不要随手污染用户目录。

这些原则看起来不花哨，但它们决定了一个 Skill 到底是“能跑一次”，还是“团队里别人也愿意长期用”。

---

## 6. 调试时最容易踩的坑

Skill 出问题时，通常不是“大逻辑错了”，而是某个小门槛没过。排查时可以按下面这个顺序走。

### 6.1 先看它有没有被加载

OpenClaw 自带了三个最实用的诊断命令：

```bash
openclaw skills list
openclaw skills list --eligible
openclaw skills info <skill-name>
openclaw skills check
```

这四条命令能回答四个不同的问题：

- `list`：系统到底发现了哪些 Skill
- `list --eligible`：当前环境下真正可用的是哪些
- `info`：某个 Skill 的元数据、来源和状态
- `check`：缺的是二进制、环境变量，还是配置项

如果一个 Skill 明明在目录里却没出现在 `list` 里，优先检查：

- 文件名是不是严格叫 `SKILL.md`
- 目录层级是不是正确
- `SKILL.md` 是否过大或格式损坏
- 路径是否通过软链接逃逸到工作区之外

OpenClaw 对这类路径逃逸是有安全检查的，不会无条件放行。

### 6.2 再看是不是会话缓存还没刷新

OpenClaw 会在**会话启动时**对可用 Skill 做一次快照，后续轮次默认复用。也就是说，你改完 `SKILL.md` 之后，不一定当场生效。

通常有三种刷新办法：

1. 直接开启新会话
2. 让 Agent 执行一次“refresh skills”
3. 重启 Gateway，或者依赖 watcher 在下一轮自动更新快照

这也是为什么很多人会说“我明明改了 description，模型怎么还像没看见一样”。问题往往不在模型，而在会话拿到的还是旧快照。

### 6.3 再看依赖是不是只装在宿主机、没装进沙箱

这是 OpenClaw Skill 调试里非常常见的一类坑。

假设你的 Skill 依赖 `ffmpeg`：

- `openclaw skills check` 在宿主机上看起来一切正常
- 但当前 Agent 运行在 Docker 沙箱里
- 容器镜像里没有 `ffmpeg`

最终结果就是：Skill 能被判定为“可用”，执行时却还是失败。

所以，只要你的 Agent 运行在沙箱里，就要同时检查：

- 宿主机有没有这个二进制
- 容器里有没有这个二进制
- `setupCommand` 或自定义镜像有没有把依赖装进去

### 6.4 最后看是不是命令映射或描述写偏了

如果 Skill 能加载、依赖也齐，但模型还是不用它，常见原因有两个：

- `description` 太空，模型不知道它解决什么问题
- 触发条件写得太宽，模型不敢判断什么时候该用

如果是 Slash Command 没有出现，则再检查：

- `user-invocable` 是否被关闭
- 命令名是否与已有系统命令冲突
- 是否配置了 `command-dispatch` 却没有给出合法的 `command-tool`

别小看这一层。很多所谓“模型不稳定”，最后其实只是元数据没有写到让模型容易选择的程度。

---

## 7. 把 Skill 写得能长期维护，而不是“只在我电脑上能跑”

真正成熟的 Skill，往往不是功能最多的那个，而是最容易维护的那个。下面这些经验，基本都来自真实项目中反复踩坑后的共识。

### 7.1 说明书只管决策，不管实现细枝末节

`SKILL.md` 应该告诉模型：

- 什么时候触发
- 按什么顺序做
- 哪些情况要停下来
- 输出应该长什么样

不要在这里塞进几十行 Shell 细节或 API 参数说明。那些应该放进 `impl/` 和 `references/`。

### 7.2 Frontmatter 只写真正参与路由和门禁的字段

很多人喜欢把大量备注全塞进 Frontmatter，最后元数据越写越臃肿。但对 OpenClaw 而言，真正有价值的是那些会影响**发现、筛选、调用**的字段。其余背景信息，放正文更合适。

### 7.3 把失败路径也写进 Skill

一个 Skill 最容易让人失望的，不是失败，而是失败后还装作成功。

所以你最好在 Skill 里明确写出：

- 请求超时怎么办
- 缺少鉴权信息怎么办
- 拉取结果为空怎么办
- 局部成功、局部失败时怎么汇报

这会明显提升最终体验。

### 7.4 用最小闭环测试，而不是一上来跑全链路

开发新 Skill 时，推荐按这个顺序验证：

1. 先确认 `SKILL.md` 能被 `openclaw skills list` 识别
2. 再确认 `openclaw skills check` 显示依赖完整
3. 单独运行 `impl/` 里的脚本，看输出是否稳定
4. 最后再在真实对话里触发 Skill

这样你定位问题会快很多。否则一旦真实会话失败，你很难第一时间判断是元数据、脚本、权限还是模型路由出了问题。

---

## 8. 小结：Skill 是 OpenClaw 的“最小可复用定制单元”

写到这里，Skill 这层设计应该已经比较清楚了。

它不是一个重型插件系统，不需要你注册一堆生命周期钩子；它也不只是提示词模板，因为它还能挂脚本、做依赖门禁、接命令分发、走热更新。说得直接一点，它刚好落在一个顺手的位置：**够轻，也够工程化，团队拿来沉淀自己的领域能力不会太别扭**。

真正值得掌握的，不只是 `SKILL.md` 怎么写，而是下面这条完整链路：

```text
Frontmatter 定义可见性
→ OpenClaw 根据环境筛选 Skill
→ 模型按需读取 SKILL.md
→ Skill 调用工具或脚本完成异步任务
→ CLI 与日志帮助你排查加载、依赖和执行问题
```

如果你把这一层吃透，后面的“渠道接入”和“完整定制案例”就会更容易理解，因为那时你已经不再把 OpenClaw 看成一个神秘黑盒，而是一个可以逐层拆开、逐层替换的系统。

---

## 延伸阅读

- Agent Skills 官方站点：[agentskills.io/home](https://agentskills.io/home)
- OpenClaw Skills 文档：[docs.openclaw.ai/tools/skills](https://docs.openclaw.ai/tools/skills)
- OpenClaw Creating Skills 指南：[docs.openclaw.ai/tools/creating-skills](https://docs.openclaw.ai/tools/creating-skills)
