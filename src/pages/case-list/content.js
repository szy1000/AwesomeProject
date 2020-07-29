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
export default class Content extends React.Component {
  state = {
    keys: '',
    dataArr: [1, 2, 3],
    refreshLoading: false,
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
  componentDidMount(): void {
    console.log('content', this.props);
  }

  render() {
    const {navigation} = this.props;
    console.log(this.props);
    const {loading, dataArr, refreshLoading} = this.state;
    return (
      <FlatList
        data={dataArr}
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
        refreshControl={
          <RefreshControl
            title={'loading'}
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
        // onEndReached={this.getMore}
      />
    );
  }
}

const styles = StyleSheet.create({
  list: {},
});
