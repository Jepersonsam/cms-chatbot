import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Dashboard from '../views/Dashboard.vue'
import ManageChatbot from '../views/ManageChatbot.vue'
import IntentManager from '../components/IntentManager.vue'
import QuestionManager from '../components/QuestionManager.vue'
import ResponseManager from '../components/ResponseManager.vue'
import RoleManager from '../views/RoleManager.vue'
import PermissionManager from '../components/PermissionManager.vue'
import UserManager from '../components/UserManager.vue'


const routes = [
  {
    path: '/',
    redirect: () => {
      const token = localStorage.getItem('token')
      return token ? '/dashboard' : '/login'
    }
  },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  {
    path: '/dashboard',
    component: Dashboard,
    meta: { requiresAuth: true }
  },
  {
        path: '/roles', 
        component: RoleManager
      },
      {
        path: '/permissions',
        name: 'Permissions',
        component: PermissionManager
      },
      {
        path: '/users',
        name: 'users',
        component: UserManager
      },
  {
    path: '/manage-chatbot',
    component: ManageChatbot,
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        redirect: '/manage-chatbot/intents' // Default ke intents
      },
      {
        path: 'intents',
        component: IntentManager
      },
      {
        path: 'questions',
        component: QuestionManager
      },
      {
        path: 'responses',
        component: ResponseManager
      }
    ]
  },
  { path: '/:pathMatch(.*)*', redirect: '/' }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  console.log('Checking token:', token)

  if (to.meta.requiresAuth && !token) {
    next('/login')
  } else if ((to.path === '/login' || to.path === '/register') && token) {
    next('/dashboard')
  } else {
    next()
  }
})

export default router