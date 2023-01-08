<script setup lang="ts">
import { Dialog } from '@cwg/ui'
import type { IUser } from '@cwg/types'
const open = ref()
const reg = ref()

const openLogin = () => {
  open.value.openModal()
}

const openReg = () => {
  reg.value.openModal()
}

const userInfo = ref<IUser>()
const success = async () => {
  const res = await getUserInfo()
  userInfo.value = res.data
}

const close = () => {
  open.value.closeModal()
}

const closeReg = () => {
  reg.value.closeModal()
}

watchEffect(() => {
  success()
})

const items = [
  { label: '剧集', key: 'subject' },
  { label: '评论', key: 'comment' },
  { label: '动态', key: 'feed' },
  { label: '退出', key: 'logout' }
]

const exit = async () => {
  const res = await logout()
  if (res.data)
    userInfo.value = undefined
}

defineExpose({
  openLogin
})
const route = useRoute()
const menu = [
  { name: '首页', icon: 'i-ri:home-7-fill', path: '/' },
  { name: '最新', icon: 'i-ri-loader-3-line', path: '/new' },
  { name: '热门', icon: 'i-ri:fire-line', path: '/hot' },
  { name: '关注', icon: 'i-ri-user-follow-line', path: '/follow' },
  { name: '话题', icon: 'i-ri:hashtag', path: '/topic' },
  { name: '喜欢', icon: 'i-ri:heart-3-line', path: '/favorites' },
  { name: '书签', icon: 'i-ri-bookmark-line', path: '/bookmarks' },
  { name: '撰写', icon: 'i-ri:quill-pen-line', path: '/bookmarks' },
  { name: '设置', icon: 'i-ri:settings-3-line', path: '/setting' }
]
</script>

<template>
  <main flex w-full mxa lg:max-w-80rem>
    <aside class="hidden sm:flex w-1/8 md:w-1/6 lg:w-1/5 xl:w-1/4 justify-end" border="r gray-100 dark:warm-gray-800">
      <div sticky top-0 w-20 xl:w-100 h-screen flex="~ col" lt-xl-items-center>
        <div flex="~ col" overflow-y-auto justify-between h-full max-w-full mt-5>
          <div flex justify-between>
            <NuxtLink to="/" flex items-end gap-4 py2 px-5 text-2xl focus-visible:ring="2 current">
              <div hidden xl:block>
                番组 <sup text-sm italic text-secondary mt-1>beta</sup>
              </div>
            </NuxtLink>
            <div hidden xl:flex items-center me-8 mt-2>
              <div i-ri:arrow-left-line class="rtl-flip" btn-text />
            </div>
          </div>
          <nav sm:px3 flex="~ col gap2" shrink text-size-base leading-normal md:text-lg mt-4>
            <div v-for="item in menu" :key="item.name" w-fit px-4 h-10 flex items-center rounded-3 transition-100 :class="{ 'bg-#1d9bf0/10 text-#1d9bf0': route.path === item.path }" cursor="pointer" hover="bg-#1d9bf0/10 text-#1d9bf0 dark:bg-warm-gray-900 dark:text-white">
              <i :class="item.icon" inline-flex mr-3 /><span block sm:hidden xl:block>{{ item.name }}</span>
            </div>
          </nav>
          <div flex-auto />
          <div flex flex-col>
            <div hidden xl-block>
              <div v-if="userInfo?.username" p6 pb8 w-full>
                <div flex="~" items-center justify-between>
                  <NuxtLink hidden xl:block rounded-3 text-primary text-start w-full hover:bg-gray-100 cursor-pointer transition-100 to="/">
                    <div flex gap-3 md:break-words>
                      <div shrink-0 bg-base w-14 h-14 flex items-center justify-center>
                        <NuxtImg
                          width="40"
                          format="webp"
                          :src="userInfo?.avatar"
                          :alt="userInfo?.nickname || userInfo?.username" w-12 h-12 cursor="pointer" rounded="full"
                          object-cover
                        />
                      </div>
                      <div flex="~ col" shrink pt-1 h-full overflow-hidden justify-center leading-none>
                        <div flex="~" gap-2>
                          <span class="content-rich" dir="auto" font-bold line-clamp-1 ws-pre-wrap break-all text-lg>{{ userInfo?.nickname || userInfo.username }}</span>
                        </div>
                        <p line-clamp-1 whitespace-pre-wrap text-secondary-light>
                          <span text-secondary>@{{ userInfo.username }}</span>
                        </p>
                      </div>
                    </div>
                  </NuxtLink>
                  <Popover>
                    <template #open>
                      <div cursor-pointer flex justify-center items-center w-9 h-9 leading-9>
                        <i hidden xl:block i-ri:more-2-line />
                      </div>
                    </template>
                    <template #default>
                      <div cursor-pointer @click="exit">
                        退出
                      </div>
                    </template>
                  </Popover>
                </div>
              </div>
              <div v-else p8 lg:flex="~ col gap2" hidden>
                <div flex bg="#1d9bf0" text-base text-white h-9 px-4 justify-center items-center rounded-full cursor-pointer class="hover:bg-#1A8CD8 active:bg-#177CC0" @click="openLogin">
                  登录
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
    <div flex-grow>
      <slot />
    </div>
    <aside class="hidden sm:none lg:block w-1/4">
      <div sticky top-0 h-screen flex="~ col" gap-2 py3 border="l gray-100 dark:warm-gray-800">
        <div p4 pt-0 flex="~ col">
          <div relative>
            <input w-full h-9 border="gray-200 rounded dark:warm-gray-900" bg="gray-100 dark:warm-gray-900" outline="0" px-3 text="gray-600 dark:gray-300">
            <div i-carbon-search pos="absolute right-2 top-2" text="gray-400 dark:warm-gray-600" cursor="pointer" />
          </div>
        </div>
        <div flex-auto />
        <footer p4 text-sm text-secondary-light flex="~ col">
          <div flex="~ gap2" items-center mb4>
            <DarkToggle />
          </div>
          <div>版本: 0.0.1</div>
          <div>
            <NuxtLink to="/">
              关于
            </NuxtLink> · <NuxtLink to="/">
              Github
            </NuxtLink>
          </div>
        </footer>
      </div>
    </aside>
    <Dialog ref="open" title="欢迎来到 NewTab" cls="w-100">
      <Login @success="success" @close="close" @reg="openReg" />
    </Dialog>

    <Dialog ref="reg" title="注册" cls="w-100">
      <Reg @success="success" @close="closeReg" @login="openLogin" />
    </Dialog>
  </main>
</template>
