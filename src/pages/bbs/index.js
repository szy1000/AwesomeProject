import React from 'react';
import {
  Platform,
  ScrollView,
  ImageBackground,
  View,
  StyleSheet,
  Text,
} from 'react-native';
import {Item, Panel} from './page-components';
import Jump from '../../utils/jump';

export default class BBS extends React.Component {
  linkToGroup = () => {
    const {navigation} = this.props;

    Jump.linkToPage({
      navigation,
      url: 'GroupAll',
    });
  };
  render() {
    const {navigation} = this.props;
    return (
      <ScrollView style={styles.bbs}>
        <ImageBackground style={styles.bg} source={require('./pic54.png')} />
        <View style={styles.content}>
          <Panel title={'分类找小组'} more moreFn={this.linkToGroup}>
            <View style={styles.tagWrapper}>
              <Text style={styles.tag}>留学申请</Text>
              <Text style={styles.tag}>留学申请</Text>
              <Text style={styles.tag}>留学申请</Text>
              <Text style={styles.tag}>留学申请</Text>
              <Text style={styles.tag}>留学申请</Text>
              <Text style={styles.tag}>留学申请</Text>
              <Text style={styles.tag}>留学申请</Text>
              <Text style={styles.tag}>留学申请</Text>
            </View>
          </Panel>

          <Panel title="本周热门榜TOP5" style={{marginTop: 20}}>
            <Item list={[{}, {}, {}, {}, {}]} navigation={navigation} />
          </Panel>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  bbs: {
    position: 'relative',
  },
  bg: {
    position: 'relative',
    paddingTop: Platform.OS === 'ios' ? 70 : 0,
    top: 0,
    left: 0,
    right: 0,
    height: 300,
  },
  content: {
    marginTop: -50,
    marginHorizontal: 15,
    borderRadius: 5,
  },
  tagWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  tag: {
    marginBottom: 10,
    marginHorizontal: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: '#12a8cd',
    backgroundColor: '#d9eff7',
  },
});
