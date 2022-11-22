<script setup lang="ts">
import { calendar } from 'js-calendar-converter'
const open = ref(false)
const solarToLunar = (slotData: { day: string }) => {
  const solarDayArr = slotData.day.split('-')
  // 公历转农历
  const lunarDay = calendar.solar2lunar(solarDayArr[0], solarDayArr[1], solarDayArr[2])/* global calendar */
  // 农历日期
  let lunarMD = lunarDay.IMonthCn + lunarDay.IDayCn
  if (lunarMD.includes('初一')) {
    // 每月初一 显示当前月 如正月初一 显示"正月"
    lunarMD = lunarMD.substr(0, 2)
  }
  else {
    // 每月初一以外 不显示当前月 如正月初十 显示"初十"
    lunarMD = lunarMD.slice(2)
  }
  // 公历节日\农历节日\农历节气
  const festAndTerm: string[] = []
  festAndTerm.push(lunarDay.festival ?? '')
  festAndTerm.push(lunarDay.lunarFestival ?? '')
  festAndTerm.push(lunarDay.Term ?? '')
  return festAndTerm.join('') || lunarMD
}

// 是否节假日
// const isFestival = (slotDate: any, slotData: { day: string }) => {
//   const solarDayArr = slotData.day.split('-')
//   const lunarDay = calendar.solar2lunar(solarDayArr[0], solarDayArr[1], solarDayArr[2])
//   // 公历节日\农历节日\农历节气
//   let festAndTerm: any = []
//   festAndTerm.push(lunarDay.festival == null ? '' : ` ${lunarDay.festival}`)
//   festAndTerm.push(lunarDay.lunarFestival == null ? '' : `${lunarDay.lunarFestival}`)
//   festAndTerm.push(lunarDay.Term == null ? '' : `${lunarDay.Term}`)
//   festAndTerm = festAndTerm.join('')
//   return festAndTerm
// }
// 判断节假日
// const isWeek = (data: any) => {
//   console.log(data)
//   const month = (data.getMonth() + 1).toString().length === 2 ? (data.getMonth() + 1) : (`0${data.getMonth() + 1}`)
//   const leaveDay = `${data.getUTCFullYear()}-${month}-${data.getDate()}`
//   return leaveDay
// }
// // 判断补班
// const isNoWeek = (data: any) => {
//   const month = (data.getMonth() + 1).toString().length === 2 ? (data.getMonth() + 1) : (`0${data.getMonth() + 1}`)
//   const leaveDay = `${data.getUTCFullYear()}-${month}-${data.getDate()}`
//   return leaveDay
// }
const nowLunar = computed(() => {
  return calendar.lunar2solar(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate())
})
const getDay = computed(() => {
  const now = new Date() as any
  const now2 = new Date(new Date().getFullYear().toString()) as any
  const day = Math.ceil((now - now2) / (24 * 60 * 60 * 1000))
  const days = new Date(`${new Date().getFullYear().toString()}/01/01`).getDay()
  return {
    day,
    week: Math.ceil((day + days - 1) / 7)
  }
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
        本年第{{ getDay.week }}周，第{{ getDay.day }}天
      </div>
    </div>
    <ModalNew v-model="open" cls="w-248">
      <div w-240 relative rounded-2xl>
        <el-calendar>
          <template #date-cell="{ data }">
            <div>
              {{ solarToLunar(data) }}
            </div>
            <!-- <div style="float: right;" class="lunar" :class="{ festival: isFestival(date, data) }">
              {{ solarToLunar(date, data) }}
            </div> -->
            <!-- <span v-if="isWeek(date)" style="float: left;" class="rest">休</span>
            <span v-if="isNoWeek(date)" style="float: left;" class="rest1">班</span> -->
            <p :class="data.isSelected ? 'is-selected' : ''">
              {{ data.day.split('-').slice(1).join('-') }}
              {{ data.isSelected ? '✔️' : '' }}
            </p>
          </template>
        </el-calendar>
      </div>
    </ModalNew>
  </div>
</template>
