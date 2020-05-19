import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';

export default class PanelOne extends React.Component {
  state = {
    dataArr: [1, 2, 3, 4, 5],
    refreshLoading: false,
    loading: false,
  };

  getDate = () => {
    this.setState({
      refreshLoading: true,
    });
    setTimeout(() => {
      this.setState({
        dataArr: [5, 4, 3, 2, 1],
        refreshLoading: false,
      });
    }, 2000);
  };

  getMore = () => {
    this.setState({
      loading: true,
    });
    setTimeout(() => {
      this.setState({
        dataArr: [...this.state.dataArr, 8, 9, 10],
        loading: false,
      });
    }, 2000);
  };

  _onPressItem = item => {
    alert(item);
  };

  render() {
    const {dataArr, refreshLoading, loading} = this.state;
    return (
      <View style={styles.findOne}>
        <FlatList
          data={dataArr}
          renderItem={({item, index}) => (
            <TouchableOpacity
              style={styles.item}
              key={index}
              onPress={() => {
                this._onPressItem(item);
              }}>
              <Text style={styles.name}>{item}</Text>
            </TouchableOpacity>
          )}
          ItemSeparatorComponent={({highlighted}) => (
            <View style={[styles.separator, highlighted && {marginLeft: 0}]} />
          )}
          refreshControl={
            <RefreshControl
              title={'loading'}
              tintColor={'orange'}
              titleColor={'red'}
              refreshing={refreshLoading}
              onRefresh={this.getDate}
            />
          }
          ListFooterComponent={
            <View style={styles.activity}>
              <ActivityIndicator animating={loading} />
              <Text style={styles.txt}>加载更多</Text>
            </View>
          }
          onEndReached={this.getMore}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  findOne: {
    paddingTop: 15,
    paddingBottom: 15,
  },
  separator: {
    height: 10,
  },
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
  item: {
    marginLeft: 15,
    marginRight: 15,
    height: 200,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
