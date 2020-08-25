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

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {collectInit} from './redux';

import {WhiteSpace, ListFooter} from '../../components';
import Item from './item';

class Collect extends React.Component {
  state = {
    refreshLoading: false,
  };

  getDate = () => {
    this.setState({
      refreshLoading: true,
    });
    this.props.collectInit(
      {
        pageNumber: 1,
        pageSize: 8,
      },
      () =>
        this.setState({
          refreshLoading: false,
        }),
    );
  };

  getMore = list => {
    const {total, data, nextPage} = list;
    if (total > data.length) {
      this.currIndex = nextPage;
      this.props.collectInit({
        pageSize: this.pageSize,
        pageNumber: this.currIndex,
      });
    }
  };

  _onPressItem = item => {
    alert(item);
  };
  componentDidMount(): void {
    this.props.collectInit({
      pageNumber: 1,
      pageSize: 500,
    });
  }

  render() {
    const {refreshLoading} = this.state;
    const {init, data, navigation} = this.props;
    if (!init) {
      return <ActivityIndicator style={{marginTop: 30}} />;
    }
    const {listData} = data;
    console.log(listData);
    return (
      <View style={styles.concern}>
        <FlatList
          data={listData.data}
          renderItem={({item, index}) => (
            <Item {...item} navigation={navigation} />
          )}
          ItemSeparatorComponent={({highlighted}) => <WhiteSpace size="big" />}
          refreshControl={
            <RefreshControl
              title={'loading'}
              refreshing={refreshLoading}
              onRefresh={this.getDate}
            />
          }
          ListFooterComponent={
            <ListFooter total={listData.total} data={listData.data} />
          }
          onEndReachedThreshold={0.03}
          onEndReached={() => this.getMore(listData)}
        />
      </View>
    );
  }
}

export default connect(
  state => state.collect,
  dispatch => bindActionCreators({collectInit}, dispatch),
)(Collect);

const styles = StyleSheet.create({
  concern: {
    flex: 1,
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
});
