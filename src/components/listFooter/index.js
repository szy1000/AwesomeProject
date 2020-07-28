import React, {Fragment} from 'react';
import {Text, View, StyleSheet, ActivityIndicator} from 'react-native';

export default class ListFooter extends React.Component {
  render() {
    const {data = [], total = 0} = this.props;
    return (
      <Fragment>
        {total > data.length ? (
          <View style={styles.activity}>
            <ActivityIndicator animating={true} />
            <Text style={styles.txt}>加载更多</Text>
          </View>
        ) : (
          <View style={styles.activity}>
            <Text style={styles.txt}>暂无更多数据了</Text>
          </View>
        )}
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  activity: {
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
  },
  txt: {
    marginLeft: 10,
    fontSize: 12,
    color: '#bbb',
  },
});
