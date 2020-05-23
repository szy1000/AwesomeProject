import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default class Library extends React.Component {
  render() {
    return (
      <View>
        <Text>library</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  find: {
    paddingTop: 30,
  },
});
