import React from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  Text,
  StyleSheet,
} from 'react-native';
import {SearchInput} from '../../components';
import Item from './Item/item';
export default class Repository extends React.Component {
  state = {
    keys: 'ss',
    dataArr: [1, 2, 3, 4, 5],
    refreshLoading: false,
    loading: false,
  };

  onChangeText = e => {
    this.setState({
      keys: e,
    });
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
  render() {
    const {keys, dataArr, refreshLoading, loading} = this.state;
    return (
      <View style={styles.repository}>
        <View style={styles.select}>
          <SearchInput
            styles={styles.ipt}
            value={keys}
            onChangeText={e => this.onChangeText(e)}
          />
          <View>
            <Text>sss</Text>
          </View>
        </View>

        <View style={styles.list}>
          <FlatList
            data={dataArr}
            styles={styles.list}
            renderItem={({item, index}) => (
              <Item keys={index} styles={styles.item} {...item} />
            )}
            // ItemSeparatorComponent={({highlighted}) => (
            //   <WhiteSpace size={'big'} />
            // )}
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  repository: {},
  select: {
    paddingTop: 10,
    backgroundColor: '#fff',
  },
  ipt: {
    marginHorizontal: 20,
  },

  list: {
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: '#f7f7f7',
  },
  item: {
    marginHorizontal: 15,
    marginBottom: 15,
  },

  activity: {
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
  },
});
