<template>
  <div class="max-w-5xl mx-auto p-6">
    <h2 class="text-3xl font-bold text-gray-800 mb-8 flex items-center justify-center gap-2">
      🎯 Manajemen Chatbot Questions
    </h2>
    <div v-if="isAuthenticated" class="bg-white p-6 rounded-xl shadow-md">
      <h3 class="text-xl font-semibold mb-4">Tambah / Edit Question</h3>
      <form @submit.prevent="createQuestion" class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block font-medium text-gray-700 mb-1">Intent ID</label>
            <input
              v-model="newQuestion.intent_id"
              placeholder="Intent ID"
              required
              class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            />
          </div>
          <div>
            <label class="block font-medium text-gray-700 mb-1">Question Text</label>
            <input
              v-model="newQuestion.question_text"
              placeholder="Question Text"
              required
              class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            />
          </div>
          <div>
            <label class="block font-medium text-gray-700 mb-1">Input Key</label>
            <input
              v-model="newQuestion.input_key"
              placeholder="Input Key"
              required
              class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            />
          </div>
          <div>
            <label class="block font-medium text-gray-700 mb-1">Input Type</label>
            <input
              v-model="newQuestion.input_type"
              placeholder="Input Type"
              required
              class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            />
          </div>
          <div>
            <label class="block font-medium text-gray-700 mb-1">Options</label>
            <input
              v-model="newQuestion.options"
              placeholder="Options"
              required
              class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            />
          </div>
          <div>
            <label class="block font-medium text-gray-700 mb-1">Is Required</label>
            <input
              v-model="newQuestion.is_required"
              placeholder="Is Required"
              required
              class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            />
          </div>
          <div>
            <label class="block font-medium text-gray-700 mb-1">Order</label>
            <input
              v-model="newQuestion.order"
              placeholder="Order"
              required
              class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            />
          </div>
        </div>
        <div class="flex justify-end gap-4">
          <button
            type="submit"
            class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-1 shadow-md"
          >
            <LucideSave class="w-4 h-4" /> Simpan
          </button>
          <button
            @click="resetForm"
            type="button"
            class="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition flex items-center gap-1"
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
              <th class="px-4 py-2 text-left font-semibold">Intent ID</th>
              <th class="px-4 py-2 text-left font-semibold">Text</th>
              <th class="px-4 py-2 text-left font-semibold">Input Key</th>
              <th class="px-4 py-2 text-left font-semibold">Input Type</th>
              <th class="px-4 py-2 text-left font-semibold">Options</th>
              <th class="px-4 py-2 text-left font-semibold">Is Required</th>
              <th class="px-4 py-2 text-left font-semibold">Order</th>
              <th class="px-4 py-2 text-center font-semibold">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="question in questions" :key="question.id" class="border-b hover:bg-gray-50 transition duration-150">
              <td class="px-4 py-2 text-gray-800">{{ question.id }}</td>
              <td class="px-4 py-2 text-gray-800">{{ question.intent_id }}</td>
              <td class="px-4 py-2 text-gray-800">{{ question.question_text }}</td>
              <td class="px-4 py-2 text-gray-800">{{ question.input_key }}</td>
              <td class="px-4 py-2 text-gray-800">{{ question.input_type }}</td>
              <td class="px-4 py-2 text-gray-800">{{ question.options }}</td>
              <td class="px-4 py-2 text-gray-800">{{ question.is_required }}</td>
              <td class="px-4 py-2 text-gray-800">{{ question.order }}</td>
              <td class="px-4 py-2 text-center flex justify-center gap-2">
                <button @click="editQuestion(question)" class="text-blue-600 hover:text-blue-800 transition">
                  <LucidePencil class="w-4 h-4" />
                </button>
                <button @click="showDeleteConfirm(question.id)" class="text-red-600 hover:text-red-800 transition">
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
        <p class="text-gray-600 mb-4">Apakah Anda yakin ingin menghapus question ini?</p>
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
const isAuthenticated = computed(() => !!localStorage.getItem('token'))
const showDeleteModal = ref(false)
const questionToDelete = ref(null)

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
    fetchQuestions() // Refresh data setelah simpan
  } catch (error) {
    console.error('Failed to create question:', error)
  }
}

const editQuestion = (question) => {
  newQuestion.value = { ...question }
}

const showDeleteConfirm = (id) => {
  questionToDelete.value = id
  showDeleteModal.value = true
}

const confirmDelete = async () => {
  if (questionToDelete.value) {
    try {
      await api.delete(`/chatbot/questions/${questionToDelete.value}`)
      fetchQuestions() // Refresh data setelah hapus
      showDeleteModal.value = false
      questionToDelete.value = null
    } catch (error) {
      console.error('Failed to delete question:', error)
    }
  }
}

const cancelDelete = () => {
  showDeleteModal.value = false
  questionToDelete.value = null
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

onMounted(() => {
  if (isAuthenticated.value) {
    fetchQuestions() // Panggil saat komponen dimuat
  } else {
    window.location.href = '/login'
  }
})

watch(isAuthenticated, (newValue) => {
  if (newValue) {
    fetchQuestions() // Refresh data saat autentikasi berubah (misalnya login)
  }
})
</script>