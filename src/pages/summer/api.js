import Https from '../../utils/https';

const querySummerProjectReq = params =>
  Https.get('/api/app/summerProject', params);

const queryRankingReq = params => Https.get('/api/common/dic/ranking', params);
const queryBySelectReq = params => Https.get('/api/app/university', params);

const getSubjectReq = params => Https.get('/api/common/dic/subject', params);
const getGradeReq = params => Https.get('/api/common/dic/grade', params);

export {
  queryRankingReq,
  getGradeReq,
  getSubjectReq,
  querySummerProjectReq,
  queryBySelectReq,
};
