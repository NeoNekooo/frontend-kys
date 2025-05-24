import { createApp } from 'vue'
import App from '@/App.vue'
import { registerPlugins } from '@core/utils/plugins'

// Styles
import '@core/scss/template/index.scss'
import '@layouts/styles/index.scss'
import '@/assets/styles/tailwind.css'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import routes from './plugins/router'


// Create vue app
// Create Vue app
const app = createApp(App)

// Register plugins
registerPlugins(app)
app.use(routes) // ✅ Add router to the existing app
app.use(Toast)  // ✅ Add Toast to the existing app

// Mount app
app.mount('#app')



// Register plugins
// Mount vue app
