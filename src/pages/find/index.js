import React from 'react';
import {View, Text, Platform} from 'react-native';
import {Tab} from '../../components';
import FindFocus from '../find-focus';
import FindAll from '../find-all';
import FindMy from '../find-my';

export default class Find extends React.Component {
  tabContent = [
    {
      name: '关注',
      key: 'FindFocus',
      component: () => <FindFocus navigation={this.props.navigation} />,
    },
    {
      name: '发现',
      key: 'FindAll',
      component: () => <FindAll navigation={this.props.navigation} />,
    },
    {
      name: '我的',
      key: 'FindMy',
      component: () => <FindMy navigation={this.props.navigation} />,
    },
  ];
  render() {
    return (
      <Tab
        initialRouteName={'发现'}
        tabContent={this.tabContent}
        tabBarOptions={{
          labelStyle: {
            paddingTop: Platform.OS === 'android' ? 0 : 30,
            backgroundColor: '#fff',
          },
        }}
      />
    );
  }
}
