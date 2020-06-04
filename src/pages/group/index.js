import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {Tab} from '../../components';
import {GroupTitle} from './page-components';

export default class Group extends React.Component {
  componentDidMount() {
    const {
      route: {params},
    } = this.props;
    console.log(params);
  }

  render() {
    return (
      <Tab
        common={<GroupTitle {...this.props} />}
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
            name: '全部讨论',
            component: () => <Text>s</Text>,
          },
          {
            name: '置顶',
            component: () => <Text>s</Text>,
          },
        ]}
      />
    );
  }
}

const styles = StyleSheet.create({
  group: {},
});
