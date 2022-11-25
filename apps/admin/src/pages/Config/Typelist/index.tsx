import type { IList } from '@cwg/types'
import type { ActionType, ProColumns } from '@ant-design/pro-components'
import { EditableProTable, PageContainer } from '@ant-design/pro-components'
import { useModel } from '@umijs/max'
import { message } from 'antd'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { getList, sidEnum } from '@/utils'
import { listAdd } from '@/services/list'

const Typelist = () => {
  const actionRef = useRef<ActionType>()
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([])
  const [dataSource, setDataSource] = useState<IList[]>([])
  const { categoryList, getCategoryList } = useModel('useList')

  const getData = useCallback(async () => {
    await getCategoryList()
  }, [getCategoryList])

  useEffect(() => {
    getData()
  }, [getData])

  useEffect(() => {
    actionRef.current?.reload?.()
  }, [categoryList])

  const cateEnum = useMemo(() => {
    return categoryList
      .filter(item => item.pid === '0')
      .reduce(
        (pre, cur) => {
          pre[cur.id!] = cur.name
          return pre
        },
        { 0: '无' }
      )
  }, [categoryList])

  const columns: ProColumns<IList>[] = [
    {
      title: '名称',
      dataIndex: 'name'
    },
    {
      title: '父类',
      dataIndex: 'pid',
      valueType: 'select',
      valueEnum: cateEnum
    },
    {
      title: '模型',
      dataIndex: 'sid',
      valueType: 'select',
      valueEnum: sidEnum()
    },
    {
      title: '目录',
      dataIndex: 'dir'
    },
    {
      title: '排序',
      dataIndex: 'rank'
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueType: 'select',
      valueEnum: {
        0: { text: '正常', status: 'Success' },
        1: { text: '禁用', status: 'Error' }
      }
    },
    {
      title: '操作',
      width: 164,
      key: 'option',
      valueType: 'option',
      render: (text, record, _, action) => [
        <a
          key='editable'
          onClick={() => {
            action?.startEditable?.(record.id!)
          }}>
          编辑
        </a>,
        <a
          key='delete'
          onClick={() => {
            setDataSource(dataSource.filter(item => item.id !== record.id))
          }}>
          删除
        </a>
      ]
    }
  ]

  const expandedRowRender = (record: { sub?: IList[] } & IList) => {
    return (
      <EditableProTable<IList>
        bordered={false}
        columns={columns}
        editable={{
          type: 'multiple',
          editableKeys,
          onSave: async (rowKey, data, row) => {
            if (typeof data.id === 'string' && data.id.length === 6)
              delete data.id

            listAdd({ ...data }).then(res => {
              if (res.status === 200) {
                if (data.id)
                  message.success('修改成功')

                else
                  message.success('添加成功')

                getData()
              }
              else {
                message.error(res.message)
              }
            })
            console.log(rowKey, data, row)
          },
          onChange: setEditableRowKeys
        }}
        options={false}
        pagination={false}
        recordCreatorProps={{
          record: () => ({ id: (Math.random() * 1000000).toFixed(0), cid: '1' } as IList)
        }}
        request={async () => ({
          data: record.sub,
          success: true
        })}
        rowKey='id'
        search={false}
        showHeader={false}
        value={record.sub} />
    )
  }
  return (
    <PageContainer>
      <EditableProTable<IList>
        actionRef={actionRef}
        columns={columns}
        dateFormatter='string'
        editable={{
          type: 'multiple',
          editableKeys,
          onSave: async (rowKey, data, row) => {
            if (typeof data.id === 'string')
              delete data.id

            listAdd({ ...data }).then(res => {
              if (res.status === 200) {
                if (data.id)
                  message.success('修改成功')

                else
                  message.success('添加成功')

                getData()
              }
              else {
                message.error(res.message)
              }
            })
            console.log(rowKey, data, row)
          },
          onChange: setEditableRowKeys
        }}
        expandable={{
          expandedRowRender: record => expandedRowRender(record)
        }}
        options={false}
        pagination={false}
        recordCreatorProps={{
          record: () => ({ id: (Math.random() * 1000000).toFixed(0) } as IList)
        }}
        request={async () => {
          return {
            data: getList(categoryList),
            success: true
          }
        }}
        rowKey='id'
        search={false}
        value={getList(categoryList)} />
    </PageContainer>
  )
}

export default Typelist
