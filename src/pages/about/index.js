import React from 'react';
import {Text, Image, View, StyleSheet} from 'react-native';
import {Item, WhiteSpace} from '../../components';

export default class About extends React.Component {
  render() {
    const {navigation} = this.props;
    return (
      <View>
        <View style={styles.logo_wrapper}>
          <Image style={styles.logo} source={require('./logo.jpeg')} />
        </View>
        <Item title={'当前版本'} extra="1.0.2" more={false} />
        <WhiteSpace size="middle" />
        <Item title={'使用许可协议'} />
        <Item title={'当前版本'} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  logo_wrapper: {
    paddingVertical: 30,
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
  },
});
