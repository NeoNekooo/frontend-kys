<script setup>
import api from '@/plugins/axios/axios'
import { onMounted, reactive, ref } from 'vue'
import { useToast } from 'vue-toastification'

const toast = useToast()

const nomorSuratOptions = ref([])
const namaPegawaiOptions = ref([])
const spkOptions = ref([])
const tapelOptions = ref([])
const tapel = ref({ tapel: '' })
const penugasanData = ref([])
const tapelId = ref(null)

const form = reactive({
  tapel_display: '',
  id_nomor_surat: '',
  nomorSurat_display: '',
  id_pegawai: '',
  id_satuan_pendidikan: '',
})

async function fetchNomorSurat() {
  try {
    const res = await api.get('/nomorSurat')
    if (res.data && res.data.length > 0) {
      const firstNomorSurat = res.data[0]
      console.log('First Nomor Surat:', res.data[0])
      form.id_nomor_surat = firstNomorSurat.id
      tapelId.value = firstNomorSurat.id_tapel || ''
      console.log('Tapel ID:', tapelId.value)
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
async function fetchTapel(id) {
  try {
    console.log('Fetching tapel with ID:', id)
    const res = await api.get(`/tapel/${id}`)
    console.log('Tapel response:', res.data)

    if (res.data) {
      form.tapel_display = res.data.tapel // langsung akses objek
      tapel.value = res.data
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
    const res = await api.get('/pegawai/aktif')
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
  try {
    const res = await api.get('/spk') // Menggunakan suratPerintahUrl yang sudah diubah
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
    const res = await api.get('/penugasan')
    penugasanData.value = res.data.data
    console.log('Penugasan data fetched:', penugasanData.value)
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

async function handleSubmit() {
  const dataToSubmit = {
    id_tapel: tapelId.value,
    id_nomor_surat: form.id_nomor_surat,
    id_pegawai: form.id_pegawai,
    id_satuan_pendidikan: form.id_satuan_pendidikan,
  }

  console.log('Submitted form:', dataToSubmit)
  try {
    await api.post('/penugasan', dataToSubmit)
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
  form.id_pegawai = ''
  form.id_satuan_pendidikan = '' // Diubah dari id_suratPerintah
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
              v-model="form.id_pegawai"
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
                :key="item.id"
                :value="item.id"
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
              v-model="form.id_satuan_pendidikan"
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
                :key="item.id"
                :value="item.id"
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
              :key="item.id"
            >
              <td>{{ index + 1 }}</td>
              <td>{{ item.tahun_pelajaran }}</td>
              <td>{{ item.nomor_surat }}</td>
              <td>{{ item.nama_pegawai }}</td>
              <td>{{ item.nama_satuan_pendidikan }}</td>
              <td class="text-center whitespace-nowrap">
                <div class="flex items-center justify-center gap-3">
                  <RouterLink
                    :to="`/tapel/edit/${item.id}`"
                    class="text-white hover:text-blue-800 text-center px-2 py-1 rounded-lg bg-yellow-400 focus:outline-none"
                    title="Edit Tapel"
                    aria-label="Edit"
                  >
                    <i class="ri-pencil-line text-xl"></i>
                  </RouterLink>

                  <RouterLink
                    :to="`/cetak_sk/${item.id}`"
                    class="bg-green-800 hover:bg-green-700 text-white px-2 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
                    title="Hapus Tapel"
                    aria-label="Delete"
                  >
                    <i class="ri-printer-line text-lg"></i>
                  </RouterLink>
                </div>
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
  padding: 10px;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  background-color: #f9fafb;
  transition: border-color 0.2s ease-in-out;
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
