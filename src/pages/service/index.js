import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {WhiteSpace, Item} from '../../components';
import Jump from '../../utils/jump';

export default class Service extends React.Component {
  linkTo = url => {
    const {navigation} = this.props;
    Jump.linkToPage({
      navigation,
      url,
    });
  };

  render() {
    return (
      <View>
        <Text>Service</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    fontSize: 20,
    // color: '#ddd',
  },
  title: {
    justifyContent: 'center',
  },
});
