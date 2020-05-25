import React from 'react';
import {Button, Text, StyleSheet} from 'react-native';
import router from './routeMap';
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
        title: '论坛',
        headerTransparent: true, //删除头部
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

export default class AppNavigator extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Main">
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
          {router.map(({name, component, options}) => (
            <Stack.Screen
              name={name}
              component={component}
              options={() => {
                return {
                  // default options
                  headerBackTitle: null,
                  headerTruncatedBackTitle: null,
                  ...options,
                };
              }}
            />
          ))}
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
