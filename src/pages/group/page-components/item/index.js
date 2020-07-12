import React, {Fragment} from 'react';
import {
  Text,
  Image,
  View,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';
import Jump from '../../../../utils/jump';
export default class Item extends React.Component {
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
    const {
      title,
      content,
      id,
      user,
      commentCount,
      updateTime,
    } = this.props;
    return (
      <TouchableWithoutFeedback onPress={() => this.linkTo(id)}>
        <View style={styles.item}>
          <View>
            <Image
              style={styles.msg}
              accessibilityRole={'image'}
              source={require('./pic62.png')}
            />
            <Text style={styles.count}>{commentCount || 0}</Text>
          </View>
          <View style={styles.content}>
            <View>
              <Text style={styles.title}>{title || content}</Text>
              <View style={styles.info}>
                {user && (
                  <Fragment>
                    <Image
                      style={styles.avatar}
                      source={{uri: user.avatarUrl}}
                    />
                    <Text style={styles.name}>{user.userName}</Text>
                  </Fragment>
                )}
                <Text style={styles.date}>
                  {updateTime && updateTime.toString().split(' ')[0]}更新
                </Text>
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
