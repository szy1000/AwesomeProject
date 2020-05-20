import React from 'react';
import {Button, Text, View, StyleSheet} from 'react-native';

export default class Register extends React.Component {
  render() {
    return (
      <View style={styles.register}>
        <Text style={styles.text}>Welcome To Page Register</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  register: {
    paddingTop: 30,
    fontSize: 20,
    // color: '#ddd',
  },
});
