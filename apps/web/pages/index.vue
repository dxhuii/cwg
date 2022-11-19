<script setup lang="ts">
const feed = useFeedStore()
await feed.list()
const feedList = $computed(() => feed.feedList)
</script>

<template>
  <div>
    <HomeLayout>
      <div pos="relative">
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
              <Feed :data="item" />
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
