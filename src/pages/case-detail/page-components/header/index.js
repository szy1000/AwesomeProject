import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';

export default class Header extends React.Component {
  state = {};

  render() {
    return (
      <View style={styles.header}>
        <Image style={styles.img} source={require('./tx1.png')} />
        <View style={styles.txt_wrapper}>
          <Text style={styles.txt}>找同学</Text>
          <Text style={styles.txt}>毕业院校：四川农业大学</Text>
          <Text style={styles.txt}>毕业学位： 本科</Text>
          <Text style={styles.txt}>毕业专业： 创业设计</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 40,
    flexDirection: 'row',
  },
  img: {
    width: 100,
    height: 120,
    resizeMode: 'contain',
    backgroundColor: '#ccc',
  },
  txt_wrapper: {
    paddingLeft: 15,
    justifyContent: 'space-between',
  },
  txt: {
    fontSize: 16,
  },
});
