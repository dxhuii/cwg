// This file is created by egg-ts-helper@1.33.0
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAuth from '../../../app/middleware/auth';
import ExportErrorHandler from '../../../app/middleware/error_handler';
import ExportLog from '../../../app/middleware/log';
import ExportTokenRenewal from '../../../app/middleware/token_renewal';

declare module 'egg' {
  interface IMiddleware {
    auth: typeof ExportAuth;
    errorHandler: typeof ExportErrorHandler;
    log: typeof ExportLog;
    tokenRenewal: typeof ExportTokenRenewal;
  }
}
