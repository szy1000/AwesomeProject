import React from 'react';
import {
  View,
  Text,
  Button,
  KeyboardAvoidingView,
  TextInput,
  ScrollView,
  Dimensions,
  SafeAreaView,
  StyleSheet,
} from 'react-native';

import CityPicker from '../../components/CityPicker';

export default class Test extends React.Component {
  state = {
    visible: false,
  };

  componentDidMount(): void {
    // this.getCurrentPos();
  }

  render() {
    const {visible} = this.state;
    return (
      <View style={styles.test}>
        <Button onPress={() => this.setState({visible: true})} title="show" />
        <CityPicker visible={visible} />
        <Text>s</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  test: {
    flex: 1,
    // paddingTop: 80,
    backgroundColor: '#ccc',
  },
});
