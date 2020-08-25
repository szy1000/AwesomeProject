import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Jump from '../../utils/jump';

export default class Item extends React.Component {
  render() {
    const {
      resourceContent: {name, createTime},
      resource,
      resourceId,
      navigation,
    } = this.props;
    console.log(this.props);
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() =>
          Jump.linkToPage({
            navigation,
            url: resource === 'note' ? 'FindDetail' : 'GroupDetail',
            params: {
              id: resourceId,
            },
          })
        }>
        <View style={styles.header}>
          <Text style={styles.type}>
            {resource === 'note' ? '笔记' : '讨论组'}
          </Text>
          <Text style={styles.time}>
            {createTime && createTime.split(' ')[0]}
          </Text>
        </View>
        <Text style={styles.content} numberOfLines={3}>
          {name}
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
