import { createApp } from 'vue'
import type { PluginOptions } from 'vue-toastification'
import Toast, { POSITION } from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import App from './Newtab.vue'
import '../styles'

const app = createApp(App)
const options: PluginOptions = {
  position: POSITION.TOP_RIGHT,
  hideProgressBar: true,
  timeout: 2000
}

app.use(Toast, options)
app.mount('#app')
