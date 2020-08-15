import React from 'react';
import {
  Text,
  Image,
  View,
  TouchableWithoutFeedback,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {Empty} from '../../../../components';
import {SearchInput} from '../../../../components';
import Item from '../item';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {groupDisInit} from './redux';

class Discussion extends React.Component {
  state = {
    active: true,
  };
  componentDidMount() {
    this.getData();
  }

  getData = params => {
    const {id} = this.props;
    const {active} = this.state;
    const _params = Object.assign(
      {
        id,
        pageNumber: 1,
        pageSize: 10,
        type: active ? 'hot' : 'new',
        time: new Date().getMilliseconds(),
      },
      params,
    );
    this.props.groupDisInit(_params);
  };

  toggle = () => {
    this.setState(
      ({active}) => ({
        active: !active,
        keys: '',
      }),
      () => {
        this.getData();
      },
    );
  };

  changeText = e => {
    this.setState({
      keys: e,
    });
  };

  search = () => {
    const {keys} = this.state;
    this.getData({
      query: keys,
    });
  };
  render() {
    const {active, keys} = this.state;
    const {
      init,
      data: {discussion},
      navigation,
    } = this.props;
    if (!init) {
      return <ActivityIndicator />;
    }
    const {data} = discussion;
    console.log(this.props)
    return (
      <View style={styles.discussion}>
        <View style={styles.wrapper}>
          <View style={styles.ipt_wrapper}>
            <SearchInput
              style={styles.ipt}
              value={keys}
              returnKeyLabel="done"
              returnKeyType="done"
              numberOfLines={1}
              allowFontScaling={false}
              onSubmitEditing={this.search}
              placeholder={'请输入您要查询的关键字'}
              onChangeText={e => this.changeText(e)}
            />
            <TouchableWithoutFeedback onPress={this.search}>
              <Image
                style={styles.search}
                accessibilityRole={'image'}
                source={require('./search.png')}
              />
            </TouchableWithoutFeedback>
          </View>

          <TouchableWithoutFeedback onPress={this.toggle}>
            <View style={styles.switch}>
              <Text style={[styles.switch_item, !active && styles.active]}>
                最新
              </Text>
              <Text style={[styles.switch_item, active && styles.active]}>
                热门
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.list}>
          {data.length > 0 ? (
            data.map(v => <Item {...v} key={v.id} navigation={navigation} />)
          ) : (
            <Empty />
          )}
        </View>
      </View>
    );
  }
}

export default connect(
  state => state.groupDiscussion,
  dispatch => bindActionCreators({groupDisInit}, dispatch),
)(Discussion);

const styles = StyleSheet.create({
  discussion: {
    // padding: 15,
  },

  wrapper: {
    padding: 15,
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  ipt_wrapper: {
    paddingRight: 40,
    position: 'relative',
    marginRight: 10,
    flex: 1,
    borderWidth: 1,
    borderColor: '#f7f7f7',
    backgroundColor: '#fff',
    borderRadius: 20,
  },
  search: {
    position: 'absolute',
    zIndex: 3,
    right: 10,
    top: 6,
    width: 16,
    height: 16,
    resizeMode: 'contain',
  },
  ipt: {
    paddingVertical: 5,
    paddingLeft: 10,
    height: 30,
    overflow: 'hidden',
  },
  switch: {
    height: 30,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: '#eee',
  },
  switch_item: {
    paddingHorizontal: 10,
    height: 30,
    lineHeight: 28,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#eee',
    overflow: 'hidden',
  },
  active: {
    color: '#12a8cd',
    borderColor: '#12a8cd',
    backgroundColor: '#fff',
  },

  list: {
    margin: 15,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
});
