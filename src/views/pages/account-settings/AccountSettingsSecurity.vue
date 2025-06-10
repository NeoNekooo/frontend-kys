<script setup>
import api from '@/plugins/axios/axios'
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { useToast } from 'vue-toastification'

const toast = useToast()

const isCurrentPasswordVisible = ref(false)
const isNewPasswordVisible = ref(false)
const isConfirmPasswordVisible = ref(false)

const currentPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')

const passwordRequirements = [
  'Minimum 8 characters long - the more, the better',
  'At least one lowercase character',
  'At least one number, symbol, or whitespace character',
]

const adminData = ref({
  id: '', // penting untuk endpoint change-password/:id
  avatarImg: '',
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

    const admin = res.data
    if (admin) {
      adminData.value = {
        id: admin.id,
        username: admin.username,
        email: admin.email || '',
        password: '',
        avatarImg: admin.photo || '',
        photoFile: null,
      }
    }
  } catch (err) {
    toast.error('Failed to load admin profile')
    console.error(err)
  }
}

const validatePassword = password => {
  if (password.length < 8) return false
  if (!/[a-z]/.test(password)) return false
  if (!/[\d\s\W]/.test(password)) return false
  return true
}

const handleSubmit = async () => {
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
  console.log('Submitting password change for admin ID:', adminData.value.id)
  console.log('Current Password:', currentPassword.value)
  console.log('New Password:', newPassword.value)

  try {
    await api.put(`/admin/change-password/${adminData.value.id}`, {
      currentPassword: currentPassword.value,
      newPassword: newPassword.value,
    })

    toast.success('Password updated successfully!')

    // Reset form values
    currentPassword.value = ''
    newPassword.value = ''
    confirmPassword.value = ''
  } catch (error) {
    toast.error(error.response?.data?.message || 'Failed to update password')
    console.error(error)
  }
}

const handleReset = () => {
  currentPassword.value = ''
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
              <VCol
                cols="12"
                md="6"
              >
                <VTextField
                  v-model="currentPassword"
                  :type="isCurrentPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="isCurrentPasswordVisible ? 'ri-eye-off-line' : 'ri-eye-line'"
                  autocomplete="current-password"
                  label="Current Password"
                  placeholder="············"
                  @click:append-inner="isCurrentPasswordVisible = !isCurrentPasswordVisible"
                  required
                />
              </VCol>
            </VRow>

            <VRow>
              <VCol
                cols="12"
                md="6"
              >
                <VTextField
                  v-model="newPassword"
                  :type="isNewPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="isNewPasswordVisible ? 'ri-eye-off-line' : 'ri-eye-line'"
                  label="New Password"
                  autocomplete="new-password"
                  placeholder="············"
                  @click:append-inner="isNewPasswordVisible = !isNewPasswordVisible"
                  required
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <VTextField
                  v-model="confirmPassword"
                  :type="isConfirmPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="isConfirmPasswordVisible ? 'ri-eye-off-line' : 'ri-eye-line'"
                  autocomplete="new-password"
                  label="Confirm New Password"
                  placeholder="············"
                  @click:append-inner="isConfirmPasswordVisible = !isConfirmPasswordVisible"
                  required
                />
              </VCol>
            </VRow>
          </VCardText>

          <VCardText>
            <p class="text-base font-weight-medium mt-2">Password Requirements:</p>
            <ul class="d-flex flex-column gap-y-3">
              <li
                v-for="item in passwordRequirements"
                :key="item"
                class="d-flex"
              >
                <div>
                  <VIcon
                    size="7"
                    icon="ri-checkbox-blank-circle-fill"
                    class="me-3"
                  />
                </div>
                <span class="font-weight-medium">{{ item }}</span>
              </li>
            </ul>
          </VCardText>

          <VCardText class="d-flex flex-wrap gap-4">
            <VBtn type="submit">Save changes</VBtn>

            <VBtn
              color="secondary"
              variant="outlined"
              @click="handleReset"
            >
              Reset
            </VBtn>
          </VCardText>
        </VForm>
      </VCard>
    </VCol>
  </VRow>
</template>
