<script setup>
import { ref } from 'vue'

const form = ref({
  nama: '',
  npyn: '',
  thn_berdiri: '',
  city: '',
  country: '',
  company: '',
})

const checkbox = ref(false)

const submitForm = () => {
  console.log('Data dikirim:', {
    ...form.value,
    checkbox: checkbox.value,
  })
}
</script>

<template>
  <h1 class="text-yellow-400">this is tailwind class</h1>
  <form @submit.prevent="submitForm">
    <div>
      <label>Nama:</label>
      <input v-model="form.nama" type="text" placeholder="Nama Lengkap" />
    </div>

    <div>
      <label>NPYN:</label>
      <input v-model="form.npyn" type="text" placeholder="NPYN" />
    </div>

    <div>
      <label>Tahun Berdiri:</label>
      <input v-model="form.thn_berdiri" type="date" />
    </div>

    <div>
      <label>Kota:</label>
      <input v-model="form.city" type="text" placeholder="City" />
    </div>

    <div>
      <label>Negara:</label>
      <input v-model="form.country" type="text" placeholder="Country" />
    </div>

    <div>
      <label>Perusahaan:</label>
      <input v-model="form.company" type="text" placeholder="Company" />
    </div>

    <div>
      <label>
        <input type="checkbox" v-model="checkbox" />
        Remember me
      </label>
    </div>

    <div class="margin-top-start: 1em;">
      <button type="submit">Submit</button>
      <button type="reset" @click.prevent="form = {
        nama: '', npyn: '', thn_berdiri: '', city: '', country: '', company: ''
      }; checkbox = false">Reset</button>
    </div>
  </form>
</template>
