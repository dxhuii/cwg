<script setup lang="ts">
import { apiFetch } from '~/utils/fetch'
const props = defineProps<{ wd: string; selected: number }>()
const emit = defineEmits(['so', 'getWd', 'getLen'])
const data = ref<{ data: string[] }>()

watchEffect(async () => {
  const list = await apiFetch<{ data: string[] }>('keywod/baidu', {
    params: {
      wd: props.wd,
    },
  })
  emit('getLen', list.data.length - 1)
  data.value = list
})

const list = computed(() => data.value?.data || [])

const handleClick = (wd: string) => {
  emit('so', wd)
}

watch(
  () => props.selected,
  (val) => {
    if (val === -1)
      return
    emit('getWd', list.value[val])
  },
)
</script>

<template>
  <div absolute top-14 w-120 z-10 class="rounded-lg shadow-lg bg-white/90 py-3 cursor-pointer" backdrop="blur-md">
    <div v-for="(item, i) in list" :key="item" class="px-4 py-1 hover:bg-gray-500/20" :class="{ 'bg-gray-500/20': i === props.selected }" @click.stop="handleClick(item)">
      {{ item }}
    </div>
  </div>
</template>
