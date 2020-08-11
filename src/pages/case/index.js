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
import {SearchInput, ListFooter, Button, Popover} from '../../components';
import Item from './Item/item';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {caseInit} from './redux';

class Cases extends React.Component {
  state = {
    keys: '',
    currentOpen: '',
    select: '',
    refreshLoading: false,
    visible: false,
    degree: {},
    subject: {},
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
    this.props.caseInit(
      {
        pageNumber: 1,
        pageSize: this.pageSize,
        countryId: 1,
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
      this.currIndex = nextPage;
      this.props.caseInit({
        pageSize: this.pageSize,
        pageNumber: this.currIndex,
        countryId: 1,
      });
    }
  };

  componentDidMount(): void {
    this.props.caseInit({
      pageNumber: 1,
      pageSize: this.pageSize,
      countryId: 1,
      init: true,
    });
  }

  search = () => {
    const {keys, degree, subject} = this.state;
    this.props.caseInit({
      pageNumber: 50,
      pageSize: this.pageSize,
      countryId: 1,
      query: keys,
      degreeId: degree.id,
      subjectId: subject.id,
      init: true,
    });
  };

  render() {
    const {
      keys,
      visible,
      currentOpen,
      degree,
      subject,
      select,
      refreshLoading,
    } = this.state;
    const {init, data, navigation} = this.props;
    if (!init) {
      return <ActivityIndicator style={{marginTop: 30}} />;
    }
    const {listData, _degree, _subject} = data;
    console.log(listData);

    const item = currentOpen === 'degree' ? _degree : _subject;
    return (
      <View style={styles.repository}>
        <View style={styles.selectArea}>
          <SearchInput
            styles={styles.ipt}
            value={keys}
            onChangeText={e => this.onChangeText(e)}
          />
          <Button onClick={this.search}>搜索</Button>
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
                  onPress={() => this.handleSelect(currentOpen, v)}>
                  <View style={styles.item}>
                    <Text style={select === v && styles.active}>{v.name}</Text>
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
              onPress={() => this.toggleModal('degree')}>
              <View style={styles.filterItem}>
                <Text
                  style={[
                    styles.area,
                    currentOpen === 'degree' && styles.active,
                  ]}>
                  {degree.name || '学位'}
                </Text>
                <Image
                  style={styles.filterIcon}
                  source={
                    currentOpen === 'degree'
                      ? require('./typerow.png')
                      : require('./typerow_pre.png')
                  }
                />
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => this.toggleModal('subject')}>
              <View style={styles.filterItem}>
                <Text
                  style={[
                    styles.area,
                    currentOpen === 'subject' && styles.active,
                  ]}>
                  {subject.name || '学科'}
                </Text>
                <Image
                  style={styles.filterIcon}
                  source={
                    currentOpen === 'subject'
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
            onEndReached={() => this.getMore(listData)}
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
    flexDirection: 'row',
    paddingTop: 10,
    paddingHorizontal: 20,

    backgroundColor: '#fff',
  },
  ipt: {
    flex: 1,
    marginRight: 10,
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
