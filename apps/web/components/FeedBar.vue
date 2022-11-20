<script lang="ts" setup>
import { sidName } from '@cwg/types/enum'
import type { IFeed } from '@cwg/types'
const { data } = defineProps<{ data: IFeed & { [key: string]: any } }>()
const feed = useFeedStore()
const sid = data.sid as keyof typeof sidName
const model = sidName[sid]
const onAction = async (type: string) => {
  if (type === 'up') {
    const res = await feed.onDigg({ sid, aid: data[model]?.id, type: 'up' })
    console.log(res)
  }
}
</script>

<template>
  <div flex justify="between" mt-2 relative class="-left-2">
    <div flex items-center class="group" justify="center" title="评论" @click.stop="onAction('comment')">
      <div flex="~" justify="center" items-center w-9 h-9 rounded="full" group-hover="bg-#1d9bf0/10 text-#1d9bf0">
        <i i-carbon-chat w-5 h-5 />
      </div>
      <div group-hover="text-#1d9bf0" ml-1 text="sm">
        {{ data?.[model]?.comment_count || '' }}
      </div>
    </div>
    <div flex items-center class="group" title="转发" @click.stop="onAction('forward')">
      <div flex="~" justify="center" items-center w-9 h-9 rounded="full" group-hover="bg-#00ba7c/10 text-#00ba7c">
        <i i-carbon-arrows-horizontal w-5 h-5 />
      </div>
      <div group-hover="text-#00ba7c" ml-1 text="sm">
        {{ data?.[model]?.forward_count || '' }}
      </div>
    </div>
    <div flex items-center class="group" title="收藏" @click.stop="onAction('like')">
      <div flex="~" justify="center" items-center w-9 h-9 rounded="full" group-hover="bg-#f91880/10 text-#f91880">
        <i i-carbon-favorite w-5 h-5 />
      </div>
      <div group-hover="text-#f91880" ml-1 text="sm">
        {{ data?.[model]?.like_count || '' }}
      </div>
    </div>
    <div flex items-center class="group" title="赞" @click.stop="onAction('up')">
      <div flex="~" justify="center" items-center w-9 h-9 rounded="full" group-hover="bg-#f91880/10 text-#f91880">
        <i i-carbon-thumbs-up w-5 h-5 />
      </div>
      <div group-hover="text-#f91880" ml-1 text="sm">
        {{ data?.[model]?.up || '' }}
      </div>
    </div>
    <div flex items-center class="group" title="分享" @click.stop="onAction('share')">
      <div flex="~" justify="center" items-center w-9 h-9 rounded="full" group-hover="bg-#1d9bf0/10 text-#1d9bf0">
        <i i-carbon-export w-5 h-5 />
      </div>
    </div>
  </div>
</template>
