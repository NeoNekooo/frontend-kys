<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

const toast = useToast()
const route = useRoute()
const router = useRouter()

const form = ref({
  nama: '',
  kewarganegaraan: '',
  nik: '',
  nuptk: '',
  nip: '',
  nipy: '',
  npwp: '',
  tmp_lahir: '',
  tgl_lahir: '',
  jk: '',
  agama: '',
  nama_ibu: '',
  status_pernikahan: '',
  nama_suami_istri: '',
  jml_anak: '',
  alamat: '',
  kecamatan: '',
  desa: '',
  kabupaten: '',
  provinsi: '',
  kode_pos: '',
  photo: '',
  status: ''
})
console.log('Form:', route.params)
const fetchPegawai = async () => {
  try {
    const { id } = route.params
    const res = await axios.get(`http://localhost:5000/api/pegawai/${id}`)
    form.value = res.data
  } catch (error) {
    toast.error('Gagal mengambil data pegawai.')
  }
}

// Fungsi untuk mengupdate data pegawai
const updateForm = async () => {
  try {
    const { id } = route.params
    await axios.put(`http://localhost:5000/api/pegawai/${id}`, form.value)
    toast.success('Data pegawai berhasil diperbarui.')
    router.push('/tabel-pegawai')
  } catch (error) {
    toast.error('Gagal menyimpan perubahan.')
    console.error(error)
  }
}

// Muat data saat komponen di-mount
onMounted(() => {
  fetchPegawai()
})
</script>

<template>
  <div class="w-full mx-auto mt-10 p-8 bg-white rounded-lg shadow-md">
    <div class="flex justify-between items-center gap-4 mb-4">
      <h2 class="text-2xl font-semibold text-gray-800">Edit Data Pegawai</h2>
      <router-link to="/tabel-pegawai" class="btn bg-green-600 text-white px-4 py-2 rounded-lg mr-4">
        Daftar Pegawai
      </router-link>
    </div>

    <form @submit.prevent="updateForm" class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label>Nama</label>
        <input v-model="form.nama" type="text" class="input-style" />
      </div>
      <div>
        <label>Kewarganegaraan</label>
        <input v-model="form.kewarganegaraan" type="text" class="input-style" />
      </div>
      <div>
        <label>NIK</label>
        <input v-model="form.nik" type="text" class="input-style" />
      </div>
      <div>
        <label>NUPTK</label>
        <input v-model="form.nuptk" type="text" class="input-style" />
      </div>
      <div>
        <label>NIP</label>
        <input v-model="form.nip" type="text" class="input-style" />
      </div>
      <div>
        <label>NIPY</label>
        <input v-model="form.nipy" type="text" class="input-style" />
      </div>
      <div>
        <label>NPWP</label>
        <input v-model="form.npwp" type="text" class="input-style" />
      </div>
      <div>
        <label>Tempat Lahir</label>
        <input v-model="form.tmp_lahir" type="text" class="input-style" />
      </div>
      <div>
        <label>Tanggal Lahir</label>
        <input v-model="form.tgl_lahir" type="date" class="input-style" />
      </div>
      <div>
        <label>Jenis Kelamin</label>
        <select v-model="form.jk" class="input-style">
          <option disabled value="">Pilih Jenis Kelamin</option>
          <option value="L">Laki-laki</option>
          <option value="P">Perempuan</option>
        </select>
      </div>
      <div>
        <label>Agama</label>
        <input v-model="form.agama" type="text" class="input-style" />
      </div>
      <div>
        <label>Nama Ibu Kandung</label>
        <input v-model="form.nama_ibu" type="text" class="input-style" />
      </div>
      <div>
        <label>Status Pernikahan</label>
        <select v-model="form.status_pernikahan" class="input-style">
          <option disabled value="">Status Pernikahan</option>
          <option value="Lajang">Lajang</option>
          <option value="Menikah">Menikah</option>
          <option value="Duda">Duda</option>
          <option value="Janda">Janda</option>
        </select>
      </div>
      <div>
        <label>Nama Suami/Istri</label>
        <input v-model="form.nama_suami_istri" type="text" class="input-style" />
      </div>
      <div>
        <label>Jumlah Anak</label>
        <input v-model="form.jml_anak" type="number" class="input-style" />
      </div>
      <div class="md:col-span-2">
        <label>Alamat</label>
        <textarea v-model="form.alamat" class="input-style resize-none h-24"></textarea>
      </div>
      <div>
        <label>Desa</label>
        <input v-model="form.desa" type="text" class="input-style" />
      </div>
      <div>
        <label>Kecamatan</label>
        <input v-model="form.kecamatan" type="text" class="input-style" />
      </div>
      <div>
        <label>Kabupaten</label>
        <input v-model="form.kabupaten" type="text" class="input-style" />
      </div>
      <div>
        <label>Provinsi</label>
        <input v-model="form.provinsi" type="text" class="input-style" />
      </div>
      <div>
        <label>Kode Pos</label>
        <input v-model="form.kode_pos" type="text" class="input-style" />
      </div>
      <div>
        <label>Foto</label>
        <input v-model="form.photo" type="text" class="input-style" />
      </div>

       <div>
        <label>Status</label>
        <select v-model="form.status" class="input-style">
          <option disabled value="">Pilih Status</option>
          <option value="1">Aktif</option>
          <option value="0">Tidak Aktif</option>
        </select>
      </div>

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
