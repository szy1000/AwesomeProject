import React from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  ScrollView,
  Image,
  StyleSheet,
} from 'react-native';
import {BoxShadow} from 'react-native-shadow';
import {Jump} from '../../../../utils';

export default class Course extends React.Component {
  render() {
    const shadowOpt = {
      width: 100,
      height: 100,
      color: '#000',
      border: 2,
      radius: 3,
      opacity: 0.2,
      x: 0,
      y: 3,
      style: {marginVertical: 5},
    };
    const {hotSubject} = this.props;
    return (
      <ScrollView
        horizontal={true} // 横向
        showsHorizontalScrollIndicator={false}
        style={styles.course}>
        <>
          {hotSubject.map((v, i) => (
            <TouchableWithoutFeedback
              key={i}
              onPress={() =>
                Jump.linkToPage({
                  url: 'LibraryDetail',
                  navigation: this.props.navigation,
                  params: {
                    id: v.id,
                  },
                })
              }>
              <View style={styles.item}>
                <View style={styles.img_wrapper}>
                  <Image style={styles.bg} source={require('./pic12.png')} />
                  <Text style={styles.type}>{v.name}</Text>
                </View>
                <View style={styles.content}>
                  {v.universities.map(item => (
                    <View style={styles.school} key={item.id}>
                      <Text style={styles.name}>{item.name}</Text>
                      <Text style={styles.en_name}>{item.nameEn}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </TouchableWithoutFeedback>
          ))}
        </>

        <View style={styles.item}>
          <View style={styles.img_wrapper}>
            <Image style={styles.bg} source={require('./pic13.png')} />
            <Text style={styles.type}>工商管理</Text>
          </View>
          <View style={styles.content}>
            <View style={styles.school}>
              <Text style={styles.name}>杜伦大学</Text>
              <Text style={styles.en_name}>Durham University</Text>
            </View>
            <View style={styles.school}>
              <Text style={styles.name}>帝国理工学院</Text>
              <Text style={styles.en_name}>Imperial College</Text>
            </View>
            <View style={styles.school}>
              <Text style={styles.name}>伦敦大学学院</Text>
              <Text style={styles.en_name}>University College of London</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  course: {
    marginRight: 15,
    marginLeft: 15,
    flexDirection: 'row',
    overflow: 'scroll',
  },
  item: {
    width: 300,
    marginRight: 15,
    flexDirection: 'row',
  },
  img_wrapper: {
    width: 73,
    height: 163,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bg: {
    position: 'absolute',
    zIndex: -1,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    resizeMode: 'contain',
  },
  type: {
    color: '#fff',
    fontSize: 18,
    width: 18,
    fontWeight: '500',
    textAlignVertical: 'center',
  },
  content: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 17,
    fontWeight: '400',
  },
  en_name: {
    fontSize: 14,
    color: '#999999',
    lineHeight: 20,
  },
});
