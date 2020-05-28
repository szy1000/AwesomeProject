import React from 'react';
import {View, StyleSheet} from 'react-native';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

const TabTop = createMaterialTopTabNavigator();
import PanelOne from './PanelOne';
import PanelTwo from './PanelTwo';

export default class Join extends React.Component {
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
        }}>
        <TabTop.Screen name="我加入的" component={PanelOne} />
        <TabTop.Screen name="我管理的" component={PanelTwo} />
      </TabTop.Navigator>
    );
  }
}

const styles = StyleSheet.create({
  find: {
    paddingTop: 30,
  },
});
