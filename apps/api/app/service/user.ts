import { Service } from 'egg'

export default class User extends Service {
  // 获取非当前登录用户的信息
  public async get(params = {}) {
    const result = await this.app.model.User.get(params)
    return result
  }
  // 登录时验证用户信息
  public async findUser(params = {}) {
    const result = await this.app.model.User.get(params)
    return result
  }

  public async exist(params = {}) {
    const result = await this.app.model.User.find(params)
    return result
  }

  public async list(params = {}) {
    const result = await this.app.model.User.query({
      ...params
    })
    return result
  }

  public async add(params = {}) {
    const result = await this.app.model.User.add(params)
    return result
  }

  public async edit(params = {}) {
    const result = await this.app.model.User.edit(params)
    return result
  }

  public async delete(params = {}) {
    const result = await this.app.model.User.delete(params)
    return result
  }

  public async loginOut(token: string) {
    const result = this.app.redis.del(token)
    return result
  }
}
