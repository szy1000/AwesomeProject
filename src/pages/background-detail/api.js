import Https from '../../utils/https';

const queryBackDetailReq = params => Https.get(`/api/app/background/${params}`, {});

export {queryBackDetailReq};
