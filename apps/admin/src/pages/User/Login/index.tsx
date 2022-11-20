import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { LoginForm, ProFormCheckbox, ProFormText } from '@ant-design/pro-components'
import { history, useModel } from '@umijs/max'
import { Alert, message } from 'antd'
import md5 from 'md5'
import React, { useEffect, useState } from 'react'
import { flushSync } from 'react-dom'
import styles from './index.less'
import { login } from '@/services/user'
import Footer from '@/components/Footer'

const LoginMessage: React.FC<{
  content: string
}> = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
)

const Login: React.FC = () => {
  const [userLoginState, setUserLoginState] = useState<API.LoginResult>({})
  const { initialState, setInitialState } = useModel('@@initialState')

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.()
    if (userInfo) {
      flushSync(() => {
        setInitialState(s => ({
          ...s,
          currentUser: userInfo,
        }))
      })
      /** 此方法会跳转到 redirect 参数所在的位置 */
      if (!history)
        return
      const urlParams = new URL(window.location.href).searchParams
      history.push(urlParams.get('redirect') || '/')
    }
  }

  useEffect(() => {
    fetchUserInfo()
  }, [])

  const handleSubmit = async (values: API.LoginParams) => {
    try {
      // 登录
      const res = await login({ ...values, password: md5(values.password!) })
      if (res.status === 200) {
        message.success('登录成功！')
        localStorage.token = res?.data
        await fetchUserInfo()
        return
      }
      setUserLoginState(res)
    }
    catch (error) {
      console.log(error, 'error')
      message.error('登录失败，请重试！')
    }
  }

  const { status } = userLoginState
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <LoginForm
          // logo={<img alt="logo" src="/logo.svg" />}
          title="🔖 🌐 🏘️"
          subTitle={'CWG'}
          initialValues={{
            autoLogin: true,
          }}
          onFinish={async (values) => {
            await handleSubmit(values as API.LoginParams)
          }}
        >
          {status && status !== 200 && <LoginMessage content={'错误的用户名和密码'} />}
          <ProFormText
            name="username"
            fieldProps={{
              size: 'large',
              prefix: <UserOutlined className={styles.prefixIcon} />,
            }}
            placeholder={'用户名'}
            rules={[
              {
                required: true,
                message: '用户名是必填项！',
              },
            ]}
          />
          <ProFormText.Password
            name="password"
            fieldProps={{
              size: 'large',
              prefix: <LockOutlined className={styles.prefixIcon} />,
            }}
            placeholder={'密码'}
            rules={[
              {
                required: true,
                message: '密码是必填项！',
              },
            ]}
          />
          <div
            style={{
              marginBottom: 24,
            }}
          >
            <ProFormCheckbox noStyle name="autoLogin">
              自动登录
            </ProFormCheckbox>
            <a
              style={{
                float: 'right',
              }}
            >
              忘记密码 ?
            </a>
          </div>
        </LoginForm>
      </div>
      <Footer />
    </div>
  )
}

export default Login
