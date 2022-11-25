<script setup lang="ts">
import type { IUser } from '@cwg/types'
import { getUserInfo } from '~/composables/cwg'

const openSet = ref(false)
const userInfo = ref<IUser>()
const open = ref(false)
const tab = ref(0)

const close = () => {
  open.value = false
}

const closeSet = () => {
  openSet.value = false
}

const success = async () => {
  const info = await getUserInfo()
  userInfo.value = info.data
}

const avatar = computed(() => userInfo.value?.avatar ?? 'https://tva1.sinaimg.cn/large/006bnWk0gy1gzd2ej5yzyj301c01cgld.jpg')

watchEffect(() => {
  success()
})

const logout = async () => {
  await logout()
  success()
  closeSet()
}
</script>

<template>
  <div class="fixed top-9 right-9 flex bg-gray-200 cursor-pointer text-gray-500 rounded-full overflow-hidden">
    <div class="w-6 h-6">
      <img v-if="userInfo?.id" class="w-6 h-6" :src="avatar" @click="openSet = true">
      <heroicons-outline-user-circle v-else class="w-6 h-6" @click="open = true" />
    </div>
  </div>
  <Modal :visible="open" title="登录" @close="close">
    <Login @success="success" @close="close" />
  </Modal>
  <Modal :visible="openSet" title="设置" @close="closeSet">
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
      <div class="p-3 bg-gray-200 flex-1 rounded-md">
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
          <div class="flex rounded-md bg-white p-2 mt-2 cursor-pointer" @click="logout">
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
  </Modal>
</template>
