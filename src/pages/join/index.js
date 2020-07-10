import React from 'react';
import {StyleSheet} from 'react-native';
import {Item, JoinTab, ManageTab} from './page-components';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {joinInit} from './redux';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
const TopTab = createMaterialTopTabNavigator();

class Join extends React.Component {
  componentDidMount(): void {
    // this.props.joinInit();
  }

  render() {
    return (
      <TopTab.Navigator
        tabBarOptions={{
          labelStyle: {
            fontSize: 16,
          },
          activeTintColor: '#12a8cd',
          inactiveTintColor: '#000',
          tabStyle: {width: 100},
          indicatorStyle: {
            left: 40,
            width: 20,
            height: 4,
            borderRadius: 3,
            backgroundColor: '#12a8cd',
          },
        }}
        initialRouteName={'我加入的'}>
        <TopTab.Screen
          keys="我加入的"
          name="我加入的"
          component={() => <JoinTab {...this.props} />}
        />
        <TopTab.Screen
          keys="我管理的"
          name="我管理的"
          component={() => <ManageTab {...this.props} />}
        />
      </TopTab.Navigator>
    );
  }
}

export default connect(
  state => state.join,
  dispatch => bindActionCreators({joinInit}, dispatch),
)(Join);

const styles = StyleSheet.create({
  join: {
    paddingTop: 30,
  },
});
