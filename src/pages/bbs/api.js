import Https from '../../utils/https';

const getAllCategoryReq = () => Https.get('/api/app/forum/groupCategory');
const getHotGroupReq = params => Https.get('/api/app/forum/group/hot', params);

export {getAllCategoryReq, getHotGroupReq};
