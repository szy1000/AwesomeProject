import React from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  ScrollView,
  Button,
  Alert,
  TouchableWithoutFeedback,
} from 'react-native';
import data from './regionJson';
export default class CityPicker extends React.Component {
  state = {
    visible: false,
  };
  async componentDidMount() {
    // console.log(data);
    const data = await require('./regionJson');
    console.log(data)
    // this.timer = setTimeout(() => {
    //   Jump.resetToHome(this.props);
    // }, 2000);
  }

  componentWillUnmount() {
    this.timer && clearInterval(this.timer);
  }

  render() {
    const {visible} = this.props;
    if (!visible) {
      return null;
    }
    return (
      <View style={styles.overlay}>
        <TouchableWithoutFeedback
          onPress={() => this.setState({visible: false})}>
          <View style={styles.bg} />
        </TouchableWithoutFeedback>
        <View style={styles.content}>
          <Text>title</Text>
          <ScrollView style={{flex: 1}}>
            <View>
              <Text>1</Text>
            </View>
            <View>
              <Text>2</Text>
            </View>
            <View>
              <Text>3</Text>
            </View>
            <View>
              <Text>4</Text>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(178,178,178,0.8)',
  },

  bg: {
    position: 'absolute',
    zIndex: 1,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'red',
  },
  content: {
    position: 'absolute',
    zIndex: 10,
    width: '100%',
    bottom: 0,
    height: 500,
    backgroundColor: '#fff',
  },

  container: {
    // flex: 1,
    // backgroundColor: '',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  ssss: {
    position: 'absolute',
    bottom: 0,
  },

  btnBox: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    height: 40,
    backgroundColor: 'red',
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: '50%',
    right: 0,
  },
});
