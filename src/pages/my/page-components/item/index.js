import React from 'react';
import {
  Text,
  Image,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import Jump from '../../../../utils/jump';

export default class Item extends React.Component {
  itemArr = [
    {
      icon: require('./pic33.png'),
      title: '客服中心',
      clickFn: () => {
        const {navigation} = this.props;
        Jump.linkToPage({
          navigation: navigation,
          url: 'Service',
        });
      },
    },
    // {
    //   icon: require('./pic34.png'),
    //   title: '帮助中心',
    //   clickFn: () => {
    //     const {navigation} = this.props;
    //     Jump.linkToPage({
    //       navigation: navigation,
    //       url: 'Concern',
    //     });
    //   },
    // },
    {
      icon: require('./pic35.png'),
      title: '意见反馈',
      clickFn: () => {
        const {navigation} = this.props;
        Jump.linkToPage({
          navigation: navigation,
          url: 'Feedback',
        });
      },
    },
    {
      icon: require('./pic36.png'),
      title: '关于我们',
      clickFn: () => {
        const {navigation} = this.props;
        Jump.linkToPage({
          navigation: navigation,
          url: 'About',
        });
      },
    },
    {
      icon: require('./pic37.png'),
      title: '系统设置',
      clickFn: () => {
        const {navigation} = this.props;
        Jump.linkToPage({
          navigation: navigation,
          url: 'Setting',
        });
      },
    },
    {
      icon: require('./pic38.png'),
      title: '退出登录',
      clickFn: () => {
        if (!this.props.isLogin) {
          Alert.alert(
            '操作提示',
            '当前无登录用户。请点击登录按钮，前往登录！',
            [
              {
                text: '确定',
                onPress: async () => {},
              },
            ],
          );
          // alert(this.props.isLogin);
          return;
        }
        Alert.alert('操作提示', '请问您确定退出吗？', [
          {
            text: '取消',
            onPress: async () => {},
          },
          {
            text: '确认',
            onPress: async () => {
              await AsyncStorage.clear();
              const {navigation} = this.props;
              Jump.resetToHome({
                navigation: navigation,
              });
            },
          },
        ]);
      },
    },
  ];

  render() {
    // if (!this.props.isLogin) {
    //   this.itemArr.length = 4;
    // }

    // console.log('item', );
    return (
      <View>
        {this.itemArr.map(({icon, title, clickFn}, index) => (
          <View key={index}>
            <TouchableOpacity style={styles.item} onPress={clickFn}>
              <View style={styles.link}>
                <View>
                  <Image style={styles.icon} source={icon} />
                </View>
                <View style={styles.title}>
                  <Text style={styles.content}>{title}</Text>
                </View>
                <View>
                  <Image style={styles.more} source={require('./more.png')} />
                </View>
              </View>
            </TouchableOpacity>
            {index === 2 && <View style={styles.separate} />}
          </View>
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  link: {
    paddingTop: 20,
    paddingBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: '#eaeaea',
    borderBottomWidth: 1,
  },
  icon: {
    marginRight: 10,
    width: 14,
    height: 14,
  },

  title: {
    flex: 1,
    flexDirection: 'row',
  },
  content: {
    fontSize: 16,
  },
  more: {
    width: 10,
    height: 18,
  },
  separate: {
    height: 5,
    backgroundColor: '#f0f0f0',
  },
});
