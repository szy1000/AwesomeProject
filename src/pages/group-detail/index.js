import React from 'react';
import {Item, Comment, Leave} from './page-components';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Button,
  Text,
} from 'react-native';
import {WhiteSpace, Empty} from '../../components';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {groupDetailInit, makeComment, thumbUpDis, favoriteDis} from './redux';

class GroupDetail extends React.Component {
  componentDidMount() {
    const {
      route: {params},
    } = this.props;
    this.props.groupDetailInit(params.id);
  }

  thumbUpDis = () => {
    const {
      route: {params},
    } = this.props;
    this.props.thumbUpDis(params.id);
  };

  favoriteDis = () => {
    const {
      route: {params},
    } = this.props;
    this.props.favoriteDis(params.id);
  };

  makeComment = content => {
    console.log(content)
    // const {
    //   route: {params},
    // } = this.props;
    // const _params = {
    //   id: params.id,
    //   discussionId: params.id,
    //   content,
    // };
    // this.props.makeComment(_params, this.props.groupDetailInit(params.id));
  };
  render() {
    const {init, data} = this.props;
    if (!init) {
      return <ActivityIndicator />;
    }
    const {groupDetail, comment} = data;
    console.warn('groupDetail', groupDetail);
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
        <ScrollView style={styles.groupDetail}>
          <Item {...groupDetail} />
          <WhiteSpace size={'big'} />
          <Button title={'ss'} onPress={this.makeComment}>
            <Text>sss</Text>
          </Button>

          {comment.length > 0 ? (
            comment.map(v => <Leave key={v.id} {...v} />)
          ) : (
            <Empty />
          )}
        </ScrollView>
        <Comment
          thumbUpDis={this.thumbUpDis}
          makeComment={e => this.makeComment(e)}
          favoriteDis={this.favoriteDis}
        />
      </SafeAreaView>
    );
  }
}

export default connect(
  state => state.groupDetail,
  dispatch =>
    bindActionCreators(
      {groupDetailInit, makeComment, thumbUpDis, favoriteDis},
      dispatch,
    ),
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
