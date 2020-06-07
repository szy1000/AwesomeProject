import React from 'react';
import {
  Text,
  Image,
  View,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';
import Jump from '../../../../utils/jump';
export default class Item extends React.Component {
  componentDidMount() {
    // const {
    //   route:
    // } = this.props;
    // console.log(params);
  }

  linkTo = id => {
    const {navigation} = this.props;
    Jump.linkToPage({
      navigation,
      url: 'GroupDetail',
      params: {
        id,
      },
    });
  };

  render() {
    return (
      <TouchableWithoutFeedback onPress={() => this.linkTo(1)}>
        <View style={styles.item}>
          <View>
            <Image
              style={styles.msg}
              accessibilityRole={'image'}
              source={require('./pic62.png')}
            />
            <Text style={styles.count}>3</Text>
          </View>
          <View style={styles.content}>
            <View>
              <Text style={styles.title}>疫情下，如何在加安心学习？</Text>
              <View style={styles.info}>
                <Image style={styles.avatar} source={require('./avatar.png')} />
                <Text style={styles.name}>城北以南</Text>
                <Text style={styles.date}>3-16更新</Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  list: {
    margin: 15,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  item: {
    padding: 15,
    flexDirection: 'row',
  },

  msg: {
    width: 15,
    height: 13,
    resizeMode: 'contain',
  },
  count: {
    color: '#bbb',
  },

  content: {
    marginLeft: 15,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    textAlignVertical: 'top',
  },

  info: {
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 20,
    height: 20,
    borderRadius: 10,
    resizeMode: 'contain',
    overflow: 'hidden',
  },
  name: {
    marginHorizontal: 10,
    color: '#aaa',
  },
  date: {
    color: '#ccc',
  },
});
