import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Jump} from '../utils/index';
import Video from 'react-native-video';

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
        <Video
          resizeMode="contain"
          source={{
            uri:
              'http://47.114.151.211:8081/static//43f462a3-9e6e-4815-be7e-097d5a93057e-1600617839215023.mp4',
          }} // Can be a URL or a local file.
          controls
          ref={ref => {
            this.player = ref;
          }} // Store reference
          onBuffer={this.onBuffer} // Callback when remote video is buffering
          onError={this.videoError} // Callback when video cannot be loaded
          style={styles.backgroundVideo}
        />
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

  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: '50%',
    right: 0,
  },
});
