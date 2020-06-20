import Https from '../../utils/https';

const getCountryReq = () => Https.get('/api/app/country');
const getHotSchoolReq = params => Https.get('/api/app/university/hot', params);
const getHotSubjectReq = params => Https.get('/api/app/subject/hot', params);

export {getCountryReq, getHotSchoolReq, getHotSubjectReq};
