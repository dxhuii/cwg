import { Context, Application } from 'egg'
import setting, { SettingType } from '../schema/setting'

export default (app: Context & Application) => {
  const Setting = setting(app)

  return class extends Setting<SettingType> {
    static async query() {
      const result = await Setting.findAll()
      return result
    }

    static async add(params) {
      const result = await Setting.create(params)
      return result
    }

    static async edit(params) {
      const { id } = params
      const result = await Setting.update(params, { where: { id } })
      return result
    }
    static async delete(params) {
      const result = await Setting.destroy({ where: params })
      return result
    }
  }
}
