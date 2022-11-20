import type { ITag } from '@cwg/types'
import { PlusOutlined } from '@ant-design/icons'
import type { ActionType, ProColumns } from '@ant-design/pro-components'
import { FooterToolbar, ModalForm, PageContainer, ProFormSelect, ProFormText, ProTable } from '@ant-design/pro-components'
import { Button, Popconfirm, message } from 'antd'
import type { FC } from 'react'
import { useRef, useState } from 'react'
import { modelType } from '@/utils'
import { tagAdd, tagDelete, tagList } from '@/services/tag'

const Tag: FC = () => {
  const actionRef = useRef<ActionType>()
  const [selectedRowsState, setSelectedRows] = useState<ITag[]>([])
  const [modalVisit, setModalVisit] = useState(false)
  const [editData, setEditData] = useState<ITag>()

  const del = (id: number) => {
    message.loading('正在删除')
    tagDelete({ id }).then(() => {
      message.success('删除成功')
      actionRef.current?.reload()
    })
  }

  const columns: ProColumns<ITag>[] = [
    {
      title: '名称',
      dataIndex: 'name',
      copyable: true,
    },
    {
      title: '模型',
      dataIndex: 'sid',
      valueEnum: modelType,
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
        <Popconfirm key="delete" onConfirm={() => del(entity.id!)} title="确定要删除吗？">
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
          key="primary"
          onClick={() => {
            setModalVisit(true)
          }}
        >
          <PlusOutlined /> 新建
        </Button>
      }
    >
      <ProTable<ITag>
        actionRef={actionRef}
        rowKey="id"
        request={async (params) => {
          console.log(params, 'params')
          const { current, pageSize } = params
          const param = {
            current,
            pageSize,
          }
          const res = await tagList(param)
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
      <ModalForm<ITag>
        visible={modalVisit}
        title="新建"
        autoFocusFirstInput
        modalProps={{
          onCancel: () => console.log('run'),
        }}
        onFinish={async (values) => {
          console.log(values)
          const res = await tagAdd({ ...values, id: editData?.id })
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
      </ModalForm>
    </PageContainer>
  )
}

export default Tag
