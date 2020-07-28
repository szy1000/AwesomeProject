import Https from '../../utils/https';

const queryCaseDetailReq = params => Https.get(`/api/app/case/${params}`, {});

export {queryCaseDetailReq};
