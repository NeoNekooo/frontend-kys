<script setup>
import api from '@/plugins/axios/axios'
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

const route = useRoute()
const router = useRouter()
const toast = useToast()

const form = ref({
  tapel: '',
  ket: '',
  status: 1,
})

const getTapelById = async () => {
  try {
    const response = await api.get(`/tapel/${route.params.id}`)
    const data = response.data
    form.value.tapel = data.tapel
    form.value.ket = data.ket
    form.value.status = data.status
  } catch (error) {
    console.error('Gagal mengambil data:', error)
    toast.error('Gagal memuat data tapel.')
  }
}

const submitForm = async () => {
  const payload = {
    tapel: form.value.tapel,
    ket: form.value.ket,
    status: 1,
  }
  try {
    await api.put(`/tapel/${route.params.id}`, payload)
    toast.success('Data tapel berhasil diperbarui.')
    router.push('/tapel')
  } catch (error) {
    console.error('Gagal memperbarui data:', error)
    toast.error('Gagal memperbarui data tapel.')
  }
}

onMounted(() => {
  getTapelById()
})
</script>

<template>
  <div class="w-full mx-auto mt-10 p-8 bg-white rounded-lg shadow-md">
    <div class="flex justify-between items-center gap-4 mb-4">
      <h2 class="text-2xl font-semibold text-gray-800">Edit Data Tapel</h2>
      <router-link
        to="/tapel"
        class="btn bg-green-600 text-white px-4 py-2 rounded-lg mr-4"
      >
        Kembali
      </router-link>
    </div>

    <form
      @submit.prevent="submitForm"
      class="grid grid-cols-1 md:grid-cols-2 gap-6"
    >
      <div>
        <label>Tapel</label>
        <input
          v-model="form.tapel"
          type="text"
          class="input-style"
        />
      </div>
      <div>
        <label>Keterangan</label>
        <input
          v-model="form.ket"
          type="text"
          class="input-style"
        />
      </div>
      <div class="md:col-span-2 flex gap-4">
        <button
          type="submit"
          class="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded shadow"
        >
          Simpan Perubahan
        </button>
      </div>
    </form>
  </div>
</template>
