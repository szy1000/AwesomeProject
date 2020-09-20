import React from 'react';
import {
  ScrollView,
  Image,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  Alert,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {uploadFileFn, submitNote, posInit} from './redux';
import Jump from '../../utils/jump';
import GetLocation from 'react-native-get-location';

class Note extends React.Component {
  location = '点击添加地址';
  state = {
    title: '',
    content: '',
    imgArr: [require('./png.png')],
    avatarSourceMap: [],
    loading: false,
  };

  getPhoto = async () => {
    this.setState({
      loading: true,
    });
    const options = {
      // todo
      mediaType: 'mixed',
      durationLimit: '120',
      title: '选择照片',
      quality: 0.1,
      cancelButtonTitle: '取消',
      takePhotoButtonTitle: '相机',
      chooseFromLibraryButtonTitle: '图库',
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
        const source = {uri: response.uri};
        const {uri, type, data} = response;
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        const {avatarSourceMap} = this.state;
        avatarSourceMap.push(source);

        console.log('Response = ', response);

        this.props.uploadFileFn(
          {
            fileName: uri.split('images/')[1],
            dataUrl: `data:${type};base64,${data}`,
          },
          () => {
            console.log('this', this);
            this.setState({
              avatarSourceMap: [...avatarSourceMap],
            });
          },
        );
      }
      this.setState({
        loading: false,
      });
    });
  };

  handleChange = (key, value) => {
    this.setState({
      [key]: key === 'content' ? value : value.trim(),
    });
  };

  getPos = async () => {
    await GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then(location => {
        const {latitude, longitude} = location;
        this.props.posInit({
          location: `${latitude},${longitude}`,
          key: '543BZ-AKDC4-KPJUK-DMXNP-GGGVO-63FJU',
        });
      })
      .catch(error => {
        const {code, message} = error;
        // this.homeInit();
        console.log('sssxxxx', code, message);
      });
  };

  submitNoteFn = () => {
    const {title, content} = this.state;
    if (title && content && this.location) {
      this.props.submitNote(
        {
          title,
          content,
          location: this.location,
        },
        () =>
          Jump.linkToPage({
            navigation: this.props.navigation,
            url: 'Find',
          }),
      );
    } else {
      Alert.alert('操作提示', '标题，正文和地理位置不能为空', [
        {
          text: '确认',
          onPress: async () => {},
        },
      ]);
    }
  };
  render() {
    const {title, content, loading, avatarSourceMap} = this.state;
    const {currPos} = this.props.data;
    if (currPos) {
      const {
        address_component: {nation},
        address,
      } = currPos;
      this.location = nation + address;
    }
    console.log(currPos);
    return (
      <ScrollView style={styles.note}>
        <View style={styles.imgWrapper}>
          {avatarSourceMap.map((v, index) => {
            return (
              <View key={index} keys={index}>
                <Image style={styles.pic} source={v} />
              </View>
            );
          })}
          {avatarSourceMap.length < 9 && (
            <>
              {loading ? (
                <Image
                  style={{
                    marginVertical: 32,
                    marginHorizontal: 25,
                    width: 30,
                    height: 30,
                    marginBottom: 10,
                    resizeMode: 'cover',
                  }}
                  source={require('./loading.gif')}
                />
              ) : (
                <TouchableOpacity onPress={this.getPhoto}>
                  <Image style={styles.pic} source={require('./png.png')} />
                </TouchableOpacity>
              )}
            </>
          )}
        </View>
        <View style={styles.iptArea}>
          <TextInput
            style={styles.title}
            value={title}
            returnKeyLabel="done"
            returnKeyType="done"
            numberOfLines={1}
            onChangeText={e => this.handleChange('title', e)}
            placeholder={'填写标题会有很多赞哦'}
          />
          <TextInput
            style={styles.content}
            multiline={true}
            textAlignVertical="top"
            value={content}
            onChangeText={e => this.handleChange('content', e)}
            placeholder={'添加正文'}
          />
        </View>
        <TouchableWithoutFeedback onPress={this.getPos}>
          <View style={styles.address}>
            <Image
              style={styles.addressIcon}
              source={require('./address.png')}
            />
            <Text style={styles.text}>{this.location}</Text>
            <Image style={styles.more} source={require('./more.png')} />
          </View>
        </TouchableWithoutFeedback>
        <TouchableOpacity style={styles.submit} onPress={this.submitNoteFn}>
          <Text style={styles.txt}>发布笔记</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

export default connect(
  state => state.note,
  dispatch => bindActionCreators({uploadFileFn, submitNote, posInit}, dispatch),
)(Note);

const styles = StyleSheet.create({
  note: {
    backgroundColor: '#fff',
    flex: 1,
  },
  imgWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: 30,
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  pic: {
    marginRight: 10,
    width: 88,
    height: 94,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  iptArea: {
    paddingHorizontal: 10,
  },
  title: {
    paddingVertical: 10,
    fontSize: 24,
    borderBottomColor: '#f0f0f0',
    borderBottomWidth: 1,
  },
  content: {
    paddingVertical: 10,
    minHeight: 200,
    fontSize: 20,
  },
  address: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderTopColor: '#f0f0f0',
    borderBottomColor: '#f0f0f0',
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  addressIcon: {
    width: 12,
    height: 14,
  },

  text: {
    marginLeft: 10,
    flex: 1,
    fontSize: 15,
  },
  more: {
    width: 7,
    height: 12,
  },
  submit: {
    marginTop: 100,
    alignItems: 'center',
    marginHorizontal: 15,
    height: 50,
    backgroundColor: '#12a8cd',
    borderRadius: 5,
  },
  txt: {
    color: '#fff',
    fontSize: 20,
    lineHeight: 50,
  },
});
