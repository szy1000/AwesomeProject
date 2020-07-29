import Https from '../../utils/https';

const getDegreeReq = params => Https.get('/api/common/dic/degree', params);
const getCaseListReq = params => Https.get('/api/app/case', params);

export {getDegreeReq, getCaseListReq};
