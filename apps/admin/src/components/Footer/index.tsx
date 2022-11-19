import { DefaultFooter } from '@ant-design/pro-components'
export default () => {
  const currentYear = new Date().getFullYear()
  return <DefaultFooter copyright={`${currentYear} 藏网阁`} links={[]} />
}
