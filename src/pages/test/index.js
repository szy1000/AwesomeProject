import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Geolocation from 'react-native-geolocation-service';

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
  state = {
    pos: '',
  };
  getCurrentPos = () => {
    Geolocation.getCurrentPosition(
      position => {
        alert(JSON.stringify(position));
      },
      error => {
        // See error code charts below.
        alert(JSON.stringify(error));
        console.warn(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
    // navigator.geolocation.getCurrentPosition(location => {
    //   this.setState({
    //     pos: location.toString(),
    //   });
    // });
  };

  componentDidMount(): void {
    this.getCurrentPos();
  }

  render() {
    return (
      <>
        <Text>Common Component One</Text>
        <Text>{this.state.pos}</Text>
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
