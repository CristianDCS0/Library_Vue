import './assets/index.css'
import {router} from  '@/Route.ts'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedState from 'pinia-plugin-persistedstate';
import App from './App.vue'

import Theme from "@/components/ui/theme/Theme.vue"

const pinia = createPinia();
pinia.use(piniaPluginPersistedState)

const app = createApp(App)
app.use(pinia)
app.use(router)
app.component('themeSwitch', Theme)
app.mount('#app')
