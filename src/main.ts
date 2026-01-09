import App from './App.vue'
import { createPinia } from 'pinia'
import { routes } from 'vue-router/auto-routes'
import { createRouter, createWebHistory } from 'vue-router'
import { createHead } from '@unhead/vue/client'

import '@unocss/reset/tailwind-v4.css'
import 'virtual:uno.css'
import '~/assets/css/index.css'

const app = createApp(App)
const router = createRouter({
  routes,
  history: createWebHistory(import.meta.env.BASE_URL)
})
const head = createHead()
const pinia = createPinia()
app.use(router).use(head).use(pinia)
app.mount('#root')
