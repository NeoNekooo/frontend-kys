<script setup>
import axios from "axios";
import dayjs from "dayjs";
import { onMounted, ref } from "vue";
import { RouterLink } from "vue-router";
import { useToast } from 'vue-toastification'; // Assuming you have toastification installed

const toast = useToast(); // Initialize toast

const url = "http://localhost:5000/api/pegawai";
const pegawai = ref([]);
const errorMessage = ref("");
const loading = ref(true);
const editModal = ref(null);
const deleteModal = ref(null);
const imageModal = ref(null);
const addModal = ref(null);

const editPegawai = ref({});
const pegawaiToDelete = ref(null);
const modalImageSrc = ref("");
const newPegawai = ref({
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

const getPegawai = async () => {
  try {
    const response = await axios.get(url);
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

const openAddModal = () => {
  newPegawai.value = {
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
  newPegawai.value = {};
  addModal.value.close();
};

const confirmAdd = async () => {
  try {
    await axios.post(url, newPegawai.value);
    getPegawai();
    addModal.value.close();
    toast.success("Berhasil menambahkan data pegawai.");
  } catch (error) {
    toast.error("Gagal menambahkan data pegawai.");
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
  getPegawai();
});
</script>

<template>
  <section>

  <VCard>
    <div class="flex justify-between items-center gap-4 mb-4">
  <h2 class="text-2xl font-semibold text-gray-800">Tambah Data Pegawai</h2>
      <RouterLink to="tambah-pegawai" class="btn bg-green-600 text-white px-4 py-2 rounded-lg mr-4">
        Tambah Pegawai
      </RouterLink>
    </div>
    <VTable>
      <thead>
        <tr>
          <th class="text-uppercase">No</th>
          <th class="text-center text-uppercase">Nama</th>
          <th class="text-center text-uppercase">Kewarganegaraan</th>
          <th class="text-center text-uppercase">NIK</th>
          <th class="text-center text-uppercase">NUPTK</th>
          <th class="text-center text-uppercase">NIP</th>
          <th class="text-center text-uppercase">NIPY</th>
          <th class="text-center text-uppercase">NPWP</th>
          <th class="text-center text-uppercase">Tempat Lahir</th>
          <th class="text-center text-uppercase">Tanggal Lahir</th>
          <th class="text-center text-uppercase">Jenis Kelamin</th>
          <th class="text-center text-uppercase">Agama</th>
          <th class="text-center text-uppercase">Nama Ibu Kandung</th>
          <th class="text-center text-uppercase">Status Perkawinan</th>
          <th class="text-center text-uppercase">Nama Suami/Istri</th>
          <th class="text-center text-uppercase">Jumlah Anak</th>
          <th class="text-center text-uppercase">Alamat</th>
          <th class="text-center text-uppercase">Kecamatan</th>
          <th class="text-center text-uppercase">Desa/Kelurahan</th>
          <th class="text-center text-uppercase">Kabupaten/Kota</th>
          <th class="text-center text-uppercase">Provinsi</th>
          <th class="text-center text-uppercase">Kode Pos</th>
          <th class="text-center text-uppercase">Kontak</th>
          <th class="text-center text-uppercase">Photo</th>
          <th class="text-center text-uppercase">Status</th>
          <th class="text-center text-uppercase">Aksi</th>
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
          <td class="text-center">{{ p.kontak || '-' }}</td>
          <td class="text-center">
            <img
              v-if="p.photo"
              :src="`http://localhost:8000/images/${p.photo}`"
              alt="Photo"
              class="w-12 h-12 object-cover rounded-md cursor-pointer mx-auto"
              @click="openImageModal(`http://localhost:8000/images/${p.photo}`)"
            />
            <span v-else>-</span>
          </td>
          <td class="text-center">
            <span :class="p.status === 1 ? 'text-green-600' : 'text-red-600'">
              {{ p.status === 1 ? 'Aktif' : 'Tidak Aktif' }}
            </span>
          </td>
          <td class="whitespace-nowrap">
  <div class="flex items-center gap-3">
    <!-- Tombol Edit -->
    <router-link
      :to="`/pegawai/edit/${p.id}`"
      class="text-white hover:text-blue-800 text-center px-2 py-1 rounded-lg bg-yellow-400 focus:outline-none"
      title="Edit Pegawai"
      aria-label="Edit"
    >
      <i class="ri-pencil-line text-xl"></i>
    </router-link>

    <!-- Tombol Hapus -->
    <button
      @click="openDeleteModal(p._id)"
      class="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
      title="Hapus Pegawai"
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
  </section>
</template>
