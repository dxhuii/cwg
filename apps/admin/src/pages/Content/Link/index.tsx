import type { ILink, ILinkTable } from '@cwg/types'
import { PlusOutlined } from '@ant-design/icons'
import type { ActionType, ProColumns } from '@ant-design/pro-components'
import {
  FooterToolbar,
  ModalForm,
  PageContainer,
  ProForm,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProTable
} from '@ant-design/pro-components'
import { useModel } from '@umijs/max'
import type { FormInstance } from 'antd'
import { Button, Popconfirm, Popover, message } from 'antd'
import type { FC } from 'react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { modelName } from '@/utils'
import { linkAdd, linkList } from '@/services/link'
import UploadImage from '@/components/Upload'

const { Item } = ProForm

const Pin: FC = () => {
  const actionRef = useRef<ActionType>()
  const formRef = useRef<FormInstance>()
  const [selectedRowsState, setSelectedRows] = useState<ILinkTable[]>([])
  const [modalVisit, setModalVisit] = useState(false)
  const [editData, setEditData] = useState<ILinkTable>()
  const { categoryList, getCategoryList } = useModel('useList')

  useEffect(() => {
    getCategoryList({ sid: 18, pid: 4 })
  }, [getCategoryList])

  const del = (id?: number | string) => {
    console.log(id)
  }

  const cidList = useMemo(() => {
    return categoryList.reduce((obj, item) => {
      obj[item.id!] = item.name
      return obj
    }, {} as Record<string, number | string | undefined>)
  }, [categoryList])

  const columns: ProColumns<ILinkTable>[] = [
    {
      title: '名称',
      dataIndex: 'name',
      copyable: true,
      render: (name, entity) =>
        entity.icon
          ? (
            <Popover
              content={
                <img
                  src={entity.icon}
                  style={{
                    width: 200
                  }} />
            }>
              {name}
            </Popover>
            )
          : (
              name || '-'
            )
    },
    {
      title: '分类',
      dataIndex: 'cid',
      valueEnum: cidList
    },
    {
      title: '颜色',
      search: false,
      dataIndex: 'color'
    },
    {
      title: '文字',
      search: false,
      dataIndex: 'text'
    },
    {
      title: 'url',
      dataIndex: 'url',
      search: false
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, entity) => [
        <a
          key='edit'
          onClick={() => {
            setModalVisit(true)
            setEditData(entity)
          }}>
          编辑
        </a>,
        <Popconfirm key='delete' onConfirm={() => del(entity.id)} title='确定要删除吗？'>
          <a>删除</a>
        </Popconfirm>
      ]
    }
  ]

  useEffect(() => {
    const params = { ...editData, cid: editData?.cid?.toString() }
    formRef.current?.setFieldsValue(params)
  }, [editData])

  return (
    <PageContainer
      extra={
        <Button key='primary' onClick={() => setModalVisit(true)} type='primary'>
          <PlusOutlined /> 新建
        </Button>
      }>
      <ProTable<ILinkTable>
        actionRef={actionRef}
        columns={columns}
        request={async params => {
          console.log(params, 'params')
          const res = await linkList(params)
          console.log(res, 'res')
          return {
            data: res.data?.list,
            total: res.data?.total,
            success: true
          }
        }}
        rowKey='id'
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows)
          }
        }} />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              已选择{' '}
              <a
                style={{
                  fontWeight: 600
                }}>
                {selectedRowsState.length}
              </a>{' '}
              项
            </div>
          }>
          <Button type='primary'>批量审批</Button>
        </FooterToolbar>
      )}
      <ModalForm<ILink>
        autoFocusFirstInput
        formRef={formRef}
        modalProps={{
          onCancel: () => {
            formRef.current?.resetFields()
            setEditData(undefined)
          }
        }}
        onFinish={async values => {
          const res = await linkAdd({ ...values, id: editData?.id, sid: modelName.LINK, cid: values.cid })
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
        onVisibleChange={setModalVisit}
        title='新建'
        visible={modalVisit}>
        <ProFormSelect label='分类' name='cid' placeholder='请选择分类' rules={[{ required: true }]} valueEnum={cidList} />
        <ProFormText label='名称' name='name' placeholder='请输入名称' rules={[{ required: true }]} />
        <ProFormText label='网址' name='url' placeholder='请输入网址' rules={[{ required: true }]} />
        <ProFormText label='网标文字' name='text' placeholder='请输入网标文字' />
        <ProFormText fieldProps={{ type: 'color' }} label='网标颜色' name='color' placeholder='请输入网标颜色' />
        <ProFormTextArea label='简介' name='content' />
        <Item label='图标' name='icon'>
          <UploadImage isUrl sid={modelName.LINK} />
        </Item>
      </ModalForm>
    </PageContainer>
  )
}

export default Pin
