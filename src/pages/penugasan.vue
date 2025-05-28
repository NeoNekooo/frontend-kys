<template>
  <div class="bg-white p-6 rounded-lg shadow-md w-full">
    <div class="flex flex-col md:flex-row gap-6">
      <!-- Form -->
      <div class="w-full md:w-1/2">
        <h2 class="text-2xl font-semibold text-gray-800 mb-6">Multiple Column</h2>
        <form
          @submit.prevent="handleSubmit"
          class="space-y-4"
        >
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              v-for="tapel in tapel"
              :key="tapel.id"
              v-model="form.tapel"
              type="text"
              placeholder="Tahun Pelajaran"
              class="input-field"
            />

            <!-- Nama Pegawai (Select Option) -->
            <select
              v-model="form.namaPegawai"
              class="input-field"
            >
              <option
                disabled
                value=""
              >
                Pilih Nama Pegawai
              </option>
              <option
                v-for="item in nama"
                :key="item.id"
                :value="item.nama"
              >
                {{ item.nama }}
              </option>
            </select>

            <!-- Nomor Surat Input -->
            <input
              v-model="form.NomorSurat"
              type="text"
              placeholder="Nomor Surat"
              class="input-field"
            />

            <!-- Satuan Pendidikan (SP) Select Option -->
            <select
              v-model="form.SP"
              class="input-field"
            >
              <option
                disabled
                value=""
              >
                Pilih Satuan Pendidikan
              </option>
              <option
                v-for="item in sp"
                :key="item.id"
                :value="item.nama"
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

      <!-- Table -->
      <div class="w-full md:w-1/2 overflow-auto">
        <VTable class="w-full">
          <thead>
            <tr>
              <th class="text-uppercase">Dessert (100g serving)</th>
              <th class="text-center text-uppercase">Calories</th>
              <th class="text-center text-uppercase">Fat (g)</th>
              <th class="text-center text-uppercase">Carbs (g)</th>
              <th class="text-center text-uppercase">Protein (g)</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in desserts"
              :key="item.dessert"
            >
              <td>{{ item.dessert }}</td>
              <td class="text-center">{{ item.calories }}</td>
              <td class="text-center">{{ item.fat }}</td>
              <td class="text-center">{{ item.carbs }}</td>
              <td class="text-center">{{ item.protein }}</td>
            </tr>
          </tbody>
        </VTable>
      </div>
    </div>
  </div>
</template>
<script setup>
import axios from 'axios'
import { onMounted, reactive } from 'vue'

// URL endpoints
const tapelUrl = 'http://localhost:5000/api/tapel'
const NSUrl = 'http://localhost:5000/api/nomorSurat'
const namaUrl = 'http://localhost:5000/api/pegawai/aktif'
const spUrl = 'http://localhost:5000/api/suratPerintah'
const tapel = ref([])
const NS = ref([])
const nama = ref([])
const sp = ref([])

// Form state
const form = reactive({
  tapel: '',
  NomorSurat: '',
  namaPegawai: '',
  SP: '',
})

const desserts = [
  { dessert: 'Frozen Yogurt', calories: 159, fat: 6, carbs: 24, protein: 4 },
  { dessert: 'Ice cream sandwich', calories: 237, fat: 6, carbs: 24, protein: 4 },
  { dessert: 'Eclair', calories: 262, fat: 6, carbs: 24, protein: 4 },
  { dessert: 'Cupcake', calories: 305, fat: 6, carbs: 24, protein: 4 },
  { dessert: 'Gingerbread', calories: 356, fat: 6, carbs: 24, protein: 4 },
]

// Fetching functions
async function fetchTapel() {
  try {
    const res = await axios.get(tapelUrl)
    if (res.data) {
      tapel.value = res.data
    } else {
      console.error('No data found for tapel')
      tapel.value = []
    }
    console.log('Tapel data:', res.data)
  } catch (error) {
    console.error('Error fetching tapel:', error)
  }
}

async function fetchNomorSurat() {
  try {
    const res = await axios.get(NSUrl)
    if (res.data) {
      NS.value = res.data
    } else {
      console.error('No data found for nomor surat')
      NS.value = []
    }
    console.log('Nomor Surat data:', res.data)
  } catch (error) {
    console.error('Error fetching nomor surat:', error)
  }
}

async function fetchPegawaiAktif() {
  try {
    const res = await axios.get(namaUrl)
    if (res.data) {
      nama.value = res.data
    } else {
      console.error('No data found for pegawai aktif')
      nama.value = []
    }
    console.log('Pegawai aktif:', res.data)
  } catch (error) {
    console.error('Error fetching pegawai aktif:', error)
  }
}

async function fetchSP() {
  try {
    const res = await axios.get(spUrl)
    if (res.data) {
      sp.value = res.data
    } else {
      console.error('No data found for surat perintah')
      sp.value = []
    }
    console.log('Surat Perintah:', res.data)
  } catch (error) {
    console.error('Error fetching surat perintah:', error)
  }
}

function handleSubmit() {
  console.log('Submitted form:', { ...form })
}

function handleReset() {
  Object.keys(form).forEach(key => {
    form[key] = key === 'remember' ? false : ''
  })
}

onMounted(() => {
  fetchTapel()
  fetchNomorSurat()
  fetchPegawaiAktif()
  fetchSP()
})
</script>
