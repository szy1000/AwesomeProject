import React from 'react';
import {Item, Comment, Leave} from './page-components';
import {
  Text,
  View,
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {WhiteSpace, Empty} from '../../components';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {groupDetailInit} from './redux';

class GroupDetail extends React.Component {
  componentDidMount() {
    const {
      route: {params},
    } = this.props;
    this.props.groupDetailInit(params.id);
  }

  render() {
    const {init, data} = this.props;
    if (!init) {
      return <ActivityIndicator />;
    }
    const {groupDetail, comment} = data;
    console.warn(comment);
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
        <ScrollView style={styles.groupDetail}>
          <Item {...groupDetail} />
          <WhiteSpace size={'big'} />
          {comment.length > 0 ? (
            comment.map(v => <Leave key={v.id} {...v} />)
          ) : (
            <Empty />
          )}
        </ScrollView>
        <Comment />
      </SafeAreaView>
    );
  }
}

export default connect(
  state => state.groupDetail,
  dispatch => bindActionCreators({groupDetailInit}, dispatch),
)(GroupDetail);

const styles = StyleSheet.create({
  groupDetail: {},
  comment: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    flexDirection: 'row',
    borderTopColor: '#ddd',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  ipt: {
    marginRight: 15,
    flex: 1,
    borderColor: '#f7f7f7',
    borderWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 15,
  },
});
