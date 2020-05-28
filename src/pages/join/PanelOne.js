import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from 'react-native';
import Jump from '../../utils/jump';

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

  _onPressItem = id => {
    const {navigation} = this.props;

    Jump.linkToPage({
      navigation,
      url: 'FindDetail',
      params: {
        id,
      },
    });
  };

  render() {
    const {dataArr, refreshLoading, loading} = this.state;
    const {navigation} = this.props;
    return (
      <View style={styles.find}>
        <FlatList
          data={dataArr}
          numColumns={2}
          // style={styles.find}
          renderItem={({item, index}) => (
            <TouchableOpacity
              style={styles.item}
              key={index}
              onPress={() => {
                this._onPressItem(item);
              }}>
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
                  <Image
                    style={styles.icon}
                    source={require('./collect.png')}
                  />
                  <Text style={styles.count}>20</Text>
                </View>
              </View>
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

        <TouchableOpacity
          style={styles.note}
          onPress={() => {
            Jump.linkToPage({
              navigation,
              url: 'Note',
            });
          }}>
          <Image style={styles.edit} source={require('./edit.png')} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  find: {
    position: 'relative',
    paddingTop: 15,
    paddingBottom: 15,
    paddingHorizontal: 7,
    flexDirection: 'row',
    flexWrap: 'wrap',
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
    paddingHorizontal: 8,
    width: '50%',
  },
  pic: {
    height: 150,
    width: '100%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden',
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
  note: {
    position: 'absolute',
    right: 10,
    bottom: 60,
  },
  edit: {
    width: 60,
    height: 60,
  },
});
