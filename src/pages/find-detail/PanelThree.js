import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default class PanelTwo extends React.Component {
  render() {
    return (
      <View style={styles.findTwo}>
        <Text>PanelThree</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  findTwo: {
    paddingTop: 60,
    backgroundColor: '#ccc',
  },
});
