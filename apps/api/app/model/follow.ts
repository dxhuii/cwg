import { Context, Application } from 'egg'
import follow, { FollowType } from '../schema/follow'

export default (app: Context & Application) => {
  const Follow = follow(app)

  return class extends Follow<FollowType> {}
}
