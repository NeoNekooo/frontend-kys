<script setup>
import api from '@/plugins/axios/axios'
import { router } from '@/plugins/router'
import authV1Tree2 from '@images/pages/auth-v1-tree-2.png'
import authV1Tree from '@images/pages/auth-v1-tree.png'
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { useToast } from 'vue-toastification'

const toast = useToast()

console.log(import.meta.env.VITE_API_BASE_URL)

const form = ref({
  username: '',
  password: '',
  remember: false,
})

const logo = ref('') // Changed to string for URL

const handleLogin = async () => {
  try {
    const res = await api.post('/admin/login', {
      username: form.value.username,
      password: form.value.password,
    })

    const token = res.data.token
    localStorage.setItem('token', token)
    toast.success('Login berhasil!')
    router.push({ name: 'dashboard' })
  } catch (err) {
    toast.error(err.response?.data?.message || 'Login gagal')
    console.error('Login error:', err)
  }
}

const fetchLogo = async () => {
  try {
    const response = await api.get('/lembaga/logo')
    logo.value = response.data
  } catch (error) {
    console.error('Error fetching logo:', error)
  }
}

onMounted(() => {
  fetchLogo()
})

const isPasswordVisible = ref(false)
</script>
<template>
  <div class="auth-wrapper d-flex align-center justify-center pa-4">
    <VCard
      class="auth-card pa-4 pt-7"
      max-width="900"
    >
      <VCardItem class="justify-center">
        <RouterLink
          to="/"
          class="d-flex align-center gap-3"
        >
          <!-- eslint-disable vue/no-v-html -->
          <img
            class="d-flex w-24"
            src="../assets/images/satu-1735196021.png"
          />  

          <!-- <h2 class="font-weight-medium text-2xl text-uppercase">SIYNA</h2> -->
        </RouterLink>
      </VCardItem>

      <VCardText class="pt-2">
        <!-- <p class="mb-0">Silahkan Login</p> -->
      </VCardText>

      <VCardText>
        <VForm @submit.prevent="handleLogin">
          <VRow>
            <!-- email -->
            <VCol cols="12">
              <VTextField
                v-model="form.username"
                label="Username"
                type="text"
              />
            </VCol>

            <!-- password -->
            <VCol cols="12">
              <VTextField
                v-model="form.password"
                label="Password"
                placeholder="············"
                :type="isPasswordVisible ? 'text' : 'password'"
                autocomplete="password"
                :append-inner-icon="isPasswordVisible ? 'ri-eye-off-line' : 'ri-eye-line'"
                @click:append-inner="isPasswordVisible = !isPasswordVisible"
              />

              <!-- remember me checkbox -->
              <!-- <div class="d-flex align-center justify-space-between flex-wrap my-6">
                <VCheckbox
                  v-model="form.remember"
                  label="Remember me"
                />

                <a
                  class="text-primary"
                  href="javascript:void(0)"
                >
                  Forgot Password?
                </a>
              </div> -->

              <!-- login button -->
              <VBtn
                class="mt-4"
                block
                type="submit"
              >
                Login
              </VBtn>
            </VCol>

            <!-- create account -->
            <!-- <VCol
              cols="12"
              class="text-center text-base"
            >
              <span>New on our platform?</span>
              <RouterLink
                class="text-primary ms-2"
                to="/register"
              >
                Create an account
              </RouterLink>
            </VCol> -->

            <!-- <VCol
              cols="12"
              class="d-flex align-center"
            >
              <VDivider />
              <span class="mx-4">or</span>
              <VDivider />
            </VCol> -->

            <!-- auth providers -->
            <!-- <VCol
              cols="12"
              class="text-center"
            >
              <AuthProvider />
            </VCol> -->
          </VRow>
        </VForm>
      </VCardText>
    </VCard>

    <VImg
      class="auth-footer-start-tree d-none d-md-block"
      :src="authV1Tree"
      :width="250"
    />

    <VImg
      :src="authV1Tree2"
      class="auth-footer-end-tree d-none d-md-block"
      :width="350"
    />

    <!-- bg img -->
    <VImg
      class="auth-footer-mask d-none d-md-block"
      :src="authThemeMask"
    />
  </div>
</template>

<style lang="scss">
@use '@core/scss/template/pages/page-auth';
</style>
