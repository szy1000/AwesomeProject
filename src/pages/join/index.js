import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Tab} from '../../components';
import {Item} from './page-components';

export default class Join extends React.Component {
  render() {
    const {navigation} = this.props;

    return (
      <Tab
        tabBarOptions={{
          labelStyle: {
            fontSize: 14,
          },
          tabStyle: {width: 100},
          indicatorStyle: {
            left: 40,
            width: 20,
            height: 4,
            borderRadius: 3,
            backgroundColor: '#12a8cd',
          },
        }}
        tabContent={[
          {
            name: '我加入的',
            component: () => <Item navigation={navigation} />,
          },
          {
            name: '我管理的',
            component: () => <Item navigation={navigation} />,
          },
        ]}
      />
    );
  }
}

const styles = StyleSheet.create({
  join: {
    paddingTop: 30,
  },
});
