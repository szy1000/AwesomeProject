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
import {backgroundInit} from './redux';

class Background extends React.Component {
  pageSize = 8;
  currIndex = 1;

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

  componentDidMount(): void {
    this.props.backgroundInit({
      pageSize: this.pageSize,
      pageNumber: 1,
      init: true,
    });
  }

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
    this.props.backgroundInit(
      {
        pageSize: this.pageSize,
        pageNumber: 1,
        init: true,
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
      console.log('more');
      this.currIndex = nextPage;
      this.props.backgroundInit(
        {
          pageSize: this.pageSize,
          pageNumber: this.currIndex,
        },
        () =>
          this.setState({
            refreshLoading: false,
          }),
      );
    }
  };
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

    const item = currentOpen === 'country' ? countryArr : schoolArr;
    const {init, navigation, data} = this.props;
    if (!init) {
      return <ActivityIndicator style={{marginTop: 30}} />;
    }
    const {listData} = data;
    console.log(listData);

    return (
      <View style={styles.background}>
        <View style={styles.selectArea}>
          <SearchInput
            styles={styles.ipt}
            value={keys}
            onChangeText={e => this.onChangeText(e)}
          />
        </View>

        <Popover
          style={{flex: 1, paddingBottom: 20}}
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
                  分类
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
            styles={styles.list}
            renderItem={({item, id}) => (
              <Item
                key={id}
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
              <ListFooter total={listData.total} data={listData.data} />
            }
            onEndReachedThreshold={0.03}
            onEndReached={() => this.getMore(listData)}
          />
        </Popover>
      </View>
    );
  }
}

export default connect(
  state => state.background,
  dispatch => bindActionCreators({backgroundInit}, dispatch),
)(Background);

const styles = StyleSheet.create({
  background: {
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
    width: '33.33%',
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
    paddingBottom: 15,
    backgroundColor: '#f7f7f7',
  },

  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 15,
    marginTop: 15,
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
