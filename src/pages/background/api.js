import Https from '../../utils/https';

const getBackgroundReq = params => Https.get('/api/app/background', params);
const getSubjectReq = params => Https.get('/api/common/dic/subject', params);
const getGradeReq = params => Https.get('/api/common/dic/grade', params);
const getCategoryReq = params =>
  Https.get('/api/common/dic/background_category', params);

export {getBackgroundReq, getGradeReq, getSubjectReq, getCategoryReq};
