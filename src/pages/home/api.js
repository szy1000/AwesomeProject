import Https from '../../utils/https';

const queryKeywords = params => Https.get('/api/app/search', params, true);
const getPosReq = params =>
  Https.get('https://apis.map.qq.com/ws/geocoder/v1/', params, true);

const getCountryReq = () => Https.get('/api/app/country');
const getHotSchoolReq = params => Https.get('/api/app/university/hot', params);
const getHotSubjectReq = params => Https.get('/api/app/subject/hot', params);
const getCaseReq = params => Https.get('/api/app/case/hot', params);
const getUnreadCountReq = params =>
  Https.get('/api/app/message/un_read_count', params);

export {
  queryKeywords,
  getPosReq,
  getCountryReq,
  getHotSchoolReq,
  getHotSubjectReq,
  getCaseReq,
  getUnreadCountReq,
};
