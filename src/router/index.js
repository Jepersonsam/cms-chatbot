import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import IntentManager from '../components/IntentManager.vue'
import QuestionManager from '../components/QuestionManager.vue'
import ResponseManager from '../components/ResponseManager.vue'

const routes = [
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },
  { path: '/intents', name: 'IntentManager', component: IntentManager, meta: { requiresAuth: true } },
  { path: '/questions', name: 'QuestionManager', component: QuestionManager, meta: { requiresAuth: true } },
  { path: '/responses', name: 'ResponseManager', component: ResponseManager, meta: { requiresAuth: true } },
  { path: '/', redirect: '/intent' } // Redirect ke halaman intents sebagai default
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (to.meta.requiresAuth && !token) {
    next('/login') // Redirect ke login jika tidak ada token
  } else {
    next() // Izinkan akses jika ada token atau rute tidak memerlukan autentikasi
  }
})

export default router