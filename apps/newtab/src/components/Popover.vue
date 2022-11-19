<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'
defineProps<{ className: string; contentClass: string }>()

const dropdown = ref(false)
const dropdownRef = ref(null)
onClickOutside(
  dropdownRef,
  () => {
    dropdown.value = false
  },
)
</script>

<template>
  <div :class="[className]" @click="dropdown = !dropdown">
    <slot :open="dropdown" />
  </div>
  <div v-if="dropdown" ref="dropdownRef" :class="[contentClass]">
    <slot name="content" />
  </div>
</template>
