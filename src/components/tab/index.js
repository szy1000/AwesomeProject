import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

const TopTab = createMaterialTopTabNavigator();

export default class Tab extends React.Component {
  render() {
    const {common, tabContent, initialRouteName} = this.props;
    const Width = Dimensions.get('window').width;
    const left = Width / tabContent.length;
    return (
      <>
        {common}
        <TopTab.Navigator
          tabBarOptions={{
            labelStyle: {
              fontSize: 16,
            },
            activeTintColor: '#12a8cd',
            inactiveTintColor: '#000',
            indicatorStyle: {
              // marginLeft: '10%',
              left: (left - 20) / 2,
              width: 20,
              height: 4,
              borderRadius: 3,
              backgroundColor: '#12a8cd',
            },
          }}
          initialRouteName={initialRouteName}>
          {tabContent.map(({name, component}, i) => (
            <TopTab.Screen keys={i} name={name} component={component} />
          ))}
        </TopTab.Navigator>
      </>
    );
  }
}

const styles = StyleSheet.create({
  tabBarOptions: {},
});
