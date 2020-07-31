import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';

export default class SearchInput extends React.Component {
  render() {
    const {placeholder, value, onChangeText, onBlur, styles} = this.props;
    return (
      <TextInput
        style={[_styles.ipt, styles]}
        placeholder={placeholder || '请输入关键字'}
        allowFontScaling={false}
        value={value}
        returnKeyType="search"
        returnKeyLabel="search"
        {...this.props}
        onChangeText={e => onChangeText && onChangeText(e)}
        onBlur={e => onBlur && onBlur(e)}
      />
    );
  }
}

const _styles = StyleSheet.create({
  ipt: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    backgroundColor: '#f7f7f7',
    fontSize: 16,
    borderRadius: 20,
    overflow: 'hidden',
  },
});
