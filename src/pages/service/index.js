import React from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  StyleSheet,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import {Button} from '../../components';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {serviceInit, sendMsg} from './redux';

class Service extends React.Component {
  state = {
    value: '',
  };
  id = 0;
  time = null;
  sendMessage = () => {
    const {value} = this.state;
    if (!value) {
      alert('不能为空');
      return;
    }
    this.props.sendMsg({
      message: value,
    });
    this.setState({
      value: '',
    });
  };

  changeText = e => {
    this.setState({
      value: e,
    });
  };

  async componentDidMount(): void {
    this.id = parseInt(await AsyncStorage.getItem('sid'), 10);
    this.props.serviceInit();
    this.time = setInterval(() => this.props.serviceInit(), 6000);
  }
  componentWillUnmount(): void {
    clearInterval(this.time);
  }

  render() {
    const {value} = this.state;
    const {init, _data} = this.props;
    if (!init) {
      return <ActivityIndicator style={{marginTop: 30}} />;
    }
    const {data} = _data;
    console.log(_data);
    return (
      <SafeAreaView style={{flex: 1}}>
        <ScrollView
          onContentSizeChange={() => this.refs.scrollView.scrollToEnd()}
          ref="scrollView">
          <View style={styles.main}>
            {data.map(({message, user: {id, avatarUrl}}, i) => {
              if (id === this.id) {
                return (
                  <View style={[styles.msgRight]}>
                    <View style={styles.contentRight}>
                      <View style={styles.arrowRight} />
                      <Text style={styles.txt}>{message}</Text>
                    </View>
                    <Image
                      style={styles.avatar}
                      source={
                        avatarUrl
                          ? {uri: avatarUrl}
                          : require('../../assets/images/logo.jpeg')
                      }
                    />
                  </View>
                );
              } else {
                return (
                  <View style={[styles.msg]}>
                    <Image
                      style={styles.avatar}
                      source={
                        avatarUrl
                          ? {uri: avatarUrl}
                          : require('../../assets/images/logo.jpeg')
                      }
                    />
                    <View style={styles.content}>
                      <View style={styles.arrowLeft} />
                      <Text style={styles.txt}>{message}</Text>
                    </View>
                  </View>
                );
              }
            })}
          </View>
        </ScrollView>
        <View style={styles.wrapper}>
          <TextInput
            style={styles.ipt}
            value={value}
            onChangeText={e => this.changeText(e)}
            returnKeyLabel="send"
            returnKeyType="send"
            onSubmitEditing={this.sendMessage}
            placeholder={'请输入你想咨询的问题'}
          />
          <Button onClick={this.sendMessage}>发送</Button>
        </View>
      </SafeAreaView>
    );
  }
}

export default connect(
  state => state.service,
  dispatch => bindActionCreators({serviceInit, sendMsg}, dispatch),
)(Service);

const styles = StyleSheet.create({
  main: {
    paddingHorizontal: 5,
  },

  msg: {
    flex: 1,
    paddingHorizontal: 5,
    paddingVertical: 15,
    flexDirection: 'row',
  },

  msgRight: {
    flex: 1,
    paddingHorizontal: 5,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  arrowLeft: {
    position: 'absolute',
    left: -20,
    top: 10,
    borderWidth: 10,
    borderLeftColor: 'transparent',
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderRightColor: '#fff',
  },
  arrowRight: {
    position: 'absolute',
    right: -20,
    top: 10,
    borderWidth: 10,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderRightColor: 'transparent',
    borderLeftColor: '#fff',
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 23,
    overflow: 'hidden',
    resizeMode: 'cover',
  },

  content: {
    position: 'relative',
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginLeft: 15,
    maxWidth: '70%',
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  contentRight: {
    marginRight: 15,
    position: 'relative',
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginLeft: 15,
    maxWidth: '70%',
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  txt: {
    lineHeight: 20,
    fontSize: 16,
  },

  wrapper: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  ipt: {
    marginRight: 15,
    paddingHorizontal: 15,
    paddingVertical: 5,
    flex: 1,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
  },
});
