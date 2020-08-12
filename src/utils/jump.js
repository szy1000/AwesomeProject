// import { navigation } from 'react-navigation'

export default class Jump {
  static resetToHome(params) {
    const {navigation} = params;
    navigation.reset({
      index: 0,
      routes: [{name: 'Main'}],
    });
  }
  static linkToPage(_params) {
    const {navigation, url, params} = _params;
    navigation.navigate(url, params);
  }
  static goBack(_params) {
    const {navigation} = _params;
    navigation.goBack();
  }
}
