import React from 'react';
import {
  Button,
  Text,
  View,
  TextInput,
  Switch,
  Image,
  StyleSheet,
  Share,
} from 'react-native';
import {WhiteSpace} from '../../components';
import ImagePicker from 'react-native-image-picker';

export default class EditInfo extends React.Component {
  state = {
    avatarSource: '',
    error: 'erroree',
  };
  getPhoto = async () => {
    const options = {
      title: 'Select Avatar',
      // customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'}],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    await ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);
      alert(1);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        alert(JSON.stringify(response));

        const source = {uri: response.uri};

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          avatarSource: source,
        });
      }
    }).catch(e => {
      this.setState({
        error: JSON.stringify(e),
      });
    });
  };

  onChange = e => {
    this.setState({
      value: e,
    });
  };

  onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'React Native | A framework for building native apps using React',
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  render() {
    const {navigation} = this.props;
    const {avatarSource, value, error} = this.state;
    return (
      <View>
        <Text>{avatarSource}</Text>
        <WhiteSpace size={'big'} />
        <Text style={styles.text}>Welcome To Page Setting</Text>
        {avatarSource.length > 0 && (
          <Image
            style={{width: '80%', height: 200, resizeMode: 'contain'}}
            source={avatarSource}
          />
        )}

        <Switch value={value} onValueChange={e => this.onChange(e)} />
        <Button title={'select'} onPress={this.getPhoto} />
        <Button title={'share'} onPress={this.onShare} />
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
