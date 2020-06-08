import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

export default class Case extends React.Component {
  render() {
    return (
      <View style={styles.case}>
        {this.props.data.map((item, index) => (
          <View style={styles.item} key={index}>
            <Image style={styles.pic} source={require('./alfx1.png')} />
            <Text style={styles.title} numberOfLines={2}>
              专升本背景申上澳洲八大硕士，一周获得专升本背景申上澳洲八大硕士，一周获得
            </Text>
            <View style={styles.auth}>
              <View style={styles.auth}>
                <Image style={styles.avatar} source={require('./tx1.png')} />
                <Text style={styles.name}>张三</Text>
              </View>
              <View style={styles.auth}>
                <Image style={styles.icon} source={require('./collect.png')} />
                <Text style={styles.count}>20</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  case: {
    paddingHorizontal: 7,
    flexDirection: 'row',
  },
  item: {
    paddingHorizontal: 8,
    width: '50%',
  },
  pic: {
    height: 150,
    width: '100%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden',
    // resizeMode: 'contain',
  },
  title: {
    margin: 5,
    fontSize: 15,
    lineHeight: 20,
  },
  auth: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  avatar: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  name: {
    marginLeft: 10,
    color: '#666666',
  },
  icon: {
    width: 15,
    height: 15,
  },
  count: {
    marginLeft: 5,
    fontSize: 15,
  },
});
