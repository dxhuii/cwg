// This file is created by egg-ts-helper@1.33.0
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportActors from '../../../app/model/actors';
import ExportAssociation from '../../../app/model/association';
import ExportAttachment from '../../../app/model/attachment';
import ExportCollect from '../../../app/model/collect';
import ExportComments from '../../../app/model/comments';
import ExportDigg from '../../../app/model/digg';
import ExportEpisode from '../../../app/model/episode';
import ExportFeed from '../../../app/model/feed';
import ExportFollow from '../../../app/model/follow';
import ExportLink from '../../../app/model/link';
import ExportLinkCategory from '../../../app/model/linkCategory';
import ExportList from '../../../app/model/list';
import ExportLog from '../../../app/model/log';
import ExportMcat from '../../../app/model/mcat';
import ExportMcid from '../../../app/model/mcid';
import ExportNews from '../../../app/model/news';
import ExportPin from '../../../app/model/pin';
import ExportPlay from '../../../app/model/play';
import ExportRepty from '../../../app/model/repty';
import ExportRole from '../../../app/model/role';
import ExportSetting from '../../../app/model/setting';
import ExportStaff from '../../../app/model/staff';
import ExportStar from '../../../app/model/star';
import ExportStory from '../../../app/model/story';
import ExportSubject from '../../../app/model/subject';
import ExportTag from '../../../app/model/tag';
import ExportTopic from '../../../app/model/topic';
import ExportUser from '../../../app/model/user';

declare module 'egg' {
  interface IModel {
    Actors: ReturnType<typeof ExportActors>;
    Association: ReturnType<typeof ExportAssociation>;
    Attachment: ReturnType<typeof ExportAttachment>;
    Collect: ReturnType<typeof ExportCollect>;
    Comments: ReturnType<typeof ExportComments>;
    Digg: ReturnType<typeof ExportDigg>;
    Episode: ReturnType<typeof ExportEpisode>;
    Feed: ReturnType<typeof ExportFeed>;
    Follow: ReturnType<typeof ExportFollow>;
    Link: ReturnType<typeof ExportLink>;
    LinkCategory: ReturnType<typeof ExportLinkCategory>;
    List: ReturnType<typeof ExportList>;
    Log: ReturnType<typeof ExportLog>;
    Mcat: ReturnType<typeof ExportMcat>;
    Mcid: ReturnType<typeof ExportMcid>;
    News: ReturnType<typeof ExportNews>;
    Pin: ReturnType<typeof ExportPin>;
    Play: ReturnType<typeof ExportPlay>;
    Repty: ReturnType<typeof ExportRepty>;
    Role: ReturnType<typeof ExportRole>;
    Setting: ReturnType<typeof ExportSetting>;
    Staff: ReturnType<typeof ExportStaff>;
    Star: ReturnType<typeof ExportStar>;
    Story: ReturnType<typeof ExportStory>;
    Subject: ReturnType<typeof ExportSubject>;
    Tag: ReturnType<typeof ExportTag>;
    Topic: ReturnType<typeof ExportTopic>;
    User: ReturnType<typeof ExportUser>;
  }
}
