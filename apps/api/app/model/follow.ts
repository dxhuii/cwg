import type { Application, Context } from 'egg'
import type { FollowType } from '../schema/follow'
import follow from '../schema/follow'

export default (app: Context & Application) => {
  const Follow = follow(app)

  return class extends Follow<FollowType> {}
}
