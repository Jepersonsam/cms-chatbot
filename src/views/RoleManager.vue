<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
    <div class="max-w-7xl mx-auto">
      <!-- Header Section -->
      <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-8">
        <div class="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <h1 class="text-3xl font-bold text-slate-800 mb-2">Manajemen Role</h1>
            <p class="text-slate-600">Kelola peran dan izin pengguna dalam sistem</p>
          </div>
          <button 
            @click="openForm()" 
            class="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            Tambah Role
          </button>
        </div>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-blue-100">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-slate-600">Total Roles</p>
              <p class="text-2xl font-bold text-slate-900">{{ roles.length }}</p>
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-green-100">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-slate-600">Total Permissions</p>
              <p class="text-2xl font-bold text-slate-900">{{ allPermissions.length }}</p>
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-purple-100">
              <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-slate-600">Active Roles</p>
              <p class="text-2xl font-bold text-slate-900">{{ roles.filter(r => r.permissions.length > 0).length }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Table Section -->
      <div class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div class="px-8 py-6 border-b border-slate-200">
          <h2 class="text-xl font-semibold text-slate-800">Daftar Role</h2>
        </div>
        
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-slate-50">
              <tr>
                <th class="text-left px-8 py-4 text-slate-700 font-semibold text-sm uppercase tracking-wider">Nama Role</th>
                <th class="text-left px-8 py-4 text-slate-700 font-semibold text-sm uppercase tracking-wider">Permissions</th>
                <th class="text-left px-8 py-4 text-slate-700 font-semibold text-sm uppercase tracking-wider">Status</th>
                <th class="text-center px-8 py-4 text-slate-700 font-semibold text-sm uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-200">
              <tr v-for="role in roles" :key="role.id" class="hover:bg-slate-50 transition-colors duration-200">
                <td class="px-8 py-6">
                  <div class="flex items-center">
                    <div class="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      {{ role.name.charAt(0).toUpperCase() }}
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-semibold text-slate-900">{{ role.name }}</div>
                      <div class="text-sm text-slate-500">Role ID: #{{ role.id }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-8 py-6">
                  <div class="flex flex-wrap gap-1">
                    <span 
                      v-for="permission in role.permissions.slice(0, 3)" 
                      :key="permission.name"
                      class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                    >
                      {{ permission.name }}
                    </span>
                    <span 
                      v-if="role.permissions.length > 3"
                      class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600"
                    >
                      +{{ role.permissions.length - 3 }} lainnya
                    </span>
                  </div>
                </td>
                <td class="px-8 py-6">
                  <span 
                    :class="role.permissions.length > 0 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'"
                    class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"
                  >
                    <span 
                      :class="role.permissions.length > 0 ? 'bg-green-400' : 'bg-yellow-400'"
                      class="w-2 h-2 rounded-full mr-2"
                    ></span>
                    {{ role.permissions.length > 0 ? 'Aktif' : 'Tidak Aktif' }}
                  </span>
                </td>
                <td class="px-8 py-6">
                  <div class="flex items-center justify-center gap-2">
                    <button 
                      @click="openForm(role)" 
                      class="inline-flex items-center gap-1 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 transform hover:-translate-y-0.5 shadow-md hover:shadow-lg"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                      </svg>
                      Edit
                    </button>
                    <button 
                      @click="showDeleteConfirm(role.id, role.name)" 
                      class="inline-flex items-center gap-1 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 transform hover:-translate-y-0.5 shadow-md hover:shadow-lg"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                      </svg>
                      Hapus
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <!-- Empty State -->
        <div v-if="roles.length === 0" class="text-center py-12">
          <svg class="w-16 h-16 text-slate-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
          </svg>
          <h3 class="text-lg font-medium text-slate-900 mb-2">Belum ada role</h3>
          <p class="text-slate-500 mb-4">Mulai dengan menambahkan role pertama untuk sistem Anda.</p>
          <button 
            @click="openForm()" 
            class="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            Tambah Role Pertama
          </button>
        </div>
      </div>
    </div>

    <!-- Role Form Modal -->
    <RoleForm
      v-if="showForm"
      :role="selectedRole"
      :allPermissions="allPermissions"
      @submit="saveRole"
      @close="showForm = false"
    />

    <!-- Enhanced Delete Confirmation Modal -->
    <Transition name="modal">
      <div 
        v-if="showDeleteModal" 
        class="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        @click.self="cancelDelete"
      >
        <div class="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md transform transition-all">
          <!-- Icon -->
          <div class="w-16 h-16 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
            <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.864-.833-2.634 0L4.168 15.5c-.77.833.192 2.5 1.732 2.5z"></path>
            </svg>
          </div>
          
          <!-- Content -->
          <div class="text-center mb-8">
            <h3 class="text-2xl font-bold text-slate-900 mb-3">Konfirmasi Penghapusan</h3>
            <p class="text-slate-600 mb-2">Apakah Anda yakin ingin menghapus role</p>
            <p class="text-lg font-semibold text-slate-900 mb-4">"{{ roleToDeleteName }}"?</p>
            <div class="bg-red-50 border border-red-200 rounded-xl p-4">
              <p class="text-sm text-red-700 font-medium">
                ⚠️ Tindakan ini tidak dapat dibatalkan
              </p>
            </div>
          </div>
          
          <!-- Actions -->
          <div class="flex gap-3">
            <button 
              @click="cancelDelete" 
              class="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:-translate-y-0.5"
            >
              Batal
            </button>
            <button 
              @click="confirmDelete" 
              class="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
            >
              Ya, Hapus
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script>
import RoleForm from '../components/RoleForm.vue'
import roleAPI from '../service/role'

export default {
  components: { RoleForm },
  data() {
    return {
      roles: [],
      allPermissions: [],
      selectedRole: null,
      showForm: false,
      showDeleteModal: false,
      roleToDelete: null,
      roleToDeleteName: ''
    }
  },
  mounted() {
    this.fetchRoles()
    this.fetchPermissions()
  },
  methods: {
    fetchRoles() {
      roleAPI.getAll().then(res => this.roles = res.data)
    },
    fetchPermissions() {
      roleAPI.getPermissions().then(res => {
        this.allPermissions = res.data.map(p => p.name)
      })
    },
    openForm(role = null) {
      this.selectedRole = role
      this.showForm = true
    },
    saveRole(form) {
      const api = this.selectedRole
        ? roleAPI.update(this.selectedRole.id, form)
        : roleAPI.create(form)

      api.then(() => {
        this.fetchRoles()
        this.selectedRole = null
        this.showForm = false
      })
    },
    showDeleteConfirm(id, name) {
      this.roleToDelete = id
      this.roleToDeleteName = name
      this.showDeleteModal = true
    },
    confirmDelete() {
      if (this.roleToDelete) {
        roleAPI.delete(this.roleToDelete).then(() => {
          this.fetchRoles()
          this.showDeleteModal = false
          this.roleToDelete = null
          this.roleToDeleteName = ''
        })
      }
    },
    cancelDelete() {
      this.showDeleteModal = false
      this.roleToDelete = null
      this.roleToDeleteName = ''
    }
  }
}
</script>

<style scoped>
.modal-enter-active, .modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from, .modal-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

.modal-enter-to, .modal-leave-from {
  opacity: 1;
  transform: scale(1);
}
</style>