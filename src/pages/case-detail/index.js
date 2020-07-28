import React from 'react';
import {
  View,
  ActivityIndicator,
  ScrollView,
  Text,
  StyleSheet,
} from 'react-native';
import {Header, Panel} from './page-components';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {caseDetailInit} from './redux';

class CaseDetail extends React.Component {
  componentDidMount(): void {
    const {
      route: {params},
      caseDetailInit,
    } = this.props;
    this.id = params.id;
    caseDetailInit(this.id);
  }

  render() {
    const {init, data} = this.props;
    if (!init) {
      return <ActivityIndicator style={{marginTop: 30}} />;
    }
    const {
      detail: {
        university,
        title,
        description,
        subject,
        degree,
        applyTime,
        graduatedUniversity,
        graduatedSubject,
        graduatedDegree,
      },
    } = data;
    return (
      <ScrollView style={styles.caseDetail}>
        <Header {...data.detail} />
        <Panel title={'申请信息'}>
          <View>
            <Text style={styles.txt}>申请院校：{university}</Text>
            <Text style={styles.txt}>申请学位： {degree}</Text>
            <Text style={styles.txt}>申请专业： {subject}</Text>
            <Text style={styles.txt}>
              申请时间： {applyTime && applyTime.split(' ')[0]}
            </Text>
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

export default connect(
  state => state.caseDetail,
  dispatch => bindActionCreators({caseDetailInit}, dispatch),
)(CaseDetail);
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
