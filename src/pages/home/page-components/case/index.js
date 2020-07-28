import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import Jump from '../../../../utils/jump';
export default class Case extends React.Component {
  linkTo = (id, navigation) => {
    Jump.linkToPage({
      navigation,
      url: 'CaseDetail',
      params: {
        id,
      },
    });
  };

  render() {
    const {data, navigation} = this.props;
    return (
      <View style={styles.case}>
        {data.map(item => (
          <TouchableWithoutFeedback
            key={item.id}
            onPress={() => this.linkTo(item.id, navigation)}>
            <View style={styles.item}>
              <Image style={styles.pic} source={{uri: item.image}} />
              <Text style={styles.title} numberOfLines={2}>
                {item.title}
              </Text>
              <View style={styles.auth}>
                <View style={styles.auth}>
                  <Image style={styles.avatar} source={{uri: item.image}} />
                  <Text style={styles.name}>{item.name}</Text>
                </View>
                <View style={styles.auth}>
                  <Image
                    style={styles.icon}
                    source={require('./collect.png')}
                  />
                  <Text style={styles.count}>20</Text>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  case: {
    paddingHorizontal: 7,
    flexDirection: 'row',
  },
  item: {
    paddingHorizontal: 8,
    width: '50%',
  },
  pic: {
    height: 150,
    width: '100%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden',
    // resizeMode: 'contain',
  },
  title: {
    margin: 5,
    fontSize: 15,
    lineHeight: 20,
  },
  auth: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  avatar: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  name: {
    marginLeft: 10,
    color: '#666666',
  },
  icon: {
    width: 15,
    height: 15,
  },
  count: {
    marginLeft: 5,
    fontSize: 15,
  },
});
