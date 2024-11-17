<template>
  <nav mt3>
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

nav:first-of-type a {
  margin-right: 0.75rem;
}
</style>
