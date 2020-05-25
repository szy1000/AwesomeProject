/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import AppNavigator from './src/navigator/AppNavigator';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
// AppRegistry.registerComponent(appName, () => AppNavigator);
