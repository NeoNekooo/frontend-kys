<script setup>
import api from '@/plugins/axios/axios'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router' // Import useRouter

const route = useRoute()
const router = useRouter() // Initialize useRouter
const romawi = ref(['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'])

const url = 'http://localhost:5000/api/penugasan'

const penugasan = ref({})
const errorMessage = ref('')

const getPenugasan = async () => {
  const { id } = route.params
  try {
    const response = await api.get(`/penugasan/${id}`)
    if (response.data && response.data.data) {
      penugasan.value = response.data.data
    } else {
      errorMessage.value = 'Format data tidak sesuai.'
    }
  } catch (error) {
    errorMessage.value = 'Gagal memuat data Tapel.'
    console.error('Error fetching penugasan:', error)
  }
}

const formatDate = dateStr => {
  if (!dateStr) return ''
  const options = { day: '2-digit', month: 'long', year: 'numeric' }
  return new Date(dateStr).toLocaleDateString('id-ID', options)
}

onMounted(async () => {
  await getPenugasan()

  window.onafterprint = () => {
    router.back()
    window.onafterprint = null
  }

  window.print()
})
</script>

<template>
  <div
    class="font-sans text-sm text-gray-800 leading-tight p-4 print:p-0"
    style="font-family: Arial, sans-serif"
  >
    <div class="max-w-4xl mx-auto print:shadow-none lable">
      <div class="text-center">
        <h1 class="text-xl font-bold uppercase">SURAT KEPUTUSAN</h1>
        <h2 class="text-header font-bold uppercase">KETUA YAYASAN NURUL ISLAM AFFANDIYAH</h2>
        <p class="text-sm font-bold">Nomor : {{ penugasan.nomor_surat }}</p>
        <div class="">
          <p class="font-bold uppercase text-sm ">TENTANG </p>
        </div>
        <p class="font-bold uppercase text-header">PENGANGKATAN GURU DAN TENAGA KEPENDIDIKAN</p>
        <p class="font-bold uppercase text-header">
          DI YAYASAN NURUL ISLAM AFFANDIYAH TAHUN PELAJARAN {{ penugasan.tahun_pelajaran }}
        </p>
        <h2 class="text-header font-bold uppercase mt-2 mb-2">KETUA YAYASAN NURUL ISLAM AFFANDIYAH</h2>
      </div>

      <table class="w-full border-collapse text-black font-normal table-1">
        <tbody>
          <tr>
            <td class="w-1/6 pr-4 align-top">Menimbang</td>
            <td class="w-1/60 align-top">:</td>
            <td class="align-top">
              <ol class="list-decimal pl-4">
                <li>
                  ㅤBahwa untuk kelancaran dan ketertiban kegiatan Belajar Mengajar serta kinerja ketatausahaan di
                  ㅤㅤㅤYayasan Nurul Islam dipandang perlu untuk mengangkat Guru dan Tenaga Kependidikan;
                </li>
                <li>
                  ㅤBahwa nama yang tercantum dalam surat keputusan ini dipandang cakap dan memenuhi syarat untuk
                  ㅤmenjadi Guru dan Tenaga Kependidikan di Yayasan Nurul Islam.
                </li>
              </ol>
            </td>
          </tr>
          <tr>
            <td class="pr-4 align-top">Mengingat</td>
            <td class="align-top">:</td>
            <td class="align-top">
              <ol class="list-decimal pl-4">
                <li>ㅤUndang – undang Pendidikan Nomor 20 Tahun 2003 tentang Sistem Pendidikan Nasional;</li>
                <li>ㅤPeraturan Pemerintah Nomor 28 tahun 1990 tentang Pendidikan Dasar;</li>
                <li>ㅤPeraturan Pemerintah Nomor 29 tahun 1990 tentang pendidikan menengah;</li>
                <li>
                  ㅤKeputusan Menteri Negara Pendayagunaan Aparatur Negara Nomor 84 tahun 1983 tentang Jabatan
                  ㅤFungsional Guru dan Angka Kreditnya;
                </li>
                <li>
                  ㅤKeputusan Bersama Menteri Pendidikan dan Kebudayaan dan Kepala Badan Administrasi <br />
                  ㅤKepegawaian Negara Nomor : 0433/P/1993 dan Nomor 25 tahun 1993;
                </li>
                <li>ㅤProgram Kerja Yayasan Tahun Pelajaran {{ penugasan.tahun_pelajaran }}.</li>
              </ol>
            </td>
          </tr>
          <tr>
            <td class="pr-4 align-top">Memperhatikan</td>
            <td class="align-top">:</td>
            <td class="align-top">
              <ol class="list-decimal pl-4">
                <li>ㅤAD & ART Yayasan Nurul Islam Affandiyah;</li>
                <li>ㅤSaran dan Pendapat unsur pimpinan Yayasan pada tanggal {{ formatDate(penugasan.tgl_sp) }}.</li>
              </ol>
            </td>
          </tr>
          <tr>
            <td class="pr-4 align-top">&nbsp;</td>
            <td class="align-top">&nbsp;</td>
            <td class="align-top"></td>
          </tr>
        </tbody>
      </table>
      <div class="mt-2 mb-2 text-center">
        <h3 class="text-header font-bold uppercase">M E M U T U S K A N</h3>
      </div>

      <table class="w-full border-collapse text-black font-normal table-2 text-xs">
        <tbody>
          <tr>
            <td class="w-1/6 pr-4 align-top">
              Menetapkan <br />
              Pertama
            </td>
            <td class="w-1/60 align-top">:</td>
            <td class="align-top">
              <ol class="list-decimal pl-4">
                <li>Menunjuk Saudara/i ㅤㅤㅤㅤㅤㅤㅤ:</li>
                <li>
                  Namaㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ&nbsp; :ㅤ<b>{{ penugasan.nama_pegawai }}</b>
                </li>
                <li>
                  Tempat, Tanggal Lahirㅤㅤㅤㅤㅤ&nbsp; &nbsp; &nbsp;:ㅤ{{ penugasan.tmp_lahir }},{{
                    formatDate(penugasan.tgl_lahir)
                  }}
                </li>
                <li>Jenjang/Pend. Terakhirㅤㅤㅤㅤㅤㅤ:ㅤ{{ penugasan.jenjang_pendidikan }}</li>
                <li>Jabatan/Unit Kerjaㅤㅤㅤㅤㅤㅤㅤㅤ:ㅤ{{ penugasan.jabatan }}</li>
                <li>
                  ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ&nbsp; Di {{ penugasan.nama_satuan_pendidikan }} Nurul Islam Tahun
                  Pelajaran 2024/2025
                </li>
              </ol>
            </td>
          </tr>
          <tr>
            <td class="pr-4 align-top">Kedua</td>
            <td class="align-top">:</td>
            <td class="align-top">
              <ol class="list-decimal pl-4">
                <li>
                  Kepada nama yang tercantum di atas diberikan honorarium sesuai dengan peraturan dan ketentuan yang
                  berlaku di Yayasan Nurul Islam
                </li>
              </ol>
            </td>
          </tr>
          <tr>
            <td class="pr-4 align-top">Ketiga</td>
            <td class="align-top">:</td>
            <td class="align-top">
              <ol class="list-decimal pl-4">
                <li>
                  Keputusan mulai berlaku sejak tanggal ditetapkan sampai dengan adanya perubahan yang dianggap perlu.
                </li>
              </ol>
            </td>
          </tr>
          <tr>
            <td class="pr-4 align-top">&nbsp;</td>
            <td class="align-top">&nbsp;</td>
            <td class="align-top"></td>
          </tr>
        </tbody>
      </table>

      <div class="flex justify-end mr-24 mt-2">
        <div class="text-left">
          <div>
            <ul>
              <li>Ditetapkan diㅤ&nbsp; : Cianjur</li>
              <li class="underline">Pada Tanggalㅤ&nbsp;: {{ formatDate(penugasan.tmt) }}</li>
            </ul>
          </div>
          <p class="">Ketua Yayasan,</p>
          <p class="font-bold mt-16"><u>{{ penugasan.nama_pimpinan }}</u> <br>
          NIPY:-
          </p>

          
        </div>
      </div>

      <div class="mt-3">
        <p class="mb-2">Tembusan disampaikan Kepada:</p>
        <ol class="list-decimal pl-4">
          <li>Yth. Kepala Dinas Pendidikan Propinsi Jawa Barat</li>
          <li>Yth. Pembina Yayasan Nurul Islam Affandiyah</li>
          <li>Yth. Guru dan Tenaga Pendidikan yang bersangkutan;</li>
          <li>Pertinggal.</li>
        </ol>
      </div>
    </div>
  </div>
</template>

<style scoped>
.table-1 li {
  margin-inline-start: 20px;
}

.table-2 ol {
  list-style: none;
}

.text-header {
  font-size: 16px;
}

.lable{
  margin-top: 145px;
}

/* Hide elements when printing */
@media print {
  .no-print {
    display: none !important;
  }

  body {
    padding: 0;
    margin: 0;
  }

  .print-shadow-none {
    box-shadow: none !important;
  }

  .print-p-0 {
    padding: 0 !important;
  }
}

/* General styling */
.font-sans {
  font-family: Arial, sans-serif;
}

.text-sm {
  font-size: 12px;
}

.leading-tight {
  line-height: 1.2;
}

.uppercase {
  text-transform: uppercase;
}

.border-collapse {
  border-collapse: collapse;
}

.align-top {
  vertical-align: top;
}

.mt-4 {
  margin-block-start: 1rem;
}

.mb-2 {
  margin-block-end: 0.5rem;
}

.mt-2 {
  margin-block-end: 0.5rem;
}

.ml-8 {
  margin-inline-start: 2rem;
}

.underline {
  text-decoration: underline;
}
</style>
