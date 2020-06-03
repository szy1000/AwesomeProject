import React from 'react';
import {
  View,
  TouchableHighlight,
  Text,
  StyleSheet,
} from 'react-native';
import {SearchInput, Popover} from '../../components';
export default class RepositoryDetail extends React.Component {
  state = {
    keys: 'ss',
    dataArr: [1, 2, 3, 4, 5],
    refreshLoading: false,
    loading: false,
    visible: false,
  };

  toggleModal = () => {
    this.setState(({visible}) => ({
      visible: !visible,
    }));
  };

  getDate = () => {
    this.setState({
      refreshLoading: true,
    });
    setTimeout(() => {
      this.setState({
        dataArr: [5, 4, 3, 2, 1],
        refreshLoading: false,
      });
    }, 2000);
  };

  getMore = () => {
    this.setState({
      loading: true,
    });
    setTimeout(() => {
      this.setState({
        dataArr: [...this.state.dataArr, 8, 9, 10],
        loading: false,
      });
    }, 2000);
  };
  render() {
    const {keys, dataArr, refreshLoading, visible, loading} = this.state;
    return (
      <View style={styles.repository}>
        <View style={styles.select}>
          <SearchInput
            styles={styles.ipt}
            value={keys}
            onChangeText={e => this.onChangeText(e)}
          />
          <View>
            <Popover
              item={
                <View style={{backgroundColor: '#fff'}}>
                  <Text style={styles.item}>中国</Text>
                  <Text style={styles.item}>美国</Text>
                  <Text style={styles.item}>日本</Text>
                </View>
              }>
              <View style={{flexDirection: 'row'}}>
                <Text>全球</Text>
              </View>
            </Popover>
            {/*<Popover>*/}
            {/*  <Text>QS排名</Text>*/}
            {/*</Popover>*/}
          </View>
        </View>
        <TouchableHighlight onPress={this.toggleModal}>
          <Text>sssdsadsdsadaddas</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  repository: {},
  select: {
    paddingTop: 10,
    backgroundColor: '#fff',
  },
  ipt: {
    marginHorizontal: 20,
  },

  list: {
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: '#f7f7f7',
  },
  item: {
    marginHorizontal: 15,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f7f7f7',
  },
});
