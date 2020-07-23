import Https from '../../utils/https';

const getNoteDetailReq = params => Https.get(`/api/app/note/${params}`);

const getNoteCommentReq = params =>
  Https.get(`/api/app/note/${params}/comment`);

const commentNoteReq = params =>
  Https.post(`/api/app/note/${params.noteId}/comment`, params, true);

const followNoteReq = params =>
  Https.post(`/api/app/note/${params}/follow`, {}, true);

const starNoteReq = id =>
  Https.post(`/api/app/action/note/${id}/star`, {}, true);

const favoriteNoteReq = id =>
  Https.post(`/api/app/action/note/${id}/favorite`, {}, true);

const unFollowNoteReq = params =>
  Https.post(`/api/app/action/note/${params}/un_follow`, {}, true);

const unStarNoteReq = id =>
  Https.post(`/api/app/action/note/${id}/un_star`, {}, true);

const unFavoriteNoteReq = id =>
  Https.post(`/api/app/action/note/${id}/un_favorite`, {}, true);

const queryActionReq = id => Https.get(`/api/app/action/note/${id}`, {});

export {
  getNoteDetailReq,
  getNoteCommentReq,
  commentNoteReq,
  followNoteReq,
  starNoteReq,
  favoriteNoteReq,

  unFollowNoteReq,
  unStarNoteReq,
  unFavoriteNoteReq,

  queryActionReq,
};
