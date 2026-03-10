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
<<<<<<< Updated upstream
          { text: '领养龙虾', link: '/cn/adopt/chapter0' },
          { text: '🎓 龙虾大学', link: '/cn/adopt/lobster-university' },
=======
          { text: '领养龙虾', link: '/cn/adopt/intro' },
>>>>>>> Stashed changes
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
                  text: '🔵 光速上手',
                  collapsed: false,
                  items: [
                    { text: '第1章 AutoClaw 一键安装', link: '/cn/adopt/chapter1' },
                  ]
                },
                {
                  text: '🟢 手动安装',
                  collapsed: false,
                  items: [
                    { text: '第2章 手动安装 OpenClaw', link: '/cn/adopt/chapter2' },
                    { text: '第3章 接入聊天平台', link: '/cn/adopt/chapter3' },
                  ]
                },
                {
                  text: '🟡 日常使用',
                  collapsed: false,
                  items: [
                    { text: '第4章 命令行与基础配置', link: '/cn/adopt/chapter4' },
                    { text: '第5章 定时任务', link: '/cn/adopt/chapter5' },
                    { text: '第6章 技能系统入门', link: '/cn/adopt/chapter6' },
                  ]
                },
                {
                  text: '🟠 高级配置',
                  collapsed: true,
                  items: [
                    { text: '第7章 多平台与外部服务', link: '/cn/adopt/chapter7' },
                    { text: '第8章 多模型与成本优化', link: '/cn/adopt/chapter8' },
                    { text: '第9章 个性化定制', link: '/cn/adopt/chapter9' },
                  ]
                },
                {
                  text: '🔴 高级场景',
                  collapsed: true,
                  items: [
                    { text: '第10章 生产环境部署', link: '/cn/adopt/chapter10' },
                    { text: '第11章 开发者效率提升', link: '/cn/adopt/chapter11' },
                    { text: '第12章 故障排查与维护', link: '/cn/adopt/chapter12' },
                  ]
                },
              ]
            },
            {
              text: '附录',
              items: [
                { text: '附录 A：命令速查表', link: '/cn/appendix/appendix-a' },
                { text: '附录 B：配置文件详解', link: '/cn/appendix/appendix-b' },
                { text: '附录 C：技能开发模板', link: '/cn/appendix/appendix-c' },
                { text: '附录 D：学习资源汇总', link: '/cn/appendix/appendix-d' },
                { text: '附录 E：云服务部署指南', link: '/cn/appendix/appendix-e' },
                { text: '附录 F：社区之声与生态展望', link: '/cn/appendix/appendix-f' },
                { text: '附录 G：安全防护指南', link: '/cn/appendix/appendix-g' }
              ]
            }
          ],
          '/cn/appendix/': [
            {
              text: '领养 Claw（使用篇）',
              items: [
                { text: '写在开头', link: '/cn/adopt/intro' },
                {
                  text: '🔵 光速上手',
                  collapsed: false,
                  items: [
                    { text: '第1章 AutoClaw 一键安装', link: '/cn/adopt/chapter1' },
                  ]
                },
                {
                  text: '🟢 手动安装',
                  collapsed: false,
                  items: [
                    { text: '第2章 手动安装 OpenClaw', link: '/cn/adopt/chapter2' },
                    { text: '第3章 接入聊天平台', link: '/cn/adopt/chapter3' },
                  ]
                },
                {
                  text: '🟡 日常使用',
                  collapsed: false,
                  items: [
                    { text: '第4章 命令行与基础配置', link: '/cn/adopt/chapter4' },
                    { text: '第5章 定时任务', link: '/cn/adopt/chapter5' },
                    { text: '第6章 技能系统入门', link: '/cn/adopt/chapter6' },
                  ]
                },
                {
                  text: '🟠 高级配置',
                  collapsed: true,
                  items: [
                    { text: '第7章 多平台与外部服务', link: '/cn/adopt/chapter7' },
                    { text: '第8章 多模型与成本优化', link: '/cn/adopt/chapter8' },
                    { text: '第9章 个性化定制', link: '/cn/adopt/chapter9' },
                  ]
                },
                {
                  text: '🔴 高级场景',
                  collapsed: true,
                  items: [
                    { text: '第10章 生产环境部署', link: '/cn/adopt/chapter10' },
                    { text: '第11章 开发者效率提升', link: '/cn/adopt/chapter11' },
                    { text: '第12章 故障排查与维护', link: '/cn/adopt/chapter12' },
                  ]
                },
              ]
            },
            {
              text: '附录',
              items: [
                { text: '附录 A：命令速查表', link: '/cn/appendix/appendix-a' },
                { text: '附录 B：配置文件详解', link: '/cn/appendix/appendix-b' },
                { text: '附录 C：技能开发模板', link: '/cn/appendix/appendix-c' },
                { text: '附录 D：学习资源汇总', link: '/cn/appendix/appendix-d' },
                { text: '附录 E：云服务部署指南', link: '/cn/appendix/appendix-e' },
                { text: '附录 F：社区之声与生态展望', link: '/cn/appendix/appendix-f' },
                { text: '附录 G：安全防护指南', link: '/cn/appendix/appendix-g' }
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
          { text: 'Adopt', link: '/en/adopt/chapter0' },
          { text: 'Build', link: '/en/build/' },
          { text: 'GitHub', link: 'https://github.com/datawhalechina/hello-claw' },
        ],
        sidebar: {
          '/en/adopt/': [
            {
              text: 'Adopt Claw (User Guide)',
              items: [
                { text: 'Chapter 0: Introduction', link: '/en/adopt/chapter0' },
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
