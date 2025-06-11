<script setup>
import api from "@/plugins/axios/axios";
import axios from "axios";
import dayjs from "dayjs";
import { onMounted, ref } from "vue";
import { RouterLink } from "vue-router";
import { useToast } from 'vue-toastification'; // Assuming you have toastification installed

const toast = useToast(); // Initialize toast


const url = "http://localhost:5000/api/spk"; // Changed from /api/pegawai to /api/spk
const spk = ref([]);
const errorMessage = ref("");
const loading = ref(true);
const editModal = ref(null);
const deleteModal = ref(null);
const imageModal = ref(null);
const addModal = ref(null);

const editSpk = ref({});
const spkToDelete = ref(null); 
const modalImageSrc = ref("");
const newSpk = ref({ 
  nama: "",
  kewarganegaraan: "",
  nik: "",
  nuptk: "",
  nip: "",
  nipy: "",
  npwp: "",
  tmp_lahir: "",
  tgl_lahir: "",
  jk: "",
  agama: "",
  nama_ibu: "",
  status_pernikahan: "",
  nama_suami_istri: "",
  jml_anak: 0,
  alamat: "",
  kecamatan: "",
  desa: "",
  kabupaten: "",
  provinsi: "",
  kode_pos: "",
  kontak: "",
  photo: "",
  status: 1,
});

const getSpk = async () => { // Changed 'getPegawai' to 'getSpk'
  try {
    const response = await api.get('/spk'); // Changed from /pegawai to /spk
    if (response.data) {
      spk.value = response.data; // Changed 'pegawai.value' to 'spk.value'
      console.log(spk.value); // Changed 'pegawai.value' to 'spk.value'
    } else {
      errorMessage.value = "Format data tidak sesuai.";
    }
  } catch (error) {
    toast.error("Gagal memuat data SPK."); // Changed "pegawai" to "SPK"
    errorMessage.value = "Gagal memuat data SPK."; // Changed "pegawai" to "SPK"
  } finally {
    loading.value = false;
  }
};

const openEditModal = (item) => { // Changed 'pegawai' parameter to 'item' for generality
  editSpk.value = { ...item }; // Changed 'editPegawai' to 'editSpk'
  editModal.value.showModal();
};

const closeEditModal = () => {
  editSpk.value = {}; // Changed 'editPegawai' to 'editSpk'
  editModal.value.close();
};

const confirmEdit = async () => {
  try {
    await api.put(`/spk/${editSpk.value._id}`, editSpk.value); // Changed 'editPegawai' to 'editSpk'
    getSpk(); // Changed 'getPegawai' to 'getSpk'
    editModal.value.close();
    toast.success("Berhasil mengupdate data SPK."); // Changed "pegawai" to "SPK"
  } catch (error) {
    toast.error("Gagal mengupdate data SPK."); // Changed "pegawai" to "SPK"
  }
};

const openDeleteModal = (id) => {
  spkToDelete.value = id; // Changed 'pegawaiToDelete' to 'spkToDelete'
  deleteModal.value.showModal();
};

const closeDeleteModal = () => {
  spkToDelete.value = null; // Changed 'pegawaiToDelete' to 'spkToDelete'
  deleteModal.value.close();
};

const confirmDelete = async () => {
  try {
    await api.delete(`/apk/${spkToDelete.value}`); // Changed 'pegawaiToDelete' to 'spkToDelete'
    getSpk(); // Changed 'getPegawai' to 'getSpk'
    deleteModal.value.close();
    toast.success("Berhasil menghapus data SPK."); // Changed "pegawai" to "SPK"
  } catch (error) {
    toast.error("Gagal menghapus data SPK."); // Changed "pegawai" to "SPK"
  }
};

const openAddModal = () => {
  newSpk.value = { // Changed 'newPegawai' to 'newSpk'
    nama: "",
    kewarganegaraan: "",
    nik: "",
    nuptk: "",
    nip: "",
    nipy: "",
    npwp: "",
    tmp_lahir: "",
    tgl_lahir: "",
    jk: "",
    agama: "",
    nama_ibu: "",
    status_pernikahan: "",
    nama_suami_istri: "",
    jml_anak: 0,
    alamat: "",
    kecamatan: "",
    desa: "",
    kabupaten: "",
    provinsi: "",
    kode_pos: "",
    kontak: "",
    photo: "",
    status: 1,
  };
  addModal.value.showModal();
};

const closeAddModal = () => {
  newSpk.value = {}; // Changed 'newPegawai' to 'newSpk'
  addModal.value.close();
};

const confirmAdd = async () => {
  try {
    await api.post('/spk', newSpk.value); // Changed 'newPegawai' to 'newSpk'
    getSpk(); // Changed 'getPegawai' to 'getSpk'
    addModal.value.close();
    toast.success("Berhasil menambahkan data SPK."); // Changed "pegawai" to "SPK"
  } catch (error) {
    toast.error("Gagal menambahkan data SPK."); // Changed "pegawai" to "SPK"
  }
};

const formatTanggal = (tanggal) => {
  return tanggal ? dayjs(tanggal).format("DD-MM-YYYY") : "-";
};

const openImageModal = (imageUrl) => {
  modalImageSrc.value = imageUrl;
  imageModal.value.showModal();
};

const closeImageModal = () => {
  modalImageSrc.value = "";
  imageModal.value.close();
};

onMounted(() => {
  getSpk();
});
</script>

<template>
  <section class="container-fluid"> <VCard class="my-4">
     <div class="flex justify-between items-center gap-4 mb-4 mx-4 dark:text-white"> 
      <h2 class="text-2xl font-semibold text-gray-800">Data Satuan Pendidikan</h2>
        <RouterLink to="tambah-spk" class="btn items-center justify-center mt-4 bg-green-600 text-white mb-4 px-4 py-2 rounded-lg"> Tambah
        </RouterLink>
      </div>
      <div class="overflow-x-auto"> <VTable class="w-full"> <thead>
            <tr>
              <th class="text-uppercase">No</th>
              <th class="text-center text-uppercase">Nama</th>
              <th class="text-center text-uppercase">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in spk" :key="item.id">
              <td>{{ index + 1 }}</td>
              <td class="text-center">{{ item.nama }}</td>
              <td class="text-center whitespace-nowrap">
                <div class="flex items-center justify-center gap-3"> <router-link
                    :to="`/spk/edit/${item.id}`"
                    class="text-white hover:text-blue-800 text-center px-2 py-1 rounded-lg bg-yellow-400 focus:outline-none"
                    title="Edit SPK" aria-label="Edit"
                  >
                    <i class="ri-pencil-line text-xl"></i>
                  </router-link>

                  <button
                    @click="openDeleteModal(item.id)"
                    class="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
                    title="Hapus SPK" aria-label="Delete"
                  >
                    <i class="ri-delete-bin-6-line text-lg"></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </VTable>
      </div>
    </VCard>
  </section>

  <dialog ref="deleteModal" class="modal">
    <div class="modal-box">
      <h3 class="font-bold text-lg text-red-600">Konfirmasi Penghapusan</h3>
      <p class="py-4">Apakah Anda yakin ingin menghapus data Satuan Pendidikan ini?</p>
      <div class="modal-action">
        <button @click="closeDeleteModal" class="btn">Batal</button>
        <button @click="confirmDelete" class="btn btn-error text-white">Ya, Hapus</button>
      </div>
    </div>
  </dialog>
  </template>

<style scoped>
/* Anda bisa menambahkan styling dasar untuk modal jika belum ada */
.modal {
  position: fixed;
  z-index: 1000;

  /* Contoh styling dasar */
  display: none; /* Sembunyikan secara default */
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
  border-radius: 6px;
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
