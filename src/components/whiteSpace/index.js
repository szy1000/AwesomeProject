import React from 'react';
import {View, StyleSheet} from 'react-native';

export default class WhiteSpace extends React.Component {
  render() {
    const {size = ''} = this.props;
    return <View style={[styles.whitespace, styles[size]]} />;
  }
}

const styles = StyleSheet.create({
  whitespace: {
    fontSize: 20,
    height: 5,
    backgroundColor: '#ddd',
  },
  middle: {
    height: 8,
  },
  big: {
    height: 10,
  },
});
