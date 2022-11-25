import type { Context } from 'egg'

export default level => {
  return async (ctx: Context, next: () => Promise<any>) => {
    const token = await ctx.getToken()

    const level0 = {
      username: null,
      admin: 0
    }

    if (token) {
      try {
        const userInfo = await ctx.app.redis.get(`token:${token}`)
        if (userInfo)
          ctx.state.user = JSON.parse(userInfo)

        else
          ctx.state.user = level0
      }
      catch (error) {
        return ctx.helper.fail(ctx, { status: 401 })
      }
    }
    else {
      ctx.state.user = level0
    }

    if (+ctx.state.user.admin >= level)
      await next()

    else
      return ctx.helper.fail(ctx, { status: 10003 })
  }
}
