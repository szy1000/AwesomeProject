import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import Jump from '../../../../utils/jump';

export default class Statistics extends React.Component {
  render() {
    const {navigation} = this.props;
    return (
      <View style={styles.statistics}>
        <TouchableOpacity
          style={styles.item}
          onPress={() => {
            Jump.linkToPage({
              navigation: navigation,
              url: 'Concern',
            });
          }}>
          <View>
            <Text style={styles.count}>10</Text>
            <Text style={styles.title}>加入</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.item}>
          <Text style={styles.count}>10</Text>
          <Text style={styles.title}>发布</Text>
        </View>
        <TouchableOpacity
          style={styles.item}
          onPress={() => {
            Jump.linkToPage({
              navigation: navigation,
              url: 'Concern',
            });
          }}>
          <View>
            <Text style={styles.count}>10</Text>
            <Text style={styles.title}>关注</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.item}>
          <Text style={styles.count}>10</Text>
          <Text style={styles.title}>收藏</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    marginTop: 10,
    color: '#fff',
    fontSize: 12,
  },

  statistics: {
    marginTop: 20,
    paddingBottom: 20,
    display: 'flex',
    flexDirection: 'row',
  },
  item: {
    width: '25%',
  },
  count: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 14,
  },
  title: {
    marginTop: 5,
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
});
