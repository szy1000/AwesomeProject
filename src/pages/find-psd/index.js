import React from 'react';
import Jump from '../../utils/jump';
import AsyncStorage from '@react-native-community/async-storage';
import {
  Image,
  Alert,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import {resetPsdReq, getCodeReq} from './api';
import {Link} from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';

export default class FindPsd extends React.Component {
  state = {
    phoneNumber: '',
    code: '',
    password: '',
    time: 60,
    sending: false,
  };
  time = null;

  saveIptValue = (key, value) => {
    this.setState({
      [key]: value,
    });
  };
  componentWillUnmount(): void {
    clearInterval(this.time);
  }

  sendMsg = async () => {
    const {phoneNumber} = this.state;
    if (
      !/^((13[0-9])|(17[0-1,6-8])|(15[^4,\\D])|(18[0-9]))\d{8}$/.test(
        phoneNumber,
      )
    ) {
      Alert.alert(
        '操作提示',
        '手机号格式不正确，请检查后重新提交！',
        [
          {
            text: '确认',
            onPress: async () => {},
          },
        ],
        {cancelable: false},
      );
      return;
    }
    const res = await getCodeReq({phoneNumber});
    const {success, error} = res;
    console.log(res);
    if (!success) {
      Alert.alert(
        '操作提示',
        error,
        [
          {
            text: '确认',
            onPress: async () => {},
          },
        ],
        {cancelable: false},
      );
      return;
    }
    this.setState({
      sending: true,
    });
    let {time} = this.state;
    this.time = setInterval(() => {
      console.log(time);
      if (time > 0) {
        this.setState({
          time: time--,
        });
      } else {
        clearInterval(this.time);
        this.setState({
          time: 60,
          sending: false,
        });
      }
    }, 1000);
  };
  handleReset = async () => {
    const {phoneNumber, code, password} = this.state;
    if (!password || !phoneNumber || !code) {
      Alert.alert(
        '操作提示',
        '用户名或密码不能为空',
        [
          {
            text: '确认',
            onPress: async () => {},
          },
        ],
        {cancelable: false},
      );
      return;
    }
    if (
      !/^((13[0-9])|(17[0-1,6-8])|(15[^4,\\D])|(18[0-9]))\d{8}$/.test(
        phoneNumber,
      )
    ) {
      Alert.alert(
        '操作提示',
        '手机号格式不正确',
        [
          {
            text: '确认',
            onPress: async () => {},
          },
        ],
        {cancelable: false},
      );
      return;
    }
    const res = await resetPsdReq({phoneNumber, code, password});
    const {success, error} = res;
    if (success) {
      Alert.alert(
        '操作提示',
        '密码重置成功，请前往登录',
        [
          {
            text: '确认',
            onPress: () => {
              Jump.linkToPage({
                navigation: this.props.navigation,
                url: 'Login',
              });
            },
          },
        ],
        {cancelable: false},
      );
    } else {
      Alert.alert(
        '操作提示',
        error,
        [
          {
            text: '确认',
            onPress: async () => {},
          },
        ],
        {cancelable: false},
      );
    }

    console.log('login res', res);
  };

  render() {
    const {navigation} = this.props;
    const {phoneNumber, code, sending, time, password} = this.state;
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
            <Feather name="code" color="#d8d8d8" size={20} />
            <TextInput
              style={styles.ipt}
              placeholder="请输入验证吗"
              maxLength={6}
              value={code}
              returnKeyLabel="done"
              returnKeyType="done"
              keyboardType="numeric"
              placeholderTextColor="#d8d8d8"
              onChangeText={text => this.saveIptValue('code', text)}
            />
            <Button
              onPress={this.sendMsg}
              title={sending ? `${time}s` : '获取验证码'}
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
          <TouchableOpacity
            style={styles.btn}
            title="确定"
            onPress={this.handleReset}>
            <Text style={styles.white}>确定</Text>
          </TouchableOpacity>
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
