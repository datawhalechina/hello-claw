# Vibe Coding 实战：言出码随，对话即开发

> 目标：把“需求 → 改代码 → 跑测试 → 提 PR”变成一次对话流程，用于远程修复问题与快速验证需求。
>
> 前置条件：已完成消息通道接入（如飞书），并能在可访问的代码仓库/工作区里运行 Claude Code（或等价的代码执行能力）。
>
> 注意：默认只做代码变更与建议，不做自动合并；涉及危险操作时应保持人工确认。

## 1. 输出与验收标准

跑通后，你应当能稳定完成以下动作：

### 场景 1：一句话修 Bug
- **问题**：发现线上 bug，传统流程需要打开 IDE、拉分支、改代码、跑测试、提 PR
- **解决**：在飞书跟龙虾说"修复 user.ts 第 42 行的空指针问题"，龙虾调用 Claude Code 自动新建分支、修改代码、跑测试、提交 PR，GitHub Copilot 自动审查，你确认合并即可

### 场景 2：Copilot 审查反馈闭环
- **问题**：Copilot 审查发现代码问题，传统流程需要手动打开 IDE 修改
- **解决**：龙虾把 Copilot 的审查意见推送到飞书，你回复"按建议修改"，龙虾再次调用 Claude Code 自动修复并更新 PR，重新请求审查

### 场景 3：周末快速原型验证
- **问题**：突然有个产品想法，想快速写个 MVP 看看效果
- **解决**：用飞书描述需求（"给 API 加一个 /health 端点，返回版本号和运行时间"），Claude Code 创建完整 PR，包含代码、测试、文档

### 场景 4：非开发者也能提代码需求

- **问题**：产品经理想改个首页文案，但不会 Git，只能提工单等排期
- **解决**：产品经理在飞书群 @龙虾 说"把首页标题从 X 改成 Y"，Claude Code 自动提 PR，开发者在 GitHub 上确认合并

## 2. 技能选型：为什么这些是"最小可行集"？

### 核心架构

![Vibe Coding 工作流架构](./images/lark-vibe-coding-workflow.png)

```mermaid
flowchart TB

A["👤 飞书发需求
'把 SE-Arena 的榜单添加到 README'"]

subgraph OC["OpenClaw（消息编排）"]
B["接收消息 → 调用 claude-code 技能"]
end

subgraph CC["Claude Code（编码重活）"]
direction TB
D1["1. 理解仓库结构与上下文"]
D2["2. 创建分支 openclaw/fix-xxx"]
D3["3. 修改代码"]
D4["4. 运行测试"]
D5["5. 提交 + 推送"]
D6["6. 创建 PR"]
D1 --> D2 --> D3 --> D4 --> D5 --> D6
end

G["GitHub Copilot 自动审查
（可选）"]

H["📩 飞书通知
PR 链接 + 修改摘要 + diff 预览"]

I{"👤 用户决策"}

J["✅ 合并 PR
清理分支"]

K["🔄 回复修改意见
触发新一轮"]

A --> B
B --> D1
D6 --> G
D6 --> H
G --> H
H --> I
I -- "合并" --> J
I -- "按建议修改" --> K
K --> B
```

<details>
<summary>为什么是双层架构？</summary>

Claude Code 本身已经是一个完整的编码 Agent——它内置了文件读写、代码搜索、Git 操作、命令执行等全部能力。OpenClaw 不需要重复搭建这些能力，只需要安装 [`claude-code` 技能](https://clawhub.ai/hw10181913/claude-code)作为桥接层，让 OpenClaw 做好"接消息 → 派任务 → 收结果 → 发通知"这件事。这比给 OpenClaw 装一堆 filesystem/ripgrep/shell/git/github 技能来模拟编码 Agent 要**干净得多**。

</details>

<details>
<summary>为什么不直接给 OpenClaw 装一堆编码技能？</summary>

| 方案 | 需要的技能/组件 | 复杂度 | 编码质量 |
|------|----------------|--------|---------|
| **OpenClaw 全包（不推荐）** | filesystem + ripgrep + shell + git + github + 自定义 coding agent prompt | 高（~3000 行配置） | 中等（需要自己拼装工具链） |
| **OpenClaw + claude-code 技能（推荐）** | claude-code 技能 + Anthropic API Key | 低（~50 行配置） | 高（Claude Code 原生支持整个编码流程） |

**核心原因**：Claude Code 不是一个普通的 LLM API——它是 Anthropic 专门打造的**编码 Agent 产品**，内置了仓库理解、语义代码搜索、精确 diff 生成、Git 全流程操作、自动测试运行、智能上下文管理等完整能力。`claude-code` 技能把这些能力封装成 OpenClaw 可直接调用的接口，你不需要自己拼装工具链。

</details>

### 安装技能

```bash
clawhub install skill-vetter          # 安全守卫（必须第一个安装）
clawhub install claude-code           # 核心：Claude Code 集成技能
clawhub install github                # 可选：PR 状态查询 + Cron 轮询
```

### 为什么是这 3 个？

| 技能 | 不可替代性 | 替代方案风险 |
|------|-----------|-------------|
| **skill-vetter** | 自动扫描技能是否窃取 API Key | 不安装可能被恶意技能盗号 |
| **claude-code** | ClawHub 上的 Claude Code 集成技能，提供子 Agent 管理、编码任务执行、文档查询、最佳实践工作流等接口 | 不装的话需要手动用 `exec` 调用 Claude Code CLI，处理认证、输入输出解析、错误重试都要自己写 |
| **github**（可选） | 让 OpenClaw 能查询 PR 审查状态，用于 Cron 轮询 + 飞书推送 | Claude Code 自己就能创建 PR；但如果你想让 OpenClaw 主动轮询审查结果并推送通知，就需要这个技能 |

> **重要前提**：Vibe Coding 需要 OpenClaw Agent 具备命令执行能力（用于调用 Claude Code），因此必须将工具配置档设为 `coding` 或 `full`（默认的 `messaging` 不支持）。详见[第七章 工具与定时任务](/cn/adopt/chapter7/)。

## 3. 配置指南：从安装到生效的完整流程

### 3.1 前置条件

| 条件 | 说明 | 参考 |
|------|------|------|
| 飞书渠道已配置 | OpenClaw 已接入飞书，能收发消息 | [第四章 聊天平台接入](/cn/adopt/chapter4/) |
| 工具配置档为 coding/full | OpenClaw Agent 需要命令执行权限 | [第七章 工具与定时任务](/cn/adopt/chapter7/) |
| 服务器已安装 Node.js >= 22 | Claude Code 运行依赖 | — |
| 服务器已安装 Git | Claude Code 需要 `git` 命令可用 | — |
| Anthropic API Key | Claude Code 的"燃料"，需要有效的 API 额度 | 下方 3.2 节 |
| GitHub PAT 或 SSH Key | Claude Code 推代码和创建 PR 用 | 下方 3.2 节 |
| 目标仓库已 Clone（首跑建议） | 第一次先用已 clone 且有写权限的测试仓库跑通 | 下方 3.2 节 |

### 3.2 安装技能与配置凭证

按以下顺序，一路走到底：

1. **开启代码执行权限**

   ```bash
   openclaw config set tools.profile coding
   ```

2. **安装 skill-vetter**（安装后自动生效，后续技能安装前会自动扫描安全性）

   ```bash
   clawhub install skill-vetter
   ```

3. **安装 Claude Code CLI**

   Linux（推荐，大多数服务器场景）：

   ```bash
   curl -fsSL https://claude.ai/install.sh | bash
   ```

   <details>
   <summary>macOS / Windows 安装方式</summary>

   **macOS（Homebrew）**：

   ```bash
   brew install --cask claude-code
   ```

   **Windows**：

   ```powershell
   # PowerShell（推荐）
   irm https://claude.ai/install.ps1 | iex

   # 或 WinGet
   winget install Anthropic.ClaudeCode
   ```

   </details>

4. **配置 Anthropic API Key**

   ```bash
   # 写入 ~/.bashrc 或 ~/.zshrc（确保 OpenClaw 启动时能继承）
   export ANTHROPIC_API_KEY="sk-ant-xxxxx"
   ```

   > **API Key 获取**：前往 [Anthropic Console](https://console.anthropic.com/) → API Keys → API Keys → Create Key。建议创建一个专门用于 Vibe Coding 的独立 Key，便于追踪用量。
   >
   > ![Anthropic API Key 创建页面](./images/anthropic-token.png)
   >
   > ⚠️ API Key 只显示一次，务必立即保存到安全位置。如果遗失，需要删除后重新创建。

5. **安装 claude-code 技能**

   ```bash
   clawhub install claude-code
   ```

6. **配置 GitHub 认证**（PAT 方式，推荐新手）

   打开 GitHub → 点击右上角**头像** → **Settings** → 左侧栏最下方 **Developer settings** → 左侧栏最下方 **Personal access tokens** → 选择 **Fine-grained tokens**（推荐）或 Tokens (classic) → 点击 **Generate new token**。如果开启了两步验证，此时需要完成验证。

   给 Token 取一个有意义的名称（如 `openclaw-vibe-coding`），然后往下滚动配置以下选项：
   - **Repository access**（仓库访问范围）：选择 "Only select repositories"，然后在下拉菜单中勾选你要操作的目标仓库
   - **Permissions**（权限）：展开 "Repository permissions"，找到并设置以下四项：
     - Contents → **Read and write**（读写仓库文件）
     - Pull requests → **Read and write**（创建和管理 PR）
     - Issues → **Read and write**（读写 Issue）
     - Metadata → **Read-only**（只读元数据，默认已勾选）
   - 其余权限保持默认（No access）即可。设置完成后，滚动到页面底部点击 **Generate token**，复制生成的 Token（**只显示一次，务必立即保存**）

   ![GitHub Token 创建页面](./images/github-token.png)

   ```bash
   export GITHUB_TOKEN="github_pat_xxxxx"

   # 配置 git credential
   git config --global credential.helper store
   # 将 your-github-id 替换为你的 GitHub 用户名
   echo "https://your-github-id:${GITHUB_TOKEN}@github.com" > ~/.git-credentials
   ```

   > **安全提示**：Fine-grained token 比 Classic token 更安全，因为它可以限定到单个仓库。永远不要使用拥有所有仓库权限的 Classic token。

   <details>
   <summary>SSH Key 方式（替代 PAT）</summary>

   如果你更习惯 SSH Key：

   ```bash
   ssh-keygen -t ed25519 -C "openclaw-vibe-coding"
   # 将 ~/.ssh/id_ed25519.pub 的内容添加到 GitHub Settings → SSH Keys
   ```

   确保仓库使用 SSH URL clone（`git@github.com:owner/repo.git`）。

   </details>

7. **安装 gh CLI 并认证**（Claude Code 用它创建 PR）

   ```bash
   # Linux
   sudo apt install gh
   # macOS
   brew install gh

   # 认证
   gh auth login --with-token <<< "${GITHUB_TOKEN}"
   ```

8. **安装 github 技能**（可选，用于 PR 轮询通知）

   ```bash
   clawhub install github
   ```

   > **首跑建议**：第一次先不装它，先用 `claude-code` 技能跑通"改代码 → 提 PR"主链路，确认闭环后再加。

9. **准备测试仓库**

   第一次先在服务器上准备一个已 clone 且你有写权限的测试仓库，跑通最小闭环后再升级到自动 clone / fork。

### 3.3 编写工作区规则（IDENTITY.md）

把以下内容写入 `~/.openclaw/workspace/IDENTITY.md`，让 OpenClaw 知道收到编码任务时如何协调 `claude-code` 技能：

```markdown
## 场景处理 —— 代码与 PR 类需求

当用户提出涉及代码修改、提交、PR 的任务时：
1. 确认目标仓库（从消息中提取，或询问用户）
2. 调用 Claude Code 执行任务（权限检查、clone/fork、分支创建、代码修改、测试、提交推送、创建 PR 等细节由 Claude Code 自动处理）
3. 创建 PR 后默认请求 `@copilot` 审查
4. 完成后汇报：PR 链接 + 修改的文件列表 + 代码修改摘要
5. 用户确认合并时：执行 squash merge 并清理远程分支

### 异常处理

遇到失败时，**先自行诊断修复，修不了再报错**。向用户报告时需包含：具体错误信息 + 已尝试的修复步骤。
```

> **为什么需要 IDENTITY.md？** `claude-code` 技能提供了 Claude Code 的调用接口，但 OpenClaw 还需要知道"什么时候调用"和"结果怎么处理"。IDENTITY.md 告诉 OpenClaw 的编排 Agent 这些决策逻辑。

<details>
<summary>AGENTS.md vs IDENTITY.md：什么时候需要拆分？</summary>

只有当你的工作区规则已经很多，开始出现"身份设定 / 编排策略 / 自动化操作细则"混在一起不好维护时，才值得把其中一部分从 `IDENTITY.md` 拆到 `AGENTS.md`。对这篇教程的目标读者来说，**先统一写在 `IDENTITY.md` 最省心**。

</details>

## 4. 第一次跑通：从手动验证到自动化

### 4.1 服务器自检（30 秒）

在服务器终端快速确认三件事：

```bash
claude --version          # Claude Code CLI 已安装
gh auth status            # GitHub 认证正常
openclaw doctor           # OpenClaw 整体健康
```

三个命令都通过，就可以发第一条任务了。任何一个失败，跳到第 6 节排障。

### 4.2 发送第一条任务

> **跑通前必查**：以下任何一项不满足都会导致失败——
> - GitHub 账户已注册，且目标仓库确实存在（拼写错误 = 404）
> - 目标仓库中提到的 Issue、文件路径等确实存在（不存在 = 报错）
> - `ANTHROPIC_API_KEY` 有效且有余额（过期/欠费 = Claude Code 拒绝执行）
> - `GITHUB_TOKEN` 有效且已授权目标仓库（过期/未选仓库 = Permission denied）

在飞书里发送一条真实的编码需求：

```text
请在仓库 SAILResearch/awesome-foundation-model-leaderboards 上执行以下操作：
1) 请帮我把https://github.com/Software-Engineering-Arena组织下的所有榜单都添加到README.md的合适位置上去
2) 完成修改后提交、推送并创建 PR
3) 完成后把 PR 链接和修改摘要发给我
```

实际飞书对话效果——完整闭环只需四步：

**① 发送需求**：在飞书里用自然语言描述任务，机器人自动检查历史状态后开始执行。

![用户在飞书发送代码需求](./images/lark-vibe-coding-requirement-1.png)

**② 收到 PR 摘要**：机器人完成后回传 PR 编号、状态、修改文件和添加详情。飞书里的 PR 链接可以直接点击跳转 GitHub。

![机器人回传 PR 摘要与链接](./images/lark-vibe-coding-requirement-2.png)

**③ 审查 diff**：点击 PR 链接在手机浏览器里查看代码变更，确认修改内容是否符合预期。

![GitHub PR 页面的文件 diff 视图](./images/lark-vibe-coding-requirement-3.png)

**④ 确认合并**：回到飞书说一句"合并并清理分支"，机器人执行 merge + 删除分支，全程完成。

![用户确认合并，机器人执行并汇报结果](./images/lark-vibe-coding-requirement-4.png)

到这里为止，分支前缀、Copilot 审查、结果回传格式都应该由 `IDENTITY.md` 自动兜底；后面示例默认都沿用这套规则，除非我明确写"这次要覆盖默认行为"。

### 4.3 下一步

这条链路一旦跑通，可以逐步升级：

- 安装 `github` 技能，配置 Cron 轮询 PR 审查状态并推送飞书通知
- 在 `IDENTITY.md` 中添加自动 clone / fork 规则，省去手动准备仓库
- 配置全自动审查闭环：Copilot 审查 → 自动修复 → 重新请求审查（见第 5 节）

## 5. 高级场景：从"能用"到"好用"

### 场景 1：Copilot 审查反馈自动闭环

**问题**：PR 提交后，你需要反复打开 GitHub 查看 Copilot 是否审查完成，很不"手机友好"。

**解决方案 A — 人在回路（推荐）**：

配置 Cron 任务自动轮询 PR 审查状态，结果推送到飞书：

```bash
openclaw cron add --name "PR审查状态检查" --every 5m --message "检查所有 openclaw/ 前缀分支的开放 PR 审查状态。如果有新的审查结果：1) 列出每个 PR 的审查状态（approved / changes_requested / pending）2) 如果 changes_requested，提取具体修改建议（逐条列出）3) 将结果推送到飞书。如果没有新的审查结果，不推送消息。"
```

收到飞书推送后，你有三种选择：
- 回复 **"按建议修改"**：龙虾再次调用 Claude Code，逐条修复 Copilot 的建议，更新 PR
- 回复 **"忽略建议，直接合并"**：龙虾合并 PR（适用于误判场景）
- 回复 **"我来看看"**：龙虾不操作，你稍后手动处理

**解决方案 B — 全自动（进阶，需谨慎）**：

```
请启用 Vibe Coding 全自动模式：
- Copilot 审查通过（approved）→ 自动合并 PR
- Copilot 要求修改（changes_requested）→ 调用 Claude Code 自动修复 → 更新 PR → 重新请求审查
- 超过 3 轮仍未通过 → 停止自动修复，推送到飞书请求人工介入
- 每次操作都在飞书通知我当前状态
```

> **警告**：全自动模式适合低风险仓库（如文档、个人项目）。生产仓库请务必使用"人在回路"模式，避免自动合并引入问题。

### 场景 2：多文件重构

用自然语言描述复杂需求，Claude Code 会自动分析依赖关系并分步执行：

```
请帮我重构 src/api/ 目录：
1) 把 src/api/handlers.ts 中的 handleUser 和 handleOrder 拆分到各自文件
   - src/api/user-handler.ts
   - src/api/order-handler.ts
2) 更新 src/api/index.ts 的导出
3) 确保所有引用这两个函数的文件也同步更新 import 路径
4) 运行测试确保不破坏现有功能
5) 创建 PR，标题为 "refactor: split API handlers into separate modules"
6) 在 PR description 中列出所有修改的文件和修改原因
```

> **提示**：复杂重构建议先让龙虾列出修改计划（"请先告诉我你打算修改哪些文件，不要直接改"），确认后再执行。Claude Code 擅长理解代码间的依赖关系，多文件重构是它的强项。

### 场景 3：从 Issue 到 PR 全自动

```
请查看仓库 your-repo 的 Issue #42，
根据 Issue 描述实现功能，创建 PR 并关联该 Issue。
PR 描述中注明 "Closes #42"，这样合并后 Issue 会自动关闭。
```

### 场景 4：批量文案修改（非开发者友好）

在飞书群聊中，产品经理可以直接 @龙虾：

```
@龙虾 请修改以下文案：
- src/pages/home.tsx 中的标题从"欢迎使用"改为"开始体验"
- src/pages/about.tsx 中的描述从"我们是一家..."改为"我们致力于..."
- 创建 PR，标题为 "docs: update homepage and about page copy"
```

> **群聊安全提示**：在群聊中使用 Vibe Coding 前，确保群成员都是可信的。恶意用户可能通过 @龙虾 注入危险操作。详见[第十章 安全防护与威胁模型](/cn/adopt/chapter10/)。

## 6. 常见问题与排障

### 问题 1：Claude Code 调用失败

**诊断步骤**：

1. 检查 `claude-code` 技能是否安装：
   ```bash
   clawhub list | grep claude-code
   ```

2. 检查 Claude Code CLI 是否可用：
   ```bash
   claude --version
   ```

3. 检查 API Key 是否有效：
   ```bash
   echo "say hi" | claude --print
   ```

4. 检查 OpenClaw 的环境变量：
   ```bash
   openclaw logs --limit 50 | grep -i "claude\|anthropic\|api"
   ```

**常见原因**：
- `claude-code` 技能未安装——运行 `clawhub install claude-code`
- `ANTHROPIC_API_KEY` 未设置或过期——OpenClaw 通过 systemd/Docker 启动时，环境变量可能没有从 `.bashrc` 继承，需要在 systemd unit 文件或 Docker compose 中显式设置
- Claude Code CLI 不在 PATH 中——用 `which claude` 确认路径，必要时在 OpenClaw 配置中写全路径（如 `/usr/local/bin/claude`）
- API 额度不足——前往 [Anthropic Console](https://console.anthropic.com/) 查看用量

### 问题 2：PR 创建失败（Permission denied）

**诊断步骤**：

1. 在服务器上手动测试 Git push：
   ```bash
   cd /workspace/repos/your-repo
   git checkout -b test-push
   git commit --allow-empty -m "test push"
   git push origin test-push
   ```

2. 如果使用 `gh` CLI，检查认证：
   ```bash
   gh auth status
   ```

**常见原因**：
- Fine-grained Token 没有选择目标仓库（"Only select repositories" 中漏选了）
- Token 过期（默认有效期 30 天，建议设为 90 天）
- 组织仓库需要额外的 SSO 授权（在 Token 设置页点击 "Authorize" 按钮）
- SSH Key 未添加到 GitHub 或权限不足

### 问题 3：Copilot 审查一直 pending

**诊断步骤**：

1. 在 GitHub 网页上打开 PR，手动点击 "Request review from @copilot"
2. 检查仓库设置：Settings → Copilot → Code review

**常见原因**：
- 仓库未启用 Copilot code review（需要在 Settings → Copilot → Code review 中开启）
- 组织级别未开通 Copilot（需要管理员启用）
- PR 改动文件过多（>300 文件），Copilot 可能超时
- PR 包含二进制文件或超大文件，Copilot 无法审查

### 问题 4：代码修改不符合预期

**诊断步骤**：

1. 在仓库根目录添加 `CLAUDE.md` 文件，写入项目规范（见第 7 节"玩法 1"）
2. 在飞书消息中提供更具体的上下文

**常见原因**：
- 仓库缺少 `CLAUDE.md` 等上下文文件，Claude Code 不了解项目规范
- 需求描述太模糊（"优化一下性能" vs "将 getUserList 的数据库查询从 N+1 改为 JOIN"）
- 仓库代码量太大——建议在需求中指定具体文件路径

## 7. 进阶玩法：构建你的 Vibe Coding 系统

### 玩法 1：用 CLAUDE.md 提升代码质量

在目标仓库根目录创建 `CLAUDE.md` 文件。Claude Code 每次启动时会自动读取这个文件，作为编码规范：

```markdown
# 项目规范

## 代码风格
- 使用 TypeScript strict mode
- 函数命名：camelCase
- 文件命名：kebab-case
- 每个函数必须有 JSDoc 注释
- 禁止使用 any 类型

## Git 规范
- commit message 遵循 Conventional Commits
- 分支命名：openclaw/feat-xxx、openclaw/fix-xxx
- PR 必须包含修改说明和测试计划

## 测试要求
- 新功能必须附带单元测试
- 测试覆盖率不低于 80%
- 使用 Vitest 作为测试框架
```

> **`CLAUDE.md` vs `IDENTITY.md`**：`CLAUDE.md` 是 Claude Code 原生支持的项目规范文件（放在仓库根目录，跟着代码走）。`IDENTITY.md` 是 OpenClaw 工作区文件（放在 `~/.openclaw/workspace/`，跟着 Agent 走）。两者可以配合使用：`CLAUDE.md` 写项目级规范，`IDENTITY.md` 写 Agent 级编排指令。

### 玩法 2：多仓库管理

如果你维护多个仓库，可以在聊天时指定仓库名：

```
请在 frontend-app 仓库中修复 Header 组件的样式问题：
导航栏在移动端被截断，需要添加 overflow-x: auto

同时在 backend-api 仓库中添加对应的 /api/layout-config 端点，
返回移动端专属的导航配置
```

OpenClaw 会根据仓库名在 `/workspace/repos/` 下找到对应目录，分别调用 Claude Code。

### 玩法 3：定时代码巡检

配置定时任务，每周自动扫描代码质量：

```bash
openclaw cron add --name "每周代码巡检" --cron "0 9 * * 1" --message "请对仓库 your-repo 执行以下巡检：1) 搜索所有 TODO 和 FIXME 注释 2) 检查是否有过期依赖（npm outdated）3) 统计过去一周新增的未关闭 Issue 4) 将巡检报告推送到飞书。如果发现高优先级问题（安全漏洞、废弃 API），自动创建 Issue。"
```

## 8. 性能优化建议

### 优化 1：在需求中指定文件范围

```
请只修改 src/api/user-handler.ts 和对应的测试文件，
不要扫描整个仓库（除非必要）
```

**原理**：Claude Code 默认会智能选择需要读取的文件，但明确指定范围可以减少 token 消耗，加快响应速度。

### 优化 2：确认使用 coding 而非 full 配置档

如果你在第 3 节配置时选的是 `coding`，这一步已经完成。如果当时设的是 `full`，建议降级为 `coding`——它包含文件读写和命令执行，但不包含浏览器和消息工具，比 `full` 少加载约 30% 的工具描述，OpenClaw 的决策更快更准。

### 优化 3：PR 模板减少审查往返

在仓库根目录创建 `.github/pull_request_template.md`：

```markdown
## 变更说明
<!-- 一句话描述这个 PR 做了什么 -->

## 修改清单
<!-- 列出所有修改的文件 -->

## 测试计划
- [ ] 单元测试通过
- [ ] 手动验证功能正常

## Checklist
- [ ] 代码风格符合项目规范
- [ ] 无新增 TypeScript 类型错误
- [ ] 无硬编码的密钥或敏感信息
```

**原理**：标准化的 PR 模板能引导 Copilot 做更聚焦的审查，减少"代码能跑但不规范"导致的多次往返。Claude Code 在创建 PR 时会自动填写这个模板。

### 优化 4：Repo Workspace 缓存

避免每次都 `git clone`，使用已有的本地仓库：

```bash
# 定时拉取最新代码（OpenClaw Cron）
openclaw cron add --name "每小时同步仓库" --every 1h --message "请在 /workspace/repos/ 下的所有仓库执行 git fetch --all && git pull origin main"
```

## 9. 安全与合规提醒

### 提醒 1：API Key 和 Token 权限最小化

| 凭证 | 最小权限 | 存放位置 |
|------|---------|---------|
| Anthropic API Key | 无特殊权限限制，但建议独立创建（便于追踪和撤销） | 环境变量 `ANTHROPIC_API_KEY` |
| GitHub PAT | Fine-grained，仅选目标仓库，Contents + PRs + Issues | 环境变量 `GITHUB_TOKEN` |
| GitHub SSH Key | 限定到具体仓库（Deploy Key）或用户级 | `~/.ssh/id_ed25519` |

**禁止**：使用拥有 `admin:org`、`delete_repo` 等危险权限的 Token。

### 提醒 2：分支保护规则必须启用

在 GitHub 仓库 Settings → Branches → Branch protection rules 中配置：

- Require a pull request before merging（禁止直接 push 到 main）
- Require approvals（至少 1 个审批）
- Require status checks to pass（CI 必须通过）
- 可选：Require review from Code Owners

**原理**：即使 Claude Code 的代码完美无瑕，分支保护规则是最后一道安全网。它确保任何代码变更都经过审查和 CI 验证。

### 提醒 3：Copilot 审查是辅助，不替代人工

**重要提示**：GitHub Copilot 的代码审查能力持续提升，但它仍然可能：
- 漏掉业务逻辑错误（它不懂你的业务）
- 误判代码风格（不同项目标准不同）
- 无法检测架构级问题（如循环依赖、过度耦合）

**建议**：对于关键模块（认证、支付、数据处理），即使 Copilot 审查通过，也应有人工 Review。

### 提醒 4：敏感文件保护

确保 `.gitignore` 包含以下条目：

```
.env
.env.*
*.key
*.pem
credentials.json
secrets/
```

在目标仓库的 `CLAUDE.md` 中明确禁止操作敏感文件：

```markdown
## 安全规则
- 禁止读取或修改 .env、*.key、*.pem、credentials.json 等敏感文件
- 禁止在代码中硬编码任何密钥、Token 或密码
- 提交前检查 git diff，确保不包含敏感信息
```

### 提醒 5：Claude Code 的沙箱限制

Claude Code 在执行命令时有内置的安全策略：
- 默认只在指定目录内操作文件
- 危险命令（`rm -rf /`、`sudo` 等）会被拦截
- 网络访问受限（不会主动连接非必要的外部服务）

但这些不能替代服务器级别的安全措施。建议在专用的低权限用户下运行 OpenClaw 和 Claude Code，避免使用 root。

## 10. 总结：从"仪式感"到"执行力"

Vibe Coding 的核心价值是**把开发者从繁琐的工具操作中解放出来**——你只需要用自然语言说清楚"要做什么"，剩下的全部交给 Agent：

- **随时随地**：飞书发一句需求，Claude Code 创建分支、写代码、跑测试、提 PR
- **审查闭环**：看飞书推送的 Copilot 审查结果，回复"按建议修改"或"合并"
- **完整闭环**：从需求到合并，全程不需要打开 IDE 或终端
- **团队协作**：非开发者也能通过飞书群聊提出代码需求

**架构哲学**：让每个组件做它最擅长的事——OpenClaw 做消息编排，Claude Code 做编码执行，GitHub Copilot 做代码审查，飞书做人机交互。不要让 OpenClaw 用一堆技能去模拟 Claude Code 已经做好的事情。

**记住**：Vibe Coding 不是偷懒，而是把编码回归本质——**想清楚要做什么，剩下的交给工具**。你不是在"自己写代码"，而是在**指挥一个专业的编码 Agent 团队**帮你把想法变成可审查的 PR。

### 更多可能：这个场景还能怎么玩？

本教程只展示了 Vibe Coding 的一种基础形态。基于同样的架构，你完全可以拓展出更多玩法，比如：

1. **开源贡献加速器**：浏览 GitHub Trending 时看到感兴趣的项目，直接在飞书里说"给这个项目的 README 翻译成中文并提 PR"
2. **团队 Code Review 助手**：配置 Cron 定时扫描团队所有开放 PR，自动生成审查摘要推送到群聊，@相关同事确认
3. **技术债清理机器人**：每周自动扫描 `TODO`/`FIXME`/`HACK` 注释，按优先级创建 Issue 并关联代码位置
4. **依赖更新巡检**：定时检查 `npm outdated` / `pip list --outdated`，自动创建升级 PR 并跑 CI
5. **文档同步守卫**：监控代码变更，当 API 接口签名变化时自动更新对应的 API 文档并提 PR

## 参考资料

### Claude Code
- [claude-code ClawHub 技能（OpenClaw 集成）](https://clawhub.ai/hw10181913/claude-code)
- [Claude Code 官方文档](https://docs.anthropic.com/en/docs/claude-code)
- [Anthropic Console（API Key 管理）](https://console.anthropic.com/)
- [Claude Code Agent SDK（编程集成）](https://www.npmjs.com/package/@anthropic-ai/claude-code)

### GitHub 配置
- [创建 Fine-grained Personal Access Token](https://github.com/settings/tokens?type=beta)
- [GitHub CLI（gh）安装指南](https://cli.github.com/)
- [GitHub Copilot Code Review 文档](https://docs.github.com/en/copilot/using-github-copilot/code-review/using-copilot-code-review)
- [分支保护规则配置](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-a-branch-protection-rule)

### PR 模板参考
- [Conventional Commits 规范](https://www.conventionalcommits.org/)
- [GitHub PR 模板指南](https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests)