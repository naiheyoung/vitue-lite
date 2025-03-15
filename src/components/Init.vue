<template>
  <nav mt3 fixed top-4 right-4 flex gap-x-3>
    <router-link to="/" i-carbon:home icon-btn />
    <a to="/" i-carbon:sun icon-btn dark:i-carbon:moon @click="toggleDark()" />
    <a
      href="https://github.com/naiheyoung/vitue-lite"
      target="_blank"
      i-carbon:logo-github
      icon-btn />
  </nav>
  <p mt5>Path:</p>
  <nav mt3>
    <RouterLink py1 px3 rounded-sm btn to="/say/hi">Hi</RouterLink>
    <RouterLink py1 px3 rounded-sm btn to="/say/hello">Hello</RouterLink>
  </nav>
</template>

<script setup>
import { toggleDark } from '~/composables'
</script>

<style scoped>
nav:last-child a {
  margin-right: 0.75rem;
  transition: 0.25s;
}

nav[fixed] {
  border-radius: 9px;
  box-shadow: 0 0 3px rgba(136, 136, 136, 0.35);
  padding-inline: 0.35rem;
  padding-block: 0.135rem;
}
</style>
