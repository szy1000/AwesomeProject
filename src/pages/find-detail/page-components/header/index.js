import React from 'react';
import {View, Image, TouchableOpacity, Text, StyleSheet} from 'react-native';

export default class Header extends React.Component {
  render() {
    const {
      user: {avatarUrl, userName, address},
      follow,
    } = this.props;

    return (
      <View style={styles.header}>
        <Image
          style={styles.avatar}
          source={
            avatarUrl
              ? {uri: avatarUrl}
              : require('../../../../assets/images/logo.jpeg')
          }
        />
        <View style={{flex: 1}}>
          <Text style={styles.name} numberOfLines={1}>
            {userName}
          </Text>
          <View style={styles.addressWrapper} numberOfLines={1}>
            <Image style={styles.icon} source={require('./address.png')} />
            <Text style={styles.address}>{address}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => this.props.followFn()}>
          <View style={styles.focus}>
            {follow ? <Text>取消关注</Text> : <Text>关注</Text>}
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    // position: 'relative',
    paddingLeft: 40,
    paddingRight: 20,
    // height: 40,
    // alignItems: 'center',
    flexDirection: 'row',
  },
  avatar: {
    marginRight: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  addressWrapper: {
    marginTop: 5,
    flexDirection: 'row',
  },
  icon: {
    marginRight: 10,
    width: 10,
    height: 12,
  },
  address: {
    alignItems: 'center',
    fontSize: 12,
    color: '#999',
  },
  control: {
    position: 'absolute',
    bottom: 0,
  },
  focus: {

  }
});
