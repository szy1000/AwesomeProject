import React from 'react';
import {View, ScrollView, Text, StyleSheet} from 'react-native';
import {Header, Panel} from './page-components';

export default class CaseDetail extends React.Component {
  render() {
    return (
      <ScrollView style={styles.caseDetail}>
        <Header />
        <Panel title={'申请信息'}>
          <View>
            <Text style={styles.txt}>毕业院校：四川农业大学</Text>
            <Text style={styles.txt}>毕业学位： 本科</Text>
            <Text style={styles.txt}>毕业专业： 创业设计</Text>
          </View>
        </Panel>
        <Panel title={'成绩信息'}>
          <Text>雅思</Text>
        </Panel>
        <Panel title={'经验分享'}>
          <Text>雅思</Text>
        </Panel>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  caseDetail: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
  },
  active: {
    color: '#12a8cd',
  },
});
