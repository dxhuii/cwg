<script setup lang="ts">
import { jump } from '~/utils'

defineProps<{ visible: boolean; title?: string }>()
const emit = defineEmits(['close', 'success'])
const bookmarks = ref<chrome.bookmarks.BookmarkTreeNode[]>()
const tab = ref<string>()
const subTab = ref<string>()
const currentBookmarks = ref<chrome.bookmarks.BookmarkTreeNode[]>()
const currentBookmarksChildren = ref<chrome.bookmarks.BookmarkTreeNode[]>()
const subTabData = ref<chrome.bookmarks.BookmarkTreeNode[]>()
const subTabChildren = ref<chrome.bookmarks.BookmarkTreeNode[]>()
// chrome://favicon/size/32@2x/https://cang.im
watchEffect(async () => {
  await chrome.bookmarks.getTree(res => {
    const data = res[0].children
    bookmarks.value = data
    tab.value = data?.[0]?.id
    const list = data?.[0]?.children
    // console.log(list)
    currentBookmarks.value = list?.filter(item => !item.children)
    currentBookmarksChildren.value = list?.filter(item => item.children)
    subTab.value = currentBookmarksChildren.value?.[0]?.id
    const subList = currentBookmarksChildren.value?.[0]?.children
    subTabData.value = subList?.filter(item => !item.children)
    subTabChildren.value = subList?.filter(item => item.children)
  })
})

const close = () => {
  emit('close')
}

const onTab = (id: string) => {
  tab.value = id
  const list = bookmarks.value?.find(item => item.id === id)
  currentBookmarks.value = list?.children?.filter(item => !item.children)
  currentBookmarksChildren.value = list?.children?.filter(item => item.children)
}

const onSubTab = (id: string) => {
  subTab.value = id
  const list = currentBookmarksChildren.value?.find(item => item.id === id)
  subTabData.value = list?.children?.filter(item => !item.children)
  subTabChildren.value = list?.children?.filter(item => item.children)
}

const onJump = (url: string) => {
  jump(url)
}
</script>

<template>
  <Modal :visible="visible" title="添加网址" class-name="min-w-3xl" @close="close">
    <div class="border-t border-gray-200 relative -mx-4">
      <div class="flex border-b border-gray-200 h-10 leading-10">
        <div v-for="item in bookmarks" :key="item.id" class="cursor-pointer ml-5 px-4" :class="{ 'bg-gray-300': tab === item.id }" @click="onTab(item.id)">
          {{ item.title }}
        </div>
      </div>
      <div class="flex flex-wrap">
        <div v-for="item in currentBookmarks" :key="item.id" class="ml-4 mt-4 w-10" @click="onJump(item.url!)">
          <img :src="`chrome://favicon/size/32@2x/${item.url}`" class="w-10">
        </div>
      </div>
      <div class="flex border-t border-gray-200 mt-4">
        <div class="w-40 border-r border-gray-200">
          <div
            v-for="item in currentBookmarksChildren"
            :key="item.id"
            :class="{ 'bg-blue-600': subTab === item.id }"
            class="h-8 leading-8 pl-4 cursor-pointer hover:bg-blue-600 hover:text-white"
            @click="onSubTab(item.id)"
          >
            {{ item.title }}
          </div>
        </div>
        <div class="flex-1 px-4 flex">
          <div>
            <div v-for="item in subTabData" :key="item.id">
              {{ item.title }}
            </div>
          </div>
          <div>
            <div v-for="item in subTabChildren" :key="item.id">
              {{ item.title }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </Modal>
</template>
