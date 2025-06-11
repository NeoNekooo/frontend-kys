<script setup>
import api from '@/plugins/axios/axios'
import { onMounted, ref } from 'vue'
import { useToast } from 'vue-toastification'

const toast = useToast()

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
const selectedFile = ref(null)
const isSubmitting = ref(false)

const fetchLembaga = async () => {
  try {
    const res = await api.get('/lembaga')
    if (res.data.length > 0) {
      const data = res.data[0]
      lembagaId.value = data._id || data.id
      form.value = { ...data }
    }
  } catch (error) {
    console.error('Gagal fetch data lembaga:', error)
    toast.error('Gagal mengambil data lembaga.')
  }
}

const handleFileUpload = event => {
  const file = event.target.files[0]
  if (!file) return

  const validTypes = ['image/jpeg', 'image/png', 'image/jpg']
  if (!validTypes.includes(file.type)) {
    toast.error('Hanya file JPG atau PNG yang diperbolehkan.')
    return
  }

  if (file.size > 800 * 1024) {
    toast.error('Ukuran file maksimal 800KB.')
    return
  }

  selectedFile.value = file
}

const isValidHttpsUrl = (url) => {
  return typeof url === 'string' && url.trim() !== '' && url.startsWith('https://')
}


const submitForm = async () => {
  try {
    isSubmitting.value = true

    // 👉 Validasi situs_web harus https://
    if (form.value.situs_web && !isValidHttpsUrl(form.value.situs_web)) {
      toast.error('Situs web harus diawali dengan https://')
      isSubmitting.value = false
      return
    }

    await api.put(`/lembaga/${lembagaId.value}`, form.value)

    if (selectedFile.value) {
      const formData = new FormData()
      formData.append('foto', selectedFile.value)

      await api.post(`/lembaga/upload/${lembagaId.value}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
    }

    toast.success('Data lembaga berhasil diperbarui.')
  } catch (error) {
    console.error('Gagal mengupdate data:', error)
    toast.error('Gagal memperbarui data lembaga.')
  } finally {
    isSubmitting.value = false
  }
}



onMounted(() => {
  fetchLembaga()
})
</script>

<template>
  <div class="w-full mx-auto mt-10 p-8 bg-white rounded-lg shadow-md">
    <h2 class="text-2xl font-semibold text-gray-800 mb-4">Edit Data Lembaga</h2>

    <form
      @submit.prevent="submitForm"
      class="grid grid-cols-1 md:grid-cols-2 gap-6"
    >
      <div>
        <label>Nama Lembaga</label>
        <input
          v-model="form.nama"
          type="text"
          class="input-style"
        />
      </div>
      <div>
        <label>NPYN</label>
        <input
          v-model="form.npyn"
          type="text"
          class="input-style"
        />
      </div>
      <div>
        <label>Tahun Berdiri</label>
        <input
          v-model="form.thn_berdiri"
          type="date"
          class="input-style"
        />
      </div>
      <div>
        <label>Luas</label>
        <input
          v-model="form.luas"
          type="text"
          class="input-style"
        />
      </div>
      <div>
        <label>Moto</label>
        <input
          v-model="form.moto"
          type="text"
          class="input-style"
        />
      </div>
      <div>
        <label>Logo</label>
        <input
          accept=".jpg, .png, .jpeg"
          @change="handleFileUpload"
          type="file"
          class="input-style"
        />
        <div
          v-if="selectedFile"
          class="mt-2"
        >
          <img
            :src="URL.createObjectURL(selectedFile)"
            alt="Preview Logo"
            class="h-20 rounded"
          />
        </div>
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
        <label>Telepon</label>
        <input
          v-model="form.telepon"
          type="number"
          class="input-style"
        />
      </div>
      <div>
        <label>Fax</label>
        <input
          v-model="form.fax"
          type="text"
          class="input-style"
        />
      </div>
      <div>
        <label>Email</label>
        <input
          v-model="form.email"
          type="email"
          class="input-style"
        />
      </div>
      <div>
        <label>Situs Web</label>
        <input
          v-model="form.situs_web"
          type="text"
          class="input-style"
        />
      </div>
      <div>
        <label>Facebook</label>
        <input
          v-model="form.facebook"
          type="text"
          class="input-style"
        />
      </div>
      <div>
        <label>YouTube</label>
        <input
          v-model="form.youtube"
          type="text"
          class="input-style"
        />
      </div>
      <div>
        <label>TikTok</label>
        <input
          v-model="form.tiktok"
          type="text"
          class="input-style"
        />
      </div>

      <div class="md:col-span-2 flex gap-4">
        <button
          type="submit"
          :disabled="isSubmitting"
          class="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-2 rounded shadow"
        >
          {{ isSubmitting ? 'Menyimpan...' : 'Simpan Perubahan' }}
        </button>
      </div>
    </form>
  </div>
</template>

<style >
.input-style {
  @apply w-full px-4 py-2 ring-1 ring-gray-400 border-2 border-black rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400;
}
</style>
