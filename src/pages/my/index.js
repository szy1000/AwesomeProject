/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  Button,
  Text,
  View,
  ScrollView,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import {Link} from '@react-navigation/native';

export default class My extends React.Component {
  render() {
    const {navigation} = this.props;
    return (
      <ScrollView>
        <View style={styles.login}>
          <View style={styles.loginWrapper}>
            <ImageBackground
              accessibilityRole={'image'}
              source={require('./logo.jpeg')}
              style={styles.avatar}
            />
            <View>
              <Text style={styles.link}>
                <Link to="/login">登录</Link>
                <Text>/</Text>
                <Link to="/register">注册</Link>
              </Text>
              <Text style={styles.text}>一键登录，享受更多精彩信息！</Text>
            </View>
          </View>
        </View>
        <Button
          title={'Go Back'}
          onPress={() => {
            navigation.navigate('Home');
          }}>
          返回
        </Button>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  login: {
    paddingTop: 110,
    paddingBottom: 30,
    paddingHorizontal: 30,
    height: 400,
    backgroundColor: '#17a5e1',
  },
  loginWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    marginRight: 15,
    width: 80,
    height: 80,
    overflow: 'hidden',
    resizeMode: 'cover',
    borderRadius: 40,
  },
  link: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
  },
  text: {
    marginTop: 10,
    color: '#fff',
    fontSize: 12,
  },
});
