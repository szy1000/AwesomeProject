import Https from '../../utils/https';

const postRegisterReq = () => Https.get('/api/app/user/register');

export {postRegisterReq};
