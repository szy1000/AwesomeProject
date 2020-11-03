import React from 'react';
import {
  View,
  ScrollView,
  Platform,
  ActivityIndicator,
  SafeAreaView,
  Dimensions,
  Text,
  StyleSheet,
} from 'react-native';
import {Header, Banner, Leave, Comment} from './page-components';

const {height} = Dimensions.get('window');

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Container, Content, Footer} from 'native-base';
import {
  findDetailInit,
  commentNote,
  followNote,
  favoriteNote,
  starNote,
} from './redux';

import {WhiteSpace} from '../../components';

class FindDetail extends React.Component {
  constructor(props) {
    super(props);
    this.noteId = '';
    this.state = {
      keyboard: false,
      content: '',
    };
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
    console.warn(
      'this.refs.scrollView',
      this.refs.scrollView.scrollResponderScrollToEnd(),
    );
    this.refs.scrollView.scrollToEnd();
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

  toggleKey = () => {
    this.setState(({keyboard}) => ({keyboard: !keyboard}));
  };

  handleContent = content => {
    this.setState({
      content,
    });
  };

  follow = id => {
    this.props.followNote(id, this.initPage);
  };

  favoriteNoteFn = () => {
    this.props.favoriteNote(this.noteId, this.initPage);
  };

  starNoteFn = () => {
    this.props.starNote(this.noteId, this.initPage);
  };
  render() {
    const {init, data, navigation} = this.props;
    const {keyboard} = this.state;
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
    return (
      <Container style={styles.findDetail}>
        <Header
          user={user}
          navigation={navigation}
          followFn={() => this.follow(user.id)}
          follow={data.userAll.follow}
        />
        <Content scrollEnabled style={{flex: 1}}>
          <ScrollView
            ref="scrollView"
            // onContentSizeChange={() =>
            //   setTimeout(() => , 300)
            // }
            style={{flex: 1}}>
            <Banner files={files} />
            <View style={{padding: 15}}>
              <Text style={{fontSize: 20, marginBottom: 15}}>{title}</Text>
              <Text style={{fontSize: 16, lineHeight: 20}}>{content}</Text>
            </View>
            <WhiteSpace />
            {data.commentList.length > 0 && (
              <Text
                style={{paddingHorizontal: 15, marginTop: 15, fontSize: 20}}>
                评论:
              </Text>
            )}
            {data.commentList.length > 0 &&
              data.commentList.map(v => <Leave key={v.id} {...v} />)}
          </ScrollView>
          {keyboard && (
            <View style={styles.control}>
              <Comment
                actionAll={data.actionAll}
                starCount={starCount}
                getFocus={true}
                commentCount={commentCount}
                favoriteCount={favoriteCount}
                toggleFocus={this.toggleKey}
                commentNoteFn={e => this.commentNoteFn(e)}
                starNoteFn={this.starNoteFn}
                content={this.state.content}
                handleContent={e => this.handleContent(e)}
                favoriteNoteFn={this.favoriteNoteFn}
              />
            </View>
          )}
        </Content>
        {!keyboard && (
          <Footer>
            <View style={styles.control}>
              <Comment
                actionAll={data.actionAll}
                starCount={starCount}
                getFocus={false}
                commentCount={commentCount}
                content={this.state.content}
                favoriteCount={favoriteCount}
                toggleFocus={this.toggleKey}
                commentNoteFn={e => this.commentNoteFn(e)}
                starNoteFn={this.starNoteFn}
                favoriteNoteFn={this.favoriteNoteFn}
              />
            </View>
          </Footer>
        )}
      </Container>
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
    width: '100%',
    backgroundColor: '#fff',
  },
});
