import axios from 'axios';
import {URL} from 'config/';
import {UIToast} from 'UIcomponent';
import Tools from './tools';
import history from './history';
// import Crypto from '../encrypt'

const successCode = '0';
const loginInOtherDevice = '-1';
const lostUuid = '请求报文中缺少uuid参数';
const deleteUser = '用户不存在!';

const instance = axios.create({
  baseURL: URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

const promiseFun = (method, url, params, needCode, resolve, reject) => {
  params.version = localStorage.getItem('version') || '1.0';
  params.token = localStorage.getItem('token') || '';
  params.uuid = localStorage.getItem('uuid') || '';
  params.params = params.params || {};
  // instance[method](url, { key: Crypto.encrypt(params) }).then((res) => {
  //   const { result, resultNote, detail } = Crypto.decrypt(res.data.key)
  //   if (needCode) {
  //     resolve(Crypto.decrypt(res.data.key))
  //   } else if (result.toString() === successCode) {
  //     resolve(detail)
  //   } else if (result.toString() === loginInOtherDevice) {
  //     Tools.loginOut()
  //     window.location.reload()
  //   } else {
  //     UIToast.error(resultNote)
  //     reject({ resultNote })
  //   }
  instance[method](url, params)
    .then(res => {
      const {result, resultNote, detail} = res.data;
      if (needCode) {
        resolve(res.data);
      } else if (result.toString() === successCode) {
        resolve(detail);
      } else if (result.toString() === loginInOtherDevice) {
        Tools.loginOut();
        window.location.reload();
      } else {
        UIToast.error(resultNote, 1000, () => {
          if (resultNote === lostUuid || resultNote === deleteUser) {
            Tools.loginOut();
            history.replace('/login/my');
          }
        });
        reject({resultNote});
      }
    })
    .catch(err => {
      const errorMsg = JSON.stringify(err.message);
      UIToast.error('您的网络存在问题，请检查网络是否连接！');
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
