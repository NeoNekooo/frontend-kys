<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";
import dayjs from "dayjs";

const url = "http://localhost:5000/api/spk";
const pegawai = ref([]);
const errorMessage = ref("");
const loading = ref(true);
const editModal = ref(null);
const deleteModal = ref(null);
const imageModal = ref(null);

const editPegawai = ref({});
const pegawaiToDelete = ref(null);
const modalImageSrc = ref(""); // Untuk gambar di modal

const getPegawai = async () => {
  try {
    const response = await axios.get(url);
    // console.log(response.data);
    if (response.data) {
      pegawai.value = response.data;
      console.log(pegawai.value);
    } else {
      errorMessage.value = "Format data tidak sesuai.";
    }
  } catch (error) {
    toast.error("Gagal memuat data pegawai.");
    errorMessage.value = "Gagal memuat data pegawai.";
  } finally {
    loading.value = false;
  }
};

const openEditModal = (pegawai) => {
  editPegawai.value = { ...pegawai };
  editModal.value.showModal();
};

const closeEditModal = () => {
  editPegawai.value = {};
  editModal.value.close();
};

const confirmEdit = async () => {
  try {
    await axios.put(`${url}/${editPegawai.value._id}`, editPegawai.value);
    getPegawai();
    editModal.value.close();
    toast.success("Berhasil mengupdate data satuan pendidikan.");
  } catch (error) {
    toast.error("Gagal mengupdate satuan pendidikan.");
  }
};

const openDeleteModal = (id) => {
  pegawaiToDelete.value = id;
  deleteModal.value.showModal();
};

const closeDeleteModal = () => {
  pegawaiToDelete.value = null;
  deleteModal.value.close();
};

const confirmDelete = async () => {
  try {
    await axios.delete(`${url}/${pegawaiToDelete.value}`);
    getPegawai();
    deleteModal.value.close();
    toast.success("Berhasil menghapus data pegawai.");
  } catch (error) {
    toast.error("Gagal menghapus data pegawai.");
  }
};

const formatTanggal = (tanggal) => {
  return tanggal ? dayjs(tanggal).format("DD-MM-YYYY") : "-";
};

// Fungsi untuk membuka modal gambar besar
const openImageModal = (imageUrl) => {
  modalImageSrc.value = imageUrl;
  imageModal.value.showModal();
};

const closeImageModal = () => {
  modalImageSrc.value = "";
  imageModal.value.close();
};

onMounted(() => {
  getPegawai();
});
</script>

<template>
  <VCard title="satuan pendidikan">
  <VTable>
    <thead>
      <tr>
        <th class="text-uppercase">
          No
        </th>
        <th class="text-center text-uppercase">
          Nama
        </th>
        <th class="text-center text-uppercase">
          Aksi
        </th>
      </tr>
    </thead>
    <tbody>
  <tr v-for="(p, index) in pegawai" :key="p.id">
    <td>{{ index + 1 }}</td>
    <td class="text-center">{{ p.nama }}</td>
    
  </tr>
</tbody>

  </VTable>
  </VCard>
</template>
