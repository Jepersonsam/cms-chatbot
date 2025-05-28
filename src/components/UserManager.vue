<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
    <div class="max-w-7xl mx-auto">
      <!-- Header Section -->
      <div class="mb-8">
        <h1 class="text-4xl font-bold text-gray-800 mb-2">User Management</h1>
        <p class="text-gray-600">Manage your users and their roles efficiently</p>
        <div class="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-4"></div>
      </div>

      <!-- Create/Edit User Card -->
      <div class="bg-white rounded-2xl shadow-xl border border-gray-100 mb-8 overflow-hidden">
        <div class="bg-gradient-to-r from-blue-500 to-purple-600 p-6">
          <h2 class="text-2xl font-bold text-white flex items-center">
            <svg class="w-8 h-8 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            {{ isEditing ? 'Edit User' : 'Add New User' }}
          </h2>
          <p class="text-blue-100 mt-2">{{ isEditing ? 'Update user information' : 'Create a new user account' }}</p>
        </div>
        
        <form @submit.prevent="isEditing ? updateUser() : createUser()" class="p-8">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-2">
              <label class="block text-sm font-semibold text-gray-700">Full Name</label>
              <div class="relative">
                <input 
                  v-model="form.name" 
                  type="text" 
                  placeholder="Enter full name" 
                  class="w-full pl-4 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                  required 
                />
              </div>
            </div>
            
            <div class="space-y-2">
              <label class="block text-sm font-semibold text-gray-700">Email Address</label>
              <div class="relative">
                <input 
                  v-model="form.email" 
                  type="email" 
                  placeholder="Enter email address" 
                  class="w-full pl-4 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                  required 
                />
              </div>
            </div>
            
            <div class="space-y-2">
              <label class="block text-sm font-semibold text-gray-700">Password</label>
              <div class="relative">
                <input 
                  v-model="form.password" 
                  type="password" 
                  placeholder="Enter password" 
                  class="w-full pl-4 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                  :required="!isEditing" 
                />
              </div>
            </div>
            
            <div class="space-y-2">
              <label class="block text-sm font-semibold text-gray-700">Roles</label>
              <select 
                v-model="form.roles" 
                multiple 
                class="w-full pl-4 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white min-h-[120px]"
              >
                <option v-for="role in availableRoles" :key="role" :value="role" class="py-2">{{ role }}</option>
              </select>
              <p class="text-xs text-gray-500">Hold Ctrl/Cmd to select multiple roles</p>
            </div>
          </div>
          
          <div class="flex gap-4 mt-8 pt-6 border-t border-gray-200">
            <button 
              type="submit" 
              class="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-[1.02] focus:ring-4 focus:ring-blue-300 shadow-lg"
            >
              <span class="flex items-center justify-center">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                {{ isEditing ? 'Update User' : 'Create User' }}
              </span>
            </button>
            <button 
              v-if="isEditing" 
              @click="cancelEdit" 
              type="button" 
              class="px-8 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl font-semibold transition-all duration-200 transform hover:scale-[1.02]"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>

      <!-- Users Table Card -->
      <div class="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div class="bg-gradient-to-r from-gray-800 to-gray-900 p-6">
          <h2 class="text-2xl font-bold text-white flex items-center">
            <svg class="w-8 h-8 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
            </svg>
            All Users
          </h2>
          <p class="text-gray-300 mt-2">{{ users.length }} users registered</p>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50">
              <tr>
                <th class="text-left p-6 font-semibold text-gray-700 border-b border-gray-200">ID</th>
                <th class="text-left p-6 font-semibold text-gray-700 border-b border-gray-200">Name</th>
                <th class="text-left p-6 font-semibold text-gray-700 border-b border-gray-200">Email</th>
                <th class="text-left p-6 font-semibold text-gray-700 border-b border-gray-200">Roles</th>
                <th class="text-left p-6 font-semibold text-gray-700 border-b border-gray-200">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr v-for="user in users" :key="user.id" class="hover:bg-gray-50 transition-colors duration-150">
                <td class="p-6">
                  <span class="inline-flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold">
                    {{ user.id }}
                  </span>
                </td>
                <td class="p-6">
                  <div class="flex items-center">
                    <div class="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold mr-3">
                      {{ user.name.charAt(0).toUpperCase() }}
                    </div>
                    <span class="font-semibold text-gray-800">{{ user.name }}</span>
                  </div>
                </td>
                <td class="p-6">
                  <span class="text-gray-600">{{ user.email }}</span>
                </td>
                <td class="p-6">
                  <div class="flex flex-wrap gap-2">
                    <span 
                      v-for="role in user.roles" 
                      :key="role.id" 
                      class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 border border-blue-200"
                    >
                      {{ role.name }}
                    </span>
                  </div>
                </td>
                <td class="p-6">
                  <div class="flex gap-2">
                    <button 
                      @click="editUser(user)" 
                      class="inline-flex items-center px-4 py-2 bg-yellow-100 hover:bg-yellow-200 text-yellow-700 rounded-lg font-medium transition-all duration-200 transform hover:scale-105"
                    >
                      <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                      </svg>
                      Edit
                    </button>
                    <button 
                      @click="showDeleteModal(user)" 
                      class="inline-flex items-center px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg font-medium transition-all duration-200 transform hover:scale-105"
                    >
                      <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                      </svg>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Enhanced Delete Confirmation Modal -->
      <div v-if="deleteModal.show" class="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div class="bg-white rounded-3xl max-w-md w-full mx-4 shadow-2xl transform transition-all duration-300 scale-100">
          <!-- Modal Header with Gradient -->
          <div class="bg-gradient-to-r from-red-500 to-pink-600 rounded-t-3xl p-6 text-center">
            <div class="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
              <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-white mb-2">Delete User</h3>
            <p class="text-red-100">This action cannot be undone</p>
          </div>
          
          <!-- Modal Body -->
          <div class="p-8">
            <div class="text-center mb-6">
              <div class="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                {{ deleteModal.user?.name?.charAt(0).toUpperCase() }}
              </div>
              <h4 class="text-lg font-semibold text-gray-800 mb-2">
                {{ deleteModal.user?.name }}
              </h4>
              <p class="text-gray-600 mb-4">{{ deleteModal.user?.email }}</p>
              
              <div class="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
                <div class="flex items-center justify-center mb-2">
                  <svg class="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                  </svg>
                  <span class="text-sm font-semibold text-red-700">Warning</span>
                </div>
                <p class="text-sm text-red-600">
                  Are you sure you want to permanently delete this user? All associated data will be lost forever.
                </p>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex gap-4">
              <button 
                @click="closeDeleteModal" 
                class="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold transition-all duration-200 transform hover:scale-[1.02]"
                :disabled="deleteModal.isDeleting"
              >
                Cancel
              </button>
              <button 
                @click="confirmDelete" 
                class="flex-1 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl font-semibold transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                :disabled="deleteModal.isDeleting"
              >
                <span v-if="deleteModal.isDeleting" class="flex items-center justify-center">
                  <svg class="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Deleting...
                </span>
                <span v-else class="flex items-center justify-center">
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                  </svg>
                  Delete User
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Enhanced Toast Notifications -->
      <div v-if="notification.show" class="fixed top-6 right-6 z-50 transform transition-all duration-500 ease-out">
        <div :class="[
          'px-6 py-4 rounded-2xl shadow-2xl text-white transform transition-all duration-300 min-w-[300px]',
          notification.type === 'success' 
            ? 'bg-gradient-to-r from-green-500 to-emerald-600' 
            : 'bg-gradient-to-r from-red-500 to-pink-600'
        ]">
          <div class="flex items-center">
            <div class="flex-shrink-0 w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-3">
              <svg v-if="notification.type === 'success'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </div>
            <div class="flex-1">
              <p class="font-semibold">{{ notification.type === 'success' ? 'Success!' : 'Error!' }}</p>
              <p class="text-sm opacity-90">{{ notification.message }}</p>
            </div>
            <button @click="notification.show = false" class="ml-4 text-white hover:text-gray-200 transition-colors duration-200">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../service/api';

export default {
  name: 'UserManager',
  data() {
    return {
      users: [],
      availableRoles: [],
      isEditing: false,
      form: {
        id: null,
        name: '',
        email: '',
        password: '',
        roles: []
      },
      deleteModal: {
        show: false,
        user: null,
        isDeleting: false
      },
      notification: {
        show: false,
        type: 'success',
        message: ''
      }
    };
  },
  methods: {
    async fetchUsers() {
      try {
        const res = await api.get('/users');
        this.users = res.data;
      } catch (err) {
        console.error('Gagal mengambil data user', err);
        this.showNotification('error', 'Failed to fetch users data');
      }
    },
    async fetchRoles() {
      try {
        const res = await api.get('/roles/names');
        this.availableRoles = res.data;
      } catch (err) {
        console.error('Gagal mengambil role', err);
        this.showNotification('error', 'Failed to fetch roles data');
      }
    },
    async createUser() {
      try {
        await api.post('/users', this.form);
        this.resetForm();
        this.fetchUsers();
        this.showNotification('success', 'User successfully created');
      } catch (err) {
        console.error('Gagal menambahkan user', err);
        this.showNotification('error', 'Failed to create user');
      }
    },
    editUser(user) {
      this.isEditing = true;
      this.form.id = user.id;
      this.form.name = user.name;
      this.form.email = user.email;
      this.form.password = '';
      this.form.roles = user.roles.map(r => r.name);
      
      // Smooth scroll to form
      document.querySelector('form').scrollIntoView({ behavior: 'smooth' });
    },
    async updateUser() {
      try {
        const data = {
          name: this.form.name,
          email: this.form.email,
          roles: this.form.roles
        };
        if (this.form.password) {
          data.password = this.form.password;
        }
        await api.put(`/users/${this.form.id}`, data);
        this.resetForm();
        this.fetchUsers();
        this.showNotification('success', 'User successfully updated');
      } catch (err) {
        console.error('Gagal memperbarui user', err);
        this.showNotification('error', 'Failed to update user');
      }
    },
    showDeleteModal(user) {
      this.deleteModal.show = true;
      this.deleteModal.user = user;
    },
    closeDeleteModal() {
      this.deleteModal.show = false;
      this.deleteModal.user = null;
      this.deleteModal.isDeleting = false;
    },
    async confirmDelete() {
      if (!this.deleteModal.user) return;
      
      this.deleteModal.isDeleting = true;
      
      try {
        await api.delete(`/users/${this.deleteModal.user.id}`);
        this.fetchUsers();
        this.showNotification('success', `User ${this.deleteModal.user.name} successfully deleted`);
        this.closeDeleteModal();
      } catch (err) {
        console.error('Gagal menghapus user', err);
        this.showNotification('error', 'Failed to delete user');
        this.deleteModal.isDeleting = false;
      }
    },
    showNotification(type, message) {
      this.notification.show = true;
      this.notification.type = type;
      this.notification.message = message;
      
      setTimeout(() => {
        this.notification.show = false;
      }, 5000);
    },
    cancelEdit() {
      this.resetForm();
    },
    resetForm() {
      this.form = {
        id: null,
        name: '',
        email: '',
        password: '',
        roles: []
      };
      this.isEditing = false;
    }
  },
  mounted() {
    this.fetchUsers();
    this.fetchRoles();
  }
};
</script>

<style scoped>
/* Enhanced animations and transitions */
.transform {
  transform: translateX(0);
}

/* Modal animation */
.fixed .bg-white {
  animation: modalSlideIn 0.3s ease-out;
}

@keyframes modalSlideIn {
  from {
    opacity: 0;
    transform: scale(0.9) translateY(-20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

/* Toast animation */
.fixed.top-6 > div {
  animation: toastSlideIn 0.5s ease-out;
}

@keyframes toastSlideIn {
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Hover effects */
.hover\:scale-105:hover {
  transform: scale(1.05);
}

.hover\:scale-\[1\.02\]:hover {
  transform: scale(1.02);
}

/* Custom scrollbar */
.overflow-x-auto::-webkit-scrollbar {
  height: 8px;
}

.overflow-x-auto::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 4px;
}

.overflow-x-auto::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}

.overflow-x-auto::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* Mobile responsiveness */
@media (max-width: 640px) {
  .fixed .bg-white {
    margin: 1rem;
    max-width: calc(100% - 2rem);
  }
  
  .grid-cols-1.md\:grid-cols-2 {
    grid-template-columns: 1fr;
  }
  
  .text-4xl {
    font-size: 2.5rem;
  }
  
  .p-8 {
    padding: 1.5rem;
  }
  
  .p-6 {
    padding: 1rem;
  }
}

/* Focus states */
input:focus, select:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* Loading spinner */
.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>