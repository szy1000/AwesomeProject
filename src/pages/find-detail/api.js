import Https from '../../utils/https';

const getNoteDetailReq = params => Https.get(`/api/app/note/${params}`);

const commentNoteReq = params =>
  Https.post(`/api/app/note/${params.noteId}/comment`, params, true);

const followNoteReq = params =>
  Https.post(`/api/app/note/${params}/follow`, {}, true);

const starNoteReq = id =>
  Https.post(`/api/app/action/note/${id}/star`, {}, true);

const favoriteNoteReq = id =>
  Https.post(`/api/app/action/note/${id}/favorite`, {}, true);

export {
  getNoteDetailReq,
  commentNoteReq,
  followNoteReq,
  starNoteReq,
  favoriteNoteReq,
};
