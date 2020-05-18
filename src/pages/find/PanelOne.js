import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default class PanelOne extends React.Component {
  render() {
    return (
      <View style={styles.findOne}>
        <Text>PanelOne</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  findOne: {
    paddingTop: 60,
    backgroundColor: '#ccc',
  },
});
