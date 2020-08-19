import React from 'react';
import {
  Text,
  Platform,
  ImageBackground,
  View,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import Jump from '../../../../utils/jump';

export default class GroupTitle extends React.Component {
  render() {
    const {
      name,
      image,
      description,
      userCount,
      id,
      join,
    } = this.props.group;
    console.log('this.props.group', join);
    return (
      <View style={styles.group}>
        <ImageBackground style={styles.bg} source={require('./pic60.png')} />
        <View style={styles.tips}>
          <Image
            accessibilityRole={'image'}
            source={
              image
                ? {uri: image}
                : require('../../../../assets/images/logo.jpeg')
            }
            style={styles.avatar}
          />
          <View style={styles.title_wrapper}>
            <Text numberOfLines={1} style={styles.title}>
              {name}
            </Text>
            <Text style={styles.subTitle}>{userCount} 小叮当</Text>
          </View>
          <TouchableWithoutFeedback
            onPress={() => {
              if (!join) {
                this.props.toggleJoin({
                  isJoin: join,
                  id,
                });
              } else {
                Alert.alert(
                  '操作提示',
                  '您确定退出当前小组吗？',
                  [
                    {
                      text: '取消',
                      onPress: () => console.log('Cancel Pressed'),
                      style: 'cancel',
                    },
                    {
                      text: '确认',
                      onPress: async () => {
                        await this.props.toggleJoin({
                          isJoin: join,
                          id,
                        });
                        Jump.goBack({navigation: this.props.navigation});
                      },
                    },
                  ],
                  {cancelable: false},
                );
              }
            }}>
            <View style={styles.btn}>
              <Text style={styles.txt}>{join ? '已加入' : '加入'}</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <Text style={styles.desc} numberOfLines={2}>
          小组简介：{description}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  group: {
    paddingTop: Platform.OS == 'ios' ? 110 : 60,
    paddingBottom: 20,
    paddingHorizontal: 15,
    backgroundColor: '#ccc',
  },
  bg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 240,
    resizeMode: 'contain',
  },
  tips: {
    display: 'flex',
    flexDirection: 'row',
  },
  avatar: {
    marginRight: 15,
    width: 60,
    height: 60,
    borderRadius: 5,
    borderWidth: 3,
    borderColor: '#ddd',
    overflow: 'hidden',
    resizeMode: 'contain',
  },
  title_wrapper: {
    paddingTop: 5,
    height: 60,
    display: 'flex',
    flex: 1,
  },
  title: {
    color: '#fff',
    fontSize: 18,
  },
  subTitle: {
    marginTop: 10,
    color: '#fff',
  },
  text: {
    fontSize: 20,
  },

  desc: {
    marginTop: 10,
    color: '#fff',
    lineHeight: 20,
  },

  btn: {
    width: 58,
    height: 26,
    color: '#14a4c8',
    backgroundColor: '#e7f6fa',
    borderWidth: 1,
    borderColor: '#14a4c8',
    borderRadius: 4,
    alignItems: 'center',
  },
  txt: {
    color: '#14a4c8',
    lineHeight: 26,
    textAlign: 'center',
  },
});
