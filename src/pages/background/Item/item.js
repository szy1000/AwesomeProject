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
  star = 0;
  linkToDetail = id => {
    const {navigation, title} = this.props;
    Jump.linkToPage({
      url: 'BackgroundDetail',
      navigation,
      params: {
        id,
        title,
      },
    });
  };

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
    const {styles, id, subject, gold, title} = this.props;

    return (
      <TouchableWithoutFeedback onPress={() => this.linkToDetail(id)}>
        <View style={[_styles.school, styles]}>
          <View style={_styles.school_wrapper}>
            <Text style={_styles.name} numberOfLines={1}>
              {title}
            </Text>
            <View style={_styles.content}>
              <Image source={require('./address.png')} style={_styles.addr} />
              <View style={{paddingRight: 15}}>
                <Text style={_styles.crowd}>{subject}</Text>
              </View>
            </View>
            <View style={_styles.content}>
              <Image source={require('./zan.png')} style={_styles.addr} />
              <Text style={_styles.crowd}>含金量：</Text>
              <View style={_styles.grade}>{this.calcStar(gold)}</View>
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
  // school_wrapper: {
  //   paddingBottom: 5,
  //   paddingLeft: 10,
  //   borderColor: '#f7f7f7',
  //   flex: 1,
  // },
  name: {
    marginBottom: 5,
    fontSize: 18,
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
    lineHeight: 18,
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
