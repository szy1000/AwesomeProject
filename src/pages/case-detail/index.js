import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
export default class CaseDetail extends React.Component {

  render() {
    const {navigation} = this.props;
    return (
      <View>
        <Text>ss</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  repository: {},
  active: {
    color: '#12a8cd',
  },
});
