import { getVideo } from '@/services/video'
import { message } from 'antd'
import moment from 'moment'
import { useState } from 'react'

export default () => {
  const [biliLoading, setBiliLoading] = useState(false)
  const getBilibili = async (id: string, findMcid: Function) => {
    setBiliLoading(true)
    if (!id) {
      setBiliLoading(false)
      return message.warn('B站ID未填')
    }
    const res = await getVideo({ title: 'biliinfo', id })
    setBiliLoading(false)
    const removPlace = (str: string) => str.replace(/\s*/g, '')
    const { actors, staff, title, alias, origin_name, evaluate, areas, styles, publish, episode_index } = res.data
    const actorsArr = actors ? actors.split(/\n/) : []
    const actor: string[] = []
    const role: string[] = []
    const params: any = {}
    params.name = title
    params.aliases = alias
    params.foreign = origin_name
    params.content = evaluate
    params.area = areas[0].name
    params.mcid = findMcid(styles.map((item: { name: string }) => item.name))
    params.filmtime = publish.pub_date ? publish.pub_date : null
    const day = moment(params.filmtime).day()
    params.weekday = params.filmtime ? [String(day === 0 ? 7 : day)] : null
    params.broadcast = episode_index.id !== 0
    params.isend = episode_index.is_new === 1
    params.serialized = +episode_index.index || null
    params.year = '' + moment(publish.pub_date).year()
    params.tag = `${params.name}${params.foreign ? `,${params.foreign}` : ''}${
      params.aliases && params.aliases !== params.name ? `,${params.aliases}` : ''
    }`
    params.status = 'normal'
    actorsArr?.forEach((item: string) => {
      const arr = item.split('：')
      actor.push(removPlace(arr[1].split('（')[0]))
      role.push(removPlace(arr[0]))
      params.star = actor.join(',')
      params.role = role.join(',')
    })
    const staffArr = staff ? staff.split(/\n/) : []
    staffArr?.forEach((item: string) => {
      const arr = item.split('：')
      if (arr[0] === '监督' || arr[0] === '导演') {
        params.director = arr[1]
      }
      if (arr[0] === '动画制作') {
        params.company = arr[1]
      }
      if (arr[0] === '原作') {
        params.original = arr[1]
      }
    })
    return params
  }

  return {
    biliLoading,
    getBilibili
  }
}
