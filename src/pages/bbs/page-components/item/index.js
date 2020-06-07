import React from 'react';
import {View, Image, TouchableOpacity, StyleSheet, Text} from 'react-native';
import Jump from '../../../../utils/jump';
export default class Item extends React.Component {
  calcIcon = index => {
    switch (index) {
      case 0:
        return <Image style={styles.icon} source={require('./pic0.png')} />;
      case 1:
        return <Image style={styles.icon} source={require('./pic1.png')} />;
      case 2:
        return <Image style={styles.icon} source={require('./pic2.png')} />;
      default:
        return <Text style={styles.icon}>{index + 1}</Text>;
    }
  };

  linkTo = id => {
    const {navigation} = this.props;
    Jump.linkToPage({
      navigation,
      url: 'Group',
      payload: {
        id,
      },
    });
  };
  render() {
    const {list = [], navigation} = this.props;
    return (
      <View>
        {list.map((v, index) => (
          <View style={styles.item}>
            <View>{this.calcIcon(index)}</View>
            <View style={styles.content}>
              <TouchableOpacity
                style={styles.nameAndAvatar}
                onPress={() => this.linkTo(index)}>
                <Image style={styles.avatar} source={require('./pic49.png')} />
                <View style={styles.titleBox}>
                  <Text style={styles.title}>美国留学大本营</Text>
                  <View style={styles.count}>
                    <Image
                      style={styles.badge}
                      source={require('./pic58.png')}
                    />
                    <Text style={styles.subTitle}>67位成员</Text>
                    <Image
                      style={[styles.badge, styles.next]}
                      source={require('./pic59.png')}
                    />
                    <Text style={styles.subTitle}>41内容记录</Text>
                  </View>
                </View>
                <View style={styles.btnWrapper}>
                  <TouchableOpacity style={styles.btn}>
                    <Text style={styles.txt}>加入</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
              <Text style={styles.desc}>
                分享美国高中&香港&英国硕士生活和申请相关学历和申请相关学历
              </Text>
            </View>
          </View>
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    paddingVertical: 10,
    marginHorizontal: 10,
    flexDirection: 'row',
    borderBottomColor: '#f0f0f0',
    borderBottomWidth: 1,
  },
  icon: {
    marginRight: 10,
    width: 26,
    height: 31,
    textAlign: 'center',
    resizeMode: 'contain',
  },
  content: {
    flex: 1,
  },
  nameAndAvatar: {
    flexDirection: 'row',
  },
  avatar: {
    marginRight: 10,
    marginBottom: 10,
    width: 40,
    height: 40,
  },
  titleBox: {
    marginBottom: 10,
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: '400',
  },
  count: {
    flexDirection: 'row',
  },
  subTitle: {
    color: '#666666',
    fontSize: 13,
  },
  badge: {
    width: 12,
    height: 12,
    marginRight: 5,
  },
  next: {
    marginLeft: 10,
  },

  btnWrapper: {
    marginTop: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  btn: {
    width: 58,
    height: 26,
    color: '#14a4c8',
    backgroundColor: '#e7f6fa',
    borderWidth: 1,
    borderColor: '#14a4c8',
    borderRadius: 13,
    alignItems: 'center',
  },
  txt: {
    color: '#14a4c8',
    lineHeight: 26,
    textAlign: 'center',
  },
  desc: {
    padding: 10,
    backgroundColor: '#f3f3f6',
    color: '#666666',
  },
});
