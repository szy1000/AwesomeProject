import React from 'react';
import {
  View,
  Image,
  TouchableWithoutFeedback,
  Text,
  StyleSheet,
} from 'react-native';
import Jump from '../../../../utils/jump';
export default class Panel extends React.Component {
  linkToDetail = id => {
    const {navigation} = this.props;
    Jump.linkToPage({
      url: 'RepositoryDetail',
      navigation,
      params: {
        id,
      },
    });
  };
  render() {
    const {title, children} = this.props;
    return (
      <View style={styles.panelBox}>
        <View style={styles.header}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
        </View>
        <View style={styles.content}>{children}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  panelBox: {
    marginTop: 15,
    marginHorizontal: 15,
    backgroundColor: '#fff',
  },
  header: {
    paddingTop: 15,
    paddingHorizontal: 15,
  },
  title: {fontSize: 18, fontWeight: '500'},
  content: {
    padding: 15,
    minHeight: 200,
  },
});
