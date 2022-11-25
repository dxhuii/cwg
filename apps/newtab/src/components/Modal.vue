<script setup lang="ts">
import type { StyleValue } from 'vue'
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
defineProps<{ visible: boolean; title?: string; className?: string; style?: StyleValue }>()
const emit = defineEmits(['close'])

const modalRef = ref(null)

onClickOutside(
  modalRef,
  () => {
    emit('close')
  }
)
</script>

<template>
  <div v-if="visible" ref="modalRef" class="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-96 max-w-full" :class="[className]" :style="style">
    <div class="bg-white py-2 px-4 rounded-md shadow-md">
      <button class="absolute top-3 right-3" title="Close" @click="emit('close')">
        <heroicons-outline-x />
      </button>
      <h2 class="text-base mb-2">
        {{ title || '标题' }}
      </h2>
      <slot />
    </div>
  </div>
</template>
