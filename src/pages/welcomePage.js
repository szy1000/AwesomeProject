import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Jump} from '../utils/index';

export default class WelcomePage extends React.Component {
  componentDidMount() {
    this.timer = setTimeout(() => {
      Jump.resetToHome(this.props);
    }, 2000);
  }

  componentWillUnmount() {
    this.timer && clearInterval(this.timer);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Welcome</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
