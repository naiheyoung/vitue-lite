<template>
  <article class="prose mx-auto font-mono" text="left">
    <slot />
  </article>
</template>

<script setup lang="ts">
import type { Frontmatter } from 'unplugin-vue-markdown/types'
const { frontmatter } = defineProps<{
  frontmatter: Frontmatter
}>()

onMounted(() => {})
</script>

<style scoped>
.prose {
  max-width: 65ch;
}
</style>
