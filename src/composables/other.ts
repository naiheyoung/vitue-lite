const THEME_SWITCH_STYLE_ID = '__theme_switch_view_transition_style__'

export function useThemeSwitchAnime(
  event: MouseEvent,
  isDark: () => boolean,
  callback: () => void,
  delay: number = 750,
  fn?: Function
) {
  if (!document.getElementById(THEME_SWITCH_STYLE_ID)) {
    const css = `
    ::view-transition-image-pair(root) {
      isolation: auto;
    }

    ::view-transition-old(root),
    ::view-transition-new(root) {
      animation: none;
      mix-blend-mode: normal;
    }

    .dark::view-transition-new(root) {
      z-index: 999;
    }

    ::view-transition-new(root) {
      z-index: -1;
    }
    `
    const style = document.createElement('style')
    style.id = THEME_SWITCH_STYLE_ID
    style.textContent = css
    document.head.appendChild(style)
  }

  const x = event.clientX
  const y = event.clientY

  const endRadio = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))

  const viewTransition = document.startViewTransition(callback)

  viewTransition.ready.then(() => {
    const effect = [`circle(0px at ${x}px ${y}px)`, `circle(${endRadio}px at ${x}px ${y}px)`]
    document.documentElement.animate(
      {
        clipPath: isDark() ? effect : effect.reverse()
      },
      {
        duration: delay,
        easing: 'ease-in-out',
        fill: 'forwards',
        pseudoElement: isDark() ? '::view-transition-new(root)' : '::view-transition-old(root)'
      }
    )
  })
}
