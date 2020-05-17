import React from 'react';
import {Button, Text, View, TextInput, StyleSheet} from 'react-native';

export default class TabPanel extends React.Component {
  render() {
    return (
      <View>
        <Text>tab 组件</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
  },
});
