import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
export default class Index extends React.Component {
  calcStar = gold => {
    let res = [];
    switch (gold) {
      case '一星':
        this.star = 1;
        break;
      // return <Image style={_styles.icon} source={require('./pic29.png')} />;
      case '二星':
        this.star = 2;
        break;
      case '三星':
        this.star = 3;
        break;
      case '四星':
        this.star = 4;
        break;
      case '五星':
        this.star = 5;
        break;
      default:
        this.star = 0;
    }
    for (let i = 0; i < this.star; i++) {
      res.push(<Image style={_styles.icon} source={require('./pic29.png')} />);
    }
    return res;
  };

  render() {
    const {styles} = this.props;
    const {subject, gold} = this.props;

    return (
      <View style={[_styles.school, styles]}>
        <View style={_styles.school_wrapper}>
          <View style={_styles.content}>
            <Image source={require('./address.png')} style={_styles.addr} />
            <View style={{paddingRight: 30}}>
              <Text style={_styles.crowd}>{subject}</Text>
            </View>

            {/*<View></View>*/}
          </View>
          <View style={_styles.content}>
            <Image source={require('./zan.png')} style={_styles.addr} />
            <Text style={_styles.crowd}>含金量：</Text>
            <View style={_styles.grade}>{this.calcStar(gold)}</View>
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
    paddingLeft: 10,
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
