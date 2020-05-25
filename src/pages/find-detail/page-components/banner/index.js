import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import Swiper from 'react-native-swiper';

export default class Index extends React.Component {
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
    marginTop: 10,
  },
  wrapper: {
    paddingTop: 48,
    backgroundColor: '#e6fffe',
    height: 300,
  },
  item: {
    width: '100%',
    height: 200,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
});
