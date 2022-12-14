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
import dayjs from 'dayjs'
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
      if (item.title)
        obj[item.title] = item.name
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
            message.success('????????????')

          else
            message.success('????????????')

          formRef.current?.resetFields()
          actionRef.current?.reload()
          return true
        }
        else {
          message.error(res.message)
          return false
        }
      }}
      onOpenChange={setVisible}
      open={visible}
      request={async () => {
        let data = {} as ISubject
        if (editData?.id) {
          const subject = await subjectDetail({ id: editData?.id })
          data = subject.data
        }
        return data
      }}
      title={editData?.id ? editData.name : '??????'}
      width={1340}>
      <ProForm.Group size={5}>
        <Item label='??????' name='cid' required={false} rules={[{ required: true }]}>
          <Cascader options={getListFormat(categoryList)} placeholder='??????' style={{ width: 120 }} />
        </Item>
        <ProFormSelect name='area' placeholder='??????' valueEnum={areaEnum} width={100} />
        <ProFormSelect name='language' placeholder='??????' valueEnum={languageEnum} width={90} />
        <ProFormDatePicker fieldProps={{ picker: 'year', format: 'YYYY' }} name='year' placeholder='??????' width={90} />
        <ProFormText name='letter' placeholder='?????????' width={90} />
        <ProFormText name='letters' placeholder='??????' width={150} />
        <ProFormDigit name='length' placeholder='??????' width={80} />
        <ProFormSelect name='status' placeholder='??????' valueEnum={statusType} width={90} />
        <ProFormSwitch label='????????????' name='broadcast' />
        <ProFormSwitch label='????????????' name='isend' />
      </ProForm.Group>
      <ProFormCheckbox.Group
        fieldProps={{ style: { display: 'flex', flexWrap: 'wrap' } }}
        label='??????'
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
                  return message.warning('???????????????')
              }
            }
          }}
          label='??????'
          name='name'
          placeholder='??????'
          required={false}
          rules={[{ required: true }]}
          width='lg' />
        <ProFormText name='foreign' placeholder='?????????' width='lg' />
        <ProFormDatePicker fieldProps={{ format: 'YYYY-MM-DD' }} name='filmtime' placeholder='????????????' width={150} />
        <ProFormTimePicker
          fieldProps={{ format: 'HH:mm' }}
          getValueProps={value => {
            return {
              value: value ? dayjs(value, 'HH:mm') : null
            }
          }}
          name='time'
          placeholder='????????????'
          width={110} />
      </ProForm.Group>
      <ProFormText label='??????' name='aliases' placeholder='??????' />
      <ProFormText label='??????' name='star' placeholder='??????' />
      <ProForm.Group size={5}>
        <ProFormText label='??????' name='tag' placeholder='??????' width='lg' />
        <ProFormText name='original' placeholder='??????' />
        <ProFormText name='director' placeholder='??????/??????' />
        <ProFormText name='company' placeholder='????????????' />
        <ProFormText name='title' placeholder='?????????' />
      </ProForm.Group>
      <ProForm.Group size={5}>
        <ProFormSelect
          label='??????'
          mode='tags'
          name='weekday'
          placeholder='??????'
          valueEnum={{
            1: '???',
            2: '???',
            3: '???',
            4: '???',
            5: '???',
            6: '???',
            7: '???'
          }}
          width={180} />
        <ProFormSelect
          name='prty'
          placeholder='????????????'
          valueEnum={{
            home: '????????????',
            list: '????????????',
            thumb: '????????????',
            quarter: '????????????'
          }}
          width={120} />
        <ProFormText name='label' placeholder='????????????' width={150} />
        <ProFormDigit name='serialized' placeholder='??????' width={80} />
        <ProFormDigit name='total' placeholder='?????????' width={80} />
        <ProFormDigit name='gold' placeholder='??????' width={60} />
        <ProFormText name='douban' placeholder='??????' width={130} />
        <ProFormText name='imdb' placeholder='IMDB' width={130} />
        <Button loading={doubanLoading} onClick={getDouban} type='link'>
          ??????
        </Button>
      </ProForm.Group>
      <ProForm.Group size={5}>
        <ProFormText label='??????' name='website' placeholder='??????' width='lg' />
        <ProFormText name='baike' placeholder='??????' width='lg' />
      </ProForm.Group>
      <ProForm.Group>
        <Item label='??????' name='pic' required={false} rules={[{ required: true }]}>
          <UploadImage sid={modelName.SUBJECT} />
        </Item>
        <Item label='??????' name='pic_thumb'>
          <UploadImage sid={modelName.SUBJECT} />
        </Item>
        <Item label='??????' name='bigpic'>
          <UploadImage sid={modelName.SUBJECT} />
        </Item>
        <Item label='??????' name='bg'>
          <UploadImage sid={modelName.SUBJECT} />
        </Item>
        <ProFormText fieldProps={{ type: 'color' }} label='????????????' name='color' placeholder='????????????' width={110} />
        <ProFormText fieldProps={{ type: 'color' }} label='?????????' name='bg_color' placeholder='?????????' width={110} />
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
                    ??????
                  </Button>
                  {record?.title === 'bilibili' && (
                    <Button loading={biliLoading} onClick={() => getBili(index)} type='link'>
                      ????????????
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
          <ProFormSelect key='title' label='??????' name='title' valueEnum={playEunm} width='md' />
          <ProFormText key='id' label='???id' name='id' width='md' />
        </ProForm.Group>
        <ProFormTextArea fieldProps={{ rows: 6 }} key='urls' label='??????' name='urls' placeholder='??????' width={1200} />
      </ProFormList>
      <ProFormTextArea fieldProps={{ rows: 6 }} label='??????' name='content' placeholder='??????' />
      <ProFormSwitch label='??????????????????' name='isShowMore' />
      <ProFormDependency name={['isShowMore']}>
        {({ isShowMore }) => {
          if (isShowMore) {
            return (
              <>
                <ProFormTextArea label='??????' name='remark' placeholder='??????' />
                <ProFormTextArea label='??????' name='other' placeholder='??????' />
                <ProForm.Group>
                  <ProFormText label='??????' name='seo_title' placeholder='seo??????' />
                  <ProFormText label='?????????' name='seo_keywords' placeholder='seo?????????' />
                  <ProFormText label='????????????' name='jumpurl' placeholder='????????????' width='lg' />
                  <ProFormRate label='??????' name='stars' />
                </ProForm.Group>
                <ProFormTextArea label='??????' name='seo_description' placeholder='seo??????' />
                <ProForm.Group>
                  <ProFormDatePicker fieldProps={{ format: 'YYYY-MM-DD HH:mm:ss' }} label='??????' name='updated_at' placeholder='????????????' />
                  <ProFormDatePicker fieldProps={{ format: 'YYYY-MM-DD HH:mm:ss' }} label='??????' name='created_at' placeholder='????????????' />
                  <ProFormDigit label='??????' name='hits' placeholder='???' width='xs' />
                  <ProFormDigit label='???' name='hits_day' placeholder='???' width='xs' />
                  <ProFormDigit label='???' name='hits_week' placeholder='???' width='xs' />
                  <ProFormDigit label='???' name='hits_month' placeholder='???' width='xs' />
                  <ProFormDigit label='???' name='up' placeholder='???' width='xs' />
                  <ProFormDigit label='???' name='down' placeholder='???' width='xs' />
                  <ProFormText name='uid' placeholder='??????id' width='xs' />
                  <ProFormText name='inputer' placeholder='?????????' width='xs' />
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
