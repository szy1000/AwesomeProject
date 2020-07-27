import Https from '../../utils/https';

const queryDetailReq = params =>
  Https.get(`/api/app/university/${params}`, params);

export {queryDetailReq};
