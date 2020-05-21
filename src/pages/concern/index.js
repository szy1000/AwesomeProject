import React from 'react';
import {View, StyleSheet} from 'react-native';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

const TabTop = createMaterialTopTabNavigator();
import PanelOne from './PanelOne';
import PanelTwo from './PanelTwo';
import PanelThree from './PanelThree';

export default class Find extends React.Component {
  render() {
    return (
      <TabTop.Navigator
        tabBarOptions={{
          labelStyle: {
            fontSize: 14,
          },
          tabStyle: {
            position: 'relative',
          },
          activeTintColor: 'red',
          activeTintSize: '30',
          inactiveTintColor: '#aaa',
          indicatorStyle: {
            marginLeft: '10%',
            width: 20,
            height: 4,
          },
          style: styles.find,
        }}>
        <TabTop.Screen name="关注" component={PanelOne} />
        <TabTop.Screen name="发现" component={PanelTwo} />
        <TabTop.Screen name="我的" component={PanelThree} />
      </TabTop.Navigator>
    );
  }
}

const styles = StyleSheet.create({
  find: {
    paddingTop: 30,
  },
});
