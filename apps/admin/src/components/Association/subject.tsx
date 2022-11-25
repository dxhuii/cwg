import type { ISubject } from '@cwg/types'
import { ModalForm } from '@ant-design/pro-components'
import { Button, Col, Input, List, Row, Skeleton, Tag, Typography } from 'antd'
import type { FC } from 'react'
import { useCallback, useEffect, useState } from 'react'
import { subjectList } from '@/services/subject'

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
    }
    else {
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

  const loadMore = !initLoading
    ? (
      <div
        style={{
          textAlign: 'center',
          marginTop: 12,
          height: 32,
          lineHeight: '32px'
        }}>
        <Button onClick={onLoadMore}>loading more</Button>
      </div>
      )
    : null

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
        <Tag closable key={item.id} onClose={() => onDel(item)}>
          {item.name}
        </Tag>
      ))}
      <ModalForm submitter={false} title='关联剧集' trigger={<Button type='link'>关联剧集</Button>}>
        <Row gutter={16}>
          <Col span={12}>
            <Title level={5}>已关联</Title>
            <List
              className='demo-loadmore-list'
              dataSource={value}
              itemLayout='horizontal'
              loading={initLoading}
              renderItem={item => (
                <List.Item
                  actions={[
                    <a key='del' onClick={() => onDel(item)}>
                      取消
                    </a>
                  ]}>
                  <Skeleton active avatar loading={initLoading} title={false}>
                    <List.Item.Meta title={item.name} />
                  </Skeleton>
                </List.Item>
              )} />
          </Col>
          <Col span={12}>
            <Search
              enterButton
              onSearch={wd => {
                getList({ wd })
                setWd(wd)
              }}
              placeholder='请输入名称' />
            <List
              className='demo-loadmore-list'
              dataSource={data}
              itemLayout='horizontal'
              loadMore={loadMore}
              loading={initLoading}
              renderItem={item => (
                <List.Item
                  actions={[
                    <a key='add' onClick={() => onAdd(item)}>
                      关联
                    </a>
                  ]}>
                  <Skeleton active avatar loading={initLoading} title={false}>
                    <List.Item.Meta title={item.name} />
                  </Skeleton>
                </List.Item>
              )} />
          </Col>
        </Row>
      </ModalForm>
    </>
  )
}

export default Association
