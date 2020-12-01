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
    const {navigation, name, nameEn, jiaotongRanking, imageUrl} = this.props;
    Jump.linkToPage({
      url: 'CaseList',
      navigation,
      params: {
        id,
        name,
        title: name,
        nameEn,
        jiaotongRanking,
        imageUrl,
      },
    });
  };
  render() {
    const {styles, id, name, nameEn, jiaotongRanking, imageUrl} = this.props;
    return (
      <TouchableWithoutFeedback onPress={() => this.linkToDetail(id)}>
        <View style={[_styles.school, styles]}>
          <Image style={_styles.logo} source={{uri: imageUrl}} />
          <View style={{flex: 1}}>
            <View style={_styles.school_wrapper}>
              <Text style={_styles.name} numberOfLines={1}>
                {name}
              </Text>
              <Text style={_styles.eng_name} numberOfLines={1}>
                {nameEn}
              </Text>
            </View>
            <View style={_styles.ranking_item}>
              <Text style={_styles.desc}>国内排名:</Text>
              <Text style={_styles.China}>{jiaotongRanking}</Text>
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
    width: 60,
    height: 60,
  },
  school_wrapper: {
    paddingBottom: 5,
    paddingLeft: 10,
  },
  name: {
    fontSize: 18,
  },
  eng_name: {
    marginTop: 5,
    marginBottom: 3,
    color: '#999999',
  },

  ranking_item: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  desc: {
    marginHorizontal: 8,
    color: '#666666',
  },
  China: {
    color: '#12a8cd',
    fontSize: 20,
  },
});
