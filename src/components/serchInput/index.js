import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';

export default class SearchInput extends React.Component {
  render() {
    const {placeholder, value, onChangeText, styles} = this.props;
    return (
      <View>
        <TextInput
          style={[_styles.ipt, styles]}
          placeholder={placeholder || '请输入关键字'}
          {...this.props}
          value={value}
          onChangeText={e => onChangeText(e)}
        />
      </View>
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
