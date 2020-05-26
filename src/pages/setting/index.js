import React from 'react';
import {Button, Text, View, TextInput, Image, StyleSheet} from 'react-native';
// import {Tab} from '../../components';
import {Link} from '@react-navigation/native';
import ImagePicker from 'react-native-image-picker';

export default class Setting extends React.Component {
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
      alert(1)

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        alert(JSON.stringify(response))

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
  render() {
    const {navigation} = this.props;
    const {avatarSource, error} = this.state;
    return (
      <View>
        <Text>{avatarSource}</Text>
        <Text style={styles.text}>Welcome To Page Setting</Text>
        {avatarSource.length > 0 && (
          <Image
            style={{width: '80%', height: 200, resizeMode: 'contain'}}
            source={avatarSource}
          />
        )}
        <Button title={'select'} onPress={this.getPhoto} />
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
