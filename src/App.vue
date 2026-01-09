<template>
  <Background />
  <main font-sans p="x-4 y-10" text="center gray-700 dark:gray-200">
    <Navbar />
    <RouterView v-slot="{ Component }">
      <Transition mode="out-in">
        <component :is="Component" />
      </Transition>
    </RouterView>
  </main>
  <Transition mode="out-in">
    <div
      v-if="imageMeta.src"
      class="fixed inset-0 wvw hvh max-wdvw max-hdvh bg-transparent backdrop-blur z-9">
      <img
        class="rounded object-contain max-w-dvw max-h-dvh w-full h-full"
        :src="imageMeta.src"
        :alt="imageMeta.desc || imageMeta.src" />
      <div
        class="fixed right-4 bottom-10 bg-black text-yellow/75 px-3 py-1 rounded font-mono"
        v-show="imageMeta.desc"
        v-text="imageMeta.desc"></div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
const imageMeta = reactive<{
  src: string | null
  desc: string | null
}>({
  src: null,
  desc: null
})

const isOpen = computed(() => !!imageMeta.src)

const isLocked = useScrollLock(document.body)
watch(
  () => imageMeta.src,
  v => {
    if (v) isLocked.value = true
    else isLocked.value = false
  }
)

useEventListener(document.body, 'click', evt => {
  if (isOpen.value) {
    imageMeta.src = null
    return
  }
  const element = evt.target
  if (!(element instanceof HTMLImageElement)) return
  const src = element.getAttribute('src')
  if (!src) return
  imageMeta.src = src
  const alt = element.getAttribute('alt')
  const figure = element.closest('figure')
  if (!figure) {
    imageMeta.desc = alt
    return
  }
  const figcaption = figure.querySelector('figcaption')
  if (figcaption) imageMeta.desc = figcaption.textContent
})

onKeyStroke('Escape', evt => {
  evt.preventDefault()
  imageMeta.src = null
  imageMeta.desc = null
})
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 250ms ease-in-out;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  filter: blur(3px);
}
</style>
