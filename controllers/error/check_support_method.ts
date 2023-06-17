import BadReqError from './bad_request_error';

export default function checkSupportMethod(supportmethod: string[], method?: string) {
  if (supportmethod.indexOf(method!) === -1) {
    throw new BadReqError('지원하지 않는 method입니다.');
  }
}
