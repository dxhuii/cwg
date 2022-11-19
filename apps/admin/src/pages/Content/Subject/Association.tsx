import { associationAdd, associationDelete } from '@/services/association'
import { subjectDetail, subjectList } from '@/services/subject'
import type { IAssociation, ISubject } from '@/services/typings'
import { ModalForm, ProCard } from '@ant-design/pro-components'
import { Button, Input, List, message, Skeleton, Tag } from 'antd'
import type { FC } from 'react'
import { useCallback, useEffect, useState } from 'react'

const { Search } = Input

const Association: FC<ISubject & { visible: boolean; setVisible: (visible: boolean) => void }> = props => {
  const { visible, setVisible, id, name } = props
  const [data, setData] = useState<ISubject[]>()
  const [detail, setDetail] = useState<ISubject>()
  const [initLoading, setInitLoading] = useState(true)
  const [wd, setWd] = useState('')
  const [notId, setNotId] = useState<number[]>()
  const [page, setPage] = useState(1)
  const getList = useCallback(
    async (params: { wd?: string; not?: number[] }, current = 1) => {
      const param = {
        current,
        pageSize: 10,
        filter: JSON.stringify({ ...params, not: params.not || notId })
      }
      const res = await subjectList(param)
      const list = res.data?.list || []
      setInitLoading(false)
      if (current! > 1) {
        setData([...data!, ...list])
        window.dispatchEvent(new Event('resize'))
      } else {
        setData(list)
      }
    },
    [notId]
  )

  const getDetail = useCallback(async () => {
    if (id) {
      const subject = await subjectDetail({ id })
      setDetail(subject.data)
      const not = subject.data.associate1.map(item => +item.id!)
      setNotId(not)
      getList({ not })
    }
  }, [id])

  useEffect(() => {
    getDetail()
  }, [id])

  const onLoadMore = () => {
    const current = page + 1
    setPage(current)
    getList({ wd }, current)
  }

  const loadMore = !initLoading ? (
    <div
      style={{
        textAlign: 'center',
        marginTop: 12,
        height: 32,
        lineHeight: '32px'
      }}
    >
      <Button onClick={onLoadMore}>loading more</Button>
    </div>
  ) : null

  const onAdd = async (item: ISubject) => {
    const add = { aid: id, taid: item.id, sid: 1, tsid: 1 } as IAssociation
    const result = await associationAdd(add)
    if (result.data) {
      getDetail()
      message.success('关联成功')
    } else {
      message.error('关联失败')
    }
  }

  const onDel = async (e: React.MouseEvent<HTMLElement>, item: ISubject) => {
    e.preventDefault()
    const aid = item?.association?.id as number
    const result = await associationDelete({ id: aid })
    if (result.data) {
      getDetail()
      message.success('删除成功')
    } else {
      message.error('删除失败')
    }
  }

  return (
    <ModalForm visible={visible} title={name} submitter={false} onVisibleChange={setVisible}>
      <ProCard title="关联" style={{ marginTop: -10 }} size="small" bordered>
        {detail?.associate1?.map(item => (
          <Tag key={item.id} onClose={e => onDel(e, item)} closable>
            {item.name}
          </Tag>
        ))}
      </ProCard>
      <ProCard title="被关联" style={{ marginTop: 10 }} size="small" bordered>
        {detail?.associate2?.map(item => (
          <Tag key={item.id} onClose={e => onDel(e, item)} closable>
            {item.name}
          </Tag>
        ))}
      </ProCard>

      <Search
        style={{ marginTop: 10 }}
        placeholder="请输入名称"
        onSearch={word => {
          getList({ wd: word })
          setWd(word)
        }}
        enterButton
      />
      <List
        className="demo-loadmore-list"
        loading={initLoading}
        itemLayout="horizontal"
        loadMore={loadMore}
        dataSource={data}
        renderItem={item => (
          <List.Item
            actions={[
              <a key="list-loadmore-edit" onClick={() => onAdd(item)}>
                关联
              </a>
            ]}
          >
            <Skeleton avatar title={false} loading={initLoading} active>
              <List.Item.Meta title={item.name} />
            </Skeleton>
          </List.Item>
        )}
      />
    </ModalForm>
  )
}

export default Association
