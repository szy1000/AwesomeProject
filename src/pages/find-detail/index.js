import React from 'react';
import {
  View,
  ScrollView,
  Platform,
  Image,
  SafeAreaView,
  Text,
  StyleSheet,
} from 'react-native';
import {Header, Banner, Comment} from './page-components';

export default class FindDetail extends React.Component {
  render() {
    return (
      <View style={styles.findDetail}>
        <SafeAreaView style={{flex: 1}}>
          <Header />
          <ScrollView style={{flex: 1}}>
            <Banner />
            <View>
              <Text>
                呈现已关注人员发布的笔记，可对笔记执行关注、点赞、收藏等操作。点
                击笔记内容可查看详情，在详情页面可对笔记发表评论。如下图:
              </Text>
              <Text>
                呈现已关注人员发布的笔记，可对笔记执行关注、点赞、收藏等操作。点
                击笔记内容可查看详情，在详情页面可对笔记发表评论。如下图:
              </Text>
              <Text>
                呈现已关注人员发布的笔记，可对笔记执行关注、点赞、收藏等操作。点
                击笔记内容可查看详情，在详情页面可对笔记发表评论。如下图:
              </Text>
              <Text>
                呈现已关注人员发布的笔记，可对笔记执行关注、点赞、收藏等操作。点
                击笔记内容可查看详情，在详情页面可对笔记发表评论。如下图:
              </Text>
              <Text>
                呈现已关注人员发布的笔记，可对笔记执行关注、点赞、收藏等操作。点
                击笔记内容可查看详情，在详情页面可对笔记发表评论。如下图:
              </Text>
              <Text>
                呈现已关注人员发布的笔记，可对笔记执行关注、点赞、收藏等操作。点
                击笔记内容可查看详情，在详情页面可对笔记发表评论。如下图:
              </Text>
              <Text>
                呈现已关注人员发布的笔记，可对笔记执行关注、点赞、收藏等操作。点
                击笔记内容可查看详情，在详情页面可对笔记发表评论。如下图:
              </Text>
              <Text>
                呈现已关注人员发布的笔记，可对笔记执行关注、点赞、收藏等操作。点
                击笔记内容可查看详情，在详情页面可对笔记发表评论。如下图:
              </Text>
            </View>
          </ScrollView>
          <View style={styles.control}>
            <Comment />
          </View>
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  findDetail: {
    position: 'relative',
    paddingTop: Platform.OS === 'ios' ? 45 : 0,
    flex: 1,
    backgroundColor: '#fff',
  },
  control: {
    // position: 'absolute',
    // bottom: 0,
  },
});
