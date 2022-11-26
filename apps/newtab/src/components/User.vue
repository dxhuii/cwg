<script setup lang="ts">
import type { IUser } from '@cwg/types'
import { Dialog } from '@cwg/ui'
import { getUserInfo, logout } from '~/composables/cwg'

const userInfo = ref<IUser>()
const tab = ref(0)
const openSet = ref()
const open = ref()

const close = () => {
  open.value.closeModal()
}

const closeSet = () => {
  openSet.value.closeModal()
}

const success = async () => {
  const info = await getUserInfo()
  userInfo.value = info.data
}

const avatar = computed(() => userInfo.value?.avatar)
const onLogin = () => {
  if (userInfo.value?.id)
    openSet.value.openModal()

  else
    open.value.openModal()
}

watchEffect(() => {
  success()
})

const exit = async () => {
  await logout()
  success()
  closeSet()
}
</script>

<template>
  <div>
    <div class="fixed top-9 right-9 flex justify-center items-center bg-gray-200 cursor-pointer text-gray-500 rounded-full overflow-hidden p-1 px-2" @click="onLogin">
      <img v-if="userInfo?.id" class="w-5 h-5 mr-2 rounded-1" :src="avatar">
      <heroicons-outline-user-circle v-else class="w-6 h-6" />
      {{ userInfo?.id ? userInfo.username : '登录' }}
    </div>
    <Dialog ref="open" title="欢迎来到 NewTab">
      <Login @success="success" @close="close" />
    </Dialog>
    <Dialog ref="openSet" title="设置" cls="w-248">
      <div class="flex mt-4 -left-2 relative">
        <div class="flex w-32 mr-2 flex-col">
          <div class="flex justify-start items-center hover:bg-cang-3 p-2 rounded-sm" :class="{ 'bg-gray-100': tab === 0 }" @click="tab = 0">
            <img :src="avatar" class="mr-2 w-6 h-6 rounded-sm">
            {{ userInfo?.username }}
          </div>
          <div class="flex justify-start items-center hover:bg-cang-3 p-2 rounded-sm" :class="{ 'bg-gray-100': tab === 1 }" @click="tab = 1">
            <div class="flex justify-center items-center mr-2 w-6 h-6 rounded-sm ">
              <heroicons-outline-photograph class="w-5 h-5" />
            </div>
            壁纸
          </div>
          <div class="flex justify-start items-center hover:bg-cang-3 p-2 rounded-sm" :class="{ 'bg-gray-100': tab === 2 }" @click="tab = 2">
            <div class="flex justify-center items-center mr-2 w-6 h-6 rounded-sm ">
              <heroicons-outline-information-circle class="w-5 h-5" />
            </div>
            关于
          </div>
        </div>
        <div class="p-3 bg-gray-200 flex-1 rounded-md overflow-y-auto">
          <template v-if="tab === 0">
            <div class="flex rounded-md bg-white p-2">
              <img :src="avatar" class="mr-2 w-9 h-9 rounded-sm">
              <div class="leading-4 pt-[2px]">
                {{ userInfo?.username }}
                <div class="text-sm text-cang-400">
                  {{ userInfo?.email }}
                </div>
              </div>
            </div>
            <div class="flex rounded-md bg-white p-2 mt-2 cursor-pointer" @click="exit">
              退出
            </div>
          </template>
          <template v-if="tab === 1">
            1
          </template>
          <template v-if="tab === 2">
            2
          </template>
        </div>
      </div>
    </Dialog>
  </div>
</template>
