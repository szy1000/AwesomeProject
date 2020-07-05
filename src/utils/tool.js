import {AsyncStorage} from 'react-native';

export default class Tools {
  static async isLogin() {
    let temp = (await AsyncStorage.getItem('token')) || '';
    return temp !== '';
  }
}
