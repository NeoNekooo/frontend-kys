<script setup>
import api from '@/plugins/axios/axios'
import avatar1 from '@images/avatars/avatar-1.png'
import { onMounted, ref } from 'vue'
import { useToast } from 'vue-toastification'

const toast = useToast()
const refInputEl = ref()
const adminId = ref(null)
const isUpdating = ref(false)

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

    console.log('Admin profile response:', res.data)
    const admin = res.data
    console.log('res:', res)
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

const changeAvatar = event => {
  const file = event.target.files[0]
  if (!file) return

  // Validate file
  const validTypes = ['image/jpeg', 'image/png', 'image/gif']
  if (!validTypes.includes(file.type)) {
    toast.error('Only JPG, PNG or GIF images are allowed')
    return
  }

  if (file.size > 800 * 1024) {
    toast.error('File size must be less than 800KB')
    return
  }

  adminData.value.photoFile = file
  adminData.value.avatarImg = URL.createObjectURL(file)
}
console.log('Admin data:', adminData.value)

const updateAdmin = async () => {
  try {
    await api.put(`/admin/${adminId.value}`, {
      username: adminData.value.username,
      email: adminData.value.email,
      password: adminData.value.password || undefined,
    })

    // Step 2: Upload photo separately
    if (adminData.value.photoFile) {
      const formData = new FormData()
      formData.append('foto', adminData.value.photoFile)

      await api.post(`/admin/upload/${adminId.value}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data',
        },
      })
    }

    toast.success('Profil admin berhasil diperbarui!')
    console.log('admin photo:', adminData.avatarImg)
    fetchLoggedInAdmin()
  } catch (err) {
    console.error('Update error:', err)
    toast.error('Gagal memperbarui profil admin.')
  }
}

onMounted(() => {
  fetchLoggedInAdmin()
})
</script>

<template>
  <VCard title="">
    <VCardText class="d-row">
      <!-- Avatar Section -->
      <VAvatar
        rounded="lg"
        size="200"
        class="me-6"
        :image="`http://localhost:5000${adminData.avatarImg}`"
        :src="`http://localhost:5000${adminData.avatarImg}`"
      />

      <!-- Upload Controls -->
      <div class="d-flex flex-column justify-center gap-4 mt-4">
        <div class="d-flex flex-wrap gap-2">
          <VBtn
            color="primary"
            @click="refInputEl?.click()"
          >
            <VIcon icon="ri-upload-cloud-line" />
            <span class="ms-2 d-none d-sm-inline">Upload Photo</span>
          </VBtn>

          <input
            ref="refInputEl"
            type="file"
            accept="image/jpeg, image/png, image/gif"
            hidden
            @change="changeAvatar"
          />
        </div>
        <p class="text-body-2 mb-0 text-disabled">Allowed JPG, PNG, or GIF. Max size 800KB.</p>
      </div>
    </VCardText>

    <VDivider />

    <VCardText>
      <VForm
        @submit.prevent="updateAdmin"
        class="mt-6"
      >
        <VRow>
          <VCol
            cols="12"
            md="6"
          >
            <VTextField
              v-model="adminData.username"
              label="Username"
              :rules="[v => !!v || 'Required']"
              required
            />
          </VCol>

          <VCol
            cols="12"
            md="6"
          >
            <VTextField
              v-model="adminData.email"
              label="Email"
              type="email"
            />
          </VCol>

          <VCol
            cols="12"
            class="d-flex gap-4"
          >
            <VBtn
              type="submit"
              color="primary"
              :loading="isUpdating"
            >
              Save Changes
            </VBtn>
          </VCol>
        </VRow>
      </VForm>
    </VCardText>
  </VCard>
</template>
