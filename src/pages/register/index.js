import React from 'react';
import {
  TextInput,
  Text,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
} from 'react-native';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {registerInit} from '../register/redux';

class Register extends React.Component {
  componentDidMount(): void {
    console.warn(this.props);
  }

  registerReq = () => {
    this.props.registerInit();
  };

  render() {
    return (
      <View style={styles.register}>
        <TextInput style={styles.ipt} placeholder={'请输入用户名'} />
        <TextInput
          style={styles.ipt}
          secureTextEntry={true}
          placeholder={'请输入密码'}
        />
        <TextInput
          style={styles.ipt}
          secureTextEntry={true}
          placeholder={'请再次输入密码'}
        />
        <TouchableWithoutFeedback onPress={this.registerReq}>
          <Text style={styles.text}>注册</Text>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  register: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: '#fff',
  },
  text: {},
});

export default connect(
  state => state.register,
  dispatch => bindActionCreators({registerInit}, dispatch),
)(Register);
// export default connect(
//   state => state.register,
//   dispatch => bindActionCreators({registerInit}, dispatch),
// )(Register);
