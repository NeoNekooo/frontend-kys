<script setup>
import api from '@/plugins/axios/axios'
import dayjs from 'dayjs'
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useToast } from 'vue-toastification' // Assuming you have toastification installed

const toast = useToast() // Initialize toast

const pegawai = ref([])
const errorMessage = ref('')
const loading = ref(true)
const editModal = ref(null)
const deleteModal = ref(null)
const imageModal = ref(null)
const addModal = ref(null)

const editPegawai = ref({})
const pegawaiToDelete = ref(null)
const modalImageSrc = ref('')
const newPegawai = ref({
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
  jml_anak: 0,
  alamat: '',
  kecamatan: '',
  desa: '',
  kabupaten: '',
  provinsi: '',
  kode_pos: '',
  kontak: '',
  photo: '',
  status: 1,
})

const getPegawai = async () => {
  try {
    const response = await api.get('/pegawai/aktif')
    if (response.data) {
      pegawai.value = response.data
      console.log(pegawai.value)
    } else {
      errorMessage.value = 'Format data tidak sesuai.'
    }
  } catch (error) {
    toast.error('Gagal memuat data pegawai.')
    errorMessage.value = 'Gagal memuat data pegawai.'
  } finally {
    loading.value = false
  }
}

const openEditModal = pegawai => {
  editPegawai.value = { ...pegawai }
  editModal.value.showModal()
}

const closeEditModal = () => {
  editPegawai.value = {}
  editModal.value.close()
}

const confirmEdit = async () => {
  try {
    await api.put(`/pegawai/${editPegawai.value.id}`, editPegawai.value)
    getPegawai()
    editModal.value.close()
    toast.success('Berhasil mengupdate data pegawai.')
  } catch (error) {
    toast.error('Gagal mengupdate data pegawai.')
  }
}

const openDeleteModal = id => {
  pegawaiToDelete.value = id
  deleteModal.value.showModal()
}

const closeDeleteModal = () => {
  pegawaiToDelete.value = null
  deleteModal.value.close()
}

const confirmDelete = async () => {
  try {
    await api.delete(`/pegawai/${pegawaiToDelete.value}`)
    getPegawai()
    console.log('Pegawai dengan ID', pegawaiToDelete.value, 'telah dihapus.')
    deleteModal.value.close()
    toast.success('Berhasil menghapus data pegawai.')
  } catch (error) {
    toast.error('Gagal menghapus data pegawai.')
  }
}

const openAddModal = () => {
  newPegawai.value = {
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
    jml_anak: 0,
    alamat: '',
    kecamatan: '',
    desa: '',
    kabupaten: '',
    provinsi: '',
    kode_pos: '',
    kontak: '',
    photo: '',
    status: 1,
  }
  addModal.value.showModal()
}

const closeAddModal = () => {
  newPegawai.value = {}
  addModal.value.close()
}

const confirmAdd = async () => {
  try {
    await api.post('/pegawai/aktif', newPegawai.value)
    getPegawai()
    addModal.value.close()
    toast.success('Berhasil menambahkan data pegawai.')
  } catch (error) {
    toast.error('Gagal menambahkan data pegawai.')
  }
}

const formatTanggal = tanggal => {
  return tanggal ? dayjs(tanggal).format('DD-MM-YYYY') : '-'
}

const openImageModal = imageUrl => {
  modalImageSrc.value = imageUrl
  imageModal.value.showModal()
}

const closeImageModal = () => {
  modalImageSrc.value = ''
  imageModal.value.close()
}

onMounted(() => {
  getPegawai()
})
</script>

<template>
  <section>
    <VCard>
      <div class="flex justify-between items-center gap-4 mb-4 my-4 ml-4">
        <h2 class="text-2xl font-semibold text-gray-800 dark:text-white">Data Pegawai</h2>
        <RouterLink
          to="tambah-pegawai"
          class="btn bg-green-600 text-white px-4 py-2 border-0 rounded-lg mr-4"
        >
          Tambah
        </RouterLink>
      </div>
      <VTable>
        <thead>
          <tr>
            <th class="text-uppercase">No</th>
            <th class="text-center text-uppercase">Photo</th>
            <th class="text-center text-uppercase">Nama</th>
            <!-- <th class="text-center text-uppercase">Kewarganegaraan</th> -->
            <!-- <th class="text-center text-uppercase">NIK</th> -->
            <th class="text-center text-uppercase">NUPTK</th>
            <!-- <th class="text-center text-uppercase">NIP</th> -->
            <th class="text-center text-uppercase">NIPY</th>
            <!-- <th class="text-center text-uppercase">NPWP</th> -->
            <th class="text-center text-uppercase">Jenis Kelamin</th>
            <!-- <th class="text-center text-uppercase">Kode Pos</th> -->
            <!-- <th class="text-center text-uppercase">Kontak</th> -->
            <th class="text-center text-uppercase">Status</th>
            <th class="text-center text-uppercase">Aksi</th>
          </tr>
        </thead>
        <tbody class="my-7 py-4 space-y-4 gap-4">
          <tr
            v-for="(p, index) in pegawai"
            :key="p.id"
          >
            <td>{{ index + 1 }}</td>
            <td class="text-center">
              <img
                v-if="p.photo"
                :src="`https://simaya.yayasannurulislam.org/uploads/pegawai/${p.photo}`"
                alt="Photo"
                class="w-12 h-12 object-cover rounded-md cursor-pointer mx-auto"
                @click="openImageModal(`https://simaya.yayasannurulislam.org/uploads/pegawai/${p.photo}`)"
              />
              <span v-else>-</span>
            </td>
            <td class="text-center">{{ p.nama }}</td>
            <!-- <td class="text-center">{{ p.kewarganegaraan }}</td> -->
            <!-- <td class="text-center">{{ p.nik }}</td> -->
            <td class="text-center">{{ p.nuptk }}</td>
            <!-- <td class="text-center">{{ p.nip }}</td> -->
            <td class="text-center">{{ p.nipy }}</td>
            <!-- <td class="text-center">{{ p.npwp }}</td> -->
            <td class="text-center">{{ p.jk === 'L' ? 'Laki-laki' : 'Perempuan' }}</td>
            <!-- <td class="text-center">{{ p.kode_pos }}</td> -->
            <!-- <td class="text-center">{{ p.kontak || '-' }}</td> -->

            <td class="text-center">
              <VChip>
                <span :class="p.status === 1 ? 'text-green-600' : 'text-red-600'">
                  {{ p.status === 1 ? 'Aktif' : 'Tidak Aktif' }}
                </span>
              </VChip>
            </td>
            <td class="whitespace-nowrap">
              <div class="flex items-center gap-3">
                <router-link
                  :to="`/pegawai/edit/${p.id}`"
                  class="text-white hover:text-blue-800 text-center px-2 py-1 rounded-lg bg-yellow-400 focus:outline-none"
                  title="Edit Pegawai"
                  aria-label="Edit"
                >
                  <i class="ri-pencil-line text-xl"></i>
                </router-link>

                <button
                  @click="openDeleteModal(p.id)"
                  class="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
                  title="Hapus Pegawai"
                  aria-label="Delete"
                >
                  <i class="ri-delete-bin-6-line text-lg"></i>
                </button>
                <button
                  class="bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
                >
                  <i class="ri-printer-line text-lg"></i>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </VTable>
    </VCard>
  </section>

  <dialog
    ref="deleteModal"
    class="modal"
  >
    <div class="modal-box">
      <h3 class="font-bold text-lg text-red-600">Konfirmasi Penghapusan</h3>
      <p class="py-4">Apakah Anda yakin ingin menghapus data pegawai ini?</p>
      <div class="modal-action">
        <button
          @click="closeDeleteModal"
          class="btn"
        >
          Batal
        </button>
        <button
          @click="confirmDelete"
          class="btn btn-error text-white"
        >
          Ya, Hapus
        </button>
      </div>
    </div>
  </dialog>
</template>

<style scoped>
.modal {
  position: fixed;
  z-index: 1000;
  display: none;
  overflow: auto;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0%);
  block-size: 100%;
  inline-size: 100%;
  inset-block-start: 0;
  inset-inline-start: 0;
  transition: opacity 0.5s ease-in-out, visibility 0.3s ease-in-out; /* Smooth transition */
}

.modal[open] {
  display: flex; /* Tampilkan ketika terbuka */
}

.modal-box {
  padding: 20px;
  border: 1px solid #888;
  border-radius: 8px;
  margin: auto;
  background-color: #fefefe;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 10%);
  inline-size: 80%;
  max-inline-size: 500px;
}

.modal-action {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-block-start: 20px;
}

.btn {
  /* border-radius: 6px; */
  cursor: pointer;
  padding-block: 8px;
  padding-inline: 16px;
}

.btn-error {
  border-color: #dc2626;
  background-color: #dc2626; /* Warna merah */
  color: white;
}
</style>
