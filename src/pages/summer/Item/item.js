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
    const {
      image,
      id,
      title,
      place,
      registrationEndTime,
      expectedResult,
      styles,
    } = this.props;
    return (
      <TouchableWithoutFeedback onPress={() => this.linkToDetail(id)}>
        <View style={[_styles.school, styles]}>
          <Image
            style={_styles.logo}
            source={image ? {uri: image} : require('./pic18.png')}
          />
          <View style={_styles.school_wrapper}>
            <View>
              <Text style={_styles.name} numberOfLines={1}>
                {title}
              </Text>
            </View>
            <View>
              <View style={_styles.ranking}>
                <View style={_styles.ranking_item}>
                  <Image style={_styles.icon} source={require('./time.png')} />
                  <Text numberOfLines={1} style={_styles.desc}>
                    {registrationEndTime && registrationEndTime.split(' ')[0]}
                    截止
                  </Text>
                </View>
                <View style={_styles.ranking_item}>
                  <Image
                    style={_styles.icon}
                    source={require('./address.png')}
                  />
                  <Text numberOfLines={1} style={_styles.desc}>
                    {place}
                  </Text>
                </View>
              </View>
              {expectedResult && (
                <Text numberOfLines={2} style={_styles.result}>
                  预期成果：{expectedResult}
                </Text>
              )}
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
    // paddingLeft: 10,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  ranking_item: {
    flexDirection: 'row',
    width: '48%',
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
