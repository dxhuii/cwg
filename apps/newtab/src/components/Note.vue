<script setup lang="ts">
import type { IBing } from '../utils/type'

defineProps<{ bing: IBing; count: number }>()
defineEmits(['left', 'right'])
</script>

<template>
  <div class="flex w-[80%] absolute transform -translate-x-1/2 left-1/2 bottom-14 text-white justify-end cursor-pointer whitespace-nowrap">
    <a class="flex justify-between items-center h-9 bg-black/70 px-4 rounded-md" backdrop="blur-md" :href="bing?.copyrightlink" target="_blank">
      <heroicons-outline-location-marker class="w-5 h-5 mr-2" />
      {{ bing?.title }} - {{ bing?.copyright }}
    </a>
    <div class="flex ml-2">
      <div
        class="flex justify-center items-center h-9 bg-black/70 px-2 rounded-md mr-2" backdrop="blur-md" :class="{ ['cursor-not-allowedv text-gray-500']: count === 0 }" @click="$emit('left')"
      >
        <heroicons-outline-chevron-left class="w-5 h-5" />
      </div>
      <div
        class="flex justify-center items-center h-9 bg-black/70 px-2 rounded-md" backdrop="blur-md" :class="{ ['cursor-not-allowed text-gray-500']: count === 7 }" @click="$emit('right')"
      >
        <heroicons-outline-chevron-right class="w-5 h-5" />
      </div>
    </div>
  </div>
</template>
