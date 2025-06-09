<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

const toast = useToast()
const router = useRouter()

const url = 'http://localhost:5000/api/nomorSurat'
const nomorSurat = ref([])
const errorMessage = ref('')
const loading = ref(true)

const showModal = ref(false)
const itemToDelete = ref(null)

const openDeleteModal = item => {
  itemToDelete.value = item
  showModal.value = true
}

const getNomorSurat = async () => {
  try {
    const response = await axios.get(url)
    if (response.data) {
      nomorSurat.value = response.data
    } else {
      errorMessage.value = 'Format data tidak sesuai.'
    }
  } catch (error) {
    toast.error('Gagal memuat data Tapel.')
    errorMessage.value = 'Gagal memuat data Tapel.'
  } finally {
    loading.value = false
  }
}

const deleteItem = async () => {
  try {
    await axios.delete(`${url}/${itemToDelete.value.id}`)
    toast.success('Data tapel berhasil dihapus.')
    showModal.value = false
    router.go()
  } catch (error) {
    toast.error('Gagal menghapus data tapel.')
    console.error(error)
  }
}
const formatDate = (dateStr) => {
  if (!dateStr) return ''
  return new Date(dateStr).toISOString().split('T')[0]
}


onMounted(() => {
  getNomorSurat()
})
</script>

<template>
  <section>
    <VCard>
      <div class="flex justify-between items-center gap-4 mb-4 my-4 ml-4">
        <h2 class="text-2xl font-semibold text-gray-800">Table Nomor Surat</h2>
        <RouterLink
          to="tambah-nomor-surat"
          class="btn bg-green-600 text-white px-4 py-2 rounded-lg mr-4"
        >
          Tambah Tapel
        </RouterLink>
      </div>
      <VTable>
        <thead>
          <tr>
            <th class="text-uppercase">No</th>
            <th class="text-center text-uppercase">Nomor Surat</th>
            <th class="text-center text-uppercase">Nama Pimpinansi</th>
            <th class="text-center text-uppercase">TMT</th>
            <th class="text-center text-uppercase">Tanggal SP</th>
            <th class="text-center text-uppercase">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in nomorSurat"
            :key="item.id"
          >
            <td>{{ index + 1 }}</td>
            <td class="text-center">{{ item.no_surat }}</td>
            <td class="text-center">{{ item.nama_pimpinan }}</td>
            <td class="text-center">{{ formatDate(item.tgl_sp) }}</td>
            <td class="text-center">{{ formatDate(item.tmt) }}</td>
            <td class="text-center whitespace-nowrap">
              <div class="flex items-center justify-center gap-3">
                <RouterLink
                  :to="`/no-surat/edit/${item.id}`"
                  class="text-white hover:text-blue-800 text-center px-2 py-1 rounded-lg bg-yellow-400 focus:outline-none"
                  title="Edit Tapel"
                  aria-label="Edit"
                >
                  <i class="ri-pencil-line text-xl"></i>
                </RouterLink>

                <button
                  @click="openDeleteModal(item)"
                  class="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
                  title="Hapus Tapel"
                  aria-label="Delete"
                >
                  <i class="ri-delete-bin-6-line text-lg"></i>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </VTable>
    </VCard>

    <!-- Modal Konfirmasi Hapus -->
    <div
      v-if="showModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div class="bg-white p-6 rounded shadow-lg max-w-sm w-full">
        <h3 class="text-lg font-semibold mb-4">Yakin ingin menghapus data ini?</h3>
        <div class="flex justify-end gap-4">
          <button
            @click="showModal = false"
            class="px-4 py-2 bg-gray-300 rounded"
          >
            Batal
          </button>
          <button
            @click="deleteItem"
            class="px-4 py-2 bg-red-600 text-white rounded"
          >
            Hapus
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
