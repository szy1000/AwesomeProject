import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import Jump from '../../../../utils/jump';

export default class LinkBlock extends React.Component {
  render() {
    return (
      <View style={styles.link}>
        <View style={styles.schoolAndProject}>
          <TouchableOpacity
            onPress={() =>
              Jump.linkToPage({
                navigation: this.props.navigation,
                url: 'Library',
              })
            }
            style={styles.linkItem}>
            <Image
              accessibilityRole={'image'}
              source={require('./zyk.png')}
              style={styles.linkImg}
            />
          </TouchableOpacity>
          <View style={styles.holder} />
          <TouchableOpacity
            onPress={() =>
              Jump.linkToPage({
                navigation: this.props.navigation,
                url: 'Library',
              })
            }
            style={styles.linkItem}>
            <Image
              accessibilityRole={'image'}
              source={require('./yxk.png')}
              style={styles.linkImg}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.block}>
          <TouchableOpacity
            style={styles.item}
            onPress={() =>
              Jump.linkToPage({
                navigation: this.props.navigation,
                url: 'Background',
              })
            }>
            <Image style={styles.icon} source={require('./bgts.png')} />
            <Text style={styles.txt}>背景提升</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item}>
            <Image style={styles.icon} source={require('./sqxm.png')} />
            <Text style={styles.txt}>暑期项目</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item}>
            <Image style={styles.icon} source={require('./qqal.png')} />
            <Text style={styles.txt}>全球案例</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  link: {
    paddingTop: 20,
  },
  schoolAndProject: {
    paddingHorizontal: 15,
    display: 'flex',
    flexDirection: 'row',
  },
  holder: {
    width: 15,
  },
  linkItem: {
    width: '48%',
    height: 100,
    borderRadius: 5,
  },

  linkImg: {
    width: '100%',
    height: 100,
  },

  block: {
    paddingHorizontal: 15,
    paddingBottom: 15,
    display: 'flex',
    flexDirection: 'row',
  },
  item: {
    flex: 1,
    alignItems: 'center',
  },
  icon: {
    width: 110,
    height: 83,
  },
  txt: {
    marginTop: 5,
    textAlign: 'center',
  },
});
