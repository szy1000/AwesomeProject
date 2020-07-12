import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import Item from '../item';
import {Empty} from '../../../../components/';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fixedTopInit} from './redux';

class FixedTop extends React.Component {
  componentDidMount() {
    const {
      route: {params},
    } = this.props;
    this.props.fixedTopInit({
      id: params.id,
      pageNumber: 1,
      pageSize: 10,
      type: 'pinned',
      time: new Date().getMilliseconds(),
    });
  }

  render() {
    const {
      init,
      data: {fixedTop},
      navigation,
    } = this.props;
    if (!init) {
      return <ActivityIndicator style={{marginTop: 30}} />;
    }
    const {data} = fixedTop;
    return (
      <View style={styles.fixedTop}>
        <View style={styles.list}>
          {data.length > 0 ? (
            data.map(v => <Item key={v.id} {...v} navigation={navigation} />)
          ) : (
            <Empty />
          )}
        </View>
      </View>
    );
  }
}

export default connect(
  state => state.fixedTop,
  dispatch => bindActionCreators({fixedTopInit}, dispatch),
)(FixedTop);

const styles = StyleSheet.create({
  fixedTop: {
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
