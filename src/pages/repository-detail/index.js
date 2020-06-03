import React from 'react';
import {View, Text, Platform, StyleSheet} from 'react-native';
import {Banner} from './page-components';
export default class RepositoryDetail extends React.Component {
  state = {};

  render() {
    return (
      <View style={styles.repositoryDetail}>
        <Text style={{height: 90}}>sss</Text>
        <Banner />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  repositoryDetail: {
    // paddingTop: Platform.OS && 30,
  },
});
