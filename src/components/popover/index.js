import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';

export default class Popover extends React.Component {
  render() {
    const {
      children,
      style,
      item,
      visible,
      mask,
      maskClick,
      styles,
    } = this.props;
    const {width, height, scale, fontScale} = Dimensions.get('window');
    return (
      <View style={[_styles.popover, style]}>
        {children}
        {visible && (
          <TouchableWithoutFeedback onPress={maskClick}>
            <View style={[_styles.mask, {height: height}]} />
          </TouchableWithoutFeedback>
        )}
        {visible && <View style={[_styles.content]}>{item}</View>}
      </View>
    );
  }
}

const _styles = StyleSheet.create({
  popover: {
    flex: 1,
  },
  mask: {
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  content: {
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    flex: 1,
    minHeight: 100,
    backgroundColor: '#fff',
  },
});
