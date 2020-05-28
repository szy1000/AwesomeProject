import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {WhiteSpace, Item} from '../../components';
import Jump from '../../utils/jump';

export default class Message extends React.Component {
  linkTo = url => {
    const {navigation} = this.props;
    Jump.linkToPage({
      navigation,
      url,
    });
  };

  render() {
    return (
      <View>
        <WhiteSpace size={'big'} />
        <Item more={false}>
          <Text>系统通知</Text>
          <Text>暂时没有更多消息</Text>
        </Item>
        <WhiteSpace size={'big'} />
        <View><Text>ss</Text></View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    fontSize: 20,
    // color: '#ddd',
  },
  title: {
    justifyContent: 'center',
  },
});
