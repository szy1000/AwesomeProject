import React from 'react';
import {
  Text,
  Image,
  TextInput,
  TouchableNativeFeedback,
  View,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import {Button, ListFooter} from '../../components';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {searchInit} from './redux';

import Jump from '../../utils/jump';

class Search extends React.Component {
  URL_MAP = {
    university: 'RepositoryDetail',
    subject: 'LibraryDetail',
    universityCase: 'CaseDetail',
    summerProject: 'SummerDetail',
    background: 'BackgroundDetail',
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
      Alert.alert('操作提示', '输入框不能为空', [
        {
          text: '确认',
          onPress: async () => {},
        },
      ]);
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
    return (
      <View style={{flex: 1}}>
        <View style={styles.searchBox}>
          <TextInput
            value={keys}
            returnKeyType="search"
            returnKeyLabel="search"
            onChangeText={e => this.handChange(e)}
            style={styles.ipt}
            placeholder="请输入关键字"
            onSubmitEditing={this.search}
            autoFocus
          />
          <Button onClick={this.search}>搜索</Button>
        </View>
        <ScrollView>
          {data.res && data.res.length ? (
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
            ))
          ) : (
            <ListFooter />
          )}
        </ScrollView>
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
    borderColor: '#ccc',
    borderWidth: 1,
    paddingVertical: 5,
    paddingLeft: 15,
    fontSize: 20,
    borderRadius: 15,
  },
  btn: {
    color: '#12a8cd',
    backgroundColor: '#12a8cd',
  },

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
