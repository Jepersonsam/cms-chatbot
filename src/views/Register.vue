<template>
  <div class="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8" style="background-image: url('https://i.pinimg.com/736x/b8/f8/fa/b8f8fa8d2eaa6518253f301eadac06b0.jpg');">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <img class="mx-auto h-28 w-auto" src="https://static.vecteezy.com/system/resources/previews/007/794/726/original/travel-bus-illustration-logo-on-light-background-free-vector.jpg" alt="Workflow">
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Registrasi Admin
      </h2>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6" role="alert">
          {{ error }}
        </div>
        <div v-if="success" class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6" role="alert">
          Registrasi berhasil! Anda akan diarahkan ke halaman login.
        </div>

        <form class="space-y-6" @submit.prevent="register">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700">Nama</label>
            <div class="mt-1">
              <input id="name" name="name" type="text" v-model="form.name" placeholder="Masukkan Nama" autocomplete="name" required class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            </div>
          </div>

          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
            <div class="mt-1">
              <input id="email" name="email" type="email" v-model="form.email" placeholder="Masukkan email" autocomplete="email" required class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            </div>
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">Kata Sandi</label>
            <div class="mt-1">
              <input id="password" name="password" type="password" v-model="form.password" placeholder="Masukkan password" autocomplete="new-password" required class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            </div>
          </div>

          <div>
            <label for="password_confirmation" class="block text-sm font-medium text-gray-700">Konfirmasi Kata Sandi</label>
            <div class="mt-1">
              <input id="password_confirmation" name="password_confirmation" type="password" v-model="form.password_confirmation" placeholder="Konfirmasi password" autocomplete="new-password" required class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            </div>
          </div>

          <div class="flex justify-end gap-4">
            <button type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <LucideSave class="inline w-4 h-4 mr-1" /> Daftar
            </button>
          </div>
        </form>

        <div class="mt-6">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { LucideSave } from 'lucide-vue-next'
import api from '../service/api'

const form = ref({
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
})
const error = ref('')
const success = ref(false)
const router = useRouter()

const register = async () => {
  try {
    const response = await api.post('/register', form.value)
    if (response.data.success) { // Asumsi API mengembalikan { success: true }
      success.value = true
      setTimeout(() => {
        router.push('/login') // Redirect ke halaman login setelah registrasi berhasil
      }, 2000)
    } else {
      error.value = 'Registrasi gagal. Coba lagi.'
    }
  } catch (err) {
    error.value = 'Registrasi gagal. Coba lagi.'
    console.error('Error:', err)
  }
}
</script>