# 第五章 外部服务集成

> **前提**：本章假设你已完成第一章的安装配置和第四章的技能安装。本章涉及的服务（Google、Notion、数据库等）需要你已有对应的账号。没有这些服务账号的读者可以跳过对应小节，只看自己用得到的部分。

在第四章中，我们学会了安装和使用技能。本章将深入实战，通过 Google Workspace、Notion 等技能将 OpenClaw 与你的日常工具连接起来，打造真正的自动化工作流。

## 1. Google Workspace 集成

> **网络提示**：Google 服务在中国大陆无法直接访问，需要网络代理。如果你没有代理，可以跳过本节，直接看第 2 节 Notion 集成或第 3 节飞书深度集成。

Google Workspace（gog）技能提供了 Gmail、Calendar、Drive、Docs、Sheets 的统一访问接口，是最常用的外部服务集成之一。

### 1.1 安装与配置

<!-- TODO: 补充 OAuth 授权流程截图 -->

```bash
clawhub install gog
```

安装后需要完成 Google OAuth 授权（OAuth 是一种安全的授权方式，让 OpenClaw 可以代你访问 Google 服务，而不需要你提供 Google 密码）：

1. OpenClaw 会生成一个授权链接
2. 在浏览器中打开链接，登录 Google 账号
3. 授权 OpenClaw 访问你的 Gmail、Calendar、Drive
4. 复制返回的授权码，粘贴到终端

### 1.2 Gmail 管理

安装完成后，你可以用自然语言管理邮件：

```
查看今天的未读邮件，按重要程度排序
```

```
帮我回复张三的邮件，告诉他周五下午 3 点可以开会
```

```
搜索所有来自 hr@company.com 的邮件，生成摘要
```

### 1.3 Google Calendar

```
查看我这周的日程安排
```

```
帮我在周三下午 2 点创建一个 30 分钟的会议，邀请 alice@company.com
```

```
我下周哪天下午有空？帮我找出连续 2 小时的空闲时间段
```

### 1.4 Google Drive & Docs

```
在 Google Drive 中搜索包含"季度报告"的文档
```

```
创建一个新的 Google Sheets，包含本月销售数据的表格模板
```

## 2. Notion 集成

Notion 技能让 OpenClaw 成为你的知识库管理助手。

### 2.1 安装与配置

```bash
clawhub install notion
```

需要创建 Notion Integration（集成接口，让 OpenClaw 获得访问你 Notion 数据的权限）并获取 API Token：

1. 访问 https://www.notion.so/my-integrations
2. 点击"New integration"创建新的集成，获取 Internal Token（一串以 `ntn_` 开头的密钥）
3. 在 Notion 中打开需要访问的页面/数据库，点击右上角"..."→"Connections"→添加你刚创建的 Integration

### 2.2 数据库操作

```
在"项目任务"数据库中添加一条记录：任务名"完成前端重构"，状态"进行中"，优先级"高"
```

```
查询"Bug 追踪"数据库中所有状态为"待修复"的记录
```

### 2.3 页面管理

```
创建一个新的 Notion 页面"2026年3月周报"，包含本周 Git 提交摘要
```

```
更新"产品需求文档"页面，在功能列表中添加"暗黑模式支持"
```

## 3. 飞书深度集成

在第二章中我们介绍了飞书作为消息渠道的接入。通过飞书插件的完整能力，OpenClaw 可以深度操作飞书的办公生态（详见第四章第 7 节）。

### 3.1 云文档操作

```
帮我创建一个飞书文档，标题是"技术方案评审"，包含背景、方案、风险三个部分
```

### 3.2 多维表格

```
在"OKR 跟踪"多维表格中，将我负责的所有 KR 状态更新为最新进度
```

### 3.3 日程与任务

```
查看团队成员这周的忙闲情况，找一个所有人都有空的时间安排周会
```

## 4. 数据库集成

### 4.1 SQL Toolkit

```bash
clawhub install sql-toolkit
```

支持 PostgreSQL、MySQL、SQLite 的只读查询（这三种都是常见的数据库软件，用来存储和管理结构化数据，类似于功能更强大的 Excel 表格）：

```
连接生产数据库，查询最近 7 天的新增用户数，按天分组
```

```
查看 orders 表的结构，列出所有字段和类型
```

> **安全提示**：SQL Toolkit 默认只支持只读查询（SELECT），不允许执行 INSERT、UPDATE、DELETE 等写入操作。这是一个重要的安全设计。

### 4.2 配置数据库连接

```json
// openclaw.json 中的 sql-toolkit 配置
{
  "skills": {
    "sql-toolkit": {
      "connections": {
        "production": {
          "type": "postgresql",
          "host": "localhost",
          "port": 5432,
          "database": "myapp",
          "user": "readonly_user",
          "password": "your_password"
        },
        "analytics": {
          "type": "mysql",
          "host": "analytics.company.com",
          "port": 3306,
          "database": "analytics"
        }
      }
    }
  }
}
```

## 5. 浏览器自动化

### 5.1 Playwright 技能

```bash
clawhub install playwright
```

Playwright 技能让 OpenClaw 可以控制无头浏览器，执行网页操作：

```
打开 https://example.com/dashboard，截图保存当前页面
```

```
登录公司内部系统，导出本月考勤数据为 CSV
```

```
监控竞品网站的定价页面，如果价格变化就通知我
```

### 5.2 注意事项

- 浏览器自动化消耗资源较多，建议在服务器上运行
- 需要安装 Playwright 浏览器依赖：`npx playwright install chromium`
- 涉及登录的操作需要妥善管理凭证

## 6. 智能家居

### 6.1 Home Assistant 集成

```bash
clawhub install home-assistant
```

```
打开客厅的灯，亮度调到 60%
```

```
每天晚上 11 点自动关闭所有灯光和空调
```

```
查看家里所有设备的状态
```

## 7. 集成最佳实践

**最小权限原则**：每个技能只授予必要的权限。Gmail 技能不需要 Drive 权限，数据库技能只需要只读权限。

**凭证安全**：所有 API Key 和 Token 存储在本地 `openclaw.json` 中，不要提交到 Git 仓库。建议将 `openclaw.json` 加入 `.gitignore`。

**错误处理**：外部服务可能出现超时、限流等问题。OpenClaw 会自动重试，但如果持续失败，检查 API 配额和网络连接。

**测试环境先行**：对于涉及写入操作的集成（如创建文档、发送邮件），先在测试账号上验证，确认行为符合预期后再切换到正式账号。

---

**下一步**：[第六章 生产环境部署](/cn/adopt/chapter6/)
