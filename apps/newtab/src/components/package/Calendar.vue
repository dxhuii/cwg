<script setup lang="ts">
import { HolidayUtil, Lunar, Solar, SolarMonth, SolarUtil, SolarWeek } from 'lunar-typescript'
const open = ref(false)
const weekArr = ref(['日', '一', '二', '三', '四', '五', '六'])
let month = SolarMonth.fromDate(new Date())
const week = ref()
const nowYearMonth = ref()
const dateList = ref()
const day = Solar.fromDate(new Date())
const monthEnd = ref()
const date = (month: SolarMonth) => {
  const days = month.getDays()
  const list = []
  week.value = days[0].getWeek()
  nowYearMonth.value = month.toFullString()
  for (let i = 0, j = days.length; i < j; i++) {
    const d = days[i]
    const dl = d.getLunar()
    const fs = []
    const jq = dl.getJieQi()
    const obj = {
      jr: '', // 节日
      d: 0, // 日期
      nl: '', // 农历
      yy: '', // 闰月
      work: 0 // 是否工作日
    }
    if (jq)
      fs.push(jq)

    let festivals = d.getFestivals()
    for (let m = 0, n = festivals.length; m < n; m++)
      fs.push(festivals[m])

    festivals = d.getOtherFestivals()
    for (let m = 0, n = festivals.length; m < n; m++)
      fs.push(festivals[m])

    festivals = dl.getFestivals()
    for (let m = 0, n = festivals.length; m < n; m++)
      fs.push(festivals[m])

    festivals = dl.getOtherFestivals()
    for (let m = 0, n = festivals.length; m < n; m++)
      fs.push(festivals[m])

    obj.d = d.getDay()
    if (fs.length > 0)
      obj.jr = fs.join(',')

    if (dl.getDay() === 1)
      obj.yy = `${dl.getMonthInChinese()}月`
    else
      obj.nl = dl.getDayInChinese()
    const h = HolidayUtil.getHoliday(d.toYmd())
    if (h)
      obj.work = h.isWork() ? 1 : 2 // 2 休息日 1 工作日

    list.push(obj)
  }
  dateList.value = list

  const m = days.length
  const w = (week.value === 5 && m > 30) || week.value === 6 ? 6 : 5
  monthEnd.value = w * 7 - m - week.value // 月末空白天数
}

date(month)

const prev = () => {
  month = month.next(-1)
  date(month)
}

const next = () => {
  month = month.next(1)
  date(month)
}
const lunar = computed(() => Lunar.fromDate(new Date()))
const nowYear = computed(() => `${day.getYear()}年${day.getMonth()}月`)
const sWeek = computed(() => SolarWeek.fromDate(new Date(), 1))
const useYear = computed(() => SolarUtil.getDaysInYear(day.getYear(), day.getMonth(), day.getDay()))

console.log(nowYear.value, nowYearMonth.value)
</script>

<template>
  <div>
    <div flex="~ col" h-48 text-shadow-md rounded-2xl p-4 class="bg-gradient-to-rb from-#73b0fe to-#a789fe" @click="open = true">
      <b text="2xl">{{ day.getMonth() }}月{{ day.getDay() }}日</b>
      <b mt-4 text="xl">周{{ weekArr[day.getWeek()] }}</b>
      <div mt-4 text-sm>
        <span mr-2>{{ lunar.getYearZhi() }}{{ lunar.getYearGan() }}({{ lunar.getShengxiao() }})年</span><span>{{ lunar.getMonthInChinese() }}月{{ lunar.getDayInChinese() }}</span>
      </div>
      <div mt-4 text-sm>
        本年第{{ sWeek.getIndexInYear() }}周，第{{ useYear }}天
      </div>
    </div>
    <ModalNew v-model="open" cls="w-248">
      <div w-240 relative rounded-2xl>
        <div text="black" h-10 inline-flex items-center border="~ solid gray-200 rounded-lg" mb-4>
          <a px-4 border="r solid gray-200" cursor-pointer @click="prev">上一月</a>
          <span px-4>{{ nowYearMonth }}</span>
          <a px-4 border="l solid gray-200" cursor-pointer @click="next">下一月</a>
        </div>
        <ul text="black base" flex="~ wrap">
          <li v-for="(item, i) in weekArr" :key="i" class="w-[14.28%]" border="b solid gray-100" text="md" pb-2>
            {{ item }}
          </li>
        </ul>
        <ul text="black base" flex="~ wrap" border="r solid gray-100">
          <li v-for="item in week" :key="item" border="l solid gray-100 b" h-32 class="w-[14.28%]" />
          <li v-for="(item, i) in dateList" :key="i" relative flex justify-center items-center border="l solid gray-100 b" h-32 class="w-[14.28%]">
            <b absolute w-8 h-8 flex justify="center" items-center top-2 left-2 font-medium text-lg :class="{ 'bg-red text-white rounded-full': `${nowYear}${day.getDay()}` === `${nowYearMonth}${item.d}` }">{{ item.d }}</b><i absolute right-2 bottom-2 not-italic>{{ item.yy || item.nl }}</i><span text="red sm">{{ item.jr }}</span>
            <span v-if="item.work" absolute top-2 right-2 w-6 h-6 text="white sm" flex justify="center" items-center :class="item.work === 2 ? 'bg-#5CB85C' : 'bg-#D9534F'">{{ item.work === 2 ? '休' : '班' }}</span>
          </li>
          <li v-for="item in monthEnd" :key="item" border="l solid gray-100 b" h-32 class="w-[14.28%]" />
        </ul>
      </div>
    </ModalNew>
  </div>
</template>
