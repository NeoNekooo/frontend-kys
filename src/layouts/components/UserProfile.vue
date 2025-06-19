<script setup>
import api from '@/plugins/axios/axios'
import avatar1 from '@images/avatars/avatar-1.png'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

const router = useRouter()

const toast = useToast()
const adminId = ref(null)

const adminData = ref({
  avatarImg: avatar1,
  username: '',
  email: '',
  password: '',
  photoFile: null,
})

const fetchLoggedInAdmin = async () => {
  try {
    const res = await api.get('/admin/me')

    const admin = res.data
    if (admin) {
      adminId.value = admin.id
      adminData.value = {
        username: admin.username,
        email: admin.email || '',
        password: '',
        avatarImg: admin.photo || avatar1,
        photoFile: null,
      }
    }
  } catch (err) {
    toast.error('Failed to load admin profile')
    console.error(err)
  }
}

const redirectToProfile = () => {
  router.push({ path: 'account-settings' })
}

const logout = () => {
  localStorage.removeItem('token')
  router.push({ path: 'login' })
}

onMounted(() => {
  fetchLoggedInAdmin()
})
</script>

<template>
  <VBadge
    dot
    location="bottom right"
    offset-x="3"
    offset-y="3"
    color="success"
    bordered
  >
    <VAvatar
      class="cursor-pointer"
      color="primary"
      variant="tonal"
    >
      <VImg :src="`https://simaya.yayasannurulislam.org${adminData.avatarImg}`" />
      <!-- SECTION Menu -->
      <VMenu
        activator="parent"
        width="230"
        location="bottom end"
        offset="14px"
      >
        <VList>
          <!-- 👉 User Avatar & Name -->
          <VListItem>
            <template #prepend>
              <VListItemAction start>
                <VBadge
                  dot
                  location="bottom right"
                  offset-x="3"
                  offset-y="3"
                  color="success"
                >
                  <VAvatar
                    color="primary"
                    variant="tonal"
                  >
                    <VImg :src="`https://simaya.yayasannurulislam.org${adminData.avatarImg}`" />
                  </VAvatar>
                </VBadge>
              </VListItemAction>
            </template>

            <VListItemTitle class="font-weight-semibold"> {{ adminData.username }} </VListItemTitle>
            <VListItemSubtitle>Admin</VListItemSubtitle>
          </VListItem>
          <VDivider class="my-2" />

          <!-- 👉 Profile -->
          <VListItem>
            <template #prepend>
              <VIcon
                class="me-2"
                icon="ri-user-line"
                size="22"
              />
            </template>

            <VListItemTitle
              to="/account-settings"
              @click="redirectToProfile"
            >
              <RouterLink to="/account-settings"> Profile </RouterLink>
            </VListItemTitle>
          </VListItem>

          <!-- 👉 Settings -->
          <VListItem link>
            <template #prepend>
              <VIcon
                class="me-2"
                icon="ri-settings-4-line"
                size="22"
              />
            </template>

            <VListItemTitle>Settings</VListItemTitle>
          </VListItem>

          <!-- 👉 Pricing -->
          <!-- <VListItem link>
            <template #prepend>
              <VIcon
                class="me-2"
                icon="ri-money-dollar-circle-line"
                size="22"
              />
            </template>

            <VListItemTitle>Pricing</VListItemTitle>
          </VListItem> -->

          <!-- 👉 FAQ -->
          <!-- <VListItem link>
            <template #prepend>
              <VIcon
                class="me-2"
                icon="ri-question-line"
                size="22"
              />
            </template>

            <VListItemTitle>FAQ</VListItemTitle>
          </VListItem> -->

          <!-- Divider -->
          <VDivider class="my-2" />

          <router-link @click.prevent="logout" >

          <!-- 👉 Logout -->
          <VListItem
          >
          <template #prepend>
            <VIcon
            class="me-2"
            icon="ri-logout-box-r-line"
            size="22"
            />
          </template>

            <VListItemTitle @click.prevent="logout" >Logout</VListItemTitle>
          </VListItem>
        </router-link>

        </VList>
      </VMenu>
      <!-- !SECTION -->
    </VAvatar>
  </VBadge>
  <dialog
    id="my_modal_5"
    class="modal modal-bottom sm:modal-middle"
  >
    <div class="modal-box bg-slate-100">
      <h3 class="text-lg font-bold">Lanjut logout?</h3>
      <p class="py-4">Kamu akan keluar website</p>
      <div class="modal-action">
        <form method="dialog p-4 mx-auto">
          <button
            class="btn bg-red-600 text-white hover:bg-red-700 mx-4"
            @click="logout"
          >
            Logout
          </button>
          <button class="btn">Close</button>
        </form>
      </div>
    </div>
  </dialog>
</template>
