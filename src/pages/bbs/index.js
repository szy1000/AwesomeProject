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
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {bbsInit, joinGroup} from './redux';
import {Loading} from '../../components';

class BBS extends React.Component {
  componentDidMount(): void {
    this.props.bbsInit();
    // console.log(this.props)
  }

  linkToGroup = () => {
    const {navigation} = this.props;

    Jump.linkToPage({
      navigation,
      url: 'GroupAll',
    });
  };

  joinGroupFn = (id, type) => {
    this.props.joinGroup(
      {
        id,
        type,
      },
      () => this.props.bbsInit(),
    );
  };
  render() {
    const {init, data, navigation} = this.props;
    if (!init) {
      return <Loading />;
    }
    const {groupCategory, hotGroup} = data;
    console.log(hotGroup);
    return (
      <View style={styles.bbs}>
        <ScrollView>
          <ImageBackground style={styles.bg} source={require('./pic54.png')} />
          <View style={styles.content}>
            <Panel title={'分类找小组'} more moreFn={this.linkToGroup}>
              <View style={styles.tagWrapper}>
                {groupCategory.map(({id, name}) => (
                  <Text key={id} style={styles.tag}>
                    {name}
                  </Text>
                ))}
              </View>
            </Panel>

            <Panel title="本周热门榜TOP5" style={{marginTop: 20}}>
              <Item
                list={hotGroup}
                navigation={navigation}
                toggleJoinFn={(id, type) => this.joinGroupFn(id, type)}
              />
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

export default connect(
  state => state.bbs,
  dispatch => bindActionCreators({bbsInit, joinGroup}, dispatch),
)(BBS);
