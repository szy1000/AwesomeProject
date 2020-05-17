/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StyleSheet} from 'react-native';
import {Button, Text} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

import Home from './src/pages/home';
import My from './src/pages/my';
import Find from './src/pages/find';
import BBS from './src/pages/bbs';

const App: () => React$Node = () => {
  return (
    <NavigationContainer>
      {/*<Stack.Navigator initialRouteName="Home">*/}
      {/*  <Stack.Screen*/}
      {/*    name="Home"*/}
      {/*    component={Home}*/}
      {/*    headerMode="none"*/}
      {/*    options={{*/}
      {/*      title: '首页',*/}
      {/*      headerShown: false,*/}
      {/*    }}*/}
      {/*  />*/}
      {/*  <Stack.Screen*/}
      {/*    name="My"*/}
      {/*    component={My}*/}
      {/*    options={({route: {params}}) => {*/}
      {/*      return {*/}
      {/*        title: (params && params.name) || '我的',*/}
      {/*        headerBackTitle: null,*/}
      {/*        headerTruncatedBackTitle: null,*/}
      {/*        headerTransparent: true,*/}
      {/*        headerTintColor: '#fff',*/}
      {/*        headerTitleStyle: {*/}
      {/*          color: '#fff',*/}
      {/*        },*/}
      {/*      };*/}
      {/*    }}*/}
      {/*  />*/}
      {/*  <Stack.Screen*/}
      {/*    name="Find"*/}
      {/*    component={Find}*/}
      {/*    options={props => {*/}
      {/*      const {*/}
      {/*        navigation,*/}
      {/*        route: {params},*/}
      {/*      } = props;*/}
      {/*      return {*/}
      {/*        title: '发现',*/}
      {/*        headerRight: () => (*/}
      {/*          <Button*/}
      {/*            title={params && params.mode === 'eidt' ? '保存' : '编辑'}*/}
      {/*            onPress={() =>*/}
      {/*              navigation.seParams({*/}
      {/*                state: 'ss',*/}
      {/*              })*/}
      {/*            }*/}
      {/*          />*/}
      {/*        ),*/}
      {/*      };*/}
      {/*    }}*/}
      {/*  />*/}
      {/*</Stack.Navigator>*/}
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
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
              <MaterialCommunityIcons
                name="magnify"
                color={color}
                size={size}
              />
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
              <MaterialCommunityIcons
                name="account"
                color={color}
                size={size}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
