import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {SearchInput} from '../../components';
export default class Repository extends React.Component {
  render() {
    return (
      <View>
        <SearchInput />
        <Text>Repository</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  find: {
    paddingTop: 30,
  },
});
