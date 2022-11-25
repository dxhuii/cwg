import type { IPlay } from '@cwg/types'
import type { ActionType, ProColumns } from '@ant-design/pro-components'
import { EditableProTable, PageContainer } from '@ant-design/pro-components'
import { useModel } from '@umijs/max'
import { message } from 'antd'
import { useCallback, useEffect, useRef, useState } from 'react'
import { statusType } from '@/utils'
import { playAdd } from '@/services/play'

const Setting = () => {
  const actionRef = useRef<ActionType>()
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([])
  const [dataSource, setDataSource] = useState<IPlay[]>([])
  const { play, getPlay } = useModel('usePlay')

  const getData = useCallback(async () => {
    getPlay()
  }, [getPlay])

  useEffect(() => {
    getData()
  }, [getData])

  useEffect(() => {
    actionRef.current?.reload?.()
  }, [play])

  const columns: ProColumns<IPlay>[] = [
    {
      title: '名称',
      dataIndex: 'name'
    },
    {
      title: '英文名',
      dataIndex: 'title'
    },
    {
      title: '排序',
      dataIndex: 'rank'
    },
    {
      title: '显示',
      dataIndex: 'display',
      valueType: 'switch'
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueType: 'select',
      valueEnum: statusType
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
  return (
    <PageContainer>
      <EditableProTable<IPlay>
        actionRef={actionRef}
        columns={columns}
        dateFormatter='string'
        editable={{
          type: 'multiple',
          editableKeys,
          onSave: async (_, data) => {
            if (typeof data.id === 'string')
              delete data.id

            playAdd({ ...data }).then(res => {
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
          },
          onChange: setEditableRowKeys
        }}
        options={false}
        pagination={false}
        recordCreatorProps={{
          record: () => ({ id: (Math.random() * 1000000).toFixed(0) } as IPlay)
        }}
        request={async () => {
          return {
            data: play,
            success: true
          }
        }}
        rowKey='id'
        search={false}
        value={play} />
    </PageContainer>
  )
}

export default Setting
