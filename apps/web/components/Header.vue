<script setup lang="ts">
import type { IUser } from '~~/typings'

const isLogin = ref(false)
const isReg = ref(false)
const userInfo = ref<IUser>()
const getUser = async () => {
  const res = await getUserInfo()
  userInfo.value = res.data
}

watchEffect(() => {
  getUser()
})

const items = [
  { label: '剧集', key: 'subject' },
  { label: '评论', key: 'comment' },
  { label: '动态', key: 'feed' },
  { label: '退出', key: 'logout' },
]

const onOk = async (item: typeof items[0]) => {
  console.log(item)
  if (item.key === 'logout') {
    const res = await logout()
    if (res.data)
      userInfo.value = undefined
  }
}
</script>

<template>
  <div border="b gray-100 dark:warm-gray-800" z-10 bg="white/85 dark:#121212/85" pos="fixed left-0 right-0 top-0" backdrop="blur-md">
    <div w-1200px mx="auto">
      <div h-16 flex justify="between" items-center>
        <div flex justify="center" items-center>
          <NuxtLink to="/">
            <div w-12 text="xl gray-700" dark="text-white">
              cwg
            </div>
          </NuxtLink>
          <DarkToggle />
        </div>
        <div relative>
          <input w-96 h-9 border="gray-200 rounded dark:warm-gray-900" bg="gray-100 dark:warm-gray-900" outline="0" px-3 text="gray-600 dark:gray-300">
          <div i-carbon-search pos="absolute right-2 top-2" text="gray-400 dark:warm-gray-600" cursor="pointer" />
        </div>
        <div v-if="userInfo?.username">
          <Dropdown :menu="items" trigger="hover" @onOk="onOk">
            <NuxtImg
              width="40"
              format="webp"
              :src="userInfo?.avatar"
              :alt="userInfo?.nickname" w-10 h-10 cursor="pointer" rounded="full"
              object-cover
            />
          </Dropdown>
        </div>
        <div v-else @click="isLogin = true">
          登录
        </div>
      </div>
      <Modal
        v-model="isLogin"
        title="登录"
      >
        <Login :get-user="getUser" @close="isLogin = false" @reg="{ isLogin = false; isReg = true }" />
      </Modal>

      <Modal
        v-model="isReg"
        title="注册"
      >
        <Reg :get-user="getUser" @close="isReg = false" @login="isLogin = true; isReg = false" />
      </Modal>
    </div>
  </div>
</template>
