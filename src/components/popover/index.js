import React from 'react';
import {View, Text, StyleSheet, Modal, Dimensions} from 'react-native';

export default class Popover extends React.Component {
  render() {
    const {children, style, item, visible, mask, styles} = this.props;
    const {width, height, scale, fontScale} = Dimensions.get('window');
    return (
      <Modal animationType="slide" transparent={true} visible={visible}>
        <View style={[_styles.popover, style]}>
          <View>{children}</View>
          <View style={[_styles.content, {height: height}]}>
            <View style={_styles.mask}>{item}</View>
          </View>
        </View>
      </Modal>
    );
  }
}

const _styles = StyleSheet.create({
  popover: {
    // position: 'absolute',
    // left: 0,
    // right: 0,
    // zIndex: 100,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  content: {
    // position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 11,
    // backgroundColor: 'red',
  },
  mask: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    // bottom: 0,
    // flex: 1,
    // height: 200,
    // backgroundColor: 'red',
  },
});
