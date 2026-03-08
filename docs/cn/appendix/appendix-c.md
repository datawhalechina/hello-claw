# 附录 C：技能开发模板

OpenClaw 的技能（Skill）系统是其核心扩展机制。本附录提供基于官方信息的技能开发指南。

> 注意：OpenClaw 官方文档中技能开发相关内容正在完善中。本附录基于社区资源和官方 CLI 帮助信息整理。

## 技能开发概览

### 什么是 Skill？

根据 OpenClaw 官方文档，Skills 是扩展 OpenClaw 能力的模块化组件：
- 添加新的工具（Tools）供 Agent 调用
- 集成第三方 API 和服务
- 自定义 Agent 的行为和响应
- 实现特定的业务逻辑

### Skills vs Tools

根据官方说明：
- **Tools（工具）**：决定 OpenClaw 能不能做某类动作（"手脚"和"权限开关"）
- **Skills（技能）**：给 OpenClaw 增加特殊能力的"小程序"或"插件"

### 技能类型

OpenClaw 支持三种类型的技能：

1. **Bundled Skills（捆绑技能）**：随 OpenClaw 一起发布的内置技能
2. **Managed Skills（托管技能）**：通过 ClawHub 安装和管理的技能
3. **Workspace Skills（工作空间技能）**：用户在工作空间中自定义的技能

---

## 一、技能管理 CLI

### 查看技能

```bash
# 列出所有可用技能
openclaw skills list

# 仅显示就绪的技能
openclaw skills list --eligible

# 显示详细信息（包括缺失的需求）
openclaw skills list -v

# JSON 格式输出
openclaw skills list --json
```

### 查看技能详情

```bash
openclaw skills info <skill-name>
```

### 检查技能状态

```bash
openclaw skills check
```

### 通过 ClawHub 管理技能

```bash
# 搜索、安装和同步技能
npx clawhub
```

---

## 二、技能配置

### 在配置中启用技能

编辑 `~/.openclaw/openclaw.json`：

```json5
{
  skills: {
    entries: {
      "skill-name": {
        enabled: true,
        // 技能特定的配置
        apiKey: {
          source: "env",
          provider: "default",
          id: "SKILL_API_KEY"
        }
      }
    }
  }
}
```

### 使用 SecretRef 配置凭证

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

**支持的 source 类型：**
- `env`：从环境变量读取
- `file`：从文件读取
- `exec`：从命令执行输出读取

---

## 三、工作空间技能开发

### 工作空间技能目录

工作空间技能位于 Agent 的工作空间目录中：

```
~/.openclaw/workspace/
└── skills/
    ├── my-skill/
    │   ├── skill.yaml      # 技能元数据
│   ├── README.md       # 技能说明
│   └── ...             # 其他文件
```

### skill.yaml 结构

基于社区实践，skill.yaml 通常包含：

```yaml
name: my-skill
displayName: 我的技能
description: 这是一个示例技能
version: 1.0.0
author: Your Name
license: MIT

# 技能触发器（关键词自动激活）
triggers:
  - "关键词1"
  - "关键词2"

# 技能配置
co nfig:
  apiKey:
    type: string
    description: API 密钥
    required: true
  timeout:
    type: number
    description: 超时时间（秒）
    default: 30

# 工具定义
tools:
  - name: my_tool
    description: 工具描述
    parameters:
      type: object
      properties:
        param1:
          type: string
          description: 参数1
        param2:
          type: number
          description: 参数2
      required:
        - param1
```

### 技能开发步骤

1. **创建工作空间技能目录**
   ```bash
   mkdir -p ~/.openclaw/workspace/skills/my-skill
   cd ~/.openclaw/workspace/skills/my-skill
   ```

2. **创建 skill.yaml**
   ```yaml
   name: hello-world
   displayName: Hello World
   version: 1.0.0
   description: 一个简单的示例技能
   author: Your Name
   
   triggers:
     - "hello"
     - "hi"
   ```

3. **验证技能**
   ```bash
   openclaw skills check
   openclaw skills info hello-world
   ```

4. **测试技能**
   通过聊天界面发送触发关键词，测试技能是否正常工作。

---

## 四、技能最佳实践

### 1. 命名规范

- 使用小写字母和连字符：
  ✅ `my-awesome-skill`
  ❌ `MyAwesomeSkill`
  ❌ `my_awesome_skill`

### 2. 版本控制

遵循语义化版本规范（SemVer）：
- `MAJOR.MINOR.PATCH`
- 例如：`1.2.3`

### 3. 配置安全

- 使用 SecretRef 存储敏感信息
- 不要将 API 密钥硬编码在 skill.yaml 中
- 使用环境变量或文件存储凭证

### 4. 错误处理

- 提供清晰的错误信息
- 优雅处理 API 失败情况
- 记录调试信息

### 5. 文档编写

每个技能应包含：
- README.md：说明技能功能和使用方法
- skill.yaml：完整的元数据和配置定义
- 示例：展示如何使用技能

---

## 五、技能开发工具

### 使用内置的 skill-creator

OpenClaw 内置了 `skill-creator` 技能，可以帮助创建新技能：

```bash
# 查看内置技能
openclaw skills list --built-in

# 使用 skill-creator（通过聊天界面）
# 发送消息：帮我创建一个天气查询技能
```

### 插件开发

对于更复杂的扩展，可以开发插件：

```bash
# 列出插件
openclaw plugins list

# 安装插件
openplaw plugins install <path|.tgz|npm-spec>

# 启用/禁用插件
openclaw plugins enable <id>
openclaw plugins disable <id>

# 插件诊断
openclaw plugins doctor
```

---

## 六、技能发布

### 发布到 ClawHub

1. **准备技能包**
   ```bash
   # 确保包含所有必要文件
   my-skill/
   ├── skill.yaml
   ├── README.md
   └── ...
   ```

2. **提交到 ClawHub**
   - 访问 [clawhub.com](https://clawhub.com)
   - 按照提交指南上传技能

### 本地共享

```bash
# 打包技能
tar -czf my-skill.tgz my-skill/

# 分享给其他用户
# 其他用户安装：
openclaw plugins install ./my-skill.tgz
```

---

## 七、故障排查

### 技能无法加载

```bash
# 检查技能状态
openclaw skills check

# 查看详细信息
openclaw skills info <skill-name> -v

# 检查网关日志
openclaw logs
```

### 技能配置错误

```bash
# 验证配置
openclaw config validate

# 查看配置
openclaw config get skills.entries.<skill-name>
```

### 技能权限问题

确保技能文件有正确的权限：
```bash
chmod 755 ~/.openclaw/workspace/skills/my-skill/
```

---

## 八、参考资源

### 官方资源

- [OpenClaw 官方文档](https://docs.openclaw.ai)
- [OpenClaw GitHub](https://github.com/openclaw/openclaw)
- [ClawHub](https://clawhub.com)

### 社区资源

- [Awesome OpenClaw Skills](https://github.com/VoltAgent/awesome-openclaw-skills)
- [OpenClaw Discord](https://discord.gg/openclaw)

---

## 九、技能开发清单

开发技能前，确保完成以下检查：

- [ ] skill.yaml 元数据完整（name, version, description, author）
- [ ] README.md 文档清晰
- [ ] 触发器定义明确
- [ ] 配置项有类型和默认值
- [ ] 敏感信息使用 SecretRef
- [ ] 错误处理完善
- [ ] 版本号遵循语义化版本
- [ ] 在本地测试通过

---

**提示**：OpenClaw 的技能系统正在快速发展中，建议关注官方文档和 GitHub 仓库获取最新信息。
