import { defineConfig, presetAttributify, presetIcons, presetWind4 } from 'unocss'

export default defineConfig({
  theme: {
    font: {
      sans: 'var(--font-sans)',
      mono: 'var(--font-mono)',
      code: 'var(--font-code)'
    }
  },
  safelist: ['whitespace-pre-wrap', 'break-words'],
  shortcuts: [
    [
      'btn',
      'px-4 py-1 rounded inline-block bg-indigo-600 text-white cursor-pointer hover:bg-indigo-700 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50 transition duration-200 ease-in-out'
    ],
    [
      'icon-btn',
      'text-[0.9em] inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text-indigo-600 !outline-none'
    ],
    [
      'shadowed',
      'shadow-[0px_10px_10px_-10px_rgba(136,136,136,.35),0px_-10px_10px_-10px_rgba(136,136,136,.35),-10px_0px_10px_-10px_rgba(136,136,136,.35),10px_0px_10px_-10px_rgba(136,136,136,.35)]'
    ]
  ],
  presets: [
    presetWind4(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      warn: true,
      extraProperties: {
        display: 'inline-block',
        'user-select': 'none',
        transition: 'all 200ms ease-in-out'
      }
    })
  ]
})
