import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

export default class Panel extends React.Component {
  render() {
    const {title, tips, children} = this.props;
    return (
      <View style={styles.panel}>
        <View style={styles.header}>
          <View style={styles.icon} />
          <Text style={styles.title}>{title || 'title'}</Text>
          <Text style={styles.tips}>{tips || 'ss'}</Text>
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
    justifyContent: 'space-between',
  },
  icon: {
    position: 'absolute',
    left: 15,
    top: 15,
    width: 4,
    height: 20,
    backgroundColor: 'red',
  },
  title: {
    marginLeft: 15,
    fontSize: 20,
    fontWeight: '500',
  },
  tips: {
    fontSize: 12,
    color: '#666',
  },
  content: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 15,
  }
});
