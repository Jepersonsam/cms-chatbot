<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Navigation Bar -->
    <nav class="bg-blue-600 p-4 shadow-md">
      <div class="max-w-5xl mx-auto flex justify-between items-center">
        <div class="text-white text-2xl font-bold">Chatbot CMS</div>
        <div v-if="isAuthenticated" class="flex gap-4">
          <router-link to="/intents">
            <button class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
              Manage Intents
            </button>
          </router-link>
          <router-link to="/questions">
            <button class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
              Manage Questions
            </button>
          </router-link>
          <router-link to="/responses">
            <button class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
              Manage Responses
            </button>
          </router-link>
          <button @click="logout" class="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition">
            <LucideLogOut class="inline w-4 h-4 mr-1" /> Logout
          </button>
        </div>
        <div v-else class="flex gap-4">
          <router-link to="/login">
            <button class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
              Login
            </button>
          </router-link>
          <router-link to="/register">
            <button class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
              Register
            </button>
          </router-link>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <div class="max-w-5xl mx-auto p-6">
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

// Gunakan ref untuk melacak status autentikasi secara reaktif
const isAuthenticated = ref(!!localStorage.getItem('token'))

// Fungsi untuk memeriksa dan memperbarui status autentikasi
const checkAuth = () => {
  isAuthenticated.value = !!localStorage.getItem('token')
}

const logout = () => {
  localStorage.removeItem('token')
  checkAuth() // Perbarui status autentikasi setelah logout
  router.push('/login')
}

// Pantau perubahan rute untuk memastikan status autentikasi diperbarui
watch(() => route.path, () => {
  checkAuth()
  console.log('Route changed, auth status:', isAuthenticated.value)
})

// Periksa status autentikasi saat komponen dimuat
onMounted(() => {
  checkAuth()
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>