<template>
  <nav fixed flex gap-x-3 mt3 right-4 top-4 z-9>
    <div class="hover:cursor-pointer transition-opacity opacity-0" @click="backToTop()">
      <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24">
        <path
          d="M12 5v6m0 3v1.5m0 3v.5m6-8l-6-6m-6 6l6-6"
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2" />
      </svg>
    </div>
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1.2em"
        height="1.2em"
        class="flip"
        viewBox="0 0 21 21">
        <path
          d="m8.5 3.5l4 14"
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round" />
      </svg>
    </div>
    <router-link i-carbon:home icon-btn to="/" />
    <a
      dark:i-carbon:moon
      i-carbon:sun
      icon-btn
      to="/"
      @click="
        useThemeSwitchAnime(
          $event,
          () => isDark,
          () => toggleDark(),
          350
        )
      " />
    <a
      href="https://github.com/naiheyoung/vitue-lite"
      i-carbon:logo-github
      icon-btn
      target="_blank" />
  </nav>
</template>

<script setup lang="ts">
const { y } = useScroll(document)

const backToTop = () => {
  document.body.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const debouncedScrollHandler = useDebounceFn(() => {
  const arrowUp = document.querySelector('nav>div')
  if (arrowUp)
    y.value >= 400 ? arrowUp.classList.remove('opacity-0') : arrowUp.classList.add('opacity-0')
})

useEventListener(document, 'scroll', debouncedScrollHandler)
</script>
