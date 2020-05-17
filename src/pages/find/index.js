/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {Button, Text, View, Image, StyleSheet} from 'react-native';

export default class Find extends React.Component {
  render() {
    const {navigation} = this.props;
    return (
      <View style={styles.find}>
        <View style={styles.group}>
          <View style={styles.tips}>
            <Image
              accessibilityRole={'image'}
              source={require('../my/logo.jpeg')}
              style={styles.avatar}
            />
            <View style={styles.title_wrapper}>
              <Text style={styles.title}>学习方法分享小组</Text>
              <Text style={styles.subTitle}>20167 小叮当 ></Text>
            </View>
            <Button title={'已加入'} />
          </View>
          <Text style={styles.desc}>
            小组简介：
            <Text>
              入组须知：入组须知入组须知入组须知入组须知入组须知入组须知入组须知入组须知入组须知
            </Text>
          </Text>
        </View>
        <Button
          title={'Go Back'}
          onPress={() => {
            navigation.navigate('Home');
          }}>
          返回
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  group: {
    paddingTop: 110,
    paddingBottom: 20,
    paddingHorizontal: 15,
    backgroundColor: '#ccc',
  },
  tips: {
    display: 'flex',
    flexDirection: 'row',
  },
  avatar: {
    marginRight: 15,
    width: 60,
    height: 60,
    borderRadius: 5,
    borderWidth: 3,
    borderColor: '#ddd',
    overflow: 'hidden',
  },
  title_wrapper: {
    paddingTop: 5,
    height: 60,
    display: 'flex',
  },
  title: {
    color: '#fff',
    fontSize: 18,
  },
  subTitle: {
    marginTop: 10,
    color: '#fff',
  },
  text: {
    fontSize: 20,
  },

  desc: {
    marginTop: 10,
    color: '#fff',
    // lineHeight: 20,
  },
});
