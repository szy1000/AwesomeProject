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
      url: 'RepositoryDetail',
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
          <Image style={_styles.logo} source={require('./pic25.png')} />
          <View style={{flex: 1}}>
            <View style={_styles.school_wrapper}>
              <Text style={_styles.name} numberOfLines={1}>
                安德鲁斯大学
              </Text>
              <Text style={_styles.eng_name} numberOfLines={1}>
                Massachusetts Institute of Technology
              </Text>
              <Text style={_styles.address}>
                <Image source={require('./address.png')} style={_styles.addr} />
                马萨诸塞-波士顿
              </Text>
            </View>
            <View style={_styles.ranking}>
              <View style={_styles.ranking_item}>
                <Image style={_styles.icon} source={require('./pic20.png')} />
                <Text style={_styles.desc}>国内排名:</Text>
                <Text style={_styles.China}>3</Text>
              </View>
              <View style={_styles.ranking_item}>
                <Image style={_styles.icon} source={require('./pic21.png')} />
                <Text style={_styles.desc}>平均录取率：</Text>
                <Text style={_styles.average}>3%</Text>
              </View>
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
    borderBottomWidth: 1,
    borderColor: '#f7f7f7',
  },
  name: {
    fontSize: 18,
  },
  eng_name: {
    marginTop: 5,
    marginBottom: 3,
    color: '#999999',
  },
  addr: {
    paddingRight: 10,
    width: 5,
    height: 12,
  },
  address: {
    color: '#666666',
  },

  ranking: {
    paddingTop: 15,
    paddingLeft: 10,
    flexDirection: 'row',
  },
  ranking_item: {
    flexDirection: 'row',
    width: '50%',
    alignItems: 'center',
  },
  icon: {
    width: 14,
    height: 14,
  },
  desc: {
    marginHorizontal: 8,
    color: '#666666',
  },
  China: {
    color: '#12a8cd',
  },
  average: {
    color: '#ffa025',
  },
});
