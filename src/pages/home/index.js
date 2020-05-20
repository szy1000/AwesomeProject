import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  Image,
  FlatList,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

import Banner from './page-components/banner/banner';
import Link from './page-components/Link/link';
import Panel from './page-components/panel';
import Case from './page-components/case';
import Course from './page-components/course';

import {homeInit} from './redux';

class Home extends React.Component {
  componentDidMount() {
    this.props.homeInit({
      pageNum: 1,
      pageSize: 4,
    });
  }

  render() {
    const {init, data} = this.props;
    if (!init) {
      return <Text>Loading</Text>;
    }
    const {total, list} = data;
    return (
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}>
        <View style={styles.ipt_wrapper}>
          <View style={styles.address_wrapper}>
            <EvilIcons name={'location'} size={26} />
            <Text style={styles.address}>英国</Text>
          </View>
          <TextInput
            style={styles.ipt}
            placeholder="请输入关键词搜索"
            onChangeText={text => {
              this.setState({
                txt: text,
              });
            }}
          />
          <View style={styles.msg_box}>
            <AntDesign name={'message1'} size={20} />
            <Text style={styles.badge}>3</Text>
          </View>
        </View>
        <Banner />
        <Link />
        <View style={styles.whiteSpace} />
        <Panel title="热门院校" tips="看看小伙伴们都热衷于哪些院校吧！">
          <FlatList
            data={list}
            horizontal
            renderItem={({item, index}) => (
              <View style={styles.item} key={index}>
                <Image
                  accessibilityRole={'image'}
                  source={{uri: item.cover}}
                  style={styles.pic}
                />
                <Text style={styles.name}>{item.title}</Text>
              </View>
            )}
          />
        </Panel>
        <View style={styles.whiteSpace} />
        <Panel title="热门专业" tips="看看当下最流行的专业！">
          <Course />
        </Panel>
        <Panel title="案例分享" tips="以下案例均已获得用户授权">
          <Case data={[1, 2]} />
        </Panel>
        {/*<ReloadInstructions />*/}
        {/*<LearnMoreLinks />*/}
        {/*<DebugInstructions />*/}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {},
  ipt_wrapper: {
    paddingHorizontal: 15,
    display: 'flex',
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
  },
  address_wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  address: {
    fontSize: 16,
  },
  ipt: {
    marginLeft: 15,
    marginRight: 10,
    paddingHorizontal: 15,
    flex: 1,
    backgroundColor: '#fff',
    height: 30,
    borderRadius: 15,
  },
  msg_box: {
    position: 'relative',
  },
  badge: {
    width: 18,
    height: 18,
    position: 'absolute',
    right: -9,
    top: -9,
    color: '#fff',
    borderRadius: 9,
    textAlign: 'center',
    lineHeight: 18,
    overflow: 'hidden',
    backgroundColor: 'red',
  },

  whiteSpace: {
    height: 5,
    backgroundColor: '#ddd',
  },
  hot_school: {
    flexDirection: 'row',
  },
  item: {
    marginLeft: 15,
    width: 113,
  },
  pic: {
    width: 113,
    height: 160,
    borderRadius: 5,
  },
});

export default connect(
  state => state.home,
  dispatch => bindActionCreators({homeInit}, dispatch),
)(Home);
