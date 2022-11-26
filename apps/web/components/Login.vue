<script setup lang="ts">
import { Form } from 'vee-validate'
import * as Yup from 'yup'
import md5 from 'md5'

const props = defineProps<{ getUser: () => void }>()
const emit = defineEmits(['close', 'reg', 'getUser'])
const onSubmit = async (values: any) => {
  const res = await login({ ...values, password: md5(values.password!) })
  localStorage.token = res.data
  props.getUser()
  emit('close')
}

// Using yup to generate a validation schema
// https://vee-validate.logaretm.com/v4/guide/validation#validation-schemas-with-yup
const schema = Yup.object().shape({
  username: Yup.string().required('请输入用户名'),
  password: Yup.string().min(8, '密码长度必须大于8位').required('请输入密码')
})
</script>

<template>
  <div>
    <Form
      :validation-schema="schema"
      class="p-4 pt-0"
      @submit="onSubmit"
    >
      <TextInput
        name="username"
        type="text"
        label="用户名"
        placeholder="请输入用户名"
      />
      <TextInput
        name="password"
        type="password"
        label="密码"
        placeholder="请输入密码"
      />
      <div flex justify-end>
        <button type="submit" w-20 flex bg="#1d9bf0" text-sm text-white h-9 px-4 justify-center items-center rounded-full cursor-pointer hover="bg-#1A8CD8" active="bg-#177CC0">
          登录
        </button>
      </div>
      <div class="flex justify-end mt-4">
        还没有注册？点击<a text="#1d9bf0" cursor-pointer @click="emit('reg')">注册</a>
      </div>
    </Form>
  </div>
</template>
