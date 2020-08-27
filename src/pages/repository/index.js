import React, {Fragment} from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  TouchableWithoutFeedback,
  RefreshControl,
  ScrollView,
  Text,
  Image,
  StyleSheet,
} from 'react-native';
import {SearchInput, Button, Popover, ListFooter} from '../../components';
import Item from './Item/item';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {repositoryInit} from './redux';

class Repository extends React.Component {
  currIndex = 1;
  pageSize = 6;
  state = {
    keys: '',
    currentOpen: '',
    select: '',
    refreshLoading: false,
    visible: false,
    country: {},
    school: {},
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

  handleSelect = (key, value) => {
    this.setState({
      select: value,
      [key]: value,
    });
    this.toggleModal(key);
    this.search();
  };

  getDate = () => {
    this.setState({
      refreshLoading: true,
    });

    this.props.repositoryInit(
      {
        pageNumber: this.currIndex,
        pageSize: this.pageSize,
        init: true,
      },
      () => {
        this.setState({
          refreshLoading: false,
        });
      },
    );
  };

  getMore = pageNum => {
    if (pageNum > this.currIndex) {
      this.currIndex = pageNum;
      this.props.repositoryInit({
        pageSize: this.pageSize,
        pageNumber: this.currIndex,
      });
    }
  };

  componentDidMount(): void {
    this.props.repositoryInit({
      pageNumber: 1,
      pageSize: this.pageSize,
      init: true,
    });
  }

  search = () => {
    const {keys, country, school} = this.state;
    this.props.repositoryInit({
      pageNumber: 1,
      pageSize: 500,
      query: keys,
      init: true,
      order: school.id,
      countryId: country.id,
    });
  };

  render() {
    const {navigation, init, _data} = this.props;
    if (!init) {
      return <ActivityIndicator />;
    }
    const {rankArr, countryArr, allRepository} = _data;
    const {data, total} = allRepository;

    console.log('allRepository', allRepository);

    const {
      keys,
      visible,
      currentOpen,
      refreshLoading,
      select,
      country,
      school,
    } = this.state;
    const item = currentOpen === 'country' ? countryArr : rankArr;

    return (
      <View style={styles.repository}>
        <View style={styles.selectArea}>
          <SearchInput
            styles={styles.ipt}
            value={keys}
            returnKeyLabel="search"
            returnKeyType="search"
            blurOnSubmit={true}
            onSubmitEditing={this.search}
            onChangeText={e => this.onChangeText(e)}
          />
          <Button onClick={this.search}>搜索</Button>
        </View>

        <Popover
          style={{flex: 1, paddingBottom: 30}}
          visible={visible}
          maskClick={this.toggleModal}
          item={
            <Fragment>
              {currentOpen === 'country' ? (
                <ScrollView style={{maxHeight: 500}}>
                  {item.map((v, i) => (
                    <TouchableWithoutFeedback
                      key={i}
                      onPress={() => this.handleSelect('country', v)}>
                      <View style={styles.item}>
                        <Text style={country.id === v.id && styles.active}>
                          {v.name}
                        </Text>
                        {country === v && (
                          <Image
                            style={styles.select}
                            source={require('./sel.png')}
                          />
                        )}
                      </View>
                    </TouchableWithoutFeedback>
                  ))}
                </ScrollView>
              ) : (
                <View>
                  {item.map((v, i) => (
                    <TouchableWithoutFeedback
                      key={i}
                      onPress={() => this.handleSelect('school', v)}>
                      <View style={styles.item}>
                        <Text style={school.id === v.id && styles.active}>
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
              )}
            </Fragment>
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
                  {country.name || countryArr[0].name}
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
                  {school.name || rankArr[0].name}
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
            data={data}
            styles={styles.list}
            renderItem={({item, index}, k) => (
              <Item
                keys={k}
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
            ListFooterComponent={<ListFooter data={data} total={total} />}
            onEndReachedThreshold={0.03}
            onEndReached={() => this.getMore(allRepository.nextPage)}
          />
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
  repository: {
    position: 'relative',
    flex: 1,
  },
  selectArea: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  ipt: {
    // position: 'absolute',
    marginRight: 10,
    flex: 1,
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
    paddingBottom: 15,
    // flex: 1,
    backgroundColor: '#f7f7f7',
    // backgroundColor: 'red',
  },

  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 15,
    // marginTop: 15,
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
