import React from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import {Tab} from '../../components';
import {Item} from './page-components';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {joinInit} from './redux';

class Join extends React.Component {
  componentDidMount(): void {
    this.props.joinInit()
  }

  render() {
    const {init, data, navigation} = this.props;
    if (!init) {
      return <ActivityIndicator />;
    }
    console.log(data)
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

export default connect(
  state => state.join,
  dispatch => bindActionCreators({joinInit}, dispatch),
)(Join);

const styles = StyleSheet.create({
  join: {
    paddingTop: 30,
  },
});
