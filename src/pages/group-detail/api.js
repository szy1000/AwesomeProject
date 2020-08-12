import Https from '../../utils/https';

const getGroupDetailReq = params =>
  Https.get(`/api/app/forum/discussion/${params}`);
const getCommentReq = params =>
  Https.get(`/api/app/forum/discussion/${params}/comment`);

const makeCommentReq = params =>
  Https.post(`/api/app/forum/discussion/${params.id}/comment`, params, true);

const thumbUpDiscussionReq = params =>
  Https.post(`/api/app/forum/discussion/${params}/star`, {}, true);

const favoriteDiscussionReq = params =>
  Https.post(`/api/app/forum/discussion/${params}/favorite`, {}, true);

const favoriteCommentReq = params =>
  Https.get(`/api/app/forum/comment/${params}/favorite`);

export {
  getGroupDetailReq,
  getCommentReq,
  makeCommentReq,
  thumbUpDiscussionReq,
  favoriteDiscussionReq,
  favoriteCommentReq,
};
