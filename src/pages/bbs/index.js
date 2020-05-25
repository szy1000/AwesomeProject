import React from 'react';
import {
  Platform,
  ImageBackground,
  View,
  StyleSheet,
  Text,
} from 'react-native';
import {Item, Panel} from './page-components';

export default class BBS extends React.Component {
  render() {
    const {navigation} = this.props;
    return (
      <View style={styles.bbs}>
        <ImageBackground style={styles.bg} source={require('./pic54.png')} />
        <View style={styles.content}>
          <Panel title={'分类找小组'} more>
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

          <Panel title="本周热门榜TOP5">
            <View style={styles.tagWrapper}>
              <Text style={styles.tag}>留学申请</Text>
              <Item />
            </View>
          </Panel>
        </View>
      </View>
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
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  tagWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
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
