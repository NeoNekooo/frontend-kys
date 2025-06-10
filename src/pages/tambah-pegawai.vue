<script setup>
import api from '@/plugins/axios/axios'
import axios from 'axios'
import { ref } from 'vue'
import { useToast } from 'vue-toastification'

const toast = useToast()

const form = ref({
  nama: '',
  jenjang_pendidikan: '',
  jabatan: '',
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

const handleFileUpload = event => {
  const file = event.target.files[0]
  if (file) {
    photoFile.value = file // simpan file asli
    const reader = new FileReader()
    reader.onload = e => {
      photoPreview.value = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

const submitForm = async () => {
  try {
    const res = await api.post('/pegawai', form.value)
    toast.success('Data pegawai berhasil ditambahkan.')

    const pegawaiId = res.data.id || res.data.id // pastikan ini sesuai respons API

    if (photoFile.value) {
      const formData = new FormData()
      formData.append('foto', photoFile.value)
      console.log(pegawaiId)
      await api.post(`/pegawai/upload/${pegawaiId}`, formData, {})
      toast.success('Foto pegawai berhasil diunggah.')
    }
    Object.assign(form.value, {
      nama: '',
      jenjang_pendidikan: '',
      jabatan: '',
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
      kontak: '',
    })
  } catch (error) {
    console.error('Menyimpan foto:', error)
  }
}
</script>

<template>
  <div class="w-full mx-auto mt-10 p-8 bg-white rounded-lg shadow-md">
    <div class="flex justify-between items-center gap-4 mb-4">
      <h2 class="text-2xl font-semibold text-gray-800">Tambah Data Pegawai</h2>
      <router-link
        to="tabel-pegawai"
        class="btn bg-green-600 text-white px-4 py-2 rounded-lg mr-4"
      >
        Daftar Pegawai
      </router-link>
    </div>

    <form
      @submit.prevent="submitForm"
      class="grid grid-cols-1 md:grid-cols-2 gap-6"
    >
      <div>
        <label>Nama</label>
        <input
          v-model="form.nama"
          type="text"
          class="input-style"
        />
      </div>
      <div>
        <label>Jenjang Pendidikan</label>
        <input
          v-model="form.jenjang_pendidikan"
          type="text"
          class="input-style"
        />
      </div>
      <div>
        <label>Jabatan</label>
        <input
          v-model="form.jabatan"
          type="text"
          class="input-style"
        />
      </div>
      <div>
        <label>Kewarganegaraan</label>
        <select
          v-model="form.kewarganegaraan"
          class="input-style"
        >
          <option
            disabled
            value=""
          >
            Pilih Kewarganegaraan
          </option>
          <option value="WNI">WNI</option>
          <option value="WNA">WNA</option>
        </select>
      </div>
      <div>
        <label>NIK</label>
        <input
          v-model="form.nik"
          type="text"
          class="input-style"
        />
      </div>
      <div>
        <label>NUPTK</label>
        <input
          v-model="form.nuptk"
          type="text"
          class="input-style"
        />
      </div>
      <div>
        <label>NIP</label>
        <input
          v-model="form.nip"
          type="text"
          class="input-style"
        />
      </div>
      <div>
        <label>NIPY</label>
        <input
          v-model="form.nipy"
          type="text"
          class="input-style"
        />
      </div>
      <div>
        <label>NPWP</label>
        <input
          v-model="form.npwp"
          type="text"
          class="input-style"
        />
      </div>
      <div>
        <label>Tempat Lahir</label>
        <input
          v-model="form.tmp_lahir"
          type="text"
          class="input-style"
        />
      </div>
      <div>
        <label>Tanggal Lahir</label>
        <input
          v-model="form.tgl_lahir"
          type="date"
          class="input-style"
        />
      </div>
      <div>
        <label>Jenis Kelamin</label>
        <select
          v-model="form.jk"
          class="input-style"
        >
          <option
            disabled
            value=""
          >
            Pilih Jenis Kelamin
          </option>
          <option value="L">Laki-laki</option>
          <option value="P">Perempuan</option>
        </select>
      </div>
      <div>
        <label>Agama</label>
        <select
          v-model="form.agama"
          class="input-style"
        >
          <option
            disabled
            value=""
          >
            Pilih Agama
          </option>
          <option value="Islam">Islam</option>
          <option value="Kristen">Kristen</option>
          <option value="Katolik">Katolik</option>
          <option value="Buddha">Buddha</option>
          <option value="Hindu">Hindu</option>
        </select>
      </div>
      <div>
        <label>Nama Ibu Kandung</label>
        <input
          v-model="form.nama_ibu"
          type="text"
          class="input-style"
        />
      </div>
      <div>
        <label>Status Pernikahan</label>
        <select
          v-model="form.status_pernikahan"
          class="input-style"
        >
          <option
            disabled
            value=""
          >
            Status Pernikahan
          </option>
          <option value="Lajang">Lajang</option>
          <option value="Menikah">Menikah</option>
          <option value="Duda">Duda</option>
          <option value="Janda">Janda</option>
        </select>
      </div>
      <div>
        <label>Nama Suami/Istri</label>
        <input
          v-model="form.nama_suami_istri"
          type="text"
          class="input-style"
        />
      </div>
      <div>
        <label>Jumlah Anak</label>
        <input
          v-model="form.jml_anak"
          type="number"
          class="input-style"
        />
      </div>
      <div class="md:col-span-2">
        <label>Alamat</label>
        <textarea
          v-model="form.alamat"
          class="input-style resize-none h-24"
        ></textarea>
      </div>
      <div>
        <label>Desa</label>
        <input
          v-model="form.desa"
          type="text"
          class="input-style"
        />
      </div>
      <div>
        <label>Kecamatan</label>
        <input
          v-model="form.kecamatan"
          type="text"
          class="input-style"
        />
      </div>
      <div>
        <label>Kabupaten</label>
        <input
          v-model="form.kabupaten"
          type="text"
          class="input-style"
        />
      </div>
      <div>
        <label>Provinsi</label>
        <input
          v-model="form.provinsi"
          type="text"
          class="input-style"
        />
      </div>
      <div>
        <label>Kode Pos</label>
        <input
          v-model="form.kode_pos"
          type="text"
          class="input-style"
        />
      </div>
      <div>
        <label>Kontak</label>
        <input
          v-model="form.kontak"
          type="text"
          class="input-style"
        />
      </div>
      <div>
        <label>Upload Foto</label>
        <input
          accept=".jpg, .png, .jpeg"
          @change="handleFileUpload"
          type="file"
          class="input-style"
        />
        <p
          v-if="form.photo"
          class="text-sm text-light mt-2"
        ></p>
      </div>

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

