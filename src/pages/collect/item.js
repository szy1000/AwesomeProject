import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

export default class Collect extends React.Component {
  render() {
    const {
      resourceContent: {title, createTime},
    } = this.props;
    return (
      <TouchableOpacity style={styles.item}>
        <View style={styles.header}>
          <Text style={styles.type}>笔记</Text>
          <Text style={styles.time}>
            {createTime && createTime.split(' ')[0]}
          </Text>
        </View>
        <Text style={styles.content} numberOfLines={3}>
          {title}
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
  type: {
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
