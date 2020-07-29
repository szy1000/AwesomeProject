import React from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  TouchableWithoutFeedback,
  RefreshControl,
  Text,
  Image,
  StyleSheet,
} from 'react-native';
import {SearchInput, ListFooter, Popover} from '../../components';
import Item from './Item/item';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {caseInit} from './redux';

class Cases extends React.Component {
  state = {
    keys: '',
    currentOpen: '',
    countryArr: [
      '全球',
      '美国',
      '日本',
      '韩国',
      '法国',
      '英国',
      '泰国',
      '马来西亚',
    ],
    schoolArr: ['QS', 'USNEWS', '泰是无', '上海交大'],
    select: '',
    dataArr: [1, 2, 3, 4, 5],
    refreshLoading: false,
    loading: false,
    visible: false,
  };

  onChangeText = e => {
    this.setState({
      keys: e,
    });
  };

  toggleModal = name => {
    const {visible} = this.state;
    this.setState({
      visible: !visible,
      currentOpen: !visible && (name || ''),
    });
  };

  handleSelect = v => {
    this.setState({
      select: v,
    });
  };

  getDate = () => {
    this.setState({
      refreshLoading: true,
    });
    setTimeout(() => {
      this.setState({
        refreshLoading: false,
      });
    }, 2000);
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

  componentDidMount(): void {
    this.props.caseInit({
      pageNumber: 1,
      pageSize: 8,
      countryId: 1,
    });
  }

  render() {
    const {
      keys,

      countryArr,
      schoolArr,
      visible,
      currentOpen,
      select,

      refreshLoading,
    } = this.state;
    const {init, data, navigation} = this.props;
    if (!init) {
      return <ActivityIndicator style={{marginTop: 30}} />;
    }
    const {listData} = data;
    console.log(listData);
    const item = currentOpen === 'country' ? countryArr : schoolArr;
    return (
      <View style={styles.repository}>
        <View style={styles.selectArea}>
          <SearchInput
            styles={styles.ipt}
            value={keys}
            onChangeText={e => this.onChangeText(e)}
          />
        </View>

        <Popover
          style={{flex: 1}}
          visible={visible}
          maskClick={this.toggleModal}
          item={
            <View>
              {item.map((v, i) => (
                <TouchableWithoutFeedback
                  key={i}
                  onPress={() => this.handleSelect(v)}>
                  <View style={styles.item}>
                    <Text style={select === v && styles.active}>{v}</Text>
                    {select === v && (
                      <Image
                        style={styles.select}
                        source={require('./sel.png')}
                      />
                    )}
                  </View>
                </TouchableWithoutFeedback>
              ))}
            </View>
          }>
          <View style={styles.filter}>
            <TouchableWithoutFeedback
              // style={styles.filterItem}
              onPress={() => this.toggleModal('country')}>
              <View style={styles.filterItem}>
                <Text
                  style={[
                    styles.area,
                    currentOpen === 'country' && styles.active,
                  ]}>
                  学位
                </Text>
                <Image
                  style={styles.filterIcon}
                  source={
                    currentOpen === 'country'
                      ? require('./typerow.png')
                      : require('./typerow_pre.png')
                  }
                />
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => this.toggleModal('school')}>
              <View style={styles.filterItem}>
                <Text
                  style={[
                    styles.area,
                    currentOpen === 'school' && styles.active,
                  ]}>
                  学科
                </Text>
                <Image
                  style={styles.filterIcon}
                  source={
                    currentOpen === 'school'
                      ? require('./typerow.png')
                      : require('./typerow_pre.png')
                  }
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
          <FlatList
            style={styles.list}
            data={listData.data}
            renderItem={({item, index}) => (
              <Item
                key={index}
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
              <ListFooter data={listData.data} total={listData.total} />
            }
            onEndReachedThreshold={0.03}
            onEndReached={this.getMore}
          />
        </Popover>
      </View>
    );
  }
}

export default connect(
  state => state.cases,
  dispatch => bindActionCreators({caseInit}, dispatch),
)(Cases);

const styles = StyleSheet.create({
  repository: {
    flex: 1,
  },
  selectArea: {
    paddingTop: 10,
    backgroundColor: '#fff',
  },
  ipt: {
    marginHorizontal: 20,
  },

  filter: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    height: 40,
    alignItems: 'center',
  },
  filterItem: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
  },
  filterIcon: {
    width: 11,
    height: 6,
  },
  area: {
    marginRight: 5,
    // textAlign: 'center',
  },

  list: {
    flex: 1,
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: '#f7f7f7',
  },

  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 15,
    marginBottom: 15,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f7f7f7',
  },
  active: {
    color: '#12a8cd',
  },
  select: {
    width: 18,
    height: 12,
  },
});
