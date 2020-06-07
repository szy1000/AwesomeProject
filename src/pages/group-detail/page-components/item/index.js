import React from 'react';
import {Text, Image, View, StyleSheet} from 'react-native';
export default class Item extends React.Component {
  componentDidMount() {
    // const {
    //   route:
    // } = this.props;
    // console.log(params);
  }

  render() {
    return (
      <View style={styles.item}>
        <Text style={styles.title}>疫情下，如何在加安心学习？</Text>
        <View style={styles.info}>
          <Image style={styles.avatar} source={require('./avatar.png')} />
          <View style={styles.content}>
            <Text style={styles.name}>城北以南</Text>
            <Text style={styles.date}>3-16更新</Text>
          </View>
        </View>
        <Text style={styles.desc}>
          讨论详情界面读取讨论标题、讨论发布人、发布日期、发布内容;
          讨论详情界面读取讨论标题、讨论发布人、发布日期、发布内容;
          对讨论可以查看全部回复、并进行回复、点赞、收藏;
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    padding: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    textAlignVertical: 'top',
  },
  info: {
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    resizeMode: 'contain',
    overflow: 'hidden',
  },
  content: {
    marginLeft: 10,
    height: 40,
    justifyContent: 'space-between',
  },
  name: {
    color: '#111',
  },
  date: {
    color: '#aaa',
  },

  desc: {
    marginVertical: 20,
    lineHeight: 20,
  },
});
