/// <reference types="vitest" />

import { dirname, relative } from 'path'
import type { UserConfig } from 'vite'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import UnoCSS from 'unocss/vite'
import { isDev, port, r } from './scripts/utils'

const apiDomain = isDev ? 'http://127.0.0.1:7001' : 'https://d.vv.chat'
console.log('apiDomain', apiDomain)

export const sharedConfig: UserConfig = {
  root: r('src'),
  resolve: {
    alias: {
      '~/': `${r('src')}/`
    }
  },
  define: {
    __DEV__: isDev
  },
  plugins: [
    Vue(),

    AutoImport({
      resolvers: [ElementPlusResolver()],
      imports: [
        'vue',
        {
          'webextension-polyfill': [
            ['*', 'browser']
          ]
        }
      ],
      dts: r('src/auto-imports.d.ts')
    }),

    // https://github.com/antfu/unplugin-vue-components
    Components({
      dirs: [r('src/components')],
      // generate `components.d.ts` for ts support with Volar
      dts: r('src/components.d.ts'),
      resolvers: [
        ElementPlusResolver(),
        // auto import icons
        IconsResolver({
          componentPrefix: ''
        })
      ]
    }),

    // https://github.com/antfu/unplugin-icons
    Icons({}),

    // https://github.com/unocss/unocss
    UnoCSS(),

    // rewrite assets to use relative path
    {
      name: 'assets-rewrite',
      enforce: 'post',
      apply: 'build',
      transformIndexHtml(html, { path }) {
        return html.replace(/"\/assets\//g, `"${relative(dirname(path), '/assets')}/`)
      }
    }
  ],
  optimizeDeps: {
    include: [
      'vue',
      '@vueuse/core',
      'webextension-polyfill'
    ],
    exclude: [
      'vue-demi'
    ]
  }
}

export default defineConfig(({ command }) => ({
  ...sharedConfig,
  base: command === 'serve' ? `http://localhost:${port}/` : '/dist/',
  server: {
    proxy: {
      '/api': {
        target: apiDomain,
        forward: `http://localhost:${port}/`,
        changeOrigin: true,
        configure(proxy) {
          proxy.on('proxyReq', proxyReq => {
            if (proxyReq.hasHeader('Origin'))
              proxyReq.setHeader('Origin', apiDomain)

            proxyReq.setHeader('Referer', apiDomain)
          })
          proxy.on('proxyRes', proxyRes => {
            // 本地开发环境没有 https 带有 secure attribute 的 set-cookies 无效，
            // 所以在本地开发时移除 secure attribute
            const setCookies = proxyRes.headers['set-cookie']
            if (Array.isArray(setCookies)) {
              proxyRes.headers['set-cookie'] = setCookies.map(sc => {
                return sc
                  .split(';')
                  .filter(v => v.trim().toLowerCase() !== 'secure')
                  .join('; ')
              })
            }
          })
        }
      }
    },
    port,
    hmr: {
      host: 'localhost'
    }
  },
  build: {
    outDir: r('extension/dist'),
    emptyOutDir: false,
    sourcemap: isDev ? 'inline' : false,
    // https://developer.chrome.com/docs/webstore/program_policies/#:~:text=Code%20Readability%20Requirements
    terserOptions: {
      mangle: false
    },
    rollupOptions: {
      input: {
        background: r('src/background/index.html'),
        options: r('src/options/index.html'),
        popup: r('src/popup/index.html'),
        newtab: r('src/newtab/index.html')
      }
    }
  },
  test: {
    globals: true,
    environment: 'jsdom'
  }
}))
