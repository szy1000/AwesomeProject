import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

export default class Item extends React.Component {
  render() {
    const {navigation} = this.props;
    return (
      <View style={styles.item}>
        <Text>sss</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {},
});
