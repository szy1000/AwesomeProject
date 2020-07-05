import React from 'react';
import {Image, View, StyleSheet} from 'react-native';

export default class Loading extends React.Component {
  render() {
    return (
      <View style={styles.loading}>
        <Image source={require('./assets/loading.gif')} style={styles.img} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loading: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 120,
  },
  img: {
    width: 50,
    height: 50,
  },
});
