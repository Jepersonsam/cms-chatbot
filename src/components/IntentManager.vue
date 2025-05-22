<template>
  <div class="max-w-5xl mx-auto p-6">
    <h2 class="text-3xl font-bold text-gray-800 mb-8">🎯 Manajemen Chatbot Intents</h2>

    <!-- FORM -->
    <form @submit.prevent="createIntent" class="bg-white p-6 rounded-xl shadow-md space-y-4 mb-8 border border-gray-200 ">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input v-model="newIntent.id" placeholder="ID" required class="input-field" />
        <input v-model="newIntent.name" placeholder="Intent Name" required class="input-field" />
        <input v-model="newIntent.description" placeholder="Description" required class="input-field" />
      </div>

      <div class="flex flex-col sm:flex-row justify-end gap-4">
        <button type="submit" class="btn-primary">💾 Simpan</button>
        <button type="button" @click="resetForm" class="btn-secondary">❌ Batal</button>
      </div>
    </form>

    <!-- TABEL -->
    <div class="overflow-auto bg-white rounded-xl shadow-md border border-gray-200">
      <table class="w-full min-w-[600px] table-auto text-left ">
        <thead class="bg-gray-100 text-gray-700 font-semibold flex justify-content-center">
          <tr>
            <th class="p-4">ID</th>
            <th class="p-4">Name</th>
            <th class="p-4">Description</th>
            <th class="p-4">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="intent in intents"
            :key="intent.id"
            class="border-t hover:bg-gray-50 transition"
          >
            <td class="p-4">{{ intent.id }}</td>
            <td class="p-4">{{ intent.name }}</td>
            <td class="p-4">{{ intent.description }}</td>
            <td class="p-4">
              <div class="flex space-x-2">
                <button @click="editIntent(intent)" class="btn-icon blue">✏️ Edit</button>
                <button @click="deleteIntent(intent.id)" class="btn-icon red">🗑️ Hapus</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../service/api'

const intents = ref([])
const newIntent = ref({ id: '', name: '', description: '' })

const fetchIntents = async () => {
  try {
    const response = await api.get('/chatbot/intents')
    intents.value = response.data.data
  } catch (error) {
    console.error('Failed to fetch intents:', error)
  }
}

const createIntent = async () => {
  try {
    await api.post('/chatbot/intents', newIntent.value)
    resetForm()
    fetchIntents()
  } catch (error) {
    console.error('Failed to create intent:', error)
  }
}

const deleteIntent = async (id) => {
  try {
    await api.delete(`/chatbot/intents/${id}`)
    fetchIntents()
  } catch (error) {
    console.error('Failed to delete intent:', error)
  }
}

const editIntent = (intent) => {
  newIntent.value = { ...intent }
}

const resetForm = () => {
  newIntent.value.id = ''
  newIntent.value.name = ''
  newIntent.value.description = ''
}

onMounted(fetchIntents)
</script>

<style scoped>
.input-field {
  @apply w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition bg-white text-gray-800;
}

.btn-primary {
  @apply bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-400;
}

.btn-secondary {
  @apply bg-gray-500 text-white px-5 py-2 rounded-lg hover:bg-gray-600 transition focus:outline-none focus:ring-2 focus:ring-gray-300;
}

.btn-icon {
  @apply text-sm px-4 py-1.5 rounded-lg font-medium transition;
}

.btn-icon.blue {
  @apply bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-300;
}

.btn-icon.red {
  @apply bg-red-500 text-white hover:bg-red-600 focus:ring-red-300;
}
</style>
