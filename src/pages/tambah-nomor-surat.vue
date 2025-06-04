<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useToast } from 'vue-toastification'
import { useRouter } from 'vue-router'

const router = useRouter()
const toast = useToast()
const tapel = ref([])

const form = ref({
  nomor_surat: '',
  nama_pimpinan: '',
  tgl_sp: '',
  tmt: '',
})

const errorMessage = ref('')
const loading = ref(false)

const getTapel = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/tapel/aktif')
    if (response.data) {
      tapel.value = response.data
    } else {
      errorMessage.value = 'Format data tidak sesuai.'
    }
  } catch (error) {
    toast.error('Gagal memuat data Tapel.')
    errorMessage.value = 'Gagal memuat data Tapel.'
  } finally {
    loading.value = false
  }
}
const submitForm = async () => {
  const payload = {
    tapel: tapel.value,
    nomor_surat: form.value.nomor_surat, // Corrected key to match backend expectation
    nama_pimpinan: form.value.nama_pimpinan,
    tgl_sp: form.value.tgl_sp,
    tmt: form.value.tmt,
  }
  try {
    await axios.post('http://localhost:5000/api/nomorSurat', payload)
    toast.success('Data tapel berhasil ditambahkan.')
    router.push('/nomor-surat')
    form.value.nomor_surat = ''
    form.value.nama_pimpinan = ''
    form.value.tgl_sp = ''
    form.value.tmt = ''
  } catch (error) {
    console.error('Gagal menyimpan data Satuan Pendidikan:', error)
    toast.error('Gagal menyimpan data tapel.')
  }
}


onMounted(() => {
  getTapel()
})
</script>

<template>
  <div class="w-full mx-auto mt-10 p-8 bg-white rounded-lg shadow-md">
    <div class="flex justify-between items-center gap-4 mb-4">
      <h2 class="text-2xl font-semibold text-gray-800">Tambah Data Nomor Surat</h2>
      <router-link
        to="/tabel-nomor-surat"
        class="btn bg-green-600 text-white px-4 py-2 rounded-lg mr-4"
      >
        Daftar Nomor Surat
      </router-link>
    </div>

    <div v-if="loading" class="text-center text-gray-600">Memuat data...</div>
    <div v-if="errorMessage" class="text-center text-red-600">{{ errorMessage }}</div>

    <form
      @submit.prevent="submitForm"
      class="grid grid-cols-1 md:grid-cols-2 gap-6"
    >
      <div>
        <label for="nomor_surat">Tapel</label>
        <input
          id="nomor_surat"
          v-model="tapel"
          type="text"
          class="input-style"
        />
      </div>
      <div>
        <label for="nomor_surat">Nomor Surat</label>
        <input
          id="nomor_surat"
          v-model="form.nomor_surat"
          type="text"
          class="input-style"
        />
      </div>
      <div>
        <label for="nama_pimpinan">Keterangan</label>
        <input
          id="nama_pimpinan"
          v-model="form.nama_pimpinan"
          type="text"
          class="input-style"
        />
      </div>
      <div>
        <label for="tgl_sp">Tanggal SP</label>
        <input
          id="tgl_sp"
          v-model="form.tgl_sp"
          type="date"
          class="input-style"
        />
      </div>
      <div>
        <label for="tmt">TMT</label>
        <input
          id="tmt"
          v-model="form.tmt"
          type="date"
          class="input-style"
        />
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