import Https from '../../utils/https';

const getAllCategoryReq = () => Https.get('/api/app/forum/groupCategory');

const getGroupListReq = params => Https.get('/api/app/forum/group', params);

export {getAllCategoryReq, getGroupListReq};
