import Https from '../../utils/https';

const getCountryReq = params => Https.get('/api/app/country', params);
const getCountrySubjectReq = params =>
  Https.get('/api/app/subject/category', params);

export {getCountryReq, getCountrySubjectReq};
