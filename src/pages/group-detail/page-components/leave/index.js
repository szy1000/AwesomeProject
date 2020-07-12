import React from 'react';
import {Text, Image, View, StyleSheet} from 'react-native';
export default class Leave extends React.Component {
  componentDidMount() {
    // const {
    //   route:
    // } = this.props;
    // console.log(params);
  }

  render() {
    const {user, content, createTime} = this.props;
    const _uri = user && user.avatarUrl;
    return (
      <View style={styles.leave}>
        <Image
          style={styles.avatar}
          source={_uri ? {uri: _uri} : require('./avatar.png')}
        />
        <View style={styles.content}>
          <View style={styles.info}>
            <Text style={styles.name}>{user && user.userName}</Text>
            <Text style={styles.date}>
              {createTime && createTime.toString().split(' ')[0]}更新
            </Text>
          </View>
          <Text style={styles.desc}>{content}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  leave: {
    padding: 15,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#f7f7f7',
  },
  info: {
    // marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    height: 30,
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    resizeMode: 'contain',
    overflow: 'hidden',
  },
  content: {
    marginLeft: 15,
  },
  name: {
    marginRight: 15,
    color: '#111',
    fontSize: 16,
    fontWeight: '500',
    textAlignVertical: 'top',
  },
  date: {
    marginTop: 5,
    color: '#aaa',
  },

  desc: {
    marginTop: 10,
    paddingRight: 20,
    // marginVertical: 0,
    lineHeight: 24,
  },
});
