import React from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import Item from './item';
import ImagePicker from 'react-native-image-picker';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {editInfoInit} from './redux';
import {Loading} from '../../components';

class EditInfo extends React.Component {
  state = {
    avatarSource: '',
    error: 'erroree',
  };

  async componentDidMount(): void {
    const id = await AsyncStorage.getItem('sid');

    this.props.editInfoInit(id);
  }

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
    const {init, data} = this.props;
    if (!init) {
      return <Loading />;
    }
    const {address, avatarUrl, personalSignature, sex, userName} = data;
    return (
      <View>
        <Item
          title="头像"
          extra={
            <Image
              style={styles.select}
              source={
                avatarSource ? avatarSource : {uri: avatarUrl || ''}
                // avatarUrl ? {uri: avatarUrl || ''} :
              }
            />
          }
          clickFn={this.getPhoto}
        />
        <Item
          title="昵称"
          extra={<Text>{userName}</Text>}
          clickFn={() => alert(1)}
        />
        <Item title="微信号" extra={<Text>123456</Text>} />
        <Item title="性别" extra={<Text>{sex || '未知'}</Text>} />
        <Item title="地区" extra={<Text>{address || '火星'}</Text>} />
        <Item
          title="个性签名"
          extra={
            <Text>{personalSignature || '书写签名有助你认识更多好友'}</Text>
          }
        />
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

export default connect(
  state => state.editInfo,
  dispatch => bindActionCreators({editInfoInit}, dispatch),
)(EditInfo);
