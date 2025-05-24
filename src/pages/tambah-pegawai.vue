<script setup>
import axios from 'axios'
import { ref } from 'vue'
import { useToast } from 'vue-toastification'

const toast = useToast()

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
  status: 1,
})

const photoFile = ref(null) // ✅ untuk menyimpan file aslinya
const photoPreview = ref('') // opsional untuk pratinjau gambar

const handleFileUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    photoFile.value = file // simpan file asli
    const reader = new FileReader()
    reader.onload = (e) => {
      photoPreview.value = e.target.result // untuk preview
    }
    reader.readAsDataURL(file)
  }
}

const submitForm = async () => {
  try {
    // Simpan data pegawai (tanpa foto)
    const res = await axios.post('http://localhost:5000/api/pegawai', form.value)
    toast.success('Data pegawai berhasil ditambahkan.')

    const pegawaiId = res.data._id || res.data.id // pastikan ini sesuai respons API

    // Upload foto jika ada
    if (photoFile.value) {
      const formData = new FormData()
      formData.append('foto', photoFile.value)
console.log(pegawaiId)
      await axios.post(`http://localhost:5000/api/pegawai/upload/${pegawaiId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      toast.success('Foto pegawai berhasil diunggah.')
    }
    object.assign(form.value, {
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
      kode_pos: ''
    })
  } catch (error) {
    console.error('Menyimpan foto:', error)
    toast.error('Gagal menyimpan foto.', error)
  }
}
</script>


<template>

  <div class="w-full mx-auto mt-10 p-8 bg-white rounded-lg shadow-md">
    <div class="flex justify-between items-center gap-4 mb-4">
  <h2 class="text-2xl font-semibold text-gray-800">Tambah Data Pegawai</h2>
  <router-link to="tabel-pegawai" class=" btn bg-green-600 text-white px-4 py-2 rounded-lg mr-4">
    Daftar Pegawai
  </router-link>
</div>


    <form @submit.prevent="submitForm" class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <input v-model="form.nama" type="text" placeholder="Nama" class="input-style" />
      <select name="" id="" class="input-style" v-model="form.kewarganegaraan">
        <option disabled value="">Pilih Kewarganegaraan</option>
        <option value="WNI">WNI</option>
        <option value="WNA">WNI</option>
      </select>
      <input v-model="form.nik" type="text" placeholder="NIK" class="input-style" />
      <input v-model="form.nuptk" type="text" placeholder="NUPTK" class="input-style" />
      <input v-model="form.nip" type="text" placeholder="NIP" class="input-style" />
      <input v-model="form.nipy" type="text" placeholder="NIPY" class="input-style" />
      <input v-model="form.npwp" type="text" placeholder="NPWP" class="input-style" />
      <input v-model="form.tmp_lahir" type="text" placeholder="Tempat Lahir" class="input-style" />
      <input v-model="form.tgl_lahir" type="date" class="input-style" />
      <select v-model="form.jk" class="input-style">
        <option disabled value="">Pilih Jenis Kelamin</option>
        <option value="L">Laki-laki</option>
        <option value="P">Perempuan</option>
      </select>
      <select v-model="form.agama" class="input-style">
        <option disabled value="">Pilih Agama</option>
        <option value="Islam">Islam</option>
        <option value="Kristen">Kristen</option>
        <option value="Katolik">Katolik</option>
        <option value="BUddha">Buddha</option>
        <option value="Hindu">Buddha</option>
      </select>
      <input v-model="form.nama_ibu" type="text" placeholder="Nama Ibu Kandung" class="input-style" />
      <select v-model="form.status_pernikahan" class="input-style">
        <option disabled value="">Status Pernikahan</option>
        <option value="Lajang">Lajang</option>
        <option value="Menikah">Menikah</option>
        <option value="Duda">Duda</option>
        <option value="Janda">Janda</option>
      </select>
      <input v-model="form.nama_suami_istri" type="text" placeholder="Nama Suami/Istri" class="input-style" />
      <input v-model="form.jml_anak" type="number" placeholder="Jumlah Anak" class="input-style" />
      <textarea v-model="form.alamat" placeholder="Alamat" class="input-style md:col-span-2 resize-none h-24"></textarea>
      <input v-model="form.desa" type="text" placeholder="Desa" class="input-style" />
      <input v-model="form.kecamatan" type="text" placeholder="Kecamatan" class="input-style" />
      <input v-model="form.kabupaten" type="text" placeholder="Kabupaten" class="input-style" />
      <input v-model="form.provinsi" type="text" placeholder="Provinsi" class="input-style" />
      <input v-model="form.kode_pos" type="text" placeholder="Kode Pos" class="input-style" />
      <input accept=".jpg, .png, .jpeg" @change="handleFileUpload" type="file" placeholder="Nama File Foto" class="input-style" />
      <p v-if="form.photo" class="text-sm text-light mt-2">
      </p>

      <div class="md:col-span-2 flex gap-4">
        <button
          type="submit"
          class="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-2 rounded shadow"
        >
          Simpan Pegawai
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
