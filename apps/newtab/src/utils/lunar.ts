function base64ToBit(base64Str: string) {
  const base64CodeMap = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
  const result = []
  for (let i = 0; i < base64Str.length; i++) {
    const n = base64CodeMap.indexOf(base64Str[i])
    result.push(n.toString(2).padStart(6, '0'))
  }
  return result.join('')
}

function checkDate(year: number, month: number, date: number) {
  if (year < 1901 || year > 2100)
    throw new Error('Invalid Year')

  if (month < 1 || month > 12)
    throw new Error('Invalid Month')

  if (date < 1 || date > 31)
    throw new Error('Invalid Date')

  if ([4, 6, 9, 11].includes(month) && date > 30)
    throw new Error('Invalid Date')

  if (month === 2) {
    if (date > 29) {
      throw new Error('Invalid Date')
    }
    else {
      let isLeap = false
      if (year % 400 === 0)
        isLeap = true

      else if (year % 4 === 0 && year % 100 !== 0)
        isLeap = true

      if (!isLeap && date > 28)
        throw new Error('Invalid Date')
    }
  }
}

const table: {
  solarDate: { y: number; m: number; d: number; obj: Date }
  leapMonth: number
  months: number[]
  heavenlyStem: number
  earthlyBranch: number
}[] = []
const heavenlyStemStr = '甲乙丙丁戊己庚辛壬癸'
const earthlyBranchStr = '子丑寅卯辰巳午未申酉戌亥'
const zodiacStr = '鼠牛虎兔龙蛇马羊猴鸡狗猪'
const lunarMonthStr = '正二三四五六七八九十冬腊'
const nubmerStr = '一二三四五六七八九十'

function decompressData() {
  const base64Str
    = 'hLaCVwUrqpNDSYNlUaqgrUE1pJXQSuak2FJoaSrqlC1QNailtBK26TcElwpLWyWDUoNqJW1ArYJVySXgkuzJYNSg6lVtSC1oFbHJuCS58loZKhqU20oLVQVqSq2BLoSWlkrCpV7SoNlBaqqrUE2gpbNSuClcVKg6VBqpq1QVaglslK4KVwUmPpMGyrrVQVqCW1UroJWhSamk0NJY1ShaoFtTS2glbBJtKS4Ul1ZLBqUG1GraBVsEq6pLwSXBks2pQdSw1lBawKtlk2hJcGSyalQ1KDaUlqoK1PVbAl0JLVyVhUqFpSWqgrVlVqCXQUtspXBSsKk0dKg1UFapJtQS2alcFJwaTL0mDVMFqja1BLbaV0ErQpNbSWGkoapLtUC1oFbSStgk29JcKSwqlW1KDaQVtGq2CTeEl4JLgyWzUoOpQaqSrYFVwSXHkuDJZ9SoalBtKq1UFagptRS6ClsVKwqVC0prVQVqgq0lLoKWwUrOpODSbuUwaqCtVU2oJbBSuik4NFo6TBqkG1TNagVtBK5KToUWhoqWyUNUg'
  const bitStr = base64ToBit(base64Str)
  let solarDate = { y: 1900, m: 1, d: 31, obj: new Date(1900, 0, 31, 0, 0, 0, 0) }
  let heavenlyStem = 6 // 天干
  let earthlyBranch = 0 // 地支
  for (let i = 0; i < bitStr.length;) {
    if (i + 16 >= bitStr.length)
      break

    const head = bitStr.substr(i, 4)
    i += 4
    const leapMonth = +`0b${head}`
    const monthCount = leapMonth > 0 ? 13 : 12
    const months = bitStr
      .substr(i, monthCount)
      .split('')
      .map(o => +o)
    i += monthCount

    table.push({
      solarDate,
      leapMonth,
      months,
      heavenlyStem,
      earthlyBranch
    })

    const dateCount = monthCount * 29 + months.filter(o => o === 1).length
    const newSolarDate = new Date(solarDate.y, solarDate.m - 1, solarDate.d + dateCount, 0, 0, 0, 0)
    solarDate = {
      y: newSolarDate.getFullYear(),
      m: newSolarDate.getMonth() + 1,
      d: newSolarDate.getDate(),
      obj: newSolarDate
    }
    heavenlyStem = (heavenlyStem + 1) % 10
    earthlyBranch = (earthlyBranch + 1) % 12
  }
}

decompressData()

function isBefore(base: { y: number; m: number; d: number }, target: { y: any; m: any; d: any }) {
  if (base.y !== target.y)
    return base.y > target.y

  else if (base.m !== target.m)
    return base.m > target.m

  else if (base.d !== target.d)
    return base.d > target.d

  return false
}

function getLunarStr(month: number, date: number, isLeap: boolean) {
  const monthStr = `${isLeap ? '闰' : ''}${lunarMonthStr[month - 1]}月`
  if (date <= 10)
    return `${monthStr}初${nubmerStr[date - 1]}`

  else if (date < 20)
    return `${monthStr}十${nubmerStr[date - 11]}`

  else if (date === 20)
    return `${monthStr}二十`

  else if (date > 20)
    return `${monthStr}廿${nubmerStr[date - 21]}`

  else
    return `${monthStr}三十`
}

function getLunar(year: number, month: number, date: number) {
  year = Math.floor(+year)
  month = Math.floor(+month)
  date = Math.floor(+date)
  checkDate(year, month, date)
  let index = year - 1900
  let row = table[index]
  if (isBefore(row.solarDate, { y: year, m: month, d: date })) {
    index -= 1
    row = table[index]
  }
  if (!row)
    throw new Error('Invalid Date')

  const targetDate = new Date(year, month - 1, date, 0, 0, 0, 0)
  let delta = Math.round((targetDate.getTime() - row.solarDate.obj.getTime()) / (24 * 60 * 60 * 1000))
  let afterLeap = false
  for (let i = 0; i < row.months.length; i++) {
    const isLeap = row.leapMonth > 0 && i === row.leapMonth
    if (isLeap)
      afterLeap = true

    const days = 29 + row.months[i]
    if (delta < days) {
      const lunarMonth = afterLeap ? i : i + 1
      return {
        lunarMonth,
        lunarDate: delta + 1,
        isLeap,
        lunarYear: `${heavenlyStemStr[row.heavenlyStem]}${earthlyBranchStr[row.earthlyBranch]}年`,
        zodiac: `${zodiacStr[row.earthlyBranch]}`,
        dateStr: getLunarStr(lunarMonth, delta + 1, isLeap)
      }
    }
    else {
      delta -= days
    }
  }
  throw new Error('There\'s something wrong!')
}

export default getLunar
