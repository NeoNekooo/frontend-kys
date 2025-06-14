<script setup>
import api from '@/plugins/axios/axios'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

const route = useRoute()
const router = useRouter()
const toast = useToast()

const form = ref({
  id_tapel: '',
  no_surat: '',
  nama_pimpinan: '',
  tgl_sp: '',
  tmt: ''
})

const getDataSurat = async () => {
  try {
    const response = await api.get(`/nomorSurat/${route.params.id}`) // pastikan endpoint sesuai
    const data = response.data
    form.value.id_tapel = data.id_tapel
    form.value.no_surat = data.no_surat
    form.value.nama_pimpinan = data.nama_pimpinan
    form.value.tgl_sp = data.tgl_sp
    form.value.tmt = data.tmt
  } catch (error) {
    console.error(error)
    toast.error('Gagal memuat data surat.')
  }
}

const submitForm = async () => {
  try {
    await api.put(`/nomorSurat/${route.params.id}`, form.value)
    toast.success('Data surat berhasil diperbarui.')
    router.push('/nomor-surat') // sesuaikan dengan path tampilan daftar surat
  } catch (error) {
    console.error(error)
    toast.error('Gagal memperbarui data surat.')
  }
}

onMounted(() => {
  getDataSurat()
})
</script>

<template>
  <div class="w-full mx-auto mt-10 p-8 bg-white rounded-lg shadow-md">
    <div class="flex justify-between items-center gap-4 mb-4">
      <h2 class="text-2xl font-semibold text-gray-800">Edit Nomor Surat</h2>
      <router-link
        to="/nomor-surat"
        class="btn bg-green-600 text-white px-4 py-2 rounded-lg mr-4"
      >
        Kembali
      </router-link>
    </div>

    <form @submit.prevent="submitForm" class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label>ID Tapel</label>
        <input
          v-model="form.id_tapel"
          type="text"
          class="input-style bg-gray-100 cursor-not-allowed"
          readonly
        />
      </div>
      <div>
        <label>No Surat</label>
        <input
          v-model="form.no_surat"
          type="text"
          class="input-style"
        />
      </div>
      <div>
        <label>Nama Pimpinan</label>
        <input
          v-model="form.nama_pimpinan"
          type="text"
          class="input-style"
        />
      </div>
      <div>
        <label>Tanggal SP</label>
        <input
          v-model="form.tgl_sp"
          type="date"
          class="input-style"
        />
      </div>
      <div>
        <label>TMT</label>
        <input
          v-model="form.tmt"
          type="date"
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
