import Https from '../../utils/https';

const getCountryReq = params => Https.get('/api/app/country', params);
const getRankReq = params => Https.get('/api/common/dic/ranking', params);
const getCountrySubjectReq = params =>
  Https.get('/api/app/subject/category', params);

const getSubjectListReq = params => Https.get('/api/app/subject', params);
const getHotSubjectReq = params => Https.get('/api/app/subject/hot', params);

export {
  getCountryReq,
  getRankReq,
  getCountrySubjectReq,
  getHotSubjectReq,
  getSubjectListReq,
};
