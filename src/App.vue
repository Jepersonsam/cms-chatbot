<template>
  <div class="min-h-screen flex">
    <!-- Sidebar (Hanya ditampilkan jika sudah login) -->
    <nav v-if="isAuthenticated" class="bg-white w-64 p-4 shadow-md h-screen">
      <div class="flex items-center mb-6">
        <img src="" alt="Chatbot CMS Logo" class="mr-2" />
        <span class="text-xl font-bold text-blue-600">Chatbot CMS</span>
      </div>

      <ul class="space-y-2">
        <!-- Menu Dashboard -->
        <li>
          <router-link to="/dashboard" class="block text-gray-700 hover:bg-blue-100 p-2 rounded" active-class="bg-blue-200">
            Dashboard
          </router-link>
        </li>

        <!-- Manage Chatbot dengan Submenu -->
        <li>
          <div class="flex justify-between items-center text-gray-700 hover:bg-blue-100 p-2 rounded cursor-pointer" @click="toggleManageChatbot">
            Manage Chatbot
            <span :class="{ 'transform rotate-179': !isManageChatbotOpen }" class="transition-transform">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </span>
          </div>
          <ul v-if="isManageChatbotOpen" class="pl-4 space-y-1">
            <li>
              <router-link to="/manage-chatbot/intents" class="block text-gray-500 hover:text-gray-700 p-2 rounded bg-blue-50" active-class="bg-blue-100">
                Intent Manager
              </router-link>
            </li>
            <li>
              <router-link to="/manage-chatbot/questions" class="block text-gray-500 hover:text-gray-700 p-2 rounded bg-blue-50" active-class="bg-blue-100">
                Question Manager
              </router-link>
            </li>
            <li>
              <router-link to="/manage-chatbot/responses" class="block text-gray-500 hover:text-gray-700 p-2 rounded bg-blue-50" active-class="bg-blue-100">
                Response Manager
              </router-link>
            </li>
          </ul>
        </li>

        <!-- Logout -->
        <li>
          <button @click="logout" class="w-full text-left text-gray-700 hover:bg-red-100 p-2 rounded">
            <LucideLogOut class="inline w-4 h-4 mr-1" /> Logout
          </button>
        </li>
      </ul>
    </nav>

    <!-- Main Content -->
    <div class="flex-1">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { LucideLogOut } from 'lucide-vue-next'

const router = useRouter()
const route = useRoute()

const isAuthenticated = ref(!!localStorage.getItem('token'))
const isManageChatbotOpen = ref(false) // State untuk toggle submenu

const checkAuth = () => {
  isAuthenticated.value = !!localStorage.getItem('token')
}

const logout = () => {
  localStorage.removeItem('token')
  checkAuth()
  router.push('/login')
}

const toggleManageChatbot = () => {
  isManageChatbotOpen.value = !isManageChatbotOpen.value
}

watch(() => route.path, () => {
  checkAuth()
  console.log('Route changed, auth status:', isAuthenticated.value)
})

onMounted(() => {
  checkAuth()
})
</script>

<style scoped>
.bg-blue-50 {
  background-color: #E6F0FA;
}

.bg-blue-100 {
  background-color: #BFDBFE;
}

.hover:bg-blue-100:hover {
  background-color: #E6F0FA;
}

.hover:bg-red-100:hover {
  background-color: #FEE2E2;
}

.rounded {
  border-radius: 0.375rem;
}

.transition-transform {
  transition: transform 0.3s ease;
}

.transform.rotate-180 {
  transform: rotate(180deg);
}
</style>