<template>
  <div class="max-w-5xl mx-auto p-6">
    <h2 class="text-3xl font-bold text-gray-800 mb-8 flex items-center justify-center gap-2">
      🔒 Login Pengguna
    </h2>
    <form @submit.prevent="login" class="bg-white p-6 rounded-xl shadow-md space-y-4 mb-8 border border-gray-200">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block font-medium mb-1">Email</label>
          <input
            v-model="form.email"
            type="email"
            placeholder="Masukkan email"
            required
            class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label class="block font-medium mb-1">Password</label>
          <input
            v-model="form.password"
            type="password"
            placeholder="Masukkan password"
            required
            class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      <div class="flex justify-end gap-4">
        <button type="submit" class="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition">
          <LucideSave class="inline w-4 h-4 mr-1" /> Masuk
        </button>
        <button type="button" @click="resetForm" class="bg-gray-500 text-white px-5 py-2 rounded-lg hover:bg-gray-600 transition">
          <LucideX class="inline w-4 h-4 mr-1" /> Batal
        </button>
      </div>
      <p v-if="error" class="text-red-600">{{ error }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { LucideSave, LucideX } from 'lucide-vue-next'
import api from '../service/api'

const form = ref({
  email: '',
  password: ''
})
const error = ref('')

const login = async () => {
  try {
    const response = await api.post('/login', form.value)
    if (response.data.token) {
      localStorage.setItem('token', response.data.token)
      // Redirect ke halaman CMS setelah login sukses
      window.location.href = '/intents' // Ganti dengan rute CMS Anda
    }
  } catch (err) {
    error.value = 'Login gagal. Coba lagi.'
    console.error('Error:', err)
  }
}

const resetForm = () => {
  form.value.email = ''
  form.value.password = ''
  error.value = ''
}
</script>