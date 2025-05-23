<template>
  <div class="max-w-5xl mx-auto p-6">
    <h2 class="text-3xl font-bold text-gray-800 mb-8 flex items-center justify-center gap-2">
      🎯 Manajemen Chatbot Intents
    </h2>
    <div v-if="isAuthenticated" class="bg-white p-6 rounded-xl shadow-md">
      <h3 class="text-xl font-semibold mb-4">Tambah / Edit Intent</h3>
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label class="block font-medium mb-1">Nama</label>
          <input v-model="form.name" type="text" class="w-full p-2 border border-gray-300 rounded-lg" />
        </div>
        <div>
          <label class="block font-medium mb-1">Deskripsi</label>
          <textarea v-model="form.description" rows="2" class="w-full p-2 border border-gray-300 rounded-lg"></textarea>
        </div>
        <div class="flex gap-2 justify-end">
          <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            <LucideSave class="inline w-4 h-4 mr-1" /> Simpan
          </button>
          <button @click="resetForm" type="button" class="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition">
            <LucideX class="inline w-4 h-4 mr-1" /> Batal
          </button>
        </div>
      </form>
      <div class="mt-6">
        <table class="min-w-full">
          <thead class="bg-blue-600 text-white">
            <tr>
              <th class="px-4 py-2 text-left">ID</th>
              <th class="px-4 py-2 text-left">Name</th>
              <th class="px-4 py-2 text-left">Description</th>
              <th class="px-4 py-2 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="intent in intents" :key="intent.id" class="border-b hover:bg-gray-50">
              <td class="px-4 py-2">{{ intent.id }}</td>
              <td class="px-4 py-2">{{ intent.name }}</td>
              <td class="px-4 py-2">{{ intent.description }}</td>
              <td class="px-4 py-2 text-center flex justify-center gap-2">
                <button @click="editIntent(intent)" class="text-blue-600 hover:text-blue-800">
                  <LucidePencil class="w-4 h-4" />
                </button>
                <button @click="deleteIntent(intent.id)" class="text-red-600 hover:text-red-800">
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

const intents = ref([])
const form = ref({ id: null, name: '', description: '' })
const isAuthenticated = computed(() => !!localStorage.getItem('token'))

const loadIntents = async () => {
  try {
    const res = await api.get('/chatbot/intents')
    intents.value = res.data.data
  } catch (error) {
    console.error('Gagal mengambil data intents:', error)
  }
}

const handleSubmit = async () => {
  try {
    if (form.value.id) {
      await api.put(`/chatbot/intents/${form.value.id}`, form.value)
    } else {
      await api.post('/chatbot/intents', form.value)
    }
    resetForm()
    loadIntents() // Refresh data setelah simpan
  } catch (error) {
    console.error('Gagal menyimpan intent:', error)
  }
}

const resetForm = () => {
  form.value = { id: null, name: '', description: '' }
}

const editIntent = (intent) => {
  form.value = { ...intent }
}

const deleteIntent = async (id) => {
  if (confirm('Yakin ingin menghapus?')) {
    try {
      await api.delete(`/chatbot/intents/${id}`)
      loadIntents() // Refresh data setelah hapus
    } catch (error) {
      console.error('Gagal menghapus intent:', error)
    }
  }
}

onMounted(() => {
  if (isAuthenticated.value) {
    loadIntents() // Panggil saat komponen dimuat
  } else {
    window.location.href = '/login'
  }
})

// Watch untuk memeriksa perubahan rute atau autentikasi
watch(isAuthenticated, (newValue) => {
  if (newValue) {
    loadIntents() // Refresh data saat autentikasi berubah (misalnya login)
  }
})
</script>