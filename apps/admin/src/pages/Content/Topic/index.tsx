import UploadImage from '@/components/Upload'
import { topicAdd, topicList } from '@/services/topic'
import type { ITopic, ITopicTable } from '@/services/typings'
import { modelName, modelType } from '@/utils'
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
import { Button, FormInstance, message, Popconfirm, Popover } from 'antd'
import { FC, useEffect, useMemo, useRef, useState } from 'react'

const { Item } = ProForm

const Topic: FC = () => {
  const actionRef = useRef<ActionType>()
  const formRef = useRef<FormInstance>()
  const [selectedRowsState, setSelectedRows] = useState<ITopicTable[]>([])
  const [modalVisit, setModalVisit] = useState(false)
  const [editData, setEditData] = useState<ITopicTable>()
  const { categoryList, getCategoryList } = useModel('useList')

  useEffect(() => {
    getCategoryList({ sid: modelName.TOPIC, pid: 10 })
  }, [getCategoryList])

  useEffect(() => {
    const params = { ...editData, cid: editData?.cid?.toString() }
    formRef.current?.setFieldsValue(params)
  }, [editData])

  const del = (id?: number | string) => {
    console.log(id)
  }

  const cidList = useMemo(() => {
    return categoryList.reduce((obj, item) => {
      obj[item.id!] = item.name
      return obj
    }, {} as { [key: string]: number | string | undefined })
  }, [categoryList])

  const columns: ProColumns<ITopicTable>[] = [
    {
      title: '名称',
      dataIndex: 'name',
      copyable: true,
      render: (_, entity) => (
        <Popover
          content={
            <img
              src={entity.icon}
              style={{
                width: 50
              }}
            />
          }
        >
          {entity.name}
        </Popover>
      )
    },
    {
      title: '模型',
      dataIndex: 'sid',
      valueEnum: modelType
    },
    {
      title: '目录',
      search: false,
      dataIndex: 'dir'
    },
    {
      title: '动态数',
      search: false,
      dataIndex: 'pin_count'
    },
    {
      title: '关注数',
      search: false,
      dataIndex: 'follow_count'
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
          key="edit"
          onClick={() => {
            setModalVisit(true)
            setEditData(entity)
          }}
        >
          编辑
        </a>,
        <Popconfirm key="delete" onConfirm={() => del(entity.id)} title="确定要删除吗？">
          <a>删除</a>
        </Popconfirm>
      ]
    }
  ]
  return (
    <PageContainer
      extra={
        <Button
          type="primary"
          key="add"
          onClick={() => {
            setModalVisit(true)
          }}
        >
          <PlusOutlined />
          新建
        </Button>
      }
    >
      <ProTable<ITopicTable>
        actionRef={actionRef}
        rowKey="id"
        request={async params => {
          console.log(params, 'params')
          const { current, pageSize } = params
          const param = {
            current,
            pageSize
          }
          const res = await topicList(param)
          return {
            data: res.data?.list,
            total: res.data?.total,
            success: true
          }
        }}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows)
          }
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              已选择{' '}
              <a
                style={{
                  fontWeight: 600
                }}
              >
                {selectedRowsState.length}
              </a>{' '}
              项
            </div>
          }
        >
          <Button type="primary">批量审批</Button>
        </FooterToolbar>
      )}
      <ModalForm<ITopic>
        visible={modalVisit}
        title="新建"
        formRef={formRef}
        autoFocusFirstInput
        modalProps={{
          onCancel: () => {
            formRef.current?.resetFields()
            setEditData(undefined)
          }
        }}
        onFinish={async values => {
          const res = await topicAdd({ ...values, id: editData?.id })
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
        onVisibleChange={setModalVisit}
      >
        <ProFormText name="name" label="名称" placeholder="请输入名称" rules={[{ required: true }]} />
        <ProFormSelect name="cid" label="分类" valueEnum={cidList} placeholder="请选择分类" rules={[{ required: true }]} />
        <ProFormText name="dir" label="目录" placeholder="请输入目录" />
        <ProFormTextArea label="简介" name="summary" />
        <Item label="Icon" name="icon" rules={[{ required: true }]}>
          <UploadImage sid={modelName.TOPIC} isUrl />
        </Item>
      </ModalForm>
    </PageContainer>
  )
}

export default Topic
