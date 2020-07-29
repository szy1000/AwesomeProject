import Https from '../../utils/https';

const getAllCaseReq = params => Https.get('/api/app/case/university?', params);

export {getAllCaseReq};
