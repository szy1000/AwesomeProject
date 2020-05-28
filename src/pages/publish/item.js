import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';

export default class Collect extends React.Component {
  render() {
    return (
      <TouchableOpacity style={styles.item}>
        <View style={styles.header}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image style={styles.avatar} source={require('./pic39.png')} />
            <Text style={styles.type}>sss</Text>
          </View>
          <Text style={styles.time}>2019-01-10</Text>
        </View>
        <Text style={styles.content} numberOfLines={3}>
          阿斯顿撒打算的撒打算打算打算的大大撒撒打算大
          阿斯顿撒打算的撒打算打算打算的大大撒撒打算大
          阿斯顿撒打算的撒打算打算打算的大大撒撒打算大
          阿斯顿撒打算的撒打算打算打算的大大撒撒打算大
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  avatar: {
    width: 25,
    height: 25,
  },
  type: {
    marginLeft: 10,
    color: '#aaa',
  },
  time: {
    color: '#aaa',
  },
  content: {
    marginTop: 15,
    lineHeight: 20,
  },
});
