<script setup lang="ts">
import { ErrorMessage, Field, Form } from 'vee-validate'
import CryptoJS from 'crypto-js'
import { apiFetch } from '~/utils/fetch'
const emit = defineEmits(['success', 'close'])

const schema = {
  username(value: string) {
    if (!value)
      return '请输入用户名'
    if (value.length < 3)
      return '用户名长度不能小于3'
    return true
  },
  password(value: string) {
    if (!value)
      return '请输入密码'
    if (value.length < 6)
      return '密码长度不能小于6'
    return true
  },
}

const onSubmit = async (data: any) => {
  const md5 = CryptoJS.MD5(data.password).toString()
  data.password = md5
  const user = await apiFetch<{ data: string }>('user/login', { method: 'post', body: { ...data } })
  if (user) {
    localStorage.setItem('token', user.data)
    setTimeout(() => {
      emit('success')
      emit('close')
    }, 300)
  }
}
</script>

<template>
  <Form :validation-schema="schema" @submit="onSubmit">
    <div class="grid grid-cols-6 gap-2 mt-4">
      <div class="col-span-6">
        <label for="username" class="block text-base text-gray-700">用户名</label>
        <Field v-slot="{ handleChange, value }" name="username">
          <input :value="value" name="username" type="text" class="mt-4 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 border rounded-md p-3" @input="handleChange">
        </Field>
        <ErrorMessage name="username" class="col-span-6 text-red-600" />
      </div>
      <div class="col-span-6">
        <label for="password" class="block text-base text-gray-700">密码</label>
        <Field v-slot="{ handleChange, value }" name="password">
          <input :value="value" name="password" type="password" class="mt-4 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 border rounded-md p-3" @input="handleChange">
        </Field>
        <ErrorMessage name="password" class="col-span-6 text-red-600" />
      </div>
      <div class="col-span-6">
        <button class="flex justify-center w-full mt-4 py-2 px-4 border border-transparent shadow-sm text-sm rounded-md text-white bg-sky-700 hover:bg-sky-800 active:bg-sky-900">
          登录
        </button>
      </div>
    </div>
  </Form>
</template>
