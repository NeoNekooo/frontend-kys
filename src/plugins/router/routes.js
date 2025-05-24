import { createRouter, createWebHistory } from 'vue-router'
import ProfilLembaga from '@/pages/ProfilLembaga.vue'
import TambahPegawai from '@/pages/tambah-pegawai.vue'
import EditPegawai from '@/pages/edit-pegawai.vue'
import tables_pegawai from '@/pages/tabel_pegawai.vue'
import tables_rekap_pegawai from '@/pages/tabel_rekap_pegawai.vue'
import tables_satuan_pendidikan from '@/pages/tabel_satuan_pendidikan.vue'
import tambahSpk from '@/pages/tambah-spk.vue'
import editSpk from '@/pages/edit-spk.vue'
import Dashboard from '@/pages/dashboard.vue'
const routes = [
  { path: '/', redirect: '/dashboard' },
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
      { path: 'tabel-rekap-pegawai', component: tables_rekap_pegawai },
      { path: 'satuan-pendidikan', component: tables_satuan_pendidikan },
      { path: 'tambah-spk', component: tambahSpk },
      { name: 'Editspk', path: '/spk/edit/:id', component: editSpk, props: true },
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

  if (to.meta.requiresAuth && !token) {
    next({ name: 'login' })
  } else {
    next()
  }
})

export default router
export { routes }
