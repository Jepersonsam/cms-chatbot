import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import router from './router'
import { LucideSave, LucideX, LucidePencil, LucideTrash2, LucideLogOut } from 'lucide-vue-next'

const app = createApp(App)
app.use(router)
app.component('LucideSave', LucideSave)
app.component('LucideX', LucideX)
app.component('LucidePencil', LucidePencil)
app.component('LucideTrash2', LucideTrash2)
app.component('LucideLogOut', LucideLogOut)
app.mount('#app')