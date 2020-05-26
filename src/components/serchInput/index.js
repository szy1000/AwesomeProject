import React from 'react';
import {
  Button,
  InputText,
  Text,
  View,
  TextInput,
  StyleSheet,
} from 'react-native';

export default class SearchInput extends React.Component {
  render() {
    const {placeholder} = this.props;
    return (
      <View>
        <TextInput
          placeholder={placeholder || '请输入关键字'}
        />
        <Text>tab 组件</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
  },
});
