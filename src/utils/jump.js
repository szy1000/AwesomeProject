// import { navigation } from 'react-navigation'

export default class Jump {
  static resetToHome(params) {
    const {navigation} = params;
    navigation.reset({
      index: 0,
      routes: [{name: 'Main'}],
    });
  }
  static linkToPage(params) {
    const {navigation, url} = params;
    navigation.navigate(url);
  }
}
