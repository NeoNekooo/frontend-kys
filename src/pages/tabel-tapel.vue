<script setup>
import axios from "axios";
import dayjs from "dayjs";
import { onMounted, ref } from "vue";
import { RouterLink } from "vue-router";
import { useToast } from 'vue-toastification';

const toast = useToast();

const url = "http://localhost:5000/api/tapel";
const tapel = ref([]);
const errorMessage = ref("");
const loading = ref(true);

const getTapel = async () => {
  try {
    const response = await axios.get(url);
    if (response.data) {
      tapel.value = response.data;
      console.log(tapel.value);
    } else {
      errorMessage.value = "Format data tidak sesuai.";
    }
  } catch (error) {
    toast.error("Gagal memuat data Tapel.");
    errorMessage.value = "Gagal memuat data Tapel.";
  } finally {
    loading.value = false;
  }
};

const deleteTapel = async (id) => {
  if (confirm("Apakah Anda yakin ingin menghapus data ini?")) {
    try {
      await axios.delete(`${url}/${id}`);
      getTapel();
      toast.success("Berhasil menghapus data Tapel.");
    } catch (error) {
      toast.error("Gagal menghapus data Tapel.");
    }
  }
};

const formatTanggal = (tanggal) => {
  return tanggal ? dayjs(tanggal).format("DD-MM-YYYY") : "-";
};

onMounted(() => {
  getTapel();
});
</script>

<template>
  <section>
    <VCard>
      <div class="flex justify-between items-center gap-4 mb-4 my-4 ml-4">
        <h2 class="text-2xl font-semibold text-gray-800">Table Data Tapel</h2>
        <RouterLink to="tambah-tapel" class="btn bg-green-600 text-white px-4 py-2 rounded-lg mr-4"> Tambah Tapel
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
          <tr v-for="(item, index) in tapel" :key="item.id">
            <td>{{ index + 1 }}</td>
            <td class="text-center">{{ item.tapel }}</td>
            <td class="text-center">{{ item.ket }}</td>
            <td class="text-center">
              <VChip :color="item.status === 1 ? 'success' : 'error'">
                {{ item.status === 1 ? 'Aktif' : 'Tidak Aktif' }}
              </VChip>
            </td>
            <td class="text-center whitespace-nowrap">
              <div class="flex items-center justify-center gap-3">
                <router-link :to="`/tapel/edit/${item._id}`"
                  class="text-white hover:text-blue-800 text-center px-2 py-1 rounded-lg bg-yellow-400 focus:outline-none"
                  title="Edit Tapel" aria-label="Edit">
                  <i class="ri-pencil-line text-xl"></i>
                </router-link>

                <button @click="deleteTapel(item._id)"
                  class="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
                  title="Hapus Tapel" aria-label="Delete">
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