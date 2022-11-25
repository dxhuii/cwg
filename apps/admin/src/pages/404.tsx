import { history } from '@umijs/max'
import { Button, Result } from 'antd'
import React from 'react'

const NoFoundPage: React.FC = () => (
  <Result
    extra={
      <Button onClick={() => history.push('/')} type='primary'>
        Back Home
      </Button>
    }
    status='404'
    subTitle='Sorry, the page you visited does not exist.'
    title='404' />
)

export default NoFoundPage
