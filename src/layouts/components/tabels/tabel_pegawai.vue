<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";

const url = "http://localhost:5000/api/pegawai";
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
    if (response.data && response.data.pegawai) {
      pegawai.value = response.data.pegawai;
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
    toast.success("Berhasil mengupdate data pegawai.");
  } catch (error) {
    toast.error("Gagal mengupdate data pegawai.");
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
  <VCard title="Basic">
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
          Kewarganegaraan
        </th>
        <th class="text-center text-uppercase">
          NIK
        </th>
        <th class="text-center text-uppercase">
          NUPTK
        </th>
        <th class="text-center text-uppercase">
          NIP
        </th>
        <th class="text-center text-uppercase">
          NIPY
        </th>
        <th class="text-center text-uppercase">
          NPWP
        </th>
        <th class="text-center text-uppercase">
          Tempat Lahir
        </th>
        <th class="text-center text-uppercase">
          Tanggal Lahir
        </th>
        <th class="text-center text-uppercase">
          Jenis Kelamin
        </th>
        <th class="text-center text-uppercase">
          Agama
        </th>
        <th class="text-center text-uppercase">
          Nama Ibu Kandung
        </th>
        <th class="text-center text-uppercase">
          Status Perkawinan
        </th>
        <th class="text-center text-uppercase">
          Nama Suami/Istri
        </th>
        <th class="text-center text-uppercase">
          Jumlah Anak
        </th>
        <th class="text-center text-uppercase">
          Alamat
        </th>
        <th class="text-center text-uppercase">
          Kecamatan
        </th>
        <th class="text-center text-uppercase">
          Desa/Kelurahan
        </th>
        <th class="text-center text-uppercase">
          Kabupaten/Kota
        </th>
        <th class="text-center text-uppercase">
          Provinsi
        </th>
        <th class="text-center text-uppercase">
          Kode Pos
        </th>
        <th class="text-center text-uppercase">
          Kontak
        </th>
        <th class="text-center text-uppercase">
          Photo
        </th>
        <th class="text-center text-uppercase">
          Status
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1</td>
        <td class="text-center">
          iwak
        </td>
        <td class="text-center">
          lorem
        </td>
        <td class="text-center">
          lorem
        </td>
        <td class="text-center">
          lorem
        </td>
        <td class="text-center">
          lorem
        </td>
        <td class="text-center">
          lorem
        </td>
        <td class="text-center">
          lorem
        </td>
        <td class="text-center">
          lorem
        </td>
        <td class="text-center">
          lorem
        </td>
        <td class="text-center">
          lorem
        </td>
        <td class="text-center">
          lorem
        </td>
        <td class="text-center">
          lorem
        </td>
        <td class="text-center">
          lorem
        </td>
        <td class="text-center">
          lorem
        </td>
        <td class="text-center">
          lorem
        </td>
        <td class="text-center">
          lorem
        </td>
        <td class="text-center">
          lorem
        </td>
        <td class="text-center">
          lorem
        </td>
        <td class="text-center">
          lorem
        </td>
        <td class="text-center">
          lorem
        </td>
        <td class="text-center">
          lorem
        </td>
        <td class="text-center">
          lorem
        </td>
        <!-- <td v-if="pendaki.ktpKartuPelajar"
                  :src="http://localhost:5000${pendaki.ktpKartuPelajar}"
                  class="w-12 h-12 object-cover rounded-md cursor-pointer text-center"
                  @click="openImageModal(http://localhost:5000${pendaki.ktpKartuPelajar})"
                  alt="Jaminan">
          // <span v-else>-</span>
        </td> -->
      </tr>
    </tbody>
  </VTable>
  </VCard>
</template>
