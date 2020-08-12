import React, {Fragment} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import {ListFooter} from '../../components';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {findFocusInit} from './redux';

import Jump from '../../utils/jump';

class FindFocus extends React.Component {
  pageSize = 8;
  currIndex = 1;
  state = {
    refreshLoading: false,
    loading: false,
  };

  getDate = () => {
    this.setState({
      refreshLoading: true,
    });

    this.props.findFocusInit(
      {
        pageSize: 8,
        pageNumber: 1,
        refresh: true,
      },
      () => {
        this.setState({
          refreshLoading: false,
        });
      },
    );
  };

  getMore = pageNum => {
    if (pageNum <= this.currIndex) {
      // alert('暂无更多数据');
      return;
    }
    this.currIndex = pageNum;
    this.setState({
      loading: true,
    });
    this.props.findFocusInit(
      {
        pageSize: this.pageSize,
        pageNumber: this.currIndex,
      },
      () => {
        this.setState({
          refreshLoading: false,
        });
      },
    );
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

  componentDidMount() {
    this.props.findFocusInit({
      pageSize: this.pageSize,
      pageNum: this.currIndex,
    });
  }

  render() {
    const {refreshLoading, loading} = this.state;
    const {init, data, navigation} = this.props;
    if (!init) {
      return <ActivityIndicator style={{marginTop: 30}} />;
    }
    const {note} = data;
    return (
      <View style={styles.find}>
        <FlatList
          style={{flex: 1}}
          data={note.data}
          numColumns={2}
          onEndReachedThreshold={0.003}
          renderItem={({item, index}) => (
            <View style={styles.item} key={index} keys={index}>
              <TouchableWithoutFeedback
                onPress={() => {
                  this._onPressItem(item.id);
                }}>
                <View>
                  <Image
                    style={styles.pic}
                    source={
                      item.thumbnail
                        ? {uri: item.thumbnail}
                        : require('../../assets/images/logo.jpeg')
                    }
                  />
                  <Text style={styles.title} numberOfLines={2}>
                    {item.title}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback>
                <View style={styles.auth}>
                  <View style={styles.auth}>
                    <Image
                      style={styles.avatar}
                      source={
                        item.user.avatarUrl
                          ? {uri: item.user.avatarUrl}
                          : require('../../assets/images/logo.jpeg')
                      }
                    />
                    <Text style={styles.name}>{item.user.userName}</Text>
                  </View>
                  <View style={styles.auth}>
                    <Image
                      style={styles.icon}
                      source={require('./collect.png')}
                    />
                    <Text style={styles.count}>{item.stars}</Text>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </View>
          )}
          ItemSeparatorComponent={({highlighted}) => (
            <View style={[styles.separator, highlighted && {marginLeft: 0}]} />
          )}
          refreshControl={
            <RefreshControl
              title="加载中"
              // tintColor={'orange'}
              // titleColor={'red'}
              refreshing={refreshLoading}
              onRefresh={this.getDate}
            />
          }
          ListFooterComponent={
            <ListFooter data={note.data} total={note.total} />
          }
          onEndReached={() => {
            this.getMore(note.nextPage);
          }}
        />

        <TouchableWithoutFeedback
          onPress={() => {
            Jump.linkToPage({
              navigation,
              url: 'Note',
            });
          }}>
          <View style={styles.note}>
            <Image style={styles.edit} source={require('./edit.png')} />
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  find: {
    position: 'relative',
    paddingHorizontal: 7,
    flex: 1,
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
    marginTop: 15,
    paddingHorizontal: 8,
    width: '50%',
    height: 200,
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

export default connect(
  state => state.findFocus,
  dispatch => bindActionCreators({findFocusInit}, dispatch),
)(FindFocus);
