<script lang="ts" setup>
import type { ILogo } from '~/types'

const emit = defineEmits(['getData'])
const searchList = [
  { key: 'baidu', src: 'https://cms-1251036128.cos.ap-shanghai.myqcloud.com/assets/baidu.svg', name: '百度' },
  { key: 'google', src: 'https://cms-1251036128.cos.ap-shanghai.myqcloud.com/assets/google.svg', name: '谷歌' },
]
const data = ref(searchList[0])
const getData = (item: ILogo) => {
  data.value = item
  emit('getData', item)
}
</script>

<template>
  <PopoverNew>
    <template #default="{ open }">
      <div flex justify="center" items-center h-12 pl-4 cursor-pointer>
        <img :src="data.src" class="w-6 h-6 mr-1">
        <div v-if="open" i-carbon-chevron-down class="w-8 h-8" /><div v-else i-carbon-chevron-up class="w-8 h-8" />
      </div>
    </template>
    <template #content>
      <div flex p-2>
        <div v-for="item in searchList" :key="item.key" w-16 p-2 text-sm flex="~ col" items-center justify-center rounded-lg cursor-pointer hover="bg-gray-500/20" @click="getData(item)">
          <img :src="item.src" w-6 h-6>
          <div mt-1>
            {{ item.name }}
          </div>
        </div>
      </div>
    </template>
  </PopoverNew>
</template>
