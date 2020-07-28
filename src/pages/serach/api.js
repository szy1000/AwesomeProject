import Https from '../../utils/https';

const queryKeysReq = params => Https.get('/api/app/search', params);

export {queryKeysReq};
