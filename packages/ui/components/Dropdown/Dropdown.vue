<script lang="ts" setup>
import type { MaybeElement, MaybeElementRef, OnClickOutsideHandler } from '@vueuse/core'
import { onClickOutside, useEventListener } from '@vueuse/core'
import { computed, onMounted, ref } from 'vue'
const { menu, trigger, isSelected, direction } = defineProps<{ menu: DropdownItem[]; trigger?: 'click' | 'hover'; isSelected?: boolean; direction?: 'up' | 'down' | 'left' | 'right' }>()
const emit = defineEmits(['onOk'])
interface DropdownItem { label: string; key?: string; icon?: string; disabled?: boolean }
const refReference = ref()
const refFloating = ref()
const dropdown = ref(false)
const cur = ref(menu[0].key)

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

onMounted(() => {
  if (trigger === 'hover') {
    useEventListener(refReference, 'mouseenter', () => {
      dropdown.value = true
    })
    useEventListener(refReference, 'mouseleave', () => {
      dropdown.value = false
    })
    useEventListener(refFloating, 'mouseenter', () => {
      dropdown.value = true
    })
    useEventListener(refFloating, 'mouseleave', () => {
      dropdown.value = false
    })
  }
})

const dropdownHandler: OnClickOutsideHandler = event => {
  console.log(event)
  dropdown.value = false
}

const onClick = (item: DropdownItem) => {
  emit('onOk', item)
  cur.value = item.key
  dropdown.value = false
}

const dec = computed(() => {
  return direction === 'down' ? 'top-0' : 'bottom-0'
})
</script>

<template>
  <div relative>
    <div v-if="trigger === 'hover'" ref="refReference">
      <slot />
    </div>
    <div v-else @click.stop="dropdown = !dropdown">
      <slot />
    </div>
    <Transition name="slide-up">
      <div v-if="dropdown" ref="refFloating" v-on-click-outside.bubble="dropdownHandler" max-h-60 w-30 overflow-y-auto rounded-md shadow-lg ring-1 ring-black ring-opacity-5 bg="white dark:warm-gray-900" text="base #121212 dark:gray-300" absolute right-0 z-10 :class="dec">
        <div v-for="item in menu" :key="item.label" flex justify-between cursor-pointer select-none py-2 px-4 hover:bg="gray-100 dark:warm-gray-700" hover:text="dark:gray-300" @click.stop="onClick(item)">
          <div block truncate>
            {{ item.label }}
          </div>
          <div v-if="cur === item.key && isSelected" i-carbon-checkmark h-5 w-5 />
        </div>
      </div>
    </Transition>
  </div>
</template>
