import React from 'react';
import {
  View,
  ScrollView,
  Platform,
  ActivityIndicator,
  SafeAreaView,
  Text,
  StyleSheet,
} from 'react-native';
import {Header, Banner, Leave, Comment} from './page-components';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  findDetailInit,
  commentNote,
  followNote,
  favoriteNote,
  starNote,
} from './redux';
import {Empty} from '../../components';

class FindDetail extends React.Component {
  constructor(props) {
    super(props);
    this.noteId = '';
  }
  componentDidMount(): void {
    const {
      route: {params},
    } = this.props;
    this.noteId = params.id;
    this.initPage();
  }

  initPage = () => {
    this.props.findDetailInit(this.noteId);
  };

  commentNoteFn = content => {
    if (connect !== '') {
      this.props.commentNote(
        {
          noteId: this.noteId,
          content,
        },
        this.initPage,
      );
    }
  };

  follow = () => {
    this.props.followNote(this.noteId, this.initPage);
  };

  favoriteNoteFn = () => {
    this.props.favoriteNote(this.noteId, this.initPage);
  };

  starNoteFn = () => {
    this.props.starNote(this.noteId, this.initPage);
  };
  render() {
    const {init, data} = this.props;
    if (!init) {
      return <ActivityIndicator />;
    }
    const {
      content,
      title,
      files,
      commentCount,
      favoriteCount,
      starCount,
      user,
    } = data.noteDetail;
    console.log('data', data);
    return (
      <View style={styles.findDetail}>
        <SafeAreaView style={{flex: 1}}>
          <Header user={user} followFn={this.follow} />
          <ScrollView style={{flex: 1}}>
            <Banner files={files} />
            <View>
              <Text>{title}</Text>
              <Text>{content}</Text>
            </View>
            {data.commentList.length > 0 ? (
              data.commentList.map(v => <Leave {...v} />)
            ) : (
              <Empty />
            )}
          </ScrollView>
          <View style={styles.control}>
            <Comment
              starCount={starCount}
              commentCount={commentCount}
              favoriteCount={favoriteCount}
              commentNoteFn={e => this.commentNoteFn(e)}
              starNoteFn={this.starNoteFn}
              favoriteNoteFn={this.favoriteNoteFn}
            />
          </View>
        </SafeAreaView>
      </View>
    );
  }
}

export default connect(
  state => state.findDetail,
  dispatch =>
    bindActionCreators(
      {findDetailInit, commentNote, followNote, favoriteNote, starNote},
      dispatch,
    ),
)(FindDetail);

const styles = StyleSheet.create({
  findDetail: {
    position: 'relative',
    paddingTop: Platform.OS === 'ios' ? 45 : 0,
    flex: 1,
    backgroundColor: '#fff',
  },
  control: {
    // position: 'absolute',
    // bottom: 0,
  },
});
