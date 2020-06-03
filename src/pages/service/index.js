import React from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Image,
} from 'react-native';
import {Button} from '../../components';
import Jump from '../../utils/jump';

export default class Service extends React.Component {
  state = {
    talkList: [
      {
        data: '111',
        type: 'service',
        txt: '你好有什么我可以帮助的吗？',
      },
      {
        data: '22',
        type: 'service',
        txt: '你好有什么我可以帮助的吗？',
      },
      {
        data: '22',
        type: 'customer',
        txt: '你好有什么我可以帮助的吗？',
      },
    ],
  };

  sendMessage = () => {
    const {value, talkList} = this.state;
    if (!value) {
      alert('不能为空');
      return;
    }
    talkList.push({
      data: '333',
      type: 'customer',
      txt: value,
    });
    this.setState({
      talkList,
      value: '',
    });
  };
  changeText = e => {
    this.setState({
      value: e,
    });
  };

  linkTo = url => {
    const {navigation} = this.props;
    Jump.linkToPage({
      navigation,
      url,
    });
  };

  render() {
    const {talkList, value} = this.state;
    return (
      <SafeAreaView style={{flex: 1}}>
        <ScrollView>
          <View style={styles.main}>
            {talkList.map(({txt, type}, i) => {
              if (type === 'customer') {
                return (
                  <View style={[styles.msgRight]}>
                    <View style={styles.contentRight}>
                      <View style={styles.arrowRight} />
                      <Text style={styles.txt}>{txt}</Text>
                    </View>
                    <Image
                      style={styles.avatar}
                      source={require('./tx1.png')}
                    />
                  </View>
                );
              } else {
                return (
                  <View style={[styles.msg]}>
                    <Image
                      style={styles.avatar}
                      source={require('./tx1.png')}
                    />
                    <View style={styles.content}>
                      <View style={styles.arrowLeft} />
                      <Text style={styles.txt}>{txt}</Text>
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
            placeholder={'请输入你想咨询的问题'}
          />
          <Button onClick={this.sendMessage}>发送</Button>
        </View>
      </SafeAreaView>
    );
  }
}

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
