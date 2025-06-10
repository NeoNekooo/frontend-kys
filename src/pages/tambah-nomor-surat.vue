<script setup>
import api from '@/plugins/axios/axios'
import { onMounted, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

const router = useRouter()
const toast = useToast()

const tapel = ref({
  id_tapel: '',
  tapel: '',
  status: '',
})

const form = ref({
  no_surat: '',
  nama_pimpinan: '',
  tgl_sp: '',
  tmt: '',
})

const errorMessage = ref('')
const loading = ref(false)

const getTapel = async () => {
  try {
    const response = await api.get('/tapel/aktif')
    const data = response.data[0]
    if (response.data) {
      tapel.value.id_tapel = data.id
      tapel.value.tapel = data.tapel
      tapel.value.status = data.status
      console.log('Data Tapel:', tapel.value)
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
    id_tapel: tapel.value.id_tapel,
    no_surat: form.value.no_surat, 
    nama_pimpinan: form.value.nama_pimpinan,
    tgl_sp: formatDate(form.value.tgl_sp),
    tmt: formatDate(form.value.tmt),
  }

  try {
    await api.post('/nomorSurat', payload)
    console.log('Data yang dikirim:', payload)
    toast.success('Data tapel berhasil ditambahkan.')
    router.push('nomor-surat')
    form.value.no_surat = ''
    form.value.nama_pimpinan = ''
    form.value.tgl_sp = ''
    form.value.tmt = ''
  } catch (error) {
    console.error('Gagal menyimpan data Satuan Pendidikan:', error)
    toast.error('Gagal menyimpan data tapel.')
  }
}

const formatDate = (date) => {
  return new Date(date).toISOString().split('T')[0]
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

    <div
      v-if="loading"
      class="text-center text-gray-600"
    >
      Memuat data...
    </div>
    <div
      v-if="errorMessage"
      class="text-center text-red-600"
    >
      {{ errorMessage }}
    </div>

    <form
      @submit.prevent="submitForm"
      class="grid grid-cols-1 md:grid-cols-2 gap-6"
    >
      <div>
        <label for="no_surat">Tapel</label>
        <input
          id="no_surat"
          v-model="tapel.tapel"
          type="text"
          class="input-style cursor-not-allowed"
          disabled
        />
      </div>
      <div>
        <label for="no_surat">Nomor Surat</label>
        <input
          id="no_surat"
          v-model="form.no_surat"
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

