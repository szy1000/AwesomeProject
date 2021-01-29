import Https from '../../utils/https';

const querySummerProjectReq = params =>
  Https.get(`/api/app/summerProject/${params}`, {});

export {querySummerProjectReq};
