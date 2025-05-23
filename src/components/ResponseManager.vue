<template>
  <div class="max-w-5xl mx-auto p-6">
    <h2 class="text-3xl font-bold text-gray-800 mb-8 flex items-center justify-center gap-2">
      🎯 Manajemen Chatbot Responses
    </h2>
    <div v-if="isAuthenticated" class="bg-white p-6 rounded-xl shadow-md">
      <h3 class="text-xl font-semibold mb-4">Tambah / Edit Response</h3>
      <form @submit.prevent="createResponse" class="space-y-4">
        <div>
          <label class="block font-medium mb-1">Intent ID</label>
          <input v-model="newResponse.intent_id" placeholder="Intent ID" required class="w-full p-2 border border-gray-300 rounded-lg" />
        </div>
        <div>
          <label class="block font-medium mb-1">Response Text</label>
          <textarea v-model="newResponse.response_text" rows="3" class="w-full p-2 border border-gray-300 rounded-lg"></textarea>
        </div>
        <div class="flex gap-2 justify-end">
          <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            <LucideSave class="inline w-4 h-4 mr-1" /> Simpan
          </button>
          <button @click="resetForm" type="button" class="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition">
            <LucideX class="inline w-4 h-4 mr-1" /> Batal
          </button>
        </div>
      </form>
      <div class="mt-6">
        <table class="min-w-full">
          <thead class="bg-blue-600 text-white">
            <tr>
              <th class="px-4 py-2 text-left">ID</th>
              <th class="px-4 py-2 text-left">Intent ID</th>
              <th class="px-4 py-2 text-left">Response Text</th>
              <th class="px-4 py-2 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="response in responses" :key="response.id" class="border-b hover:bg-gray-50">
              <td class="px-4 py-2">{{ response.id }}</td>
              <td class="px-4 py-2">{{ response.intent_id }}</td>
              <td class="px-4 py-2">{{ response.response_text }}</td>
              <td class="px-4 py-2 text-center flex justify-center gap-2">
                <button @click="editResponse(response)" class="text-blue-600 hover:text-blue-800">
                  <LucidePencil class="w-4 h-4" />
                </button>
                <button @click="deleteResponse(response.id)" class="text-red-600 hover:text-red-800">
                  <LucideTrash2 class="w-4 h-4" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div v-else class="text-red-600 text-center">Anda harus login untuk mengakses halaman ini.</div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import api from '../service/api'

const responses = ref([])
const newResponse = ref({
  intent_id: '',
  response_text: ''
})
const isAuthenticated = computed(() => !!localStorage.getItem('token'))

const fetchResponses = async () => {
  try {
    const response = await api.get('/chatbot/responses')
    responses.value = response.data.data
  } catch (error) {
    console.error('Failed to fetch responses:', error)
  }
}

const createResponse = async () => {
  try {
    await api.post('/chatbot/responses', newResponse.value)
    resetForm()
    fetchResponses() // Refresh data setelah simpan
  } catch (error) {
    console.error('Failed to create response:', error)
  }
}

const deleteResponse = async (id) => {
  try {
    await api.delete(`/chatbot/responses/${id}`)
    fetchResponses() // Refresh data setelah hapus
  } catch (error) {
    console.error('Failed to delete response:', error)
  }
}

const editResponse = (response) => {
  newResponse.value = { ...response }
}

const resetForm = () => {
  newResponse.value = {
    intent_id: '',
    response_text: ''
  }
}

onMounted(() => {
  if (isAuthenticated.value) {
    fetchResponses() // Panggil saat komponen dimuat
  } else {
    window.location.href = '/login'
  }
})

// Watch untuk memeriksa perubahan rute atau autentikasi
watch(isAuthenticated, (newValue) => {
  if (newValue) {
    fetchResponses() // Refresh data saat autentikasi berubah (misalnya login)
  }
})
</script>