import DefaultTheme from 'vitepress/theme'
import './custom.css'
import type { Theme } from 'vitepress'
import 'viewerjs/dist/viewer.min.css';
import imageViewer from 'vitepress-plugin-image-viewer';
import vImageViewer from 'vitepress-plugin-image-viewer/lib/vImageViewer.vue';
import { useRoute } from 'vitepress';
import { h } from 'vue';

// 公告栏组件
const Announcement = () => h('div', {
    class: 'announcement-banner',
}, '⚠️ Alpha内测版本警告：此为早期内部构建版本，尚不完整且可能存在错误，欢迎大家提Issue反馈问题或建议。')

export default {
    extends: DefaultTheme,
    enhanceApp({ app }) {
        // 注册全局组件（可选）
        app.component('vImageViewer', vImageViewer);
    },
    setup() {
        const route = useRoute();
        // 启用插件
        imageViewer(route);
    },
    Layout() {
        return h(DefaultTheme.Layout, null, {
            'layout-top': () => h(Announcement)
        })
    }
} satisfies Theme
