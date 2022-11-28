// This file is created by egg-ts-helper@1.33.0
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportHome from '../../../app/controller/home';
import ExportNews from '../../../app/controller/news';
import ExportApiAttachment from '../../../app/controller/api/attachment';
import ExportApiBookmark from '../../../app/controller/api/bookmark';
import ExportApiCaptcha from '../../../app/controller/api/captcha';
import ExportApiComments from '../../../app/controller/api/comments';
import ExportApiDigg from '../../../app/controller/api/digg';
import ExportApiFavorite from '../../../app/controller/api/favorite';
import ExportApiFeed from '../../../app/controller/api/feed';
import ExportApiKeywod from '../../../app/controller/api/keywod';
import ExportApiLink from '../../../app/controller/api/link';
import ExportApiLinkCategory from '../../../app/controller/api/linkCategory';
import ExportApiLinkUser from '../../../app/controller/api/linkUser';
import ExportApiList from '../../../app/controller/api/list';
import ExportApiLog from '../../../app/controller/api/log';
import ExportApiMcat from '../../../app/controller/api/mcat';
import ExportApiNews from '../../../app/controller/api/news';
import ExportApiPin from '../../../app/controller/api/pin';
import ExportApiPlay from '../../../app/controller/api/play';
import ExportApiSetting from '../../../app/controller/api/setting';
import ExportApiStaff from '../../../app/controller/api/staff';
import ExportApiSts from '../../../app/controller/api/sts';
import ExportApiSubject from '../../../app/controller/api/subject';
import ExportApiTag from '../../../app/controller/api/tag';
import ExportApiTool from '../../../app/controller/api/tool';
import ExportApiTopic from '../../../app/controller/api/topic';
import ExportApiUser from '../../../app/controller/api/user';
import ExportBackendAssociation from '../../../app/controller/backend/association';
import ExportBackendAttachment from '../../../app/controller/backend/attachment';
import ExportBackendCaptcha from '../../../app/controller/backend/captcha';
import ExportBackendCollect from '../../../app/controller/backend/collect';
import ExportBackendComments from '../../../app/controller/backend/comments';
import ExportBackendDigg from '../../../app/controller/backend/digg';
import ExportBackendFeed from '../../../app/controller/backend/feed';
import ExportBackendLink from '../../../app/controller/backend/link';
import ExportBackendLinkCategory from '../../../app/controller/backend/linkCategory';
import ExportBackendList from '../../../app/controller/backend/list';
import ExportBackendLog from '../../../app/controller/backend/log';
import ExportBackendMcat from '../../../app/controller/backend/mcat';
import ExportBackendNews from '../../../app/controller/backend/news';
import ExportBackendPin from '../../../app/controller/backend/pin';
import ExportBackendPlay from '../../../app/controller/backend/play';
import ExportBackendSetting from '../../../app/controller/backend/setting';
import ExportBackendStaff from '../../../app/controller/backend/staff';
import ExportBackendStar from '../../../app/controller/backend/star';
import ExportBackendSts from '../../../app/controller/backend/sts';
import ExportBackendSubject from '../../../app/controller/backend/subject';
import ExportBackendTag from '../../../app/controller/backend/tag';
import ExportBackendTopic from '../../../app/controller/backend/topic';
import ExportBackendUser from '../../../app/controller/backend/user';
import ExportBackendVideo from '../../../app/controller/backend/video';

declare module 'egg' {
  interface IController {
    home: ExportHome;
    news: ExportNews;
    api: {
      attachment: ExportApiAttachment;
      bookmark: ExportApiBookmark;
      captcha: ExportApiCaptcha;
      comments: ExportApiComments;
      digg: ExportApiDigg;
      favorite: ExportApiFavorite;
      feed: ExportApiFeed;
      keywod: ExportApiKeywod;
      link: ExportApiLink;
      linkCategory: ExportApiLinkCategory;
      linkUser: ExportApiLinkUser;
      list: ExportApiList;
      log: ExportApiLog;
      mcat: ExportApiMcat;
      news: ExportApiNews;
      pin: ExportApiPin;
      play: ExportApiPlay;
      setting: ExportApiSetting;
      staff: ExportApiStaff;
      sts: ExportApiSts;
      subject: ExportApiSubject;
      tag: ExportApiTag;
      tool: ExportApiTool;
      topic: ExportApiTopic;
      user: ExportApiUser;
    }
    backend: {
      association: ExportBackendAssociation;
      attachment: ExportBackendAttachment;
      captcha: ExportBackendCaptcha;
      collect: ExportBackendCollect;
      comments: ExportBackendComments;
      digg: ExportBackendDigg;
      feed: ExportBackendFeed;
      link: ExportBackendLink;
      linkCategory: ExportBackendLinkCategory;
      list: ExportBackendList;
      log: ExportBackendLog;
      mcat: ExportBackendMcat;
      news: ExportBackendNews;
      pin: ExportBackendPin;
      play: ExportBackendPlay;
      setting: ExportBackendSetting;
      staff: ExportBackendStaff;
      star: ExportBackendStar;
      sts: ExportBackendSts;
      subject: ExportBackendSubject;
      tag: ExportBackendTag;
      topic: ExportBackendTopic;
      user: ExportBackendUser;
      video: ExportBackendVideo;
    }
  }
}
