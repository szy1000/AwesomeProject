import React from 'react';
import {
  Text,
  View,
  ScrollView,
  ImageBackground,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import {Link} from '@react-navigation/native';
import {Statistics, Item} from './page-components';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Jump from '../../utils/jump';
import {Loading} from '../../components/';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {myInit} from './redux';
import Tools from '../../utils/tool';

class My extends React.Component {
  async componentDidMount() {
    this.isLogin = await Tools.isLogin();
    if (this.isLogin) {
      this.userName = await AsyncStorage.getItem('name');
      const id = await AsyncStorage.getItem('sid');
      this.props.myInit(id);
    }
  }

  editInfo = () => {
    const {navigation} = this.props;
    Jump.linkToPage({
      navigation,
      url: 'EditInfo',
    });
  };
  render() {
    const {init, data, navigation} = this.props;
    // if (!init) {
    //   return <Loading />;
    // }

    const {nickName, userStat} = data;
    console.log('mydata', data);
    return (
      <ScrollView>
        <View style={styles.login}>
          {this.isLogin ? (
            <TouchableWithoutFeedback onPress={this.editInfo}>
              <View style={styles.loginWrapper}>
                <ImageBackground
                  accessibilityRole={'image'}
                  source={require('./logo.jpeg')}
                  style={styles.avatar}
                />
                <View style={{flex: 1}}>
                  <Text style={styles.link}>{this.userName}</Text>
                  {/*<Text style={styles.text}>一键登录，享受更多精彩信息！</Text>*/}
                </View>
                <AntDesign
                  name="right"
                  color="#fff"
                  style={{fontWeight: '100'}}
                  size={40}
                />
              </View>
            </TouchableWithoutFeedback>
          ) : (
            <TouchableWithoutFeedback>
              <View style={styles.loginWrapper}>
                <ImageBackground
                  accessibilityRole={'image'}
                  source={require('./logo.jpeg')}
                  style={styles.avatar}
                />
                <View style={{flex: 1}}>
                  <Text style={styles.link}>
                    <Link to="/Login">登录</Link>
                    {/*<Text>/</Text>*/}
                    {/*<Link to="/Register">注册</Link>*/}
                  </Text>
                  <Text style={styles.text}>一键登录，享受更多精彩信息！</Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
          )}
          <Statistics {...this.props} userStat={userStat} />
        </View>
        <Item {...this.props} />
      </ScrollView>
    );
  }
}

export default connect(
  state => state.my,
  dispatch => bindActionCreators({myInit}, dispatch),
)(My);

const styles = StyleSheet.create({
  login: {
    paddingTop: Platform.OS == 'ios' ? 110 : 60,
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
