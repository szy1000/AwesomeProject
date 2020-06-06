import React from 'react';
import {View, Platform, Image, StyleSheet} from 'react-native';
import Swiper from 'react-native-swiper';

export default class Banner extends React.Component {
  render() {
    return (
      <View style={styles.banner}>
        <Swiper style={styles.wrapper}>
          <View style={styles.slide}>
            <Image style={styles.item} source={require('./banner1.png')} />
          </View>
          <View style={styles.slide}>
            <Image style={styles.item} source={require('./banner2.png')} />
          </View>
        </Swiper>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  banner: {
    position: 'relative',
    zIndex: -1,
    marginTop: Platform.OS === 'ios' ? -84 : -120,
  },
  wrapper: {
    paddingTop: Platform.OS === 'ios' ? 50 : 60,
    height: 300,
    // backgroundColor: 'red',
    backgroundColor: '#e6fffe',

  },
  item: {
    width: '100%',
    height: 260,
    resizeMode: 'contain',
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
