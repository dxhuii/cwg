import UploadImage from '@/components/Upload'
import { linkAdd, linkList } from '@/services/link'
import type { ILink, ILinkTable } from '@/services/typings'
import { modelName } from '@/utils'
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
import { Button, message, Popconfirm, Popover } from 'antd'
import type { FC } from 'react'
import { useEffect, useMemo, useRef, useState } from 'react'

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
        entity.icon ? (
          <Popover
            content={
              <img
                src={entity.icon}
                style={{
                  width: 200
                }}
              />
            }
          >
            {name}
          </Popover>
        ) : (
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

  useEffect(() => {
    const params = { ...editData, cid: editData?.cid?.toString() }
    formRef.current?.setFieldsValue(params)
  }, [editData])

  return (
    <PageContainer
      extra={
        <Button type="primary" key="primary" onClick={() => setModalVisit(true)}>
          <PlusOutlined /> 新建
        </Button>
      }
    >
      <ProTable<ILinkTable>
        actionRef={actionRef}
        rowKey="id"
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
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows)
          }
        }}
        // expandable={{
        //   expandedRowRender: record => <p style={{ margin: 0 }}>{record.content}</p>
        // }}
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
      <ModalForm<ILink>
        visible={modalVisit}
        formRef={formRef}
        title="新建"
        autoFocusFirstInput
        modalProps={{
          onCancel: () => {
            formRef.current?.resetFields()
            setEditData(undefined)
          }
        }}
        onFinish={async values => {
          const res = await linkAdd({ ...values, id: editData?.id, sid: modelName.LINK, cid: values.cid })
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
        <ProFormSelect name="cid" label="分类" valueEnum={cidList} placeholder="请选择分类" rules={[{ required: true }]} />
        <ProFormText name="name" label="名称" placeholder="请输入名称" rules={[{ required: true }]} />
        <ProFormText name="url" label="网址" placeholder="请输入网址" rules={[{ required: true }]} />
        <ProFormText name="text" label="网标文字" placeholder="请输入网标文字" />
        <ProFormText name="color" label="网标颜色" placeholder="请输入网标颜色" fieldProps={{ type: 'color' }} />
        <ProFormTextArea label="简介" name="content" />
        <Item label="图标" name="icon">
          <UploadImage sid={modelName.LINK} isUrl />
        </Item>
      </ModalForm>
    </PageContainer>
  )
}

export default Pin
