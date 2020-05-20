import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

export default class Panel extends React.Component {
  render() {
    const {title, tips, children} = this.props;
    return (
      <View style={styles.panel}>
        <View style={styles.header}>
          <View style={styles.holder} />
          <Text style={styles.title}>{title}</Text>
          <View style={styles.more}>
            <Text style={styles.tips}>{tips}</Text>
            <Image style={styles.icon} source={require('./more.png')} />
          </View>
        </View>
        <View style={styles.content}>{children}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    position: 'relative',
    paddingTop: 15,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  holder: {
    position: 'absolute',
    left: 15,
    top: 15,
    width: 4,
    height: 20,
    backgroundColor: '#11a8cd',
  },
  title: {
    marginLeft: 15,
    fontSize: 20,
    fontWeight: '500',
  },
  more: {
    flexDirection: 'row',
  },
  tips: {
    fontSize: 12,
    color: '#999',
  },
  icon: {
    width: 12,
    height: 12,
  },
  content: {
    paddingTop: 20,
    paddingBottom: 20,
    // paddingHorizontal: 15,
  },
});
