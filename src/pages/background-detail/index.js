import React from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import {Item} from './page-components/';
export default class RepositoryDetail extends React.Component {
  state = {
    list: [
      {
        title: '考试资源',
        content: '考试资源描述',
      },
      {
        title: '考试资源',
        content: '考试资源描述',
      },
      {
        title: '考试资源',
        content: '考试资源描述',
      },
    ],
  };

  render() {
    const {list} = this.state;
    return (
      <ScrollView style={styles.repositoryDetail}>
        <Item />
        {list.map((v, i) => (
          <View keys={i} style={styles.panel}>
            <View style={styles.header}>
              <Text style={styles.title}>{v.title}</Text>
            </View>
            <View style={styles.content}>
              <Text style={styles.desc}>{v.content}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  repositoryDetail: {
    // paddingTop: Platform.OS && 30,
  },
  panel: {
    marginTop: 15,
    marginHorizontal: 15,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  header: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f7f7f7',
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
  },
  content: {
    padding: 15,
    minHeight: 200,
  },
  desc: {
    fontSize: 16,
  },
});
