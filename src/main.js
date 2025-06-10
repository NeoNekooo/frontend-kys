import App from '@/App.vue'
import { createApp } from 'vue'

// Styles
import '@/assets/styles/tailwind.css'
import '@core/scss/template/index.scss'
import '@layouts/styles/index.scss'

// Plugins
import routes from '@/plugins/router/index.js'
import { registerPlugins } from '@core/utils/plugins'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

// Buat aplikasi Vue
const app = createApp(App)

// Daftarkan plugin & routing
registerPlugins(app)
app.use(routes)
app.use(Toast)

// Mount ke elemen #app
app.mount('#app')
