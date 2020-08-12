import React from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';

export default class GroupDetail extends React.Component {
  state = {
    content: '',
  };

  saveValue = e => {
    this.setState({
      content: e,
    });
  };

  render() {
    const {content} = this.state;
    const {
      star,
      starCount,
      toggleThumbUpDis,
      toggleFavoriteDis,
      favorite,
      favoriteCount,
    } = this.props;
    return (
      <View style={styles.comment}>
        <TextInput
          style={styles.ipt}
          onEndEditing={() => {
            this.setState({content: ''});
            this.props.makeComment(content);
          }}
          placeholder={'写回复'}
          returnKeyType="send"
          returnKeyLabel="send"
          onChangeText={e => this.saveValue(e)}
          value={content}
        />
        <TouchableWithoutFeedback onPress={() => toggleThumbUpDis(star)}>
          <View style={{flexDirection: 'row'}}>
            <Image
              style={styles.img}
              source={star ? require('./thumb-on.png') : require('./zan.png')}
            />
            <Text>{starCount}</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => toggleFavoriteDis(favorite)}>
          <View style={{flexDirection: 'row'}}>
            <Image
              style={styles.img}
              source={
                favorite
                  ? require('./collect-on.png')
                  : require('./collect.png')
              }
            />
            <Text>{favoriteCount}</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  comment: {
    // position: 'absolute',
    paddingVertical: 15,
    paddingHorizontal: 15,
    flexDirection: 'row',
    borderTopColor: '#ddd',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  ipt: {
    marginRight: 15,
    flex: 1,
    borderColor: '#f7f7f7',
    borderWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 15,
  },
  img: {
    marginHorizontal: 15,
    width: 26,
    height: 26,
    resizeMode: 'contain',
  },
});
