<script lang="ts" setup>
import type { OnClickOutsideHandler } from '@vueuse/core'
import { modelName } from '@cwg/types/enum'

const feed = useFeedStore()
const msg = ref('')
const pic = ref(false)
const face = ref(false)
const image = ref([])
const { textarea, input } = useTextareaAutosize()
const items = [{ label: '公开', key: 'public' }, { label: '仅粉丝', key: 'fans' }, { label: '仅自己', key: 'self' }]
const bar = [{ icon: 'i-carbon-face-satisfied', key: 'face', disabled: false }, { icon: 'i-carbon-image', key: 'image', disabled: false }, { icon: 'i-carbon-link', key: 'link', disabled: false }, { icon: 'i-carbon-hashtag', key: 'topic', disabled: true }, { icon: 'i-carbon-at', key: 'at', disabled: true }]
const cur = ref(items[0])
const onOK = async (item: typeof items[0]) => {
  console.log(item)
  cur.value = item
}
const onSubmit = async () => {
  console.log(input.value)
  const res = await feed.add({ sid: modelName.PIN, content: input.value })
  if (res) {
    input.value = ''
    msg.value = ''
  }
}

const onInput = () => {
  msg.value = input.value
}

const chatBar = (key: string) => {
  if (key === 'image')
    pic.value = true
  if (key === 'face')
    face.value = !face.value
}

const onImage = (data: any) => {
  console.log(data)
  image.value = data
}

const dropdownHandler: OnClickOutsideHandler = () => {
  face.value = false
}
</script>

<template>
  <div class="flex px-4 mt-4" border="b gray-100 dark:warm-gray-800">
    <div class="flex basis-12 mr-3">
      <div class="w-12 h-12 rounded-full overflow-hidden">
        <img src="//tva1.sinaimg.cn/large/006bnWk0gy1h7wtw4aeg5j30b40b4mx5.jpg">
      </div>
    </div>
    <div class="flex-1 relative">
      <textarea ref="textarea" v-model="input" w-full h-12 p-3 leading-6 whitespace-pre-wrap break-words outline-none select-text text-base break-all bg="white dark:#121212" placeholder="有什么新鲜事？" class="placeholder-.light:text-#536471 resize-none" @input="onInput" />
      <div flex justify-between mt-3 mb-3 pt-3 border="t gray-100 dark:warm-gray-800">
        <div class="flex text-#1d9bf0 h-9 items-center relative">
          <div v-for="item in bar" :key="item.icon" flex items-center justify-center w-9 h-9 rounded-full cursor-pointer relative hover:bg="#1d9bf0/10" :class="{ 'pointer-events-none': item.disabled }" @click.stop="chatBar(item.key)">
            <div w-5 h-5 :class="item.icon" />
          </div>
          <Transition name="slide-up">
            <Emoji v-if="face" v-on-click-outside.bubble="dropdownHandler" :open="face" />
          </Transition>
        </div>
        <div flex relative>
          <div flex items-center mr-2 text="#536471">
            {{ msg && msg.length }}
          </div>
          <Dropdown :menu="items" :is-selected="true" @onOk="onOK">
            <div flex items-center mr-2 px-3 py-2 text-sm font-bold rounded-full cursor-pointer text="#1d9bf0" hover:bg="#1d9bf0/10">
              {{ cur.label }}
              <div i-carbon-chevron-sort w-4 h-4 ml-2 />
            </div>
          </Dropdown>
          <button
            flex bg="#1d9bf0" text-sm text-white h-9 px-4 justify-center items-center rounded-full cursor-pointer :class="msg ? 'hover:bg-#1A8CD8 active:bg-#177CC0' : 'opacity-50 cursor-auto'" :disabled="!msg"
            @click="onSubmit"
          >
            发送
          </button>
        </div>
      </div>
    </div>
    <Modal
      v-model="pic"
      title="添加图片"
    >
      <AddImage @onImage="onImage" />
    </Modal>
  </div>
</template>
