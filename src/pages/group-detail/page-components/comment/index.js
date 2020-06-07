import React from 'react';
import {
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';
import {SearchInput} from '../../../../components';

export default class GroupDetail extends React.Component {
  state = {
    thumbUp: false,
    collect: false,
  };

  handleState = name => {
    this.setState({
      [name]: !this.state[name],
    });
  };

  render() {
    const {thumbUp, collect} = this.state;
    return (
      <View style={styles.comment}>
        <SearchInput style={styles.ipt} placeholder={'写回复'} />
        <TouchableWithoutFeedback onPress={() => this.handleState('thumbUp')}>
          <Image
            style={styles.img}
            source={thumbUp ? require('./thumb-on.png') : require('./zan.png')}
          />
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => this.handleState('collect')}>
          <Image
            style={styles.img}
            source={
              collect ? require('./collect-on.png') : require('./collect.png')
            }
          />
        </TouchableWithoutFeedback>
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
