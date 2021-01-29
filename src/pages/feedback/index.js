import React from 'react';
import {
  View,
  TextInput,
  Image,
  TouchableWithoutFeedback,
  StyleSheet,
  Button,
} from 'react-native';
import {Item} from '../../components';
import ImagePicker from 'react-native-image-picker';
import AsyncStorage from '@react-native-community/async-storage';
import Jump from '../../utils/jump';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {submitFeedback, uploadFileFn} from './redux';

class Feedback extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    avatarSource: '',
    error: 'erroree',
    avatarSourceMap: [],
    phoneNumber: '',
  };
  getPhoto = async () => {
    const options = {
      title: '选择图片',
      takePhotoButtonTitle: '相机',
      chooseFromLibraryButtonTitle: '图库',
      cancelButtonTitle: '取消',
      quality: 0.3,
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
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        const {uri, type, data} = response;
        const source = {uri: response.uri};
        const {avatarSourceMap} = this.state;
        avatarSourceMap.push(source);

        this.setState(
          {
            avatarSourceMap: [...avatarSourceMap],
          },
          () => {
            this.props.uploadFileFn({
              fileName: uri.split('images/')[1],
              dataUrl: `data:${type};base64,${data}`,
            });
          },
        );
      }
    });
  };

  onChange = (key, value) => {
    this.setState({
      [key]: value,
    });
  };

  async componentDidMount(): void {
    const phoneNumber = await AsyncStorage.getItem('phoneNumber');
    this.setState({
      phoneNumber,
    });
  }

  submitFeed = () => {
    const {content, phoneNumber, contact = ''} = this.state;
    this.props.submitFeedback(
      {
        content,
        contact,
        phoneNumber,
      },
      () =>
        Jump.linkToPage({
          navigation: this.props.navigation,
          url: 'My',
        }),
    );
    // if (contact) {
    //
    // } else {
    //   alert('联系方式不能为空');
    // }
  };

  render() {
    // const {navigation} = this.props;
    const {content, avatarSourceMap, phoneNumber, contact} = this.state;
    return (
      <View style={styles.feedback}>
        <TextInput
          value={content}
          multiline={true}
          textAlignVertical="top"
          style={styles.ipt}
          onChangeText={e => this.onChange('content', e)}
          placeholder={'请输入反馈内容...'}
        />
        <View style={styles.imgWrapper}>
          {avatarSourceMap.length > 0 &&
            avatarSourceMap.map((v, index) => {
              return (
                <View key={index} keys={index}>
                  <Image style={styles.img} source={v} />
                </View>
              );
            })}

          {avatarSourceMap.length < 9 && (
            <TouchableWithoutFeedback onPress={this.getPhoto}>
              <Image
                style={styles.img}
                resizeMode="contain"
                source={require('./add.png')}
              />
            </TouchableWithoutFeedback>
          )}
        </View>
        <Item title={'联系方式'} more={false}>
          <TextInput
            style={styles.contact}
            placeholder={phoneNumber || 'QQ、邮箱、手机(选填)'}
            value={contact}
            returnKeyType="done"
            returnKeyLabel="done"
            onChangeText={e => this.onChange('contact', e)}
          />
        </Item>

        <Button style={styles.submit} onPress={this.submitFeed} title="发送" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  feedback: {
    backgroundColor: '#fff',
  },

  imgWrapper: {
    flexDirection: 'row',
  },
  img: {
    marginLeft: 15,
    marginBottom: 15,
    marginRight: 10,
    width: 88,
    height: 94,
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
  dispatch => bindActionCreators({submitFeedback, uploadFileFn}, dispatch),
)(Feedback);
