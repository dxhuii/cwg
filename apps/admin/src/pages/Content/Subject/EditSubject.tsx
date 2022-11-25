import type { ISubject } from '@cwg/types'
import { CloseOutlined, SnippetsOutlined } from '@ant-design/icons'
import type { ActionType, ProFormInstance } from '@ant-design/pro-components'
import {
  ModalForm,
  ProCard,
  ProForm,
  ProFormCheckbox,
  ProFormDatePicker,
  ProFormDependency,
  ProFormDigit,
  ProFormList,
  ProFormRate,
  ProFormSelect,
  ProFormSwitch,
  ProFormText,
  ProFormTextArea,
  ProFormTimePicker
} from '@ant-design/pro-components'
import { useModel } from '@umijs/max'
import { Button, Cascader, Form, message } from 'antd'
import moment from 'moment'
import type { FC } from 'react'
import { useEffect, useMemo, useRef, useState } from 'react'
import useDouban from '@/utils/hooks/useDouban'
import useBilibili from '@/utils/hooks/useBilibili'
import { areaEnum, getListFormat, languageEnum, modelName, statusType } from '@/utils'
import { getVideo } from '@/services/video'
import { subjectAdd, subjectDetail, subjectName } from '@/services/subject'
import UploadImage from '@/components/Upload'

const { Item } = Form

interface IEdit {
  actionRef: React.MutableRefObject<ActionType | undefined>
  visible: boolean
  setVisible: (visible: boolean) => void
  setEditData: (data: ISubject | undefined) => void
  editData: ISubject | undefined
}

const SubjectEdit: FC<IEdit> = props => {
  const formRef = useRef<ProFormInstance<ISubject>>()
  const [loading, setLoading] = useState(false)
  const { categoryList, getCategoryList } = useModel('useList')
  const { mcat, getMcat } = useModel('useMcat')
  const { play, getPlay } = useModel('usePlay')
  const { actionRef, visible, setVisible, setEditData, editData } = props
  const { biliLoading, getBilibili } = useBilibili()
  const { doubanLoading, getDoubanDetail } = useDouban()

  useEffect(() => {
    getMcat()
  }, [getMcat])

  useEffect(() => {
    getCategoryList()
  }, [getCategoryList])

  useEffect(() => {
    getPlay()
  }, [getPlay])

  const playEunm = useMemo(() => {
    return play.reduce((obj, item) => {
      obj[item.title!] = item.name
      return obj
    }, {}) as Record<string, string>
  }, [play])

  const getMedia = async (index: number) => {
    setLoading(true)
    const playArr = formRef.current?.getFieldValue('play')
    const { title, id } = playArr[index] || {}
    const res = await getVideo({ title, id })
    if (res.data) {
      playArr[index].urls = res.data.join('')
      formRef.current?.setFieldsValue({ play: playArr })
    }
    setLoading(false)
  }

  const findMcid = (arr: string[]) => {
    return mcat.reduce((list, item) => {
      if (arr.includes(item.name))
        list.push(item.id!)

      return list
    }, [] as (string | number)[])
  }

  const getBili = async (index: number) => {
    const playArr = formRef.current?.getFieldValue('play')
    const { id } = playArr[index] || {}
    const params = await getBilibili(id, findMcid)
    formRef.current?.setFieldsValue(params)
  }

  const getDouban = async () => {
    const id = formRef.current?.getFieldValue('douban')
    const params = await getDoubanDetail(id, findMcid)
    console.log(params, 'douban')
    formRef.current?.setFieldsValue(params)
  }

  return (
    <ModalForm<ISubject>
      autoFocusFirstInput
      formRef={formRef}
      layout='horizontal'
      modalProps={{
        onCancel: () => {
          formRef.current?.resetFields()
          setEditData(undefined)
        }
      }}
      onFinish={async values => {
        console.log(values)
        const res = await subjectAdd({ ...values, id: editData?.id })
        if (res.status === 200) {
          if (editData?.id)
            message.success('修改成功')

          else
            message.success('添加成功')

          formRef.current?.resetFields()
          actionRef.current?.reload()
          return true
        }
        else {
          message.error(res.message)
          return false
        }
      }}
      onVisibleChange={setVisible}
      request={async () => {
        let data = {} as ISubject
        if (editData?.id) {
          const subject = await subjectDetail({ id: editData?.id })
          data = subject.data
        }
        return data
      }}
      title={editData?.id ? editData.name : '新建'}
      visible={visible}
      width={1340}>
      <ProForm.Group size={5}>
        <Item label='分类' name='cid' required={false} rules={[{ required: true }]}>
          <Cascader options={getListFormat(categoryList)} placeholder='分类' style={{ width: 120 }} />
        </Item>
        <ProFormSelect name='area' placeholder='地区' valueEnum={areaEnum} width={100} />
        <ProFormSelect name='language' placeholder='语言' valueEnum={languageEnum} width={90} />
        <ProFormDatePicker fieldProps={{ picker: 'year', format: 'YYYY' }} name='year' placeholder='年份' width={90} />
        <ProFormText name='letter' placeholder='首字母' width={90} />
        <ProFormText name='letters' placeholder='拼音' width={150} />
        <ProFormDigit name='length' placeholder='片长' width={80} />
        <ProFormSelect name='status' placeholder='状态' valueEnum={statusType} width={90} />
        <ProFormSwitch label='是否放送' name='broadcast' />
        <ProFormSwitch label='是否完结' name='isend' />
      </ProForm.Group>
      <ProFormCheckbox.Group
        label='小类'
        name='mcid'
        options={mcat.map(item => {
          return { label: item.name, value: item.id! }
        })} />
      <ProForm.Group size={5}>
        <ProFormText
          fieldProps={{
            onBlur: async e => {
              const name = e.target.value
              if (name) {
                const result = await subjectName({ name })
                if (result.data)
                  return message.warn('名称已存在')
              }
            }
          }}
          label='名称'
          name='name'
          placeholder='名称'
          required={false}
          rules={[{ required: true }]}
          width='lg' />
        <ProFormText name='foreign' placeholder='外文名' width='lg' />
        <ProFormDatePicker fieldProps={{ format: 'YYYY-MM-DD' }} name='filmtime' placeholder='上映日期' width={150} />
        <ProFormTimePicker
          fieldProps={{ format: 'HH:mm' }}
          getValueProps={value => {
            return {
              value: value ? moment(value, 'HH:mm') : null
            }
          }}
          name='time'
          placeholder='放送时间'
          width={110} />
      </ProForm.Group>
      <ProFormText label='别名' name='aliases' placeholder='别名' />
      <ProFormText label='配音' name='star' placeholder='配音' />
      <ProForm.Group size={5}>
        <ProFormText label='标签' name='tag' placeholder='标签' width='lg' />
        <ProFormText name='original' placeholder='原作' />
        <ProFormText name='director' placeholder='监督/导演' />
        <ProFormText name='company' placeholder='动画制作' />
        <ProFormText name='title' placeholder='副标题' />
      </ProForm.Group>
      <ProForm.Group size={5}>
        <ProFormSelect
          label='星期'
          mode='tags'
          name='weekday'
          placeholder='星期'
          valueEnum={{
            1: '一',
            2: '二',
            3: '三',
            4: '四',
            5: '五',
            6: '六',
            7: '日'
          }}
          width={180} />
        <ProFormSelect
          name='prty'
          placeholder='推荐级别'
          valueEnum={{
            home: '首页推荐',
            list: '列表推荐',
            thumb: '封面推荐',
            quarter: '季番推荐'
          }}
          width={120} />
        <ProFormText name='label' placeholder='关联别名' width={150} />
        <ProFormDigit name='serialized' placeholder='连载' width={80} />
        <ProFormDigit name='total' placeholder='总集数' width={80} />
        <ProFormDigit name='gold' placeholder='评分' width={60} />
        <ProFormText name='douban' placeholder='豆瓣' width={130} />
        <ProFormText name='imdb' placeholder='IMDB' width={130} />
        <Button loading={doubanLoading} onClick={getDouban} type='link'>
          获取
        </Button>
      </ProForm.Group>
      <ProForm.Group size={5}>
        <ProFormText label='官网' name='website' placeholder='官网' width='lg' />
        <ProFormText name='baike' placeholder='百科' width='lg' />
      </ProForm.Group>
      <ProForm.Group>
        <Item label='封面' name='pic' required={false} rules={[{ required: true }]}>
          <UploadImage sid={modelName.SUBJECT} />
        </Item>
        <Item label='小图' name='pic_thumb'>
          <UploadImage sid={modelName.SUBJECT} />
        </Item>
        <Item label='大图' name='bigpic'>
          <UploadImage sid={modelName.SUBJECT} />
        </Item>
        <Item label='背景' name='bg'>
          <UploadImage sid={modelName.SUBJECT} />
        </Item>
        <ProFormText fieldProps={{ type: 'color' }} label='文字颜色' name='color' placeholder='文字颜色' width={110} />
        <ProFormText fieldProps={{ type: 'color' }} label='背景色' name='bg_color' placeholder='背景色' width={110} />
      </ProForm.Group>
      <ProFormList
        actionGuard={{
          beforeAddRow: async (defaultValue, insertIndex, count) => {
            return new Promise(resolve => {
              console.log(defaultValue, insertIndex, count)
              setTimeout(() => resolve(true), 100)
            })
          },
          beforeRemoveRow: async (index, count) => {
            console.log('--->', index, count)
            return new Promise(resolve => {
              if (index === 0) {
                resolve(false)
                return
              }
              setTimeout(() => resolve(true), 100)
            })
          }
        }}
        copyIconProps={{
          Icon: SnippetsOutlined
        }}
        creatorRecord={{
          title: 'bilibili'
        }}
        deleteIconProps={{
          Icon: CloseOutlined
        }}
        itemRender={({ listDom, action }, { record, index }) => {
          return (
            <ProCard
              bordered
              extra={
                <div style={{ display: 'flex' }}>
                  <Button loading={loading} onClick={() => getMedia(index)} type='link'>
                    获取
                  </Button>
                  {record?.title === 'bilibili' && (
                    <Button loading={biliLoading} onClick={() => getBili(index)} type='link'>
                      获取信息
                    </Button>
                  )}
                  {action}
                </div>
              }
              style={{
                marginBottom: 8
              }}
              title={playEunm[record?.title]}>
              {listDom}
            </ProCard>
          )
        }}
        max={4}
        min={1}
        name='play'>
        <ProForm.Group key='group'>
          <ProFormSelect key='title' label='来源' name='title' valueEnum={playEunm} width='md' />
          <ProFormText key='id' label='源id' name='id' width='md' />
        </ProForm.Group>
        <ProFormTextArea fieldProps={{ rows: 6 }} key='urls' label='链接' name='urls' placeholder='链接' width={1200} />
      </ProFormList>
      <ProFormTextArea fieldProps={{ rows: 6 }} label='简介' name='content' placeholder='简介' />
      <ProFormSwitch label='是否显示更多' name='isShowMore' />
      <ProFormDependency name={['isShowMore']}>
        {({ isShowMore }) => {
          if (isShowMore) {
            return (
              <>
                <ProFormTextArea label='简评' name='remark' placeholder='简评' />
                <ProFormTextArea label='其他' name='other' placeholder='其他' />
                <ProForm.Group>
                  <ProFormText label='标题' name='seo_title' placeholder='seo标题' />
                  <ProFormText label='关键字' name='seo_keywords' placeholder='seo关键字' />
                  <ProFormText label='跳转链接' name='jumpurl' placeholder='跳转链接' width='lg' />
                  <ProFormRate label='星级' name='stars' />
                </ProForm.Group>
                <ProFormTextArea label='简介' name='seo_description' placeholder='seo简介' />
                <ProForm.Group>
                  <ProFormDatePicker fieldProps={{ format: 'YYYY-MM-DD HH:mm:ss' }} label='更新' name='updated_at' placeholder='更新时间' />
                  <ProFormDatePicker fieldProps={{ format: 'YYYY-MM-DD HH:mm:ss' }} label='创建' name='created_at' placeholder='更新时间' />
                  <ProFormDigit label='访问' name='hits' placeholder='总' width='xs' />
                  <ProFormDigit label='日' name='hits_day' placeholder='日' width='xs' />
                  <ProFormDigit label='周' name='hits_week' placeholder='周' width='xs' />
                  <ProFormDigit label='月' name='hits_month' placeholder='月' width='xs' />
                  <ProFormDigit label='顶' name='up' placeholder='顶' width='xs' />
                  <ProFormDigit label='踩' name='down' placeholder='踩' width='xs' />
                  <ProFormText name='uid' placeholder='用户id' width='xs' />
                  <ProFormText name='inputer' placeholder='发布人' width='xs' />
                </ProForm.Group>
              </>
            )
          }
          return null
        }}
      </ProFormDependency>
    </ModalForm>
  )
}

export default SubjectEdit
