<script setup lang="ts">
import { calendar } from 'js-calendar-converter'
const open = ref(false)
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

const days = {
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
  '2022-10-09': '0'
} as { [key: string]: string }

// 判断节假日 & 判断补班
const isWeek = (slotData: { day: string }) => {
  return days[slotData.day]
}

const nowLunar = computed(() => {
  const date = new Date()
  const now = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
  const lunar = getLunar({ day: now }) // 当前日期
  const year = lunar.lYear.toString() // 年
  const q = +date // 当前时间戳
  const j = +(new Date(year)) // 今年元旦
  const day = Math.ceil((q - j) / (24 * 60 * 60 * 1000)) // 今年第几天
  const w = new Date(`${year}/01/01`).getDay() // 一年的第一天是星期几
  return { ...lunar, day, weeks: Math.ceil((day + w - 1) / 7) }
})
</script>

<template>
  <div>
    <div flex="~ col" h-48 text-shadow-md rounded-2xl p-4 class="bg-gradient-to-rb from-#73b0fe to-#a789fe" @click="open = true">
      <b text="2xl">{{ nowLunar.lMonth }}月{{ nowLunar.lDay }}日</b>
      <b mt-4 text="xl">{{ nowLunar.ncWeek }}</b>
      <div mt-4 text-sm>
        <span mr-2>{{ nowLunar.gzYear }}({{ nowLunar.Animal }})年</span><span>{{ nowLunar.IMonthCn }}{{ nowLunar.IDayCn }}</span>
      </div>
      <div mt-4 text-sm>
        本年第{{ nowLunar.weeks }}周，第{{ nowLunar.day }}天
      </div>
    </div>
    <ModalNew v-model="open" cls="w-248">
      <div w-240 relative rounded-2xl>
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
    </ModalNew>
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
