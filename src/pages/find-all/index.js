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
import {findAllInit} from './redux';

import Jump from '../../utils/jump';
import Video from 'react-native-video';

class FindAll extends React.Component {
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

    this.props.findAllInit(
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
    this.props.findAllInit(
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
    this.didFocusListener = this.props.navigation.addListener('focus', () => {
      this.props.findAllInit({
        pageSize: this.pageSize,
        pageNum: this.currIndex,
        init: true,
      });
      console.log('find did focus');
    });
  }

  componentWillUnmount() {
    this.didFocusListener.removeEventListener &&
      this.didFocusListener.removeEventListener();
  }

  render() {
    const {refreshLoading, loading} = this.state;
    const {init, data, navigation} = this.props;
    if (!init) {
      return <ActivityIndicator style={{marginTop: 30}} />;
    }
    const {note} = data;
    console.log(note);
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
                  {item.pinned && (
                    <Image
                      style={styles.pinned}
                      source={require('./pinned.png')}
                    />
                  )}
                  {item.thumbnail.indexOf('mp4') > -1 ? (
                    <Video
                      paused={true}
                      poster={'http://47.114.151.211/logo.png'}
                      resizeMode="contain"
                      style={{
                        height: 150,
                        width: '100%',
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10,
                        // overflow: 'hidden',
                      }}
                      source={
                        item.thumbnail
                          ? {uri: item.thumbnail}
                          : require('../../assets/images/logo.jpeg')
                      }
                    />
                  ) : (
                    <Image
                      style={styles.pic}
                      source={
                        item.thumbnail
                          ? {uri: item.thumbnail}
                          : require('../../assets/images/logo.jpeg')
                      }
                    />
                  )}
                  <Text style={styles.title} numberOfLines={1}>
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
                      source={require('./zan.png')}
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
    borderRadius: 15,
  },
  name: {
    marginLeft: 10,
    color: '#666666',
  },
  pinned: {
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 10,
    width: 48,
    height: 48,
    resizeMode: 'cover',
  },
  icon: {
    width: 20,
    height: 20,
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
  state => state.findAll,
  dispatch => bindActionCreators({findAllInit}, dispatch),
)(FindAll);
