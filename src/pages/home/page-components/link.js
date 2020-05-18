import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

export default class Link extends React.Component {
  render() {
    return (
      <View style={styles.link}>
        <View style={styles.schoolAndProject}>
          <Image
            accessibilityRole={'image'}
            source={require('./book.jpg')}
            style={styles.linkItem}
          />
          <View style={styles.holder} />
          <Image
            accessibilityRole={'image'}
            source={require('./school.jpg')}
            style={styles.linkItem}
          />
        </View>
        <View style={styles.block}>
          <View style={styles.item}>
            <View style={styles.icon} />
            <Text style={styles.txt}>背景提升</Text>
          </View>
          <View style={styles.item}>
            <View style={styles.icon} />
            <Text style={styles.txt}>背景提升</Text>
          </View>
          <View style={styles.item}>
            <View style={styles.icon} />
            <Text style={styles.txt}>背景提升</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  link: {
    paddingTop: 20,
  },
  schoolAndProject: {
    paddingHorizontal: 15,
    display: 'flex',
    flexDirection: 'row',
  },
  holder: {
    width: 15,
  },
  linkItem: {
    width: '48%',
    height: 100,
    borderRadius: 5,
  },

  block: {
    marginTop: 20,
    paddingBottom: 15,
    display: 'flex',
    flexDirection: 'row',
  },
  item: {
    flex: 1,
    alignItems: 'center',
  },
  icon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'blue',
  },
  txt: {
    marginTop: 5,
    textAlign: 'center',
  },
});
