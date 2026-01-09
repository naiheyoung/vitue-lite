import path from 'node:path'
import Vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import VueMacros from 'unplugin-vue-macros/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import VueRouter from 'unplugin-vue-router/vite'
import { defineConfig } from 'vite'
import Markdown from 'unplugin-vue-markdown/vite'
import { fromHighlighter } from '@shikijs/markdown-it/core'
import { highlighter, codeBreakTransformer } from './src/composables/highlighter'
import { alert } from '@mdit/plugin-alert'
import { attrs } from '@mdit/plugin-attrs'
import { imgLazyload } from '@mdit/plugin-img-lazyload'
import { obsidianImgSize } from '@mdit/plugin-img-size'
import { mark } from '@mdit/plugin-mark'
import { ruby } from '@mdit/plugin-ruby'
import { snippet } from '@mdit/plugin-snippet'
import { full as emoji } from 'markdown-it-emoji'
import linkAttributes from 'markdown-it-link-attributes'
import magicLink from 'markdown-it-magic-link'
import anchor from 'markdown-it-anchor'
import {
  transformerNotationDiff,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
  transformerNotationFocus,
  transformerMetaHighlight,
  transformerMetaWordHighlight,
  transformerRemoveNotationEscape
} from '@shikijs/transformers'
import { transformerColorizedBrackets } from '@shikijs/colorized-brackets'
import beautifulLink from 'markdown-it-beautiful-link'

export default defineConfig({
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src')
    }
  },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'js/app.js',
        chunkFileNames: 'js/[name].[hash].js',
        assetFileNames: '[ext]/[name].[hash][extname]'
      }
    }
  },
  plugins: [
    VueRouter({
      extensions: ['.vue', '.md']
    }),
    VueMacros({
      defineOptions: false,
      defineModels: false,
      plugins: {
        vue: Vue({
          include: [/\.vue$/, /\.md$/],
          features: {
            propsDestructure: true
          }
        })
      }
    }),
    AutoImport({
      imports: [
        'vue',
        '@vueuse/core',
        VueRouterAutoImports,
        {
          // add any other imports you were relying on
          'vue-router/auto': ['useLink']
        }
      ],
      dts: true,
      dirs: ['./src/composables'],
      vueTemplate: true
    }),
    Components({
      extensions: ['vue', 'md'],
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      dts: true
    }),
    UnoCSS(),
    Markdown({
      headEnabled: true,
      exportFrontmatter: false,
      exposeFrontmatter: false,
      exposeExcerpt: false,
      wrapperDiv: false,
      wrapperComponent: 'ProseWrapper',
      markdownItOptions: {
        xhtmlOut: true,
        breaks: true,
        linkify: true,
        quotes: '""\'\''
      },
      markdownItSetup: md => {
        md.use(
          fromHighlighter(highlighter, {
            themes: {
              light: 'vitesse-light',
              dark: 'vitesse-dark'
            },
            defaultColor: false,
            transformers: [
              codeBreakTransformer,
              transformerNotationDiff(),
              transformerNotationHighlight(),
              transformerNotationWordHighlight(),
              transformerNotationFocus(),
              transformerMetaHighlight(),
              transformerMetaWordHighlight(),
              transformerRemoveNotationEscape(),
              transformerColorizedBrackets({
                explicitTrigger: true
              })
            ]
          })
        )
          .use(alert)
          .use(attrs)
          .use(imgLazyload)
          .use(obsidianImgSize)
          .use(mark)
          .use(ruby)
          .use(snippet, {
            currentPath: env => env.filePath,
            resolvePath: path => {
              if (path.startsWith('~')) {
                return path.replace('~', 'src')
              }

              return path
            }
          })
          .use(emoji)
          .use(linkAttributes, {
            matcher: (link: string) => /^https?:\/\//.test(link),
            attrs: {
              target: '_blank',
              rel: 'noopener'
            }
          })
          .use(magicLink, {
            linksMap: {}
          })
          .use(anchor, {
            level: [1, 2, 3, 4],
            slugify: (s: string) => {
              if (/{{frontmatter\..*/.test(s)) {
                return ''
              }
              return s.toLowerCase()
            }
          })
          .use(beautifulLink)
      }
    })
  ]
})
