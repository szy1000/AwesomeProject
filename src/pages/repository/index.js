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
import {SearchInput, Popover} from '../../components';
import Item from './Item/item';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {repositoryInit} from './redux';

class Repository extends React.Component {
  state = {
    keys: '',
    currentOpen: '',
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

    this.props.repositoryInit(
      {
        pageNumber: 1,
        pageSize: 5,
      },
      () => {
        this.setState({
          refreshLoading: false,
        });
      },
    );
  };

  getMore = () => {
    console.log('end')
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
    this.props.repositoryInit({
      pageNumber: 1,
      pageSize: 6,
    });
  }

  render() {
    const {navigation, init, _data} = this.props;
    if (!init) {
      return <ActivityIndicator />;
    }
    const {rankArr, countryArr, allRepository} = _data;
    const {data, total} = allRepository;
    const {
      keys,
      visible,
      currentOpen,
      select,
      refreshLoading,
      loading,
    } = this.state;
    const item = currentOpen === 'country' ? countryArr : rankArr;
    console.log('allRepository', allRepository);

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
          // style={}
          visible={visible}
          maskClick={this.toggleModal}
          item={
            <View>
              {item.map((v, i) => (
                <TouchableWithoutFeedback
                  key={i}
                  onPress={() => this.handleSelect(v.id)}>
                  <View style={styles.item}>
                    <Text style={select === v.id && styles.active}>
                      {v.name}
                    </Text>
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
                  {countryArr[0].name}
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
                  {rankArr[0].name}
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
          <View style={styles.list}>
            <FlatList
              data={data}
              styles={styles.list}
              renderItem={({item, index}) => (
                <Item
                  keys={index}
                  navigation={navigation}
                  styles={styles.item}
                  {...item}
                />
              )}
              // ItemSeparatorComponent={({highlighted}) => (
              //   <WhiteSpace size={'big'} />
              // )}
              refreshControl={
                <RefreshControl
                  title={'loading'}
                  // tintColor={'orange'}
                  // titleColor={'red'}
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
              // onEndReachedThreshold={1}
              onEndReached={this.getMore}
            />
          </View>
        </Popover>
      </View>
    );
  }
}

export default connect(
  state => state.repository,
  dispatch => bindActionCreators({repositoryInit}, dispatch),
)(Repository);

const styles = StyleSheet.create({
  repository: {},
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
    paddingTop: 15,
    paddingBottom: 15,
    // flex: 1,
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
