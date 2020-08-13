import Https from '../../utils/https';

const getConcernReq = params =>
  Https.get('/api/app/user/mine/follow_list', params);

export {getConcernReq};
