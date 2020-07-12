import Https from '../../utils/https';

const getGroupDetailReq = params =>
  Https.get(`/api/app/forum/discussion/${params}`);
const getCommentReq = params =>
  Https.get(`/api/app/forum/discussion/${params}/comment`);

const makeCommentReq = params =>
  Https.post(`/api/app/forum/discussion/${params}/comment`);

const thumbUpDiscussionReq = params =>
  Https.get(`/api/app/forum/discussion/${params}/star`);

const favoriteDiscussionReq = params =>
  Https.get(`/api/app/forum/comment/${params}/favorite`);

export {
  getGroupDetailReq,
  getCommentReq,
  makeCommentReq,
  thumbUpDiscussionReq,
  favoriteDiscussionReq,
};
