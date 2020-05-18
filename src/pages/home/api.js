import Https from '../../utils/https';

const getHomeReq = params =>
  Https.post(
    'api/v1/content/vendorContent/selectVendorChosenTypicalCases',
    params,
  );

export {getHomeReq};
