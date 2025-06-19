<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";
import dayjs from "dayjs";

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
    const response = await api.get(url);
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
  <VCard title="Rekap Pegawai">
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
  <tr v-for="(p, index) in pegawai" :key="p.id">
    <td>{{ index + 1 }}</td>
    <td class="text-center">{{ p.nama }}</td>
    <td class="text-center">{{ p.kewarganegaraan }}</td>
    <td class="text-center">{{ p.nik }}</td>
    <td class="text-center">{{ p.nuptk }}</td>
    <td class="text-center">{{ p.nip }}</td>
    <td class="text-center">{{ p.nipy }}</td>
    <td class="text-center">{{ p.npwp }}</td>
    <td class="text-center">{{ p.tmp_lahir }}</td>
    <td class="text-center">{{ formatTanggal(p.tgl_lahir) }}</td>
    <td class="text-center">{{ p.jk === 'L' ? 'Laki-laki' : 'Perempuan' }}</td>
    <td class="text-center">{{ p.agama }}</td>
    <td class="text-center">{{ p.nama_ibu }}</td>
    <td class="text-center">{{ p.status_pernikahan }}</td>
    <td class="text-center">{{ p.nama_suami_istri }}</td>
    <td class="text-center">{{ p.jml_anak }}</td>
    <td class="text-center">{{ p.alamat }}</td>
    <td class="text-center">{{ p.kecamatan }}</td>
    <td class="text-center">{{ p.desa }}</td>
    <td class="text-center">{{ p.kabupaten }}</td>
    <td class="text-center">{{ p.provinsi }}</td>
    <td class="text-center">{{ p.kode_pos }}</td>
    <td class="text-center">{{ p.kontak || '-' }}</td> <!-- kontak tidak ada di data contoh, jadi fallback -->
    <td class="text-center">
      <img
        v-if="p.photo"
        :src="`https://simaya.yayasannurulislam.org/images/${p.photo}`"
        alt="Photo"
        class="w-12 h-12 object-cover rounded-md cursor-pointer mx-auto"
        @click="openImageModal(`https://simaya.yayasannurulislam.org/images/${p.photo}`)"
      />
      <span v-else>-</span>
    </td>
    <td class="text-center">
      <span :class="p.status === 1 ? 'text-green-600' : 'text-red-600'">
        {{ p.status === 1 ? 'Aktif' : 'Tidak Aktif' }}
      </span>
    </td>
  </tr>
</tbody>

  </VTable>
  </VCard>
</template>
