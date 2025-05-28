<script setup>
import VerticalNavSectionTitle from '@/@layouts/components/VerticalNavSectionTitle.vue';
import { router } from '@/plugins/router';
import VerticalNavGroup from '@layouts/components/VerticalNavGroup.vue';
import VerticalNavLink from '@layouts/components/VerticalNavLink.vue';

const logout = () => {
  console.log("Logout function called", localStorage.getItem("token"));
  localStorage.removeItem("token");
  console.log("is ther any token", localStorage.getItem("token"));
  router.push({ name: "login" });
  };
</script>

<template>
  <!-- 👉 Dashboards -->
    <VerticalNavLink
      :item="{
        title: 'Dashboard',
        to: '/dashboard',
        icon: 'ri-home-smile-line',
      }"
    />

  <!-- 👉 Front Pages -->
  <VerticalNavGroup
    :item="{
      title: 'Lembaga',
      icon: 'ri-file-copy-line',
    }"
  >
    <VerticalNavLink
      :item="{
        title: 'Profil Lembaga',
        href: '/profil-lembaga',
      }"
    />
    <VerticalNavLink
      :item="{
       title: 'Satuan Pendidikan',
       to: '/satuan-pendidikan',
      }"
    />
  </VerticalNavGroup>
  <VerticalNavGroup
    :item="{
      title: 'Pegawai',
      icon: 'ri-file-copy-line',
    }"
  >
    <VerticalNavLink
      :item="{
        title: 'Pegawai',
        href: '/tabel-pegawai',
      }"
    />
    <VerticalNavLink
  :item="{
    title: 'Pegawai Keluar',
    href: '/tabel-pegawai-keluar',
  }"
  :style="{ color: 'red' }" />
  </VerticalNavGroup>

    <VerticalNavGroup
    :item="{
      title: 'Penugasan Pegawai',
      icon: 'ri-file-copy-line',
    }"
  >
    <VerticalNavLink
      :item="{
        title: 'Penugasan Pegawai',
        href: '/tabel-penugasan',
      }"
    />
    <VerticalNavLink
      :item="{
        title: 'Cetak SK',
        href: '',
      }"
    />
  </VerticalNavGroup>

 <VerticalNavLink
      :item="{
        title: 'Tahun Pelajaran',
        icon: 'ri-file-copy-line',
        href: '/tapel',
      }"
    />


  <!-- 👉 Apps & Pages -->
 

  <VerticalNavLink
    :item="{
      title: 'Login',
      icon: 'ri-login-box-line',
      
    }"
    onclick="my_modal_5.showModal()"
  />

  <!-- 👉 User Interface -->
  <VerticalNavSectionTitle
    :item="{
      heading: 'User Interface',
    }"
  />

  <VerticalNavLink
    :item="{
      title: 'Cards',
      icon: 'ri-bar-chart-box-line',
      to: '/cards',
    }"
  />

  <!-- 👉 Forms & Tables -->
  <VerticalNavSectionTitle
    :item="{
      heading: 'Forms & Tables',
    }"
  />
  <VerticalNavLink
    :item="{
      title: 'Form Layouts',
      icon: 'ri-layout-4-line',
      to: '/form-layouts',
    }"
  />

  <VerticalNavLink
    :item="{
      title: 'Tables',
      icon: 'ri-table-alt-line',
      to: '/tables',
    }"
  />
<dialog id="my_modal_5" class="modal modal-bottom sm:modal-middle ">
  <div class="modal-box bg-slate-100">
    <h3 class="text-lg font-bold">Lanjur logout?</h3>
    <p class="py-4">Press ESC key or click the button below to close</p>
    <div class="modal-action">
      <form method="dialog p-4 mx-auto">
        <button class="btn bg-red-600  text-white hover:bg-red-700 mx-4" @click="logout">Logout</button>
        <button class="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>

</template>
