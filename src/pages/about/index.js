import React from 'react';
import {Button, Text, View, TextInput, StyleSheet} from 'react-native';
// import {Tab} from '../../components';
import {Link} from '@react-navigation/native';





export default class About extends React.Component {
  render() {
    const {navigation} = this.props;
    return (
      <View>
        <Text style={styles.text}>Welcome To Page About</Text>
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
