<template>
  <div v-if="isHome" class="min-h-screen bg-[#050a10] text-white font-sans relative selection:bg-[#ff6b6b]/30">
    <!-- StarryBackground -->
    <div class="fixed inset-0 z-0 overflow-hidden bg-[#050a10] pointer-events-none">
      <div v-for="star in stars" :key="star.id" class="absolute rounded-full bg-white" :style="{ left: `${star.x}%`, top: `${star.y}%`, width: `${star.size}px`, height: `${star.size}px`, opacity: star.opacity }" />
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(255,80,80,0.15),transparent_60%)]" />
    </div>
    
    <div class="relative z-10 flex flex-col items-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      <!-- Hero Section -->
      <div class="flex flex-col items-center text-center max-w-3xl fade-in-init">
        <!-- Mascot / Logo -->
        <div 
          @mouseenter="isHovered = true"
          @mouseleave="isHovered = false"
          @click="triggerHappyJump"
          :class="['mb-6 drop-shadow-[0_0_30px_rgba(255,77,77,0.35)] cursor-pointer lobster-anim', { 'hovered': isHovered, 'happy': isHappy }]"
        >
          <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-32 h-32 md:w-40 md:h-40">
            <!-- Lobster Claw Silhouette -->
            <path d="M60 10 C30 10 15 35 15 55 C15 75 30 95 45 100 L45 110 L55 110 L55 100 C55 100 60 102 65 100 L65 110 L75 110 L75 100 C90 95 105 75 105 55 C105 35 90 10 60 10Z" fill="url(#lobster-gradient)" class="claw-body"></path>
            <!-- Left Claw -->
            <path d="M20 45 C5 40 0 50 5 60 C10 70 20 65 25 55 C28 48 25 45 20 45Z" fill="url(#lobster-gradient)" :class="['claw-left', { waving: isHovered }]"></path>
            <!-- Right Claw -->
            <path d="M100 45 C115 40 120 50 115 60 C110 70 100 65 95 55 C92 48 95 45 100 45Z" fill="url(#lobster-gradient)" :class="['claw-right', { waving: isHovered }]"></path>
            <!-- Antenna -->
            <path d="M45 15 Q35 5 30 8" stroke="#d84d4d" stroke-width="2" stroke-linecap="round" class="antenna"></path>
            <path d="M75 15 Q85 5 90 8" stroke="#d84d4d" stroke-width="2" stroke-linecap="round" class="antenna"></path>
            <!-- Eyes -->
            <circle cx="45" cy="35" r="6" fill="#050810" class="eye"></circle>
            <circle cx="75" cy="35" r="6" fill="#050810" class="eye"></circle>
            <circle :cx="46 + eyeOffsetX" :cy="34 + eyeOffsetY" r="2" fill="#00e5cc" class="eye-glow"></circle>
            <circle :cx="76 + eyeOffsetX" :cy="34 + eyeOffsetY" r="2" fill="#00e5cc" class="eye-glow"></circle>
            <path d="M52 45 Q60 52 68 45" stroke="#ffd3d3" stroke-width="2" stroke-linecap="round" :class="['lobster-smile', { visible: isHappy }]"></path>
            <defs>
              <linearGradient id="lobster-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#ff8c8c"></stop>
                <stop offset="100%" stop-color="#ff4d4d"></stop>
              </linearGradient>
            </defs>
          </svg>
        </div>

        <h1 class="!text-5xl md:!text-7xl !leading-none font-bold !tracking-[0.25em] !mt-0 !mb-4 !pl-[0.25em]">
          <span class="text-[#ff4d4d]">
            HelloClaw
          </span>
        </h1>
        
        <h2 class="!text-6xl md:!text-8xl !leading-none font-black !tracking-[0.12em] uppercase !mt-0 !mb-8 !border-0 !pt-0">
          <span class="animate-gradient-text">
            哈喽！龙虾
          </span> 👋
        </h2>

        <p class="!text-lg md:!text-xl text-gray-400 !mt-0 !mb-10 max-w-2xl !leading-relaxed">
          你的 OpenClaw 终极助手。清理收件箱、发送邮件、管理日历、办理登机牌。一切都在你常用的聊天软件中完成。
        </p>

        <div class="flex flex-col sm:flex-row items-center gap-4 mb-12">
          <a
            :href="withBase('/cn/adopt/intro')"
            class="w-full sm:w-auto group flex items-center justify-center gap-2 bg-[#ff4d4d] hover:bg-[#ff6b6b] text-white font-bold rounded-full py-3 px-7 transition-all duration-300 hover:scale-105 active:scale-95"
          >
            领养龙虾 <span class="opacity-80 group-hover:opacity-100 transition-opacity">→</span>
          </a>
          <a
            :href="withBase('/cn/adopt/lobster-university')"
            class="w-full sm:w-auto group flex items-center justify-center gap-2 bg-[#0f1623] hover:bg-white/10 border border-[#ff4d4d]/30 text-white font-bold rounded-full py-3 px-7 transition-all duration-300 hover:scale-105 active:scale-95"
          >
            🎓 龙虾大学 <span class="text-[#ff4d4d] group-hover:text-[#ff6b6b] transition-colors">→</span>
          </a>
          <a
            :href="withBase('/cn/build/')"
            class="w-full sm:w-auto group flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold rounded-full py-3 px-7 transition-all duration-300 hover:scale-105 active:scale-95"
          >
            构建龙虾 <span class="text-[#ff4d4d] group-hover:text-[#ff6b6b] transition-colors">→</span>
          </a>
          <a
            href="https://github.com/datawhalechina/hello-claw"
            target="_blank"
            class="w-full sm:w-auto group flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold rounded-full py-3 px-7 transition-all duration-300 hover:scale-105 active:scale-95"
          >
            GitHub <span class="text-[#ff4d4d] group-hover:text-[#ff6b6b] transition-colors">→</span>
          </a>
        </div>

        <a :href="withBase('/cn/build/chapter7')" class="group flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full py-2 px-4 md:px-6 transition-all duration-300 mb-20 hover:scale-105 active:scale-95 cursor-pointer">
          <span class="bg-[#ff4d4d] text-white text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
            New
          </span>
          <span class="text-sm md:text-base text-gray-300 group-hover:text-white transition-colors">
            构建篇第 7-9 章上线：轻量化 / 安全加固 / 硬件方案
          </span>
          <span class="text-gray-500 group-hover:text-white transition-colors">→</span>
        </a>
      </div>

      <div v-fade-in class="w-full max-w-5xl">
        <div class="flex items-center justify-between mb-8">
          <h3 class="!text-3xl md:!text-4xl !font-extrabold !leading-tight flex items-center gap-2">
            <span class="text-[#ff4d4d]">&gt;</span> 推荐章节
          </h3>
          <a :href="withBase('/cn/adopt/intro')" class="text-[#ff4d4d] hover:text-[#ff6b6b] text-sm font-medium flex items-center gap-1 transition-colors">
            从第 0 章开始 <span>→</span>
          </a>
        </div>

        <div class="relative overflow-hidden rounded-2xl border border-white/5 bg-[#0f1623] shadow-xl">
          <div class="marquee w-max flex items-stretch gap-6 py-6 px-6">
            <a
              v-for="(item, idx) in tickerItems"
              :key="`${item.title}-${idx}`"
              :href="withBase(item.link)"
              class="block w-[280px] md:w-[360px] shrink-0 whitespace-normal bg-[#0a0f18] border border-white/5 rounded-2xl p-6 shadow-lg hover:-translate-y-1 transition-transform"
            >
              <div class="flex items-center justify-between mb-3">
                <span class="text-xs uppercase tracking-wider text-gray-500">{{ item.track }}</span>
                <span class="text-[#ff4d4d] text-xs font-bold">→</span>
              </div>
              <h4 class="!text-xl !font-extrabold !leading-snug !m-0 text-white">{{ item.title }}</h4>
              <p class="text-gray-400 text-sm mt-3 mb-0 leading-relaxed">{{ item.summary }}</p>
            </a>
          </div>
        </div>
      </div>

      <!-- Quick Start Section -->
      <div v-fade-in class="w-full max-w-5xl mt-32">
        <h3 class="!text-3xl md:!text-4xl !font-extrabold !leading-tight flex items-center gap-2 mb-8">
          <span class="text-[#ff4d4d]">&gt;</span> Quick Start
        </h3>
        
        <div class="bg-[#0f1623] border border-white/5 rounded-2xl overflow-hidden shadow-xl">
          <div class="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-[#0a0f18]">
            <div class="flex items-center gap-4">
              <div class="flex gap-1.5">
                <div class="w-3 h-3 rounded-full bg-[#ff5f56]" />
                <div class="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <div class="w-3 h-3 rounded-full bg-[#27c93f]" />
              </div>
              <div class="flex gap-2">
                <button
                  @click="quickStartMode = 'powershell'"
                  :class="quickStartMode === 'powershell' ? 'bg-[#00e5ff] text-black' : 'text-gray-400 hover:text-white'"
                  class="text-xs font-bold px-3 py-1 rounded transition-colors"
                >
                  PowerShell
                </button>
                <button
                  @click="quickStartMode = 'macos'"
                  :class="quickStartMode === 'macos' ? 'bg-[#00e5ff] text-black' : 'text-gray-400 hover:text-white'"
                  class="text-xs font-bold px-3 py-1 rounded transition-colors"
                >
                  macOS
                </button>
                <button
                  @click="quickStartMode = 'linux'"
                  :class="quickStartMode === 'linux' ? 'bg-[#00e5ff] text-black' : 'text-gray-400 hover:text-white'"
                  class="text-xs font-bold px-3 py-1 rounded transition-colors"
                >
                  Linux
                </button>
              </div>
            </div>
            <div class="flex items-center gap-4">
              <span class="text-gray-400 text-xs">{{ quickStartLabel }}</span>
              <span class="border border-white/10 text-gray-400 text-xs px-2 py-0.5 rounded flex items-center gap-1">
                β BETA
              </span>
            </div>
          </div>
          
          <div class="p-6 font-mono text-sm">
            <p class="text-gray-500 mb-4"># 复制粘贴即可开始：安装 → 配置 → 第一次对话</p>
            <div class="flex items-start justify-between gap-4 group">
              <div class="flex items-start gap-3 w-full">
                <span class="text-[#ff4d4d] mt-[2px]">$</span>
                <pre class="text-gray-300 whitespace-pre-wrap break-words w-full m-0">{{ quickStartCommand }}</pre>
              </div>
              <button @click="copyCommand" class="shrink-0 p-2 rounded bg-white/5 text-gray-400 hover:text-white opacity-0 group-hover:opacity-100 transition-all">
                <span v-if="copied">✓</span>
                <span v-else>📋</span>
              </button>
            </div>
          </div>
        </div>
        <p class="text-center text-gray-500 text-sm mt-4">
          以上命令来自本教程「第 1 章」的安装步骤，按你的系统选择即可。
        </p>
      </div>

      <!-- What It Does Section -->
      <div v-fade-in class="w-full max-w-5xl mt-32">
        <h3 class="!text-3xl md:!text-4xl !font-extrabold !leading-tight flex items-center gap-2 mb-8">
          <span class="text-[#ff4d4d]">&gt;</span> 这套教程能带你做什么
        </h3>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="bg-[#0f1623] border border-white/5 rounded-2xl p-8 flex flex-col items-center text-center gap-4 shadow-xl hover:-translate-y-1 transition-transform">
            <div class="text-[#ff4d4d] mb-2 text-3xl">🦞</div>
            <h4 class="!text-2xl !font-extrabold text-white">领养你的龙虾</h4>
            <p class="text-gray-400 !text-base !leading-relaxed">从安装配置到常用命令，再到自动化任务与 Skills，把 OpenClaw 真正用起来。</p>
          </div>
          <div class="bg-[#0f1623] border border-white/5 rounded-2xl p-8 flex flex-col items-center text-center gap-4 shadow-xl hover:-translate-y-1 transition-transform">
            <div class="text-[#ff4d4d] mb-2 text-3xl">🛠️</div>
            <h4 class="!text-2xl !font-extrabold text-white">从零构建龙虾</h4>
            <p class="text-gray-400 !text-base !leading-relaxed">拆解 OpenClaw 内部机制，理解提示词/工具/消息循环，并走向可定制的 Agent。</p>
          </div>
          <div class="bg-[#0f1623] border border-white/5 rounded-2xl p-8 flex flex-col items-center text-center gap-4 shadow-xl hover:-translate-y-1 transition-transform">
            <div class="text-[#ff4d4d] mb-2 text-3xl">📱</div>
            <h4 class="!text-2xl !font-extrabold text-white">移动端随叫随到</h4>
            <p class="text-gray-400 !text-base !leading-relaxed">把龙虾接入 QQ / 飞书 / Telegram，在常用聊天软件里完成日常工作流。</p>
          </div>
          <div class="bg-[#0f1623] border border-white/5 rounded-2xl p-8 flex flex-col items-center text-center gap-4 shadow-xl hover:-translate-y-1 transition-transform">
            <div class="text-[#ff4d4d] mb-2 text-3xl">⚡</div>
            <h4 class="!text-2xl !font-extrabold text-white">让它自动做事</h4>
            <p class="text-gray-400 !text-base !leading-relaxed">定时简报、自动化报告、周期性任务，从“对话”升级为“系统”。</p>
          </div>
          <div class="bg-[#0f1623] border border-white/5 rounded-2xl p-8 flex flex-col items-center text-center gap-4 shadow-xl hover:-translate-y-1 transition-transform">
            <div class="text-[#ff4d4d] mb-2 text-3xl">🧭</div>
            <h4 class="!text-2xl !font-extrabold text-white">按路线学习</h4>
            <p class="text-gray-400 !text-base !leading-relaxed">按章节递进：先上手、再实战、再拆解原理，最后进入定制与扩展。</p>
          </div>
          <div class="bg-[#0f1623] border border-white/5 rounded-2xl p-8 flex flex-col items-center text-center gap-4 shadow-xl hover:-translate-y-1 transition-transform">
            <div class="text-[#ff4d4d] mb-2 text-3xl">🤝</div>
            <h4 class="!text-2xl !font-extrabold text-white">一起完善</h4>
            <p class="text-gray-400 !text-base !leading-relaxed">欢迎提交 PR / Issue：补充案例、修正文档、一起把教程打磨成“能用”的版本。</p>
          </div>
        </div>
      </div>

      <!-- Works With Everything Section -->
      <div v-fade-in class="w-full max-w-5xl mt-32 flex flex-col items-center">
        <div class="w-full">
          <h3 class="!text-3xl md:!text-4xl !font-extrabold !leading-tight flex items-center gap-2 mb-8">
            <span class="text-[#ff4d4d]">&gt;</span> 直接跳转
          </h3>
        </div>
        
        <div class="flex flex-wrap justify-center gap-4 max-w-4xl mb-8">
          <a
            v-for="item in quickLinks"
            :key="item.text"
            :href="item.external ? item.link : withBase(item.link)"
            :target="item.external ? '_blank' : undefined"
            :rel="item.external ? 'noreferrer' : undefined"
            class="flex items-center gap-2 bg-[#0f1623] border border-white/5 rounded-full px-4 py-2 hover:bg-white/5 transition-colors"
          >
            <span class="text-lg">{{ item.icon }}</span>
            <span class="text-sm text-gray-300">{{ item.text }}</span>
          </a>
        </div>
        
        <div class="flex items-center gap-6 text-[#ff4d4d] text-sm font-medium">
          <a :href="withBase('/cn/adopt/intro')" class="hover:text-[#ff6b6b] transition-colors flex items-center gap-1">
            从「写在开头」开始 <span>→</span>
          </a>
          <span class="text-gray-600">•</span>
          <a :href="withBase('/cn/build/')" class="hover:text-[#ff6b6b] transition-colors flex items-center gap-1">
            直接进入「构建篇」 <span>→</span>
          </a>
        </div>
      </div>

      <!-- Footer -->
      <footer class="mt-32 pb-16 text-center w-full max-w-3xl">
        <div class="flex justify-center gap-6 text-[#ff4d4d] text-sm mb-8">
          <a :href="withBase('/cn/adopt/intro')" class="hover:text-[#ff6b6b] transition-colors">领养龙虾</a>
          <span class="text-gray-600">•</span>
          <a :href="withBase('/cn/adopt/lobster-university')" class="hover:text-[#ff6b6b] transition-colors">🎓 龙虾大学</a>
          <span class="text-gray-600">•</span>
          <a :href="withBase('/cn/build/')" class="hover:text-[#ff6b6b] transition-colors">构建龙虾</a>
          <span class="text-gray-600">•</span>
          <a href="https://github.com/datawhalechina/hello-claw" target="_blank" rel="noreferrer" class="hover:text-[#ff6b6b] transition-colors">GitHub</a>
          <span class="text-gray-600">•</span>
          <a href="https://github.com/datawhalechina/hello-claw/issues" target="_blank" rel="noreferrer" class="hover:text-[#ff6b6b] transition-colors">提 Issue</a>
        </div>
        
        <p class="text-gray-400 text-sm mb-4">
          由 <span class="text-[#ff4d4d]">Datawhale 社区</span>维护的 OpenClaw 学习教程：从领养到构建，循序渐进上手与进阶。
        </p>
        
        <p class="text-gray-600 text-xs">
          内容采用 <a class="text-[#ff4d4d] hover:text-[#ff6b6b] transition-colors" href="http://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank" rel="noreferrer">CC BY-NC-SA 4.0</a> 许可协议发布。
        </p>
      </footer>
    </div>
  </div>
  <div v-else-if="isLobsterUniversity" class="min-h-screen bg-[#050a10] text-white font-sans relative selection:bg-[#ff6b6b]/30">
    <div class="fixed inset-0 z-0 overflow-hidden bg-[#050a10] pointer-events-none">
      <div v-for="star in stars" :key="`u-${star.id}`" class="absolute rounded-full bg-white" :style="{ left: `${star.x}%`, top: `${star.y}%`, width: `${star.size}px`, height: `${star.size}px`, opacity: star.opacity }" />
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(255,80,80,0.15),transparent_60%)]" />
    </div>

    <div class="relative z-10 flex flex-col items-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div class="flex flex-col items-center text-center max-w-4xl">
        <span class="bg-[#ff4d4d]/20 border border-[#ff4d4d]/40 text-[#ff9f9f] text-sm font-bold px-4 py-1.5 rounded-full mb-6">
          🎓 Lobster University
        </span>
        <h1 class="!text-4xl md:!text-6xl !leading-tight !font-black !m-0">
          🎓 龙虾大学
        </h1>
        <div class="flex flex-col sm:flex-row sm:flex-wrap items-center justify-center gap-4 mt-10 mb-14">
          <a href="https://clawhub.ai/" target="_blank" rel="noreferrer" class="w-full sm:w-auto group flex items-center justify-center gap-2 bg-[#ff4d4d] hover:bg-[#ff6b6b] text-white font-bold rounded-full py-3 px-7 transition-all duration-300 hover:scale-105 active:scale-95">
            ClawHub 搜技能 <span class="opacity-80 group-hover:opacity-100 transition-opacity">→</span>
          </a>
          <a href="https://github.com/VoltAgent/awesome-openclaw-skills" target="_blank" rel="noreferrer" class="w-full sm:w-auto group flex items-center justify-center gap-2 bg-[#0f1623] hover:bg-white/10 border border-[#ff4d4d]/30 text-white font-bold rounded-full py-3 px-7 transition-all duration-300 hover:scale-105 active:scale-95">
            5494+ 分类清单 <span class="text-[#ff4d4d] group-hover:text-[#ff6b6b] transition-colors">→</span>
          </a>
          <a :href="withBase('/cn/adopt/intro')" class="w-full sm:w-auto group flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold rounded-full py-3 px-7 transition-all duration-300 hover:scale-105 active:scale-95">
            领养龙虾 <span class="text-[#ff4d4d] group-hover:text-[#ff6b6b] transition-colors">→</span>
          </a>
          <a :href="withBase('/cn/build/')" class="w-full sm:w-auto group flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold rounded-full py-3 px-7 transition-all duration-300 hover:scale-105 active:scale-95">
            构建龙虾 <span class="text-[#ff4d4d] group-hover:text-[#ff6b6b] transition-colors">→</span>
          </a>
          <a :href="withBase('/')" class="w-full sm:w-auto group flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold rounded-full py-3 px-7 transition-all duration-300 hover:scale-105 active:scale-95">
            返回首页 <span class="text-[#ff4d4d] group-hover:text-[#ff6b6b] transition-colors">→</span>
          </a>
        </div>
        <h2 class="w-full max-w-5xl !text-3xl md:!text-4xl !font-extrabold !leading-tight flex items-center gap-2 mt-2 mb-8">
          <span class="text-[#ff4d4d]">&gt;</span> 1) 为何龙虾需要 Skills？
        </h2>
        <div class="w-full max-w-5xl mb-14 bg-[#0f1623]/80 border border-white/10 rounded-2xl p-6 md:p-8 text-left">
          <p class="!text-lg md:!text-xl text-gray-200 !m-0 !leading-relaxed">
            龙虾之所以能“做事情”，不是因为会聊天，而是因为它会调用工具。Skills 本质上是“能力包”：里面定义了什么时候调用什么工具、需要哪些参数、遇到错误怎么处理。模型负责理解你的意图，Skills 负责把意图落地成可执行动作。
          </p>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-3 mt-5">
            <div class="bg-black/20 border border-white/5 rounded-xl p-4">
              <div class="text-[#ff9f9f] font-bold mb-1">理解意图</div>
              <div class="text-sm text-gray-300">你说“查邮件、发周报”，模型先拆任务</div>
            </div>
            <div class="bg-black/20 border border-white/5 rounded-xl p-4">
              <div class="text-[#ff9f9f] font-bold mb-1">调用能力</div>
              <div class="text-sm text-gray-300">Skills 把任务映射到 Gmail、GitHub、浏览器等工具</div>
            </div>
            <div class="bg-black/20 border border-white/5 rounded-xl p-4">
              <div class="text-[#ff9f9f] font-bold mb-1">返回结果</div>
              <div class="text-sm text-gray-300">执行、校验、重试后把可用结果回传给你</div>
            </div>
          </div>
          <p class="text-gray-300 !mb-0 !mt-4 !leading-relaxed">
            龙虾不是天生全能，装对 Skills 才会变强。别贪多，装太多会污染上下文。先挑 5~10 个高频技能，跑通你的自动化闭环，再逐步扩容。
          </p>
        </div>
      </div>

      <div class="w-full max-w-5xl mb-14">
        <h2 class="!text-3xl md:!text-4xl !font-extrabold !leading-tight flex items-center gap-2 mb-8">
          <span class="text-[#ff4d4d]">&gt;</span> 2) ClawHub 安装、Token 配置与推荐技能
        </h2>
        <div class="bg-[#0f1623] border border-white/5 rounded-2xl overflow-hidden shadow-xl">
          <div class="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="bg-black/20 border border-white/5 rounded-xl p-4">
              <div class="text-[#ff9f9f] font-bold mb-2">全局安装</div>
              <pre class="text-sm text-gray-300 whitespace-pre-wrap break-words m-0">npm i -g clawhub
clawhub install &lt;skill-slug&gt;</pre>
            </div>
            <div class="bg-black/20 border border-white/5 rounded-xl p-4">
              <div class="text-[#ff9f9f] font-bold mb-2">Token 登录（推荐先做，访问更稳更快）</div>
              <pre class="text-sm text-gray-300 whitespace-pre-wrap break-words m-0"># 1) 去 clawhub.ai -> Settings -> API tokens 创建 token
# 2) CLI 登录
clawhub login --token &lt;你的token&gt;
# 3) 验证登录
clawhub whoami</pre>
            </div>
            <div class="bg-black/20 border border-white/5 rounded-xl p-4 md:col-span-2">
              <div class="text-[#ff9f9f] font-bold mb-2">常用搜索与安装</div>
              <pre class="text-sm text-gray-300 whitespace-pre-wrap break-words m-0">clawhub search github
clawhub search email
clawhub search browser
clawhub install github</pre>
            </div>
            <div class="bg-black/20 border border-white/5 rounded-xl p-4 md:col-span-2">
              <div class="text-[#ff9f9f] font-bold mb-2">网上最常见的新手 10 个推荐技能（可直接装）</div>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div v-for="skill in topRecommendedSkills" :key="skill.name" class="bg-[#0f1623] border border-white/5 rounded-lg px-3 py-2">
                  <div class="text-sm text-gray-100 font-semibold">{{ skill.name }}</div>
                  <div class="text-xs text-gray-400 mt-1">{{ skill.desc }}</div>
                  <pre class="text-xs text-[#ffb3b3] whitespace-pre-wrap break-words m-0 mt-2">{{ skill.command }}</pre>
                </div>
              </div>
            </div>
            <div class="bg-black/20 border border-white/5 rounded-xl p-4 md:col-span-2">
              <div class="text-[#ff9f9f] font-bold mb-2">快速认知补齐路径</div>
              <div class="text-sm text-gray-300 leading-relaxed">
                第一推荐方法：先用 ClawHub 搜和装，再去 awesome-openclaw-skills 按分类找灵感，网上搜索 clawhub 的资料快速补齐认知。
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="w-full max-w-6xl mt-2">
        <h2 class="!text-3xl md:!text-4xl !font-extrabold !leading-tight flex items-center gap-2 mb-8 mt-2">
          <span class="text-[#ff4d4d]">&gt;</span> 3) Skills 展示板
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <div v-for="category in lobsterCategories" :key="category.title" class="bg-[#0f1623] border border-white/5 rounded-2xl p-5 shadow-xl">
            <div class="flex items-center justify-between mb-4">
              <h3 class="!m-0 !text-xl !font-extrabold flex items-center gap-2">
                <span>{{ category.icon }}</span>
                <span>{{ category.title }}</span>
              </h3>
              <span class="text-xs px-2 py-1 rounded-full bg-white/5 text-gray-400">{{ category.count }}</span>
            </div>
            <div class="space-y-2">
              <div v-for="skill in category.skills" :key="skill.name" class="flex items-center justify-between text-sm bg-black/20 border border-white/5 rounded-lg px-3 py-2">
                <span class="text-gray-100 font-medium">{{ skill.name }}</span>
                <span class="text-gray-400">{{ skill.note }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Layout v-else />
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, withBase } from 'vitepress'
import DefaultTheme from 'vitepress/theme'

const { Layout } = DefaultTheme
const route = useRoute()
const isHome = computed(() => {
  const path = route.path
  return path === '/' || path === '/index.html' || 
         path === '/hello-claw/' || path === '/hello-claw/index.html'
})
const isLobsterUniversity = computed(() => {
  const path = route.path
  return path === '/cn/adopt/lobster-university' ||
    path === '/cn/adopt/lobster-university.html' ||
    path === '/hello-claw/cn/adopt/lobster-university' ||
    path === '/hello-claw/cn/adopt/lobster-university.html'
})

const isHovered = ref(false)
const isHappy = ref(false)
const copied = ref(false)
const eyeOffsetX = ref(0)
const eyeOffsetY = ref(0)

const quickStartMode = ref('powershell')

const quickStartPresets = {
  powershell: {
    label: 'Windows (PowerShell)',
    command: `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
iwr -useb https://openclaw.ai/install.ps1 | iex
openclaw onboard --install-daemon`,
  },
  macos: {
    label: 'macOS',
    command: `brew install node@22
npm install -g openclaw@latest
openclaw onboard --install-daemon`,
  },
  linux: {
    label: 'Linux / WSL2',
    command: `curl -fsSL https://deb.nodesource.com/setup_22.x | sudo bash -
sudo apt install -y nodejs
npm install -g openclaw@latest
openclaw onboard --install-daemon`,
  },
}

const quickStartLabel = computed(() => quickStartPresets[quickStartMode.value].label)
const quickStartCommand = computed(() => quickStartPresets[quickStartMode.value].command)

const stars = Array.from({ length: 100 }).map((_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2 + 0.5,
  opacity: Math.random() * 0.5 + 0.1,
}))

const baseRecommendedSections = [
  { track: '领养龙虾', title: '第 1 章：十分钟上手 OpenClaw', summary: '一键安装、配置模型、常用命令与 Coding Plan 模式。', link: '/cn/adopt/chapter1' },
  { track: '领养龙虾', title: '第 3 章：移动端接入', summary: '把龙虾接到 Telegram / 飞书 / QQ，随时随地发一句话就能办事。', link: '/cn/adopt/chapter3' },
  { track: '领养龙虾', title: '第 4 章：自动化任务入门', summary: '定时提醒、自动化报告、周期性工作流，从“会聊”到“会做”。', link: '/cn/adopt/chapter4' },
  { track: '领养龙虾', title: '龙虾大学：Skills 选修地图', summary: '菜单式挑选 skills，先装最常用的 5~10 个，让龙虾更强且不过载。', link: '/cn/adopt/lobster-university' },
  { track: '领养龙虾', title: '第 5 章：Skills 技能系统', summary: '理解技能层次、安装市场技能、开发自定义技能并调试。', link: '/cn/adopt/chapter5' },
  { track: '领养龙虾', title: '第 7 章：生产环境部署', summary: 'VPS/Docker/24×7 运行、隔离与常见部署排障要点。', link: '/cn/adopt/chapter7' },
  { track: '构建龙虾', title: '第 1 章：核心定位与设计理念', summary: 'Agent Runtime vs Chatbot，四个原语工具的设计哲学。', link: '/cn/build/chapter1' },
  { track: '构建龙虾', title: '第 3 章：提示词系统', summary: '7 个 Markdown 文件如何组成提示词、热更新与 Token 预算。', link: '/cn/build/chapter3' },
  { track: '构建龙虾', title: '第 5 章：消息循环与事件驱动', summary: 'ReAct 循环、心跳机制、重试与超时，Agent 如何“活起来”。', link: '/cn/build/chapter5' },
  { track: '构建龙虾', title: '第 7 章：轻量化方案', summary: 'NanoClaw/Nanobot/ZeroClaw 路线拆解：更小、更快、更易维护。', link: '/cn/build/chapter7' },
  { track: '构建龙虾', title: '第 8 章：安全加固方案', summary: '权限控制、沙箱隔离、审计与防注入：让龙虾在生产环境更稳。', link: '/cn/build/chapter8' },
  { track: '构建龙虾', title: '第 9 章：硬件方案', summary: '树莓派/迷你主机/ARM 设备选型，低功耗部署与本地模型协同。', link: '/cn/build/chapter9' },
]

const shuffle = (items) => {
  const arr = [...items]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

const recommendedSections = ref(shuffle(baseRecommendedSections))
const tickerItems = computed(() => [...recommendedSections.value, ...recommendedSections.value])

const quickLinks = [
  { icon: '🦞', text: '领养：写在开头', link: '/cn/adopt/intro' },
  { icon: '⚡', text: '领养：快速上手', link: '/cn/adopt/chapter1' },
  { icon: '🎓', text: '领养：龙虾大学', link: '/cn/adopt/lobster-university' },
  { icon: '📱', text: '领养：移动端接入', link: '/cn/adopt/chapter3' },
  { icon: '🛠️', text: '构建：写在开头', link: '/cn/build/' },
  { icon: '📚', text: '附录：命令速查表', link: '/cn/appendix/appendix-a' },
  { icon: '🐙', text: 'GitHub', link: 'https://github.com/datawhalechina/hello-claw', external: true },
]

const topRecommendedSkills = [
  { name: 'skill-vetter', desc: '安装前先做技能安全体检，降低恶意技能风险', command: 'clawhub install skill-vetter' },
  { name: 'tavily-search', desc: '联网搜索信息，适合查最新资料与事实核验', command: 'clawhub install tavily-search' },
  { name: 'agent-browser', desc: '让龙虾可执行网页操作、抓取信息、走页面流程', command: 'clawhub install agent-browser' },
  { name: 'summarize', desc: '对网页、文档、音视频链接快速生成摘要', command: 'clawhub install summarize' },
  { name: 'gog', desc: '打通 Gmail/Calendar/Drive/Docs 的高频办公流程', command: 'clawhub install gog' },
  { name: 'github', desc: '仓库、Issue、PR、代码搜索等开发协作能力', command: 'clawhub install github' },
  { name: 'obsidian', desc: '连接本地知识库，做笔记整理与知识回顾', command: 'clawhub install obsidian' },
  { name: 'self-improving-agent', desc: '记录成功失败经验，持续优化任务执行策略', command: 'clawhub install self-improving-agent' },
  { name: 'proactive-agent', desc: '提升主动性，按历史行为和上下文自动推进任务', command: 'clawhub install proactive-agent' },
  { name: 'capability-evolver', desc: '识别能力短板并辅助演化技能组合', command: 'clawhub install capability-evolver' },
]

const lobsterCategories = [
  {
    icon: '🧠',
    title: 'Coding Agents & IDEs',
    count: 1222,
    skills: [
      { name: 'github', note: 'PR / Issue' },
      { name: 'code-reviewer', note: 'Diff 审查' },
      { name: 'git-ops', note: 'Git 操作' },
      { name: 'sql-toolkit', note: 'SQL 查询' },
    ],
  },
  {
    icon: '🌐',
    title: 'Browser & Automation',
    count: 335,
    skills: [
      { name: 'agent-browser', note: '网页自动化' },
      { name: 'playwright', note: '测试/爬取' },
      { name: 'summarize', note: '网页摘要' },
      { name: 'actionbook', note: '表单流程' },
    ],
  },
  {
    icon: '☁️',
    title: 'DevOps & Cloud',
    count: 409,
    skills: [
      { name: 'devops', note: '运维工具箱' },
      { name: 'aws-infra', note: 'AWS 资源' },
      { name: 'azure-devops', note: '流水线' },
      { name: 'agentic-devops', note: '生产巡检' },
    ],
  },
  {
    icon: '🔍',
    title: 'Search & Research',
    count: 350,
    skills: [
      { name: 'tavily-search', note: '联网搜索' },
      { name: 'hackernews', note: '技术资讯' },
      { name: 'academic-research', note: '论文检索' },
      { name: 'summarize', note: '调研摘要' },
    ],
  },
  {
    icon: '🧾',
    title: 'Productivity & Tasks',
    count: 206,
    skills: [
      { name: 'todoist', note: '任务管理' },
      { name: 'notion', note: '知识库' },
      { name: 'obsidian', note: '本地笔记' },
      { name: 'slack', note: '协同沟通' },
    ],
  },
  {
    icon: '🤖',
    title: 'AI & LLMs',
    count: 197,
    skills: [
      { name: 'gog', note: 'Google 套件' },
      { name: 'self-improving-agent', note: '自我优化' },
      { name: 'proactive-agent', note: '主动执行' },
      { name: 'capability-evolver', note: '能力进化' },
    ],
  },
  {
    icon: '💬',
    title: 'Communication',
    count: 149,
    skills: [
      { name: 'agentmail', note: '邮件代理' },
      { name: 'slack', note: '工作消息' },
      { name: 'gog', note: 'Gmail/Calendar' },
      { name: 'linkedin', note: '社媒沟通' },
    ],
  },
  {
    icon: '📄',
    title: 'PDF & Documents',
    count: 111,
    skills: [
      { name: 'add-watermark-to-pdf', note: 'PDF 处理' },
      { name: 'summarize', note: '文档摘要' },
      { name: 'agentmail', note: '附件流转' },
      { name: 'blogburst', note: '文档拆分' },
    ],
  },
  {
    icon: '🛡️',
    title: 'Security & Passwords',
    count: 53,
    skills: [
      { name: 'skill-vetter', note: '技能体检' },
      { name: '1password', note: '凭证管理' },
      { name: 'agentguard', note: '风险拦截' },
      { name: 'agent-audit', note: '安全审计' },
    ],
  },
]

const copyCommand = () => {
  navigator.clipboard.writeText(quickStartCommand.value)
  copied.value = true
  setTimeout(() => copied.value = false, 2000)
}

const triggerHappyJump = () => {
  isHappy.value = false
  requestAnimationFrame(() => {
    isHappy.value = true
    setTimeout(() => {
      isHappy.value = false
    }, 700)
  })
}

const updateEyeTracking = (event) => {
  const maxOffset = 1.8
  const normalizedX = (event.clientX / window.innerWidth - 0.5) * 2
  const normalizedY = (event.clientY / window.innerHeight - 0.5) * 2
  eyeOffsetX.value = Math.max(-maxOffset, Math.min(maxOffset, normalizedX * maxOffset))
  eyeOffsetY.value = Math.max(-maxOffset, Math.min(maxOffset, normalizedY * maxOffset))
}

onMounted(() => {
  window.addEventListener('mousemove', updateEyeTracking)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', updateEyeTracking)
})

// Simple intersection observer for fade-in animations
const vFadeIn = {
  mounted: (el) => {
    el.style.opacity = '0'
    el.style.transform = 'translateY(40px)'
    el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out'
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          el.style.opacity = '1'
          el.style.transform = 'translateY(0)'
          observer.unobserve(el)
        }
      })
    }, { threshold: 0.1 })
    
    observer.observe(el)
  }
}
</script>

<style>
@keyframes twitch-left {
  0%, 85%, 100% { transform: rotate(0deg); }
  88% { transform: rotate(-20deg); }
  91% { transform: rotate(10deg); }
  94% { transform: rotate(-10deg); }
  97% { transform: rotate(5deg); }
}
@keyframes twitch-right {
  0%, 85%, 100% { transform: rotate(0deg); }
  88% { transform: rotate(20deg); }
  91% { transform: rotate(-10deg); }
  94% { transform: rotate(10deg); }
  97% { transform: rotate(-5deg); }
}
.claw-left {
  transform-origin: 25px 55px;
  animation: twitch-left 6s infinite ease-in-out;
}
.claw-right {
  transform-origin: 95px 55px;
  animation: twitch-right 6s infinite ease-in-out;
}
@keyframes wave-right {
  0%, 100% { transform: rotate(0deg); }
  20% { transform: rotate(34deg); }
  40% { transform: rotate(-18deg); }
  60% { transform: rotate(30deg); }
  80% { transform: rotate(-12deg); }
}
@keyframes wave-left {
  0%, 100% { transform: rotate(0deg); }
  50% { transform: rotate(-6deg); }
}
.claw-right.waving {
  animation: wave-right 0.7s infinite ease-in-out;
}
.claw-left.waving {
  animation: wave-left 1.2s infinite ease-in-out;
}
@keyframes float {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  25% { transform: translateY(-5px) rotate(2.5deg); }
  50% { transform: translateY(-10px) rotate(5deg); }
  75% { transform: translateY(-5px) rotate(-2.5deg); }
}
.lobster-anim {
  animation: float 4s infinite ease-in-out;
  transition: transform 0.5s ease-out;
}
.lobster-anim.hovered {
  transform: scale(1.1);
}
.lobster-anim.happy {
  animation: happy-bounce 0.7s ease-out;
}
.lobster-smile {
  opacity: 0;
  transition: opacity 0.15s ease;
}
.lobster-smile.visible {
  opacity: 1;
}
@keyframes happy-bounce {
  0% { transform: translateY(0) scale(1); }
  20% { transform: translateY(-16px) scale(1.06); }
  45% { transform: translateY(0) scale(1); }
  65% { transform: translateY(-8px) scale(1.03); }
  100% { transform: translateY(0) scale(1); }
}
.fade-in-init {
  animation: fadeInInit 0.8s ease-out forwards;
}
@keyframes fadeInInit {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes gradient-loop {
  0% { background-position: 0% 50%; }
  100% { background-position: 100% 50%; }
}
.animate-gradient-text {
  background: linear-gradient(to right, #ffffff, #ff4d4d, #52b79a);
  background-size: 200% auto;
  animation: gradient-loop 3s linear infinite alternate;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.marquee {
  animation: marquee-loop 42s linear infinite;
}

.marquee:hover {
  animation-play-state: paused;
}

@keyframes marquee-loop {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
</style>
