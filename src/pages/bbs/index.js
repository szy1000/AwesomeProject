import React from 'react';
import {Button, Text, View, TextInput, StyleSheet} from 'react-native';

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

        <Button
          title={'Go Back'}
          onPress={() => {
            navigation.navigate('Home');
          }}>
          返回
        </Button>
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
