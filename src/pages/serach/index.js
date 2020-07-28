import React from 'react';
import {
  Text,
  Image,
  TextInput,
  TouchableNativeFeedback,
  View,
  StyleSheet,
} from 'react-native';
import {Button} from '../../components';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {searchInit} from './redux';

import Jump from '../../utils/jump';

class Search extends React.Component {
  URL_MAP = {
    university: 'RepositoryDetail',
    subject: '/',
    universityCase: '/',
    summerProject: '/',
    background: '',
  };
  state = {
    keys: '',
  };

  handChange = e => {
    this.setState({
      keys: e,
    });
  };

  search = () => {
    const {keys} = this.state;
    if (keys) {
      this.props.searchInit({
        query: keys,
      });
    } else {
      alert('输入框不能为空');
    }
  };

  searchToPage = (id, type) => {
    console.log(this.URL_MAP[type]);
    Jump.linkToPage({
      url: this.URL_MAP[type],
      params: {
        id,
      },
      navigation: this.props.navigation,
    });
  };
  componentWillUnmount(): void {}

  render() {
    const {data} = this.props;
    const {keys} = this.state;
    console.log(data);
    return (
      <View>
        <View style={styles.searchBox}>
          <TextInput
            value={keys}
            onChangeText={e => this.handChange(e)}
            style={styles.ipt}
            autoFocus
          />
          <Button onClick={this.search} style={styles.btn}>
            确定
          </Button>
        </View>
        <View>
          {data.res &&
            data.res.map((v, k) => (
              <TouchableNativeFeedback
                key={k}
                onPress={() => this.searchToPage(v.id, v.resource)}>
                <View style={styles.item}>
                  {v.image && (
                    <Image style={styles.icon} source={{uri: v.image}} />
                  )}
                  <Text style={styles.name}>{v.name}</Text>
                </View>
              </TouchableNativeFeedback>
            ))}
        </View>
      </View>
    );
  }
}

export default connect(
  state => state.search,
  dispatch => bindActionCreators({searchInit}, dispatch),
)(Search);

const styles = StyleSheet.create({
  searchBox: {
    marginTop: 15,
    marginHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },

  ipt: {
    marginRight: 15,
    flex: 1,
    color: '#000',
    borderColor: '#000',
    borderWidth: 1,
    paddingVertical: 5,
    paddingLeft: 10,
    fontSize: 20,
    borderRadius: 5,
  },
  btn: {},

  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    marginHorizontal: 15,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 15,
  },

  name: {
    fontSize: 20,
  },
  icon: {
    marginRight: 15,
    width: 80,
    height: 80,
    borderRadius: 5,
    resizeMode: 'contain',
  },
});
