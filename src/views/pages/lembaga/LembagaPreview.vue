<script setup>
import api from '@/plugins/axios/axios'
import { computed, onMounted, ref } from 'vue'
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
  logo: '',
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
    console.log(form.value.logo)
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

const isValidHttpsUrl = url => {
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
    console.log(form.value)

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

const logoPreview = computed(() => {
  if (selectedFile.value) {
    return URL.createObjectURL(selectedFile.value)
  } else if (form.value.logo_url) {
    return form.value.logo_url
  } else {
    return null
  }
})

onMounted(() => {
  fetchLembaga()
})
</script>
<template>
  <VCard title="Album Settings">
    <!-- Logo Section -->
    <VCardText class="flex gap-6 items-start flex-wrap">
      <!-- Logo Preview -->
      <div>
        <img
          :src="`http://localhost:5000${form.logo}`"
          alt="Logo Preview"
          class="rounded-lg border border-gray-300 w-40 h-40 object-cover"
        />
      </div>

      <!-- Upload Button -->
      <div class="flex flex-col justify-center gap-4">
        <div class="flex flex-wrap gap-2">
          <button
            class="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-4 py-2 rounded shadow flex items-center"
            @click.prevent="$refs.logoInput.click()"
          >
            <i class="ri-upload-cloud-line mr-2"></i>
            Upload Photo
          </button>
          <input
            ref="logoInput"
            type="file"
            accept="image/jpeg, image/png"
            hidden
            @change="handleFileUpload"
          />
        </div>
        <p class="text-sm text-gray-500">Allowed JPG or PNG. Max size 800KB.</p>
      </div>
    </VCardText>

    <VDivider />

    <!-- Form Section -->
    <VCardText>
      <form
        @submit.prevent="submitForm"
        class="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <!-- Basic Info -->
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

        <!-- Optional logo upload -->
        <div>
          <label>Logo</label>
          <input
            accept=".jpg, .png, .jpeg"
            type="file"
            @change="handleFileUpload"
            class="input-style"
          />
        </div>

        <!-- Address & Contact -->
        <div class="md:col-span-2">
          <label>Alamat</label>
          <textarea
            v-model="form.alamat"
            class="input-style resize-none h-24"
          ></textarea>
        </div>

        <div>
          <label>Desa</label
          ><input
            v-model="form.desa"
            type="text"
            class="input-style"
          />
        </div>
        <div>
          <label>Kecamatan</label
          ><input
            v-model="form.kecamatan"
            type="text"
            class="input-style"
          />
        </div>
        <div>
          <label>Kabupaten</label
          ><input
            v-model="form.kabupaten"
            type="text"
            class="input-style"
          />
        </div>
        <div>
          <label>Provinsi</label
          ><input
            v-model="form.provinsi"
            type="text"
            class="input-style"
          />
        </div>
        <div>
          <label>Kode Pos</label
          ><input
            v-model="form.kode_pos"
            type="text"
            class="input-style"
          />
        </div>
        <div>
          <label>Telepon</label
          ><input
            v-model="form.telepon"
            type="text"
            class="input-style"
          />
        </div>
        <div>
          <label>Fax</label
          ><input
            v-model="form.fax"
            type="text"
            class="input-style"
          />
        </div>
        <div>
          <label>Email</label
          ><input
            v-model="form.email"
            type="email"
            class="input-style"
          />
        </div>
        <div>
          <label>Situs Web</label
          ><input
            v-model="form.situs_web"
            type="text"
            class="input-style"
          />
        </div>

        <!-- Social Media -->
        <div>
          <label>Facebook</label
          ><input
            v-model="form.facebook"
            type="text"
            class="input-style"
          />
        </div>
        <div>
          <label>YouTube</label
          ><input
            v-model="form.youtube"
            type="text"
            class="input-style"
          />
        </div>
        <div>
          <label>TikTok</label
          ><input
            v-model="form.tiktok"
            type="text"
            class="input-style"
          />
        </div>

        <!-- Submit -->
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
    </VCardText>
  </VCard>
</template>

<style lang="scss">
.input-style {
  @apply w-full px-4 py-2 ring-1 ring-gray-400 border-2 border-black rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400;
}
</style>
