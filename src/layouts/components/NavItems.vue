<script setup>
import VerticalNavSectionTitle from '@/@layouts/components/VerticalNavSectionTitle.vue'
import VerticalNavGroup from '@layouts/components/VerticalNavGroup.vue'
import VerticalNavLink from '@layouts/components/VerticalNavLink.vue'
import { router } from '@/plugins/router'
const logout = () => {
    localStorage.removeItem("token");
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
       icon: 'ri-file-copy-line',
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




  <!-- 👉 Apps & Pages -->
 

  <VerticalNavLink
    :item="{
      title: 'Login',
      icon: 'ri-login-box-line',
      
    }"
    @click="logout"
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


</template>
