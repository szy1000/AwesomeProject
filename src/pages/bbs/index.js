/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {Button, Text, View, StyleSheet} from 'react-native';

export default class BBS extends React.Component {
  render() {
    const {navigation} = this.props;
    return (
      <View>
        <Text style={styles.text}>Welcome To Page BBS</Text>
        <Button
          title={'Go Back'}
          onPress={() => {
            navigation.navigate('Home');
          }}>
          返回
        </Button>
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
