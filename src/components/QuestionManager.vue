<template>
  <div class="container mx-auto p-4">
    <h2 class="text-2xl font-bold text-gray-800 mb-6">Chatbot Questions</h2>

    <form @submit.prevent="createQuestion" class="bg-white p-6 rounded-lg shadow-md mb-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          v-model="newQuestion.intent_id"
          placeholder="Intent ID"
          required
          class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          v-model="newQuestion.question_text"
          placeholder="Question Text"
          required
          class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          v-model="newQuestion.input_key"
          placeholder="Input Key"
          required
          class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          v-model="newQuestion.input_type"
          placeholder="Input Type"
          required
          class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          v-model="newQuestion.options"
          placeholder="Options"
          required
          class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          v-model="newQuestion.is_required"
          placeholder="Is Required"
          required
          class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          v-model="newQuestion.order"
          placeholder="Order"
          required
          class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div class="mt-4 flex space-x-2">
        <button
          type="submit"
         class="btn-primary">
          💾 Simpan
        </button>
        <button
          type="button"
          @click="resetForm" class="btn-secondary">
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
            <th class="p-3">Text</th>
            <th class="p-3">Input Key</th>
            <th class="p-3">Input Type</th>
            <th class="p-3">Options</th>
            <th class="p-3">Is Required</th>
            <th class="p-3">Order</th>
            <th class="p-3">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="question in questions" :key="question.id" class="border-b hover:bg-gray-50">
            <td class="p-3">{{ question.id }}</td>
            <td class="p-3">{{ question.intent_id }}</td>
            <td class="p-3">{{ question.question_text }}</td>
            <td class="p-3">{{ question.input_key }}</td>
            <td class="p-3">{{ question.input_type }}</td>
            <td class="p-3">{{ question.options }}</td>
            <td class="p-3">{{ question.is_required }}</td>
            <td class="p-3">{{ question.order }}</td>
            <td class="p-3 flex space-x-2">
              <button
                @click="editQuestion(question)" 
                class="btn-icon blue">
                  ✏️ Edit
              </button>
              <button
                @click="deleteQuestion(question.id)"
                class="btn-icon red">
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

const questions = ref([])
const newQuestion = ref({
  intent_id: '',
  text: '',
  input_key: '',
  input_type: '',
  options: '',
  is_required: '',
  order: ''
})

const fetchQuestions = async () => {
  try {
    const response = await api.get('/chatbot/questions')
    questions.value = response.data.data
  } catch (error) {
    console.error('Failed to fetch questions:', error)
  }
}

const createQuestion = async () => {
  try {
    await api.post('/chatbot/questions', newQuestion.value)
    resetForm()
    fetchQuestions()
  } catch (error) {
    console.error('Failed to create question:', error)
  }
}

const deleteQuestion = async (id) => {
  try {
    await api.delete(`/chatbot/questions/${id}`)
    fetchQuestions()
  } catch (error) {
    console.error('Failed to delete question:', error)
  }
}

const editQuestion = (question) => {
  newQuestion.value = { ...question }
}

const resetForm = () => {
  newQuestion.value.intent_id = ''
  newQuestion.value.question_text = ''
  newQuestion.value.input_key = ''
  newQuestion.value.input_type = ''
  newQuestion.value.options = ''
  newQuestion.value.is_required = ''
  newQuestion.value.order = ''
}

onMounted(fetchQuestions)
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
