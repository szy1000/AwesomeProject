import AsyncStorage from '@react-native-community/async-storage';

export default class Tools {
  static async isLogin() {
    let temp = (await AsyncStorage.getItem('token')) || '';
    return temp !== '';
  }
}
