import React from 'react';
import {
  Button,
  Text,
  ImageBackground,
  View,
  Image,
  StyleSheet,
} from 'react-native';

export default class Group extends React.Component {
  componentDidMount() {
    const {
      route: {params},
    } = this.props;
    console.log(params);
  }

  render() {
    return (
      <View style={styles.group}>
        <ImageBackground style={styles.bg} source={require('./pic60.png')} />
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
  bg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 300,
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
    lineHeight: 20,
  },
});
