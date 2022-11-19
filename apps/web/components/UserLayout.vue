<script setup lang="ts">
const user = useUserStore()
const data = $computed(() => user.userInfo)
</script>

<template>
  <div>
    <div h-40 bg="gray-500" mt-16>
      222
    </div>
    <div flex="~ col" w-1200px mx="auto">
      <div mt-4 flex justify="between" items-center>
        <div flex items-center>
          <NuxtImg
            v-if="data?.avatar"
            width="80"
            height="80"
            format="webp"
            :src="data?.avatar"
            :alt="data?.nickname"
            w-20 h-20 object-cover rounded-full mr-4
          />
          <div flex-1>
            <h1>{{ data?.nickname }}</h1>
            <p>{{ data?.created_at }}</p>
          </div>
        </div>
        <div>
          <button bg="#1d9bf0" text-sm text-white h-9 px-4 justify-center items-center rounded-full cursor-pointer hover="bg-#1A8CD8" active="bg-#177CC0">
            关注
          </button>
        </div>
      </div>
      <div h-10>
        menu
      </div>
      <div flex-1>
        <slot />
      </div>
    </div>
  </div>
</template>
