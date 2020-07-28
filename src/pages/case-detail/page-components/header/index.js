import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';

export default class Header extends React.Component {
  state = {};

  render() {
    const {
      name,
      image,
      graduatedUniversity,
      graduatedSubject,
      graduatedDegree,
    } = this.props;
    return (
      <View style={styles.header}>
        <Image style={styles.img} source={{uri: image}} />
        <View style={styles.txt_wrapper}>
          <Text style={styles.txt}>{name}</Text>
          <Text style={styles.txt}>毕业院校：{graduatedUniversity}</Text>
          <Text style={styles.txt}>毕业学位： {graduatedDegree}</Text>
          <Text style={styles.txt}>毕业专业： {graduatedSubject}</Text>
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
