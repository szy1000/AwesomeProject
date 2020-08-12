import React from 'react';
import {
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  StyleSheet,
  TextInput,
} from 'react-native';
import {SearchInput} from '../../../../components';

export default class GroupDetail extends React.Component {
  state = {
    content: '',
  };
  changeValue = e => {
    this.setState({
      content: e,
    });
  };

  blurFn = () => {
    this.setState({
      content: '',
    });
    this.props.commentNoteFn(this.state.content);
  };

  render() {
    const {
      starCount,
      favoriteCount,
      actionAll: {favorite, star},
    } = this.props;

    return (
      <View style={styles.comment}>
        <SearchInput
          style={styles.ipt}
          placeholder="写回复"
          value={this.state.content}
          onChangeText={e => this.changeValue(e)}
          returnKeyLabel="send"
          returnKeyType="send"
          onSubmitEditing={this.blurFn}
        />
        <TouchableWithoutFeedback onPress={this.props.starNoteFn}>
          <Image
            style={styles.img}
            source={star ? require('./thumb-on.png') : require('./zan.png')}
          />
        </TouchableWithoutFeedback>
        <Text>{starCount}</Text>
        <TouchableWithoutFeedback onPress={this.props.favoriteNoteFn}>
          <Image
            style={styles.img}
            source={
              favorite ? require('./collect-on.png') : require('./collect.png')
            }
          />
        </TouchableWithoutFeedback>
        <Text>{favoriteCount}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  comment: {
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
