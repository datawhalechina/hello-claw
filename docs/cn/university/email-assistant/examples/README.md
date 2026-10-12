# 163 邮箱 IMAP 示例：快速配置与跑通

这个目录的目标很克制：  
用最少的文件，把“163 邮箱能不能被 Python 脚本读到”先验证出来。

这次示例的真实联通验证，是在 `WSL Ubuntu` 里完成的。  
但这里的 Python 读信逻辑本身并不绑定 `WSL`，只要你的本机 Python 环境能连上 `imap.163.com:993`，同样可以照着跑。

## 目录说明

- `.env.example`：示例配置
- `.env`：你的本地真实配置，不应提交
- `requirements.txt`：最小依赖
- `imap_connect_test.py`：联通性与读取测试脚本
- `yesterday_mail_report.py`：读取“昨天”的邮件，并输出结构化 JSON
- `openclaw_setup_prompt.md`：让龙虾自己落脚本、自己设 cron 的提示词模板

## 3 分钟跑通

### 第一步：准备 `.env`

把 `.env.example` 复制成 `.env`，然后填入你自己的账号和授权码：

```env
MAIL_HOST=imap.163.com
MAIL_PORT=993
MAIL_USER=your_name@163.com
MAIL_PASSWORD=replace_with_authorization_code
MAIL_FOLDER=INBOX
MAIL_FETCH_LIMIT=5
```

几个最容易填错的点：

- `MAIL_HOST` 填 `imap.163.com`，不要填网页地址 `email.163.com`
- `MAIL_PASSWORD` 优先填授权码，不要先填网页登录密码
- `MAIL_FETCH_LIMIT` 表示读取最新多少封邮件

### 第二步：安装依赖

如果你本地已经有 `python`：

```bash
pip install -r requirements.txt
```

如果你本地更适合直接用 `uv`，可以跳过单独安装，运行时一次性带上依赖：

```bash
uv run --with python-dotenv imap_connect_test.py
```

### 第三步：运行脚本

如果你本地有 `python`：

```bash
python imap_connect_test.py
```

如果你走 `uv`：

```bash
uv run --with python-dotenv imap_connect_test.py
```

## 跑通后的输出是什么样

脚本会输出一段 JSON，大致会包含：

- 连接是否成功
- 登录是否成功
- 服务端是否支持 `IMAP ID`
- 实际选中的邮箱文件夹
- 邮箱总邮件数
- 最近 `N` 封邮件的主题、发件人、日期和预览

如果一切正常，你会看到类似下面这些字段：

```json
{
  "tcp_tls": "success",
  "login_status": "OK",
  "connection": "login_success",
  "imap_id": {
    "id_supported": true,
    "id_sent": true,
    "id_status": "OK"
  },
  "mailbox": {
    "folder": "INBOX",
    "total_messages": 5,
    "fetched_items": [
      {
        "message_id": "5",
        "subject": "新设备登录提醒",
        "from": "网易邮箱账号安全 <safe@service.netease.com>",
        "date": "Sat, 14 Mar 2026 11:59:43 +0800 (CST)",
        "preview": "..."
      }
    ]
  },
  "result": "success"
}
```

## 这个脚本多做了哪一步

两个读取脚本都使用 `BODY.PEEK[]` 获取完整邮件，保留原有的已读 / 未读状态。即使服务器不支持 `EXAMINE`、脚本回退到 `SELECT`，生成摘要也不会把未读邮件标为已读。

这个脚本和最基础的 IMAP 示例相比，多做了一件对 163 很关键的事：

- `LOGIN` 之后先发一次 `IMAP ID`

如果这一步缺失，163 有机会把脚本判成 `Unsafe Login`。  
这不是理论推测，而是当前目录里的脚本在真实测试里已经验证过的行为。

## 让 OpenClaw / 龙虾来接管

如果你要的不是“本地手动跑一下”，而是让龙虾每天自动汇报昨天的邮件，建议把职责拆成三层：

- 代码层：只负责读取邮箱、筛选日期、输出结构化结果
- 提示词层：负责分类、摘要、口吻和汇报格式
- 定时器层：负责每天什么时候触发

### 1. 脚本放哪里

第一版最省事的做法，不是先封装 Skill，而是先把脚本放到龙虾当前工作目录里。

一个够用的目录形态可以是：

```text
your-openclaw-workspace/
  .env
  scripts/
    yesterday_mail_report.py
```

这里建议直接复用这个文件：

- `examples/yesterday_mail_report.py`

如果你更希望“直接通过对话让龙虾自己保存脚本”，可以直接复用：

- `examples/openclaw_setup_prompt.md`

### 2. 环境变量放哪里

根据本仓库的 OpenClaw 配置文档，环境变量优先顺序是：

1. 父进程环境变量
2. 当前工作目录的 `.env`
3. `~/.openclaw/.env`

所以最短路径就是：把邮箱相关变量放进**当前工作目录的 `.env`**。

```env
MAIL_HOST=imap.163.com
MAIL_PORT=993
MAIL_USER=your_name@163.com
MAIL_PASSWORD=replace_with_authorization_code
MAIL_FOLDER=INBOX
```

### 3. 提示词怎么写

这里不要让代码直接生成“日报正文”。  
更稳的做法是让脚本输出 JSON，再让龙虾根据提示词来汇报。

可以直接给龙虾这段提示词：

```text
请运行当前工作目录下的 scripts/yesterday_mail_report.py。

读取脚本输出的 JSON，只汇报昨天 00:00-23:59 的邮件内容。

输出时按四类整理：
1. 需要我处理
2. 安全提醒
3. 系统通知
4. 可忽略邮件

每封邮件只保留：
- 主题
- 发件人
- 时间
- 一句话摘要

最后再给一个「今天需要优先处理的事项」小节。

如果 total_messages = 0，就直接告诉我：昨天没有需要汇报的新邮件。
```

### 4. 每天早上 9 点怎么定时

OpenClaw 支持 `cron` 任务。  
如果你要让它每天早上 9 点自动汇报，可以直接用：

```bash
openclaw cron add \
  --name "163 昨日邮件摘要" \
  --cron "0 9 * * *" \
  --session isolated \
  --message "请运行当前工作目录下的 scripts/yesterday_mail_report.py。读取脚本输出的 JSON，只汇报昨天 00:00-23:59 的邮件内容，按需要我处理、安全提醒、系统通知、可忽略四类整理；如果 total_messages = 0，就直接告诉我昨天没有需要汇报的新邮件。" \
  --announce
```

再用下面这个命令确认任务已经创建：

```bash
openclaw cron list --json
```

按本仓库文档的说明，整点任务可能会自动分散到 `0-5` 分钟内执行。  
所以“9 点”更准确地说，是以 `9:00` 为目标触发点的晨间任务。

### 4.1 如果你这套 OpenClaw 跑在 WSL 里

如果你和当前实测环境一样，是 Windows + WSL Ubuntu 路线，建议再多记两点：

- 先启动 gateway，再测 `cron`
- 默认用 `cron list --json` 做检查，更方便确认真实任务状态

在这次实测里，WSL 里先执行：

```bash
systemctl --user start openclaw-gateway.service
```

再去执行：

```bash
openclaw cron status
openclaw cron list --json
```

如果 gateway 刚重启就立刻打命令，也可能遇到：

```text
gateway closed (1006 abnormal closure)
```

更稳的做法是先等 `2-3` 秒，再重试一次。

这样更稳。  
在当前这套 WSL 环境里，也更建议把 `cron list --json` 当成主检查命令：它更适合确认真实任务状态，也更方便后续接自动化。

### 5. 什么时候再封装成 Skill

如果你只是自己先跑通，当前工作目录 + `.env` + `scripts/` 就够了。  
如果你后面想长期复用，或者想让多个工作空间都能直接调用，再把它封成工作空间技能更合适。

本仓库文档给出的工作空间技能位置是：

```text
~/.openclaw/workspace/skills/
```

### 6. 命令式和提示词式，两种都算正路

这里其实有两条都成立的路径：

- 命令式：你自己放脚本、自己建 `.env`、自己跑 `openclaw cron add`
- 提示词式：你把脚本附件发给龙虾，让它自己落文件、自己建定时任务

如果你现在是第一次接这个邮箱助手，建议：

1. 先用命令式把链路跑通
2. 再用提示词式让龙虾自己接管

## 失败时先查什么

### 1. `LOGIN` 失败

优先检查：

- 授权码是否填对
- `IMAP/SMTP` 是否在网页端成功开启
- 是否误填了网页登录密码

### 2. `LOGIN` 成功，但后续读信失败

优先检查：

- 脚本有没有发送 `IMAP ID`
- 服务端是否暂时触发了风控
- 当前网络环境是否和你常用登录环境差异过大

### 3. 主题能读到，但正文预览像一堆 CSS

这是正常的。  
不少营销邮件和系统通知本来就是 HTML 模板，第一版脚本只是做联通性和基础读取验证，不是完整正文清洗器。

## 离线回归测试

安装上述依赖后，从仓库根目录运行：

```bash
python -m unittest discover -s tests -v
```

测试使用真实 `imaplib` 和本机 IMAP 协议夹具，检查中英文脚本及教程代码的读取结果和已读标记，不需要邮箱账号，也不会连接真实邮箱。

## 下一步可以加什么

- 只读取未读邮件
- 更干净地抽取正文文本
- 下载附件
- 按发件人或主题过滤
- 定时轮询
