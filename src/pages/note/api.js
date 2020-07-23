import Https from '../../utils/https';

const createNoteReq = params => Https.post('/api/app/note', params, true);

const uploadImageFileReq = params =>
  Https.post('/api/common/file/image', params);

const getPosReq = params =>
  Https.get('https://apis.map.qq.com/ws/geocoder/v1/', params, true);

export {createNoteReq, uploadImageFileReq, getPosReq};
