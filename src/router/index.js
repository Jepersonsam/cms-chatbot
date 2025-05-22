import { createRouter, createWebHistory } from 'vue-router'
import IntentManager from '../components/IntentManager.vue'
import QuestionManager from '../components/QuestionManager.vue'
import ResponseManager from '../components/ResponseManager.vue'

const routes = [
  { path: '/intents', name: 'IntentManager', component: IntentManager },
  { path: '/questions', name: 'QuestionManager', component: QuestionManager },
  { path: '/responses', name: 'ResponseManager', component: ResponseManager },
  { path: '/', redirect: '/intents' } // Redirect ke halaman intents sebagai default
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router