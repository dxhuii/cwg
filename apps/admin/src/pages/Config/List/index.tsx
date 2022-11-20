import type { ISetting } from '@cwg/types'
import type { ActionType, ProColumns } from '@ant-design/pro-components'
import { EditableProTable, PageContainer } from '@ant-design/pro-components'
import { useModel } from '@umijs/max'
import { message } from 'antd'
import { useCallback, useEffect, useRef, useState } from 'react'
import { settingAdd } from '@/services/setting'

const Setting = () => {
  const actionRef = useRef<ActionType>()
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([])
  const [dataSource, setDataSource] = useState<ISetting[]>([])
  const { setting, getSetting } = useModel('useSetting')

  const getData = useCallback(async () => {
    getSetting()
  }, [getSetting])

  useEffect(() => {
    getData()
  }, [getData])

  useEffect(() => {
    actionRef.current?.reload?.()
  }, [setting])

  const columns: ProColumns<ISetting>[] = [
    {
      title: 'key',
      dataIndex: 'key',
    },
    {
      title: '值',
      dataIndex: 'value',
    },
    {
      title: '备注',
      dataIndex: 'tag',
    },
    {
      title: '操作',
      width: 164,
      key: 'option',
      valueType: 'option',
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            action?.startEditable?.(record.id!)
          }}
        >
          编辑
        </a>,
        <a
          key="delete"
          onClick={() => {
            setDataSource(dataSource.filter(item => item.id !== record.id))
          }}
        >
          删除
        </a>,
      ],
    },
  ]
  return (
    <PageContainer>
      <EditableProTable<ISetting>
        columns={columns}
        actionRef={actionRef}
        request={async () => {
          return {
            data: setting,
            success: true,
          }
        }}
        rowKey="id"
        pagination={false}
        search={false}
        dateFormatter="string"
        options={false}
        value={setting}
        recordCreatorProps={{
          record: () => ({ id: (Math.random() * 1000000).toFixed(0) } as ISetting),
        }}
        editable={{
          type: 'multiple',
          editableKeys,
          onSave: async (_, data) => {
            if (typeof data.id === 'string' && data.id.length === 6)
              delete data.id

            settingAdd({ ...data }).then((res) => {
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
          onChange: setEditableRowKeys,
        }}
      />
    </PageContainer>
  )
}

export default Setting
