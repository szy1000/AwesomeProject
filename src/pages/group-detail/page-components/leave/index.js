import React from 'react';
import {Text, Image, View, StyleSheet} from 'react-native';
export default class Leave extends React.Component {
  componentDidMount() {
    // const {
    //   route:
    // } = this.props;
    // console.log(params);
  }

  render() {
    return (
      <View style={styles.leave}>
        <Image style={styles.avatar} source={require('./avatar.png')} />
        <View style={styles.content}>
          <View style={styles.info}>
            <Text style={styles.name}>城北以南</Text>
            <Text style={styles.date}>3-16更新</Text>
          </View>
          <Text style={styles.desc}>
            讨论详情界面读取讨论标题、讨论发布人、发布日期、发布内容; 讨论详情界面读取讨论标题、讨论发布人、发布日期、发布内容;
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  leave: {
    padding: 15,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#f7f7f7',
  },
  info: {
    // marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    height: 30,
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    resizeMode: 'contain',
    overflow: 'hidden',
  },
  content: {
    marginLeft: 15,
  },
  name: {
    marginRight: 15,
    color: '#111',
    fontSize: 16,
    fontWeight: '500',
    textAlignVertical: 'top',
  },
  date: {
    marginTop: 5,
    color: '#aaa',
  },

  desc: {
    marginTop: 10,
    paddingRight: 20,
    // marginVertical: 0,
    lineHeight: 24,
  },
});
