import React, {Fragment} from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import {GroupTitle, FixedTop, Discussion} from './page-components';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
const TopTab = createMaterialTopTabNavigator();

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
    const {
      init,
      data,
      route: {params},
    } = this.props;
    if (!init) {
      return <ActivityIndicator />;
    }
    const {group} = data;
    return (
      <Fragment>
        <GroupTitle {...this.props} group={group} />
        <TopTab.Navigator
          tabBarOptions={{
            labelStyle: {
              fontSize: 16,
            },
            tabStyle: {width: 100},
            activeTintColor: '#12a8cd',
            inactiveTintColor: '#000',
            indicatorStyle: {
              left: 40,
              width: 20,
              height: 4,
              borderRadius: 3,
              backgroundColor: '#12a8cd',
            },
          }}
          initialRouteName="全部讨论">
          <TopTab.Screen
            keys="全部讨论"
            name="全部讨论"
            component={() => (
              // <Discussion navigation={navigation} id={params.id} />
              <Discussion {...this.props} id={params.id} />
            )}
          />
          <TopTab.Screen
            keys="置顶"
            name="置顶"
            component={() => <FixedTop {...this.props} />}
          />
        </TopTab.Navigator>
      </Fragment>
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
