import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
export default class Index extends React.Component {
  render() {
    const {styles} = this.props;
    return (
      <View style={[_styles.school, styles]}>
        <View style={_styles.school_wrapper}>
          <View style={_styles.content}>
            <Image source={require('./address.png')} style={_styles.addr} />
            <Text style={_styles.crowd}>适合8年纪以下儿童参加</Text>
          </View>
          <View style={_styles.content}>
            <Image source={require('./zan.png')} style={_styles.addr} />
            <Text style={_styles.crowd}>含金量：</Text>
            <View style={_styles.grade}>
              <Image style={_styles.icon} source={require('./pic29.png')} />
              <Image style={_styles.icon} source={require('./pic29.png')} />
              <Image style={_styles.icon} source={require('./pic29.png')} />
            </View>
          </View>
        </View>
      </View>
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
  content: {
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  crowd: {
    marginLeft: 10,
    color: '#666666',
    fontSize: 14,
  },

  addr: {
    width: 13,
    height: 14,
  },

  grade: {
    flexDirection: 'row',
  },
  icon: {
    marginHorizontal: 5,
    width: 14,
    height: 14,
  },
});
