<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { useToast } from 'vue-toastification'
import avatar1 from '@images/avatars/avatar-1.png'

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

const handleSubmit = async () => {
  if (newPassword.value !== confirmPassword.value) {
    toast.error('New password and confirmation do not match!')
    return
  }

  try {
    await axios.put('http://localhost:5000/api/admin/', {
      currentPassword: currentPassword.value,
      newPassword: newPassword.value,
    })

    toast.success('Password updated successfully!')

    currentPassword.value = ''
    newPassword.value = ''
    confirmPassword.value = ''
  } catch (error) {
    toast.error(error.response?.data?.message || 'Failed to update password')
  }
}
onMounted(() => {
  fetchLoggedInAdmin()
})
</script>

<template>
  <VRow>
    <!-- SECTION: Change Password -->
    <VCol cols="12">
      <VCard title="Change Password">
        <VForm @submit.prevent="handleSubmit">
          <VCardText>
            <!-- 👉 Current Password -->
            <VRow class="mb-3">
              <VCol
                cols="12"
                md="6"
              >
                <!-- 👉 current password -->
                <VTextField
                  v-model="currentPassword"
                  :type="isCurrentPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="isCurrentPasswordVisible ? 'ri-eye-off-line' : 'ri-eye-line'"
                  autocomplete="on"
                  label="Current Password"
                  placeholder="············"
                  @click:append-inner="isCurrentPasswordVisible = !isCurrentPasswordVisible"
                />
              </VCol>
            </VRow>

            <!-- 👉 New Password -->
            <VRow>
              <VCol
                cols="12"
                md="6"
              >
                <!-- 👉 new password -->
                <VTextField
                  v-model="newPassword"
                  :type="isNewPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="isNewPasswordVisible ? 'ri-eye-off-line' : 'ri-eye-line'"
                  label="New Password"
                  autocomplete="on"
                  placeholder="············"
                  @click:append-inner="isNewPasswordVisible = !isNewPasswordVisible"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <!-- 👉 confirm password -->
                <VTextField
                  v-model="confirmPassword"
                  :type="isConfirmPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="isConfirmPasswordVisible ? 'ri-eye-off-line' : 'ri-eye-line'"
                  autocomplete="on"
                  label="Confirm New Password"
                  placeholder="············"
                  @click:append-inner="isConfirmPasswordVisible = !isConfirmPasswordVisible"
                />
              </VCol> </VRow
            >a
          </VCardText>

          <!-- 👉 Password Requirements -->
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

          <!-- 👉 Action Buttons -->
          <VCardText class="d-flex flex-wrap gap-4">
            <VBtn type="submit">Save changes</VBtn>

            <VBtn
              type="reset"
              color="secondary"
              variant="outlined"
            >
              Reset
            </VBtn>
          </VCardText>
        </VForm>
      </VCard>
    </VCol>
    <!-- !SECTION -->

    <!-- !SECTION -->
  </VRow>
</template>
