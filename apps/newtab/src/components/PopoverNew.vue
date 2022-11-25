<script lang="ts" setup>
import type { MaybeElement, MaybeElementRef, OnClickOutsideHandler } from '@vueuse/core'
import { onClickOutside } from '@vueuse/core'
const { cls = 'w-30' } = defineProps<{ cls?: string }>()
const dropdown = ref(false)
const vOnClickOutside = {
  mounted(el: MaybeElementRef<MaybeElement>, binding: { modifiers: { bubble: any }; value: [any, any] }) {
    const capture = !binding.modifiers.bubble
    if (typeof binding.value === 'function') {
      (el as any).__onClickOutside_stop = onClickOutside(el, binding.value, { capture })
    }
    else {
      const [handler, options] = binding.value
        ;(el as any).__onClickOutside_stop = onClickOutside(el, handler, Object.assign({ capture }, options))
    }
  },
  unmounted(el: any) {
    (el as any).__onClickOutside_stop()
  }
}

const dropdownHandler: OnClickOutsideHandler = () => {
  dropdown.value = false
}
</script>

<template>
  <div relative>
    <div @click.stop="dropdown = !dropdown">
      <slot :open="dropdown " />
    </div>
    <Transition name="slide-up">
      <div v-if="dropdown" v-on-click-outside.bubble="dropdownHandler" :cls="cls" overflow-y-auto rounded-md shadow-lg ring-1 ring-black ring-opacity-5 bg="white/75 dark:warm-gray-900" text="base #121212 dark:gray-300" absolute left-0 top-14 z-10 backdrop="blur-md">
        <slot name="content" />
      </div>
    </Transition>
  </div>
</template>
