import Https from '../../utils/https';

const querySummerProjectReq = params =>
  Https.get('/api/app/summerProject', params);

const queryRankingReq = params => Https.get('/api/common/dic/ranking', params);
const queryBySelectReq = params => Https.get('/api/app/university', params);

export {queryRankingReq, querySummerProjectReq, queryBySelectReq};
