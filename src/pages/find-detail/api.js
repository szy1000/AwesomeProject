import Https from '../../utils/https';

const getNoteDetailReq = params => Https.get(`/api/app/note/${params}`);

const followNoteReq = params => Https.post(`/api/app/note/${params}/follow`);

export {getNoteDetailReq, followNoteReq};
