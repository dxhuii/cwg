export default defineNuxtPlugin(() => {
  return {
    provide: {
      getAuth: (() => process.client ? localStorage.getItem('token') : null)()
    }
  }
})
