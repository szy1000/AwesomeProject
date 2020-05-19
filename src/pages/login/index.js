import React from 'react';
import Jump from '../../utils/jump';
import {
  Button,
  Image,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {Link} from '@react-navigation/native';

import Feather from 'react-native-vector-icons/Feather';

export default class Login extends React.Component {
  render() {
    const {navigation} = this.props;
    return (
      <View style={styles.login}>
        <Image style={styles.bg} source={require('./one.jpeg')} />
        <View style={styles.main}>
          <View style={styles.ipt_wrapper}>
            <Feather name="user" color="#d8d8d8" size={20} />
            <TextInput
              style={styles.ipt}
              placeholder="请输入用户"
              placeholderTextColor="#d8d8d8"
              onChangeText={text => {
                navigation.setParams({
                  iTitle: text,
                });
              }}
            />
          </View>
          <View style={styles.ipt_wrapper}>
            <Feather name="lock" color="#d8d8d8" size={20} />
            <TextInput
              style={styles.ipt}
              placeholder="请输入密码"
              placeholderTextColor="#d8d8d8"
              onChangeText={text => {
                navigation.setParams({
                  iTitle: text,
                });
              }}
            />
          </View>
          <View style={styles.msg}>
            <Text>短信登录</Text>
            <Text>忘记密码?</Text>
          </View>
          <TouchableOpacity
            style={styles.btn}
            title="登录"
            onPress={() => Jump.resetToHome(this.props)}>
            <Text style={styles.white}>登录</Text>
          </TouchableOpacity>
          <View style={styles.linkToRegister}>
            <Text>还没有账号？</Text>
            <Link to="/Register">立即注册</Link>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  login: {
    backgroundColor: '#def2f6',
    flex: 1,
  },
  bg: {
    height: 300,
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
    marginTop: -50,
    marginLeft: 30,
    marginRight: 30,
    borderRadius: 30,
    paddingTop: 50,
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
});
