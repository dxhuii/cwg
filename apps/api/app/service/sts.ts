import STS = require('qcloud-cos-sts')
import type { GetCredentialOptions } from 'qcloud-cos-sts'
import { Service } from 'egg'

export default class Sts extends Service {
  public async init(prefix: string) {
    const { ctx, config } = this
    const { secretId, secretKey, proxy, region, bucket, durationSeconds, allowActions } = config.cos

    // 格式一：临时密钥接口 这里根据自己业务需要做好放行判断
    if (prefix === '_ALLOW_DIR_/*') {
      const result = ctx.helper.fail(ctx, { message: '请修改 allowPrefix 配置项，指定允许上传的路径前缀' })
      return result
    }

    // 获取临时密钥
    const LongBucketName = bucket
    const ShortBucketName = LongBucketName?.substr(0, LongBucketName.lastIndexOf('-'))
    const AppId = LongBucketName?.substr(LongBucketName.lastIndexOf('-') + 1)
    const policy = {
      version: '2.0',
      statement: [
        {
          action: allowActions,
          effect: 'allow',
          resource: [`qcs::cos:${region}:uid/${AppId}:prefix//${AppId}/${ShortBucketName}/${prefix}`]
        }
      ]
    }
    const startTime = Math.round(Date.now() / 1000)
    const result = await new Promise((resolve, reject) => {
      STS.getCredential(
        {
          proxy,
          region,
          durationSeconds,
          policy,
          secretId,
          secretKey
        } as GetCredentialOptions & { region: string },
        (err, tempKeys) => {
          if (err)
            reject(err)

          resolve(err || { ...tempKeys, region, bucket, startTime })
        }
      )
    })
    return result
  }
}
