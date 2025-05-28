<script setup>
import router from '@/plugins/router'
import axios from 'axios'
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useToast } from 'vue-toastification'

const toast = useToast()

const form = ref({
  nama: '', 
})

const submitForm = async () => {
  try {
    await axios.post('http://localhost:5000/api/spk', {
      nama: form.value.nama 
    })
    toast.success('Data Satuan Pendidikan berhasil ditambahkan.')
    form.value.nama = ''; 
  } catch (error) {
    console.error('Gagal menyimpan data Satuan Pendidikan:', error)
    toast.error('Gagal menyimpan data Satuan Pendidikan.')
  }
}
</script>

<template>
  <div class="max-w-lg mx-auto mt-10 p-8 bg-white rounded-lg shadow-md">
    <div class="flex justify-between items-center gap-4 mb-4">
      <h2 class="text-2xl font-semibold text-gray-800">Tambah Data Satuan Pendidikan</h2>
      <router-link to="satuan-pendidikan" class="btn bg-green-600 text-white px-4 py-2 rounded-lg mr-4">
        Daftar Satuan Pendidikan
      </router-link>
    </div>

    <form @submit.prevent="submitForm" class="grid grid-cols-1 gap-6">
      <input
        v-model="form.nama" type="text"
        placeholder="Nama" class="input-style"
        required
      />

      <div class="flex gap-4">
        <button
          type="submit"
          class="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-2 rounded shadow"
        >
          Simpan Satuan Pendidikan
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.input-style {
  @apply w-full px-4 py-2 bg-gray-200 border-2 border-black rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400;
}
</style>
