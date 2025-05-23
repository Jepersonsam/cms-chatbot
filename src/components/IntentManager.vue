<template>
  <div class="p-6 bg-gray-100 min-h-screen">
    <h2 class="text-3xl font-bold text-center text-blue-700 mb-8 flex items-center justify-center gap-2">
      <LucideTarget /> Manajemen Chatbot Intents
    </h2>
     <div class="flex justify-end mb-4">
      <button @click="logout" class="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition">
        <LucideLogOut class="inline w-4 h-4 mr-1" /> Logout
      </button>
    </div>

    <!-- Form -->
    <div class="bg-white p-6 rounded-xl shadow-md max-w-3xl mx-auto mb-8">
      <h3 class="text-xl font-semibold mb-4">Tambah / Edit Intent</h3>
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label class="block font-medium mb-1">Nama</label>
          <input v-model="form.name" placeholder="Nama" type="text" class="w-full p-2 border rounded-lg" />
        </div>
        <div>
          <label class="block font-medium mb-1">Deskripsi</label>
          <textarea v-model="form.description" placeholder="Deskripsi" rows="2" class="w-full p-2 border rounded-lg"></textarea>
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
    </div>
    
    <!-- Tabel -->
    <div class="bg-white rounded-xl shadow-md max-w-3xl mx-auto mb-8">
      <table class="min-w-full rounded-xl">
        <thead class="bg-blue-600 text-white rounded-xl">
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
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { LucideSave, LucideX, LucidePencil, LucideTrash2, LucideTarget } from 'lucide-vue-next'
import api from '../service/api'

const intents = ref([])
const form = ref({ id: null, name: '', description: '' })

const loadIntents = async () => {
  try {
    const res = await api.get('/chatbot/intents') // Ubah endpoint
    console.log('Data dari API:', res.data)
    intents.value = res.data.data // Sesuaikan struktur
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
    loadIntents()
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
      loadIntents()
    } catch (error) {
      console.error('Gagal menghapus intent:', error)
    }
  }
}

onMounted(() => {
  loadIntents()
})
</script>

<style scoped>
table th,
table td {
  padding: 0.75rem;
}
</style>
