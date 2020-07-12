import axios from 'axios';
import Jump from './jump';

import AsyncStorage from '@react-native-community/async-storage';

const instance = axios.create({
  baseURL: 'http://47.114.151.211:8081',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

let navigation = null;

instance.interceptors.request.use(async function(config) {
  if (config.url === '/api/app/country') {
    config.headers['content-type'] = 'application/octet-stream';
  }
  config.headers.Authorization =
    'Basic ' + (await AsyncStorage.getItem('token'));
  return config;
});

const promiseFun = (method, url, params, needCode, resolve, reject) => {
  params.params = params.params || {};
  if (params.params && params.params.navigation) {
    navigation = params.params.navigation;
  }
  instance[method](url, params)
    .then(res => {
      const {success, error, data} = res.data;
      if (needCode) {
        resolve(res.data);
      } else if (success) {
        resolve(data);
      } else {
        console.log('error:', JSON.stringify(res.data));
        reject({error});
      }
    })
    .catch(err => {
      AsyncStorage.clear();
      const {message} = err;
      if (message.includes(401)) {
        alert('未登录,请先登录');
        navigation.replace('Login');
      } else if (message.includes('Network')) {
        alert(JSON.stringify('网络异常,请稍后重试'));
      } else {
        alert(JSON.stringify(err));
      }
      throw err;
      // reject();
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
