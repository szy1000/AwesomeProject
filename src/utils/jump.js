export default class Jump {
  static resetToHome(params) {
    const {navigation} = params;
    navigation.reset({
      index: 0,
      routes: [{name: 'Main'}],
    });
  }
  static linkTo(params) {
    console.log(params);
  }
}
