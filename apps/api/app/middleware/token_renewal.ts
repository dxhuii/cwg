import type { Context } from 'egg'
import { IGNORE_LOGIN_ROUTES } from '../settings'

export default () => {
  return async function validate(ctx: Context, next: () => Promise<any>) {
    try {
      const token = await ctx.getToken()
      const userInfo = await ctx.app.redis.get(`token:${token}`)

      if (IGNORE_LOGIN_ROUTES.findIndex(v => v.test(ctx.path)) !== -1)
        return await next()

      // token续期
      if (token || JSON.stringify(userInfo) !== '{}')
        await ctx.app.redis.expire(`token:${token}`, ctx.app.config.base.redis.expire)

      await next()
    }
    catch (err: any) {
      ctx.logger.error('[全局拦截]', err)
      return ctx.helper.fail(ctx, { status: 10002 })
    }
  }
}
