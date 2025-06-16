<script setup>
import api from '@/plugins/axios/axios'
import { onMounted, reactive, ref, watch } from 'vue'
import { useToast } from 'vue-toastification'

const toast = useToast()

// Define props to receive the assignment ID
const props = defineProps({
  id: {
    type: String, // Or Number, depending on your API
    required: true, // Make it required for an edit form
  },
})

const nomorSuratOptions = ref([])
const namaPegawaiOptions = ref([])
const spkOptions = ref([])
const tapelOptions = ref([]) // Keep if still needed for other purposes, though tapel_display is derived
const tapel = ref({ tapel: '' }) // Keep for tapel object if needed
const penugasanData = ref([]) // This might not be needed for an edit form, but kept for now
const tapelId = ref(null)

const form = reactive({
  id: null, // Add an ID field to the form for updates
  tapel_display: '',
  id_nomor_surat: '',
  nomorSurat_display: '',
  id_pegawai: '',
  id_satuan_pendidikan: '',
})

// Watch for changes in the ID prop to refetch data if the ID changes
watch(() => props.id, async (newId) => {
  if (newId) {
    await fetchPenugasanById(newId);
  }
});


async function fetchNomorSurat() {
  try {
    const res = await api.get('/nomorSurat')
    if (res.data && res.data.length > 0) {
      nomorSuratOptions.value = res.data
      // No need to pre-select the first one here for edit, as it will be populated by fetchPenugasanById
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
    const res = await api.get('/spk')
    if (res.data) {
      spkOptions.value = res.data
    } else {
      console.error('No data found for SPK')
      spkOptions.value = []
    }
  } catch (error) {
    console.error('Error fetching SPK:', error)
  }
}

async function fetchPenugasanById(id) {
  try {
    const res = await api.get(`/penugasan/${id}`)
    if (res.data) {
      const penugasan = res.data.data; // Assuming your API returns data in a 'data' field
      form.id = penugasan.id;
      form.id_nomor_surat = penugasan.id_nomor_surat;
      form.id_pegawai = penugasan.id_pegawai;
      form.id_satuan_pendidikan = penugasan.id_satuan_pendidikan;
      tapelId.value = penugasan.id_tapel; // Populate tapelId

      // Fetch related display data
      if (penugasan.id_nomor_surat) {
        const nomorSuratRes = await api.get(`/nomorSurat/${penugasan.id_nomor_surat}`);
        if (nomorSuratRes.data) {
          form.nomorSurat_display = nomorSuratRes.data.no_surat;
          if (nomorSuratRes.data.id_tapel) {
            await fetchTapel(nomorSuratRes.data.id_tapel);
          }
        }
      }
    } else {
      console.error('No penugasan data found for ID:', id);
      toast.error('Data penugasan tidak ditemukan.');
    }
  } catch (error) {
    console.error('Error fetching penugasan by ID:', error);
    toast.error('Gagal memuat data penugasan.');
  }
}

async function handleSubmit() {
  const dataToSubmit = {
    id_tapel: tapelId.value,
    id_nomor_surat: form.id_nomor_surat,
    id_pegawai: form.id_pegawai,
    id_satuan_pendidikan: form.id_satuan_pendidikan,
  }

  console.log('Submitted form for update:', dataToSubmit)
  try {
    await api.put(`/penugasan/${form.id}`, dataToSubmit)
    toast.success('Data penugasan berhasil diperbarui!')
  } catch (error) {
    console.error('Error submitting form:', error)
    toast.error('Gagal memperbarui data penugasan.')
  }
}

function handleReset() {
  // For an edit form, reset might mean reloading the original data
  if (props.id) {
    fetchPenugasanById(props.id);
  } else {
    form.id_pegawai = '';
    form.id_satuan_pendidikan = '';
  }
}

onMounted(async () => {
  await fetchNomorSurat()
  await fetchPegawaiAktif()
  await fetchSPK()
  if (props.id) {
    await fetchPenugasanById(props.id)
  }
})
</script>

<template>
  <div class="bg-white p-6 rounded-lg shadow-md w-full">
    <div class="flex flex-col md:flex-row gap-6">
      <div class="w-full md:w-full">
        <div class="flex justify-between items-center gap-4 mb-4">
          <h2 class="text-2xl font-semibold text-gray-800">Edit Data penugasan</h2>
          <router-link to="/tabel-penugasan" class="btn bg-green-600 text-white px-4 py-2 rounded-lg mr-4">
           Kembali
          </router-link>
        </div>

        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div>
            <label for="tapel" class="block text-sm font-medium text-gray-700">Tahun Pelajaran</label>
            <input id="tapel" type="text" class="input-field mt-1 block w-full bg-gray-100 cursor-not-allowed" disabled
              :value="form.tapel_display" placeholder="Loading tahun pelajaran..." />
          </div>

          <div>
            <label for="nomor_surat" class="block text-sm font-medium text-gray-700">Nomor Surat</label>
            <input id="nomor_surat" v-model="form.nomorSurat_display" type="text"
              class="input-field mt-1 block w-full bg-gray-100 cursor-not-allowed" disabled
              placeholder="Nomor Surat Akan Tampil Disini" />
          </div>

          <div>
            <label for="nama_pegawai" class="block text-sm font-medium text-gray-700">Nama Pegawai</label>
            <select id="nama_pegawai" v-model="form.id_pegawai" class="input-field mt-1 block w-full" required>
              <option disabled value="">
                Pilih Nama Pegawai
              </option>
              <option v-for="item in namaPegawaiOptions" :key="item.id" :value="item.id">
                {{ item.nama }}
              </option>
            </select>
          </div>

          <div>
            <label for="spk_select" class="block text-sm font-medium text-gray-700">SPK</label>
            <select id="spk_select" v-model="form.id_satuan_pendidikan" class="input-field mt-1 block w-full" required>
              <option disabled value="">
                Pilih SPK
              </option>
              <option v-for="item in spkOptions" :key="item.id" :value="item.id">
                {{ item.nama }}
              </option>
            </select>
          </div>

          <div class="flex space-x-2 pt-2">
            <button type="submit" class="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition">
              Update
            </button>
            <button type="button" @click="handleReset"
              class="border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-100">
              Reset
            </button>
          </div>
        </form>
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
