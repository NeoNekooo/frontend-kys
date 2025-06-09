import cetak_sk from '@/pages/cetak_sk.vue'
import EditNomorSurat from '@/pages/edit-nomor-surat.vue'
import EditPegawai from '@/pages/edit-pegawai.vue'
import editSpk from '@/pages/edit-spk.vue'
import EditTapel from '@/pages/edit-tapel.vue'
import TabelPenugasan from '@/pages/penugasan.vue'
import ProfilLembaga from '@/pages/ProfilLembaga.vue'
import tabelNomorSurat from '@/pages/tabel-nomor-surat.vue'
import tapel from '@/pages/tabel-tapel.vue'
import tables_pegawai from '@/pages/tabel_pegawai.vue'
import tabel_pegawai_keluar from '@/pages/tabel_pegawai_keluar.vue'
import tables_rekap_pegawai from '@/pages/tabel_rekap_pegawai.vue'
import tables_satuan_pendidikan from '@/pages/tabel_satuan_pendidikan.vue'
import tambahNomorSurat from '@/pages/tambah-nomor-surat.vue'
import TambahPegawai from '@/pages/tambah-pegawai.vue'
import tambahSpk from '@/pages/tambah-spk.vue'
import tambahTapel from '@/pages/tambah-tapel.vue'

import { createRouter, createWebHistory } from 'vue-router'
const routes = [
  { path: '/', redirect: '/dashboard' },
  { path: '/cetak_sk/:id', name: 'cetak_sk', component: cetak_sk, meta: { requiresAuth: true } },
  {
    path: '/',
    component: () => import('@/layouts/default.vue'),
    meta: { requiresAuth: true },
    children: [
      { path: 'dashboard', name: 'dashboard', component: () => import('@/pages/dashboard.vue') },
      { path: 'account-settings', component: () => import('@/pages/account-settings.vue') },
      { path: 'typography', component: () => import('@/pages/typography.vue') },
      { path: 'icons', component: () => import('@/pages/icons.vue') },
      { path: 'cards', component: () => import('@/pages/cards.vue') },
      { path: 'tables', component: () => import('@/pages/tables.vue') },
      { path: 'form-layouts', component: () => import('@/pages/form-layouts.vue') },
      { path: 'profil-lembaga', component: ProfilLembaga },
      { name: 'tambah-pegawai', path: 'tambah-pegawai', component: TambahPegawai },
      { name: 'EditPegawai', path: '/pegawai/edit/:id', component: EditPegawai, props: true },
      { name: 'tabel-pegawai', path: 'tabel-pegawai', component: tables_pegawai },
      { name: 'tabel-pegawai_keluar', path: 'tabel-pegawai-keluar', component: tabel_pegawai_keluar },
      { path: 'tabel-rekap-pegawai', component: tables_rekap_pegawai },
      { path: 'satuan-pendidikan', name: 'spk', component: tables_satuan_pendidikan },
      { path: 'tapel', name: 'tabel-tapel', component: tapel },
      { path: 'tapel/edit/:id', name: 'edit-tapel', component: EditTapel, props: true },
      { path: 'tambah-tapel', name: 'tambah-tapel', component: tambahTapel },
      { path: 'tambah-spk', component: tambahSpk },
      { name: 'Editspk', path: '/spk/edit/:id', component: editSpk, props: true },
      { path: 'tabel-penugasan', name: 'tabel-penugasan', component: TabelPenugasan },
      { path: 'nomor-surat', name: 'nomor-surat', component: tabelNomorSurat },
      { path: 'edit-nomor-surat/:id', name: 'edit-nomor-surat', component: EditNomorSurat, props: true },
      { path: 'tambah-nomor-surat', name: 'tambah-nomor-surat', component: tambahNomorSurat },
    ],
  },
  {
    path: '/',
    component: () => import('@/layouts/blank.vue'),
    children: [
      { name: 'login', path: 'login', name: 'login', component: () => import('@/pages/login.vue') },
      { path: 'register', component: () => import('@/pages/register.vue') },
      { path: '/:pathMatch(.*)*', component: () => import('@/pages/[...error].vue') },
    ],
  },
]

// Create router instance
const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  toast.warning('Anda harus login terlebih dahulu')

  if (to.meta.requiresAuth && !token) {
    toast.warning('Anda harus login terlebih dahulu')

    next({ name: 'login' })
  } else {
    next()
  }
})

export default router
export { routes }
