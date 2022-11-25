// This file is created by egg-ts-helper@1.33.0
// Do not modify this file!!!!!!!!!

import 'egg';
type AnyClass = new (...args: any[]) => any;
type AnyFunc<T = any> = (...args: any[]) => T;
type CanExportFunc = AnyFunc<Promise<any>> | AnyFunc<IterableIterator<any>>;
type AutoInstanceType<T, U = T extends CanExportFunc ? T : T extends AnyFunc ? ReturnType<T> : T> = U extends AnyClass ? InstanceType<U> : U;
import ExportAssociation from '../../../app/service/association';
import ExportAttachment from '../../../app/service/attachment';
import ExportCaptcha from '../../../app/service/captcha';
import ExportCollect from '../../../app/service/collect';
import ExportComments from '../../../app/service/comments';
import ExportDigg from '../../../app/service/digg';
import ExportFeed from '../../../app/service/feed';
import ExportLink from '../../../app/service/link';
import ExportLinkCategory from '../../../app/service/linkCategory';
import ExportList from '../../../app/service/list';
import ExportLog from '../../../app/service/log';
import ExportMcat from '../../../app/service/mcat';
import ExportNews from '../../../app/service/news';
import ExportPin from '../../../app/service/pin';
import ExportPlay from '../../../app/service/play';
import ExportRedis from '../../../app/service/redis';
import ExportSetting from '../../../app/service/setting';
import ExportStaff from '../../../app/service/staff';
import ExportStar from '../../../app/service/star';
import ExportSts from '../../../app/service/sts';
import ExportSubject from '../../../app/service/subject';
import ExportTag from '../../../app/service/tag';
import ExportTopic from '../../../app/service/topic';
import ExportUser from '../../../app/service/user';

declare module 'egg' {
  interface IService {
    association: AutoInstanceType<typeof ExportAssociation>;
    attachment: AutoInstanceType<typeof ExportAttachment>;
    captcha: AutoInstanceType<typeof ExportCaptcha>;
    collect: AutoInstanceType<typeof ExportCollect>;
    comments: AutoInstanceType<typeof ExportComments>;
    digg: AutoInstanceType<typeof ExportDigg>;
    feed: AutoInstanceType<typeof ExportFeed>;
    link: AutoInstanceType<typeof ExportLink>;
    linkCategory: AutoInstanceType<typeof ExportLinkCategory>;
    list: AutoInstanceType<typeof ExportList>;
    log: AutoInstanceType<typeof ExportLog>;
    mcat: AutoInstanceType<typeof ExportMcat>;
    news: AutoInstanceType<typeof ExportNews>;
    pin: AutoInstanceType<typeof ExportPin>;
    play: AutoInstanceType<typeof ExportPlay>;
    redis: AutoInstanceType<typeof ExportRedis>;
    setting: AutoInstanceType<typeof ExportSetting>;
    staff: AutoInstanceType<typeof ExportStaff>;
    star: AutoInstanceType<typeof ExportStar>;
    sts: AutoInstanceType<typeof ExportSts>;
    subject: AutoInstanceType<typeof ExportSubject>;
    tag: AutoInstanceType<typeof ExportTag>;
    topic: AutoInstanceType<typeof ExportTopic>;
    user: AutoInstanceType<typeof ExportUser>;
  }
}
