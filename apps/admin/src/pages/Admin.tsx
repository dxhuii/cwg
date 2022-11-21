import { HeartTwoTone, SmileTwoTone } from '@ant-design/icons'
import { PageContainer } from '@ant-design/pro-components'
import { Alert, Card, Typography } from 'antd'
import React from 'react'
export const Admin = (): React.ReactNode => {
  return (
    <PageContainer content=' 这个页面只有 admin 权限才能查看'>
      <Card>
        <Alert
          banner
          message='更快更强的重型组件，已经发布。'
          showIcon
          style={{
            margin: -12,
            marginBottom: 48,
          }}
          type='success' />
        <Typography.Title
          level={2}
          style={{
            textAlign: 'center',
          }}>
          <SmileTwoTone /> Ant Design Pro <HeartTwoTone twoToneColor='#eb2f96' /> You
        </Typography.Title>
      </Card>
      <p style={{ textAlign: 'center', marginTop: 24 }}>
        Want to add more pages? Please refer to{' '}
        <a href='https://pro.ant.design/docs/block-cn' rel='noopener noreferrer' target='_blank'>
          use block
        </a>。
      </p>
    </PageContainer>
  )
}

export default Admin
