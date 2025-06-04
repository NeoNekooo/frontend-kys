<script setup>
import avatar1 from '@images/avatars/avatar-1.png'
import axios from 'axios'
import { ref, onMounted } from 'vue'
import { useToast } from 'vue-toastification'

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
    const res = await axios.get('http://localhost:5000/api/admin/me', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })

    console.log('Admin profile response:', res.data)
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
      console.log('Admin profile loaded:', adminData.value)
    }
  } catch (err) {
    toast.error('Failed to load admin profile')
    console.error(err)
  }
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
      <VImg :src="`http://localhost:5000${adminData.avatarImg}`" />
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
                    <VImg :src="avatar1" />
                  </VAvatar>
                </VBadge>
              </VListItemAction>
            </template>

            <VListItemTitle class="font-weight-semibold"> John Doe </VListItemTitle>
            <VListItemSubtitle>Admin</VListItemSubtitle>
          </VListItem>
          <VDivider class="my-2" />

          <!-- 👉 Profile -->
          <VListItem link>
            <template #prepend>
              <VIcon
                class="me-2"
                icon="ri-user-line"
                size="22"
              />
            </template>

            <VListItemTitle>
              <router-link to="/account-settings"> Profile </router-link>
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
          <VListItem link>
            <template #prepend>
              <VIcon
                class="me-2"
                icon="ri-money-dollar-circle-line"
                size="22"
              />
            </template>

            <VListItemTitle>Pricing</VListItemTitle>
          </VListItem>

          <!-- 👉 FAQ -->
          <VListItem link>
            <template #prepend>
              <VIcon
                class="me-2"
                icon="ri-question-line"
                size="22"
              />
            </template>

            <VListItemTitle>FAQ</VListItemTitle>
          </VListItem>

          <!-- Divider -->
          <VDivider class="my-2" />

          <!-- 👉 Logout -->
          <VListItem to="/login">
            <template #prepend>
              <VIcon
                class="me-2"
                icon="ri-logout-box-r-line"
                size="22"
              />
            </template>

            <VListItemTitle>Logout</VListItemTitle>
          </VListItem>
        </VList>
      </VMenu>
      <!-- !SECTION -->
    </VAvatar>
  </VBadge>
</template>
