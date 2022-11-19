export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('onClickOutside', {
    mounted(el, binding) {
      const capture = !binding.modifiers.bubble
      if (typeof binding.value === 'function') {
        (el as any).__onClickOutside_stop = onClickOutside(el, binding.value, { capture })
      }
      else {
        const [handler, options] = binding.value
          ;(el as any).__onClickOutside_stop = onClickOutside(el, handler, Object.assign({ capture }, options))
      }
    },
    unmounted(el) {
      (el as any).__onClickOutside_stop()
    },
  })
})
