<script lang="ts" setup>
import type { IFeed } from '@cwg/types'
import { FeedType, sidName } from '@cwg/types/enum'
const { data } = defineProps<{ data: IFeed & { [key: string]: any } }>()

const items = [
  { label: '剧集', key: 'subject' },
  { label: '评论', key: 'comment' },
  { label: '动态', key: 'feed' },
  { label: '退出', key: 'logout' },
]

const onOk = async (item: typeof items[0]) => {
  console.log(item)
}
const sid = data.sid as keyof typeof sidName
const model = sidName[sid]
</script>

<template>
  <div flex justify="between">
    <div flex="~ col">
      <div>
        <b text="warm-gray-700" @click.stop="go('user', data.user?.id)">{{ data.user?.nickname }}</b>
        <span mx-1>{{ FeedType[data.type] }}</span>
        <span text="warm-gray-700" @click.stop="go(model, data?.[model]?.id)">{{ data?.[model]?.name || '动态' }}</span>
      </div>
      <div text="gray-500 sm">
        <span>{{ data.time }}</span>
        <span mx-1>·</span>
        <span>web</span>
      </div>
    </div>
    <Dropdown :menu="items" @onOk="onOk">
      <div w-9 h-9 flex justify="center" items-center hover="bg-#1d9bf0/10 text-#1d9bf0" rounded="full">
        <div i-carbon-overflow-menu-horizontal />
      </div>
    </Dropdown>
  </div>
</template>
