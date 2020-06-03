import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
export default class RepositoryDetail extends React.Component {
  state = {
    keys: '',
  };

  render() {
    const {keys} = this.state;
    return (
      <View style={styles.repository}>
        <Text>sss</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  repository: {},
  selectArea: {
    paddingTop: 10,
    backgroundColor: '#fff',
  },
});
