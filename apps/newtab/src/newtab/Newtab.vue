<script setup lang="ts">
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import type { IBing } from '@cwg/types'
import { formatPic } from '~/utils'
import { getBing } from '~/composables/cwg'
const bz = ref(0)
const data = ref<{ data: IBing[] }>()

watchEffect(async () => {
  data.value = await getBing({
    n: 8
  })
})

const bing = computed(() => {
  const { url, copyrightlink, title, copyright } = data?.value?.data?.[bz.value] || {}
  return { url: formatPic(url!), copyrightlink, title, copyright } as IBing
})

const left = () => {
  if (bz.value === 0)
    return
  bz.value--
}

const right = () => {
  if (bz.value > data.value!.data!.length! - 2)
    return
  bz.value++
}
</script>

<template>
  <ElConfigProvider :locale="zhCn">
    <main class="h-[100vh] bg-cover bg-center bg-cang-500 text-base bg-gradient-to-br from-fuchsia-500 to-sky-500" :style="{ 'background-image': `url(${bing.url})` }">
      <div class="container mx-auto flex justify-center flex-wrap flex-col content-center h-[100vh]">
        <User />
        <Search />
        <Site />
      </div>
      <Note :bing="bing" :count="bz" @left="left" @right="right" />
      <footer class="flex text-white justify-end items-center text-sm absolute w-[80%] transform -translate-x-1/2 left-1/2 bottom-5">
        <a href="https://www.cangwangge.com" target="_blank">
          藏网阁 • CANGWANGGE.COM
        </a>
      </footer>
    </main>
  </ElConfigProvider>
</template>
