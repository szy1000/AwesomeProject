import React from 'react';
import {View, StyleSheet} from 'react-native';
import {WhiteSpace, Item} from '../../components';
import Jump from '../../utils/jump';

export default class Setting extends React.Component {
  arrMap = [
    {
      title: '检查更新',
      clickFn: () => {
        alert('当前已是最新版本');
      },
    },
    {
      title: '关于我们',
      clickFn: () => this.linkTo('About'),
    },
  ];

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
        <WhiteSpace />
        {this.arrMap.map((v, i) => (
          <Item title={v.title} clickFn={v.clickFn} />
        ))}
        <WhiteSpace size="big" />
        <Item title="退出登录" style={styles.title} more={false} />
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
