import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {createStackNavigator} from '@react-navigation/stack';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

const TabTop = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

const BBS = () => (
  <View>
    <Text>BBS</Text>
  </View>
);
const TabPanel = () => (
  <View>
    <Text>TabPanel</Text>
  </View>
);

export default class Test extends React.Component {
  render() {
    return (
      <>
        <Text>Common Component</Text>
        {/*<Stack.Screen name="Test" component={() => <Text>ssdsad</Text>} />*/}
        <TabTop.Navigator>
          <TabTop.Screen
            name="item"
            // screenOptions={e => alert(1)}
            component={() => <Text>sss</Text>}
          />
          <TabTop.Screen name="tem1" component={TabPanel} />
          <TabTop.Screen name="Item2" component={BBS} />
        </TabTop.Navigator>
      </>
    );
  }
}

const styles = StyleSheet.create({
  find: {
    // paddingTop: 80,
    backgroundColor: '#ccc',
  },
});
