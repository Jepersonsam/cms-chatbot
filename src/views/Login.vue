<template>
  <div class="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8" style="background-image: url('https://i.pinimg.com/736x/b8/f8/fa/b8f8fa8d2eaa6518253f301eadac06b0.jpg');">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <img class="mx-auto h-28 w-auto" src="https://static.vecteezy.com/system/resources/previews/007/794/726/original/travel-bus-illustration-logo-on-light-background-free-vector.jpg" alt="Workflow">
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Silahkan Masuk
      </h2>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6" role="alert">
          {{ error }}
        </div>

        <form class="space-y-6" @submit.prevent="login">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
            <div class="mt-1">
              <input id="email" name="email" type="email" v-model="form.email" autocomplete="email" required class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            </div>
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">Kata Sandi</label>
            <div class="mt-1">
              <input id="password" name="password" type="password" v-model="form.password" autocomplete="current-password" required class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            </div>
          </div>

          <div>
            <button type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Masuk
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
import api from '../service/api'

const form = ref({
  email: '',
  password: ''
})
const error = ref('')
const router = useRouter()

const login = async () => {
  try {
    const response = await api.post('/login', form.value)
    if (response.data.token) {
      localStorage.setItem('token', response.data.token)
      router.push('/intents') // Mengarahkan ke halaman intents setelah login berhasil
    } else {
      error.value = 'Login gagal. Token tidak diterima.'
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