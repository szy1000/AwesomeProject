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
import Jump from '../../utils/jump';
import Tools from '../../utils/tool';

class EditInfo extends React.Component {
  constructor(props) {
    super(props);
    this.id = '';
  }
  state = {
    avatarSource: '',
    error: 'erroree',
    sex: '',
  };

  componentDidMount(): void {
    this.didFocusListener = this.props.navigation.addListener(
      'focus',
      async () => {
        this.id = await AsyncStorage.getItem('sid');
        this.props.editInfoInit(this.id);
      },
    );
  }

  componentWillUnmount(): void {
    this.didFocusListener.removeEventListener &&
      this.didFocusListener.removeEventListener();
  }

  getPhoto = async () => {
    const options = {
      title: '选择头像',
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
          async () => {
            await this.props.uploadFileFn({
              fileName: uri.split('images/')[1],
              dataUrl: `data:${type};base64,${data}`,
            });

            await this.props.saveInfo({});

            await this.props.editInfoInit(this.id);

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
    this.props.saveInfo({}, () => {
      // this.props.editInfoInit(this.id);
      Jump.linkToPage({
        url: 'My',
        navigation: this.props.navigation,
      });
    });
  };

  render() {
    const {avatarSource} = this.state;
    const {init, data} = this.props;
    if (!init) {
      return <ActivityIndicator style={{marginTop: 30}} />;
    }
    const {
      address,
      avatarUrl,
      personalSignature,
      sex,
      userName,
      _sexDict,
    } = data;
    let _sex = null;
    for (let i = 0; i < _sexDict.length; i++) {
      if (sex === _sexDict[i].id) {
        _sex = _sexDict[i].label;
      }
    }
    const _avatar = avatarUrl
      ? {uri: avatarUrl}
      : avatarSource.uri
      ? avatarSource
      : require('../../assets/images/logo.jpeg');
    console.log('_avatar', _avatar);

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
              returnKeyType="done"
              returnKeyLabel="done"
              allowFontScaling={false}
              onChangeText={e => this.props.saveTempInfo({userName: e})}
            />
          }
        />
        {/*<Item title="微信号" extra={<Text>123456</Text>} />*/}
        <RNPickerSelect
          onValueChange={value => {
            if (value === null) {
              return;
            }
            this.props.saveTempInfo({
              sexId: value || sex,
              sex: value,
            });
          }}
          placeholder={{
            label: '',
            value: null,
          }}
          doneText="确定"
          items={_sexDict}>
          <Item title="性别" extra={<Text>{_sex || sex}</Text>} />
        </RNPickerSelect>
        <Item title="地区" extra={<Text>{address || '火星'}</Text>} />
        <Item
          title="个性签名"
          extra={
            <TextInput
              value={personalSignature}
              allowFontScaling={false}
              returnKeyType="done"
              returnKeyLabel="done"
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
