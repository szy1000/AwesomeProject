import Https from '../../utils/https';

const getCountryReq = () => Https.get('/api/app/country');
const getCountrySubjectReq = params => Https.get('/api/app/country', params);

export {getCountryReq, getCountrySubjectReq};
