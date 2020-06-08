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

export default class GroupEdit extends React.Component {
  state = {
    imgArr: [require('./png.png')],
    avatarSourceMap: [],
  };

  getPhoto = async () => {
    const options = {
      mediaType: 'mixed',
      durationLimit: '120',
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

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        const {avatarSourceMap} = this.state;
        avatarSourceMap.push(source);
        this.setState({
          avatarSourceMap: [...avatarSourceMap],
          // imgArr: [...this.state.imgArr.unshift(source)],
        });
      }
    });
  };
  render() {
    const {navigation} = this.props;
    const {avatarSourceMap} = this.state;
    return (
      <ScrollView style={styles.note}>
        <Text>{JSON.stringify(this.state.avatarSource)}</Text>
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
            placeholder={'填写标题会有很多赞哦'}
          />
          <TextInput
            style={styles.content}
            multiline
            placeholder={'填写正文'}
          />
        </View>
        <TouchableOpacity style={styles.submit}>
          <Text style={styles.txt}>发布小组</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

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
