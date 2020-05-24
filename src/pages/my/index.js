import React from 'react';
import {
  Text,
  View,
  ScrollView,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import {Link} from '@react-navigation/native';
import {Statistics, Item} from './page-components';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default class My extends React.Component {
  render() {
    const {navigation} = this.props;
    // navigation.setOption({title: '我的'});
    return (
      <ScrollView>
        <View style={styles.login}>
          <View style={styles.loginWrapper}>
            <ImageBackground
              accessibilityRole={'image'}
              source={require('./logo.jpeg')}
              style={styles.avatar}
            />
            <View style={{flex: 1}}>
              <Text style={styles.link}>
                <Link to="/Login">登录</Link>
                <Text>/</Text>
                <Link to="/Register">注册</Link>
              </Text>
              <Text style={styles.text}>一键登录，享受更多精彩信息！</Text>
            </View>
            <AntDesign
              name="right"
              color="#fff"
              style={{fontWeight: '100'}}
              size={40}
            />
          </View>
          <Statistics />
        </View>
        <Item {...this.props} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  login: {
    paddingTop: 110,
    // height: 400,
    backgroundColor: '#17a5e1',
  },
  loginWrapper: {
    paddingHorizontal: 20,
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
