<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Header dengan Tombol Navigasi -->
    <header class="bg-white shadow-md">
      <div class="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 class="text-2xl font-extrabold text-gray-900">Chatbot CMS</h1>
        <div class="flex space-x-4">
          <router-link to="/intents">
            <button
              class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
            >
              Manage Intents
            </button>
          </router-link>
          <router-link to="/questions">
            <button
              class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
            >
              Manage Questions
            </button>
          </router-link>
          <router-link to="/responses">
            <button
              class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
            >
              Manage Responses
            </button>
          </router-link>
        </div>
      </div>
    </header>

    <!-- Konten Dinamis dari Router -->
    <div class="pt-6">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
// Tidak perlu script tambahan karena routing ditangani oleh Vue Router
</script>

<style scoped>
/* Styling khusus jika diperlukan */
</style>