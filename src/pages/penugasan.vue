<script setup>
import axios from 'axios'
import { onMounted, reactive, ref } from 'vue'
import { useToast } from 'vue-toastification'

const toast = useToast()
const penugasanUrl = 'http://localhost:5000/api/penugasan'
const nomorSuratUrl = 'http://localhost:5000/api/nomorSurat'
const namaPegawaiUrl = 'http://localhost:5000/api/pegawai/aktif'
const suratPerintahUrl = 'http://localhost:5000/api/spk'
const tapelUrl = 'http://localhost:5000/api/nomorSurat/tapel'

const nomorSuratOptions = ref([])
const namaPegawaiOptions = ref([])
const spkOptions = ref([])
const tapelOptions = ref([])
const tapel = ref({ tapel: '' })
const penugasanData = ref([])

const form = reactive({
  tapel_display: '',
  id_nomor_surat: '',
  nomorSurat_display: '',
  id_namaPegawai: '',
  id_spk: '',
})

// Fetch nomorSurat, lalu ambil ID tapel dari situ, dan fetch tapel-nya
async function fetchNomorSurat() {
  try {
    const res = await axios.get(nomorSuratUrl)
    if (res.data && res.data.length > 0) {
      const firstNomorSurat = res.data[0]
      console.log('First Nomor Surat:', res.data[0])

      form.id_nomor_surat = firstNomorSurat._id
      form.nomorSurat_display = firstNomorSurat.no_surat
      console.log('Nomor Surat fetched:', form.nomorSurat_display)
      nomorSuratOptions.value = res.data

      if (firstNomorSurat.id_tapel) {
        await fetchTapel(firstNomorSurat.id_tapel)
      } else {
        console.warn('id_tapel tidak tersedia di nomorSurat')
        form.tapel_display = 'N/A'
      }
    } else {
      console.error('No data found for nomor surat')
      nomorSuratOptions.value = []
    }
  } catch (error) {
    console.error('Error fetching nomor surat:', error)
  }
}
async function fetchTapel(idTapel) {
  try {
    const res = await axios.get(`${tapelUrl}/${idTapel}`)
    if (res.data && Array.isArray(res.data) && res.data.length > 0) {
      form.tapel_display = res.data[1].tapel
      tapel.value = res.data[1]
      console.log('Tapel fetched:', tapel.value)
    } else {
      console.error('Tapel tidak ditemukan')
      form.tapel_display = 'N/A'
    }
  } catch (error) {
    console.error('Error fetching tapel:', error)
    form.tapel_display = 'N/A'
  }
}

async function fetchPegawaiAktif() {
  try {
    const res = await axios.get(namaPegawaiUrl)
    if (res.data) {
      namaPegawaiOptions.value = res.data
    } else {
      console.error('No data found for pegawai aktif')
      namaPegawaiOptions.value = []
    }
  } catch (error) {
    console.error('Error fetching pegawai aktif:', error)
  }
}

async function fetchSPK() {
  // Diubah dari fetchSuratPerintah
  try {
    const res = await axios.get(suratPerintahUrl) // Menggunakan suratPerintahUrl yang sudah diubah
    if (res.data) {
      spkOptions.value = res.data // Diubah dari suratPerintahOptions
    } else {
      console.error('No data found for SPK')
      spkOptions.value = []
    }
  } catch (error) {
    console.error('Error fetching SPK:', error)
  }
}

async function fetchPenugasanData() {
  try {
    const res = await axios.get(penugasanUrl);
    penugasanData.value = res.data; // Already contains joined data!
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

async function handleSubmit() {
  const dataToSubmit = {
    id_nomor_surat: form.id_nomor_surat,
    id_namaPegawai: form.id_namaPegawai,
    id_spk: form.id_spk, 
  }
  console.log('Submitted form:', dataToSubmit)
  try {
    await axios.post(penugasanUrl, dataToSubmit)
    toast.success('Data penugasan berhasil ditambahkan!')
    handleReset()
    await fetchPenugasanData()
  } catch (error) {
    console.error('Error submitting form:', error)
    toast.error('Gagal menambahkan data penugasan.')
  }
}
console.log('tapel display:', form.tapel_display)
function handleReset() {
  form.id_namaPegawai = ''
  form.id_spk = '' // Diubah dari id_suratPerintah
}

onMounted(async () => {
  await fetchNomorSurat()
  await fetchPegawaiAktif()
  await fetchSPK() // Diubah dari fetchSuratPerintah
  await fetchPenugasanData()
})
</script>

<template>
  <div class="bg-white p-6 rounded-lg shadow-md w-full">
    <div class="flex flex-col md:flex-row gap-6">
      <div class="w-full md:w-1/3">
        <h2 class="text-2xl font-semibold text-gray-800 mb-6">Form Penugasan</h2>
        <form
          @submit.prevent="handleSubmit"
          class="space-y-4"
        >
          <div>
            <label
              for="tapel"
              class="block text-sm font-medium text-gray-700"
              >Tahun Pelajaran</label
            >
            <input
              id="tapel"
              type="text"
              class="input-field mt-1 block w-full bg-gray-100 cursor-not-allowed"
              disabled
              :value="form.tapel_display"
              placeholder="Loading tahun pelajaran..."
            />
          </div>

          <div>
            <label
              for="nomor_surat"
              class="block text-sm font-medium text-gray-700"
              >Nomor Surat</label
            >
            <input
              id="nomor_surat"
              v-model="form.nomorSurat_display"
              type="text"
              class="input-field mt-1 block w-full bg-gray-100 cursor-not-allowed"
              disabled
              placeholder="Nomor Surat Akan Tampil Disini"
            />
          </div>

          <div>
            <label
              for="nama_pegawai"
              class="block text-sm font-medium text-gray-700"
              >Nama Pegawai</label
            >
            <select
              id="nama_pegawai"
              v-model="form.id_namaPegawai"
              class="input-field mt-1 block w-full"
              required
            >
              <option
                disabled
                value=""
              >
                Pilih Nama Pegawai
              </option>
              <option
                v-for="item in namaPegawaiOptions"
                :key="item._id"
                :value="item._id"
              >
                {{ item.nama }}
              </option>
            </select>
          </div>

          <div>
            <label
              for="spk_select"
              class="block text-sm font-medium text-gray-700"
              >SPK</label
            >
            <select
              id="spk_select"
              v-model="form.id_spk"
              class="input-field mt-1 block w-full"
              required
            >
              <option
                disabled
                value=""
              >
                Pilih SPK
              </option>
              <option
                v-for="item in spkOptions"
                :key="item._id"
                :value="item._id"
              >
                {{ item.nama }}
              </option>
            </select>
          </div>

          <div class="flex space-x-2 pt-2">
            <button
              type="submit"
              class="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition"
            >
              Submit
            </button>
            <button
              type="button"
              @click="handleReset"
              class="border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-100"
            >
              Reset
            </button>
          </div>
        </form>
      </div>

      <div class="w-full overflow-auto">
        <h2 class="text-2xl font-semibold text-gray-800 mb-6">Data Penugasan</h2>
        <VTable class="w-full table-auto">
          <thead>
            <tr>
              <th class="text-uppercase">No</th>
              <th class="text-uppercase">Tahun Pelajaran</th>
              <th class="text-uppercase">Nomor Surat</th>
              <th class="text-uppercase">Nama Pegawai</th>
              <th class="text-uppercase">SPK</th>
              <th class="text-uppercase">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in penugasanData"
              :key="item._id"
            >
              <td>{{ index + 1 }}</td>
              <td>{{ item.nama_tapel }}</td>
              <td>{{ item.nomor_surat }}</td>
              <td>{{ item.nama_pegawai }}</td>
              <td>{{ item.nama_spk }}</td>
              <td>
                <button class="text-blue-500 hover:text-blue-700">Edit</button>
                <button class="text-red-500 hover:text-red-700 ml-2">Hapus</button>
              </td>
            </tr>
            <tr v-if="penugasanData.length === 0">
              <td
                colspan="6"
                class="text-center py-4 text-gray-500"
              >
                Tidak ada data penugasan.
              </td>
            </tr>
          </tbody>
        </VTable>
      </div>
    </div>
  </div>
</template>

<style scoped>
.input-field {
  @apply px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500;
}

.input-field[disabled] {
  background-color: #e2e8f0;
  cursor: not-allowed;
}

.VTable {
  border-collapse: collapse;
}

.VTable th,
.VTable td {
  padding: 12px;
  border-block-end: 1px solid #e5e7eb;
  text-align: start;
}

.VTable th {
  background-color: #f9fafb;
  font-weight: 600;
}

.VTable td.text-center {
  text-align: center;
}
</style>
