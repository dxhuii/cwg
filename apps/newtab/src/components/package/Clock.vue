<script setup lang="ts">
import { useDateFormat, useIntervalFn, useNow } from '@vueuse/core'
import lunar from '~/utils/lunar'

const props = defineProps<{ size?: string }>()
const date = ref(new Date().toLocaleTimeString().split(':'))

const getTime = () => {
  date.value = new Date().toLocaleTimeString().split(':')
}

const nowLunar = computed(() => {
  return lunar(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate())
})

const month = useDateFormat(useNow(), 'MM月DD日')

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
    <div v-if="props.size === 'middle'" absolute bottom-0 text="center white shadow-md sm" class="whitespace-nowrap">
      <span class="mr-3">{{ month }}</span>
      <span class="mr-3">星期{{ ['日', '一', '二', '三', '四', '五', '六'][new Date().getDay()] }}</span>
      <span class="mr-3">{{ nowLunar.dateStr }}  </span>
      <span class="mr-3">{{ nowLunar.zodiac }}</span>
      <span class="mr-3">{{ nowLunar.lunarYear }}</span>
    </div>
  </div>
</template>
