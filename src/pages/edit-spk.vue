<script setup>
import api from '@/plugins/axios/axios'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
const toast = useToast()
const route = useRoute()
const router = useRouter()

const form = ref({
  nama: '',
})
console.log('Form:', route.params)
const fetchSpk = async () => {
  try {
    const { id } = route.params
    const res = await api.get(`/spk/${id}`)
    form.value = res.data
  } catch (error) {
    toast.error('Gagal mengambil data SPK.')
  }
}

// Fungsi untuk mengupdate data SPK
const updateForm = async () => {
  try {
    const { id } = route.params
    await api.put(`/spk/${id}`, form.value)
    toast.success('Data SPK berhasil diperbarui.')
    router.push('/satuan-pendidikan')
  } catch (error) {
    toast.error('Gagal menyimpan perubahan.')
    console.error(error)
  }
}

// Muat data saat komponen di-mount
onMounted(() => {
  fetchSpk() //
})
</script>

<template>
  <div class="max-w-lg mx-auto mt-10 p-8 bg-white rounded-lg shadow-md">
    <div class="flex justify-between items-center gap-4 mb-4">
      <h2 class="text-2xl font-semibold text-gray-800">Tambah Data Satuan Pendidikan</h2>
      <router-link
        to="/satuan-pendidikan"
        class="btn bg-green-600 text-white px-4 py-2 rounded-lg mr-4"
      >
        Daftar Satuan Pendidikan
      </router-link>
    </div>

    <form
      @submit.prevent="updateForm"
      class="grid grid-cols-1 gap-6"
    >
      <input
        v-model="form.nama"
        type="text"
        placeholder="Nama"
        class="input-style"
        required
      />

      <div class="flex gap-4">
        <button
          type="submit"
          class="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-2 rounded shadow"
        >
          Update Satuan Pendidikan
        </button>
      </div>
    </form>
  </div>
</template>
