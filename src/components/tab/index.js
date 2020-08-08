import React from 'react';
import {StyleSheet, Platform, Dimensions} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
const TopTab = createMaterialTopTabNavigator();

export default class Tab extends React.Component {
  render() {
    const {
      needPaddingTop,
      common,
      tabContent = [],
      tabBarOptions = {},
      initialRouteName,
    } = this.props;
    const Width = Dimensions.get('window').width;
    const left = Width / tabContent.length;
    console.warn(
      Object.assign(
        {
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
        },
        tabBarOptions,
      ),
    );
    console.log('find tab navigation', this.props.navigation)

    return (
      <>
        {common}
        {tabContent.length > 0 && (
          <TopTab.Navigator
            style={
              needPaddingTop && {
                paddingTop: Platform.OS === 'android' ? '' : 30,
                backgroundColor: '#fff',
              }
            }
            tabBarOptions={Object.assign(
              {
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
              },
              tabBarOptions,
            )}
            initialRouteName={initialRouteName}>
            {tabContent.length > 0 &&
              tabContent.map(({name, component}, i) => (
                <TopTab.Screen
                  keys={i}
                  key={i}
                  name={name}
                  component={component}
                  navigation={this.props.navigation}
                />
              ))}
          </TopTab.Navigator>
        )}
      </>
    );
  }
}

const styles = StyleSheet.create({
  tabBarOptions: {},
});
