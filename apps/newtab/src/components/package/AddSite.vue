<script setup lang="ts">
import { Form } from 'vee-validate'
import * as Yup from 'yup'
import type { ILink, IList } from '@cwg/types'
import { getLink, getList } from '~/composables/cwg'
const tabList = [
  {
    name: '网址',
    key: 'site'
  },
  {
    name: '小工具',
    key: 'tool'
  },
  {
    name: '自定义',
    key: 'diy'
  }
]
const data = ref<IList[]>()
const list = ref<ILink[]>()
const tab = ref<string>('site')
const site = ref<number>()

const getLinkList = async (cid: number) => {
  const r = await getLink({
    pageSize: 20,
    cid
  })
  console.log(r)
  list.value = r.data.list
}

watchEffect(async () => {
  const r = await getList({ pid: 4 })
  console.log(r, { pid: 4 })
  data.value = r.data
  if (r.data.length > 0) {
    getLinkList(r.data[0].id!)
    site.value = r.data[0].id!
  }
})

const onTab = (key: string) => {
  tab.value = key
}

const onSite = (cid: number) => {
  if (cid > 0)
    getLinkList(cid)

  site.value = cid
}

const onSubmit = async (data: any) => {
  console.log(data)
}

const schema = Yup.object().shape({
  url: Yup.string().required('请输入网站地址'),
  name: Yup.string().required('请输入网站名称'),
  icon: Yup.string().required('请上传网站图标'),
  color: Yup.string().required('请选择图标颜色')
})
</script>

<template>
  <div class="border-t border-gray-200 relative -mx-4 flex">
    <div class="w-32 border-r border-gray-200">
      <div v-for="item in tabList" :key="item.key" mt-2 mr-2 px-4 py-2 rounded-2 cursor-pointer hover="bg-gray-200 transition-all" :class="{ 'bg-gray-200': tab === item.key }" @click="onTab(item.key)">
        {{ item.name }}
      </div>
    </div>
    <div class="flex-1 px-4 flex-grow">
      <div v-if="tab === 'diy'" class="w-full">
        <div py-6>
          <Form
            :validation-schema="schema"
            @submit="onSubmit"
          >
            <TextInput name="url" type="text" placeholder="网站地址" />
            <TextInput name="name" type="text" placeholder="网站名称" />
            <TextInput name="icon" type="text" placeholder="网站图标" />
            <TextInput name="color" type="text" placeholder="图标颜色" />
            <button type="submit" w-full flex bg="#1d9bf0" text-sm text-white h-9 px-4 justify-center items-center rounded-full cursor-pointer hover="bg-#1A8CD8" active="bg-#177CC0">
              保存
            </button>
          </Form>
        </div>
      </div>
      <div v-if="tab === 'site'">
        <div flex justify-between pt-4 pb-2>
          <div text-base>
            网站导航
          </div>
          <div><input name="name" type="text" placeholder="网站名称、域名" border="~ gray-200" rounded-2 h-8 px-2></div>
        </div>
        <div flex="~ wrap" border="b gray-200" pb-2>
          <div v-for="item in data" :key="item.id" mr-1 px-4 py-1 rounded-2 cursor-pointer hover="bg-gray-200 transition-all" :class="{ 'bg-gray-200': site === item.id }" @click="onSite(item.id!)">
            {{ item.name }}
          </div>
        </div>
        <div flex>
          <div v-for="item in list" :key="item.id" my-2 mr-4 ml-0 class="w-20 h-24 cursor-pointer text-gray-600 text-center text-sm">
            <img :src="item.icon" :alt="item.name" block w-full rounded-2xl mb-2>
            {{ item.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
