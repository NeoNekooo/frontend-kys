<script setup>
import axios from "axios";
import dayjs from "dayjs";
import { onMounted, ref } from "vue";
import { RouterLink } from "vue-router";
import { useToast } from 'vue-toastification'; // Assuming you have toastification installed

const toast = useToast(); // Initialize toast

const url = "http://localhost:5000/api/spk"; // Changed from /api/pegawai to /api/spk
const spk = ref([]); // Changed 'pegawai' ref to 'spk'
const errorMessage = ref("");
const loading = ref(true);
const editModal = ref(null);
const deleteModal = ref(null);
const imageModal = ref(null);
const addModal = ref(null);

const editSpk = ref({}); // Changed 'editPegawai' to 'editSpk'
const spkToDelete = ref(null); // Changed 'pegawaiToDelete' to 'spkToDelete'
const modalImageSrc = ref("");
const newSpk = ref({ // Changed 'newPegawai' to 'newSpk'
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
    const response = await axios.get(url);
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
    await axios.put(`${url}/${editSpk.value._id}`, editSpk.value); // Changed 'editPegawai' to 'editSpk'
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
    await axios.delete(`${url}/${spkToDelete.value}`); // Changed 'pegawaiToDelete' to 'spkToDelete'
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
    await axios.post(url, newSpk.value); // Changed 'newPegawai' to 'newSpk'
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
  <section class="container-fluid"> <VCard class="my-4"> <div class="flex justify-between items-center gap-4 mb-4 mx-4"> <h2 class="text-2xl font-semibold text-gray-800">Table Data SPK</h2>
        <RouterLink to="tambah-spk" class="btn bg-green-600 text-white px-4 py-2 rounded-lg"> Tambah SPK
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
      <p class="py-4">Apakah Anda yakin ingin menghapus data SPK ini? Tindakan ini **tidak dapat dibatalkan**.</p>
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
  /* Contoh styling dasar */
  display: none; /* Sembunyikan secara default */
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0);
  justify-content: center;
  align-items: center;
  transition: opacity 0.5s ease-in-out, visibility 0.3s ease-in-out; /* Smooth transition */
}

.modal[open] {
  display: flex; /* Tampilkan ketika terbuka */
}

.modal-box {
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  max-width: 500px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.modal-action {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}

.btn {
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
}

.btn-error {
  background-color: #dc2626; /* Warna merah */
  color: white;
  border-color: #dc2626;
}
</style>