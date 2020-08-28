import Https from '../../utils/https';

const getAllCaseReq = params => Https.get('/api/app/case/university', params);
const getDegreeReq = params => Https.get('/api/common/dic/degree', params);
const getSubjectReq = params => Https.get('/api/common/dic/subject', params);

export {getAllCaseReq, getDegreeReq, getSubjectReq};
