<script setup lang="ts">
import { calendar } from 'js-calendar-converter'
import { Dialog } from '@cwg/ui'
const open = ref()

const openCalendar = () => {
  open.value.openModal()
}
/**
 * 公历转农历
 * @param slotData 当前日期
 */
const getLunar = (slotData: { day: string }) => {
  const solarDayArr = slotData.day.split('-')
  return calendar.solar2lunar(solarDayArr[0], solarDayArr[1], solarDayArr[2])
}
/**
 * 公历转农历
 * @param slotData 当前日期数据
 * @param isFestival 是否节假日
 */
const solarToLunar = (slotData: { day: string }) => {
  // 公历转农历
  const lunarDay = getLunar(slotData)
  // 农历日期
  let lunarMD = lunarDay.IMonthCn + lunarDay.IDayCn
  if (lunarMD.includes('初一')) {
    // 每月初一 显示当前月 如正月初一 显示"正月"
    lunarMD = lunarMD.substr(0, lunarMD.length > 4 ? 3 : 2)
  }
  else {
    // 每月初一以外 不显示当前月 如正月初十 显示"初十"
    lunarMD = lunarMD.slice(lunarMD.length > 4 ? 3 : 2)
  }

  /**
   * 1. 公历节日
   * 2. 农历节日
   * 3. 农历节气
   */
  const festAndTerm: string[] = []
  lunarDay.festival && festAndTerm.push(lunarDay.festival)
  lunarDay.lunarFestival && festAndTerm.push(lunarDay.lunarFestival)
  lunarDay.Term && festAndTerm.push(lunarDay.Term)
  return festAndTerm.length ? festAndTerm.join(',') : lunarMD
}

const holiday = {
  2022: {
    '2022-01-01': '1',
    '2022-01-02': '1',
    '2022-01-03': '1',
    '2022-01-29': '0',
    '2022-01-30': '0',
    '2022-01-31': '1',
    '2022-02-01': '1',
    '2022-02-02': '1',
    '2022-02-03': '1',
    '2022-02-04': '1',
    '2022-02-05': '1',
    '2022-02-06': '1',
    '2022-04-02': '0',
    '2022-04-03': '1',
    '2022-04-04': '1',
    '2022-04-05': '1',
    '2022-04-24': '0',
    '2022-04-30': '1',
    '2022-05-01': '1',
    '2022-05-02': '1',
    '2022-05-03': '1',
    '2022-05-04': '1',
    '2022-05-07': '0',
    '2022-06-03': '1',
    '2022-06-04': '1',
    '2022-06-05': '1',
    '2022-09-10': '1',
    '2022-09-11': '1',
    '2022-09-12': '1',
    '2022-10-01': '1',
    '2022-10-02': '1',
    '2022-10-03': '1',
    '2022-10-04': '1',
    '2022-10-05': '1',
    '2022-10-06': '1',
    '2022-10-07': '1',
    '2022-10-08': '0',
    '2022-10-09': '0',
    '2022-12-31': '1'
  },
  2023: {
    '2023-01-01': '1',
    '2023-01-02': '1',
    '2023-01-21': '1',
    '2023-01-22': '1',
    '2023-01-23': '1',
    '2023-01-24': '1',
    '2023-01-25': '1',
    '2023-01-26': '1',
    '2023-01-27': '1',
    '2023-01-28': '0',
    '2023-01-29': '0',
    '2023-04-05': '1',
    '2023-04-23': '0',
    '2023-04-29': '1',
    '2023-04-30': '1',
    '2023-05-01': '1',
    '2023-05-02': '1',
    '2023-05-03': '1',
    '2023-05-06': '0',
    '2023-06-22': '1',
    '2023-06-23': '1',
    '2023-06-24': '1',
    '2023-06-25': '0',
    '2023-09-29': '1',
    '2023-09-30': '1',
    '2023-10-01': '1',
    '2023-10-02': '1',
    '2023-10-03': '1',
    '2023-10-04': '1',
    '2023-10-05': '1',
    '2023-10-06': '1',
    '2023-10-07': '0',
    '2023-10-08': '0'
  }
} as { [key: number]: { [key: string]: string } }

// 判断节假日 & 判断补班
const isWeek = (slotData: { day: string }) => {
  const year = +slotData.day.split('-')[0]
  return holiday?.[year]?.[slotData.day] || 0
}

const nowLunar = computed(() => {
  const date = new Date()
  const now = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
  const lunar = getLunar({ day: now }) // 当前日期
  const year = lunar.cYear.toString() // 年
  const q = +date // 当前时间戳
  const j = +(new Date(year)) // 今年元旦
  const day = Math.ceil((q - j) / (24 * 60 * 60 * 1000)) // 今年第几天
  const w = new Date(`${year}/01/01`).getDay() // 一年的第一天是星期几
  return { ...lunar, day, weeks: Math.ceil((day + w - 1) / 7) }
})

console.log(nowLunar.value)
</script>

<template>
  <div>
    <div flex="~ col" h-48 text-shadow-md rounded-2xl p-4 class="bg-gradient-to-rb from-#73b0fe to-#a789fe" @click="openCalendar">
      <b text="2xl">{{ nowLunar.cMonth }}月{{ nowLunar.cDay }}日</b>
      <b mt-4 text="xl">{{ nowLunar.ncWeek }}</b>
      <div mt-4 text-sm>
        <span mr-2>{{ nowLunar.gzYear }}({{ nowLunar.Animal }})年</span><span>{{ nowLunar.IMonthCn }}{{ nowLunar.IDayCn }}</span>
      </div>
      <div mt-4 text-sm>
        本年第{{ nowLunar.weeks }}周，第{{ nowLunar.day }}天
      </div>
    </div>
    <Dialog ref="open" title="日历" cls="w-248">
      <div relative rounded-2xl>
        <el-calendar>
          <template #date-cell="{ data }">
            <div relative h-full>
              <span v-if="isWeek(data)" flex justify-center items-center absolute top-0 right-0 w-6 h-6 :class="isWeek(data) === '1' ? 'bg-red text-white' : 'bg-gray/50 text-black'">{{ isWeek(data) === '1' ? '休' : '班' }}</span>
              <p :class="data.isSelected ? 'is-selected' : ''">
                {{ data.day.split('-').slice(2).join('-') }}
              </p>
              <div absolute bottom-0 left-0>
                {{ solarToLunar(data) }}
              </div>
            </div>
          </template>
        </el-calendar>
      </div>
    </Dialog>
  </div>
</template>

<style>
.el-calendar__body {
  padding: 0;
}
.el-calendar-table td {
  position: relative;
}
</style>
