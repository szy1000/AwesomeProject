import React, {Fragment} from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
  Text,
} from 'react-native';
import {GroupTitle, FixedTop, Discussion} from './page-components';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
const TopTab = createMaterialTopTabNavigator();

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {groupInit, toggleJoin} from './redux';
import Jump from '../../utils/jump';

class Group extends React.Component {
  componentDidMount() {
    const {
      route: {params},
    } = this.props;
    this.props.groupInit(params.id);
  }

  toggleJoin = _ => {
    this.props.toggleJoin(_);
    const {
      route: {params},
    } = this.props;
    this.props.groupInit(params.id);
  };
  render() {
    const {
      init,
      data,
      navigation,
      route: {params},
    } = this.props;
    if (!init) {
      return <ActivityIndicator />;
    }
    const {group} = data;
    return (
      <View style={styles.group}>
        <GroupTitle
          {...this.props}
          group={group}
          toggleJoin={e => this.toggleJoin(e)}
        />
        <TouchableWithoutFeedback
          onPress={() => {
            Jump.linkToPage({
              navigation,
              url: 'GroupEdit',
              params: {
                id: group.id,
              },
            });
          }}>
          <View style={styles.note}>
            <Image style={styles.edit} source={require('./edit.png')} />
          </View>
        </TouchableWithoutFeedback>
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
            keys="置顶帖"
            name="置顶帖"
            component={() => <FixedTop {...this.props} />}
          />
        </TopTab.Navigator>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  group: {
    position: 'relative',
    flex: 1,
  },
  top: {
    backgroundColor: '#fff',
  },

  note: {
    position: 'absolute',
    zIndex: 100,
    right: 10,
    bottom: 60,
  },
  edit: {
    width: 60,
    height: 60,
  },
});

export default connect(
  state => state.group,
  dispatch => bindActionCreators({groupInit, toggleJoin}, dispatch),
)(Group);
