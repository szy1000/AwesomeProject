import React from 'react';
import {Provider} from 'react-redux';
import AppNavigator from './navigator/AppNavigator';
import store from './sotre/index';
import * as WeChat from 'react-native-wechat-lib';

WeChat.registerApp('wx0ac6d9fb4e5c06f3');

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
  }
}
