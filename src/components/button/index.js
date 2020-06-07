import React from 'react';
import {
  Text,
  Image,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import {Button} from '../index';

export default class Item extends React.Component {

  render() {
    const {onClick, type, children, style} = this.props;
    return (
      <TouchableWithoutFeedback onPress={onClick}>
        <View style={_styles.button}>
          <Text style={_styles.word}>{children}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const _styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 20,
    backgroundColor: '#12a8cd',
  },
  word: {
    color: '#fff',
    // fontSize: 30
  },
});
