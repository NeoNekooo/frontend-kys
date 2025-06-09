<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const romawi = ref(['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'])

const url = 'http://localhost:5000/api/penugasan'

const penugasan = ref([])
const errorMessage = ref(null)

const getPenugasan = async () => {
  const { id } = route.params
  try {
    const response = await axios.get(`${url}/${id}`)
    if (response.data && response.data.data) {
      penugasan.value = response.data.data
    } else {
      errorMessage.value = 'Format data tidak sesuai.'
    }
    console.log('Data Penugasan:', penugasan.value)
  } catch (error) {
    console.error('Error fetching data:', error)
    errorMessage.value = 'Gagal memuat data Tapel.'
  }
}
const formatDate = (dateStr) => {
  if (!dateStr) return ''
  const options = { day: '2-digit', month: 'long', year: 'numeric' }
  return new Date(dateStr).toLocaleDateString('id-ID', options)
}

onMounted(() => {
  getPenugasan()
})
</script>

<template>
  <div v-if="penugasan" class="font-sans p-8 bg-white text-gray-800 leading-relaxed">
    <div class="max-w-4xl mx-auto">
      <div class="text-center mb-8">
        <h1 class="text-xl font-bold uppercase mb-1">SURAT KEPUTUSAN</h1>
        <h2 class="text-lg font-bold uppercase mb-1">KETUA YAYASAN NURUL ISLAM AFFANDIYAH</h2>
        <p class="text-sm font-bold">Nomor : {{ penugasan.nomor_surat }}</p>
        <div class="my-4">
          <p class="font-bold uppercase text-base">TENTANG :</p>
        </div>
        <p class="font-bold uppercase text-lg">PENGANGKATAN GURU DAN TENAGA KEPENDIDIKAN</p>
        <p class="font-bold uppercase text-lg">
          DI YAYASAN NURUL ISLAM AFFANDIYAH TAHUN PELAJARAN {{ penugasan.tahun_pelajaran }}
        </p>
        <h2 class="text-xl font-bold uppercase mt-6">KETUA YAYASAN NURUL ISLAM AFFANDIYAH</h2>
      </div>

      <VTable class="no-row-borders">
        <tbody>
          <tr class="text-black font-normal">
            <td class="w-2 pr-16 align-top">Menimbang</td>
            <td class="w-3 pr-1 align-top">:</td>
            <td class="align-top pr-1">1.</td>
            <td class="align-top">
              Bahwa untuk kelancaran dan ketertiban kegiatan Belajar Mengajar serta kinerja
              ketatausahaan di Yayasan Nurul Islam dipandang perlu untuk mengangkat Guru dan
              Tenaga Kependidikan;
            </td>
          </tr>
          <tr class="text-black font-normal">
            <td class="w-2 pr-4 align-top"></td>
            <td class="w-3 pr-1 align-top"></td>
            <td class="align-top pr-1">2.</td>
            <td class="align-top">
              Bahwa nama yang tercantum dalam surat keputusan ini dipandang cakap dan memenuhi
              syarat untuk menjadi Guru dan Tenaga Kependidikan di Yayasan Nurul Islam. <br><br>
            </td>
          </tr>
          <tr class="text-black font-normal">
            <td class="w-2 pr-16 align-top">Mengingat</td>
            <td class="w-3 pr-1 align-top">:</td>
            <td class="align-top pr-1">1. <br> <br>
              2. <br>
              3. <br>
              4. <br> <br>
              5. <br> <br> <br>
              6.
            </td>
            <td class="align-top">
              Undang – undang Pendidikan Nomor 20 Tahun 2003 tentang Sistem Pendidikan Nasional; <br>
              Peraturan Pemerintah Nomor 28 tahun 1990 tentang Pendidikan Dasar; <br>
              Peraturan Pemerintah Nomor 29 tahun 1990 tentang pendidikan menengah;<br>
              Keputusan Menteri Negara Pendayagunaan Aparatur Negara Nomor 84 tahun 1983
              tentang Jabatan Fungsional Guru dan Angka Kreditnya. <br>
              Keputusan Bersama Menteri Pendidikan dan Kebudayaan dan Kepala Badan Administrasi
              Kepegawaian Negara Nomor : 0433/P/1993 dan Nomor 25 tahun 1993; <br>
              Program Kerja Yayasan Tahun Pelajaran {{ penugasan.tahun_pelajaran }}
            </td>
          </tr>
          <tr class="text-black font-normal">
            <td class="w-2 pr-16 align-top">Memperhatikan</td>
            <td class="w-3 pr-1 align-top">:</td>
            <td class="align-top pr-1">1. <br>
              2.
            </td>
            <td class="align-top">
              AD & ART Yayasan Nurul Islam Affandiyah <br>
              Saran dan Pendapat unsur pimpinan Yayasan pada tanggal {{ formatDate(penugasan.tgl_sp) }}
            </td>
          </tr>
          <tr class="text-black font-normal">
            <td class="w-2 pr-16 align-top"></td>
            <td class="w-3 pr-1 align-top"></td>
            <td class="align-top pr-1">
            </td>
            <td class="align-top">
              <div class="ml-15 my-8">
                <h3 class="text-xl font-bold uppercase">M E M U T U S K A N</h3>
              </div>
            </td>
          </tr>
        </tbody>
      </VTable>

      <VTable class="no-row-borders">
        <tbody>
          <tr class="text-black font-normal">
            <td class="w-2 pr-16 align-top">Menimbang <br>
              Pertama
            </td>
            <td class=" pr-1 align-top"><br>ㅤ &nbsp;:ㅤ Menunjuk Saudara/i ㅤㅤㅤㅤㅤ : <br>
              ㅤ &nbsp;&nbsp;&nbsp;ㅤNama&nbsp;ㅤㅤㅤㅤㅤㅤㅤㅤㅤ &nbsp; &nbsp; &nbsp; &nbsp; : ㅤ <b>{{ penugasan.nama_pegawai }}</b><br>
              ㅤ &nbsp;&nbsp;&nbsp;ㅤTempat, Tanggal Lahir &nbsp; ㅤㅤㅤㅤ: ㅤ{{ penugasan.tmp_lahir }},{{ formatDate(penugasan.tgl_lahir) }}<br>
              ㅤ &nbsp;&nbsp;&nbsp;ㅤJenjang/Pend. Terakhir &nbsp;ㅤㅤㅤㅤ: ㅤ {{ penugasan.jenjang_pendidikan }}<br>
              ㅤ &nbsp;&nbsp;&nbsp;ㅤJabatan/Unit Kerja&nbsp;ㅤㅤㅤㅤㅤ &nbsp;&nbsp;&nbsp;: ㅤ {{ penugasan.jabatan }}<br>
              ㅤ &nbsp;&nbsp;&nbsp;ㅤㅤㅤㅤㅤㅤㅤㅤㅤ&nbsp;ㅤㅤㅤㅤㅤ &nbsp;&nbsp;&nbsp;&nbsp; ㅤ Di SMK Nurul Islam Tahun Pelajaran
              {{ penugasan.tahun_pelajaran }}
            </td>
          </tr>
          <tr class="text-black font-normal">
            <td class="w-2 pr-16 align-top">Kedua
            </td>
            <td class=" pr-1 align-top">
              ㅤ &nbsp;:ㅤ Kepada nama yang tercantum di atas diberikan honorarium sesuai dengan peraturan dan
              ㅤㅤㅤketentuan yang berlaku di Yayasan Nurul Islam ㅤㅤㅤㅤㅤ
            </td>
          </tr>
          <tr class="text-black font-normal">
            <td class="w-2 pr-16 align-top">Ketiga
            </td>
            <td class=" pr-1 align-top">
              ㅤ &nbsp;:ㅤ Keputusan mulai berlaku sejak tanggal ditetapkan sampai dengan adanya perubahan
              ㅤㅤㅤㅤㅤyang dianggap perlu.
            </td>
          </tr>
        </tbody>
      </VTable>

      <div class="font-sans p-8">
        <div class="flex justify-end mb-12">
          <div class="text-left">
            <div class="grid grid-cols-2 gap-x-4">
              <span>Ditetapkan di</span>
              <span>: Cianjur</span>

              <span>Pada Tanggalㅤㅤ</span>
              <span>: {{ formatDate(penugasan.tmt) }}</span>
            </div>
            <p class=" mb-20">Ketua Yayasan,</p>
            <p class="font-bold underline">{{ penugasan.nama_pimpinan }}</p>
            <p>NIPY. -</p>
          </div>
        </div>

        <div>
          <p class="mb-2">Tembusan disampaikan Kepada:</p>
          <ol class="list-decimal list-inside pl-4 ">
            <li>Yth. Kepala Dinas Pendidikan Propinsi Jawa Barat</li>
            <li>Yth. Pembina Yayasan Nurul Islam Affandiyah</li>
            <li>Yth. Guru dan Tenaga Pendidikan yang bersangkutan;</li>
            <li>Pertinggal.</li>
          </ol>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
/* Base styles */
.no-row-borders table tr {
  border: none !important;
}

.no-row-borders table td,
.no-row-borders table th {
  border: none !important;
}

</style>