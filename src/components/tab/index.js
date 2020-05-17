import React from 'react';
import {Button, Text, View, TextInput, StyleSheet} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

const TopTab = createMaterialTopTabNavigator();

const Item1 = () => (
  <View>
    <Text>Item1</Text>
  </View>
);

const Item2 = () => (
  <View>
    <Text>Item2</Text>
  </View>
);
export default class Tab extends React.Component {
  render() {
    return (
      <View>
        <Text>tab 组件</Text>
        <TopTab.Navigator initialRouteName="Item1">
          <TopTab.Screen title="sss" name="Item1" component={Item1} />
          <TopTab.Screen title="ss2s" name="Item2" component={Item2} />
        </TopTab.Navigator>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
  },
});
