import { stringify } from 'querystring'
import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons'
import { history, useModel } from '@umijs/max'
import { Avatar, Spin } from 'antd'
import type { ItemType } from 'antd/es/menu/hooks/useItems'
import React from 'react'
import { flushSync } from 'react-dom'
import HeaderDropdown from '../HeaderDropdown'
import styles from './index.less'
import { outLogin } from '@/services/user'

export interface GlobalHeaderRightProps {
  menu?: boolean
}
export interface MenuInfo {
  key: string
}

const AvatarDropdown: React.FC<GlobalHeaderRightProps> = ({ menu }) => {
  /**
   * 退出登录，并且将当前的 url 保存
   */
  const loginOut = async () => {
    await outLogin()
    const { search, pathname } = window.location
    const urlParams = new URL(window.location.href).searchParams
    /** 此方法会跳转到 redirect 参数所在的位置 */
    const redirect = urlParams.get('redirect')
    // Note: There may be security issues, please note
    if (window.location.pathname !== '/login' && !redirect) {
      history.replace({
        pathname: '/login',
        search: stringify({
          redirect: pathname + search
        })
      })
    }
  }
  const { initialState, setInitialState } = useModel('@@initialState')

  const loading = (
    <span className={`${styles.action} ${styles.account}`}>
      <Spin
        size='small'
        style={{
          marginLeft: 8,
          marginRight: 8
        }} />
    </span>
  )

  if (!initialState)
    return loading

  const { currentUser } = initialState

  if (!currentUser || !currentUser.username)
    return loading

  const menuItems: ItemType[] = [
    ...(menu
      ? [
          {
            key: 'center',
            icon: <UserOutlined />,
            label: '个人中心'
          },
          {
            key: 'settings',
            icon: <SettingOutlined />,
            label: '个人设置'
          },
          {
            type: 'divider' as const
          }
        ]
      : []),
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: (
        <a
          onClick={() => {
            flushSync(() => {
              setInitialState(s => ({ ...s, currentUser: undefined }))
            })
            loginOut()
          }}>
          退出登录
        </a>
      )
    }
  ]

  return (
    <HeaderDropdown menu={{ items: menuItems }}>
      <span className={`${styles.action} ${styles.account}`}>
        <Avatar alt='avatar' className={styles.avatar} size='small' src={currentUser.avatar} />
        <span className={`${styles.name} anticon`}>{currentUser.username}</span>
      </span>
    </HeaderDropdown>
  )
}

export default AvatarDropdown
