import type { IFeed, IFeedTable } from '@cwg/types'
import { PlusOutlined } from '@ant-design/icons'
import type { ActionType, ProColumns } from '@ant-design/pro-components'
import { FooterToolbar, ModalForm, PageContainer, ProFormSelect, ProFormText, ProFormTextArea, ProTable } from '@ant-design/pro-components'
import { Button, Popconfirm, Popover, message } from 'antd'
import type { FC } from 'react'
import { useRef, useState } from 'react'
import { modelEnName, modelType, statusType } from '@/utils'
import { feedAdd, feedList } from '@/services/feed'

const Feed: FC = () => {
  const actionRef = useRef<ActionType>()
  const [selectedRowsState, setSelectedRows] = useState<IFeedTable[]>([])
  const [modalVisit, setModalVisit] = useState(false)
  const [editData, setEditData] = useState<IFeedTable>()

  const del = (id?: number | string) => {
    console.log(id)
  }

  const columns: ProColumns<IFeedTable>[] = [
    {
      title: '名称',
      dataIndex: 'name',
      copyable: true,
      render: (_, entity) => (
        <Popover
          content={
            <img
              src={entity[modelEnName[entity.sid!]]?.pic}
              style={{
                width: 200
              }} />
          }>
          {entity[modelEnName[entity.sid!]]?.name}
        </Popover>
      )
    },
    {
      title: '模型',
      dataIndex: 'sid',
      valueEnum: modelType
    },
    {
      title: '类型',
      dataIndex: 'type',
      valueEnum: {
        1: '关注',
        2: '评分',
        3: '评价',
        4: '添加',
        5: '更新'
      }
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
      title: '状态',
      dataIndex: 'status',
      valueEnum: statusType
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
        <Button
          key='primary'
          onClick={() => {
            setModalVisit(true)
          }}
          type='primary'>
          <PlusOutlined /> 新建
        </Button>
      }>
      <ProTable<IFeedTable>
        actionRef={actionRef}
        columns={columns}
        request={async params => {
          console.log(params, 'params')
          const { current, pageSize } = params
          const param = {
            current,
            pageSize
          }
          const res = await feedList(param)
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
      <ModalForm<IFeed>
        autoFocusFirstInput
        modalProps={{
          onCancel: () => console.log('run')
        }}
        onFinish={async values => {
          console.log(values)
          const res = await feedAdd({ ...values, id: editData?.id })
          if (res.status === 200) {
            if (editData?.id)
              message.success('修改成功')

            else
              message.success('添加成功')

            actionRef.current?.reload()
            return true
          }
          else {
            return message.error(res.message)
          }
        }}
        onOpenChange={setModalVisit}
        open={modalVisit}
        title='新建'>
        <ProFormText label='名称' name='name' placeholder='请输入名称' rules={[{ required: true }]} />
        <ProFormSelect label='模型' name='sid' options={Object.keys(modelType).map(item => ({ label: modelType[item], value: item }))} />
        <ProFormSelect
          label='状态'
          name='status'
          options={Object.keys(statusType).map(item => ({ label: modelType[item], value: item }))} />
        <ProFormText label='目录' name='dir' placeholder='请输入目录' />
        <ProFormTextArea label='简介' name='summary' />
      </ModalForm>
    </PageContainer>
  )
}

export default Feed
