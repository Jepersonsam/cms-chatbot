<template>
  <div class="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 p-6">
    <div class="max-w-7xl mx-auto">
      <!-- Header Section -->
      <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-8">
        <div class="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <h1 class="text-3xl font-bold text-slate-800 mb-2">Permission Manager</h1>
            <p class="text-slate-600">Kelola izin dan hak akses dalam sistem</p>
          </div>
          <div class="flex items-center gap-4">
            <div class="bg-gradient-to-r from-purple-100 to-indigo-100 px-4 py-2 rounded-xl">
              <span class="text-purple-700 font-semibold">{{ permissions.length }} Permissions</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Form Section -->
      <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-8">
        <div class="flex items-center gap-4 mb-6">
          <div class="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
          </div>
          <div>
            <h2 class="text-xl font-semibold text-slate-800">
              {{ isEditing ? 'Edit Permission' : 'Tambah Permission Baru' }}
            </h2>
            <p class="text-slate-600">
              {{ isEditing ? 'Perbarui nama permission yang sudah ada' : 'Buat permission baru untuk sistem' }}
            </p>
          </div>
        </div>

        <form @submit.prevent="isEditing ? updatePermission() : createPermission()" class="flex flex-col md:flex-row gap-4">
          <div class="flex-1">
            <label class="block text-sm font-medium text-slate-700 mb-2">Nama Permission</label>
            <input
              v-model="form.name"
              type="text"
              placeholder="Masukkan nama permission (contoh: create_user, edit_post)"
              class="w-full border-2 border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-200"
              required
            />
          </div>
          <div class="flex gap-3 md:items-end">
            <button
              type="submit"
              class="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 font-medium"
            >
              <svg v-if="!isEditing" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              {{ isEditing ? 'Update' : 'Buat Permission' }}
            </button>
            <button
              v-if="isEditing"
              @click="cancelEdit"
              type="button"
              class="inline-flex items-center gap-2 bg-slate-500 hover:bg-slate-600 text-white px-6 py-3 rounded-xl transition-all duration-200 transform hover:-translate-y-0.5 font-medium"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
              Batal
            </button>
          </div>
        </form>
      </div>

      <!-- Table Section -->
      <div class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div class="px-8 py-6 border-b border-slate-200">
          <div class="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <h2 class="text-xl font-semibold text-slate-800">Daftar Permissions</h2>
            <div class="flex items-center gap-2 text-sm text-slate-600">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
              </svg>
              {{ permissions.length }} Total Permissions
            </div>
          </div>
        </div>
        
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-slate-50">
              <tr>
                <th class="text-left px-8 py-4 text-slate-700 font-semibold text-sm uppercase tracking-wider">ID</th>
                <th class="text-left px-8 py-4 text-slate-700 font-semibold text-sm uppercase tracking-wider">Permission Name</th>
                <th class="text-left px-8 py-4 text-slate-700 font-semibold text-sm uppercase tracking-wider">Status</th>
                <th class="text-center px-8 py-4 text-slate-700 font-semibold text-sm uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-200">
              <tr v-for="permission in permissions" :key="permission.id" class="hover:bg-slate-50 transition-colors duration-200">
                <td class="px-8 py-6">
                  <div class="flex items-center">
                    <div class="w-8 h-8 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xs">
                      #{{ permission.id }}
                    </div>
                  </div>
                </td>
                <td class="px-8 py-6">
                  <div class="flex items-center">
                    <div class="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm mr-4">
                      {{ permission.name.charAt(0).toUpperCase() }}
                    </div>
                    <div>
                      <div class="text-sm font-semibold text-slate-900">{{ permission.name }}</div>
                      <div class="text-sm text-slate-500">Permission ID: #{{ permission.id }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-8 py-6">
                  <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <span class="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                    Aktif
                  </span>
                </td>
                <td class="px-8 py-6">
                  <div class="flex items-center justify-center gap-2">
                    <button
                      @click="editPermission(permission)"
                      class="inline-flex items-center gap-1 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 transform hover:-translate-y-0.5 shadow-md hover:shadow-lg"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                      </svg>
                      Edit
                    </button>
                    <button
                      @click="showDeleteConfirm(permission.id, permission.name)"
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
        <div v-if="permissions.length === 0" class="text-center py-12">
          <svg class="w-16 h-16 text-slate-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
          </svg>
          <h3 class="text-lg font-medium text-slate-900 mb-2">Belum ada permission</h3>
          <p class="text-slate-500 mb-4">Mulai dengan membuat permission pertama untuk sistem Anda.</p>
        </div>
      </div>
    </div>

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
            <h3 class="text-2xl font-bold text-slate-900 mb-3">Hapus Permission</h3>
            <p class="text-slate-600 mb-2">Apakah Anda yakin ingin menghapus permission</p>
            <div class="bg-slate-100 rounded-xl p-3 mb-4">
              <p class="text-lg font-semibold text-slate-900">"{{ permissionToDeleteName }}"</p>
            </div>
            <div class="bg-red-50 border border-red-200 rounded-xl p-4">
              <div class="flex items-start gap-3">
                <svg class="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.864-.833-2.634 0L4.168 15.5c-.77.833.192 2.5 1.732 2.5z"></path>
                </svg>
                <div class="text-left">
                  <p class="text-sm font-medium text-red-800 mb-1">Peringatan!</p>
                  <p class="text-sm text-red-700">Menghapus permission ini akan menghilangkan akses untuk semua role yang menggunakannya. Tindakan ini tidak dapat dibatalkan.</p>
                </div>
              </div>
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
              <span class="flex items-center justify-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                </svg>
                Ya, Hapus
              </span>
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script>
import api from '../service/api';

export default {
  name: 'PermissionManager',
  data() {
    return {
      permissions: [],
      form: {
        id: null,
        name: ''
      },
      isEditing: false,
      showDeleteModal: false,
      permissionToDelete: null,
      permissionToDeleteName: ''
    };
  },
  methods: {
    async fetchPermissions() {
      try {
        const res = await api.get('/permissions');
        this.permissions = res.data;
      } catch (error) {
        console.error('Failed to fetch permissions:', error);
      }
    },
    async createPermission() {
      try {
        await api.post('/permissions', { name: this.form.name });
        this.form.name = '';
        this.fetchPermissions();
      } catch (error) {
        console.error('Failed to create permission:', error);
      }
    },
    editPermission(permission) {
      this.isEditing = true;
      this.form.id = permission.id;
      this.form.name = permission.name;
    },
    async updatePermission() {
      try {
        await api.put(`/permissions/${this.form.id}`, { name: this.form.name });
        this.cancelEdit();
        this.fetchPermissions();
      } catch (error) {
        console.error('Failed to update permission:', error);
      }
    },
    cancelEdit() {
      this.isEditing = false;
      this.form.id = null;
      this.form.name = '';
    },
    showDeleteConfirm(id, name) {
      this.permissionToDelete = id;
      this.permissionToDeleteName = name;
      this.showDeleteModal = true;
    },
    async confirmDelete() {
      if (this.permissionToDelete) {
        try {
          await api.delete(`/permissions/${this.permissionToDelete}`);
          this.fetchPermissions();
          this.showDeleteModal = false;
          this.permissionToDelete = null;
          this.permissionToDeleteName = '';
        } catch (error) {
          console.error('Failed to delete permission:', error);
        }
      }
    },
    cancelDelete() {
      this.showDeleteModal = false;
      this.permissionToDelete = null;
      this.permissionToDeleteName = '';
    }
  },
  mounted() {
    this.fetchPermissions();
  }
};
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