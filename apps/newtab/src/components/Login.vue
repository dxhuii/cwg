<script setup lang="ts">
import { Form } from 'vee-validate'
import CryptoJS from 'crypto-js'
import * as Yup from 'yup'
import { TextInput } from '@cwg/ui'
import { login } from '~/composables/cwg'
const emit = defineEmits<{
  (e: 'close'): void
  (e: 'reg'): void
  (e: 'success'): void
}>()

const onSubmit = async (data: any) => {
  const md5 = CryptoJS.MD5(data.password).toString()
  data.password = md5
  const user = await login(data)
  if (user) {
    localStorage.setItem('token', user.data)
    setTimeout(() => {
      emit('success')
      emit('close')
    }, 300)
  }
}

const schema = Yup.object().shape({
  username: Yup.string().required('请输入用户名'),
  password: Yup.string().min(8, '密码长度必须大于8位').required('请输入密码')
})
</script>

<template>
  <div>
    <div flex mb-4 pb-4 border="b border gray-200">
      <div w-full h-10 flex justify="center" items-center rounded-md border="~ black" hover:bg-gray-200 cursor-pointer @click="emit('reg')">
        <div i-carbon-email inline-flex w-6 h-6 mr-2 /> 通过邮箱注册
      </div>
    </div>
    <Form
      :validation-schema="schema"
      @submit="onSubmit"
    >
      <TextInput
        name="username"
        type="text"
        placeholder="请输入用户名"
      />
      <TextInput
        name="password"
        type="password"
        placeholder="请输入密码"
      />
      <div flex justify-end>
        <button type="submit" w-full flex bg="#1d9bf0" text-sm text-white h-9 px-4 justify-center items-center rounded-full cursor-pointer hover="bg-#1A8CD8" active="bg-#177CC0">
          登录
        </button>
      </div>
    </Form>
  </div>
</template>
