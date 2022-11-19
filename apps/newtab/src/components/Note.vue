<script setup lang="ts">
import type { IBing } from '../utils/type'

defineProps<{ bing: IBing; count: number }>()
defineEmits(['left', 'right'])
</script>

<template>
  <div class="flex absolute transform -translate-x-1/2 left-1/2 bottom-20 text-white cursor-pointer whitespace-nowrap">
    <a class="flex justify-between items-center h-9 bg-gray-500/70 px-4 rounded-md" :href="bing?.copyrightlink" target="_blank">
      <heroicons-outline-location-marker class="w-5 h-5 mr-2" />
      {{ bing?.title }} - {{ bing?.copyright }}
    </a>
    <div class="flex ml-2">
      <div
        class="flex justify-center items-center h-9 bg-gray-500/70 px-2 rounded-md mr-2" :class="{ ['cursor-not-allowed']: count === 0 }" @click="$emit('left')"
      >
        <heroicons-outline-chevron-left class="w-5 h-5" />
      </div>
      <div
        class="flex justify-center items-center h-9 bg-gray-500/70 px-2 rounded-md" :class="{ ['cursor-not-allowed']: count === 7 }" @click="$emit('right')"
      >
        <heroicons-outline-chevron-right class="w-5 h-5" />
      </div>
    </div>
  </div>
</template>
