import React from 'react';
import {Button, Text, StyleSheet} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// import FindTab from './FindNavigator';

import WelcomePage from '../pages/welcomePage';
import Home from '../pages/home';
import My from '../pages/my';
import Find from '../pages/find';
import BBS from '../pages/bbs';
import Login from '../pages/login';
import Register from '../pages/register';

const TabBottom = e => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          title: '申请',
          tabBarLabel: '申请',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="file-document-edit"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Find"
        component={Find}
        options={{
          tabBarLabel: '发现',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="magnify" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="BBS"
        component={BBS}
        options={{
          tabBarLabel: '论坛',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="message-reply"
              color={color}
              size={size}
            />
          ),
        }}
      />

      <Tab.Screen
        name="My"
        component={My}
        options={{
          tabBarLabel: '我的',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

function getHeaderTitle(_params) {
  const {route, navigation} = _params;
  // alert(JSON.stringify(route.state));
  // alert(route.state && route.state.index);
  const routeName = route.state
    ? // Get the currently active route name in the tab navigator
      route.state.routes[route.state.index].name
    : // If state doesn't exist, we need to default to `screen` param if available, or the initial screen
      // In our case, it's "Feed" as that's the first screen inside the navigator
      route.params?.screen;
  const routeState =
    route.state && route.state.routes[route.state.index].params;
  const {iTitle} = routeState || {};

  switch (routeName) {
    case 'Home':
    default:
      return {
        title: null,
        headerTransparent: true, //删除头部
      };
    case 'Find':
      return {
        title: '发现',
        headerShown: false,
      };
    case 'BBS':
      return {
        title: iTitle || '论坛',
      };
    case 'My':
      return {
        title: '我的',
        headerBackTitle: null,
        // headerTruncatedBackTitle: null,
        headerBackImage: null,
        headerTransparent: true,
        // headerTintColor: '#fff',
        headerTitleStyle: {
          color: '#fff',
        },
        headerRight: () => (
          <Feather
            style={{marginRight: 10}}
            name="more-horizontal"
            color="#fff"
            size={20}
            onPress={() => {
              alert(JSON.stringify(navigation));
            }}
          />
        ),
      };
  }
}

// const App: () => React$Node = () => {

export default class AppNavigator extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome">
          <Stack.Screen
            name="Welcome"
            component={WelcomePage}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Main"
            component={TabBottom}
            options={e => getHeaderTitle(e)}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              title: null,
              headerBackTitle: null,
              headerBackIcon: null,
              headerTruncatedBackTitle: null,
              headerTransparent: true, //设置头部透明
            }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{
              title: '注册',
              headerShown: false, //删除头部
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
