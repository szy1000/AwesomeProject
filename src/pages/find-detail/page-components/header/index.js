import React from 'react';
import {
  View,
  Image,
  TouchableWithoutFeedback,
  Text,
  StyleSheet,
} from 'react-native';

export default class Header extends React.Component {
  render() {
    const {avatarUrl, userName, address} = this.props.user;
    return (
      <View style={styles.header}>
        <Image style={styles.avatar} source={{uri: avatarUrl}} />
        <View style={{flex: 1}}>
          <Text style={styles.name} numberOfLines={1}>
            {userName}
          </Text>
          <View style={styles.addressWrapper} numberOfLines={1}>
            <Image style={styles.icon} source={require('./address.png')} />
            <Text style={styles.address}>{address}</Text>
          </View>
        </View>
        <View>
          <TouchableWithoutFeedback onPress={this.props.followFn}>
            <Text>关注</Text>
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    paddingLeft: 40,
    paddingRight: 20,
    height: 40,
    alignItems: 'center',
    flexDirection: 'row',
  },
  avatar: {
    marginRight: 10,
    width: 40,
    height: 40,
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
});
