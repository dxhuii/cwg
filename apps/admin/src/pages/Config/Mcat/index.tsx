import type { IList, IMcat } from '@cwg/types'
import type { ActionType, ProColumns } from '@ant-design/pro-components'
import { EditableProTable, PageContainer, ProTable } from '@ant-design/pro-components'
import { Link, useModel } from '@umijs/max'
import { message } from 'antd'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { getListMcat, sidEnum } from '@/utils'
import { mcatAdd } from '@/services/mcat'

const columns: ProColumns<IList>[] = [
  {
    title: '名称',
    width: 120,
    dataIndex: 'name'
  },
  {
    title: '目录',
    width: 120,
    dataIndex: 'dir'
  },
  {
    title: '排序',
    width: 120,
    dataIndex: 'rank'
  },
  {
    title: '模型',
    width: 140,
    dataIndex: 'sid',
    valueType: 'select',
    valueEnum: sidEnum()
  },
  {
    title: '状态',
    width: 120,
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
    render: () => [
      <Link key='edit' to='typelist'>
        编辑
      </Link>,
      <Link key='delete' to='typelist'>
        删除
      </Link>
    ]
  }
]

const Mcatlist = () => {
  const actionRef = useRef<ActionType>()
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([])
  const [dataSource, setDataSource] = useState<IMcat[]>([])
  const { categoryList, getCategoryList } = useModel('useList')
  const { mcat, getMcat } = useModel('useMcat')
  const [mcatData, setMcatData] = useState<({ sub?: IMcat[] } & IList)[]>([])

  const getData = useCallback(async () => {
    await getCategoryList()
    await getMcat()
  }, [getCategoryList, getMcat])

  useEffect(() => {
    getData()
  }, [getData])

  useEffect(() => {
    setMcatData(getListMcat(categoryList, mcat))
  }, [mcat, categoryList])

  useEffect(() => {
    actionRef.current?.reload?.()
  }, [mcatData])

  const cateEnum = useMemo(() => {
    let obj = {}
    categoryList.forEach(item => {
      obj = {
        ...obj,
        [item.id!]: {
          text: item.name
        }
      }
    })
    return obj
  }, [categoryList])

  const columnsMcat: ProColumns<IMcat>[] = [
    {
      title: '名称',
      dataIndex: 'name',
      width: 120
    },
    {
      title: '父类',
      dataIndex: 'cid',
      valueType: 'select',
      valueEnum: cateEnum
    },
    {
      title: '目录',
      dataIndex: 'title',
      width: 120
    },
    {
      title: '排序',
      dataIndex: 'rank',
      width: 120
    },
    {
      title: '操作',
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

  const expandedRowRender = (record: { sub?: IMcat[] } & IList) => {
    return (
      <EditableProTable<IMcat>
        columns={columnsMcat}
        editable={{
          type: 'multiple',
          editableKeys,
          onSave: async (rowKey, data, row) => {
            if (typeof data.id === 'string')
              delete data.id

            mcatAdd({ ...data }).then(res => {
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
        pagination={false}
        recordCreatorProps={{
          record: () => ({ id: (Math.random() * 1000000).toFixed(0), cid: '1' } as IMcat)
        }}
        request={async () => ({
          data: record.sub,
          success: true
        })}
        rowKey='id'
        showHeader={false}
        value={record.sub} />
    )
  }
  return (
    <PageContainer>
      <ProTable<IList>
        actionRef={actionRef}
        columns={columns}
        dateFormatter='string'
        expandable={{
          expandedRowRender: record => expandedRowRender(record)
        }}
        options={false}
        pagination={{
          showQuickJumper: true
        }}
        request={async () => {
          return {
            data: mcatData,
            success: true
          }
        }}
        rowKey='id'
        search={false} />
    </PageContainer>
  )
}

export default Mcatlist
