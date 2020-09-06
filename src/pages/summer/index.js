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
import {summerInit} from './redux';

class Summer extends React.Component {
  pageSize = 8;
  currIndex = 1;
  state = {
    keys: '',
    currentOpen: '',
    select: '',
    refreshLoading: false,
    visible: false,
    grade: {},
    subject: {},
    category: {},
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
    this.props.summerInit(
      {
        init: true,
        pageSize: 8,
        pageNumber: 1,
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
      this.props.summerInit({
        pageSize: this.pageSize,
        pageNumber: this.currIndex,
      });
    }
  };

  componentDidMount() {
    this.props.summerInit({
      init: true,
      pageSize: 8,
      pageNumber: 1,
      query: '',
    });
  }

  search = () => {
    const {keys, grade, subject, category} = this.state;
    console.log(this.state);
    this.props.summerInit({
      init: true,
      pageSize: 500,
      pageNumber: 1,
      query: keys,
      gradeId: grade.id,
      subjectId: subject.id,
      categoryId: category.id,
    });
  };
  render() {
    const {
      keys,
      visible,
      currentOpen,
      select,
      refreshLoading,
      category,
      grade,
      subject,
    } = this.state;
    const {_data, init, navigation} = this.props;

    if (!init) {
      return <ActivityIndicator style={{marginTop: 30}} />;
    }

    const {
      listData: {data, total},
      _subject,
      _grade,
      categoryArr = [],
    } = _data;
    console.log('_data.listData', _data.listData);

    const item =
      currentOpen === 'grade'
        ? _grade
        : currentOpen === 'subject'
        ? _subject
        : categoryArr;
    return (
      <View style={styles.summer}>
        <View style={styles.selectArea}>
          <SearchInput
            styles={styles.ipt}
            value={keys}
            onChangeText={e => this.onChangeText(e)}
          />
          <Button onClick={this.search}>搜索</Button>
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
            <TouchableWithoutFeedback onPress={() => this.toggleModal('grade')}>
              <View style={styles.filterItem}>
                <Text
                  style={[
                    styles.area,
                    currentOpen === 'grade' && styles.active,
                  ]}>
                  {grade.name || '年级'}
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
              onPress={() => this.toggleModal('category')}>
              <View style={styles.filterItem}>
                <Text
                  style={[
                    styles.area,
                    currentOpen === 'category' && styles.active,
                  ]}>
                  {category.name || '分类'}
                </Text>
                <Image
                  style={styles.filterIcon}
                  source={
                    currentOpen === 'category'
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
            refreshControl={
              <RefreshControl
                title={'loading'}
                refreshing={refreshLoading}
                onRefresh={this.getDate}
              />
            }
            ListFooterComponent={<ListFooter data={data} total={total} />}
            onEndReachedThreshold={0.003}
            onEndReached={() => this.getMore(_data.listData)}
          />
        </Popover>
      </View>
    );
  }
}

export default connect(
  state => state.summer,
  dispatch => bindActionCreators({summerInit}, dispatch),
)(Summer);

const styles = StyleSheet.create({
  summer: {
    flex: 1,
  },
  selectArea: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  ipt: {
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
    paddingTop: 15,
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
