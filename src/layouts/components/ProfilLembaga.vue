<script setup>
const firstName = ref('')
const lastName = ref('')
const city = ref('')
const country = ref('')
const company = ref('')
const email = ref('')
import { VForm, VRow, VCol, VTextField, VDatePicker, VCheckbox, VBtn } from 'vuetify/components'
const checkbox = ref(false)
</script>

<template>
  <h1 class="text-yellow-800">this is tailwind class</h1>
  <form class="space-y-6" @submit.prevent>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <!-- Nama -->
    <div>
      <label class="block text-sm font-medium text-gray-700">Nama</label>
      <input
        type="text"
        v-model="firstName"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        placeholder="Nama"
      />
    </div>

    <!-- Last Name -->
    <div>
      <label class="block text-sm font-medium text-gray-700">Last Name</label>
      <input
        type="text"
        v-model="lastName"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        placeholder="Doe"
      />
    </div>

    <!-- NPYN -->
    <div>
      <label class="block text-sm font-medium text-gray-700">NPYN</label>
      <input
        type="text"
        v-model="email"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        placeholder="NPYN"
      />
    </div>

    <!-- City -->
    <div>
      <label class="block text-sm font-medium text-gray-700">City</label>
      <input
        type="text"
        v-model="city"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        placeholder="Jakarta"
      />
    </div>

    <!-- Tahun Berdiri (Date) -->
    <div>
      <label class="block text-sm font-medium text-gray-700">Tahun Berdiri</label>
      <input
        type="date"
        v-model="foundedDate"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      />
    </div>

    <!-- Company -->
    <div>
      <label class="block text-sm font-medium text-gray-700">Company</label>
      <input
        type="text"
        v-model="company"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        placeholder="Nama Perusahaan"
      />
    </div>
  </div>

  <!-- Checkbox -->
  <div class="flex items-center">
    <input
      id="remember-me"
      type="checkbox"
      v-model="checkbox"
      class="h-4 w-4 text-indigo-600 border-gray-300 rounded"
    />
    <label for="remember-me" class="ml-2 block text-sm text-gray-900">
      Remember me
    </label>
  </div>

  <!-- Submit buttons -->
  <div class="flex space-x-4">
    <button
      type="submit"
      class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700"
    >
      Submit
    </button>
    <button
      type="reset"
      class="inline-flex justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
    >
      Reset
    </button>
  </div>
</form>

</template>
