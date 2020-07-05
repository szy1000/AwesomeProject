import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import Swiper from 'react-native-swiper';

export default class Index extends React.Component {
  render() {
    return (
      <View style={styles.banner}>
        <Swiper style={styles.wrapper}>
          {this.props.files.length > 0 &&
            this.props.files.map(item => (
              <View style={styles.slide} key={item}>
                <Image style={styles.item} source={{uri: item}} />
              </View>
            ))}
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
    // paddingTop: 48,
    backgroundColor: '#e6fffe',
    height: 150,
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
