<script setup lang="ts">
import { Form } from 'vee-validate'
import * as Yup from 'yup'
import type { ICaptcha } from '@cwg/types'
const props = defineProps({
  getUser: {
    type: Function,
    default: () => {}
  }
})
const emit = defineEmits(['close', 'login', 'getUser'])
const code = ref<ICaptcha>()
const onSubmit = async (values: any) => {
  await reg({ ...values, token: code.value?.token })
  await props.getUser()
  await emit('close')
}

function onInvalidSubmit() {
  const submitBtn = document.querySelector('.submit-btn') as HTMLDivElement
  submitBtn.classList.add('invalid')
  setTimeout(() => {
    submitBtn.classList.remove('invalid')
  }, 1000)
}

// Using yup to generate a validation schema
// https://vee-validate.logaretm.com/v4/guide/validation#validation-schemas-with-yup
const schema = Yup.object().shape({
  username: Yup.string().min(6, '用户名必须大于6位').required('请输入用户名'),
  email: Yup.string().email('邮箱地址不正确').required('请输入邮箱'),
  password: Yup.string().min(8, '密码长度必须大于8位').required('请输入密码'),
  confirm_password: Yup.string()
    .required('请再次输入密码')
    .oneOf([Yup.ref('password')], '两次输入的密码不一致'),
  captcha: Yup.string().required('请输入验证码')
})

const getCode = async () => {
  const { data } = await captcha()
  code.value = data
}

watchEffect(() => {
  getCode()
})
</script>

<template>
  <div>
    <Form
      :validation-schema="schema"
      class="p-4 pt-0"
      @submit="onSubmit"
      @invalidSubmit="onInvalidSubmit"
    >
      <TextInput
        name="username"
        type="text"
        label="用户名"
        placeholder="请输入用户名"
      />
      <TextInput
        name="email"
        type="email"
        label="邮箱"
        placeholder="请输入邮箱"
      />
      <TextInput
        name="password"
        type="password"
        label="密码"
        placeholder="请输入密码"
      />
      <TextInput
        name="confirm_password"
        type="password"
        label="确认密码"
        placeholder="请再次输入密码"
      />
      <div class="flex mt-4 items-start">
        <TextInput
          name="captcha"
          type="text"
          label="验证码"
          placeholder="请输入验证码"
        />
        <div pb="1" pl="4" @click="getCode" v-html="code?.image" />
      </div>
      <button type="submit" mt-2 w-full flex bg="#1d9bf0" text-sm text-white h-9 px-4 justify-center items-center rounded-full cursor-pointer hover="bg-#1A8CD8" active="bg-#177CC0">
        注册
      </button>
    </Form>
  </div>
</template>
