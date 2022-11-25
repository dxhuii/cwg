import { searchForWorkspaceRoot } from 'vite'
export default defineNuxtConfig({
  css: [
    '@unocss/reset/tailwind.css'
  ],
  /**
   * 在 package.json 中包含 workspaces 字段
   * 包含以下几种文件之一
   * lerna.json
   * pnpm-workspace.yaml
   */
  vite: {
    server: {
      fs: {
        allow: [
          // 搜索工作区的根目录
          searchForWorkspaceRoot(process.cwd())
        ]
      }
    }
  },
  modules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
    '@nuxt/image-edge',
    '@kevinmarrec/nuxt-pwa'
  ],
  experimental: {
    reactivityTransform: true,
    inlineSSRStyles: false
  },
  colorMode: {
    classSuffix: ''
  },
  nitro: {
    devProxy: {
      '/api/': {
        target: 'http://127.0.0.1:7001',
        changeOrigin: true
      }
    }
  },
  typescript: {
    shim: false
  },
  pwa: {
    meta: {
      name: 'AlbionStatus - Albion Online server status',
      author: 'Developmint',
      description: 'AlbionStatus is the only reliable Albion Online server status tracker. Find out if Albion is down'
        + ' in a splitsecond, no matter if the downtime is caused by the daily maintenance or an outage.',
      ogSiteName: 'AlbionStatus',
      ogHost: 'https://albionstatus.com',
      twitterSite: '@AlbionStatus',
      twitterCard: 'summary'
    },
    manifest: {
      lang: 'en',
      short_name: 'AlbionStatus',
      start_url: '/',
      display: 'standalone',
      background_color: '#FFFFFF'
    }
  }
})
