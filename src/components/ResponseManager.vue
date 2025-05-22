<template>
  <div class="container mx-auto p-6">
    <h2 class="text-2xl font-bold text-gray-800 mb-6">Chatbot Responses</h2>

    <form @submit.prevent="createResponse" class="bg-white p-6 rounded-lg shadow-md mb-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          v-model="newResponse.intent_id"
          placeholder="Intent ID"
          required
          class="input-field"
        />
        <input
          v-model="newResponse.response_text"
          placeholder="Response Text"
          required
          class="input-field"
        />
        <input
          v-model="newResponse.type"
          placeholder="Type (e.g., SOL_KEY)"
          required
          class="input-field"
        />
        <input
          v-model="newResponse.value"
          placeholder="Value"
          required
          class="input-field"
        />
        <input
          v-model="newResponse.params"
          placeholder="Params"
          required
          class="input-field"
        />
      </div>
      <div class="mt-4 flex space-x-2">
        <button type="submit" class="btn-primary">
          💾 Simpan
        </button>
        <button type="button" @click="resetForm" class="btn-secondary">
          ❌ Batal
        </button>
      </div>
    </form>

    <div class="bg-white rounded-lg shadow-md overflow-x-auto">
      <table class="w-full text-left">
        <thead class="bg-gray-100 text-gray-700">
          <tr>
            <th class="p-3">ID</th>
            <th class="p-3">Intent ID</th>
            <th class="p-3">Response Text</th>
            <th class="p-3">Type</th>
            <th class="p-3">Value</th>
            <th class="p-3">Params</th>
            <th class="p-3">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="response in responses" :key="response.id" class="border-b hover:bg-gray-50">
            <td class="p-3">{{ response.id }}</td>
            <td class="p-3">{{ response.intent_id }}</td>
            <td class="p-3">{{ response.response_text }}</td>
            <td class="p-3">{{ response.type }}</td>
            <td class="p-3">{{ response.value }}</td>
            <td class="p-3">{{ response.params }}</td>
            <td class="p-3 flex space-x-2">
              <button @click="editResponse(response)" class="btn-icon blue">
                ✏️ Edit
              </button>
              <button @click="deleteResponse(response.id)" class="btn-icon red">
                🗑️ Hapus
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
import api from '../service/api'

const responses = ref([])
const newResponse = ref({
  intent_id: '',
  response_text: '',
  type: '',
  value: '',
  params: ''
})

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
    fetchResponses()
  } catch (error) {
    console.error('Failed to create response:', error)
  }
}

const deleteResponse = async (id) => {
  try {
    await api.delete(`/chatbot/responses/${id}`)
    fetchResponses()
  } catch (error) {
    console.error('Failed to delete response:', error)
  }
}

const editResponse = (response) => {
  newResponse.value = { ...response }
}

const resetForm = () => {
  newResponse.value.intent_id = ''
  newResponse.value.response_text = ''
  newResponse.value.type = ''
  newResponse.value.value = ''
  newResponse.value.params = ''
}

onMounted(fetchResponses)
</script>

<style scoped>
.input-field {
  @apply w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition;
}
.btn-primary {
  @apply bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-400;
}
.btn-secondary {
  @apply bg-gray-400 text-white px-5 py-2 rounded-lg hover:bg-gray-500 transition focus:outline-none focus:ring-2 focus:ring-gray-300;
}
.btn-icon {
  @apply text-sm px-3 py-1 rounded-lg font-semibold transition;
}
.btn-icon.blue {
  @apply bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-400;
}
.btn-icon.red {
  @apply bg-red-600 text-white hover:bg-red-700 focus:ring-red-400;
}
</style>