import axios from 'axios';
import Jump from './jump';

const successCode = '0';
const loginInOtherDevice = '-1';

const instance = axios.create({
  baseURL: 'http://47.114.151.211:8081',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

const promiseFun = (method, url, params, needCode, resolve, reject) => {
  params.params = params.params || {};
  instance[method](url, params)
    .then(res => {
      const {success, error, data} = res.data;
      console.log(res.data)
      if (needCode) {
        resolve(res.data);
      } else if (success) {
        resolve(data);
      } else {
        // UIToast.error(resultNote, 1000, () => {
        //   if (resultNote === lostUuid || resultNote === deleteUser) {
        //   }
        // });
        alert(JSON.stringify(res.data))
        reject({error});
      }
    })
    .catch(err => {
      alert(JSON.stringify(err))

      const errorMsg = JSON.stringify(err.message);
      // UIToast.error('您的网络存在问题，请检查网络是否连接！');
      console.log(errorMsg);
      reject();
    });
};

export default class Https {
  static get(url, params = {}, needCode) {
    return new Promise((resolve, reject) => {
      promiseFun('get', url, {params}, needCode, resolve, reject);
    });
  }

  static post(url, params = {}, needCode) {
    return new Promise((resolve, reject) => {
      promiseFun('post', url, params, needCode, resolve, reject);
    });
  }
}
