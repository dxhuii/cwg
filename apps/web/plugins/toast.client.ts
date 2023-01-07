import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.use(Toast, {
    position: 'top-right',
    hideProgressBar: true,
    duration: 2000
    // containerClassName: ["my-container-class", "bg-purple-700"],
  })
})
