import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import Swiper from 'react-native-swiper';

export default class Index extends React.Component {
  render() {
    const {imageUrl = []} = this.props;
    console.log(imageUrl);
    return (
      <View style={styles.banner}>
        <Swiper style={styles.wrapper}>
          {imageUrl &&
            imageUrl.map((v, k) => (
              <View style={styles.slide} key={k}>
                <Image
                  style={styles.item}
                  source={
                    v
                      ? {uri: v}
                      : require('../../../../assets/images/logo.jpeg')
                  }
                />
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
    // zIndex: -1,
    marginTop: -90,
    height: 300,
    backgroundColor: '#ccc',
  },
  wrapper: {
    paddingTop: 50,
    backgroundColor: '#e6fffe',
    height: 300,
  },
  item: {
    width: '100%',
    height: 300,
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
