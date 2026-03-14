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
            <circle :cx="45" :cy="35" :r="hoveredKeyword === 'born' ? 10 : 6" :fill="hoveredKeyword === 'born' ? '#1a1a2e' : '#050810'" class="eye"></circle>
            <circle :cx="75" :cy="35" :r="hoveredKeyword === 'born' ? 10 : 6" :fill="hoveredKeyword === 'born' ? '#1a1a2e' : '#050810'" class="eye"></circle>
            <circle :cx="hoveredKeyword === 'born' ? 47 : 46 + eyeOffsetX" :cy="hoveredKeyword === 'born' ? 33 : 34 + eyeOffsetY" :r="hoveredKeyword === 'born' ? 4 : 2" fill="#00e5cc" class="eye-glow"></circle>
            <circle :cx="hoveredKeyword === 'born' ? 77 : 76 + eyeOffsetX" :cy="hoveredKeyword === 'born' ? 33 : 34 + eyeOffsetY" :r="hoveredKeyword === 'born' ? 4 : 2" fill="#00e5cc" class="eye-glow"></circle>
            <path d="M52 45 Q60 52 68 45" stroke="#ffd3d3" stroke-width="2" stroke-linecap="round" :class="['lobster-smile', { visible: isHappy }]"></path>
            <!-- Pacifier (奶嘴) - born -->
            <g v-if="hoveredKeyword === 'born'" class="accessory-pacifier">
              <ellipse cx="60" cy="55" rx="8" ry="6" fill="#ffb6c1" stroke="#ff69b4" stroke-width="1.5"/>
              <circle cx="60" cy="55" r="3" fill="#ff69b4"/>
              <ellipse cx="60" cy="65" rx="4" ry="3" fill="#ff69b4" opacity="0.8"/>
            </g>
            <!-- Hairstyles (发型轮播) - pick -->
            <transition name="hairstyle-fade" mode="out-in">
              <g v-if="hoveredKeyword === 'pick'" :key="currentHairstyle" :class="['accessory-hairstyle', `hairstyle-${hairstyles[currentHairstyle].id}`]">
                <!-- 超级赛亚人 -->
                <template v-if="hairstyles[currentHairstyle].id === 'saiyan'">
                  <polygon points="45,20 40,-5 50,15" fill="#ffd700"/>
                  <polygon points="55,18 50,-8 60,12" fill="#ffd700"/>
                  <polygon points="65,18 60,-10 70,12" fill="#ffd700"/>
                  <polygon points="75,20 70,-5 80,15" fill="#ffd700"/>
                  <polygon points="40,25 32,5 45,22" fill="#ffec8b"/>
                  <polygon points="80,25 88,5 75,22" fill="#ffec8b"/>
                  <polygon points="50,22 45,-2 55,18" fill="#ffec8b"/>
                  <polygon points="70,22 75,-2 65,18" fill="#ffec8b"/>
                  <polygon points="60,15 55,-12 65,15" fill="#fff8dc"/>
                </template>
                <!-- 长发飘飘 + 红唇 -->
                <template v-else-if="hairstyles[currentHairstyle].id === 'long'">
                  <path d="M35,25 Q25,10 30,-10 Q35,-20 40,-5 Q45,5 45,25" fill="#8B4513"/>
                  <path d="M45,22 Q40,-15 50,-20 Q55,-15 55,22" fill="#8B4513"/>
                  <path d="M55,22 Q55,-10 65,-15 Q70,-10 70,22" fill="#8B4513"/>
                  <path d="M70,25 Q75,5 80,-10 Q85,-20 90,0 Q88,15 85,25" fill="#8B4513"/>
                  <path d="M30,30 Q20,35 15,50 Q18,55 25,50" fill="#8B4513"/>
                  <path d="M90,30 Q100,35 105,50 Q102,55 95,50" fill="#8B4513"/>
                  <ellipse cx="60" cy="52" rx="5" ry="3" fill="#ff1493" class="red-lips"/>
                </template>
                <!-- 短发利落 -->
                <template v-else-if="hairstyles[currentHairstyle].id === 'short'">
                  <path d="M35,25 Q30,15 35,5 Q40,0 45,10 Q45,20 45,25" fill="#2c2c2c"/>
                  <path d="M45,22 Q45,5 55,2 Q60,5 60,22" fill="#2c2c2c"/>
                  <path d="M60,22 Q60,5 70,2 Q75,8 75,22" fill="#2c2c2c"/>
                  <path d="M75,25 Q80,15 85,5 Q88,10 85,25" fill="#2c2c2c"/>
                </template>
                <!-- 莫西干 -->
                <template v-else-if="hairstyles[currentHairstyle].id === 'mohawk'">
                  <polygon points="45,22 42,-15 48,20" fill="#ff4444"/>
                  <polygon points="50,20 48,-20 55,18" fill="#ff4444"/>
                  <polygon points="55,18 55,-22 62,18" fill="#ff6666"/>
                  <polygon points="62,18 62,-18 68,20" fill="#ff4444"/>
                  <polygon points="68,20 70,-15 75,22" fill="#ff4444"/>
                  <polygon points="48,22 45,-10 52,20" fill="#ff6666"/>
                  <polygon points="65,20 68,-12 72,22" fill="#ff6666"/>
                </template>
                <!-- 卷发摇滚 -->
                <template v-else-if="hairstyles[currentHairstyle].id === 'curly'">
                  <circle cx="38" cy="10" r="8" fill="#4a2c2a"/>
                  <circle cx="50" cy="5" r="9" fill="#4a2c2a"/>
                  <circle cx="62" cy="3" r="10" fill="#4a2c2a"/>
                  <circle cx="75" cy="5" r="9" fill="#4a2c2a"/>
                  <circle cx="85" cy="10" r="8" fill="#4a2c2a"/>
                  <circle cx="32" cy="20" r="7" fill="#4a2c2a"/>
                  <circle cx="90" cy="20" r="7" fill="#4a2c2a"/>
                  <circle cx="42" cy="-2" r="6" fill="#5a3c3a"/>
                  <circle cx="60" cy="-5" r="7" fill="#5a3c3a"/>
                  <circle cx="78" cy="-2" r="6" fill="#5a3c3a"/>
                </template>
                <!-- 光头强 -->
                <template v-else-if="hairstyles[currentHairstyle].id === 'bald'">
                  <ellipse cx="60" cy="12" rx="25" ry="18" fill="#ffe4c4"/>
                  <ellipse cx="60" cy="15" rx="22" ry="15" fill="#ffdab9"/>
                  <circle cx="60" cy="8" r="3" fill="#ffcc99" opacity="0.5"/>
                  <path d="M40,25 Q38,22 42,20" stroke="#ddd" stroke-width="1" fill="none"/>
                  <path d="M80,25 Q82,22 78,20" stroke="#ddd" stroke-width="1" fill="none"/>
                </template>
              </g>
            </transition>
            <!-- Graduation Cap (博士帽) - school -->
            <g v-if="hoveredKeyword === 'school'" class="accessory-gradcap">
              <rect x="30" y="0" width="60" height="5" fill="#1a1a2e" rx="1"/>
              <polygon points="60,-12 25,3 60,10 95,3" fill="#1a1a2e"/>
              <circle cx="60" cy="-12" r="4" fill="#ffd700"/>
              <line x1="60" y1="-12" x2="85" y2="8" stroke="#ffd700" stroke-width="2"/>
              <circle cx="85" cy="8" r="3" fill="#ffd700"/>
              <g class="tassel">
                <line x1="85" y1="8" x2="85" y2="20" stroke="#ffd700" stroke-width="2"/>
                <circle cx="85" cy="22" r="3" fill="#ffd700"/>
                <ellipse cx="82" cy="26" rx="2" ry="4" fill="#ffd700"/>
                <ellipse cx="85" cy="27" rx="2" ry="4" fill="#ffd700"/>
                <ellipse cx="88" cy="26" rx="2" ry="4" fill="#ffd700"/>
              </g>
            </g>
            <!-- Sunglasses (圆形大墨镜 + 歪嘴笑) - undefined -->
            <g v-if="hoveredKeyword === 'undefined'" class="accessory-sunglasses">
              <circle cx="45" cy="35" r="12" fill="#1a1a2e" stroke="#333" stroke-width="2"/>
              <circle cx="75" cy="35" r="12" fill="#1a1a2e" stroke="#333" stroke-width="2"/>
              <circle cx="45" cy="35" r="10" fill="#2a2a4a" opacity="0.6"/>
              <circle cx="75" cy="35" r="10" fill="#2a2a4a" opacity="0.6"/>
              <line x1="57" y1="35" x2="63" y2="35" stroke="#333" stroke-width="3"/>
              <line x1="33" y1="32" x2="25" y2="28" stroke="#333" stroke-width="2"/>
              <line x1="87" y1="32" x2="95" y2="28" stroke="#333" stroke-width="2"/>
              <path d="M52 48 Q58 44 68 50" stroke="#ffd3d3" stroke-width="2.5" stroke-linecap="round" class="smirk"/>
            </g>
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
        
        <h2 class="!text-6xl md:!text-8xl !leading-none font-black !tracking-[0.12em] uppercase !mt-0 !mb-16 !border-0 !pt-0">
          <span class="animate-gradient-text">
            哈喽！龙虾
          </span>
          <span :class="['wave-hand cursor-pointer', { shaking: isWaving }]" @click="triggerWave">👋</span>
        </h2>

        <!-- 故事导航 -->
        <div class="story-nav mb-20 max-w-4xl">
          <p class="!text-xl md:!text-2xl !leading-relaxed story-text">
            <span class="story-line story-line-1"><span class="char-fade-1">一</span><span class="char-fade-2">个</span><span class="char-fade-3">不</span><span class="char-fade-4">起</span><span class="char-fade-5">眼</span><span class="char-fade-6">的</span><span class="char-fade-7">仓</span><span class="char-fade-8">库</span><span class="char-fade-9">里</span><span class="char-fade-10">，</span><span class="char-fade-10">龙</span><span class="char-fade-11">虾</span><span class="story-keyword story-born" @click="navigateTo('/cn/adopt/intro')" @mouseenter="hoveredKeyword = 'born'" @mouseleave="hoveredKeyword = ''"><span class="char-fade-12">诞</span><span class="char-fade-13">生</span></span><span class="char-fade-14">了</span><span class="char-fade-15">。</span></span><br>
            <span class="story-line story-line-2"><span class="story-keyword story-pick" @click="navigateTo('/cn/adopt/lobster-review')" @mouseenter="hoveredKeyword = 'pick'" @mouseleave="hoveredKeyword = ''"><span class="char-fade-5">选</span><span class="char-fade-6">一</span><span class="char-fade-7">只</span></span><span class="char-fade-8">，</span><span class="char-fade-9">送</span><span class="char-fade-10">它</span><span class="char-fade-11">上</span><span class="story-keyword story-school" @click="navigateTo('/cn/university/')" @mouseenter="hoveredKeyword = 'school'" @mouseleave="hoveredKeyword = ''"><span class="char-fade-12">学</span><span class="char-fade-13">堂</span></span><span class="char-fade-14">；</span></span><br>
            <span class="story-line story-line-3"><span class="char-fade-3">或</span><span class="char-fade-4">动</span><span class="char-fade-5">手</span><span class="char-fade-6">写</span><span class="char-fade-7">一</span><span class="char-fade-8">只</span><span class="story-keyword story-undefined" @click="navigateTo('/cn/build/')" @mouseenter="hoveredKeyword = 'undefined'" @mouseleave="hoveredKeyword = ''"><span class="char-fade-9">不</span><span class="char-fade-10">被</span><span class="char-fade-11">定</span><span class="char-fade-12">义</span></span><span class="char-fade-13">的</span><span class="char-fade-14">龙</span><span class="char-fade-15">虾</span><span class="char-fade-16">。</span></span><br>
            <span class="story-line story-line-4"><span class="char-fade-13">它</span><span class="char-fade-13">的</span><span class="char-fade-14">梦</span><span class="char-fade-15">想</span><span class="char-fade-16">，</span><span class="char-fade-17">从</span><span class="char-fade-18">第</span><span class="char-fade-18">一</span><span class="char-fade-19">天</span><span class="char-fade-19">起</span><span class="char-fade-20">就</span><span class="char-fade-20">很</span><span class="char-fade-20">大</span><span class="char-fade-20">:</span><span class="char-fade-20">)</span></span>
          </p>
          <!-- 提示文字 - 5秒后渐隐显示 或 悬停时显示跳转目的地 -->
          <p :class="['hint-text text-sm !mt-8', { 'hint-visible': showHint || hoveredKeyword }]">
            <span v-if="hoveredKeyword" class="hint-destination">{{ keywordHints[hoveredKeyword] }}</span>
            <span v-else class="text-gray-500">点击高亮文字可跳转至对应章节</span>
          </p>
        </div>
      </div>

      <!-- 副标题和 New 标签 - 滚动后显示 -->
      <div v-fade-in class="w-full flex flex-col items-center mt-32 mb-16">
        <p class="!text-lg md:!text-2xl text-gray-300 !mt-0 !mb-8 max-w-3xl !leading-relaxed text-center">
          从零领养到深度构建，把 OpenClaw 训练成真正会办事的数字龙虾。
        </p>

        <div class="flex justify-center">
          <a :href="withBase('/cn/build/chapter7')" class="group flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full py-2 px-4 md:px-6 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer">
            <span class="bg-[#ff4d4d] text-white text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
              New
            </span>
            <span class="text-sm md:text-base text-gray-300 group-hover:text-white transition-colors">
              构建篇第 7-9 章上线：轻量化 / 安全加固 / 硬件方案
            </span>
            <span class="text-gray-500 group-hover:text-white transition-colors">→</span>
          </a>
        </div>
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
          <a :href="withBase('/cn/university/')" class="hover:text-[#ff6b6b] transition-colors">🎓 龙虾大学</a>
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
        <p class="!text-lg md:!text-2xl text-gray-300 !mt-6 !mb-0 max-w-3xl !leading-relaxed">
          按场景挑对 Skills，让你的龙虾从“会聊”稳定进化成“会干活”。
        </p>
        <div class="flex flex-col sm:flex-row sm:flex-wrap items-center justify-center gap-4 mt-10 mb-14">
          <a href="https://clawhub.ai/" target="_blank" rel="noreferrer" class="w-full sm:w-auto group flex items-center justify-center gap-2 bg-[#ff4d4d] hover:bg-[#ff6b6b] text-white font-bold rounded-full py-3 px-7 transition-all duration-300 hover:scale-105 active:scale-95">
            ClawHub 原版入口 <span class="opacity-80 group-hover:opacity-100 transition-opacity">→</span>
          </a>
          <a href="https://skillhub.tencent.com/#categories" target="_blank" rel="noreferrer" class="w-full sm:w-auto group flex items-center justify-center gap-2 bg-[#0f1623] hover:bg-white/10 border border-[#ff4d4d]/30 text-white font-bold rounded-full py-3 px-7 transition-all duration-300 hover:scale-105 active:scale-95">
            中文 ClawHub（腾讯 SkillHub） <span class="text-[#ff4d4d] group-hover:text-[#ff6b6b] transition-colors">→</span>
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
        <div class="w-full max-w-5xl mb-14">
          <div class="flex items-center justify-between mb-8">
            <h2 class="!text-3xl md:!text-4xl !font-extrabold !leading-tight flex items-center gap-2 !m-0">
              <span class="text-[#ff4d4d]">&gt;</span> 推荐文章
            </h2>
            <a :href="withBase('/cn/adopt/chapter4')" class="text-[#ff4d4d] hover:text-[#ff6b6b] text-sm font-medium flex items-center gap-1 transition-colors">
              看自动化基础 <span>→</span>
            </a>
          </div>
          <div class="relative overflow-hidden rounded-2xl border border-white/5 bg-[#0f1623] shadow-xl">
            <div class="marquee w-max flex items-stretch gap-6 py-6 px-6">
              <a
                v-for="(item, idx) in lobsterUniversityTickerItems"
                :key="`${item.title}-${idx}`"
                :href="withBase(item.link)"
                class="block w-[280px] md:w-[360px] shrink-0 whitespace-normal bg-[#0a0f18] border border-white/5 rounded-2xl p-6 shadow-lg hover:-translate-y-1 transition-transform"
              >
                <div class="flex items-center justify-between mb-3">
                  <span class="text-xs uppercase tracking-wider text-gray-500">{{ item.track }}</span>
                  <span class="text-[#ff4d4d] text-xs font-bold">→</span>
                </div>
                <h3 class="!text-xl !font-extrabold !leading-snug !m-0 text-white">{{ item.title }}</h3>
                <p class="text-gray-400 text-sm mt-3 mb-0 leading-relaxed">{{ item.summary }}</p>
              </a>
            </div>
          </div>
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
              <pre class="text-sm text-gray-300 whitespace-pre-wrap break-words m-0"># 1) 去 clawhub.ai 或 skillhub.tencent.com/#categories -> Settings -> API tokens 创建 token
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

      <div class="w-full max-w-5xl mb-14">
        <h2 class="!text-3xl md:!text-4xl !font-extrabold !leading-tight flex items-center gap-2 mb-8 mt-2">
          <span class="text-[#ff4d4d]">&gt;</span> 3) 龙虾大学文章合集
        </h2>
        <p class="text-gray-300 !leading-relaxed !m-0">
          先放两个假想场景，后续可以按你的真实案例持续扩充。
        </p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <a
            v-for="article in lobsterUniversityCollections"
            :key="article.title"
            :href="withBase(article.link)"
            class="group block bg-[#0f1623] border border-white/5 rounded-2xl p-6 shadow-xl hover:-translate-y-1 transition-transform"
          >
            <div class="flex items-center justify-between mb-3">
              <span class="text-xs uppercase tracking-wider text-gray-500">{{ article.badge }}</span>
              <span class="text-[#ff4d4d] text-xs font-bold">→</span>
            </div>
            <h3 class="!text-xl !font-extrabold !leading-snug !m-0 text-white">{{ article.title }}</h3>
            <p class="text-gray-400 text-sm mt-3 mb-0 leading-relaxed">{{ article.summary }}</p>
            <div class="flex flex-wrap gap-2 mt-4">
              <span
                v-for="chip in article.chips"
                :key="chip"
                class="text-xs px-2 py-1 rounded-full bg-black/30 border border-white/10 text-gray-300"
              >
                {{ chip }}
              </span>
            </div>
          </a>
        </div>
      </div>

      <div class="w-full max-w-6xl mt-2">
        <h2 class="!text-3xl md:!text-4xl !font-extrabold !leading-tight flex items-center gap-2 mb-8 mt-2">
          <span class="text-[#ff4d4d]">&gt;</span> 4) Skills 展示板
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
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRoute, useRouter, withBase } from 'vitepress'
import DefaultTheme from 'vitepress/theme'

const { Layout } = DefaultTheme
const route = useRoute()
const router = useRouter()

const navigateTo = (path) => {
  clearHintTimer()
  router.go(withBase(path))
}

const isWaving = ref(false)
const triggerWave = () => {
  isWaving.value = true
  setTimeout(() => {
    isWaving.value = false
  }, 600)
}

const showHint = ref(false)
const hoveredKeyword = ref('')
const currentHairstyle = ref(0)

const hairstyles = [
  { id: 'saiyan', name: '超级赛亚人' },
  { id: 'long', name: '长发飘飘' },
  { id: 'short', name: '短发利落' },
  { id: 'mohawk', name: '莫西干' },
  { id: 'curly', name: '卷发摇滚' },
  { id: 'bald', name: '光头强' },
]

let hairstyleTimer = null

watch(hoveredKeyword, (newVal) => {
  if (newVal === 'pick') {
    currentHairstyle.value = 0
    hairstyleTimer = setInterval(() => {
      currentHairstyle.value = (currentHairstyle.value + 1) % hairstyles.length
    }, 3500)
  } else {
    if (hairstyleTimer) {
      clearInterval(hairstyleTimer)
      hairstyleTimer = null
    }
  }
})

const keywordHints = {
  born: '🦞 领养龙虾：从零到一领取你的第一个龙虾',
  pick: '📖 龙虾点评：哪种龙虾最适合你？',
  school: '🎓 龙虾大学：让龙虾在这变聪明，茁壮成长',
  undefined: '🛠️ 构建龙虾：理解 OpenClaw 实现，写一个自己的龙虾',
}

let hintTimer = null

const startHintTimer = () => {
  hintTimer = setTimeout(() => {
    showHint.value = true
  }, 10000)
}

const clearHintTimer = () => {
  if (hintTimer) {
    clearTimeout(hintTimer)
    hintTimer = null
  }
}
const isHome = computed(() => {
  const path = route.path
  return path === '/' || path === '/index.html' || 
         path === '/hello-claw/' || path === '/hello-claw/index.html'
})
const isLobsterUniversity = computed(() => {
  const path = route.path
  return path === '/cn/university/' ||
    path === '/cn/university/index.html' ||
    path === '/cn/university' ||
    path === '/hello-claw/cn/university/' ||
    path === '/hello-claw/cn/university/index.html' ||
    path === '/hello-claw/cn/university'
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
iwr -useb https://openclaw.ai/install.ps1 | iex`,
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
  { track: '龙虾大学', title: '龙虾大学：Skills 选修地图', summary: '菜单式挑选 skills，先装最常用的 5~10 个，让龙虾更强且不过载。', link: '/cn/university/' },
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

const lobsterUniversityRecommendedSections = [
  { track: '龙虾大学', title: '龙虾大学：金融简报实战', summary: '盘前信息聚合、风险提醒、人工复核三段式工作流示例。', link: '/cn/university/finance' },
  { track: '龙虾大学', title: '龙虾大学：邮件提醒实战', summary: '紧急邮件识别、分级提醒、自动生成后续待办。', link: '/cn/university/email-reminder' },
  { track: '领养龙虾', title: '第 4 章：自动化任务入门', summary: '定时提醒、自动化报告、周期性工作流，从“会聊”到“会做”。', link: '/cn/adopt/chapter4' },
  { track: '领养龙虾', title: '第 5 章：Skills 技能系统', summary: '理解技能层次、安装市场技能、开发自定义技能并调试。', link: '/cn/adopt/chapter5' },
  { track: '领养龙虾', title: '第 7 章：多平台与外部服务', summary: '打通邮件、日历、数据库和浏览器自动化。', link: '/cn/adopt/chapter7' },
  { track: '构建龙虾', title: '第 5 章：消息循环与事件驱动', summary: 'ReAct 循环、心跳机制、重试与超时，Agent 如何“活起来”。', link: '/cn/build/chapter5' },
]

const lobsterUniversityTickerItems = computed(
  () => [...lobsterUniversityRecommendedSections, ...lobsterUniversityRecommendedSections]
)

const lobsterUniversityCollections = [
  {
    badge: '实战场景',
    title: 'OpenClaw 用在金融：盘前简报与风险提醒',
    summary: '将新闻、日历、持仓和价格异动串成一个可复用的金融助理工作流。',
    chips: ['信息聚合', '风险提示', '人工复核'],
    link: '/cn/university/finance',
  },
  {
    badge: '实战场景',
    title: 'OpenClaw 用在邮件提醒：高优先级邮件闭环',
    summary: '按发件人、关键词和时段分级提醒，并同步待办与日程，减少漏处理。',
    chips: ['邮件分级', '多端提醒', '待办同步'],
    link: '/cn/university/email-reminder',
  },
]

const quickLinks = [
  { icon: '🦞', text: '领养：写在开头', link: '/cn/adopt/intro' },
  { icon: '⚡', text: '领养：快速上手', link: '/cn/adopt/chapter1' },
  { icon: '🎓', text: '龙虾大学', link: '/cn/university/' },
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
  // 重置提示状态并启动计时器
  showHint.value = false
  startHintTimer()
})

onUnmounted(() => {
  window.removeEventListener('mousemove', updateEyeTracking)
  clearHintTimer()
})

// 监听路由变化，返回首页时重置提示
watch(() => route.path, (newPath) => {
  if (newPath === '/' || newPath === '/index.html' || 
      newPath === '/hello-claw/' || newPath === '/hello-claw/index.html') {
    showHint.value = false
    clearHintTimer()
    startHintTimer()
  }
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
.accessory-pacifier {
  animation: pacifier-bounce 1s ease-in-out infinite;
}
@keyframes pacifier-bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-2px); }
}
.accessory-gradcap {
  animation: gradcap-tilt 2s ease-in-out infinite;
  transform-origin: center top;
}
.accessory-gradcap .tassel {
  animation: tassel-swing 1.5s ease-in-out infinite;
  transform-origin: 85px 8px;
}
@keyframes tassel-swing {
  0%, 100% { transform: rotate(-15deg); }
  50% { transform: rotate(15deg); }
}
@keyframes gradcap-tilt {
  0%, 100% { transform: rotate(-3deg); }
  50% { transform: rotate(3deg); }
}
.accessory-sunglasses {
  animation: sunglasses-cool 1.5s ease-in-out infinite;
}
.accessory-sunglasses .smirk {
  animation: smirk-wiggle 2s ease-in-out infinite;
}
@keyframes smirk-wiggle {
  0%, 100% { transform: translateX(0); }
  50% { transform: translateX(1px); }
}
@keyframes sunglasses-cool {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-1px); }
}
.hairstyle-fade-enter-active,
.hairstyle-fade-leave-active {
  transition: all 0.3s ease;
}
.hairstyle-fade-enter-from {
  opacity: 0;
  transform: scale(0.8);
}
.hairstyle-fade-leave-to {
  opacity: 0;
  transform: scale(1.1);
}
.accessory-hairstyle {
  animation: hair-bounce 0.5s ease-in-out infinite;
}
.hairstyle-saiyan {
  animation: saiyan-power 0.3s ease-in-out infinite;
}
@keyframes saiyan-power {
  0%, 100% { transform: scaleY(1); }
  50% { transform: scaleY(1.08); }
}
.hairstyle-long {
  animation: long-hair-sway 1.5s ease-in-out infinite;
  transform-origin: top center;
}
@keyframes long-hair-sway {
  0%, 100% { transform: rotate(-3deg); }
  50% { transform: rotate(3deg); }
}
.hairstyle-long .red-lips {
  animation: lips-pout 2s ease-in-out infinite;
}
@keyframes lips-pout {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}
.hairstyle-short {
  animation: short-bounce 0.8s ease-in-out infinite;
}
@keyframes short-bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-2px); }
}
.hairstyle-mohawk {
  animation: mohawk-pulse 0.4s ease-in-out infinite;
}
@keyframes mohawk-pulse {
  0%, 100% { transform: scaleX(1); }
  50% { transform: scaleX(1.1); }
}
.hairstyle-curly {
  animation: curly-shake 1.2s ease-in-out infinite;
}
@keyframes curly-shake {
  0%, 100% { transform: rotate(-2deg); }
  50% { transform: rotate(2deg); }
}
.hairstyle-bald {
  animation: bald-shine 2s ease-in-out infinite;
}
@keyframes bald-shine {
  0%, 100% { filter: brightness(1); }
  50% { filter: brightness(1.15); }
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

/* 挥手抖动动画 */
.wave-hand {
  display: inline-block;
  transition: transform 0.2s ease;
}

.wave-hand:hover {
  transform: scale(1.2);
}

.wave-hand.shaking {
  animation: hand-shake 0.6s ease-in-out;
}

@keyframes hand-shake {
  0%, 100% { transform: rotate(0deg); }
  10% { transform: rotate(-20deg); }
  20% { transform: rotate(20deg); }
  30% { transform: rotate(-20deg); }
  40% { transform: rotate(20deg); }
  50% { transform: rotate(-15deg); }
  60% { transform: rotate(15deg); }
  70% { transform: rotate(-10deg); }
  80% { transform: rotate(10deg); }
  90% { transform: rotate(-5deg); }
}

/* 提示文字动画 - 呼吸感效果 */
.hint-text {
  opacity: 0;
  text-align: center;
  transition: opacity 0.8s ease-out;
  min-height: 1.5em;
}

.hint-text.hint-visible {
  opacity: 1;
  animation: hint-breathe 3s ease-in-out infinite;
}

@keyframes hint-breathe {
  0%, 100% { 
    opacity: 0.5; 
    transform: translateY(0);
  }
  50% { 
    opacity: 1; 
    transform: translateY(-2px);
  }
}

/* 跳转目的地提示样式 */
.hint-destination {
  color: rgba(255, 130, 130, 0.9);
  font-weight: 500;
  letter-spacing: 0.02em;
}

/* ============================================================================
   故事导航样式 - 诗意融入版
   ============================================================================ */

.story-nav {
  text-align: center;
}

.story-text {
  font-family: 'PingFang SC', 'Microsoft YaHei', 'Noto Serif SC', serif;
  letter-spacing: 0.05em;
  line-height: 2.2;
}

/* 故事行层次感 - 逐字渐变效果 */
.story-line {
  display: inline-block;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

/* 逐字透明度渐变 - 数字越大越白 */
.char-fade-1 { color: rgba(255, 255, 255, 0.35) !important; }
.char-fade-2 { color: rgba(255, 255, 255, 0.4) !important; }
.char-fade-3 { color: rgba(255, 255, 255, 0.5) !important; }
.char-fade-4 { color: rgba(255, 255, 255, 0.6) !important; }
.char-fade-5 { color: rgba(255, 255, 255, 0.7) !important; }
.char-fade-6 { color: rgba(255, 255, 255, 0.78) !important; }
.char-fade-7 { color: rgba(255, 255, 255, 0.85) !important; }
.char-fade-8 { color: rgba(255, 255, 255, 0.9) !important; }
.char-fade-9 { color: rgba(255, 255, 255, 0.94) !important; }
.char-fade-10 { color: rgba(255, 255, 255, 0.97) !important; }
.char-fade-11 { color: rgba(255, 255, 255, 0.98) !important; }
.char-fade-12 { color: rgba(255, 255, 255, 0.99) !important; }
.char-fade-13 { color: rgba(255, 255, 255, 1) !important; }
.char-fade-14 { color: rgba(255, 255, 255, 0.95) !important; }
.char-fade-15 { color: rgba(255, 255, 255, 0.88) !important; }
.char-fade-16 { color: rgba(255, 255, 255, 0.8) !important; }
.char-fade-17 { color: rgba(255, 255, 255, 0.75) !important; }
.char-fade-18 { color: rgba(255, 255, 255, 0.65) !important; }
.char-fade-19 { color: rgba(255, 255, 255, 0.55) !important; }
.char-fade-20 { color: rgba(255, 255, 255, 0.4) !important; }

/* 悬停时全部变亮 */
.story-line:hover span[class^="char-fade-"] {
  color: rgba(255, 255, 255, 1) !important;
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.3) !important;
}

.story-keyword {
  position: relative;
  display: inline;
  cursor: pointer;
  font-weight: 400;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  padding: 0 2px;
  border-radius: 2px;
}

.story-keyword::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 1px;
  background: currentColor;
  transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 0.5;
}

.story-keyword:hover::after {
  width: 100%;
}

.story-keyword:hover {
  letter-spacing: 0.08em;
}

/* 统一红色系 - 与龙虾主题呼应 */
.story-born,
.story-pick,
.story-school,
.story-undefined {
  color: rgba(255, 130, 130, 0.85) !important;
}

.story-born span,
.story-pick span,
.story-school span,
.story-undefined span {
  color: inherit !important;
}

.story-born:hover,
.story-pick:hover,
.story-school:hover,
.story-undefined:hover {
  color: #ff8282 !important;
  text-shadow: 0 0 25px rgba(255, 130, 130, 0.4);
}


</style>
