import UploadImage from '@/components/Upload'
import { subjectAdd, subjectDetail, subjectName } from '@/services/subject'
import type { ISubject } from '@/services/typings'
import { getVideo } from '@/services/video'
import { areaEnum, getListFormat, languageEnum, modelName, statusType } from '@/utils'
import useBilibili from '@/utils/hooks/useBilibili'
import useDouban from '@/utils/hooks/useDouban'
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
      if (arr.includes(item.name)) {
        list.push(item.id!)
      }
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
      visible={visible}
      formRef={formRef}
      title={editData?.id ? editData.name : '新建'}
      autoFocusFirstInput
      width={1340}
      layout="horizontal"
      modalProps={{
        onCancel: () => {
          formRef.current?.resetFields()
          setEditData(undefined)
        }
      }}
      request={async () => {
        let data = {} as ISubject
        if (editData?.id) {
          const subject = await subjectDetail({ id: editData?.id })
          data = subject.data
        }
        return data
      }}
      onFinish={async values => {
        console.log(values)
        const res = await subjectAdd({ ...values, id: editData?.id })
        if (res.status === 200) {
          if (editData?.id) {
            message.success('修改成功')
          } else {
            message.success('添加成功')
          }
          formRef.current?.resetFields()
          actionRef.current?.reload()
          return true
        } else {
          message.error(res.message)
          return false
        }
      }}
      onVisibleChange={setVisible}
    >
      <ProForm.Group size={5}>
        <Item label="分类" name="cid" rules={[{ required: true }]} required={false}>
          <Cascader options={getListFormat(categoryList)} placeholder="分类" style={{ width: 120 }} />
        </Item>
        <ProFormSelect name="area" width={100} valueEnum={areaEnum} placeholder="地区" />
        <ProFormSelect name="language" width={90} valueEnum={languageEnum} placeholder="语言" />
        <ProFormDatePicker width={90} name="year" placeholder="年份" fieldProps={{ picker: 'year', format: 'YYYY' }} />
        <ProFormText width={90} name="letter" placeholder="首字母" />
        <ProFormText width={150} name="letters" placeholder="拼音" />
        <ProFormDigit width={80} name="length" placeholder="片长" />
        <ProFormSelect name="status" width={90} valueEnum={statusType} placeholder="状态" />
        <ProFormSwitch name="broadcast" label="是否放送" />
        <ProFormSwitch name="isend" label="是否完结" />
      </ProForm.Group>
      <ProFormCheckbox.Group
        name="mcid"
        label="小类"
        options={mcat.map(item => {
          return { label: item.name, value: item.id! }
        })}
      />
      <ProForm.Group size={5}>
        <ProFormText
          width="lg"
          name="name"
          label="名称"
          placeholder="名称"
          rules={[{ required: true }]}
          required={false}
          fieldProps={{
            onBlur: async e => {
              const name = e.target.value
              if (name) {
                const result = await subjectName({ name })
                if (result.data) {
                  return message.warn('名称已存在')
                }
              }
            }
          }}
        />
        <ProFormText width="lg" name="foreign" placeholder="外文名" />
        <ProFormDatePicker width={150} name="filmtime" placeholder="上映日期" fieldProps={{ format: 'YYYY-MM-DD' }} />
        <ProFormTimePicker
          getValueProps={value => {
            return {
              value: value ? moment(value, 'HH:mm') : null
            }
          }}
          width={110}
          name="time"
          fieldProps={{ format: 'HH:mm' }}
          placeholder="放送时间"
        />
      </ProForm.Group>
      <ProFormText name="aliases" label="别名" placeholder="别名" />
      <ProFormText name="star" label="配音" placeholder="配音" />
      <ProForm.Group size={5}>
        <ProFormText width="lg" name="tag" label="标签" placeholder="标签" />
        <ProFormText name="original" placeholder="原作" />
        <ProFormText name="director" placeholder="监督/导演" />
        <ProFormText name="company" placeholder="动画制作" />
        <ProFormText name="title" placeholder="副标题" />
      </ProForm.Group>
      <ProForm.Group size={5}>
        <ProFormSelect
          mode="tags"
          label="星期"
          name="weekday"
          width={180}
          valueEnum={{
            1: '一',
            2: '二',
            3: '三',
            4: '四',
            5: '五',
            6: '六',
            7: '日'
          }}
          placeholder="星期"
        />
        <ProFormSelect
          name="prty"
          width={120}
          valueEnum={{
            home: '首页推荐',
            list: '列表推荐',
            thumb: '封面推荐',
            quarter: '季番推荐'
          }}
          placeholder="推荐级别"
        />
        <ProFormText width={150} name="label" placeholder="关联别名" />
        <ProFormDigit width={80} name="serialized" placeholder="连载" />
        <ProFormDigit width={80} name="total" placeholder="总集数" />
        <ProFormDigit width={60} name="gold" placeholder="评分" />
        <ProFormText width={130} name="douban" placeholder="豆瓣" />
        <ProFormText width={130} name="imdb" placeholder="IMDB" />
        <Button type="link" onClick={getDouban} loading={doubanLoading}>
          获取
        </Button>
      </ProForm.Group>
      <ProForm.Group size={5}>
        <ProFormText width="lg" name="website" label="官网" placeholder="官网" />
        <ProFormText width="lg" name="baike" placeholder="百科" />
      </ProForm.Group>
      <ProForm.Group>
        <Item name="pic" label="封面" rules={[{ required: true }]} required={false}>
          <UploadImage sid={modelName.SUBJECT} />
        </Item>
        <Item name="pic_thumb" label="小图">
          <UploadImage sid={modelName.SUBJECT} />
        </Item>
        <Item name="bigpic" label="大图">
          <UploadImage sid={modelName.SUBJECT} />
        </Item>
        <Item name="bg" label="背景">
          <UploadImage sid={modelName.SUBJECT} />
        </Item>
        <ProFormText width={110} label="文字颜色" name="color" placeholder="文字颜色" fieldProps={{ type: 'color' }} />
        <ProFormText width={110} label="背景色" name="bg_color" placeholder="背景色" fieldProps={{ type: 'color' }} />
      </ProForm.Group>
      <ProFormList
        name="play"
        copyIconProps={{
          Icon: SnippetsOutlined
        }}
        deleteIconProps={{
          Icon: CloseOutlined
        }}
        min={1}
        max={4}
        creatorRecord={{
          title: 'bilibili'
        }}
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
        itemRender={({ listDom, action }, { record, index }) => {
          return (
            <ProCard
              bordered
              extra={
                <div style={{ display: 'flex' }}>
                  <Button type="link" onClick={() => getMedia(index)} loading={loading}>
                    获取
                  </Button>
                  {record?.title === 'bilibili' && (
                    <Button type="link" onClick={() => getBili(index)} loading={biliLoading}>
                      获取信息
                    </Button>
                  )}
                  {action}
                </div>
              }
              title={playEunm[record?.title]}
              style={{
                marginBottom: 8
              }}
            >
              {listDom}
            </ProCard>
          )
        }}
      >
        <ProForm.Group key="group">
          <ProFormSelect key="title" width="md" name="title" label="来源" valueEnum={playEunm} />
          <ProFormText key="id" width="md" name="id" label="源id" />
        </ProForm.Group>
        <ProFormTextArea key="urls" width={1200} fieldProps={{ rows: 6 }} name="urls" label="链接" placeholder="链接" />
      </ProFormList>
      <ProFormTextArea name="content" label="简介" placeholder="简介" fieldProps={{ rows: 6 }} />
      <ProFormSwitch name="isShowMore" label="是否显示更多" />
      <ProFormDependency name={['isShowMore']}>
        {({ isShowMore }) => {
          if (isShowMore) {
            return (
              <>
                <ProFormTextArea name="remark" label="简评" placeholder="简评" />
                <ProFormTextArea name="other" label="其他" placeholder="其他" />
                <ProForm.Group>
                  <ProFormText name="seo_title" label="标题" placeholder="seo标题" />
                  <ProFormText name="seo_keywords" label="关键字" placeholder="seo关键字" />
                  <ProFormText width="lg" name="jumpurl" label="跳转链接" placeholder="跳转链接" />
                  <ProFormRate name="stars" label="星级" />
                </ProForm.Group>
                <ProFormTextArea name="seo_description" label="简介" placeholder="seo简介" />
                <ProForm.Group>
                  <ProFormDatePicker name="updated_at" placeholder="更新时间" label="更新" fieldProps={{ format: 'YYYY-MM-DD HH:mm:ss' }} />
                  <ProFormDatePicker name="created_at" placeholder="更新时间" label="创建" fieldProps={{ format: 'YYYY-MM-DD HH:mm:ss' }} />
                  <ProFormDigit width="xs" label="访问" name="hits" placeholder="总" />
                  <ProFormDigit width="xs" label="日" name="hits_day" placeholder="日" />
                  <ProFormDigit width="xs" label="周" name="hits_week" placeholder="周" />
                  <ProFormDigit width="xs" label="月" name="hits_month" placeholder="月" />
                  <ProFormDigit width="xs" label="顶" name="up" placeholder="顶" />
                  <ProFormDigit width="xs" label="踩" name="down" placeholder="踩" />
                  <ProFormText width="xs" name="uid" placeholder="用户id" />
                  <ProFormText width="xs" name="inputer" placeholder="发布人" />
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
