import React from 'react';
import {
  Text,
  Platform,
  ImageBackground,
  View,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';

export default class GroupTitle extends React.Component {
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
            source={require('../../../my/logo.jpeg')}
            style={styles.avatar}
          />
          <View style={styles.title_wrapper}>
            <Text style={styles.title}>学习方法分享小组</Text>
            <Text style={styles.subTitle}>20167 小叮当 ></Text>
          </View>
          <TouchableWithoutFeedback>
            <View style={styles.btn}>
              <Text style={styles.txt}>已加入</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <Text style={styles.desc}>
          小组简介：
          <Text numberOfLines={2}>
            入组须知：入组须知入组须知入组须知入组须知入组须知入组须知入组须知入组须知入组须知
          </Text>
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  group: {
    paddingTop: Platform.OS == 'ios' ? 110 : 60,
    paddingBottom: 20,
    paddingHorizontal: 15,
    backgroundColor: '#ccc',
  },
  bg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 240,
    resizeMode: 'contain',
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
    resizeMode: 'contain',
  },
  title_wrapper: {
    paddingTop: 5,
    height: 60,
    display: 'flex',
    flex: 1,
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

  btn: {
    width: 58,
    height: 26,
    color: '#14a4c8',
    backgroundColor: '#e7f6fa',
    borderWidth: 1,
    borderColor: '#14a4c8',
    borderRadius: 4,
    alignItems: 'center',
  },
  txt: {
    color: '#14a4c8',
    lineHeight: 26,
    textAlign: 'center',
  },
});
