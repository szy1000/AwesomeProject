import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import {Tab} from '../../components';
import {GroupTitle, Item, Discussion} from './page-components';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {groupInit} from './redux';

class Group extends React.Component {
  componentDidMount() {
    const {
      route: {params},
    } = this.props;

    this.props.groupInit(params.id);
  }

  render() {
    const {init, data, navigation} = this.props;
    if (!init) {
      return <ActivityIndicator />;
    }
    const {group, groupList} = data;
    console.warn(groupList)
    return (
      <Tab
        common={<GroupTitle {...this.props} group={group} />}
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

export default connect(
  state => state.group,
  dispatch => bindActionCreators({groupInit}, dispatch),
)(Group);
