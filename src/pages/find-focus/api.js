import Https from '../../utils/https';

const getAllNoteReq = params => Https.get('/api/app/note/follow', params);

export {getAllNoteReq};
