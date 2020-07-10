import React from 'react';
import {Item, Comment, Leave} from './page-components';
import {Text, View, SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import {WhiteSpace} from '../../components';

export default class GroupDetail extends React.Component {
  componentDidMount() {
    const {
      route: {params},
    } = this.props;
    console.warn(params);
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
        <ScrollView style={styles.groupDetail}>
          <Item />
          <WhiteSpace size={'big'} />
          <Leave />
          <Leave />
          <Leave />
          <Leave />
          <Leave />
        </ScrollView>
        <Comment />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  groupDetail: {},
  comment: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    flexDirection: 'row',
    borderTopColor: '#ddd',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  ipt: {
    marginRight: 15,
    flex: 1,
    borderColor: '#f7f7f7',
    borderWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 15,
  },
});
