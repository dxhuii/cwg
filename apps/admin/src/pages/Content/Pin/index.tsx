import type { IPin, IPinTable } from '@cwg/types'
import { PlusOutlined } from '@ant-design/icons'
import type {
  ActionType,
  ProColumns
} from '@ant-design/pro-components'
import {
  FooterToolbar,
  ModalForm,
  PageContainer,
  ProForm,
  ProFormSelect,
  ProFormTextArea,
  ProTable
} from '@ant-design/pro-components'
import { useModel } from '@umijs/max'
import type { FormInstance } from 'antd'
import { Button, Popconfirm, Popover, message } from 'antd'
import type { FC } from 'react'
import { useEffect, useRef, useState } from 'react'
import { pinAdd, pinList } from '@/services/pin'
import TagForm from '@/components/TagForm'

const { Item } = ProForm

const Pin: FC = () => {
  const actionRef = useRef<ActionType>()
  const formRef = useRef<FormInstance>()
  const [selectedRowsState, setSelectedRows] = useState<IPinTable[]>([])
  const [modalVisit, setModalVisit] = useState(false)
  const [editData, setEditData] = useState<IPinTable>()
  const { topicList, getTopicList } = useModel('useTopic')

  const del = (id?: number | string) => {
    console.log(id)
  }

  useEffect(() => {
    const params = { ...editData, cid: editData?.cid?.toString() }
    formRef.current?.setFieldsValue(params)
  }, [editData])

  useEffect(() => {
    getTopicList()
  }, [getTopicList])

  const onSearchForAid = (value: string) => {
    console.log(value)
  }

  console.log(topicList, 'topicList')

  useEffect(() => {
    const params = { ...editData, cid: editData?.cid?.toString() }
    formRef.current?.setFieldsValue(params)
  }, [editData])

  const columns: ProColumns<IPinTable>[] = [
    {
      title: '名称',
      dataIndex: 'content',
      copyable: true,
      ellipsis: true,
      render: content => <Popover content={content}>{content}</Popover>
    },
    {
      title: '话题',
      dataIndex: 'tid',
      search: false,
      render: (_, entity) => (
        <>
          <img src={entity.topic?.icon} style={{ width: 50 }} />
          {entity.topic?.name}
        </>
      )
    },
    {
      title: '用户名',
      search: false,
      dataIndex: 'username',
      render: (_, entity) => entity.user?.username
    },
    {
      title: '更新时间',
      search: false,
      dataIndex: 'updated_at'
    },
    {
      title: '更新时间',
      sorter: true,
      dataIndex: 'updated_at',
      valueType: 'dateRange',
      hideInTable: true
    },
    {
      title: '创建时间',
      sorter: true,
      dataIndex: 'created_at',
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
  return (
    <PageContainer
      extra={
        <Button key='primary' onClick={() => setModalVisit(true)} type='primary'>
          <PlusOutlined /> 新建
        </Button>
      }>
      <ProTable<IPinTable>
        actionRef={actionRef}
        columns={columns}
        request={async params => {
          console.log(params, 'params')
          const { current, pageSize } = params
          const param = {
            current,
            pageSize
          }
          const res = await pinList(param)
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
      <ModalForm<IPin>
        autoFocusFirstInput
        formRef={formRef}
        modalProps={{
          onCancel: () => {
            formRef.current?.resetFields()
            setEditData(undefined)
          }
        }}
        onFinish={async values => {
          console.log(values)
          const res = await pinAdd({ ...values, id: editData?.id })
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
        onOpenChange={setModalVisit}
        open={modalVisit}
        title='新建'>
        <ProFormSelect fieldProps={{ onSearch: onSearchForAid }} label='关联内容ID' name='aid' showSearch />
        {/* <ProFormSelect showSearch name="tid" label="关联话题ID" fieldProps={{ onSearch: onSearchForTid }} /> */}
        <Item label='关联话题ID' name='tid'>
          <TagForm list={topicList} />
        </Item>
        <ProFormTextArea label='内容' name='content' rules={[{ required: true }]} />
      </ModalForm>
    </PageContainer>
  )
}

export default Pin
