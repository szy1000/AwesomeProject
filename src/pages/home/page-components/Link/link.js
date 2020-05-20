import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

export default class Link extends React.Component {
  render() {
    return (
      <View style={styles.link}>
        <View style={styles.schoolAndProject}>
          <Image
            accessibilityRole={'image'}
            source={require('./zyk.png')}
            style={styles.linkItem}
          />
          <View style={styles.holder} />
          <Image
            accessibilityRole={'image'}
            source={require('./yxk.png')}
            style={styles.linkItem}
          />
        </View>
        <View style={styles.block}>
          <View style={styles.item}>
            <Image style={styles.icon} source={require('./bgts.png')} />
            <Text style={styles.txt}>背景提升</Text>
          </View>
          <View style={styles.item}>
            <Image style={styles.icon} source={require('./sqxm.png')} />
            <Text style={styles.txt}>背景提升</Text>
          </View>
          <View style={styles.item}>
            <Image style={styles.icon} source={require('./qqal.png')} />
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
    paddingHorizontal: 15,
    paddingBottom: 15,
    display: 'flex',
    flexDirection: 'row',
  },
  item: {
    flex: 1,
    alignItems: 'center',
  },
  icon: {
    width: 110,
    height: 83,
  },
  txt: {
    marginTop: 5,
    textAlign: 'center',
  },
});
