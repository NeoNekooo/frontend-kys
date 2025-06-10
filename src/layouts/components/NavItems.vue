<script setup>
import { ref, onMounted } from 'vue';
import VerticalNavSectionTitle from '@/@layouts/components/VerticalNavSectionTitle.vue';
import VerticalNavGroup from '@layouts/components/VerticalNavGroup.vue';
import VerticalNavLink from '@layouts/components/VerticalNavLink.vue';
import { router } from '@/plugins/router';

const logout = () => {
  console.log("Logout function called", localStorage.getItem("token"));
  localStorage.removeItem("token");
  console.log("Is there any token?", localStorage.getItem("token"));
  router.push({ name: 'login' });
};

// Handle modal visibility
const modalRef = ref(null);

const openLogoutModal = () => {
  if (modalRef.value) modalRef.value.showModal();
};
</script>

<template>
  <!-- 👉 Dashboards -->
  <VerticalNavLink
    :item="{ title: 'Dashboard', to: '/dashboard', icon: 'ri-home-smile-line' }"
  />

  <!-- 👉 Front Pages -->
  <VerticalNavGroup :item="{ title: 'Lembaga', icon: 'ri-organization-chart' }">
    <VerticalNavLink :item="{ title: 'Profil Lembaga', href: '/profil-lembaga' }" />
    <VerticalNavLink :item="{ title: 'Satuan Pendidikan', to: '/satuan-pendidikan' }" />
  </VerticalNavGroup>

  <VerticalNavGroup :item="{ title: 'Pegawai', icon: 'ri-team-fill' }">
    <VerticalNavLink :item="{ title: 'Pegawai', href: '/tabel-pegawai' }" />
    <VerticalNavLink
      :item="{ title: 'Pegawai Keluar', href: '/tabel-pegawai-keluar' }"
      :style="{ color: 'red' }"
    />
  </VerticalNavGroup>

  <VerticalNavGroup :item="{ title: 'Penugasan Pegawai', icon: 'ri-briefcase-3-line' }">
    <VerticalNavLink :item="{ title: 'Penugasan ', href: '/tabel-penugasan' }" />
  </VerticalNavGroup>

  <VerticalNavLink
    :item="{ title: 'Tahun Pelajaran', icon: 'ri-calendar-todo-line', href: '/tapel' }"
  />

  <VerticalNavLink
    :item="{ title: 'Nomor Surat', icon: 'ri-file-copy-line', href: '/nomor-surat' }"
  />

  <!-- 👉 Logout Modal Trigger -->
  
<hr> 

<VerticalNavLink
    :style="{ color: 'red' }"
    :item="{ title: 'Logout', icon: 'ri-logout-box-line' }"
    @click="openLogoutModal"
  />

  


  <!-- 👉 Logout Modal -->
  <dialog ref="modalRef" class="modal modal-bottom sm:modal-middle">
    <div class="modal-box bg-slate-100">
      <h3 class="text-lg font-bold">Lanjut logout?</h3>
      <p class="py-4">Klik tombol di bawah untuk logout atau tutup modal ini.</p>
      <div class="modal-action">
        <button class="btn bg-red-600 text-white hover:bg-red-700 mx-4" @click="logout">
          Logout
        </button>
        <button class="btn" @click="modalRef?.close()">Close</button>
      </div>
    </div>
  </dialog>
</template>

<style>
hr {
  height: 1px;
  border-top: 1px solid gray;
  border-left: 0;
  border-right: 0;
  border-bottom: 0;
}

</style>