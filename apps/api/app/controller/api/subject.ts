import { SubjectType } from '@root/app/schema/subject'
import { IPlayList, PlayList } from '@root/app/typings'
import { feedType, modelName } from '@root/app/typings/enum'
import { Controller } from 'egg'

export default class Subject extends Controller {
  public async get() {
    // 获取 url 中的 id 参数
    const { ctx, service } = this
    const { id } = ctx.params
    const result = await service.subject.get({ id, attributes: { exclude: ['status', 'gold', 'ip'] } })
    if (result) {
      const format = result.toJSON() as SubjectType
      const { mcid, star, director, original, play, content } = format
      format.content = content.replace(/<.*?>/g, '')
      if (mcid) {
        format.mcid = await ctx.getMcat(mcid)
      }

      if (star) {
        format.star = await ctx.getSatr(star.split(','))
      }
      // 导演
      if (director) {
        format.director = await ctx.getSatr(director.split(','))
      }
      // 原作
      if (original) {
        format.original = await ctx.getSatr(original.split(','))
      }

      if (play) {
        const playlist = await service.subject.play()
        if (play.length) {
          playlist.forEach((item, index) => {
            if (item.display === 0) {
              playlist.splice(index, 1)
              play.splice(index, 1)
            }
          })

          const playText = ['免费观看', 'VIP免费观看', '单片付费', 'VIP提前看', '单集付费提前看'] // 0 免费观看 1 VIP免费观看 2 单片付费 3 单集付费提前看
          const list: IPlayList[] = []
          const key = ctx.helper.md5(String(new Date().getTime()) + id + 'plain')
          let i = 0
          play.forEach((item, index) => {
            const url = this.playlist_one(item.urls, key, item.title)
            const info = playlist.filter(sitem => sitem.title === item.title)[0]
            const price = url[0].pic || 0
            const obj = {
              sid: index + 1,
              title: item.title,
              name: info.name,
              count: url.length,
              price: playText[price],
              urls: url
            }
            if (item.title === 'all' || item.title === 'quote') {
              format[item.title] = obj.urls.map(({ path, pic }) => {
                return item.title === 'all' ? { price: playText[pic || 0], path } : { path }
              })
            } else {
              list[i] = obj
              i++
            }
          })
          format.key = key
          format.url = list
        }
      }
      await ctx.hits({ arr: format, model: 'Subject' })
      delete format.play
      delete format.hits
      ctx.helper.deleleParams(format)
      ctx.helper.success(ctx, { data: format })
    } else {
      ctx.helper.fail(ctx, { message: '没有找到内容' })
    }
  }

  public async views() {
    const { ctx, service } = this
    const { id } = ctx.params
    const data = await service.subject.views(id)
    ctx.helper.success(ctx, { data })
  }

  public async list() {
    const { ctx, service } = this
    const data = await service.subject.list({
      ...ctx.request.query,
      attributes: ['id', 'mcid', 'name', 'pic', 'language', 'area', 'isend', 'stars', 'serialized', 'hits', 'created_at', 'updated_at', 'status', 'weekday']
    })
    if (data) {
      ctx.helper.success(ctx, { data })
    } else {
      ctx.helper.fail(ctx, { message: '没有找到相关内容' })
    }
  }

  public async getName() {
    const { ctx, service } = this
    const result = await service.subject.getName(ctx.query.name)
    return ctx.helper.success(ctx, { data: result })
  }

  public async add() {
    const { ctx, service } = this
    const params = ctx.request.body
    params.uid = await ctx.getUserId()
    params.ip = await ctx.getIp()
    const { id, letter, letters, ip } = params
    if (id) {
      const res = await service.subject.get(id)
      if (!res) {
        return ctx.helper.fail(ctx, { message: '没有找到相关内容' })
      }
    }
    if (!letter) {
      params.letter = ctx.helper.h2p(params.name).substring(0, 1).toUpperCase()
    }
    if (!letters) {
      params.letters = ctx.helper.h2p(params.name)
    }
    if (id) {
      const result = await service.subject.edit(params)
      if (result) {
        const { id: aid, uid } = params
        await service.feed.add({ ip, sid: modelName.SUBJECT, uid, type: feedType.UPDATE, aid })
        ctx.helper.success(ctx, { data: id ? id : result, message: '更新成功' })
      } else {
        ctx.helper.fail(ctx, { message: '更新失败' })
      }
    } else {
      const repeat = await service.subject.getName(params.name)
      if (repeat) {
        ctx.helper.fail(ctx, { message: '已经存在了' })
      }
      const result = await service.subject.add(params)
      if (result) {
        const { id: aid, uid } = result
        await service.feed.add({ ip, sid: modelName.SUBJECT, uid, type: feedType.ADD, aid })
        ctx.helper.success(ctx, { data: id ? id : result, message: '添加成功' })
      } else {
        ctx.helper.fail(ctx, { message: '添加失败' })
      }
    }
  }

  public async delete() {
    const { ctx, service } = this
    const data = await service.subject.delete(ctx.request.body)
    if (data) {
      ctx.helper.success(ctx, { data, message: '删除成功' })
    } else {
      ctx.helper.fail(ctx, { message: '没有找到相关内容' })
    }
  }

  // 分解单组播放地址链接
  private playlist_one(url, key, type): PlayList[] {
    const arr = url.split(/\n/)
    const { encrypt } = this.app.utils.Tool
    return arr.map((item, index) => {
      const i = index + 1
      const list: PlayList = {}
      list.pid = i
      if (item.indexOf('$') !== -1) {
        const urlArr = item.split('$')
        if (type === 'all') {
          urlArr.unshift('')
        }
        const [name = '', path = '', pic = '', fen = '', miao = '', source = ''] = urlArr
        list.name = name.trim()
        list.path = encrypt(path.trim(), key)
        // list.path2 = decrypt(list.path, key);
        if (pic) list.pic = pic.trim()
        if (fen) list.fen = fen.trim()
        if (miao) list.miao = miao.trim()
        if (source) list.source = source.trim()
      } else {
        if (type === 'quote') {
          list.name = ''
          list.path = encrypt(item.trim(), key)
        } else {
          list.name = `第${i}集`
          list.path = encrypt(item.trim(), key)
        }
      }
      return list
    })
  }
}
