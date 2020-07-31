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
      url: 'CaseDetail',
      navigation,
      params: {
        id,
      },
    });
  };
  render() {
    const {styles, title, description, id} = this.props;
    return (
      <TouchableWithoutFeedback onPress={() => this.linkToDetail(id)}>
        <View style={[_styles.school, styles]}>
          <View>
            <Text style={_styles.name} numberOfLines={1}>
              {title}
            </Text>
            <Text style={_styles.eng_name} numberOfLines={1}>
              {description}
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const _styles = StyleSheet.create({
  school: {
    margin: 15,
    marginBottom: 0,
    paddingTop: 20,
    paddingLeft: 20,
    paddingBottom: 20,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 5,
  },

  name: {
    fontSize: 18,
    fontWeight: '500',
  },
  eng_name: {
    marginTop: 5,
    marginBottom: 3,
    color: '#999999',
  },
});
