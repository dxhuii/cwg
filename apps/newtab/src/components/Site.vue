<script setup lang="ts">
import draggable from 'vuedraggable'
import type { ILink } from '@cwg/types'
import { jump } from '~/utils'
import { getLink } from '~/composables/cwg'
const data = ref<ILink[]>()
const enabled = ref(true)
const dragging = ref(false)
const open = ref(false)
const openBookmark = ref(false)

watchEffect(async () => {
  const res = await getLink({
    pageSize: 20
  })
  data.value = res.data.list
})

const handleClick = (url: string) => {
  if (url === 'add') {
    open.value = true
    return false
  }
  if (url === 'chrome://bookmarks/') {
    openBookmark.value = true
    return false
  }
  jump(url)
}

const checkMove = (e: { draggedContext: { futureIndex: any } }) => {
  window.console.log(`Future index: ${e.draggedContext.futureIndex}`)
}
</script>

<template>
  <div w-full mt-8>
    <draggable
      :list="data"
      item-key="name"
      class="text-white grid relative select-none grid-flow-dense grid-cols-[repeat(auto-fill,var(--icon-size-gap-y))] grid-rows-[repeat(auto-fill,var(--icon-size-gap-x))]"
      :move="checkMove"
      @start="dragging = true"
      @end="dragging = false"
    >
      <template #item="{ element }">
        <div v-if="element.list.dir === 'tool'" :class="[element.size, { 'not-draggable': !enabled }]" px="[calc(var(--icon-gap-y)/2)]">
          <Clock v-if="element.url === 'Clock'" />
          <Calendar v-if="element.url === 'Calendar'" />
          <p mt-2 text="center base white">
            {{ element.name }}
          </p>
        </div>
        <div
          v-else
          relative
          class="px-[calc(var(--icon-gap-y)/2)] col-span-1 row-span-1 duration-300 rounded-2xl icon-size-1x1"
          :class="{ 'not-draggable': !enabled }"
          @click="handleClick(element.url)"
        >
          <div class="relative w-full overflow-hidden rounded-2xl shadow-md duration-200 cursor-pointer">
            <img :src="element.icon" :alt="element.name" class="block w-full h-full object-cover pointer-events-none">
          </div>
          <p mt-1 text="center sm white">
            {{ element.name }}
          </p>
        </div>
      </template>
    </draggable>
  </div>
  <AddSite :visible="open" @close="open = false" />
  <!-- <Bookmarks :visible="openBookmark" @close="openBookmark = false" /> -->
  <!-- <History :visible="true" /> -->
</template>

<style>
:root {
  --icon-size: 80px;
  --icon-gap-y: 30px;
  --icon-gap-x: 30px;
  --icon-size-gap-y: calc(var(--icon-size) + var(--icon-gap-y));
  --icon-size-gap-x: calc(var(--icon-size) + var(--icon-gap-x));
}
.app-item {
  grid-template-columns: repeat(auto-fill, 110px);
  grid-template-rows: repeat(auto-fill, 110px);
}
.icon-size-1x1 {
    width: calc(var(--icon-size) + var(--icon-gap-y));
    height: calc(var(--icon-size) + var(--icon-gap-x));
}
.icon-size-1x2 {
    grid-column: span 2;
    width: calc(var(--icon-size) * 2 + var(--icon-gap-y) * 2);
    height: calc(var(--icon-size) + var(--icon-gap-x));
}
.icon-size-2x1 {
    grid-row: span 2;
    width: calc(var(--icon-size) + var(--icon-gap-y));
    height: calc(var(--icon-size) * 2 + var(--icon-gap-x) * 2);
}
.icon-size-2x2 {
    grid-column: span 2;
    grid-row: span 2;
    width: calc(var(--icon-size) * 2 + var(--icon-gap-y) * 2);
    height: calc(var(--icon-size) * 2 + var(--icon-gap-x) * 2);
}
.icon-size-2x4 {
    grid-column: span 4;
    grid-row: span 2;
    width: calc(var(--icon-size) * 4 + var(--icon-gap-y) * 4);
    height: calc(var(--icon-size) * 2 + var(--icon-gap-x) * 2);
}
</style>
