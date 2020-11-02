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
    console.log('navigation===>', this.props.navigation);
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
        <Content style={{flex: 1, position: 'relative'}}>
          <ScrollView
            onContentSizeChange={() => this.refs.scrollView.scrollToEnd()}
            ref="scrollView"
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
        </Content>
        <Footer>
          <View style={styles.control}>
            <Comment
              actionAll={data.actionAll}
              starCount={starCount}
              commentCount={commentCount}
              favoriteCount={favoriteCount}
              commentNoteFn={e => this.commentNoteFn(e)}
              starNoteFn={this.starNoteFn}
              favoriteNoteFn={this.favoriteNoteFn}
            />
          </View>
        </Footer>
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
    // position: 'absolute',
    width: '100%',
    // bottom: 0,

    backgroundColor: '#fff',
  },
});
