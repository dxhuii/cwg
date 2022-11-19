import { Settings as LayoutSettings } from '@ant-design/pro-components'

const Settings: LayoutSettings & {
  pwa?: boolean
  logo?: string
} = {
  navTheme: 'light',
  layout: 'mix',
  contentWidth: 'Fluid',
  fixSiderbar: true,
  colorPrimary: '#1677FF',
  splitMenus: false,
  fixedHeader: true,
  pwa: false,
  logo: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
  colorWeak: false,
  title: 'Cang Wang Ge',
  iconfontUrl: ''
}

export default Settings
