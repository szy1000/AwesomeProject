import React from 'react';
import {
  View,
  ActivityIndicator,
  ScrollView,
  Text,
  StyleSheet,
} from 'react-native';
import {Header, Panel} from './page-components';
import HTMLView from 'react-native-htmlview';

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
      detail: {university, description, subject, degree, applyTime},
    } = data;
    console.log(data);
    return (
      <ScrollView style={styles.caseDetail}>
        <Header {...data.detail} />
        <Panel title={'申请信息'}>
          <View style={styles.table}>
            <View style={styles.cell}>
              <View style={styles.item}>
                <Text style={styles.label}>申请院校</Text>
              </View>
              <View style={styles.content}>
                <Text style={styles.txt}>{university}</Text>
              </View>
            </View>

            <View style={styles.cell}>
              <View style={styles.item}>
                <Text style={styles.label}>申请学位</Text>
              </View>
              <View style={styles.content}>
                <Text style={styles.txt}>{degree}</Text>
              </View>
            </View>

            <View style={styles.cell}>
              <View style={styles.item}>
                <Text style={styles.label}>申请专业</Text>
              </View>
              <View style={styles.content}>
                <Text style={styles.txt}>{subject}</Text>
              </View>
            </View>

            <View style={styles.cell}>
              <View style={styles.item}>
                <Text style={styles.label}>申请时间</Text>
              </View>
              <View style={styles.content}>
                <Text style={styles.txt}>
                  {applyTime && applyTime.split(' ')[0]}
                </Text>
              </View>
            </View>
          </View>
        </Panel>
        <Panel title={'经验分享'}>
          <HTMLView value={description} />
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
    backgroundColor: '#f7f7f7',
    paddingTop: 20,
  },
  active: {
    color: '#12a8cd',
  },

  table: {
    borderColor: '#eee',
    borderWidth: 1,
  },
  cell: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#eee',
  },

  item: {
    padding: 15,
    borderRightWidth: 1,
    borderColor: '#eee',
  },
  label: {
    color: '#12a8cd',
    fontSize: 16,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    textAlign: 'center',
  },
  txt: {
    fontSize: 16,
    // textAlign: 'center',
  },
});
