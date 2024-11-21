import path from 'node:path'
import Vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import VueMacros from 'unplugin-vue-macros/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import VueRouter from 'unplugin-vue-router/vite'
import { defineConfig } from 'vite'

const assetsDir = 'assets'
const imgExts = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg']
const fontExts = ['.woff2', '.woff', '.ttf']

export default defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: `${assetsDir}/js/app.js`,
        chunkFileNames: `${assetsDir}/js/[name].[hash].js`,
        assetFileNames(chunkInfo) {
          if (chunkInfo.name?.endsWith('.css')) {
            return `${assetsDir}/css/[name].[hash][extname]`
          }
          if (imgExts.some(ext => chunkInfo.name?.endsWith(ext))) {
            return `${assetsDir}/images/[name].[hash][extname]`
          }
          if (fontExts.some(ext => chunkInfo.name?.endsWith(ext))) {
            return `${assetsDir}/fonts/[name].[hash][extname]`
          }
          return `${assetsDir}/other/[name].[hash][extname]`
        },
      }
    }
  },
  plugins: [
    VueMacros({
      defineOptions: false,
      defineModels: false,
      plugins: {
        vue: Vue({
          script: {
            propsDestructure: true,
            defineModel: true,
          },
        }),
      },
    }),
    VueRouter(),
    AutoImport({
      imports: [
        'vue',
        '@vueuse/core',
        VueRouterAutoImports,
        {
          // add any other imports you were relying on
          'vue-router/auto': ['useLink'],
        },
      ],
      dts: true,
      dirs: [
        './src/composables',
      ],
      vueTemplate: true,
    }),
    Components({
      dts: true,
    }),
    UnoCSS(),
  ],
})
