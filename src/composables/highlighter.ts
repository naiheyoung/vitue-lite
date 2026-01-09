import { createHighlighter } from './shiki.bundle'
import { addClassToHast } from '@shikijs/core'
import type { ShikiTransformer } from '@shikijs/core'

const highlighter = await createHighlighter({
  langs: [
    'bash',
    'sh',
    'bat',
    'css',
    'diff',
    'docker',
    'html',
    'http',
    'java',
    'js',
    'json',
    'lua',
    'md',
    'nginx',
    'py',
    'ps',
    'regex',
    'sql',
    'ts',
    'vim',
    'vue',
    'xml',
    'yml'
  ],
  themes: ['vitesse-dark', 'vitesse-light']
})

const codeBreakTransformer: ShikiTransformer = {
  name: 'codeBreakTransformer',
  code: hast => {
    addClassToHast(hast, ['whitespace-pre-wrap', 'break-words'])
  },
  pre: hast => {
    hast.properties.tabindex = '-1'
  }
}

export { highlighter, codeBreakTransformer }
