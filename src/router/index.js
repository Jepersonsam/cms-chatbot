import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import IntentManager from '../components/IntentManager.vue'
import QuestionManager from '../components/QuestionManager.vue'
import ResponseManager from '../components/ResponseManager.vue'

const routes = [
  { path: '/', redirect: '/login' }, // Halaman awal diarahkan ke /login
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/intents', component: IntentManager, meta: { requiresAuth: true } },
  { path: '/questions', component: QuestionManager, meta: { requiresAuth: true } },
  { path: '/responses', component: ResponseManager, meta: { requiresAuth: true } }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  console.log('Checking token:', token) // Debug log
  if (to.meta.requiresAuth && !token) {
    next('/login') // Redirect ke login jika tidak ada token
  } else {
    next() // Izinkan akses jika ada token
  }
})

export default router