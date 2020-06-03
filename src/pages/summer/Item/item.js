import React from 'react';
import {
  View,
  Image,
  TouchableWithoutFeedback,
  Text,
  StyleSheet,
} from 'react-native';
import Jump from '../../../utils/jump';
export default class Item extends React.Component {
  linkToDetail = id => {
    const {navigation} = this.props;
    Jump.linkToPage({
      url: 'SummerDetail',
      navigation,
      params: {
        id,
      },
    });
  };
  render() {
    const {styles} = this.props;
    return (
      <TouchableWithoutFeedback onPress={() => this.linkToDetail(1)}>
        <View style={[_styles.school, styles]}>
          <Image style={_styles.logo} source={require('./pic18.png')} />
          <View style={_styles.school_wrapper}>
            <View>
              <Text style={_styles.name} numberOfLines={1}>
                安德鲁斯大学
              </Text>
            </View>
            <View>
              <View style={_styles.ranking}>
                <View style={_styles.ranking_item}>
                  <Image style={_styles.icon} source={require('./time.png')} />
                  <Text style={_styles.desc}>全年招生</Text>
                </View>
                <View style={_styles.ranking_item}>
                  <Image
                    style={_styles.icon}
                    source={require('./address.png')}
                  />
                  <Text style={_styles.desc}>实地</Text>
                </View>
              </View>
              <Text style={_styles.result}>预期成果：科研经历+项目证明</Text>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const _styles = StyleSheet.create({
  school: {
    // margin: 15,
    paddingTop: 15,
    paddingLeft: 15,
    paddingBottom: 15,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  logo: {
    width: 110,
    height: 72,
  },
  school_wrapper: {
    paddingLeft: 15,
    justifyContent: 'space-between',
    height: 72,
    flex: 1,
    // backgroundColor: 'red'
  },
  name: {
    fontSize: 18,
  },
  ranking: {
    // paddingTop: 15,
    paddingLeft: 10,
    flexDirection: 'row',
  },
  ranking_item: {
    flexDirection: 'row',
    // width: '50%',
  },
  icon: {
    width: 14,
    height: 14,
    resizeMode: 'contain',
  },
  desc: {
    marginLeft: 8,
    color: '#666666',
  },
  result: {
    marginTop: 10,
    color: '#666666',
  },
});
