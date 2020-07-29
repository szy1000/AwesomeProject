import Https from '../../utils/https';

const getAllCollectReq = params =>
  Https.get('/api/app/user/mine/favorite_list', params);

export {getAllCollectReq};
