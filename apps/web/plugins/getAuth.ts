import { createToaster } from '@meforma/vue-toaster'
const toaster = createToaster({ /* options */ })
export default defineNuxtPlugin(() => {
  return {
    provide: {
      getAuth: (() => process.client ? localStorage.getItem('token') : null)(),
      Toast: (() => process.client ? toaster : {})(),
    },
  }
})
