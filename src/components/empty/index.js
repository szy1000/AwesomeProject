import React from 'react';
import {Text, Image, View, StyleSheet} from 'react-native';

export default class Empty extends React.Component {
  render() {
    return (
      <View style={_styles.empty}>
        <Image source={require('./empty-box.png')} />
        <Text style={_styles.word}>没有更多数据了！</Text>
      </View>
    );
  }
}

const _styles = StyleSheet.create({
  empty: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  word: {
  },
});
