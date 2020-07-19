import React from 'react';
import {
  Text,
  ActivityIndicator,
  View,
  Button,
  Image,
  TextInput,
  StyleSheet,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

import AsyncStorage from '@react-native-community/async-storage';

import Item from './item';
import ImagePicker from 'react-native-image-picker';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {editInfoInit, uploadFileFn, saveInfo, saveTempInfo} from './redux';

class EditInfo extends React.Component {
  constructor(props) {
    super(props);
    this.id = '';
  }
  state = {
    avatarSource: '',
    error: 'erroree',
  };

  async componentDidMount(): void {
    this.id = await AsyncStorage.getItem('sid');
    this.props.editInfoInit(this.id);
  }

  getPhoto = async () => {
    const options = {
      title: '选择头像',
      takePhotoButtonTitle: '相机',
      chooseFromLibraryButtonTitle: '图库',
      cancelButtonTitle: '取消',
      quality: 0.5,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    await ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const {uri, type, data} = response;
        const source = {uri: response.uri};
        this.setState(
          {
            avatarSource: source,
          },
          () => {
            this.props.uploadFileFn({
              fileName: uri.split('images/')[1],
              dataUrl: `data:${type};base64,${data}`,
            });
          },
        );
      }
    }).catch(e => {
      this.setState({
        error: JSON.stringify(e),
      });
    });
  };

  save = () => {
    this.props.saveInfo({}, () => this.props.editInfoInit(this.id));
  };

  render() {
    const {avatarSource} = this.state;
    const {init, data} = this.props;
    if (!init) {
      return <ActivityIndicator style={{marginTop: 30}} />;
    }
    const {address, avatarUrl, personalSignature, sex, userName} = data;
    const _avatar = avatarUrl
      ? {uri: avatarUrl}
      : avatarSource.uri
      ? avatarSource
      : require('./logo.jpeg');
    console.log(_avatar);
    return (
      <View>
        <Item
          title="头像"
          extra={<Image style={styles.select} source={_avatar} />}
          clickFn={this.getPhoto}
        />
        <Item
          title="昵称"
          extra={
            <TextInput
              value={userName}
              onChangeText={e => this.props.saveTempInfo({userName: e})}
            />
          }
        />
        <Item title="微信号" extra={<Text>123456</Text>} />
        <RNPickerSelect
          onValueChange={value => this.props.saveTempInfo({sex: value})}
          placeholder={{value: '男'}}
          doneText="确定"
          items={[{label: '男', value: '男'}, {label: '女', value: '女'}]}>
          <Item title="性别" extra={<Text>{sex || '未知'}</Text>} />
        </RNPickerSelect>
        <Item title="地区" extra={<Text>{address || '火星'}</Text>} />
        <Item
          title="个性签名"
          extra={
            <TextInput
              value={personalSignature}
              onChangeText={e =>
                this.props.saveTempInfo({personalSignature: e})
              }
            />
          }
        />

        <Button style={{marginTop: 30}} title="保存" onPress={this.save} />
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

export default connect(
  state => state.editInfo,
  dispatch =>
    bindActionCreators(
      {editInfoInit, uploadFileFn, saveInfo, saveTempInfo},
      dispatch,
    ),
)(EditInfo);
