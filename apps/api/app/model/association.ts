import { Context, Application } from 'egg'
import association, { AssociationType } from '../schema/association'

export default (app: Context & Application) => {
  // 获取数据类型
  const Association = association(app)

  return class extends Association<AssociationType> {
    static async adds(params: { aid: number; tsid: number; sid: number; associate: { id: number }[] }) {
      const { aid = '', tsid = 2, sid = 1, associate } = params
      await Association.destroy({ where: { sid, aid } })
      if (associate?.length) {
        const data = associate?.map((item, index) => {
          return { aid, sid, taid: item.id, tsid, rank: index + 1 }
        })
        await Association.bulkCreate(data)
      }
    }

    static async add(params) {
      const result = await Association.create(params)
      return result
    }

    static async delete(params) {
      const { id } = params
      const result = await Association.destroy({ where: { id } })
      return result
    }
  }
}
