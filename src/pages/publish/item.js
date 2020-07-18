import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';

export default class Collect extends React.Component {
  render() {
    console.log(this.props);
    const {title, createTime, user} = this.props;
    return (
      <TouchableOpacity style={styles.item}>
        <View style={styles.header}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              style={styles.avatar}
              source={
                user.avatarUrl ? {uri: user.avatarUrl} : require('./pic39.png')
              }
            />
            <Text style={styles.type}>{user.userName}</Text>
          </View>
          <Text style={styles.time}>{createTime.split(' ')[0]}</Text>
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
