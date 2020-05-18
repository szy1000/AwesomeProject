import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  Image,
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
import Swiper from './page-components/swiper';
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
        <Swiper />
        <Header />
        {global.HermesInternal == null ? null : (
          <View style={styles.engine}>
            <Text style={styles.footer}>Engine: Hermes</Text>
          </View>
        )}
        {list.map((v, i) => (
          <View key={i}>
            <Image
              accessibilityRole={'image'}
              source={{uri: v.cover}}
              style={styles.pic}
            />
            <Text>{v.title}</Text>
          </View>
        ))}
        <View style={styles.body}>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>See Your Changes</Text>
            <Text style={styles.sectionDescription}>
              <ReloadInstructions />
            </Text>
          </View>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Debug</Text>
            <Text style={styles.sectionDescription}>
              <DebugInstructions />
            </Text>
          </View>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Learn More</Text>
            <Text style={styles.sectionDescription}>
              Read the docs to discover what to do next:
            </Text>
          </View>
          <LearnMoreLinks />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },

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

  pic: {
    width: 200,
    height: 200,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default connect(
  state => state.home,
  dispatch => bindActionCreators({homeInit}, dispatch),
)(Home);
