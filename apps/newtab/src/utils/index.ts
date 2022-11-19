export const formatPic = (url: string, width = 2560, height = 1440) => {
  /**
   * https://cn.bing.com/th?id=OHR.Malaga_ZH-CN9644862917_UHD.jpg&w=2880&h=1620
   * https://cn.bing.com/th?id=OHR.Malaga_ZH-CN9644862917_UHD.jpg&w=2560&h=1440
   * https://cn.bing.com/th?id=OHR.Malaga_ZH-CN9644862917_UHD.jpg&w=1920&h=1080
   */
  if (!url)
    return ''
  const r = url?.split('_1920')
  return `https://cn.bing.com${r[0]}${`_UHD.jpg&w=${width}&h=${height}`}`
}

export const jump = async (url: string) => {
  // 先获取当前页面的tabID
  chrome.tabs.getCurrent((tab) => {
    chrome.tabs.create({
      url,
      index: tab!.index! + 1,
      openerTabId: tab!.id,
    })
  })
}

// 获取动态替换key
export const getExecStrs = (str: string) => {
  const reg = /\#\{(.+?)\}/g
  const list = []
  let result = null
  do {
    result = reg.exec(str)
    result && list.push(result[1])
  } while (result)
  return list
}

// 根据指定name 替换渲染
export const getStr = (str: string, name: string, val = '') => {
  const reg = new RegExp(`#{${name}}`, 'g')
  const newStr = str.replace(reg, val)
  return newStr
}

// 遍历替换
export const eachKeys = (keys: string[] = [], str: string, data: any) => {
  if (!keys || keys.length <= 0)
    return str

  let newStr = str
  keys.forEach((v) => {
    newStr = getStr(newStr, v, data[v])
  })
  return newStr
}

class Util {
  format(obj: { [key: string]: string }, url: string) {
    for (const key in obj)
      url = url.replace(new RegExp(`\\{${key}\\}`, 'g'), obj[key])
    return url
  }
}

export const util = new Util()

