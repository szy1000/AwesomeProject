import axios from 'axios';
import Jump from './jump';

import {AsyncStorage} from 'react-native';

const instance = axios.create({
  baseURL: 'http://47.114.151.211:8081',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

let navigation = null;

instance.interceptors.request.use(async function(config) {
  config.headers.Authorization =
    'Basic ' + (await AsyncStorage.getItem('token'));
  console.log(config);
  return config;
});

const promiseFun = (method, url, params, needCode, resolve, reject) => {
  params.params = params.params || {};
  if (params.params.navigation) {
    navigation = params.params.navigation;
  }
  instance[method](url, params)
    .then(res => {
      const {success, error, data} = res.data;
      if (needCode) {
        resolve(res.data);
      } else if (success) {
        console.log('data', res.data);
        resolve(data);
      } else {
        console.log('error:', JSON.stringify(res.data));
        reject({error});
      }
    })
    .catch(err => {
      console.log('navigation', navigation);
      AsyncStorage.clear();
      const {message} = err;
      if (message.indexOf(401)) {
        alert(JSON.stringify('未登录,请先登录'));
        navigation.replace('Login');
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
