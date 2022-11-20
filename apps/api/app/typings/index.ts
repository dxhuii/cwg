import type { BuildOptions, FindAndCountOptions, Model, ThroughOptions } from 'sequelize'

export interface BaseModel extends Model {}

export interface ICondition extends FindAndCountOptions<Model['_attributes']> {}

export interface IParams<T = any> {
  attributes?: Array<string>
  pageSize?: number
  current?: number
  filter?: T
  order?: string
  orderBy?: string
}

export type BaseModelStatic<T> = typeof Model & ThroughOptions & (new (values?: object, options?: BuildOptions) => T)
