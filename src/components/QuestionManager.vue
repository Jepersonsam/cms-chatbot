<template>
  <div class="max-w-5xl mx-auto p-6">
    <h2 class="text-3xl font-bold text-gray-800 mb-8 flex items-center justify-center gap-2">
      🎯 Manajemen Chatbot Questions
    </h2>

    <!-- Form -->
    <form @submit.prevent="createQuestion" class="bg-white p-6 rounded-xl shadow-md space-y-4 mb-8 border border-gray-200">
      <h3 class="text-xl font-semibold mb-4">Tambah / Edit Question</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block font-medium mb-1">Intent ID</label>
          <input
            v-model="newQuestion.intent_id"
            placeholder="Intent ID"
            required
            class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label class="block font-medium mb-1">Question Text</label>
          <input
            v-model="newQuestion.question_text"
            placeholder="Question Text"
            required
            class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label class="block font-medium mb-1">Input Key</label>
          <input
            v-model="newQuestion.input_key"
            placeholder="Input Key"
            required
            class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label class="block font-medium mb-1">Input Type</label>
          <input
            v-model="newQuestion.input_type"
            placeholder="Input Type"
            required
            class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label class="block font-medium mb-1">Options</label>
          <input
            v-model="newQuestion.options"
            placeholder="Options"
            required
            class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label class="block font-medium mb-1">Is Required</label>
          <input
            v-model="newQuestion.is_required"
            placeholder="Is Required"
            required
            class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label class="block font-medium mb-1">Order</label>
          <input
            v-model="newQuestion.order"
            placeholder="Order"
            required
            class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      <div class="flex flex-col sm:flex-row justify-end gap-4">
        <button type="submit" class="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition">
          <LucideSave class="inline w-4 h-4 mr-1" /> Simpan
        </button>
        <button type="button" @click="resetForm" class="bg-gray-500 text-white px-5 py-2 rounded-lg hover:bg-gray-600 transition">
          <LucideX class="inline w-4 h-4 mr-1" /> Batal
        </button>
      </div>
    </form>

    <!-- Tabel -->
    <div class="bg-white rounded-xl shadow-md overflow-x-auto">
      <table class="w-full min-w-[600px] table-auto text-left">
        <thead class="bg-blue-600 text-white">
          <tr>
            <th class="p-4">ID</th>
            <th class="p-4">Intent ID</th>
            <th class="p-4">Text</th>
            <th class="p-4">Input Key</th>
            <th class="p-4">Input Type</th>
            <th class="p-4">Options</th>
            <th class="p-4">Is Required</th>
            <th class="p-4">Order</th>
            <th class="p-4">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="question in questions" :key="question.id" class="border-t hover:bg-gray-50 transition">
            <td class="p-4">{{ question.id }}</td>
            <td class="p-4">{{ question.intent_id }}</td>
            <td class="p-4">{{ question.question_text }}</td>
            <td class="p-4">{{ question.input_key }}</td>
            <td class="p-4">{{ question.input_type }}</td>
            <td class="p-4">{{ question.options }}</td>
            <td class="p-4">{{ question.is_required }}</td>
            <td class="p-4">{{ question.order }}</td>
            <td class="p-4 flex space-x-2">
              <button @click="editQuestion(question)" class="text-blue-600 hover:text-blue-800">
                <LucidePencil class="w-4 h-4" />
              </button>
              <button @click="deleteQuestion(question.id)" class="text-red-600 hover:text-red-800">
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
import { LucideSave, LucideX, LucidePencil, LucideTrash2 } from 'lucide-vue-next'
import api from '../service/api'

const questions = ref([])
const newQuestion = ref({
  intent_id: '',
  question_text: '',
  input_key: '',
  input_type: '',
  options: '',
  is_required: '',
  order: ''
})

const fetchQuestions = async () => {
  try {
    const response = await api.get('/chatbot/questions')
    console.log('Respons API:', response.data)
    questions.value = response.data.data
  } catch (error) {
    console.error('Failed to fetch questions:', error)
  }
}

const updateQuestion = async () => {
  try {
    await api.put(`/chatbot/questions/${newQuestion.value.id}`, newQuestion.value)
    resetForm()
    fetchQuestions()
  } catch (error) {
    console.error('Failed to update question:', error)
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
  newQuestion.value = {
    intent_id: '',
    question_text: '',
    input_key: '',
    input_type: '',
    options: '',
    is_required: '',
    order: ''
  }
}

onMounted(fetchQuestions)
</script>

<style scoped>
/* Gaya tambahan jika diperlukan */
</style>