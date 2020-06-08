import React from 'react';
import {
  Platform,
  ScrollView,
  ImageBackground,
  View,
  StyleSheet,
  Image,
  Text,
  TouchableWithoutFeedback,
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
      <View style={styles.bbs}>
        <ScrollView>
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
        <TouchableWithoutFeedback
          onPress={() => {
            Jump.linkToPage({
              navigation,
              url: 'GroupEdit',
            });
          }}>
          <View style={styles.note}>
            <Image style={styles.edit} source={require('./edit.png')} />
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bbs: {
    position: 'relative',
    flex: 1,
  },
  bg: {
    position: 'absolute',
    // paddingTop: Platform.OS === 'ios' ? 0 : 0,
    top: 0,
    width: '100%',
    height: 270,
    resizeMode: 'contain',
    // backgroundColor: 'red',
  },

  content: {
    marginTop: 230,
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
  note: {
    position: 'absolute',
    right: 10,
    bottom: 60,
  },
  edit: {
    width: 60,
    height: 60,
  },
});
