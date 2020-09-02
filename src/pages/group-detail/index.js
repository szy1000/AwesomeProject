import React from 'react';
import {Item, Comment, Leave} from './page-components';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Dimensions,
  Button,
  Text,
} from 'react-native';
import {WhiteSpace, Empty} from '../../components';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {groupDetailInit, makeComment, thumbUpDis, favoriteDis} from './redux';

const {height} = Dimensions.get('window');
class GroupDetail extends React.Component {
  componentDidMount() {
    const {
      route: {params},
    } = this.props;
    this.props.groupDetailInit(params.id);
  }

  toggleThumbUpDis = async () => {
    const {
      route: {params},
    } = this.props;
    await this.props.thumbUpDis(params.id);
    this.props.groupDetailInit(params.id);
  };

  toggleFavoriteDis = async hasFav => {
    console.log(hasFav);
    const {
      route: {params},
    } = this.props;
    await this.props.favoriteDis(params.id);
    this.props.groupDetailInit(params.id);
  };

  makeComment = (content, callback) => {
    const {
      route: {params},
    } = this.props;
    const _params = {
      id: params.id,
      discussionId: params.id,
      content,
    };
    this.props.makeComment(
      _params,
      this.props.groupDetailInit(params.id, callback),
    );
  };
  render() {
    const {init, data} = this.props;
    if (!init) {
      return <ActivityIndicator />;
    }
    const {groupDetail, comment} = data;
    console.log('group data', data);
    return (
      <KeyboardAwareScrollView>
        <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
          <ScrollView
            onContentSizeChange={() => this.refs.scrollView.scrollToEnd()}
            ref="scrollView"
            style={styles.groupDetail}>
            <Item {...groupDetail} />
            <WhiteSpace size={'big'} />
            {comment.length > 0 &&
              comment.map(v => <Leave key={v.id} {...v} />)}
          </ScrollView>
          <Comment
            {...groupDetail}
            makeComment={e => this.makeComment(e)}
            toggleThumbUpDis={this.toggleThumbUpDis}
            toggleFavoriteDis={this.toggleFavoriteDis}
          />
        </SafeAreaView>
      </KeyboardAwareScrollView>
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
