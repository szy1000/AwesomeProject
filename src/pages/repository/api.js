import Https from '../../utils/https';

const queryRankingReq = params => Https.get('/api/common/dic/ranking', params);
const queryCountryReq = params => Https.get('/api/app/country', params);
const queryBySelectReq = params => Https.get('/api/app/university', params);

export {queryRankingReq, queryCountryReq, queryBySelectReq};
