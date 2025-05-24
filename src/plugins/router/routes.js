import tables_pegawai from '@/pages/tabel_pegawai.vue'
import ProfilLembaga from '@/pages/ProfilLembaga.vue'
import tables_rekap_pegawai from '@/pages/tabel_rekap_pegawai.vue'
import tables_satuan_pendidikan from '@/pages/tabel_satuan_pendidikan.vue'
export const routes = [
  { path: '/', redirect: '/dashboard' },
  {
    path: '/',
    component: () => import('@/layouts/default.vue'),
    children: [
      {
        path: 'dashboard',
        component: () => import('@/pages/dashboard.vue'),
      },
      {
        path: 'account-settings',
        component: () => import('@/pages/account-settings.vue'),
      },
      {
        path: 'typography',
        component: () => import('@/pages/typography.vue'),
      },
      {
        path: 'icons',
        component: () => import('@/pages/icons.vue'),
      },
      {
        path: 'cards',
        component: () => import('@/pages/cards.vue'),
      },
      {
        path: 'tables',
        component: () => import('@/pages/tables.vue'),
      },
      {
        path: 'form-layouts',
        component: () => import('@/pages/form-layouts.vue'),
      },
      {
        path: 'profil-lembaga',
        component: ProfilLembaga,
      },
      {
        path: 'tabel-pegawai',
        component: tables_pegawai,
      },
      {
        path: 'tabel-rekap-pegawai',
        component: tables_rekap_pegawai,
      },
      {
        path: 'satuan-pendidikan',
        component: tables_satuan_pendidikan,
      },
    ],
  },
  {
    path: '/',
    component: () => import('@/layouts/blank.vue'),
    children: [
      {
        path: 'login',
        component: () => import('@/pages/login.vue'),
      },
      {
        path: 'register',
        component: () => import('@/pages/register.vue'),
      },
      {
        path: '/:pathMatch(.*)*',
        component: () => import('@/pages/[...error].vue'),
      },
    ],
  },
]
