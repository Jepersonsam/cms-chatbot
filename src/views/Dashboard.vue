<template>
  <div class="p-6">
    <!-- Header -->
    <h1 class="text-2xl font-bold text-gray-800 mb-4">Dashboard</h1>

    <!-- Selamat Datang -->
    <div class="bg-blue-300 p-4 rounded-lg shadow mb-6">
      <h2 class="text-xl font-semibold text-gray-700">Selamat Datang di Chatbot CMS</h2>
      <p class="mt-2 text-gray-600">Kelola chatbot Anda dengan efisien. Tanggal: {{ currentDate }}</p>
    </div>

    <!-- Statistik Utama -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div class="bg-white p-4 rounded-lg shadow">
        <h3 class="text-lg font-semibold text-gray-700">Total Intents</h3>
        <p class="text-2xl text-blue-600">45</p>
      </div>
      <div class="bg-white p-4 rounded-lg shadow">
        <h3 class="text-lg font-semibold text-gray-700">Total Questions</h3>
        <p class="text-2xl text-blue-600">100</p>
      </div>
      <div class="bg-white p-4 rounded-lg shadow">
        <h3 class="text-lg font-semibold text-gray-700">Total Responses</h3>
        <p class="text-2xl text-blue-600">75</p>
      </div>
    </div>

    <!-- Aktivitas Terbaru -->
    <div class="bg-white p-4 rounded-lg shadow">
      <h3 class="text-lg font-semibold text-gray-700 mb-2">Aktivitas Terbaru</h3>
      <ul class="text-gray-600 space-y-2">
        <li>Intent 'Greeting' ditambahkan pada 09:15 PM, 26 Mei 2025</li>
        <li>Question 'How are you?' diedit pada 09:00 PM, 26 Mei 2025</li>
        <li>Response 'I’m good!' ditambahkan pada 08:45 PM, 26 Mei 2025</li>
      </ul>
    </div>

    <!-- Tombol Navigasi -->
    <!-- <div class="mt-6">
      <router-link to="/manage-chatbot" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Kelola Chatbot
      </router-link>
    </div> -->
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// Tanggal dan waktu saat ini
const currentDate = ref(new Date().toLocaleString('id-ID', {
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
  day: '2-digit',
  month: 'long',
  year: 'numeric'
}).replace('pukul', '')) // Format: "09:18 PM, 26 Mei 2025"

onMounted(() => {
  // Perbarui waktu setiap detik (opsional)
  setInterval(() => {
    currentDate.value = new Date().toLocaleString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    }).replace('pukul', '')
  }, 1000)
})
</script>

<style scoped>
</style>