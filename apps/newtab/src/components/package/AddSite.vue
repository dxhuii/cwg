<script setup lang="ts">
import { ErrorMessage, Field, Form } from 'vee-validate'
import { apiFetch } from '../../utils/fetch'
import type { ILink, IList } from '../../utils/type'
defineProps<{ visible: boolean; title?: string }>()
const emit = defineEmits(['close', 'success'])
const data = ref<IList[]>()
const list = ref<ILink[]>()
const tab = ref<number>(0)

const close = () => {
  emit('close')
}

const getList = async (cid: number) => {
  const r = await apiFetch<{ data: { list: ILink[] } }>('link/list', {
    params: {
      pageSize: 20,
      cid
    }
  })
  list.value = r.data.list
}

watchEffect(async () => {
  const r = await apiFetch<{ data: IList[] }>('list/list', {
    params: {
      pid: 4
    }
  })
  data.value = r.data
  if (r.data[0]) {
    getList(r.data[0].id)
    tab.value = r.data[0].id
  }
})

const onTab = (cid: number) => {
  tab.value = cid
  if (cid > 0)
    getList(cid)
}

const schema = {
  name(value: string) {
    if (!value)
      return '请输入用户名'
    if (value.length < 3)
      return '用户名长度不能小于3'
    return true
  },
  icon(value: string) {
    if (!value)
      return '请输入密码'
    if (value.length < 6)
      return '密码长度不能小于6'
    return true
  }
}

const onSubmit = async (data: any) => {
  console.log(data, '22222')
}
</script>

<template>
  <Modal :visible="visible" title="添加网址" class-name="min-w-3xl" @close="close">
    <div class="border-t border-gray-200 relative -mx-4 flex">
      <div class="w-40 border-r border-gray-200">
        <div class="h-8 leading-8 pl-4 cursor-pointer hover:bg-blue-600 hover:text-white" :class="{ 'bg-blue-600 text-white': tab === -1 }" @click="onTab(-1)">
          自定义网址
        </div>
        <div v-for="item in data" :key="item.id" class="h-8 leading-8 pl-4 cursor-pointer hover:bg-blue-600 hover:text-white" :class="{ 'bg-blue-600 text-white': tab === item.id }" @click="onTab(item.id)">
          {{ item.name }}
        </div>
      </div>
      <div class="flex-1 px-4 flex">
        <template v-for="item in list" :key="item.id">
          <div v-if="tab > 0" class="w-20 h-24 cursor-pointer m-3 text-gray-600 text-center text-sm">
            <img :src="item.icon" :alt="item.name" class="w-20 h-20 rounded-2xl overflow-hidden mb-2">
            {{ item.name }}
          </div>
        </template>
        <div v-if="tab < 0" class="w-full">
          <Form :validation-schema="schema" @submit="onSubmit">
            <div class="grid gap-2 mt-4">
              <div class="col-span">
                <label for="url" class="block text-base text-gray-700">网站地址</label>
                <Field v-slot="{ handleChange, value }" name="url">
                  <input :value="value" name="url" type="url" class="mt-4 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 border rounded-md p-3" @input="handleChange">
                </Field>
                <ErrorMessage name="url" class="col-span-6 text-red-600" />
              </div>
              <div class="col-span">
                <label for="name" class="block text-base text-gray-700">网站名称</label>
                <Field v-slot="{ handleChange, value }" name="name">
                  <input :value="value" name="name" type="text" class="mt-4 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 border rounded-md p-3" @input="handleChange">
                </Field>
                <ErrorMessage name="name" class="col-span-6 text-red-600" />
              </div>
              <div class="col-span">
                <label for="icon" class="block text-base text-gray-700">网站图标</label>
                <Field v-slot="{ handleChange, value }" name="icon">
                  <input :value="value" name="icon" type="text" class="mt-4 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 border rounded-md p-3" @input="handleChange">
                </Field>
                <ErrorMessage name="icon" class="col-span-6 text-red-600" />
              </div>
              <div class="col-span">
                <label for="color" class="block text-base text-gray-700">图标颜色</label>
                <Field v-slot="{ handleChange, value }" name="color">
                  <input :value="value" name="color" type="color" class="mt-4 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 border rounded-md p-3" @input="handleChange">
                </Field>
                <ErrorMessage name="color" class="col-span-6 text-red-600" />
              </div>
              <div class="col-span">
                <button class="flex justify-center w-full mt-4 py-2 px-4 border border-transparent shadow-sm text-sm rounded-md text-white bg-sky-700 hover:bg-sky-800 active:bg-sky-900">
                  登录
                </button>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  </Modal>
</template>
