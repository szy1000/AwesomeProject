import React from 'react';
import {StyleSheet} from 'react-native';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

const TabTop = createMaterialTopTabNavigator();
import BBS from '../pages/bbs/index';
import TabPanel from '../pages/bbs/panelOne';

export default class FindTab extends React.Component {
  render() {
    return (
      <TabTop.Navigator>
        <TabTop.Screen name="tem1" component={TabPanel} />
        <TabTop.Screen name="Item2" component={BBS} />
      </TabTop.Navigator>
    );
  }
}

const styles = StyleSheet.create({
  find: {
    // paddingTop: 80,
    backgroundColor: '#ccc',
  },
});
