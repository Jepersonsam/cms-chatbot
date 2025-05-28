<template>
  <div class="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
      <h3 class="text-xl font-bold text-gray-800 mb-4">{{ role ? 'Edit Role' : 'Tambah Role' }}</h3>
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label class="block text-gray-600 font-medium mb-1">Role Name</label>
          <input
            v-model="form.name"
            required
            class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            placeholder="Masukkan nama role"
          />
        </div>

        <div>
          <label class="block text-gray-600 font-medium mb-2">Permissions</label>
          <div class="grid grid-cols-1 gap-2 max-h-48 overflow-y-auto border border-gray-200 rounded-md p-3">
            <label v-for="perm in allPermissions" :key="perm" class="flex items-center space-x-2">
              <input
                type="checkbox"
                :value="perm"
                v-model="form.permissions"
                class="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span class="text-gray-700">{{ perm }}</span>
            </label>
          </div>
        </div>

        <div class="flex justify-end space-x-2">
          <button
            type="button"
            @click="$emit('close')"
            class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition duration-200"
          >
            Batal
          </button>
          <button
            type="submit"
            class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition duration-200"
          >
            Simpan
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import role from '../service/role';

export default {
  props: {
    role: Object,
    allPermissions: Array,
  },
  emits: ['submit', 'close'],
  data() {
    return {
      form: {
        name: this.role?.name || '',
        permissions: this.role?.permissions?.map(p => p.name) || []
      }
    };
  },
  methods: {
    handleSubmit() {
      this.$emit('submit', this.form);
    }
  }
};
</script>