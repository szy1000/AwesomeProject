import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import Jump from '../../../../utils/jump';

export default class Statistics extends React.Component {
  render() {
    const {navigation, userStat} = this.props;
    const {joinCount, publishCount, followCount, favoriteCount} = userStat;
    return (
      <View style={styles.statistics}>
        <TouchableOpacity
          style={styles.item}
          onPress={() => {
            Jump.linkToPage({
              navigation: navigation,
              url: 'Join',
            });
          }}>
          <View>
            <Text style={styles.count}>{joinCount}</Text>
            <Text style={styles.title}>加入</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.item}
          onPress={() => {
            Jump.linkToPage({
              navigation: navigation,
              url: 'Publish',
            });
          }}>
          <View>
            <Text style={styles.count}>{publishCount}</Text>
            <Text style={styles.title}>发布</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.item}
          onPress={() => {
            Jump.linkToPage({
              navigation: navigation,
              url: 'Concern',
            });
          }}>
          <View>
            <Text style={styles.count}>{followCount}</Text>
            <Text style={styles.title}>关注</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.item}
          onPress={() => {
            Jump.linkToPage({
              navigation: navigation,
              url: 'Collect',
            });
          }}>
          <View>
            <Text style={styles.count}>{favoriteCount}</Text>
            <Text style={styles.title}>收藏</Text>
          </View>
        </TouchableOpacity>
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
