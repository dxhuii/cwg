<script setup lang="ts">
const current = ref<number>(1)
const el = ref<HTMLElement>()
const wY = ref(0)
const feed = useFeedStore()
await feed.list()
const feedList = $computed(() => feed.feedList)
const { y } = useWindowScroll()

watchEffect(async () => {
  const windowH = process.client ? document.documentElement.clientHeight || document.body.clientHeight : 0
  if (el.value) {
    if (windowH > el.value.getBoundingClientRect().bottom && !feed.feedMore) {
      console.log('到底了')
      await feed.list({ current: current.value + 1 })
      console.log('加载完成')
      current.value++
    }
  }
  wY.value = y.value
})
</script>

<template>
  <div>
    <HomeLayout>
      <div ref="el" pos="relative">
        <Chat />
        <DynamicScroller
          :items="feedList"
          :buffer="500"
          :min-item-size="50"
          :prerender="20"
          :page-mode="true"
        >
          <template #default="{ item, index, active }">
            <DynamicScrollerItem
              :item="item"
              :active="active"
              :size-dependencies="[
                item.name,
              ]"
              :data-index="index"
            >
              <Feed :data="item" />{{ current }}
            </DynamicScrollerItem>
          </template>
        </DynamicScroller>
      </div>
    </HomeLayout>
  </div>
</template>

<style>
.scroller {
  height: 100%;
}
</style>
