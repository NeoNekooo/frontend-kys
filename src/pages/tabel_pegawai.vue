<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";
import dayjs from "dayjs";
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

  <VCard title="Table Pegawai">
    <div class="flex justify-end mb-4">
      <button @click="openAddModal" class="btn bg-green-600 text-white px-4 py-2 rounded-lg mr-4">
        Tambah Pegawai
      </button>
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
          <td>
            <button @click="openEditModal(p)" class="btn bg-blue-600 rounded-lg text-white px-4 py-1">Edit</button>
            <button @click="openDeleteModal(p._id)" class="btn bg-red-600 rounded-lg text-white px-4 py-1 ml-2">Delete</button>
          </td>
        </tr>
      </tbody>
    </VTable>
  </VCard>
  </section>

  <VCard>
    <dialog ref="addModal" class="modal modal-middle justify-center items-center  sm:modal-middle">
      <div class="modal-box w-11/12 max-w-5xl p-6 bg-white rounded-lg">
        <h3 class="text-xl font-semibold mb-6">Tambah Pegawai</h3>
        <form @submit.prevent="confirmAdd">
          <div class="grid grid-cols-2 gap-6">
            <div>
              <input
                v-model="newPegawai.nama"
                type="text"
                placeholder="Nama"
                class="w-full p-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
            <div>
              <input
                v-model="newPegawai.kewarganegaraan"
                type="text"
                placeholder="Kewarganegaraan"
                class="w-full p-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
            <div>
              <input
                v-model="newPegawai.nik"
                type="text"
                placeholder="NIK"
                class="w-full p-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
            <div>
              <input
                v-model="newPegawai.nuptk"
                type="text"
                placeholder="NUPTK"
                class="w-full p-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <input
                v-model="newPegawai.nip"
                type="text"
                placeholder="NIP"
                class="w-full p-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <input
                v-model="newPegawai.nipy"
                type="text"
                placeholder="NIPY"
                class="w-full p-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <input
                v-model="newPegawai.npwp"
                type="text"
                placeholder="NPWP"
                class="w-full p-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <input
                v-model="newPegawai.tmp_lahir"
                type="text"
                placeholder="Tempat Lahir"
                class="w-full p-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
            <div class="relative">
              <input
                v-model="newPegawai.tgl_lahir"
                type="date"
                placeholder="Tanggal Lahir"
                class="w-full p-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
              <span class="absolute right-3 top-1/2 transform -translate-y-1/2">
                <svg class="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v11a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm9 6H5v9h10V8zm-9 2h2v2H6v-2zm4 0h2v2h-2v-2zm4 0h2v2h-2v-2z" />
                </svg>
              </span>
            </div>
            <div>
              <select
                v-model="newPegawai.jk"
                class="w-full p-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              >
                <option value="" disabled>Jenis Kelamin</option>
                <option value="L">Laki-laki</option>
                <option value="P">Perempuan</option>
              </select>
            </div>
            <div>
              <input
                v-model="newPegawai.agama"
                type="text"
                placeholder="Agama"
                class="w-full p-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
            <div>
              <input
                v-model="newPegawai.nama_ibu"
                type="text"
                placeholder="Nama Ibu Kandung"
                class="w-full p-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
            <div>
              <input
                v-model="newPegawai.status_pernikahan"
                type="text"
                placeholder="Status Perkawinan"
                class="w-full p-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
            <div>
              <input
                v-model="newPegawai.nama_suami_istri"
                type="text"
                placeholder="Nama Suami/Istri"
                class="w-full p-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <input
                v-model.number="newPegawai.jml_anak"
                type="number"
                placeholder="Jumlah Anak"
                class="w-full p-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                min="0"
              />
            </div>
            <div>
              <input
                v-model="newPegawai.alamat"
                type="text"
                placeholder="Alamat"
                class="w-full p-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
            <div>
              <input
                v-model="newPegawai.kecamatan"
                type="text"
                placeholder="Kecamatan"
                class="w-full p-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
            <div>
              <input
                v-model="newPegawai.desa"
                type="text"
                placeholder="Desa/Kelurahan"
                class="w-full p-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
            <div>
              <input
                v-model="newPegawai.kabupaten"
                type="text"
                placeholder="Kabupaten/Kota"
                class="w-full p-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
            <div>
              <input
                v-model="newPegawai.provinsi"
                type="text"
                placeholder="Provinsi"
                class="w-full p-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
            <div>
              <input
                v-model="newPegawai.kode_pos"
                type="text"
                placeholder="Kode Pos"
                class="w-full p-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
            <div>
              <input
                v-model="newPegawai.kontak"
                type="text"
                placeholder="Kontak"
                class="w-full p-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <select
                v-model.number="newPegawai.status"
                class="w-full p-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              >
                <option value="1">Aktif</option>
                <option value="0">Tidak Aktif</option>
              </select>
            </div>
          </div>
          <div class="modal-action mt-6 flex justify-start">
            <button type="submit" class="btn bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700">
              Simpan
            </button>
            <button
              type="button"
              @click="closeAddModal"
              class="btn bg-gray-200 text-gray-700 px-6 py-2 rounded-lg ml-4 hover:bg-gray-300"
            >
              Batal
            </button>
          </div>
        </form>
      </div>
    </dialog>

    <dialog ref="deleteModal" class="modal modal-middle sm:modal-middle">
      <div class="modal-box p-6 bg-white rounded-lg text-center">
        <h3 class="text-xl font-semibold mb-4">Konfirmasi Hapus</h3>
        <p class="mb-6">Anda yakin ingin menghapus data pegawai ini?</p>
        <div class="modal-action flex justify-center space-x-4">
          <button @click="confirmDelete" class="btn bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700">
            Hapus
          </button>
          <button @click="closeDeleteModal" class="btn bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300">
            Batal
          </button>
        </div>
      </div>
    </dialog>

    <dialog ref="editModal" class="modal modal-middle sm:modal-middle">
      <div class="modal-box w-11/12 max-w-5xl p-6 bg-white rounded-lg">
        <h3 class="text-xl font-semibold mb-6">Edit Pegawai</h3>
        <form @submit.prevent="confirmEdit">
          <div class="grid grid-cols-2 gap-6">
            <div>
              <label for="editNama" class="block text-sm font-medium text-gray-700">Nama</label>
              <input
                id="editNama"
                v-model="editPegawai.nama"
                type="text"
                placeholder="Nama"
                class="w-full p-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
            <div>
              <label for="editKewarganegaraan" class="block text-sm font-medium text-gray-700">Kewarganegaraan</label>
              <input
                id="editKewarganegaraan"
                v-model="editPegawai.kewarganegaraan"
                type="text"
                placeholder="Kewarganegaraan"
                class="w-full p-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
            <div>
              <label for="editNik" class="block text-sm font-medium text-gray-700">NIK</label>
              <input
                id="editNik"
                v-model="editPegawai.nik"
                type="text"
                placeholder="NIK"
                class="w-full p-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
            <div>
              <label for="editNuptk" class="block text-sm font-medium text-gray-700">NUPTK</label>
              <input
                id="editNuptk"
                v-model="editPegawai.nuptk"
                type="text"
                placeholder="NUPTK"
                class="w-full p-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label for="editNip" class="block text-sm font-medium text-gray-700">NIP</label>
              <input
                id="editNip"
                v-model="editPegawai.nip"
                type="text"
                placeholder="NIP"
                class="w-full p-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label for="editNipy" class="block text-sm font-medium text-gray-700">NIPY</label>
              <input
                id="editNipy"
                v-model="editPegawai.nipy"
                type="text"
                placeholder="NIPY"
                class="w-full p-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label for="editNpwp" class="block text-sm font-medium text-gray-700">NPWP</label>
              <input
                id="editNpwp"
                v-model="editPegawai.npwp"
                type="text"
                placeholder="NPWP"
                class="w-full p-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label for="editTmpLahir" class="block text-sm font-medium text-gray-700">Tempat Lahir</label>
              <input
                id="editTmpLahir"
                v-model="editPegawai.tmp_lahir"
                type="text"
                placeholder="Tempat Lahir"
                class="w-full p-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
            <div class="relative">
              <label for="editTglLahir" class="block text-sm font-medium text-gray-700">Tanggal Lahir</label>
              <input
                id="editTglLahir"
                v-model="editPegawai.tgl_lahir"
                type="date"
                placeholder="Tanggal Lahir"
                class="w-full p-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
              <span class="absolute right-3 top-1/2 transform -translate-y-1/2 mt-3">
                <svg class="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v11a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm9 6H5v9h10V8zm-9 2h2v2H6v-2zm4 0h2v2h-2v-2zm4 0h2v2h-2v-2z" />
                </svg>
              </span>
            </div>
            <div>
              <label for="editJk" class="block text-sm font-medium text-gray-700">Jenis Kelamin</label>
              <select
                id="editJk"
                v-model="editPegawai.jk"
                class="w-full p-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              >
                <option value="" disabled>Jenis Kelamin</option>
                <option value="L">Laki-laki</option>
                <option value="P">Perempuan</option>
              </select>
            </div>
            <div>
              <label for="editAgama" class="block text-sm font-medium text-gray-700">Agama</label>
              <input
                id="editAgama"
                v-model="editPegawai.agama"
                type="text"
                placeholder="Agama"
                class="w-full p-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
            <div>
              <label for="editNamaIbu" class="block text-sm font-medium text-gray-700">Nama Ibu Kandung</label>
              <input
                id="editNamaIbu"
                v-model="editPegawai.nama_ibu"
                type="text"
                placeholder="Nama Ibu Kandung"
                class="w-full p-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
            <div>
              <label for="editStatusPernikahan" class="block text-sm font-medium text-gray-700">Status Perkawinan</label>
              <input
                id="editStatusPernikahan"
                v-model="editPegawai.status_pernikahan"
                type="text"
                placeholder="Status Perkawinan"
                class="w-full p-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
            <div>
              <label for="editNamaSuamiIstri" class="block text-sm font-medium text-gray-700">Nama Suami/Istri</label>
              <input
                id="editNamaSuamiIstri"
                v-model="editPegawai.nama_suami_istri"
                type="text"
                placeholder="Nama Suami/Istri"
                class="w-full p-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label for="editJmlAnak" class="block text-sm font-medium text-gray-700">Jumlah Anak</label>
              <input
                id="editJmlAnak"
                v-model.number="editPegawai.jml_anak"
                type="number"
                placeholder="Jumlah Anak"
                class="w-full p-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                min="0"
              />
            </div>
            <div>
              <label for="editAlamat" class="block text-sm font-medium text-gray-700">Alamat</label>
              <input
                id="editAlamat"
                v-model="editPegawai.alamat"
                type="text"
                placeholder="Alamat"
                class="w-full p-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
            <div>
              <label for="editKecamatan" class="block text-sm font-medium text-gray-700">Kecamatan</label>
              <input
                id="editKecamatan"
                v-model="editPegawai.kecamatan"
                type="text"
                placeholder="Kecamatan"
                class="w-full p-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
            <div>
              <label for="editDesa" class="block text-sm font-medium text-gray-700">Desa/Kelurahan</label>
              <input
                id="editDesa"
                v-model="editPegawai.desa"
                type="text"
                placeholder="Desa/Kelurahan"
                class="w-full p-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
            <div>
              <label for="editKabupaten" class="block text-sm font-medium text-gray-700">Kabupaten/Kota</label>
              <input
                id="editKabupaten"
                v-model="editPegawai.kabupaten"
                type="text"
                placeholder="Kabupaten/Kota"
                class="w-full p-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
            <div>
              <label for="editProvinsi" class="block text-sm font-medium text-gray-700">Provinsi</label>
              <input
                id="editProvinsi"
                v-model="editPegawai.provinsi"
                type="text"
                placeholder="Provinsi"
                class="w-full p-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
            <div>
              <label for="editKodePos" class="block text-sm font-medium text-gray-700">Kode Pos</label>
              <input
                id="editKodePos"
                v-model="editPegawai.kode_pos"
                type="text"
                placeholder="Kode Pos"
                class="w-full p-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
            <div>
              <label for="editKontak" class="block text-sm font-medium text-gray-700">Kontak</label>
              <input
                id="editKontak"
                v-model="editPegawai.kontak"
                type="text"
                placeholder="Kontak"
                class="w-full p-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label for="editStatus" class="block text-sm font-medium text-gray-700">Status</label>
              <select
                id="editStatus"
                v-model.number="editPegawai.status"
                class="w-full p-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              >
                <option value="1">Aktif</option>
                <option value="0">Tidak Aktif</option>
              </select>
            </div>
          </div>
          <div class="modal-action mt-6 flex justify-start">
            <button type="submit" class="btn bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700">
              Update
            </button>
            <button
              type="button"
              @click="closeEditModal"
              class="btn bg-gray-200 text-gray-700 px-6 py-2 rounded-lg ml-4 hover:bg-gray-300"
            >
              Batal
            </button>
          </div>
        </form>
      </div>
    </dialog>

    <dialog ref="imageModal" class="modal modal-middle sm:modal-middle">
      <div class="modal-box p-6 bg-white rounded-lg text-center">
        <h3 class="text-xl font-semibold mb-4">Photo Pegawai</h3>
        <img :src="modalImageSrc" alt="Pegawai Photo" class="w-full h-auto object-contain mx-auto" />
        <div class="modal-action flex justify-center mt-6">
          <button @click="closeImageModal" class="btn bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300">
            Tutup
          </button>
        </div>
      </div>
    </dialog>
  </VCard>
</template>