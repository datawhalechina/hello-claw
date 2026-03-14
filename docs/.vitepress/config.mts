import { defineConfig } from 'vitepress'
import tailwindcss from '@tailwindcss/vite'

const baseConfig = '/hello-claw/'

export default defineConfig({
  base: baseConfig,
  vite: {
    plugins: [tailwindcss()]
  },
  ignoreDeadLinks: [
    /^http:\/\/localhost/,
  ],
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
        logo: '🦞',
        outline: {
          level: [2, 3],
          label: '目录'
        },
        nav: [
          { text: '领养龙虾', link: '/cn/adopt/intro' },
          { text: '龙虾大学', link: '/cn/university/intro.html', activeMatch: '^/cn/university/' },
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
                { text: '写在开头', link: '/cn/adopt/intro' },
                {
                  text: '🔵 安装',
                  collapsed: false,
                  items: [
                    { text: '第1章 AutoClaw 一键安装', link: '/cn/adopt/chapter1' },
                    { text: '第2章 OpenClaw 手动安装', link: '/cn/adopt/chapter2' },
                    { text: '第3章 初始配置向导', link: '/cn/adopt/chapter3' },
                  ]
                },
                {
                  text: '🟢 核心配置',
                  collapsed: false,
                  items: [
                    { text: '第4章 聊天平台接入', link: '/cn/adopt/chapter4' },
                    { text: '第5章 模型管理', link: '/cn/adopt/chapter5' },
                    { text: '第6章 智能体管理', link: '/cn/adopt/chapter6' },
                  ]
                },
                {
                  text: '🟡 扩展运维',
                  collapsed: false,
                  items: [
                    { text: '第7章 工具与定时任务', link: '/cn/adopt/chapter7' },
                    { text: '第8章 网关运维', link: '/cn/adopt/chapter8' },
                    { text: '第9章 远程访问与网络', link: '/cn/adopt/chapter9' },
                  ]
                },
                {
                  text: '🔴 安全与客户端',
                  collapsed: false,
                  items: [
                    { text: '第10章 安全防护与威胁模型', link: '/cn/adopt/chapter10' },
                    { text: '第11章 Web 界面与客户端', link: '/cn/adopt/chapter11' },
                  ]
                },
              ]
            },
            {
              text: '附录',
              items: [
                { text: '附录 A：学习资源汇总', link: '/cn/appendix/appendix-a' },
                { text: '附录 B：社区之声与生态展望', link: '/cn/appendix/appendix-b' },
                { text: '附录 C：类 Claw 方案对比与选型', link: '/cn/appendix/appendix-c' },
                { text: '附录 D：技能开发与发布指南', link: '/cn/appendix/appendix-d' },
                { text: '附录 E：模型提供商选型指南', link: '/cn/appendix/appendix-e' },
                { text: '附录 F：命令速查表', link: '/cn/appendix/appendix-f' },
                { text: '附录 G：配置文件详解', link: '/cn/appendix/appendix-g' }
              ]
            }
          ],
          '/cn/appendix/': [
            {
              text: '领养 Claw（使用篇）',
              items: [
                { text: '写在开头', link: '/cn/adopt/intro' },
                {
                  text: '🔵 安装',
                  collapsed: false,
                  items: [
                    { text: '第1章 AutoClaw 一键安装', link: '/cn/adopt/chapter1' },
                    { text: '第2章 OpenClaw 手动安装', link: '/cn/adopt/chapter2' },
                    { text: '第3章 初始配置向导', link: '/cn/adopt/chapter3' },
                  ]
                },
                {
                  text: '🟢 核心配置',
                  collapsed: false,
                  items: [
                    { text: '第4章 聊天平台接入', link: '/cn/adopt/chapter4' },
                    { text: '第5章 模型管理', link: '/cn/adopt/chapter5' },
                    { text: '第6章 智能体管理', link: '/cn/adopt/chapter6' },
                  ]
                },
                {
                  text: '🟡 扩展运维',
                  collapsed: false,
                  items: [
                    { text: '第7章 工具与定时任务', link: '/cn/adopt/chapter7' },
                    { text: '第8章 网关运维', link: '/cn/adopt/chapter8' },
                    { text: '第9章 远程访问与网络', link: '/cn/adopt/chapter9' },
                  ]
                },
                {
                  text: '🔴 安全与客户端',
                  collapsed: false,
                  items: [
                    { text: '第10章 安全防护与威胁模型', link: '/cn/adopt/chapter10' },
                    { text: '第11章 Web 界面与客户端', link: '/cn/adopt/chapter11' },
                  ]
                },
              ]
            },
            {
              text: '附录',
              items: [
                { text: '附录 A：学习资源汇总', link: '/cn/appendix/appendix-a' },
                { text: '附录 B：社区之声与生态展望', link: '/cn/appendix/appendix-b' },
                { text: '附录 C：类 Claw 方案对比与选型', link: '/cn/appendix/appendix-c' },
                { text: '附录 D：技能开发与发布指南', link: '/cn/appendix/appendix-d' },
                { text: '附录 E：模型提供商选型指南', link: '/cn/appendix/appendix-e' },
                { text: '附录 F：命令速查表', link: '/cn/appendix/appendix-f' },
                { text: '附录 G：配置文件详解', link: '/cn/appendix/appendix-g' }
              ]
            }
          ],
          '/cn/build/': [
            {
              text: '构建 Claw（开发篇）',
              items: [
                { text: '写在开头', link: '/cn/build/' },
                { text: '第1章 核心定位与设计理念', link: '/cn/build/chapter1' },
                { text: '第2章 整体架构解析', link: '/cn/build/chapter2' },
                { text: '第3章 提示词系统', link: '/cn/build/chapter3' },
                { text: '第4章 工具系统', link: '/cn/build/chapter4' },
                { text: '第5章 消息循环与事件驱动', link: '/cn/build/chapter5' },
                { text: '第6章 多渠道接入', link: '/cn/build/chapter6' },
                { text: '第7章 轻量化方案', link: '/cn/build/chapter7' },
                { text: '第8章 安全加固方案', link: '/cn/build/chapter8' },
                { text: '第9章 硬件方案', link: '/cn/build/chapter9' },
                { text: '第10章 案例对比总结', link: '/cn/build/chapter10' },
                { text: '第11章 定制路径概览', link: '/cn/build/chapter11' },
                { text: '第12章 配置文件级定制', link: '/cn/build/chapter12' },
                { text: '第13章 Skill 编写', link: '/cn/build/chapter13' },
                { text: '第14章 渠道接入', link: '/cn/build/chapter14' },
                { text: '第15章 完整定制案例', link: '/cn/build/chapter15' }
              ]
            }
          ],
          '/cn/university/': [
            {
              text: '龙虾大学',
              items: [
                { text: '写在开头', link: '/cn/university/intro' },
                { text: 'Skills 选修指南', link: '/cn/university/' },
                { text: '邮箱助手实战（163）', link: '/cn/university/email-assistant/' },
                { text: '多智能体协作（HiClaw）', link: '/cn/university/multi-claw-hiclaw/' },
                { text: '安全防护清单', link: '/cn/university/security/' },
                { text: 'Vibe Coding 实战', link: '/cn/university/vibe-coding/' },
                { text: '金融实战', link: '/cn/university/finance.html' }
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
        logo: '🦞',
        nav: [
          { text: 'Adopt', link: '/en/adopt/intro' },
          { text: 'Build', link: '/en/build/' },
          { text: 'GitHub', link: 'https://github.com/datawhalechina/hello-claw' },
        ],
        sidebar: {
          '/en/adopt/': [
            {
              text: 'Adopt Claw (User Guide)',
              items: [
                { text: 'Chapter 0: Introduction', link: '/en/adopt/intro' },
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
                { text: 'Chapter 1: Core Concepts & Design', link: '/en/build/chapter1' },
                { text: 'Chapter 2: Architecture Overview', link: '/en/build/chapter2' },
                { text: 'Chapter 3: Prompt System', link: '/en/build/chapter3' },
                { text: 'Chapter 4: Tool System', link: '/en/build/chapter4' },
                { text: 'Chapter 5: Message Loop & Events', link: '/en/build/chapter5' },
                { text: 'Chapter 6: Multi-Channel Integration', link: '/en/build/chapter6' },
                { text: 'Chapter 7: Lightweight Solutions', link: '/en/build/chapter7' },
                { text: 'Chapter 8: Security Hardening', link: '/en/build/chapter8' },
                { text: 'Chapter 9: Hardware Solutions', link: '/en/build/chapter9' },
                { text: 'Chapter 10: Case Comparison', link: '/en/build/chapter10' },
                { text: 'Chapter 11: Customization Roadmap', link: '/en/build/chapter11' },
                { text: 'Chapter 12: Configuration Customization', link: '/en/build/chapter12' },
                { text: 'Chapter 13: Skill Development', link: '/en/build/chapter13' },
                { text: 'Chapter 14: Channel Integration', link: '/en/build/chapter14' },
                { text: 'Chapter 15: Complete Cases', link: '/en/build/chapter15' }
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
