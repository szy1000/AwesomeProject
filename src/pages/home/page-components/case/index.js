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
  linkTo = (id, navigation, title) => {
    Jump.linkToPage({
      navigation,
      url: 'CaseDetail',
      params: {
        id,
        title,
      },
    });
  };

  render() {
    const {data, navigation} = this.props;
    console.log(data);
    return (
      <View style={styles.case}>
        {data.map(item => (
          <TouchableWithoutFeedback
            key={item.id}
            onPress={() => this.linkTo(item.id, navigation, item.title)}>
            <View style={styles.item}>
              <Image
                style={styles.pic}
                source={
                  item.image
                    ? {uri: item.image}
                    : require('../../../../assets/images/logo.jpeg')
                }
              />
              <Text style={styles.title} numberOfLines={2}>
                {item.title}
              </Text>
              <View style={styles.auth}>
                <View style={styles.auth}>
                  <Image
                    style={styles.avatar}
                    source={
                      item.image
                        ? {uri: item.image}
                        : require('../../../../assets/images/logo.jpeg')
                    }
                  />
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
    borderRadius: 15,
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
