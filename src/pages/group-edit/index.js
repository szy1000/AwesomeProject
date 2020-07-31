import React from 'react';
import {
  ScrollView,
  Image,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {groupEditInit, uploadFileFn} from './redux';
import Jump from '../../utils/jump';

class GroupEdit extends React.Component {
  state = {
    imgArr: [require('./png.png')],
    avatarSourceMap: [],
  };

  handleChange = (key, value) => {
    this.setState({
      [key]: value,
    });
  };

  submitGroupFn = () => {
    const {title, content} = this.state;
    if (title && content) {
      this.props.groupEditInit(
        {
          title,
          content,
          groupId: this.props.data.group.id,
        },
        () =>
          Jump.linkToPage({
            navigation: this.props.navigation,
            url: 'BBS',
          }),
      );
    } else {
      alert('标题，正文不能为空');
    }
  };

  getPhoto = async () => {
    const options = {
      title: '选择照片',
      cancelButtonTitle: '取消',
      takePhotoButtonTitle: '相机',
      chooseFromLibraryButtonTitle: '图库',
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
            this.setState({
              avatarSourceMap: [...avatarSourceMap],
              // imgArr: [...this.state.imgArr.unshift(source)],
            });
          },
        );
      }
    });
  };
  render() {
    // const {
    //   data: {group},
    // } = this.props;
    const {title, content, avatarSourceMap} = this.state;
    console.log('GroupEdit', this.props);
    return (
      <ScrollView style={styles.note}>
        <View style={styles.imgWrapper}>
          {avatarSourceMap.map((v, index) => {
            return (
              <View
                key={index}
                keys={index}
                // onPress={this.getPhoto}
              >
                <Image style={styles.pic} source={v} />
              </View>
            );
          })}
          {avatarSourceMap.length < 9 && (
            <TouchableOpacity onPress={this.getPhoto}>
              <Image style={styles.pic} source={require('./png.png')} />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.iptArea}>
          <TextInput
            style={styles.title}
            value={title}
            returnKeyLabel="done"
            returnKeyType="done"
            placeholder={'请输入一个完整的标题'}
            onChangeText={e => this.handleChange('title', e)}
          />
          <TextInput
            style={styles.content}
            multiline
            value={content}
            placeholder={'填加正文'}
            onChangeText={e => this.handleChange('content', e)}
          />
        </View>
        <TouchableOpacity style={styles.submit} onPress={this.submitGroupFn}>
          <Text style={styles.txt}>发布小组</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

export default connect(
  state => state.group,
  dispatch => bindActionCreators({groupEditInit, uploadFileFn}, dispatch),
)(GroupEdit);

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
    fontSize: 25,
    borderBottomColor: '#f0f0f0',
    borderBottomWidth: 1,
  },
  content: {
    paddingVertical: 10,
    minHeight: 200,
  },
  submit: {
    marginTop: 100,
    alignItems: 'center',
    marginHorizontal: 50,
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
