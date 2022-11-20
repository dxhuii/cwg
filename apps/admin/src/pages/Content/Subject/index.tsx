import type { ISubject } from '@cwg/types'
import { PlusOutlined } from '@ant-design/icons'
import type { ActionType, ProColumns } from '@ant-design/pro-components'
import { FooterToolbar, PageContainer, ProTable } from '@ant-design/pro-components'
import { useModel } from '@umijs/max'
import { Button, Popconfirm, Popover } from 'antd'
import type { FC } from 'react'
import { useEffect, useMemo, useRef, useState } from 'react'
import Association from './Association'
import EditSubject from './EditSubject'
import { areaEnum, findMcat, languageEnum, statusType } from '@/utils'
import { subjectList } from '@/services/subject'

const weekdayEnum = {
  1: '一',
  2: '二',
  3: '三',
  4: '四',
  5: '五',
  6: '六',
  7: '日',
}

const Subject: FC = () => {
  const actionRef = useRef<ActionType>()
  const [selectedRowsState, setSelectedRows] = useState<ISubject[]>([])
  const { mcat, getMcat } = useModel('useMcat')
  const [modalVisit, setModalVisit] = useState(false)
  const [assOpen, setAssOpen] = useState(false)
  const [editData, setEditData] = useState<ISubject>()

  const del = (id?: number | string) => {
    console.log(id)
  }

  useEffect(() => {
    getMcat()
  }, [getMcat])

  const mcatEnum = useMemo(() => {
    let obj = {}
    mcat.forEach((item) => {
      obj = {
        ...obj,
        [item.id!]: {
          text: item.name,
          status: item.id,
        },
      }
    })
    return obj
  }, [mcat])
  const columns: ProColumns<ISubject>[] = [
    {
      title: '名称',
      dataIndex: 'name',
      copyable: true,
      render: (_, entity) => (
        <Popover
          content={
            <img
              src={entity.pic}
              style={{
                width: 200,
              }}
            />
          }
        >
          {entity.name}
        </Popover>
      ),
    },
    {
      title: '小分类',
      dataIndex: 'mcid',
      render: (_, entity) => findMcat(mcat, entity.mcid, true) as any,
      valueEnum: mcatEnum,
    },
    {
      title: '语言',
      dataIndex: 'language',
      valueEnum: languageEnum,
    },
    {
      title: '地区',
      dataIndex: 'area',
      valueEnum: areaEnum,
    },
    {
      title: '星期',
      dataIndex: 'weekday',
      render: (_, entity) => weekdayEnum[entity.weekday?.[0]],
      valueEnum: weekdayEnum,
    },
    {
      title: '连载',
      dataIndex: 'isend',
      hideInForm: true,
      render: (_, entity) => (entity.isend ? '完结' : <>连载({entity.serialized})</>),
      valueEnum: {
        1: {
          text: '连载',
          status: 'success',
        },
        0: {
          text: '完结',
          status: 'error',
        },
      },
    },
    {
      title: '人气',
      sorter: true,
      search: false,
      dataIndex: 'hits',
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
      title: '状态',
      dataIndex: 'status',
      valueEnum: statusType,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, entity) => [
        <span
          key="edit"
          onClick={() => {
            setModalVisit(true)
            setEditData(entity)
          }}
        >
          <a>编辑</a>
        </span>,
        <a
          key="subject"
          onClick={() => {
            setAssOpen(true)
            setEditData(entity)
          }}
        >
          关联剧集
        </a>,
        <Popconfirm key="delete" onConfirm={() => del(entity.id)} title="确定要删除吗？">
          <a>删除</a>
        </Popconfirm>,
      ],
    },
  ]
  return (
    <PageContainer header={{ title: false }}>
      <ProTable<ISubject>
        columns={columns}
        actionRef={actionRef}
        request={async (params) => {
          const { current, pageSize, name: wd, mcid, language, area, isend, updated_at, weekday } = params
          const param = {
            current,
            pageSize,
            filter: JSON.stringify({
              wd,
              mcid,
              language,
              area,
              isend,
              weekday,
              created_at: updated_at?.join(','),
            }),
          }
          const res = await subjectList(param)
          return {
            data: res.data?.list,
            total: res.data?.total,
            success: true,
          }
        }}
        dateFormatter="string"
        toolBarRender={() => [
          <Button key="primary" type="primary" onClick={() => setModalVisit(true)}>
            <PlusOutlined /> 新建
          </Button>,
        ]}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows)
          },
        }}
        rowKey="id"
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
      {modalVisit && (
        <EditSubject visible={modalVisit} setVisible={setModalVisit} editData={editData} setEditData={setEditData} actionRef={actionRef} />
      )}
      {assOpen && <Association {...editData!} visible={assOpen} setVisible={setAssOpen} />}
    </PageContainer>
  )
}

export default Subject
