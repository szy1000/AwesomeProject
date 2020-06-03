import React from 'react';
import {
  Image,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  StyleSheet,
} from 'react-native';

export default class SummerDetail extends React.Component {
  render() {
    return (
      <View style={styles.summerDetail}>
        <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
          <ScrollView>
            <Text style={styles.title}>
              国外实验室--城市研究与规划可感知城市实验室
            </Text>
            <View style={styles.tips}>
              <View style={[styles.item, {justifyContent: 'flex-start'}]}>
                <Image style={styles.icon} source={require('./time.png')} />
                <Text>全年招生</Text>
              </View>
              <View style={styles.item}>
                <Image style={styles.icon} source={require('./address.png')} />
                <Text>全年招生</Text>
              </View>
              <View style={[styles.item, {justifyContent: 'flex-end'}]}>
                <Text>全年招生</Text>
              </View>
            </View>
            <Text style={styles.result}>预期成果：科研经历+项目证明</Text>

            <View style={styles.content}>
              <View style={styles.imgWrapper}>
                <Image style={styles.img} source={require('./pic19.png')} />
              </View>
              <Text>GIS科学，数据驱动的城市环境研究，</Text>
            </View>
            <View style={styles.panel}>
              <View>
                <Text style={styles.header}>适合学科</Text>
              </View>
              <View style={styles.content}>
                <Text>科研经历+项目证明</Text>
              </View>
            </View>
            <View style={styles.panel}>
              <View>
                <Text style={styles.header}>适合学科</Text>
              </View>
              <View style={styles.content}>
                <Text>科研经历+项目证明</Text>
              </View>
            </View>
            <View style={styles.panel}>
              <View>
                <Text style={styles.header}>适合学科</Text>
              </View>
              <View style={styles.content}>
                <Text>科研经历+项目证明</Text>
              </View>
            </View>
            <View style={styles.panel}>
              <View>
                <Text style={styles.header}>适合学科</Text>
              </View>
              <View style={styles.content}>
                <Text>科研经历+项目证明</Text>
              </View>
            </View>
          </ScrollView>
          <View style={styles.btn}>
            <Text style={styles.word}>活动已经下架</Text>
          </View>
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  summerDetail: {
    paddingTop: 10,
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    paddingHorizontal: 15,
    fontSize: 20,
    color: '#000',
    lineHeight: 25,
  },
  tips: {
    marginVertical: 15,
    paddingHorizontal: 15,
    flexDirection: 'row',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '33.33%',
  },
  icon: {
    marginRight: 10,
    width: 14,
    height: 14,
    resizeMode: 'contain',
  },
  result: {
    paddingHorizontal: 15,
    color: '#666666',
  },

  content: {},

  panel: {
    padding: 15,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#f7f7f7',
  },

  header: {
    paddingVertical: 20,
    fontSize: 20,
    fontWeight: '200',
  },
  imgWrapper: {
    alignItems: 'center',
  },
  img: {
    resizeMode: 'contain',
    width: '80%',
    height: 260,
  },
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 44,
    backgroundColor: '#ccc',
  },
  word: {
    color: '#fff',
  },
});
