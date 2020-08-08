import Https from '../../utils/https';

const getAllNoteReq = params => Https.get('/api/app/note/mine', params);

export {getAllNoteReq};
