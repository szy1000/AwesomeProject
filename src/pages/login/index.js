import React from 'react';
import Jump from '../../utils/jump';
import AsyncStorage from '@react-native-community/async-storage';
import {
  Image,
  Text,
  Alert,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import {loginReq, loginByWechatReq} from './api';
import {Link} from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import * as WeChat from 'react-native-wechat';

export default class Login extends React.Component {
  state = {
    phoneNumber: '',
    password: '',
  };

  saveIptValue = (key, value) => {
    this.setState({
      [key]: value,
    });
  };

  handleLogin = async () => {
    // alert(JSON.stringify((await AsyncStorage.getItem('token')) || ''));
    const {phoneNumber, password} = this.state;
    if (!password || !phoneNumber) {
      Alert.alert('操作提示', '用户名或密码不能为空', [
        {
          text: '确认',
          onPress: async () => {},
        },
      ]);
      return;
    }
    const res = await loginReq(this.state);
    const {success, error, data} = res;
    console.log(res);
    if (success) {
      const {accessToken, profile} = data;
      await AsyncStorage.setItem('token', accessToken);
      await AsyncStorage.setItem('name', profile.name);
      await AsyncStorage.setItem('sid', profile.sid.toString());
      Jump.resetToHome(this.props);
    } else {
      Alert.alert('操作提示', error, [
        {
          text: '确认',
          onPress: async () => {},
        },
      ]);
    }

    console.log('login res', res);
  };

  loginByWechat = () => {
    WeChat.sendAuthRequest('snsapi_userinfo')
      .then(async res => {
        const {code} = res;
        console.log(res);
        this.checkBind(res.code);
      })
      .catch(err => console.log(err));
  };

  checkBind = async unionId => {
    const {data} = await loginByWechatReq({unionId});
    console.log('errorMessage', data);
    const {success, errorMessage} = data;
    if (success) {
    } else {
      Jump.linkToPage({
        url: 'Bind',
        params: {unionId},
        navigation: this.props.navigation,
      });
    }
  };

  render() {
    const {navigation} = this.props;
    const {phoneNumber, password} = this.state;
    return (
      <View style={styles.login}>
        <ImageBackground style={styles.bg} source={require('./login.png')} />
        {/*<Image style={styles.bg} />*/}
        <View style={styles.main}>
          <View style={styles.ipt_wrapper}>
            <Feather name="user" color="#d8d8d8" size={20} />
            <TextInput
              style={styles.ipt}
              placeholder="请输入手机号"
              maxLength={11}
              value={phoneNumber}
              returnKeyLabel="done"
              returnKeyType="done"
              keyboardType="numeric"
              placeholderTextColor="#d8d8d8"
              onChangeText={text => this.saveIptValue('phoneNumber', text)}
            />
          </View>
          <View style={styles.ipt_wrapper}>
            <Feather name="lock" color="#d8d8d8" size={20} />
            <TextInput
              style={styles.ipt}
              returnKeyLabel="done"
              returnKeyType="done"
              placeholder="请输入密码"
              value={password}
              secureTextEntry={true}
              placeholderTextColor="#d8d8d8"
              onChangeText={text => this.saveIptValue('password', text)}
            />
          </View>
          <View style={styles.msg}>
            {/*<Link to="/Register">免费注册</Link>*/}
            <Link to="/FindPsd">忘记密码</Link>
          </View>
          <TouchableOpacity
            style={styles.btn}
            title="登录"
            onPress={this.handleLogin}>
            <Text style={styles.white}>登录</Text>
          </TouchableOpacity>
          <View style={styles.linkToRegister}>
            <Text style={styles.noAccount}>还没有账号？</Text>
            <Link style={styles.register} to="/Register">
              立即注册
            </Link>
          </View>

          <View style={styles.loginWays}>
            {/*<View style={styles.way}>*/}
            {/*  <Image style={styles.icon} source={require('./pic47.png')} />*/}
            {/*  <Text style={styles.wayName}>QQ登录</Text>*/}
            {/*</View>*/}
            {/*<View style={styles.line} />*/}
            <TouchableOpacity style={styles.way} onPress={this.loginByWechat}>
              <Image style={styles.icon} source={require('./pic48.png')} />
              <Text style={styles.wayName}>微信登录</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  login: {
    // backgroundColor: '#def2f6',
    flex: 1,
  },
  bg: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  ipt_wrapper: {
    marginBottom: 30,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    height: 40,
    borderRadius: 4,
    backgroundColor: '#fff',
  },
  ipt: {
    marginLeft: 10,
    flex: 1,
  },
  main: {
    marginTop: 180,
    marginLeft: 30,
    marginRight: 30,
    borderRadius: 30,
    paddingTop: 50,
    paddingBottom: 30,
    paddingHorizontal: 20,
    backgroundColor: '#fdfdfd',
  },

  msg: {
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  btn: {
    marginBottom: 50,
    height: 40,
    backgroundColor: '#11a8cd',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  white: {
    color: '#fff',
  },
  linkToRegister: {
    marginBottom: 40,
    flexDirection: 'row',
    justifyContent: 'center',
  },

  noAccount: {
    color: '#c0c0c0',
  },
  register: {
    color: '#fd6868',
  },

  loginWays: {
    marginLeft: 40,
    marginRight: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  line: {
    width: 1,
    height: 20,
    backgroundColor: '#ccc',
  },
  way: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wayName: {
    marginLeft: 5,
    fontSize: 16,
    color: '#222',
  },
  icon: {
    width: 25,
    height: 25,
  },
});
