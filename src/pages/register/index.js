import React from 'react';
import {
  TextInput,
  Text,
  // TouchableWithoutFeedback,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ImageBackground,
  Button,
} from 'react-native';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {registerInit} from '../register/redux';
import Jump from '../../utils/jump';
import {getCodeReq, postRegisterReq} from './api';
import Feather from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-community/async-storage';

class Register extends React.Component {
  state = {
    phoneNumber: '',
    password: '',
    nickName: '',
    repeatPassword: '',
    time: 60,
    sending: false,
  };
  time = null;

  componentDidMount(): void {
    // console.warn(this.props);
  }

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
    const res = await postRegisterReq({phoneNumber, code, password});
    const {success, error, data} = res;

    if (success) {
      const {accessToken, profile} = data;
      await AsyncStorage.setItem('token', accessToken);
      await AsyncStorage.setItem('name', profile.name);
      await AsyncStorage.setItem('sid', profile.sid.toString());
      Jump.resetToHome(this.props);
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

  registerReq = () => {
    const {nickName, phoneNumber, repeatPassword, password} = this.state;

    if (!nickName) {
      Alert.alert(
        '操作提示',
        '用户名不能为空',
        [
          {
            text: '确认',
            onPress: async () => {},
          },
        ],
        {cancelable: false},
      )
      return;
    }

    if (!/^1[3456789]\d{9}$/.test(phoneNumber)) {
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
      )
      return;
    }

    if (repeatPassword !== password) {
      Alert.alert(
        '操作提示',
        '两次输入的密码不一致',
        [
          {
            text: '确认',
            onPress: async () => {},
          },
        ],
        {cancelable: false},
      )
      return;
    }

    this.props.registerInit(
      {
        nickName,
        phoneNumber,
        repeatPassword,
        password,
      },
      () => {
        Jump.linkToPage({
          navigation: this.props.navigation,
          url: 'Main',
        });
      },
    );
  };

  render() {
    const {time, code, phoneNumber, sending, password} = this.state;
    return (
      <View style={styles.register}>
        <ImageBackground style={styles.bg} source={require('./one.jpeg')} />

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
  register: {
    flex: 1,
    paddingTop: 30,
    paddingHorizontal: 30,
    backgroundColor: '#fff',
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
    marginTop: 80,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 10,
    paddingTop: 50,
    paddingBottom: 30,
    paddingHorizontal: 20,
    backgroundColor: '#fdfdfd',
  },

  btn: {
    marginTop: 50,
    height: 40,
    backgroundColor: '#11a8cd',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  white: {
    color: '#fff',
  },
  text: {},

  // ipt_wrapper: {
  //   marginBottom: 30,
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   paddingLeft: 10,
  //   height: 40,
  //   borderRadius: 4,
  //   backgroundColor: '#fff',
  // },
  // ipt: {
  //   marginLeft: 10,
  //   flex: 1,
  // },
});

export default connect(
  state => state.register,
  dispatch => bindActionCreators({registerInit}, dispatch),
)(Register);
