import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import TabPanel from '../bbs/panelOne';
import BBS from '../bbs';

export default class Find extends React.Component {
  render() {
    const _Tab = createStackNavigator(
      createMaterialTopTabNavigator({
        TabOne: {
          screen: TabPanel,
        },
        TabTwo: {
          screen: BBS,
        },
      }),
    );
    return (
      <View style={styles.find}>
        <Text>sss</Text>
        <_Tab />
        {/*<_Stack.Screen className="Screen">*/}
        {/*  <_Tab.Navigator className="Navigator">*/}
        {/*    <_Tab.Screen name="Item1" component={TabPanel} />*/}
        {/*    <_Tab.Screen name="Item2" component={BBS} />*/}
        {/*  </_Tab.Navigator>*/}
        {/*</_Stack.Screen>*/}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  find: {
    paddingTop: 80,
    // paddingBottom: 20,
    // paddingHorizontal: 15,
    // backgroundColor: '#ccc',
  },
});
