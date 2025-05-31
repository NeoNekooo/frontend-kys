<script setup>
import router from '@/plugins/router'
import axios from 'axios'
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useToast } from 'vue-toastification'

const toast = useToast()

const form = ref({
  tapel: '', 
  ket: '', 
  status: 1, 
})

const submitForm = async () => {
  try {
    await axios.post('http://localhost:5000/api/tapel', {
      tapel: form.value.tapel, 
      Ket: form.value.ket 
    })
    console.log (form.value)
    toast.success('Data tapel berhasil ditambahkan.')
    form.value.tapel = '';
    form.value.ket = '';
  } catch (error) {
    console.error('Gagal menyimpan data Satuan Pendidikan:', error)
    toast.error('Gagal menyimpan data tapel.')
  }
}
</script>

<template>
  <div class="w-full mx-auto mt-10 p-8 bg-white rounded-lg shadow-md">
    <div class="flex justify-between items-center gap-4 mb-4">
      <h2 class="text-2xl font-semibold text-gray-800">Tambah Data Tapel</h2>
      <router-link to="tapel" class="btn bg-green-600 text-white px-4 py-2 rounded-lg mr-4">
        Daftar Tapel
      </router-link>
    </div>

    <form @submit.prevent="submitForm" class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label>Tapel</label>
        <input v-model="form.tapel" type="text" class="input-style" />
      </div>
      <div>
        <label>Keterangan</label>
        <input v-model="form.ket" type="text" class="input-style" />
      </div>
      <div class="md:col-span-2 flex gap-4">
        <button
          type="submit"
          class="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-2 rounded shadow"
        >
          Simpan Tapel
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
