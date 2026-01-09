/* Generate by @shikijs/codegen */
import type {
  DynamicImportLanguageRegistration,
  DynamicImportThemeRegistration,
  HighlighterGeneric
} from '@shikijs/types'
import { createBundledHighlighter, createSingletonShorthands } from '@shikijs/core'
import { createJavaScriptRegexEngine } from '@shikijs/engine-javascript'

type BundledLanguage =
  | 'bash'
  | 'sh'
  | 'bat'
  | 'css'
  | 'diff'
  | 'docker'
  | 'html'
  | 'http'
  | 'java'
  | 'js'
  | 'json'
  | 'lua'
  | 'md'
  | 'nginx'
  | 'py'
  | 'ps'
  | 'regex'
  | 'sql'
  | 'ts'
  | 'vim'
  | 'vue'
  | 'xml'
  | 'yml'
type BundledTheme = 'vitesse-dark' | 'vitesse-light'
type Highlighter = HighlighterGeneric<BundledLanguage, BundledTheme>

const bundledLanguages = {
  bash: () => import('@shikijs/langs/shellscript'),
  sh: () => import('@shikijs/langs/shellscript'),
  bat: () => import('@shikijs/langs/bat'),
  css: () => import('@shikijs/langs/css'),
  diff: () => import('@shikijs/langs/diff'),
  docker: () => import('@shikijs/langs/docker'),
  html: () => import('@shikijs/langs/html'),
  http: () => import('@shikijs/langs/http'),
  java: () => import('@shikijs/langs/java'),
  js: () => import('@shikijs/langs/javascript'),
  json: () => import('@shikijs/langs/json'),
  lua: () => import('@shikijs/langs/lua'),
  md: () => import('@shikijs/langs/markdown'),
  nginx: () => import('@shikijs/langs/nginx'),
  py: () => import('@shikijs/langs/python'),
  ps: () => import('@shikijs/langs/powershell'),
  regex: () => import('@shikijs/langs/regexp'),
  sql: () => import('@shikijs/langs/sql'),
  ts: () => import('@shikijs/langs/typescript'),
  vim: () => import('@shikijs/langs/viml'),
  vue: () => import('@shikijs/langs/vue'),
  xml: () => import('@shikijs/langs/xml'),
  yml: () => import('@shikijs/langs/yaml')
} as Record<BundledLanguage, DynamicImportLanguageRegistration>

const bundledThemes = {
  'vitesse-dark': () => import('@shikijs/themes/vitesse-dark'),
  'vitesse-light': () => import('@shikijs/themes/vitesse-light')
} as Record<BundledTheme, DynamicImportThemeRegistration>

const createHighlighter = /* @__PURE__ */ createBundledHighlighter<
  BundledLanguage,
  BundledTheme
>({
  langs: bundledLanguages,
  themes: bundledThemes,
  engine: () => createJavaScriptRegexEngine()
})

const {
  codeToHtml,
  codeToHast,
  codeToTokensBase,
  codeToTokens,
  codeToTokensWithThemes,
  getSingletonHighlighter,
  getLastGrammarState
} = /* @__PURE__ */ createSingletonShorthands<BundledLanguage, BundledTheme>(createHighlighter)

export {
  bundledLanguages,
  bundledThemes,
  codeToHast,
  codeToHtml,
  codeToTokens,
  codeToTokensBase,
  codeToTokensWithThemes,
  createHighlighter,
  getLastGrammarState,
  getSingletonHighlighter
}
export type { BundledLanguage, BundledTheme, Highlighter }
