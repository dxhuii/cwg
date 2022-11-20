import type { ICommentTable, IComments } from '@cwg/types'
import { PlusOutlined } from '@ant-design/icons'
import type { ActionType, ProColumns } from '@ant-design/pro-components'
import { FooterToolbar, ModalForm, PageContainer, ProFormSelect, ProFormText, ProFormTextArea, ProTable } from '@ant-design/pro-components'
import { Button, Popconfirm, Popover, message } from 'antd'
import type { FC } from 'react'
import { useRef, useState } from 'react'
import { modelEnName, modelType, statusType } from '@/utils'
import { commentAdd, commentList } from '@/services/comment'

const Comment: FC = () => {
  const actionRef = useRef<ActionType>()
  const [selectedRowsState, setSelectedRows] = useState<ICommentTable[]>([])
  const [modalVisit, setModalVisit] = useState(false)
  const [editData, setEditData] = useState<ICommentTable>()

  const del = (id?: number | string) => {
    console.log(id)
  }

  const columns: ProColumns<ICommentTable>[] = [
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
                width: 200,
              }}
            />
          }
        >
          {entity[modelEnName[entity.sid!]]?.name}
        </Popover>
      ),
    },
    {
      title: '模型',
      dataIndex: 'sid',
      valueEnum: modelType,
    },
    {
      title: '设备',
      dataIndex: 'device',
    },
    {
      title: '顶',
      search: false,
      dataIndex: 'up',
    },
    {
      title: '踩',
      search: false,
      dataIndex: 'down',
    },
    {
      title: '用户名',
      dataIndex: 'username',
      render: (_, entity) => entity.user?.username,
    },
    {
      title: '更新时间',
      search: false,
      dataIndex: 'updated_at',
    },
    {
      title: '更新时间',
      sorter: true,
      dataIndex: 'updated_at',
      valueType: 'dateRange',
      hideInTable: true,
    },
    {
      title: '创建时间',
      sorter: true,
      dataIndex: 'created_at',
      search: false,
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueEnum: statusType,
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
        </Popconfirm>,
      ],
    },
  ]
  return (
    <PageContainer
      extra={
        <Button
          type="primary"
          onClick={() => {
            setModalVisit(true)
          }}
        >
          <PlusOutlined /> 新建
        </Button>
      }
    >
      <ProTable<ICommentTable>
        actionRef={actionRef}
        rowKey="id"
        request={async (params) => {
          console.log(params, 'params')
          const { current, pageSize } = params
          const param = {
            current,
            pageSize,
          }
          const res = await commentList(param)
          return {
            data: res.data?.list,
            total: res.data?.total,
            success: true,
          }
        }}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows)
          },
        }}
        expandable={{
          expandedRowRender: record => <p style={{ margin: 0 }}>{record.content}</p>,
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              已选择{' '}
              <a
                style={{
                  fontWeight: 600,
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
      <ModalForm<IComments>
        visible={modalVisit}
        title="新建"
        autoFocusFirstInput
        modalProps={{
          onCancel: () => console.log('run'),
        }}
        onFinish={async (values) => {
          console.log(values)
          const res = await commentAdd({ ...values, id: editData?.id })
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
        onVisibleChange={setModalVisit}
      >
        <ProFormText name="name" label="名称" placeholder="请输入名称" rules={[{ required: true }]} />
        <ProFormSelect options={Object.keys(modelType).map(item => ({ label: modelType[item], value: item }))} name="sid" label="模型" />
        <ProFormSelect
          options={Object.keys(statusType).map(item => ({ label: modelType[item], value: item }))}
          name="status"
          label="状态"
        />
        <ProFormText name="dir" label="目录" placeholder="请输入目录" />
        <ProFormTextArea label="简介" name="summary" />
      </ModalForm>
    </PageContainer>
  )
}

export default Comment
