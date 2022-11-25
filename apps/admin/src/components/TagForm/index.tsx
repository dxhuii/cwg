import { ModalForm } from '@ant-design/pro-components'
import { Button, List, Tag } from 'antd'
import type { FC } from 'react'
import { useEffect } from 'react'

interface ValueType { id: number; name: string }

interface ITagFormProps {
  value?: ValueType[]
  onChange?: (value: ValueType) => void
  list?: any[]
}

const TagForm: FC<ITagFormProps> = props => {
  const { value, list } = props
  useEffect(() => {
    console.log(value, 'tag')
  }, [value])

  return (
    <>
      {value?.map(item => (
        <Tag closable key={item.id}>
          {item.name}
        </Tag>
      ))}
      <ModalForm submitter={false} title='关联剧集' trigger={<Button type='link'>添加</Button>}>
        <List
          dataSource={list}
          itemLayout='horizontal'
          renderItem={item => (
            <List.Item actions={[<a key='list-loadmore-edit'>关联</a>]}>
              <List.Item.Meta title={item.name} />
            </List.Item>
          )} />
      </ModalForm>
    </>
  )
}

export default TagForm
