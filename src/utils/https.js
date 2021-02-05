import axios from 'axios';
import {Alert} from 'react-native';
import Jump from './jump';

import AsyncStorage from '@react-native-community/async-storage';

const instance = axios.create({
  baseURL: 'http://112.80.30.130:5456',
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
        Alert.alert(
          '操作提示',
          '登录信息失效或者已过期,请您先登录？',
          [
            {
              text: '确认',
              onPress: async () => {
                // await this.props.toggleJoin({
                //   isJoin: join,
                //   id,
                // });
                // Jump.goBack({navigation: this.props.navigation});
                navigation.replace('Login');
              },
            },
          ],
          {cancelable: false},
        );
      } else if (message.includes('Network')) {
        Alert.alert('操作提示', '网络异常,请稍后重试！', [
          {
            text: '确认',
            onPress: async () => {},
          },
        ]);
      } else {
        Alert.alert('操作提示', JSON.stringify(err), [
          {
            text: '确认',
            onPress: async () => {},
          },
        ]);
      }
      throw err;
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

  static put(url, params = {}, needCode) {
    return new Promise((resolve, reject) => {
      promiseFun('put', url, params, needCode, resolve, reject);
    });
  }
}
