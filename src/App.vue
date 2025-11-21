<template>
  <main font-sans p="x-4 y-10" text="center gray-700 dark:gray-200">
    <RouterView v-slot="{ Component }">
      <Transition mode="out-in">
        <component :is="Component" />
      </Transition>
    </RouterView>
    <Init />
  </main>
</template>

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
