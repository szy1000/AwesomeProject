import React from 'react';
import {
  View,
  ScrollView,
  Platform,
  Image,
  SafeAreaView,
  Text,
  StyleSheet,
} from 'react-native';
import {Header, Banner, Comment} from './page-components';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {findDetailInit, followNote} from './redux';
import Loading from '../../components/loading';

class FindDetail extends React.Component {
  componentDidMount(): void {
    const {
      findDetailInit,
      route: {params},
    } = this.props;
    findDetailInit(params.id);
  }

  follow = () => {
    const {params} = this.props.route;
    this.props.followNote(params.id);
  };

  render() {
    const {init, data} = this.props;
    if (!init) {
      return <Loading />;
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
          </ScrollView>
          <View style={styles.control}>
            <Comment
              starCount={starCount}
              commentCount={commentCount}
              favoriteCount={favoriteCount}
            />
          </View>
        </SafeAreaView>
      </View>
    );
  }
}

export default connect(
  state => state.findDetail,
  dispatch => bindActionCreators({findDetailInit, followNote}, dispatch),
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
