import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {groupAllInit, searchGroupReq, toggleJoin} from './redux';
import Jump from '../../utils/jump';
import ParcelData from './ParcelData.json';
var {width, height} = Dimensions.get('window');

let Headers = [];

class GroupAll extends Component {
  state = {
    cell: 0,
  };

  componentDidMount() {
    const {
      groupAllInit,
      route: {params},
    } = this.props;
    groupAllInit({id: params.id});

    ParcelData.map((item, i) => {
      Headers.push(item.section);
    });
  }

  componentWillUnmount() {
    Headers = [];
  }

  renderLRow = item => {
    return (
      <TouchableOpacity
        style={[
          styles.lItem,
          {
            backgroundColor: item.index == this.state.cell ? '#feffff' : null,
            borderColor: item.index == this.state.cell ? '#00aad3' : '#eff0f1',
          },
        ]}
        onPress={() => this.cellAction(item)}>
        <Text
          style={[
            styles.lText,
            {
              color: item.index == this.state.cell ? '#00aad3' : null,
            },
          ]}>
          {item.item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  cellAction = item => {
    console.log('item', item);
    this.setState({
      cell: item.index,
    });
    this.props.searchGroupReq({
      id: item.item.id,
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

  toggleJoin = (id, isJoin) => {
    this.props.toggleJoin({
      isJoin,
      id,
    });

    this.props.searchGroupReq({
      id: this.props.data.allCategory[this.state.cell].id,
    });
    // const {
    //   groupAllInit,
    //   route: {params},
    // } = this.props;
    // groupAllInit({id: params.id});
  };

  renderRRow = ({item}) => {
    const {navigation} = this.props;
    return (
      <TouchableOpacity
        style={{marginLeft: 10}}
        onPress={() =>
          Jump.linkToPage({
            url: 'Group',
            params: {
              id: item.id,
            },
            navigation,
          })
        }>
        <View style={styles.rItem}>
          <Image
            style={styles.avatar}
            source={
              item.image
                ? {uri: item.image}
                : require('../../assets/images/logo.jpeg')
            }
          />
          <View
            style={{
              paddingVertical: 10,
              flex: 1,
              justifyContent: 'space-between',
            }}>
            <Text style={styles.foodName}>{item.name}</Text>
            <Text style={styles.count}>{item.userCount}个会员</Text>
          </View>
          <TouchableOpacity
            style={styles.join}
            onPress={() => this.toggleJoin(item.id, item.join)}>
            <Text style={{color: '#00a7cd'}}>
              {item.join ? '已加入' : '加入'}
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    const {init, data} = this.props;
    if (!init) {
      return <ActivityIndicator style={{marginTop: 30}} />;
    }
    const {allCategory, groupDetail} = data;

    return (
      <View style={styles.container}>
        <FlatList
          ref="FlatList"
          style={styles.leftList}
          data={allCategory}
          renderItem={item => this.renderLRow(item)}
          keyExtractor={item => item.section}
        />
        <FlatList
          ref="sectionList"
          style={styles.rightList}
          renderItem={section => this.renderRRow(section)}
          data={groupDetail.data}
          keyExtractor={item => item.name}
        />
      </View>
    );
  }
}
export default connect(
  state => state.groupAll,
  dispatch =>
    bindActionCreators({groupAllInit, toggleJoin, searchGroupReq}, dispatch),
)(GroupAll);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  leftList: {
    width: (1 * width) / 4,
    backgroundColor: '#eff0f1',
  },
  lItem: {
    minHeight: 44,
    justifyContent: 'center',
    borderLeftWidth: 2,
  },
  lText: {
    marginLeft: 10,
    marginRight: 10,
    fontSize: 16,
  },
  rightList: {
    width: (3 * width) / 4,
  },
  rItem: {
    paddingVertical: 10,
    paddingRight: 10,
    borderBottomWidth: 1,
    borderColor: '#eee',
    flexDirection: 'row',
  },

  avatar: {
    marginRight: 10,
    width: 60,
    height: 60,
    resizeMode: 'cover',
  },
  foodName: {
    fontSize: 16,
  },
  count: {
    fontSize: 14,
    color: '#333',
  },
  join: {
    height: 30,
    paddingVertical: 7,
    fontSize: 16,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: '#00a7cd',
    backgroundColor: '#e5f5fc',
  },
});
