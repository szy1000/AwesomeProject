import Https from '../../utils/https';

const querySubjectDetailReq = params =>
  Https.get(`/api/app/subject/${params}`, {});

export {querySubjectDetailReq};
