import React from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';

export default class Course extends React.Component {
  render() {
    return (
      <ScrollView
        horizontal={true} // 横向
        showsHorizontalScrollIndicator={false}
        style={styles.coursel}>
        <View style={styles.item}>
          <Text>1</Text>
        </View>
        <View style={styles.item}>
          <Text>2</Text>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  coursel: {
    marginRight: 15,
    marginLeft: 15,
    flexDirection: 'row',
    overflow: 'scroll',
  },
  item: {
    width: 300,
    height: 300,
    backgroundColor: 'red',
    marginRight: 15,
  },
  wrapper: {
    paddingTop: 48,
    backgroundColor: '#e6fffe',
    height: 300,
  },

  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
});
