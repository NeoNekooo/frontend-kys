<script setup>
import axios from 'axios'
import dayjs from 'dayjs'
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useToast } from 'vue-toastification'
import { useRouter } from 'vue-router'
const toast = useToast()
const showModal = ref(false)
const itemToDelete = ref(null)
const router = useRouter()

const url = 'http://localhost:5000/api/tapel'
const tapel = ref([])
const errorMessage = ref('')
const loading = ref(true)

const openDeleteModal = item => {
  itemToDelete.value = item
  showModal.value = true
}

const getTapel = async () => {
  try {
    const response = await axios.get(url)
    if (response.data) {
      tapel.value = response.data
      console.log(tapel.value)
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
    router.go() // reload current page
  } catch (error) {
    toast.error('Gagal menghapus data tapel.')
    console.error(error)
  }
}

<<<<<<< HEAD
const formatTanggal = tanggal => {
  return tanggal ? dayjs(tanggal).format('DD-MM-YYYY') : '-'
}
=======
// New method to toggle Tapel status
const toggleTapelStatus = async (item) => {
  const newStatus = item.status === 1 ? 0 : 1; // Toggle status
  try {
    await axios.put(`${url}/${item._id}`, { status: newStatus });
    item.status = newStatus; // Update local state
    toast.success(`Status Tapel ${item.tapel} berhasil diubah menjadi ${newStatus === 1 ? 'Aktif' : 'Tidak Aktif'}.`);
    // Optionally, you might want to re-fetch all data to ensure only one is active
    // if your business logic dictates only one 'Tapel' can be active at a time.
    // getTapel();
  } catch (error) {
    toast.error("Gagal mengubah status Tapel.");
    // Revert status on error to maintain UI consistency
    item.status = item.status === 1 ? 0 : 1;
  }
};

const formatTanggal = (tanggal) => {
  return tanggal ? dayjs(tanggal).format("DD-MM-YYYY") : "-";
};
>>>>>>> 2d1c296f9268bac3e9ed797212df74ec9b26d45e

onMounted(() => {
  getTapel()
})
</script>

<template>
  <section>
    <VCard>
      <div class="flex justify-between items-center gap-4 mb-4 my-4 ml-4">
        <h2 class="text-2xl font-semibold text-gray-800">Table Data Tapel</h2>
        <RouterLink
          to="tambah-tapel"
          class="btn bg-green-600 text-white px-4 py-2 rounded-lg mr-4"
        >
          Tambah Tapel
        </RouterLink>
      </div>
      <VTable>
        <thead>
          <tr>
            <th class="text-uppercase">No</th>
            <th class="text-center text-uppercase">Tapel</th>
            <th class="text-center text-uppercase">Keterangan</th>
            <th class="text-center text-uppercase">Status</th>
            <th class="text-center text-uppercase">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in tapel"
            :key="item.id"
          >
            <td>{{ index + 1 }}</td>
            <td class="text-center">{{ item.tapel }}</td>
            <td class="text-center">{{ item.ket }}</td>
            <td class="text-center">
              <VSwitch
                v-model="item.status"
                :true-value="1"
                :false-value="0"
                color="success"
                @change="toggleTapelStatus(item)"
              ></VSwitch>
              <span :class="item.status === 1 ? 'text-green-600' : 'text-red-600'">
                {{ item.status === 1 ? 'Aktif' : 'Tidak Aktif' }}
              </span>
            </td>
            <td class="text-center whitespace-nowrap">
              <div class="flex items-center justify-center gap-3">
                <router-link
                  :to="`/tapel/edit/${item.id}`"
                  class="text-white hover:text-blue-800 text-center px-2 py-1 rounded-lg bg-yellow-400 focus:outline-none"
                  title="Edit Tapel"
                  aria-label="Edit"
                >
                  <i class="ri-pencil-line text-xl"></i>
                </router-link>

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
  </section>
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
</template>
