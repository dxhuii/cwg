import { searchForWorkspaceRoot } from 'vite'
export default defineNuxtConfig({
  css: [
    '@unocss/reset/tailwind.css',
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
          searchForWorkspaceRoot(process.cwd()),
        ],
      },
    },
  },
  modules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
    '@nuxt/image-edge',
    '@kevinmarrec/nuxt-pwa',
  ],
  experimental: {
    reactivityTransform: true,
    inlineSSRStyles: false,
  },
  colorMode: {
    classSuffix: '',
  },
  typescript: {
    shim: false,
  },
  pwa: {
    workbox: {
      enabled: process.env.NODE_ENV === 'production',
    },
    meta: {
      mobileAppIOS: true,
      name: 'cwg',
      author: 'Behon Baker',
      theme_color: '#4f46e5',
      description: 'cwg',
    },
    manifest: {
      name: 'cwg',
      short_name: 'cwg',
      theme_color: '#4f46e5',
      description: 'cwg',
    },
  },
})
