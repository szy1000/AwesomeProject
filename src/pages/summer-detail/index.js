import React from 'react';
import {
  Image,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

import HTMLView from 'react-native-htmlview';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {summerDetailInit} from './redux';

class SummerDetail extends React.Component {
  componentDidMount(): void {
    const {
      route: {params},
      summerDetailInit,
    } = this.props;
    summerDetailInit(params.id);
  }

  render() {
    const {init, data} = this.props;
    console.log(data);

    if (!init) {
      return <ActivityIndicator />;
    }
    const {
      res: {
        activeEndTime,
        activeStartTime,
        content,
        description,
        expectedResult,
        image,
        grade,
        place,
        registrationEndTime,
        registrationStartTime,
        remarks,
        subject,
        title,
      },
    } = data;
    const isEnd =
      new Date(registrationEndTime.replace(/-/g, '/')).getTime() >
      new Date().getTime()
        ? false
        : true;
    console.log(isEnd);
    return (
      <View style={styles.summerDetail}>
        <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
          <ScrollView>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.tips}>
              <View style={[styles.item, {justifyContent: 'flex-start'}]}>
                <Image style={styles.icon} source={require('./time.png')} />
                <Text>全年招生</Text>
              </View>
              <View style={styles.item}>
                <Image style={styles.icon} source={require('./address.png')} />
                <Text numberOfLines={1}>{place}</Text>
              </View>
              {/*<View style={[styles.item, {justifyContent: 'flex-end'}]}>*/}
              {/*  <Text>{place}</Text>*/}
              {/*</View>*/}
            </View>
            <Text style={styles.result}>预期成果：{expectedResult}</Text>

            <View style={styles.content}>
              <View style={styles.imgWrapper}>
                <Image
                  style={styles.img}
                  source={image ? {uri: image} : require('./pic19.png')}
                />
              </View>

              <HTMLView
                value={content}
                style={{paddingHorizontal: 15, lineHeight: 25, color: '#000'}}
              />
            </View>
            <View style={styles.panel}>
              <View>
                <Text style={styles.header}>适合学科</Text>
              </View>
              <View style={styles.content}>
                <Text>{description}</Text>
              </View>
            </View>
            <View style={styles.panel}>
              <View>
                <Text style={styles.header}>适合专业</Text>
              </View>
              <View style={styles.content}>
                <Text>{subject}</Text>
              </View>
            </View>
            <View style={styles.panel}>
              <View>
                <Text style={styles.header}>适合学科</Text>
              </View>
              <View style={styles.content}>
                {grade.map(v => (
                  <Text key={v}>{v}</Text>
                ))}
              </View>
            </View>
            <View style={styles.panel}>
              <View>
                <Text style={styles.header}>活动时间</Text>
              </View>
              <View style={styles.content}>
                <Text>报名截止日期:{registrationEndTime}</Text>
                <Text>活动截止日期:{activeEndTime}</Text>
              </View>
            </View>
            <View style={styles.panel}>
              <View>
                <Text style={styles.header}>备注</Text>
              </View>
              <View style={styles.content}>
                <Text>{remarks}</Text>
              </View>
            </View>
          </ScrollView>
          {isEnd ? (
            <View style={styles.btn}>
              <Text style={styles.word}>活动已经下架</Text>
            </View>
          ) : (
            <View style={styles.regBtn}>
              <Text style={styles.word}>点击报名</Text>
            </View>
          )}
          <View style={styles.moreDetail}>
            <Text style={styles.txt}>查看详细活动介绍</Text>
          </View>
        </SafeAreaView>
      </View>
    );
  }
}

export default connect(
  state => state.summerDetail,
  dispatch => bindActionCreators({summerDetailInit}, dispatch),
)(SummerDetail);

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

  regBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 44,
    backgroundColor: 'red',
  },

  moreDetail: {
    position: 'absolute',
    zIndex: 2,
    right: 0,
    bottom: 100,
    paddingVertical: 5,
    paddingLeft: 30,
    paddingRight: 10,
    width: 100,
    borderBottomLeftRadius: 30,
    borderTopLeftRadius: 30,
    backgroundColor: 'red',
    // backgroundColor: 'linear-gradient(to right,#d3959b,#bfe6ba)',
  },
  txt: {
    color: '#fff',
    lineHeight: 16,
    fontSize: 12,
  },
});
