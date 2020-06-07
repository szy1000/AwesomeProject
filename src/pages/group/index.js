import React from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';
import {Tab} from '../../components';
import {GroupTitle, Item, Discussion} from './page-components';

export default class Group extends React.Component {
  componentDidMount() {
    const {
      route: {params},
    } = this.props;
    console.log(params);
  }

  render() {
    const {navigation} = this.props;
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
            component: () => <Discussion navigation={navigation} />,
          },
          {
            name: '置顶',
            component: () => (
              <View style={styles.top}>
                <Item navigation={navigation} />
                <Item />
                <Item />
              </View>
            ),
          },
        ]}
      />
    );
  }
}

const styles = StyleSheet.create({
  group: {},
  top: {
    backgroundColor: '#fff',
  },
});
