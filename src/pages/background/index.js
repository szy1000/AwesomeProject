import React from 'react';
import {Button, Text, View, TextInput, StyleSheet} from 'react-native';
// import {Tab} from '../../components';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

const TopTab = createMaterialTopTabNavigator();

const Item1 = () => (
  <View>
    <Text>Item1</Text>
  </View>
);

const Item2 = () => (
  <View>
    <Text>Item2</Text>
  </View>
);

export default class BBS extends React.Component {
  render() {
    const {navigation} = this.props;
    return (
      <View>
        <Text style={styles.text}>Welcome To Page BBS</Text>
        <TextInput
          style={{
            width: 200,
            height: 40,
          }}
          placeholder="请输入"
          onChangeText={text => {
            navigation.setParams({
              iTitle: text,
            });
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    // color: '#ddd',
  },
});
