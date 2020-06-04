import React from 'react';
import {
  View,
  Image,
  TouchableWithoutFeedback,
  Text,
  StyleSheet,
} from 'react-native';
import Jump from '../../../../utils/jump';

export default class Item extends React.Component {
  linkToDetail = id => {
    const {navigation} = this.props;
    Jump.linkToPage({
      url: 'CaseList',
      navigation,
      params: {
        id,
      },
    });
  };
  render() {
    const {styles} = this.props;
    return (
      <TouchableWithoutFeedback onPress={() => this.linkToDetail(1)}>
        <View style={[_styles.item, styles]}>
          <Image style={_styles.logo} source={require('./pic25.png')} />
          <Text style={_styles.name} numberOfLines={1}>
            话语乐坛
          </Text>
          <Text style={_styles.update}>47更新</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const _styles = StyleSheet.create({
  item: {
    padding: 15,
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  logo: {
    width: 30,
    height: 30,
  },
  name: {
    flex: 1,
    marginLeft: 15,
    fontSize: 16,
  },
  update: {
    fontSize: 12,
    color: '#666',
  },
});
