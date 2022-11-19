import { Context, Application } from 'egg'
import { ICondition } from '../typings'
import mcid, { McidType } from '../schema/mcid'

export default (app: Context & Application) => {
  const Mcid = mcid(app)

  return class extends Mcid<McidType> {
    static async add(params) {
      const { aid, sid, mcid } = params
      await Mcid.destroy({
        where: {
          aid,
          sid
        }
      })
      if (aid && sid && mcid) {
        const data = mcid.map(item => {
          return { mid: item, sid, aid }
        })
        await Mcid.bulkCreate(data)
      }
    }

    static async queryAll(params) {
      const condition: ICondition = {
        ...params
      }

      const result = await Mcid.findAll(condition)
      return result
    }

    static async adds(params) {
      const result = await Mcid.bulkCreate(params)
      return result
    }
  }
}
