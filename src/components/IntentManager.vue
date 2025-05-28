<template>
  <div class="max-w-5xl mx-auto p-6">
    <h2 class="text-3xl font-bold text-gray-800 mb-8 flex items-center justify-center gap-2">
      🎯 Manajemen Chatbot Intents
    </h2>
    <div v-if="isAuthenticated" class="bg-white p-6 rounded-xl shadow-md">
      <h3 class="text-xl font-semibold mb-4">Tambah / Edit Intent</h3>
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label class="block font-medium text-gray-700 mb-1">Nama</label>
          <input
            v-model="form.name"
            type="text"
            class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            placeholder="Masukkan nama intent"
          />
        </div>
        <div>
          <label class="block font-medium text-gray-700 mb-1">Deskripsi</label>
          <textarea
            v-model="form.description"
            rows="2"
            class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            placeholder="Masukkan deskripsi intent"
          ></textarea>
        </div>
        <div class="flex gap-2 justify-end">
          <button
            type="submit"
            class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-1 shadow-md"
          >
            <LucideSave class="w-4 h-4" /> Simpan
          </button>
          <button
            @click="resetForm"
            type="button"
            class="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition flex items-center gap-1"
          >
            <LucideX class="w-4 h-4" /> Batal
          </button>
        </div>
      </form>
      <div class="mt-6">
        <table class="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead class="bg-blue-600 text-white">
            <tr>
              <th class="px-4 py-2 text-left font-semibold">ID</th>
              <th class="px-4 py-2 text-left font-semibold">Name</th>
              <th class="px-4 py-2 text-left font-semibold">Description</th>
              <th class="px-4 py-2 text-center font-semibold">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="intent in intents" :key="intent.id" class="border-b hover:bg-gray-50 transition duration-150">
              <td class="px-4 py-2 text-gray-800">{{ intent.id }}</td>
              <td class="px-4 py-2 text-gray-800">{{ intent.name }}</td>
              <td class="px-4 py-2 text-gray-800">{{ intent.description }}</td>
              <td class="px-4 py-2 text-center flex justify-center gap-2">
                <button @click="editIntent(intent)" class="text-blue-600 hover:text-blue-800 transition">
                  <LucidePencil class="w-4 h-4" />
                </button>
                <button @click="showDeleteConfirm(intent.id)" class="text-red-600 hover:text-red-800 transition">
                  <LucideTrash2 class="w-4 h-4" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div v-else class="text-red-600 text-center p-6 bg-red-50 rounded-lg">Anda harus login untuk mengakses halaman ini.</div>

    <!-- Custom Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
        <h3 class="text-lg font-bold text-gray-800 mb-4">Konfirmasi Hapus</h3>
        <p class="text-gray-600 mb-4">Apakah Anda yakin ingin menghapus intent ini?</p>
        <div class="flex justify-end space-x-2">
          <button @click="cancelDelete" class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition duration-200">Tidak</button>
          <button @click="confirmDelete" class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition duration-200">Ya</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import api from '../service/api'
import { LucideSave, LucideX, LucidePencil, LucideTrash2 } from 'lucide-vue-next'

const intents = ref([])
const form = ref({ id: null, name: '', description: '' })
const isAuthenticated = computed(() => !!localStorage.getItem('token'))
const showDeleteModal = ref(false)
const intentToDelete = ref(null)

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

const showDeleteConfirm = (id) => {
  intentToDelete.value = id
  showDeleteModal.value = true
}

const confirmDelete = async () => {
  if (intentToDelete.value) {
    try {
      await api.delete(`/chatbot/intents/${intentToDelete.value}`)
      loadIntents() // Refresh data setelah hapus
      showDeleteModal.value = false
      intentToDelete.value = null
    } catch (error) {
      console.error('Gagal menghapus intent:', error)
    }
  }
}

const cancelDelete = () => {
  showDeleteModal.value = false
  intentToDelete.value = null
}

onMounted(() => {
  if (isAuthenticated.value) {
    loadIntents() // Panggil saat komponen dimuat
  } else {
    window.location.href = '/login'
  }
})

watch(isAuthenticated, (newValue) => {
  if (newValue) {
    loadIntents() // Refresh data saat autentikasi berubah (misalnya login)
  }
})
</script>