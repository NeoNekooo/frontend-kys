<script setup>
import api from '@/plugins/axios/axios'
import { onMounted, ref } from 'vue'
import { useToast } from 'vue-toastification'
import { useRouter } from 'vue-router' // Import router for redirection

const toast = useToast()
const router = useRouter() // Initialize router

const isCurrentPasswordVisible = ref(false)
const isNewPasswordVisible = ref(false)
const isConfirmPasswordVisible = ref(false)

const oldPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')

const passwordRequirements = [
  'Minimum 8 characters long - the more, the better',
  'At least one lowercase character',
  'At least one number, symbol, or whitespace character',
]

const adminData = ref({
  id: '',
  avatarImg: '',
  username: '',
  email: '',
  password: '',
  photoFile: null,
  photo: '',
})

const isLoading = ref(false) // Add loading state

const fetchLoggedInAdmin = async () => {
  isLoading.value = true
  try {
    const res = await api.get('/admin/me') // Use relative path if base URL is set in axios
    const admin = res.data
    if (admin) {
      adminData.value = {
        id: admin.id,
        username: admin.username,
        email: admin.email || '',
        photo: admin.photo,
        password: '',
        avatarImg: admin.photo || '',
        photoFile: null,
      }
    }
  } catch (err) {
    toast.error('Failed to load admin profile')
    console.error(err)
  } finally {
    isLoading.value = false
  }
}

const validatePassword = password => {
  if (password.length < 8) return false
  if (!/[a-z]/.test(password)) return false
  if (!/[\d\s\W]/.test(password)) return false
  return true
}

const handleSubmit = async () => {
  if (isLoading.value) return // Prevent multiple submissions

  if (newPassword.value !== confirmPassword.value) {
    toast.error('New password and confirmation do not match!')
    return
  }

  if (!validatePassword(newPassword.value)) {
    toast.error('Password tidak memenuhi persyaratan keamanan.')
    return
  }

  if (!adminData.value.id) {
    toast.error('Admin ID tidak ditemukan.')
    return
  }

  isLoading.value = true
  const payload = {
    oldPassword: oldPassword.value,
    newPassword: newPassword.value,
  }

  console.log('Submitting password change for admin ID:', adminData.value.id)
  console.log('Payload:', payload)

  try {
    await api.put(`/admin/change-password/${adminData.value.id}`, payload)

    toast.success('Password updated successfully!')
    // Invalidate session and redirect to login
    localStorage.removeItem('token')
    router.push({ name: 'login' })
  } catch (error) {
    const errorMessage = error.response?.data?.error || error.response?.data?.message || 'Failed to update password'
    toast.error(errorMessage)
    console.error(error)
  } finally {
    isLoading.value = false
  }
}

const handleReset = () => {
  oldPassword.value = ''
  newPassword.value = ''
  confirmPassword.value = ''
}

onMounted(() => {
  fetchLoggedInAdmin()
})
</script>

<template>
  <VRow>
    <VCol cols="12">
      <VCard title="Change Password">
        <VForm @submit.prevent="handleSubmit">
          <VCardText>
            <VRow class="mb-3">
              <VCol cols="12" md="6">
                <VTextField
                  v-model="oldPassword"
                  :type="isCurrentPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="isCurrentPasswordVisible ? 'ri-eye-off-line' : 'ri-eye-line'"
                  autocomplete="current-password"
                  label="Current Password"
                  placeholder="············"
                  @click:append-inner="isCurrentPasswordVisible = !isCurrentPasswordVisible"
                  required
                  :disabled="isLoading"
                />
              </VCol>
            </VRow>

            <VRow>
              <VCol cols="12" md="6">
                <VTextField
                  v-model="newPassword"
                  :type="isNewPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="isNewPasswordVisible ? 'ri-eye-off-line' : 'ri-eye-line'"
                  label="New Password"
                  autocomplete="new-password"
                  placeholder="············"
                  @click:append-inner="isNewPasswordVisible = !isNewPasswordVisible"
                  required
                  :disabled="isLoading"
                />
              </VCol>

              <VCol cols="12" md="6">
                <VTextField
                  v-model="confirmPassword"
                  :type="isConfirmPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="isConfirmPasswordVisible ? 'ri-eye-off-line' : 'ri-eye-line'"
                  autocomplete="new-password"
                  label="Confirm New Password"
                  placeholder="············"
                  @click:append-inner="isConfirmPasswordVisible = !isConfirmPasswordVisible"
                  required
                  :disabled="isLoading"
                />
              </VCol>
            </VRow>
          </VCardText>

          <VCardText>
            <p class="text-base font-weight-medium mt-2">Password Requirements:</p>
            <ul class="d-flex flex-column gap-y-3">
              <li v-for="item in passwordRequirements" :key="item" class="d-flex">
                <div>
                  <VIcon size="7" icon="ri-checkbox-blank-circle-fill" class="me-3" />
                </div>
                <span class="font-weight-medium">{{ item }}</span>
              </li>
            </ul>
          </VCardText>

          <VCardText class="d-flex flex-wrap gap-4">
            <VBtn type="submit" :loading="isLoading">Save changes</VBtn>
            <VBtn color="secondary" variant="outlined" @click="handleReset" :disabled="isLoading">
              Reset
            </VBtn>
          </VCardText>
        </VForm>
      </VCard>
    </VCol>
  </VRow>
</template>
