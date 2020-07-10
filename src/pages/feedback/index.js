import React from 'react';
import {
  Text,
  View,
  TextInput,
  Image,
  TouchableWithoutFeedback,
  StyleSheet,
  Button,
} from 'react-native';
import {Item} from '../../components';
import ImagePicker from 'react-native-image-picker';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {submitFeedback} from './redux';

class Feedback extends React.Component {
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

  onChange = (key, value) => {
    this.setState({
      [key]: value,
    });
  };

  submitFeed = () => {
    const {value, contact} = this.state;
    console.warn(value, contact);
    this.props.submitFeedback({

    })
  };

  render() {
    const {navigation} = this.props;
    const {avatarSource, value, contact, error} = this.state;
    return (
      <View style={styles.feedback}>
        <TextInput
          value={value}
          multiline={3}
          style={styles.ipt}
          onChangeText={e => this.onChange('value', e)}
          placeholder={'请输入反馈内容...'}
        />
        <TouchableWithoutFeedback onPress={this.getPhoto}>
          <Image
            style={styles.img}
            resizeMode="contain"
            source={require('./add.png')}
          />
        </TouchableWithoutFeedback>
        <Item title={'联系方式'} more={false}>
          <TextInput
            style={styles.contact}
            placeholder="QQ、邮箱、手机(选填)"
            value={contact}
            onChangeText={e => this.onChange('contact', e)}
          />
        </Item>
        <Text>{avatarSource}</Text>

        {avatarSource.length > 0 && (
          <Image style={styles.addPhoto} source={avatarSource} />
        )}
        <Button style={styles.submit} onPress={this.submitFeed} title="发送" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  feedback: {
    backgroundColor: '#fff',
  },

  img: {
    marginLeft: 15,
    marginBottom: 15,
  },
  addPhoto: {
    width: '80%',
    height: 200,
    resizeMode: 'contain',
    backgroundColor: '#ccc',
  },
  ipt: {
    marginTop: 15,
    paddingVertical: 15,
    paddingHorizontal: 15,
    height: 200,
    // color: '#ddd',
  },
  submit: {
    marginTop: 30,
  },
});

export default connect(
  state => state.feedback,
  dispatch => bindActionCreators({submitFeedback}, dispatch),
)(Feedback);
