<script lang="ts" setup>
import { onClickOutside, refThrottled } from '@vueuse/core'
import type { ILogo } from '~/types'
import { jump, util } from '~/utils'

const wd = ref('')
const open = ref(false)
const wordList = ref(0)
const dropdownRef = ref(null)
const keyword = refThrottled(wd, 300)
const upDown = ref('')
const searchName = ref('baidu')
const selected = ref(-1)

const searchUrl: { [key: string]: string } = {
  baidu: 'https://www.baidu.com/s?tn=1247508_56690_dxhuii_pg&ie=utf-8&wd={wd}',
  google: 'https://www.google.com/search?q={wd}',
}

const clear = () => {
  wd.value = ''
  upDown.value = ''
  selected.value = -1
}

const so = (word?: string) => {
  if (word || upDown.value || keyword.value) {
    const wd = encodeURIComponent(word || upDown.value || keyword.value)
    const url = searchUrl[searchName.value]
    jump(util.format({ wd }, url))
    open.value = false
    selected.value = -1
    upDown.value = ''
  }
}

const getSearchName = (item: ILogo) => {
  searchName.value = item.key
}

const getLen = (len: number) => {
  wordList.value = len
}

const getWd = (wd: string) => {
  upDown.value = wd
}

const getWord = () => {
  open.value = !open.value
  upDown.value = ''
  selected.value = -1
}

onClickOutside(
  dropdownRef,
  () => {
    open.value = false
  },
)

const down = (type: string) => {
  if (wd) {
    if (type === 'down') {
      if (selected.value < wordList.value)
        selected.value++
      else
        selected.value = 0
    }
    else {
      if (selected.value > 0)
        selected.value--
      else
        selected.value = wordList.value
    }
  }
}
</script>

<template>
  <div relative flex self-center w-120 bg="white/75" rounded-2xl h-12 backdrop="blur-md" z-10>
    <SearchLogo @getData="getSearchName" />
    <input
      v-model="wd"
      autocomplete="off"
      placeholder="输入并搜索"
      ml-2
      class="w-full outline-none bg-transparent h-12 leading-12"
      type="text"
      name="wd"
      @input="open = true"
      @focus="getWord"
      @keydown.down="down('down')"
      @keydown.up="down('up')"
      @keydown="(e: KeyboardEvent) => {
        if (e.key === 'Enter') {
          so()
        }
      }"
    >
    <div v-if="keyword" i-carbon-close inline-flex w-6 h-6 absolute right-12 top-3 z-10 cursor-pointer text="gray-500" @click.stop="clear" />
    <div class="absolute w-14 right-0 flex h-12 items-center justify-center cursor-pointer" @click="so()">
      <div i-carbon-search class="w-6 h-6 text-gray-400" />
    </div>
    <Transition name="slide-up">
      <Autocomplete v-if="keyword && open" ref="dropdownRef" :wd="keyword" :selected="selected" @so="so" @getWd="getWd" @getLen="getLen" />
    </Transition>
  </div>
</template>
