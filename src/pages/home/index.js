import React from 'react';
import {
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  View,
  Text,
  TextInput,
  Image,
  Platform,
  ActivityIndicator,
} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

import Banner from './page-components/banner/banner';
import Link from './page-components/Link/link';
import Panel from './page-components/panel';
import Case from './page-components/case';
import Course from './page-components/course';

import {homeInit, posInit, updateCurrCountry} from './redux';
import GetLocation from 'react-native-get-location';
import RNPickerSelect from 'react-native-picker-select';
import Jump from '../../utils/jump';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.navigation = this.props.navigation;
    this.countryId = '';
    // this.didFocusListener = '';
  }
  componentDidMount() {
    this.didFocusListener = this.props.navigation.addListener('focus', () => {
      this.getPos();
      console.log('home did focus');
    });
  }

  componentWillUnmount() {
    this.didFocusListener.removeEventListener &&
      this.didFocusListener.removeEventListener();
  }

  getPos = async () => {
    const _this = this;
    await GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then(async location => {
        const {latitude, longitude} = location;
        await this.props.posInit({
          location: `${latitude},${longitude}`,
          key: '543BZ-AKDC4-KPJUK-DMXNP-GGGVO-63FJU',
        });
        await _this.homeInit();
      })
      .catch(error => {
        const {code, message} = error;
        // this.homeInit();
        console.log('ssss', code, message);
      });
  };

  homeInit = () => {
    this.props.homeInit({
      pageNum: 1,
      pageSize: 4,
      navigation: this.navigation,
    });
  };

  selectCountry = async id => {
    await this.props.updateCurrCountry({countyId: id});
    await this.props.homeInit({
      pageNum: 1,
      pageSize: 4,
      id,
      navigation: this.navigation,
    });
  };

  render() {
    const {init, navigation, data} = this.props;
    if (!init) {
      return <ActivityIndicator />;
    }
    const {country, hotSchool, unread, hotSubject, hotCase, currCountry} = data;
    const _items = [];
    for (let i = 0; i < country.length; i++) {
      const temp = {};
      temp.label = country[i].name;
      temp.value = country[i].id;
      temp.key = country[i].id;
      temp.keys = country[i].id;
      _items.push(temp);
    }
    this.countryId = _items[0].value;
    return (
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}>
        <View style={styles.ipt_wrapper}>
          <RNPickerSelect
            onValueChange={value => {
              this.countryId = value;
              this.selectCountry(this.countryId);
            }}
            // value={_items[0].value}
            placeholder={{
              label: '请选择国家',
              value: null,
            }}
            doneText="确定"
            onDonePress={() => this.selectCountry(this.countryId)}
            items={_items}>
            <View style={styles.address_wrapper}>
              <EvilIcons name={'location'} size={26} />
              <Text style={styles.address}>
                {currCountry || country[0].name}
              </Text>
            </View>
          </RNPickerSelect>

          <TextInput
            style={styles.ipt}
            ref="ipt"
            // editable={false}
            maxLenth={100}
            placeholder="请输入关键词搜索"
            returnKeyLabel="do"
            onFocus={() => {
              Jump.linkToPage({
                url: 'Search',
                navigation: this.navigation,
              });
              this.refs.ipt.blur();
            }}
          />
          <TouchableWithoutFeedback
            onPress={() =>
              Jump.linkToPage({
                url: 'Message',
                navigation: this.navigation,
              })
            }>
            <View style={styles.msg_box}>
              <AntDesign name={'message1'} size={20} />
              {unread !== 0 && <Text style={styles.badge}>{unread}</Text>}
            </View>
          </TouchableWithoutFeedback>
        </View>
        <Banner />
        <Link navigation={this.props.navigation} />
        <View style={styles.whiteSpace} />
        <Panel title="热门院校" tips="看看小伙伴们都热衷于哪些院校吧！">
          <ScrollView
            horizontal={true} // 横向
            showsHorizontalScrollIndicator={false}>
            {hotSchool.length > 0 &&
              hotSchool.map((item, index) => (
                <TouchableWithoutFeedback
                  onPress={() =>
                    Jump.linkToPage({
                      url: 'RepositoryDetail',
                      params: {
                        id: item.id,
                      },
                      navigation: this.navigation,
                    })
                  }>
                  <View style={styles.item} key={index}>
                    <Image
                      accessibilityRole={'image'}
                      source={{uri: item.imageUrl}}
                      style={styles.pic}
                    />
                    <Text style={styles.name}>{item.name}</Text>
                  </View>
                </TouchableWithoutFeedback>
              ))}
          </ScrollView>
        </Panel>
        <View style={styles.whiteSpace} />
        <Panel title="热门专业" tips="看看当下最流行的专业！">
          <Course hotSubject={hotSubject} navigation={navigation} />
        </Panel>
        <Panel title="案例分享" tips="以下案例均已获得用户授权">
          {hotCase && <Case data={hotCase} navigation={navigation} />}
        </Panel>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {},
  address_wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 60,
  },
  address: {
    fontSize: 16,
  },
  ipt_wrapper: {
    position: 'relative',
    marginTop: 15,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  ipt: {
    position: 'relative',
    zIndex: 1,
    marginLeft: 15,
    marginRight: 10,
    paddingHorizontal: 15,
    paddingVertical: Platform.OS === 'ios' ? 10 : 5,
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 20,
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
  dispatch =>
    bindActionCreators({homeInit, posInit, updateCurrCountry}, dispatch),
)(Home);
