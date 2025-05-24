<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const form = ref({
  nama: '',
  npyn: '',
  thn_berdiri: '',
  luas: '',
  moto: '',
  alamat: '',
  desa: '',
  kecamatan: '',
  kabupaten: '',
  provinsi: '',
  kode_pos: '',
  telepon: '',
  fax: '',
  email: '',
  situs_web: '',
  facebook: '',
  youtube: '',
  tiktok: '',
})

const lembagaId = ref(null)

// Ambil data lembaga saat mounted
const fetchLembaga = async () => {
  try {
    const res = await axios.get('http://localhost:5000/api/lembaga')
    if (res.data.length > 0) {
      const data = res.data[0]
      lembagaId.value = data._id || data.id
      form.value = { ...data }
    }
  } catch (error) {
    console.error('Gagal fetch data lembaga:', error)
    alert('Gagal memuat data lembaga.')
  }
}

const submitForm = async () => {
  try {
    await axios.put(`http://localhost:5000/api/lembaga/${editLembaga.value}`, form.value)
    alert('Perubahan berhasil disimpan!')
  } catch (error) {
    console.error('Gagal mengupdate data:', error)
    alert('Terjadi kesalahan saat menyimpan data.')
  }
}

onMounted(() => {
  fetchLembaga()
})
</script>

<template>
  <div class="w-full mx-auto mt-10 p-8 bg-white rounded-lg shadow-md">
    <h2 class="text-2xl font-semibold text-gray-800 mb-4">Edit Data Lembaga</h2>

    <form @submit.prevent="submitForm" class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <input v-model="form.nama" type="text" placeholder="Nama Lembaga" class="input-style" />
      <input v-model="form.npyn" type="text" placeholder="NPYN" class="input-style" />
      <input v-model="form.thn_berdiri" type="date" class="input-style" />
      <input v-model="form.luas" type="text" placeholder="Luas" class="input-style" />
      <input v-model="form.moto" type="text" placeholder="Moto" class="input-style" />
      <textarea v-model="form.alamat" placeholder="Alamat" class="input-style md:col-span-2 resize-none h-24"></textarea>
      <input v-model="form.desa" type="text" placeholder="Desa" class="input-style" />
      <input v-model="form.kecamatan" type="text" placeholder="Kecamatan" class="input-style" />
      <input v-model="form.kabupaten" type="text" placeholder="Kabupaten" class="input-style" />
      <input v-model="form.provinsi" type="text" placeholder="Provinsi" class="input-style" />
      <input v-model="form.kode_pos" type="text" placeholder="Kode Pos" class="input-style" />
      <input v-model="form.telepon" type="text" placeholder="Telepon" class="input-style" />
      <input v-model="form.fax" type="text" placeholder="Fax" class="input-style" />
      <input v-model="form.email" type="email" placeholder="Email" class="input-style" />
      <input v-model="form.situs_web" type="text" placeholder="Situs Web" class="input-style" />
      <input v-model="form.facebook" type="text" placeholder="Facebook" class="input-style" />
      <input v-model="form.youtube" type="text" placeholder="YouTube" class="input-style" />
      <input v-model="form.tiktok" type="text" placeholder="TikTok" class="input-style" />

      <div class="md:col-span-2 flex gap-4">
        <button
          type="submit"
          class="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-2 rounded shadow"
        >
          Simpan Perubahan
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
