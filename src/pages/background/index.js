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
import {backgroundInit} from './redux';

class Background extends React.Component {
  pageSize = 8;
  currIndex = 1;

  state = {
    keys: '',
    currentOpen: '',
    refreshLoading: false,
    visible: false,
    subject: {},
    category: {},
    grade: {},
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

  handleSelect = (key, value) => {
    this.setState({
      [key]: value,
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

  search = () => {
    const {keys, subject, category, grade} = this.state;
    this.props.backgroundInit({
      pageSize: 50,
      pageNumber: 1,
      query: keys,
      gradeId: grade.id,
      subjectId: subject.id,
      categoryId: category.id,
      init: false,
    });
  };

  render() {
    const {
      keys,
      visible,
      currentOpen,

      category,
      subject,
      grade,
      refreshLoading,
    } = this.state;

    const {init, navigation, data} = this.props;
    if (!init) {
      return <ActivityIndicator style={{marginTop: 30}} />;
    }
    const {listData, _subject, _category, _grade} = data;

    let item = null;
    if (currentOpen === 'grade') {
      item = _grade;
    } else {
      item = currentOpen === 'category' ? _category : _subject;
    }

    return (
      <View style={styles.background}>
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
                    <Text
                      style={
                        (this.state[currentOpen] &&
                          this.state[currentOpen].id) === v.id && styles.active
                      }>
                      {v.name}
                    </Text>
                    {(this.state[currentOpen] && this.state[currentOpen].id) ===
                      v.id && (
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
              onPress={() => this.toggleModal('grade')}>
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
                    currentOpen === 'grade'
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
