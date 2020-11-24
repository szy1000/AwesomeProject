import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Image,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Container, Header, Content, Icon, Picker, Form} from 'native-base';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {libraryInit, searchList} from './redux';
import Jump from '../../utils/jump';
import ParcelData from './ParcelData.json';

var {width, height} = Dimensions.get('window');

let Headers = [];

class Library extends Component {
  state = {
    cell: 0,
    query: '',
  };

  componentDidMount() {
    this.countryId = this.props.route.params.countryId;
    console.log(this.countryId);
    this.props.libraryInit({countryId: this.countryId});
    // ParcelData.map((item, i) => {
    //   Headers.push(item.section);
    // });
  }

  componentWillUnmount() {
    Headers = [];
  }

  renderLRow = item => {
    return (
      <TouchableOpacity
        style={[
          styles.lItem,
          {backgroundColor: item.index == this.state.cell ? '#fff' : null},
          {
            borderLeftColor:
              item.index == this.state.cell ? '#0fa9ce' : '#f0f0f0',
          },
        ]}
        onPress={() => this.cellAction(item)}>
        <Text
          style={[
            styles.lText,
            {color: item.index == this.state.cell ? '#0fa9ce' : null},
          ]}>
          {item.item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  cellAction = item => {
    console.log(item);
    this.setState({
      cell: item.index,
    });
    this.props.searchList({
      countryId: this.state.countryId || this.countryId,
      categoryId: item.item.id,
    });
  };

  itemChange = info => {
    let section = info.viewableItems[0].section.section;
    if (section) {
      let index = Headers.indexOf(section);
      if (index < 0) {
        index = 0;
      }
      this.setState({cell: index});
    }
  };

  renderRRow = ({item, index}) => {
    const {
      data: {subjectList},
      navigation,
    } = this.props;
    console.log('index', index);
    if (index === 0) {
      return (
        <>
          <View
            style={{
              flexDirection: 'row',
              padding: 10,
              paddingLeft: 0,
              marginLeft: 10,
              borderBottomWidth: 1,
              borderBottomColor: '#e5e5e5',
            }}>
            <Image
              style={styles.badges}
              source={
                subjectList[this.state.cell].name === '热门专业'
                  ? require('./hot.png')
                  : require('./category.png')
              }
            />
            <Text style={styles.foodName}>
              {subjectList[this.state.cell].name}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() =>
              Jump.linkToPage({
                url: 'LibraryDetail',
                params: {
                  id: item.id,
                },
                navigation,
              })
            }>
            <View style={styles.rItem}>
              <Text style={styles.foodName}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        </>
      );
    } else {
      return (
        <TouchableOpacity
          onPress={() =>
            Jump.linkToPage({
              url: 'LibraryDetail',
              params: {
                id: item.id,
              },
              navigation,
            })
          }>
          <View style={styles.rItem}>
            <Text style={styles.foodName}>{item.name}</Text>
          </View>
        </TouchableOpacity>
      );
    }
  };

  search = () => {
    const {
      data: {country},
    } = this.props;
    const {countryId, rankId, query} = this.state;
    console.log(this.state);
    this.props.searchList({
      query,
      countryId: countryId || this.countryId,
      order: rankId,
    });
  };

  onValueChange = (key, value) => {
    this.setState({
      [key]: value,
    });
  };
  render() {
    const {init, data} = this.props;
    if (!init) {
      return <ActivityIndicator style={{marginTop: 30}} />;
    }
    const {country, rank, subjectItem, subjectList} = data;
    const {query} = this.state;
    return (
      <Container style={styles.container}>
        <FlatList
          ref="FlatList"
          style={styles.leftList}
          data={subjectList}
          renderItem={item => this.renderLRow(item)}
          ListHeaderComponent={() => (
            <View style={{width: 110, backgroundColor: '#fff'}}>
              <Picker
                note
                iosHeader="请选择"
                mode="dropdown"
                textStyle={styles.tag}
                headerBackButtonText="返回"
                selectedValue={this.state.countryId || this.countryId}
                onValueChange={e => {
                  this.props.libraryInit({countryId: e});
                  this.onValueChange('countryId', e);
                }}>
                {country.map(v => (
                  <Picker.Item label={v.name} value={v.id} />
                ))}
              </Picker>
            </View>
          )}
          keyExtractor={item => item.section}
        />

        <View style={styles.rightList}>
          <View style={{height: 50}}>
            <Picker
              note
              iosHeader="请选择"
              mode="dropdown"
              textStyle={styles.tag}
              headerBackButtonText="返回"
              selectedValue={this.state.rankId || rank[0].id}
              onValueChange={e => this.onValueChange('rankId', e)}>
              {rank.map(v => (
                <Picker.Item label={v.name} value={v.id} />
              ))}
            </Picker>
          </View>

          <View style={styles.ipt_wrapper}>
            <TextInput
              returnKeyLabel="search"
              returnKeyType="search"
              style={styles.ipt}
              numberOfLines={1}
              value={query}
              onChangeText={txt => this.onValueChange('query', txt)}
              onSubmitEditing={this.search}
              placeholder={'请输入'}
            />
            <TouchableOpacity onPress={this.search}>
              <MaterialCommunityIcons name="magnify" color="#999" size={30} />
            </TouchableOpacity>
          </View>
          {subjectItem.length === 0 ? (
            <Text style={styles.noData}>暂无数据</Text>
          ) : (
            <FlatList
              ref="sectionList"
              style={styles.rightList}
              renderItem={section => this.renderRRow(section)}
              data={subjectItem}
              keyExtractor={item => item.name}
            />
          )}
        </View>
      </Container>
    );
  }
}
export default connect(
  state => state.library,
  dispatch => bindActionCreators({libraryInit, searchList}, dispatch),
)(Library);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  leftList: {
    width: (1 * width) / 4,
    backgroundColor: '#f0f0f0',
  },
  lItem: {
    minHeight: 44,
    justifyContent: 'center',
    borderLeftWidth: 4,
  },
  lText: {
    marginLeft: 10,
    marginRight: 10,
    fontSize: 16,
  },
  rightList: {
    width: (3 * width) / 4,
  },

  badges: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginRight: 10,
  },
  rItem: {
    padding: 10,
    paddingLeft: 40,
    // borderBottomWidth: 1,
    borderColor: '#ccc',
    flexDirection: 'row',
  },
  noData: {
    padding: 20,
    fontSize: 18,
    paddingLeft: 40,
    borderColor: '#ccc',
    flexDirection: 'row',
  },
  rItemDetail: {
    paddingBottom: 10,
    flex: 1,
    marginTop: 10,
    marginLeft: 5,
    justifyContent: 'space-between',
  },
  icon: {
    height: 60,
    width: 60,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 8,
    borderWidth: 1,
    borderColor: '#999999',
  },
  foodName: {
    fontSize: 18,
  },
  saleFavorite: {
    flexDirection: 'row',
    marginTop: 5,
    marginBottom: 5,
  },
  moneyText: {
    color: 'orange',
  },

  tag: {
    color: '#000',
  },
  ipt_wrapper: {
    borderWidth: 1,
    borderColor: '#ccc',
    flexDirection: 'row',
  },
  ipt: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    // marginHorizontal: 10,
    flex: 1,
    fontSize: 20,
  },
});
