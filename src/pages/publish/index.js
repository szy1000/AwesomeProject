import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {publishInit} from './redux';

import {WhiteSpace, Empty} from '../../components';
import Item from './item';
import Jump from '../../utils/jump';

class Publish extends React.Component {
  state = {
    dataArr: [1, 2, 3, 4, 5],
    refreshLoading: false,
    loading: false,
  };

  componentDidMount(): void {
    this.pageInit();
  }

  pageInit = callback => {
    this.props.publishInit(
      {
        pageSize: 10,
        pageNumber: 1,
      },
      callback,
    );
  };

  getDate = () => {
    this.setState({
      refreshLoading: true,
    });
    this.pageInit(() => {
      this.setState({
        dataArr: [5, 4, 3, 2, 1],
        refreshLoading: false,
      });
    });
  };

  getMore = () => {
    // this.setState({
    //   loading: true,
    // });
    // setTimeout(() => {
    //   this.setState({
    //     dataArr: [...this.state.dataArr, 8, 9, 10],
    //     loading: false,
    //   });
    // }, 2000);
  };

  _onPressItem = item => {
    alert(item);
  };

  render() {
    const {refreshLoading, loading} = this.state;
    const {init, data, navigation} = this.props;
    if (!init) {
      return <ActivityIndicator />;
    }
    const {publish} = data;
    return (
      <>
        {publish.data.length > 0 ? (
          <View style={styles.concern}>
            <FlatList
              data={publish.data}
              renderItem={({item, index}) => <Item {...item} />}
              ItemSeparatorComponent={({highlighted}) => (
                <WhiteSpace size="big" />
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
        ) : (
          <Empty />
        )}
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
      </>
    );
  }
}

export default connect(
  state => state.publish,
  dispatch => bindActionCreators({publishInit}, dispatch),
)(Publish);

const styles = StyleSheet.create({
  concern: {
    position: 'relative',
    paddingBottom: 15,
    backgroundColor: '#fff',
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
