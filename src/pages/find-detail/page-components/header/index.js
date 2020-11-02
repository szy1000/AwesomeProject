import React from 'react';
import {View, Image, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {Icon} from 'native-base';
import Jump from '../../../../utils/jump';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default class Header extends React.Component {
  render() {
    const {
      user: {avatarUrl, userName, address},
      navigation,
      follow,
    } = this.props;
    return (
      <View style={styles.header}>
        <MaterialIcons
          onPress={() => Jump.goBack({navigation})}
          size={30}
          style={{marginRight: 10}}
          name="arrow-back"
        />
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
            <Text style={styles.address}>{address || '火星'}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => this.props.followFn()}>
          {follow ? (
            <View style={styles.focus}>
              <Text style={styles.txt}>取消关注</Text>
            </View>
          ) : (
            <View style={styles.unfocus}>
              <Icon
                type="AntDesign"
                style={{
                  color: '#12a8cd',
                  fontSize: 14,
                }}
                name="plus"
              />
              <Text style={styles.fTxt}>关注</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    // position: 'relative',
    paddingVertical: 5,
    paddingHorizontal: 10,
    // height: 40,
    alignItems: 'center',
    flexDirection: 'row',
    // backgroundColor: 'red',
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
    borderColor: '#12a8cd',
    borderWidth: 1,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 30,
    backgroundColor: '#12a8cd',
  },
  txt: {
    color: '#fff',
  },
  unfocus: {
    flexDirection: 'row',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 30,
    borderColor: '#12a8cd',
    borderWidth: 1,
  },
  fTxt: {
    color: '#12a8cd',
  },
});
