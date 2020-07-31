import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SectionList,
  Dimensions,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Image,
} from 'react-native';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {libraryInit, searchList} from './redux';

import ParcelData from './ParcelData.json';

var {width, height} = Dimensions.get('window');

let Headers = [];

class Library extends Component {
  componentDidMount() {
    this.props.libraryInit({countryId: 1});
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
          {backgroundColor: item.index == this.state.cell ? 'white' : null},
        ]}
        onPress={() => this.cellAction(item)}>
        <Text style={styles.lText}>{item.item.name}</Text>
      </TouchableOpacity>
    );
  };

  cellAction = item => {
    this.setState({
      cell: item.index,
    });
    this.props.searchList({
      countryId: 1,
      categoryId: item.item.id,
    });

    console.log(item);
    // if (item.index <= ParcelData.length) {
    //   this.setState({
    //     cell: item.index,
    //   });
    //   if (item.index > 0) {
    //     var count = 0;
    //     for (var i = 0; i < item.index; i++) {
    //       count += ParcelData[i].data.length + 1;
    //     }
    //     console.warn(count);
    //     this.refs.sectionList.scrollToLocation({
    //       animated: false,
    //       itemIndex: count,
    //     });
    //   } else {
    //     this.refs.sectionList.scrollToLocation({animated: false, itemIndex: 0});
    //   }
    // }
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

  state = {
    cell: 0,
  };

  renderRRow = item => {
    return (
      <View style={styles.rItem}>
        <Text style={styles.foodName}>{item.item.name}</Text>
        <View style={styles.saleFavorite} />
      </View>
    );
  };

  sectionComp = section => {
    return (
      <View
        style={{
          height: 30,
          backgroundColor: '#DEDEDE',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text>{section.section.name}</Text>
      </View>
    );
  };

  search = () => {
    // this.props.searchList({})
    console.log('s');
  };

  render() {
    const {init, data} = this.props;
    if (!init) {
      return <ActivityIndicator style={{marginTop: 30}} />;
    }
    const {country, rank, hotSubject, subjectList} = data;

    for (let i = 0; i < hotSubject.length; i++) {
      hotSubject[i].data = hotSubject[i].universities || [];
    }
    console.log('data', hotSubject);
    return (
      <View style={styles.container}>
        <FlatList
          ref="FlatList"
          style={styles.leftList}
          data={subjectList}
          renderItem={item => this.renderLRow(item)}
          ListHeaderComponent={() => (
            <Text style={styles.tag}>{country[0].name}</Text>
          )}
          keyExtractor={item => item.section}
        />
        <SectionList
          ref="sectionList"
          style={styles.rightList}
          ListHeaderComponent={() => (
            <View>
              <Text style={styles.tag}>{rank[0].name}</Text>
              <TextInput
                returnKeyLabel="search"
                returnKeyType="search"
                style={styles.ipt}
                blurOnSubmit={true}
                numberOfLines={1}
                allowFontScaling={false}
                onSubmitEditing={this.search}
                placeholder={'请输入'}
              />
            </View>
          )}
          renderSectionHeader={section => this.sectionComp(section)}
          renderItem={item => this.renderRRow(item)}
          sections={hotSubject}
          keyExtractor={item => item.name}
          onViewableItemsChanged={info => this.itemChange(info)}
        />
      </View>
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
  },
  leftList: {
    width: (1 * width) / 4,
    backgroundColor: '#E9E9EF',
  },
  lItem: {
    minHeight: 44,
    justifyContent: 'center',
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
    marginVertical: 10,
    textAlign: 'center',
    fontSize: 16,
  },
  ipt: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    // marginHorizontal: 10,
    flex: 1,
    fontSize: 20,
    borderWidth: 1,
    borderColor: '#ccc',
  },
});
