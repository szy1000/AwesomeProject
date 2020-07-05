import React from 'react';
import {
  TextInput,
  Text,
  // TouchableWithoutFeedback,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {registerInit} from '../register/redux';
import Jump from '../../utils/jump';

class Register extends React.Component {
  state = {
    phoneNumber: '',
    password: '',
    nickName: '',
    repeatPassword: '',
  };
  componentDidMount(): void {
    // console.warn(this.props);
  }

  saveTextValue = (key, value) => {
    this.setState({
      [key]: value,
    });
  };

  registerReq = () => {
    const {nickName, phoneNumber, repeatPassword, password} = this.state;

    if (!nickName) {
      alert('用户名不能为空');
      return;
    }

    if (!/^1[3456789]\d{9}$/.test(phoneNumber)) {
      alert('手机号格式不正确');
      return;
    }

    if (repeatPassword !== password) {
      alert('两次输入的密码不一致');
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
    const {nickName, phoneNumber, repeatPassword, password} = this.state;
    return (
      <View style={styles.register}>
        <TextInput
          style={styles.ipt}
          value={nickName}
          placeholder={'请输入用户名'}
          onChangeText={e => this.saveTextValue('nickName', e)}
        />
        <TextInput
          style={styles.ipt}
          value={phoneNumber}
          keyboardType="numeric"
          maxLength={11}
          placeholder={'请输入手机号'}
          onChangeText={e => this.saveTextValue('phoneNumber', e)}
        />
        <TextInput
          style={styles.ipt}
          secureTextEntry={true}
          value={password}
          placeholder={'请输入密码'}
          onChangeText={e => this.saveTextValue('password', e)}
        />
        <TextInput
          style={styles.ipt}
          secureTextEntry={true}
          value={repeatPassword}
          placeholder={'请再次输入密码'}
          onChangeText={e => this.saveTextValue('repeatPassword', e)}
        />
        <TouchableOpacity style={styles.btn} onPress={this.registerReq}>
          <Text style={styles.white}>注册</Text>
        </TouchableOpacity>
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

  ipt: {
    marginVertical: 10,
    // flex: 1,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
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
});

export default connect(
  state => state.register,
  dispatch => bindActionCreators({registerInit}, dispatch),
)(Register);
