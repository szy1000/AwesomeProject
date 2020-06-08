import React from 'react';
import {Button, Text, View, Image, StyleSheet, Share} from 'react-native';
import Item from './item';
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
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
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

  render() {
    const {avatarSource} = this.state;
    return (
      <View>
        <Item
          title="头像"
          extra={
            <Image style={styles.select} source={require('./logo.jpeg')} />
          }
          clickFn={this.getPhoto}
        />
        <Item title="昵称" extra={<Text>你好</Text>} clickFn={() => alert(1)} />
        <Item title="微信号" extra={<Text>123456</Text>} />
        <Item title="性别" extra={<Text>男女</Text>} />
        <Item title="地区" extra={<Text>上海</Text>} />
        <Item title="个性签名" extra={<Text>你好</Text>} />
        {avatarSource.length > 0 && (
          <Image
            style={{width: '80%', height: 200, resizeMode: 'contain'}}
            source={avatarSource}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  select: {
    width: 50,
    height: 50,
  },
});
