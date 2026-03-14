# 金融简报实战：从信息碎片到决策支持

> 目标：搭建一套可复用的“金融简报”工作流示例：检索 → 摘要 → 结构化输出 → 定时推送（可选）。
>
> 前置条件：已能正常使用 OpenClaw，且完成联网搜索能力配置；如需推送到群聊，需提前打通飞书/Telegram/QQ 等消息通道。
>
> 注意：本文仅介绍工具与流程，不构成任何投资建议。

## 1. 输出与验收标准

跑通后，你应当能稳定得到以下产物（可按需启用定时任务）：

- 盘前简报：市场要点、自选股相关新闻与来源链接、当日宏观/财报日历、风险提示、待人工复核
- 盘后总结：自选股表现与主要驱动信息（含来源）、市场情绪与异常事件清单
- 周度回顾：市场表现、自选股表现、事件复盘、下周关注事件与风险清单

验收标准建议至少满足：

- 每条结论可追溯：给出来源链接或原始数据出处
- 输出稳定：同一提示下结构一致、字段齐全
- 低干扰：默认不输出投资建议，只做信息整理与风险提示

## 2. 依赖技能（最小集）

```bash
clawhub install skill-vetter      # 安全守卫（必须第一个安装）
clawhub install tavily-search     # 联网搜索（核心）
clawhub install summarize         # 内容摘要（核心）
clawhub install gog               # Google 全家桶（可选，用于日历事件）
clawhub install feishu-doc        # 飞书文档（可选，用于归档）
```

### 为什么是这 5 个？

| 技能 | 不可替代性 | 替代方案风险 |
|------|-----------|-------------|
| **tavily-search** | 专为 Agent 优化的搜索，结果全、新、简洁 | 其他搜索技能可能返回过时或低质量结果 |
| **summarize** | 支持网页、PDF、图像、音频、YouTube 多格式摘要 | 单纯用 LLM 摘要可能丢失关键数据 |
| **skill-vetter** | 自动扫描技能是否窃取 API Key | 不安装可能被恶意技能盗号 |
| **gog** | Google Calendar + Gmail 无缝集成 | 单独用日历技能需要手动同步 |
| **feishu-doc** | 飞书文档结构化存储，支持@提醒、评论、协作 | Notion 需要手动创建数据库，Obsidian 缺少分享功能 |

建议：金融场景默认保持技能集精简。技能越多，链路越长，排障与一致性控制成本越高。

## 3. 配置指南：从安装到生效的完整流程

### 3.1 账户连接（关键步骤）

#### Tavily Search 配置

```bash
clawhub install tavily-search
```

在 [Tavily API](https://app.tavily.com/api-keys) 生成 API Key，复制到 OpenClaw 提示符：

```
Enter Tavily API Key: [粘贴]
```

#### Summarize 配置

```bash
clawhub install summarize
```

无需额外配置，直接使用。

#### Gog 配置（可选）

```bash
clawhub install gog
```

在 [Google Cloud Console](https://console.cloud.google.com/) 创建 OAuth 项目，配置 Calendar API 权限，复制授权链接到 OpenClaw。

#### 验证连接状态

```bash
openclaw whoami
clawhub list
```

确保 `tavily-search` 和 `summarize` 状态为 `active`。

### 3.2 自定义监控清单（核心逻辑）

在 `openclaw.json` 中添加自定义规则：

```json
{
  "skills": {
    "tavily-search": {
      "search_profiles": {
        "stock-news": {
          "search_depth": "advanced",
          "include_images": false,
          "include_answer": false,
          "include_raw_content": false,
          "max_results": 10
        },
        "macro-data": {
          "search_depth": "basic",
          "include_images": false,
          "include_answer": true,
          "include_raw_content": false,
          "max_results": 5
        }
      }
    },
    "summarize": {
      "summarizer": {
        "max_length": 500,
        "format": "bullet_points",
        "include_sources": true
      }
    }
  },
  "custom": {
    "stocks": [
      {
        "symbol": "AAPL",
        "name": "苹果",
        "watch": true,
        "alert_thresholds": {
          "price_drop_pct": 5,
          "volume_spike_pct": 50
        }
      },
      {
        "symbol": "600519.SS",
        "name": "贵州茅台",
        "watch": true,
        "alert_thresholds": {
          "price_drop_pct": 3,
          "volume_spike_pct": 30
        }
      }
    ],
    "macro_events": [
      {
        "name": "美国非农数据",
        "country": "US",
        "frequency": "monthly",
        "next_date": "2026-04-04",
        "impact_assets": ["SPY", "DXY", "USDJPY"]
      },
      {
        "name": "美联储利率决议",
        "country": "US",
        "frequency": "biweekly",
        "next_date": "2026-04-30",
        "impact_assets": ["SPY", "BTC", "GLD"]
      }
    ]
  }
}
```

> **规则设计原则**：
> 1. **精确优先**：股票代码用完整后缀（如 `AAPL`、`600519.SS`），避免歧义
> 2. **数量控制**：自选股建议 5-10 只，太多会导致信息过载
> 3. **事件驱动**：宏观事件只监控高影响力事件（如美联储、非农、CPI）

## 4. 第一次跑通：从手动验证到自动化

### 4.1 手动验证（关键！）

建议先手动验证输出结构与信息源质量，再启用定时任务：

```
请生成今天的盘前简报（基于 2026-04-03 数据）：
1) 检索过去 12 小时与我关注标的（AAPL、600519.SS）相关的新闻，给出标题、一句话摘要和来源链接
2) 汇总今天的重要财报与宏观数据日历
3) 按"高/中/低"标注潜在影响
4) 最后输出「风险提示」和「待人工复核」两个小节
要求：所有结论后附来源链接，不要给投资建议
```

观察输出是否符合预期，特别是：
- 自选股新闻是否准确
- 财报日期是否正确
- 风险提示是否全面

### 4.2 调试技巧

#### 技巧 1：查看搜索结果详情

```
请展示搜索"AAPL 今日新闻"的完整结果（包括所有链接和摘要）
```

这能帮你诊断：
- 搜索关键词是否准确
- 结果是否过时
- 是否包含钓鱼网站

#### 技巧 2：测试摘要质量

```
请对以下链接生成摘要：
https://finance.yahoo.com/news/apple-aapl-earnings-20260401.html
```

如果摘要质量差，调整 `summarize` 技能的 `max_length` 或 `format` 参数。

### 4.3 启用自动监控

验证通过后，启用自动监控：

```
请启用金融简报自动推送模式：
- 每天 9:00 推送盘前简报（结构见 openclaw.json）
- 每天 15:30 推送盘后总结（自选股表现 + 市场情绪）
- 每周五 16:00 推送周度回顾
- 所有简报推送到飞书工作群
```

## 5. 可选增强场景

### 场景 1：财报季专项模式

用于在财报季按固定结构提取当天财报要点，突出异常项。

```
请启用财报监控模式：
- 每天 8:00 检查当天发布财报的公司
- 提取四要素：营收、利润、指引、异常项
- 如果利润低于预期 10% 以上，标记为"重点关注"
- 输出清单，格式：
### 重点关注
- [公司] 营收 xxx，利润 xxx（低于预期 xx%），指引下调
### 普通发布
- [公司] 营收 xxx，利润 xxx
```

### 场景 2：宏观数据前瞻

用于在宏观数据发布前生成结构化前瞻，减少临时检索成本。

```
请为明天的非农数据生成前瞻：
1) 预期值（来自 Consensus Forecast）
2) 历史值（过去 6 个月）
3) 影响标的（SPY、DXY、USDJPY）
4) 历史规律（过去 5 次数据发布后，SPY 平均涨跌幅）
```

### 场景 3：自选股价格监控

用于在交易时段内对自选股做阈值监控，并附带可追溯的信息来源。

```json
{
  "cron": {
    "jobs": [
      {
        "name": "自选股价格监控",
        "schedule": "0 9-16 * * 1-5",
        "prompt": "检查自选股（AAPL、600519.SS）当前价格，如果涨跌幅超过 3%，推送简报：\n### 价格异动\n- [股票] 现价 xxx，涨跌幅 xx%\n- 最近 7 日涨跌幅：xx%\n- 最近 1 月涨跌幅：xx%\n- 可能原因：[基于最近新闻推断]"
      }
    ]
  }
}
```

### 场景 4：周度回顾自动生成

在 `openclaw.json` 中添加定时任务：

```json
{
  "cron": {
    "jobs": [
      {
        "name": "周度市场回顾",
        "schedule": "0 16 * * 5",
        "prompt": "请生成本周市场回顾（2026-03-31 至 2026-04-04）：\n\n## 1) 市场表现\n- 上证指数：xxx 点（+/-xx%）\n- 纳斯达克：xxx 点（+/-xx%）\n- 美元指数：xxx（+/-xx%）\n\n## 2) 自选股表现\n- AAPL：xxx 点（+/-xx%）\n- 贵州茅台：xxx 元（+/-xx%）\n\n## 3) 本周事件复盘\n- [事件 1] 对市场的影响\n- [事件 2] 对市场的影响\n\n## 4) 下周展望\n- 关注事件：[事件列表]\n- 潜在风险：[风险列表]\n\n请在 16:30 前发送到飞书工作群。"
      }
    ]
  }
}
```

## 6. 常见问题与排障

### 问题 1：搜索结果不准确

**诊断步骤**：

1. 手动测试搜索：
   ```
   请搜索"AAPL 今日新闻"，返回前 5 个结果
   ```
   观察结果是否准确。

2. 检查搜索深度：
   ```
   请将搜索深度从 "basic" 调整为 "advanced"
   ```

**常见原因**：
- 搜索关键词太泛（如"股票"），应使用具体代码（如"AAPL"）
- 搜索深度不足（"basic" 只返回前 5 个结果），应使用"advanced"
- API Key 余额不足（Tavily 免费版每天 1000 次调用）

### 问题 2：摘要质量差

**诊断步骤**：

1. 手动测试摘要：
   ```
   请对以下链接生成摘要：
   https://finance.yahoo.com/news/apple-aapl-earnings-20260401.html
   ```
   如果摘要质量差，调整参数。

2. 检查摘要长度：
   ```
   请将摘要最大长度从 500 调整为 800
   ```

**常见原因**：
- 摘要长度太短（<300），无法覆盖关键信息
- 摘要格式不对（"paragraph" 比 "bullet_points" 更详细）
- 来源页面加载失败（检查网络连接）

### 问题 3：自选股新闻误判

**解决方案**：启用"双重确认"模式

```
请启用自选股新闻双重确认模式：
- 搜索结果先不摘要，而是输出"建议摘要：[标题]，匹配关键词：[关键词]
- 你回复'是'或'否'决定是否摘要
- 连续 5 次正确判断后，自动切换到全自动模式
```

**原理**：通过少量人工干预，让 LLM 学习你的判断标准，逐步提高准确率。

## 7. 进阶玩法：构建你的金融信息系统

### 玩法 1：投资组合跟踪

```
请为我创建投资组合跟踪系统：
- 每天收盘后更新持仓市值
- 计算当日盈亏（金额 + 百分比）
- 计算 YTD（年初至今）收益率
- 如果单日盈亏超过 5%，推送简报
```

### 玩法 2：行业对比分析

```
请为我创建行业对比分析系统：
- 每周比较科技股（AAPL、MSFT、GOOGL）表现
- 计算相对强弱（vs 纳斯达克指数）
- 如果某股票连续 3 天跑输指数，标记为"重点关注"
```

### 玩法 3：多源信息聚合

```
请为我聚合以下信息源：
- 财经新闻：Yahoo Finance、Bloomberg、Reuters
- 社交媒体：Twitter（财经大V）、Reddit（r/investing）
- 政府网站：FRED（经济数据）、SEC（财报文件）
- 输出格式：每条信息按"来源、标题、摘要、链接"排列
```

## 8. 性能优化建议

### 优化 1：限制搜索结果数量（节省 API 调用）

```
请将搜索结果数量从 10 调整为 5（适合盘中快速查询）
```

**原理**：每减少 1 个搜索结果，API 调用减少约 20%。

### 优化 2：启用缓存机制

```
请启用新闻缓存机制：
- 相同关键词的搜索结果，30 分钟内不再重复查询
- 摘要结果，2 小时内不再重新生成
```

**原理**：避免重复查询相同内容，减少 API 调用次数。

### 优化 3：分时段调整搜索深度

```
请根据时段调整搜索深度：
- 盘前（8:00-9:30）：使用 "advanced" 深度
- 盘中（9:30-15:00）：使用 "basic" 深度
- 盘后（15:00-18:00）：使用 "basic" 深度
```

**原理**：盘前需要深度信息，盘中只需快速概览。

## 9. 安全与合规提醒

### 提醒 1：不要依赖 AI 做投资决策

**重要提示**：本文所有内容仅为工具使用教程，**不构成任何投资建议**。AI 生成的内容可能存在：
- 信息滞后（新闻可能已被后续事件推翻）
- 数据错误（API 返回的数据可能不准确）
- 逻辑偏差（LLM 的因果推理可能存在偏差）

**建议**：所有投资决策前，务必：
1. 核对原始数据来源（如财报原文、官方新闻稿）
2. 咨询专业顾问（如有必要）
3. 从小仓位开始测试

### 提醒 2：保护 API Key

**安全建议**：
- 不要将 API Key 提交到公开仓库
- 定期轮换 API Key（建议每 3 个月）
- 启用 IP 白名单（如 Tavily 支持）

### 提醒 3：遵守数据使用条款

**合规建议**：
- Tavily API 仅用于个人非商业用途
- 不要批量抓取网页内容（可能违反网站 robots.txt）
- 不要将摘要结果用于商业分发（如付费订阅）

## 10. 总结：从"信息"到"洞察"

建议将简报当作“信息整理与复核入口”，把决策与下单留给人工：

- 盘前：用“盘前简报”快速建立当天关注清单
- 盘后：用“盘后总结”复盘事件与价格联动，补齐遗漏信息
- 每周：用“周度回顾”沉淀可复用的关注列表与规则

**下一步**：[Vibe Coding 实战](/cn/university/vibe-coding/)

## 附录：推荐信息源清单

### 财经新闻
- [Yahoo Finance](https://finance.yahoo.com/)：实时行情 + 新闻
- [Bloomberg](https://www.bloomberg.com/)：全球市场深度报道
- [Reuters](https://www.reuters.com/)：权威财经新闻
- [Investing.com](https://www.investing.com/)：技术分析 + 新闻

### 宏观数据
- [FRED](https://fred.stlouisfed.org/)：美联储经济数据
- [Trading Economics](https://tradingeconomics.com/)：全球宏观数据
- [CEIC Data](https://www.ceicdata.com/)：新兴市场数据

### 财报信息
- [SEC EDGAR](https://www.sec.gov/edgar)：美国公司财报
- [巨潮资讯](http://www.cninfo.com.cn/)：中国公司财报
- [Morningstar](https://www.morningstar.com/)：基金评级 + 财报分析

### 社交媒体
- [Twitter 财经大V](https://twitter.com/i/lists/123456789)：关注专业分析师
- [Reddit r/investing](https://www.reddit.com/r/investing/)：投资者讨论
- [雪球](https://xueqiu.com/)：中国投资者社区
