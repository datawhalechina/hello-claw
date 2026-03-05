import { defineConfig } from 'vitepress'

const baseConfig = '/hello-claw/'

export default defineConfig({
  base: baseConfig,
  markdown: {
    math: true
  },
  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN',
      title: "Hello Claw",
      description: "从零到一学习 OpenClaw：领养你的 AI 龙虾助理，或从零构建属于你的智能体",
      themeConfig: {
        logo: '/logo.png',
        nav: [
          { text: '领养龙虾', link: '/cn/adopt/' },
          { text: '构建龙虾', link: '/cn/build/' },
          { text: 'GitHub', link: 'https://github.com/datawhalechina/hello-claw' },
        ],
        search: {
          provider: 'local',
          options: {
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档'
              },
              modal: {
                noResultsText: '无法找到相关结果',
                resetButtonTitle: '清除查询条件',
                footer: {
                  selectText: '选择',
                  navigateText: '切换'
                }
              }
            }
          }
        },
        sidebar: {
          '/cn/adopt/': [
            {
              text: '领养 Claw（使用篇）',
              items: [
                { text: '写在开头', link: '/cn/adopt/' },
                { text: '第1章 十分钟上手 OpenClaw', link: '/cn/adopt/chapter1' },
                { text: '第2章 理解 OpenClaw', link: '/cn/adopt/chapter2' },
                { text: '第3章 移动端接入', link: '/cn/adopt/chapter3' },
                { text: '第4章 自动化任务入门', link: '/cn/adopt/chapter4' },
                { text: '第5章 Skills 技能系统', link: '/cn/adopt/chapter5' },
                { text: '第6章 外部服务集成', link: '/cn/adopt/chapter6' },
                { text: '第7章 生产环境部署', link: '/cn/adopt/chapter7' },
                { text: '第8章 多模型与成本优化', link: '/cn/adopt/chapter8' },
                { text: '第9章 个人助理系统', link: '/cn/adopt/chapter9' },
                { text: '第10章 内容创作工具链', link: '/cn/adopt/chapter10' },
                { text: '第11章 开发者效率提升', link: '/cn/adopt/chapter11' },
                { text: '第12章 故障排查与优化', link: '/cn/adopt/chapter12' }
              ]
            }
          ],
          '/cn/build/': [
            {
              text: '构建 Claw（开发篇）',
              items: [
                { text: '写在开头', link: '/cn/build/' },
                { text: '第1章 Hello Agent', link: '/cn/build/chapter1' },
                { text: '第2章 工具调用', link: '/cn/build/chapter2' },
                { text: '第3章 Agent Loop', link: '/cn/build/chapter3' },
                { text: '第4章 Bash 工具', link: '/cn/build/chapter4' },
                { text: '第5章 解析 SKILL.md', link: '/cn/build/chapter5' },
                { text: '第6章 技能加载与触发', link: '/cn/build/chapter6' },
                { text: '第7章 编写第一个技能', link: '/cn/build/chapter7' },
                { text: '第8章 Telegram Bot', link: '/cn/build/chapter8' },
                { text: '第9章 消息路由', link: '/cn/build/chapter9' },
                { text: '第10章 飞书集成', link: '/cn/build/chapter10' },
                { text: '第11章 对话历史与 SOUL.md', link: '/cn/build/chapter11' },
                { text: '第12章 MEMORY.md 持久化', link: '/cn/build/chapter12' },
                { text: '第13章 Cron 调度器', link: '/cn/build/chapter13' },
                { text: '第14章 OpenClaw 源码导读', link: '/cn/build/chapter14' }
              ]
            }
          ]
        },
        socialLinks: [
          { icon: 'github', link: 'https://github.com/datawhalechina/hello-claw' }
        ],
        editLink: {
          pattern: 'https://github.com/datawhalechina/hello-claw/blob/main/docs/:path'
        },
        footer: {
          message: '<a href="https://beian.miit.gov.cn/" target="_blank">京ICP备2026002630号-1</a> | <a href="https://beian.mps.gov.cn/#/query/webSearch?code=11010602202215" rel="noreferrer" target="_blank">京公网安备11010602202215号</a>',
          copyright: '本作品采用 <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank">知识共享署名-非商业性使用-相同方式共享 4.0 国际许可协议（CC BY-NC-SA 4.0）</a> 进行许可'
        }
      }
    },
    en: {
      label: 'English',
      lang: 'en-US',
      title: "Hello Claw",
      description: "Learn OpenClaw from scratch: Adopt your AI lobster assistant or build your own agent",
      themeConfig: {
        logo: '/logo.png',
        nav: [
          { text: 'Adopt', link: '/en/adopt/' },
          { text: 'Build', link: '/en/build/' },
          { text: 'GitHub', link: 'https://github.com/datawhalechina/hello-claw' },
        ],
        sidebar: {
          '/en/adopt/': [
            {
              text: 'Adopt Claw (User Guide)',
              items: [
                { text: 'Introduction', link: '/en/adopt/' },
                { text: 'Chapter 1: Quick Start', link: '/en/adopt/chapter1' },
                { text: 'Chapter 2: Understanding OpenClaw', link: '/en/adopt/chapter2' },
                { text: 'Chapter 3: Mobile Access', link: '/en/adopt/chapter3' },
                { text: 'Chapter 4: Automation Basics', link: '/en/adopt/chapter4' },
                { text: 'Chapter 5: Skills System', link: '/en/adopt/chapter5' },
                { text: 'Chapter 6: External Services', link: '/en/adopt/chapter6' },
                { text: 'Chapter 7: Production Deployment', link: '/en/adopt/chapter7' },
                { text: 'Chapter 8: Multi-Model & Cost', link: '/en/adopt/chapter8' },
                { text: 'Chapter 9: Personal Assistant', link: '/en/adopt/chapter9' },
                { text: 'Chapter 10: Content Creation', link: '/en/adopt/chapter10' },
                { text: 'Chapter 11: Developer Productivity', link: '/en/adopt/chapter11' },
                { text: 'Chapter 12: Troubleshooting', link: '/en/adopt/chapter12' }
              ]
            }
          ],
          '/en/build/': [
            {
              text: 'Build Claw (Developer Guide)',
              items: [
                { text: 'Introduction', link: '/en/build/' },
                { text: 'Chapter 1: Hello Agent', link: '/en/build/chapter1' },
                { text: 'Chapter 2: Tool Calling', link: '/en/build/chapter2' },
                { text: 'Chapter 3: Agent Loop', link: '/en/build/chapter3' },
                { text: 'Chapter 4: Bash Tool', link: '/en/build/chapter4' },
                { text: 'Chapter 5: Parse SKILL.md', link: '/en/build/chapter5' },
                { text: 'Chapter 6: Skill Loading', link: '/en/build/chapter6' },
                { text: 'Chapter 7: First Skill', link: '/en/build/chapter7' },
                { text: 'Chapter 8: Telegram Bot', link: '/en/build/chapter8' },
                { text: 'Chapter 9: Message Router', link: '/en/build/chapter9' },
                { text: 'Chapter 10: Feishu Integration', link: '/en/build/chapter10' },
                { text: 'Chapter 11: SOUL.md', link: '/en/build/chapter11' },
                { text: 'Chapter 12: MEMORY.md', link: '/en/build/chapter12' },
                { text: 'Chapter 13: Cron Scheduler', link: '/en/build/chapter13' },
                { text: 'Chapter 14: OpenClaw Source', link: '/en/build/chapter14' }
              ]
            }
          ]
        },
        socialLinks: [
          { icon: 'github', link: 'https://github.com/datawhalechina/hello-claw' }
        ],
        editLink: {
          pattern: 'https://github.com/datawhalechina/hello-claw/blob/main/docs/:path'
        }
      }
    }
  }
})
