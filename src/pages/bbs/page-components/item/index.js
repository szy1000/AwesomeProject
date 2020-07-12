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
        return <Text style={styles.iconText}>{index + 1}</Text>;
    }
  };

  linkTo = id => {
    const {navigation} = this.props;
    Jump.linkToPage({
      navigation,
      url: 'Group',
      params: {
        id,
      },
    });
  };
  render() {
    const {list = [], toggleJoinFn, navigation} = this.props;
    return (
      <View>
        {list.map((v, index) => (
          <View style={styles.item} key={index}>
            <View>{this.calcIcon(index)}</View>
            <View style={styles.content}>
              <TouchableOpacity
                style={styles.nameAndAvatar}
                onPress={() => this.linkTo(v.id)}>
                <Image style={styles.avatar} source={{uri: v.image}} />
                <View style={styles.titleBox}>
                  <Text style={styles.title}>{v.name}</Text>
                  <View style={styles.count}>
                    <Image
                      style={styles.badge}
                      source={require('./pic58.png')}
                    />
                    <Text style={styles.subTitle}>{v.userCount}位成员</Text>
                    <Image
                      style={[styles.badge, styles.next]}
                      source={require('./pic59.png')}
                    />
                    <Text style={styles.subTitle}>
                      {v.discussionCount}内容记录
                    </Text>
                  </View>
                </View>
                <View style={styles.btnWrapper}>
                  {v.join ? (
                    <TouchableOpacity
                      style={styles.btn}
                      onPress={() => toggleJoinFn(v.id, false)}>
                      <Text style={styles.txt}>已加入</Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      style={styles.unjoin}
                      onPress={() => toggleJoinFn(v.id, true)}>
                      <Text style={styles.txt}>未加入</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </TouchableOpacity>
              <Text style={styles.desc}>{v.description}</Text>
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
    resizeMode: 'contain',
  },
  iconText: {
    marginRight: 10,
    width: 26,
    height: 31,
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

  unjoin: {
    width: 58,
    height: 26,
    color: '#14a4c8',
    // backgroundColor: '#e7f6fa',
    borderWidth: 1,
    borderColor: '#14a4c8',
    borderRadius: 13,
    alignItems: 'center',
  },
  desc: {
    padding: 10,
    backgroundColor: '#f3f3f6',
    color: '#666666',
  },
});
