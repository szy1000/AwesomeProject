import React from 'react';
import {
  View,
  ScrollView,
  Platform,
  Image,
  Text,
  StyleSheet,
} from 'react-native';
import {Header, Banner} from './page-components';

export default class FindDetail extends React.Component {
  render() {
    return (
      <View style={styles.findDetail}>
        <ScrollView>
          <Header />
          <Banner />

        </ScrollView>
        <View style={styles.control}>
          <Text>sdssss</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  findDetail: {
    position: 'relative',
    paddingTop: Platform.OS === 'ios' ? 45 : 0,
    flex: 1,
  },
  control: {
    position: 'absolute',
    bottom: 0,
  },
});
