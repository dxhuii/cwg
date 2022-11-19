import { subjectList } from '@/services/subject'
import { ISubject } from '@/services/typings'
import { ModalForm } from '@ant-design/pro-components'
import { Button, Col, Input, List, Row, Skeleton, Tag, Typography } from 'antd'
import { FC, useCallback, useEffect, useState } from 'react'

const { Search } = Input
const { Title } = Typography

interface IAssociationProps {
  value?: ISubject[]
  onChange?: (value: ISubject[]) => void
}

const Association: FC<IAssociationProps> = props => {
  const { onChange, value } = props
  const [data, setData] = useState<ISubject[]>()
  const [initLoading, setInitLoading] = useState(true)
  const [wd, setWd] = useState('')
  const [page, setPage] = useState(1)
  const getList = useCallback(async (params?: { wd: string }, current?: number) => {
    const param = {
      current,
      pageSize: 10,
      filter: JSON.stringify(params)
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
  }, [])

  useEffect(() => {
    getList()
  }, [])

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

  const onAdd = (item: ISubject) => {
    const newValue = [...value!, item]
    onChange && onChange(newValue)
  }

  const onDel = (item: ISubject) => {
    console.log(item, 'item', value)
    const newValue = value!.filter(i => i.id !== item.id)
    onChange && onChange(newValue)
  }

  console.log(value)

  return (
    <>
      {value?.map(item => (
        <Tag key={item.id} onClose={() => onDel(item)} closable>
          {item.name}
        </Tag>
      ))}
      <ModalForm title="关联剧集" trigger={<Button type="link">关联剧集</Button>} submitter={false}>
        <Row gutter={16}>
          <Col span={12}>
            <Title level={5}>已关联</Title>
            <List
              className="demo-loadmore-list"
              loading={initLoading}
              itemLayout="horizontal"
              dataSource={value}
              renderItem={item => (
                <List.Item
                  actions={[
                    <a key="del" onClick={() => onDel(item)}>
                      取消
                    </a>
                  ]}
                >
                  <Skeleton avatar title={false} loading={initLoading} active>
                    <List.Item.Meta title={item.name} />
                  </Skeleton>
                </List.Item>
              )}
            />
          </Col>
          <Col span={12}>
            <Search
              placeholder="请输入名称"
              onSearch={wd => {
                getList({ wd })
                setWd(wd)
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
                    <a key="add" onClick={() => onAdd(item)}>
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
          </Col>
        </Row>
      </ModalForm>
    </>
  )
}

export default Association
