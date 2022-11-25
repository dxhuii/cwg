import type { Context } from 'egg'

export default () => {
  return async (ctx: Context, next) => {
    const token = await ctx.getToken()
    const level0 = {
      username: null
    }

    if (token) {
      try {
        const userInfo = await ctx.app.redis.get(`token:${token}`)

        if (userInfo)
          ctx.service.log.add(JSON.parse(userInfo))

        else
          ctx.service.log.add(level0)
      }
      catch (error) {
        ctx.logger.error('[日志]', error)
        return ctx.helper.fail(ctx, { status: 401 })
      }
    }

    await next()
  }
}
