import React from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  TextInput,
  ScrollView,
  Dimensions,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';

import {createStackNavigator} from '@react-navigation/stack';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const TabTop = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

const BBS = () => (
  <View>
    <Text>BBS</Text>
  </View>
);
const TabPanel = () => (
  <View>
    <Text>TabPanel</Text>
  </View>
);

const {width, height} = Dimensions.get('window');

export default class Test extends React.Component {
  state = {
    pos: '',
    content: '',
  };
  getCurrentPos = () => {
    Geolocation.getCurrentPosition(
      position => {
        alert(JSON.stringify(position));
      },
      error => {
        // See error code charts below.
        alert(JSON.stringify(error));
        console.warn(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
    // navigator.geolocation.getCurrentPosition(location => {
    //   this.setState({
    //     pos: location.toString(),
    //   });
    // });
  };

  componentDidMount(): void {
    // this.getCurrentPos();
  }

  render() {
    // const _height = height - 00
    const {content} = this.state;
    return (
      <KeyboardAwareScrollView>
        <View>
          <View style={{height: 600}}>
            <Text>sss</Text>
          </View>
          <Text>Common Component One</Text>
          <TextInput
            placeholder={'xxx'}
            value={content}
            onChangeText={e =>
              this.setState({
                content: e,
              })
            }
            onEndEditing={() =>
              this.setState({
                content: '',
              })
            }
            style={{
              borderWidth: 1,
              padding: 15,
              borderColor: 'blue',
            }}
          />
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  find: {
    // paddingTop: 80,
    backgroundColor: '#ccc',
  },
});
