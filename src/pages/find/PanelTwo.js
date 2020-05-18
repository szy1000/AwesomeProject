import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';

export default class PanelTwo extends React.Component {
  render() {
    return (
      <View style={styles.findTwo}>
        <Text>PanelTwo</Text>

        <TextInput placeholder="大家都在搜美丽校园" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  findTwo: {
    // paddingTop: 60,
    // backgroundColor: '#ccc',
  },
});
