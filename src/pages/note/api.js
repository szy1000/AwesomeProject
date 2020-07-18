import Https from '../../utils/https';

const createNoteReq = params => Https.post('/api/app/note', params, true);

const uploadImageFileReq = params =>
  Https.post('/api/common/file/image', params);

export {createNoteReq, uploadImageFileReq};
