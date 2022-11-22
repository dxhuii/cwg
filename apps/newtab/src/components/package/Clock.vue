<script setup lang="ts">
import { useIntervalFn } from '@vueuse/core'

const date = ref(new Date().toLocaleTimeString().split(':'))

const getTime = () => {
  date.value = new Date().toLocaleTimeString().split(':')
}

useIntervalFn(() => {
  getTime()
}, 1000)
</script>

<template>
  <div flex="~ col" relative rounded-2xl class="text-5xl justify-center items-center h-20 text-white text-shadow-md bg-gradient-to-b from-#000 to-#333">
    <div flex>
      <div>{{ date?.[0] }}</div>
      <div class="relative -top-1 px-2">
        :
      </div>
      <div>{{ date?.[1] }}</div>
    </div>
    <div absolute top-1 right-1 text-base>
      {{ date?.[2] }}
    </div>
  </div>
</template>
