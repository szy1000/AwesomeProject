import React from 'react';
import {Text, View, StyleSheet, Button, Alert} from 'react-native';
import {Jump} from '../utils/index';
import Video from 'react-native-video';
import * as WeChat from 'react-native-wechat';

const shareToFriend = async () => {
  if (!(await WeChat.isWXAppInstalled())) {
    Alert.alert('操作提示', '微信未安装，改功能无法使用', [
      {
        text: '确认',
        onPress: async () => {},
      },
    ]);
    return;
  }
  WeChat.shareToSession({
    // type: 'news',
    // webpageUrl: 'http://www.ivyroutedu.com/contact.php',
    // title: '留学帮',
    // description: '一个专业的留学辅导机构',
    title: 'playground',
    description: '微信分享测试',
    thumbImage: 'http://47.114.151.211/logo.png',
    type: 'news',
    webpageUrl: 'https://github.com/little-snow-fox/react-native-wechat-lib',
  })
    .then(response => {
      console.log(response);
      Alert.alert('操作提示', '分享成功', [
        {
          text: '确认',
          onPress: async () => {},
        },
      ]);
      return;
    })
    .catch(error => {
      alert(error);
      let errorCode = Number(error.code);
      if (errorCode === -2) {
        Alert.alert('操作提示', '分享已取消', [
          {
            text: '确认',
            onPress: async () => {},
          },
        ]);
      } else {
        Alert.alert('操作提示', '分享失败', [
          {
            text: '确认',
            onPress: async () => {},
          },
        ]);
      }
    });
};

export default class WelcomePage extends React.Component {
  componentDidMount() {

    // this.timer = setTimeout(() => {
    //   Jump.resetToHome(this.props);
    // }, 2000);
  }

  componentWillUnmount() {
    this.timer && clearInterval(this.timer);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Welcome</Text>
        <Button title="2233" onPress={() => shareToFriend()} />
        {/*<Button title="eee" onPress={async () => await WeChat.shareText()} />*/}

        <Button
          title="登录"
          onPress={async () => {
            console.log('ssss');
            WeChat.sendAuthRequest('snsapi_userinfo')
              .then(res => {
                const {code} = res;
                console.log(code);
              })
              .catch(err => console.log(err));
            alert('fins');
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: '50%',
    right: 0,
  },
});
