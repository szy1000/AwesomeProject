import React from 'react';
import {Button, Text, View, TextInput, StyleSheet} from 'react-native';

export default class Login extends React.Component {
  render() {
    const {navigation} = this.props;
    return (
      <View>
        <Text style={styles.text}>Welcome To Page login</Text>
        <TextInput
          style={{
            width: 200,
            height: 40,
          }}
          placeholder="请输入用户"
          onChangeText={text => {
            navigation.setParams({
              iTitle: text,
            });
          }}
        />
        <TextInput
          style={{
            width: 200,
            height: 40,
          }}
          placeholder="请输入密码"
          onChangeText={text => {
            navigation.setParams({
              iTitle: text,
            });
          }}
        />

        <Button title="登录" onPress={() => console.log(1)} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    // color: '#ddd',
  },
});
