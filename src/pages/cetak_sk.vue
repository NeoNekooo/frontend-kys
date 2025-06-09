<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const penugasan = ref({ tahun_pelajaran: '2024/2025' })

onMounted(() => {
  // Simulated data fetch
})
</script>

<template>
  <div
    class="font-sans text-sm text-gray-800 leading-tight p-4 print:p-0"
    style="font-family: Arial, sans-serif"
  >
    <div class="max-w-4xl mx-auto border border-gray-300 shadow-lg print:shadow-none">
      <!-- Header -->
      <div class="text-center mb-4">
        <h1 class="text-xl font-bold uppercase mb-0">SURAT KEPUTUSAN</h1>
        <h2 class="text-lg font-bold uppercase mb-0">KETUA YAYASAN NURUL ISLAM AFFANDIYAH</h2>
        <p class="text-sm font-bold">Nomor : 001/01/NURIS/IX/2024</p>
        <div class="my-2">
          <p class="font-bold uppercase text-base">TENTANG :</p>
        </div>
        <p class="font-bold uppercase text-lg">PENGANGKATAN GURU DAN TENAGA KEPENDIDIKAN</p>
        <p class="font-bold uppercase text-lg">
          DI YAYASAN NURUL ISLAM AFFANDIYAH TAHUN PELAJARAN {{ penugasan.tahun_pelajaran }}
        </p>
        <h2 class="text-xl font-bold uppercase mt-4">KETUA YAYASAN NURUL ISLAM AFFANDIYAH</h2>
      </div>

      <!-- Content -->
      <table class="w-full border-collapse text-black font-normal">
        <tbody>
          <tr>
            <td class="w-1/6 pr-4 align-top">Menimbang</td>
            <td class="w-1/60 align-top">:</td>
            <td class="align-top">
              <ol class="list-decimal pl-4">
                <li>
                  Bahwa untuk kelancaran dan ketertiban kegiatan Belajar Mengajar serta kinerja ketatausahaan di Yayasan
                  Nurul Islam dipandang perlu untuk mengangkat Guru dan Tenaga Kependidikan;
                </li>
                <li>
                  Bahwa nama yang tercantum dalam surat keputusan ini dipandang cakap dan memenuhi syarat untuk menjadi
                  Guru dan Tenaga Kependidikan di Yayasan Nurul Islam.
                </li>
              </ol>
            </td>
          </tr>
          <tr>
            <td class="pr-4 align-top">Mengingat</td>
            <td class="align-top">:</td>
            <td class="align-top">
              <ol class="list-decimal pl-4">
                <li>Undang – undang Pendidikan Nomor 20 Tahun 2003 tentang Sistem Pendidikan Nasional;</li>
                <li>Peraturan Pemerintah Nomor 28 tahun 1990 tentang Pendidikan Dasar;</li>
                <li>Peraturan Pemerintah Nomor 29 tahun 1990 tentang pendidikan menengah;</li>
                <li>
                  Keputusan Menteri Negara Pendayagunaan Aparatur Negara Nomor 84 tahun 1983 tentang Jabatan Fungsional
                  Guru dan Angka Kreditnya;
                </li>
                <li>
                  Keputusan Bersama Menteri Pendidikan dan Kebudayaan dan Kepala Badan Administrasi Kepegawaian Negara
                  Nomor : 0433/P/1993 dan Nomor 25 tahun 1993;
                </li>
                <li>Program Kerja Yayasan Tahun Pelajaran 2024/2025.</li>
              </ol>
            </td>
          </tr>
          <tr>
            <td class="pr-4 align-top">Memperhatikan</td>
            <td class="align-top">:</td>
            <td class="align-top">
              <ol class="list-decimal pl-4">
                <li>AD & ART Yayasan Nurul Islam Affandiyah;</li>
                <li>Saran dan Pendapat unsur pimpinan Yayasan pada tanggal 20 Juli 2024.</li>
              </ol>
            </td>
          </tr>
          <tr>
            <td class="pr-4 align-top">&nbsp;</td>
            <td class="align-top">&nbsp;</td>
            <td class="align-top">
              <div class="mt-4">
                <h3 class="text-xl font-bold uppercase">M E M U T U S K A N</h3>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Decisions -->
      <table class="w-full border-collapse text-black font-normal mt-2">
        <tbody>
          <tr>
            <td class="w-1/6 pr-4 align-top">Menetapkan</td>
            <td class="w-1/60 align-top">&nbsp;</td>
            <td class="align-top">
              <p>Pertama : Menunjuk Saudara/i</p>
              <table class="ml-8 mt-1">
                <tr>
                  <td class="pr-2">Nama</td>
                  <td>:</td>
                  <td><b>TISYA TERESYA RIYANDI, S.E.</b></td>
                </tr>
                <tr>
                  <td class="pr-2">Tempat, Tanggal Lahir</td>
                  <td>:</td>
                  <td>Cianjur, 4 September 1996</td>
                </tr>
                <tr>
                  <td class="pr-2">Jenjang/Pend. Terakhir</td>
                  <td>:</td>
                  <td>S1/Manajemen</td>
                </tr>
                <tr>
                  <td class="pr-2">Jabatan/Unit Kerja</td>
                  <td>:</td>
                  <td>GTY/PTY</td>
                </tr>
                <tr>
                  <td class="pr-2">&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>Di SMK Nurul Islam Tahun Pelajaran 2024/2025</td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td class="pr-4 align-top">Kedua</td>
            <td class="align-top">&nbsp;</td>
            <td class="align-top">
              Kepada nama yang tercantum di atas diberikan honorarium sesuai dengan peraturan dan ketentuan yang berlaku
              di Yayasan Nurul Islam.
            </td>
          </tr>
          <tr>
            <td class="pr-4 align-top">Ketiga</td>
            <td class="align-top">&nbsp;</td>
            <td class="align-top">
              Keputusan mulai berlaku sejak tanggal ditetapkan sampai dengan adanya perubahan yang dianggap perlu.
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Footer and Signature -->
      <div class="flex justify-end mt-8 print:mt-12">
        <div class="text-left">
          <div class="grid grid-cols-2 gap-x-4">
            <span>Ditetapkan di</span><span>: Cianjur</span> <span>Pada Tanggal</span><span>: 22 Juli 2024</span>
          </div>
          <p class="mt-4">Ketua Yayasan,</p>
          <p class="font-bold underline mt-8">ESTERNIA KARIM, S.Psi</p>
          <p>NIPY. -</p>
        </div>
      </div>

      <!-- Cc Section -->
      <div class="mt-4">
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
/* Remove borders and spacing for print */
@media print {
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

.ml-8 {
  margin-inline-start: 2rem;
}

.underline {
  text-decoration: underline;
}
</style>
