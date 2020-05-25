import React from 'react';
import {Button, Text, View, TextInput, StyleSheet} from 'react-native';
import {Link} from '@react-navigation/native';

export default class Note extends React.Component {
  render() {
    const {navigation} = this.props;
    return (
      <View>
        <Text style={styles.text}>Welcome To Note sBBssS</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    // color: '#ddd',
  },
});
