import React from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  Text,
  StyleSheet,
} from 'react-native';
import {Item} from './page-components/';
import {ListFooter, Empty} from '../../components';
import {getCaseListReq} from './api';

export default class Content extends React.Component {
  currIndex = 1;
  state = {
    res: {},
    refreshLoading: false,
  };

  getDate = async () => {
    this.setState({
      refreshLoading: true,
    });
    this.getListData();
  };

  getMore = async params => {
    const {total, data, nextPage} = params;
    if (total > data.length) {
      this.currIndex = nextPage;
      const {degreeId, universityId} = this.props;
      const moreRes = await getCaseListReq({
        degreeId,
        universityId,
        pageNumber: this.currIndex,
        pageSize: 10,
      });
      moreRes.data.unshift(...data);
      this.setState({res: moreRes});
    }
  };

  componentDidMount(): void {
    this.getListData();
  }

  getListData = async () => {
    const {degreeId, universityId} = this.props;
    const res = await getCaseListReq({
      degreeId,
      universityId,
      pageNumber: 1,
      pageSize: 10,
      refreshLoading: false,
    });
    this.setState({res});
  };

  componentWillUnmount(): void {
    console.log('un');
  }

  render() {
    const {navigation} = this.props;
    const {res, refreshLoading} = this.state;
    console.log(res);
    if (!res.data) {
      return <ActivityIndicator style={{marginTop: 30}} />;
    }
    const {data, nextPage, total} = res;
    return (
      <FlatList
        data={data}
        styles={styles.list}
        renderItem={({item}, index) => (
          <Item
            key={index}
            keys={index}
            navigation={navigation}
            styles={styles.item}
            {...item}
          />
        )}
        ListEmptyComponent={<Empty />}
        refreshControl={
          <RefreshControl
            title={'loading'}
            refreshing={refreshLoading}
            onRefresh={this.getDate}
          />
        }
        onEndReachedThreshold={0.03}
        ListFooterComponent={<ListFooter total={total} data={data} />}
        onEndReached={() => this.getMore(res)}
      />
    );
  }
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
});
