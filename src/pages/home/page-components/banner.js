import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import Swiper from 'react-native-swiper';

export default class Banner extends React.Component {
  render() {
    return (
      <View style={styles.banner}>
        <Swiper style={styles.wrapper}>
          <View style={styles.slide1}>
            <Image style={styles.item} source={require('./one.jpeg')} />
          </View>
          <View style={styles.slide2}>
            <Image style={styles.item} source={require('./two.jpg')} />
          </View>
          <View style={styles.slide3}>
            <Image style={styles.item} source={require('./three.jpg')} />
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
    marginTop: -90,
  },
  wrapper: {
    height: 300,
  },
  item: {
    width: '100%',
    height: 300
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
});
