import { PageContainer } from '@ant-design/pro-components'
import { Alert, Card, Typography } from 'antd'
import type { ReactNode } from 'react'
import React from 'react'
import styles from './Welcome.less'

const CodePreview: React.FC<{ children: ReactNode }> = ({ children }) => (
  <pre className={styles.pre}>
    <code>
      <Typography.Text copyable>{children}</Typography.Text>
    </code>
  </pre>
)

export const Welcome = (): React.ReactNode => {
  return (
    <PageContainer>
      <Card>
        <Alert
          banner
          message='更快更强的重型组件，已经发布。'
          showIcon
          style={{
            margin: -12,
            marginBottom: 24
          }}
          type='success' />
        <Typography.Text strong>
          高级表格{' '}
          <a href='https://procomponents.ant.design/components/table' rel='noopener noreferrer' target='__blank'>
            欢迎使用
          </a>
        </Typography.Text>
        <CodePreview>yarn add @ant-design/pro-table</CodePreview>
        <Typography.Text
          strong
          style={{
            marginBottom: 12
          }}>
          高级布局{' '}
          <a href='https://procomponents.ant.design/components/layout' rel='noopener noreferrer' target='__blank'>
            欢迎使用
          </a>
        </Typography.Text>
        <CodePreview>yarn add @ant-design/pro-layout</CodePreview>
      </Card>
    </PageContainer>
  )
}
export default Welcome
