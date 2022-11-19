import type { IUser } from '@/services/typings'
import { userList } from '@/services/user'
import { PlusOutlined } from '@ant-design/icons'
import type { ActionType, ProColumns } from '@ant-design/pro-components'
import { FooterToolbar, PageContainer, ProTable } from '@ant-design/pro-components'
import { history, Link } from '@umijs/max'
import { Button, Popconfirm, Popover } from 'antd'
import moment from 'moment'
import type { FC } from 'react'
import { useRef, useState } from 'react'

const UserList: FC = () => {
  const actionRef = useRef<ActionType>()
  const [selectedRowsState, setSelectedRows] = useState<IUser[]>([])

  const del = (id?: number | string) => {
    console.log(id)
  }

  const columns: ProColumns<IUser>[] = [
    {
      title: '用户名',
      dataIndex: 'username',
      copyable: true,
      render: (text, entity) => (
        <Popover
          content={
            <img
              src={entity.avatar}
              style={{
                width: 200
              }}
            />
          }
        >
          {text}
        </Popover>
      )
    },
    {
      title: '昵称',
      dataIndex: 'nickname'
    },
    {
      title: '登录次数',
      dataIndex: 'login',
      search: false
    },
    {
      title: '注册IP',
      dataIndex: 'register_ip'
    },
    {
      title: '更新时间',
      sorter: true,
      dataIndex: 'updated_at',
      valueType: 'dateRange',
      hideInTable: true,
      initialValue: [moment(), moment().add(1, 'day')]
    },
    {
      title: '创建时间',
      search: false,
      sorter: true,
      dataIndex: 'created_at'
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, entity) => [
        <Link key="edit" to={`edit/${entity.id}`}>
          编辑
        </Link>,
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
          key="primary"
          onClick={() => {
            history.push('add')
          }}
        >
          <PlusOutlined /> 新建
        </Button>
      }
    >
      <ProTable<IUser>
        actionRef={actionRef}
        rowKey="id"
        request={async params => {
          console.log(params, 'params')
          const { current, pageSize } = params
          const param = {
            current,
            pageSize
          }
          const res = await userList(param)
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
    </PageContainer>
  )
}

export default UserList
