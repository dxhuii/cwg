<script setup lang="ts">
import { ErrorMessage, Field, FieldArray, Form } from 'vee-validate'
import * as yup from 'yup'
const emit = defineEmits(['open', 'onImage'])
const { $Toast } = useNuxtApp()
const preview = ref(false)
const previewPic = ref()

const initialData = {
  image: [
    {
      url: '',
    },
  ],
}

const schema = yup.object().shape({
  image: yup
    .array()
    .of(
      yup.object().shape({
        url: yup.string().url().required('请输入图片地址').label('url'),
      }),
    )
    .strict(),
})

// 判断image是否有重复的url
const isRepeat = (arr: { url: string }[]) => {
  const map = new Map()
  for (const item of arr) {
    if (map.has(item.url))
      return true

    map.set(item.url, true)
  }
  return false
}

function onSubmit(values: any) {
  if (isRepeat(values.image))
    $Toast?.show?.('图片地址不能重复', { position: 'top', type: 'warning' })
  else
    emit('onImage', values)
}

const onPreview = (src: string) => {
  preview.value = true
  emit('open', true)
  previewPic.value = src
}
</script>

<template>
  <div>
    <Form
      :initial-values="initialData"
      :validation-schema="schema"
      @submit="onSubmit"
    >
      <FieldArray v-slot="{ fields, push, remove }" name="image">
        <fieldset
          v-for="(field, idx) in fields"
          :key="field.key"
          mb-4 border border-gray-300 rounded-md p-4
        >
          <legend>图片 #{{ idx + 1 }}</legend>
          <div flex="~ col">
            <div flex justify-center items-center mb-2>
              <Field
                :id="`url_${idx}`"
                :name="`image[${idx}].url`"
                type="url"
                placeholder="请输入图片地址"
                border="~ solid gray-200 rounded-md" w-full px-2 h-10
              />
              <img v-if="(field.value as any).url" :src="(field.value as any).url" class="w-10 h-10 ml-2" @click.stop="onPreview((field.value as any).url)">
              <div i-carbon-close cursor-pointer ml-2 text-lg @click="remove(idx)" />
            </div>
            <ErrorMessage :name="`image[${idx}].url`" />
          </div>
        </fieldset>
        <button mx-4 relative z-2 h-8 inline-flex items-center @click="push({ url: '' })">
          添加图片
        </button>
      </FieldArray>
      <div relative flex justify-end>
        <button type="submit" absolute class="-top-8" flex bg="#1d9bf0" text-sm text-white h-9 px-4 justify-center items-center rounded-full cursor-pointer hover="bg-#1A8CD8" active="bg-#177CC0">
          提交
        </button>
      </div>
    </Form>
    <Modal
      v-model="preview"
      title="查看图片"
      cls="z-30"
    >
      <img :src="previewPic" class="w-full">
    </Modal>
  </div>
</template>
