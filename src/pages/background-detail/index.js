import React from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {Item} from './page-components/';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {backgroundDetailInit} from './redux';

class BackgroundDetail extends React.Component {
  componentDidMount(): void {
    const {
      route: {params},
    } = this.props;
    // this.noteId = params.id;
    this.props.backgroundDetailInit(params.id);
  }

  render() {
    const {init, data} = this.props;
    if (!init) {
      return <ActivityIndicator style={{marginTop: 30}} />;
    }
    const {
      category,
      examinationArrangement,
      examinationContent,
      examinationForm,
      examinationResource,
      description,
      expectedResult,
      grade,
      image,
      subject,
      title,
      website,
    } = data.detail;
    console.log(data);
    return (
      <ScrollView style={styles.repositoryDetail}>
        <Item {...data.detail} />
        <View style={styles.panel}>
          <View style={styles.header}>
            <Text style={styles.title}>简介</Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.desc}>{description}</Text>
          </View>
        </View>
        <View style={styles.panel}>
          <View style={styles.header}>
            <Text style={styles.title}>考试形式</Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.desc}>{examinationForm}</Text>
          </View>
        </View>
        <View style={styles.panel}>
          <View style={styles.header}>
            <Text style={styles.title}>考试安排</Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.desc}>{examinationArrangement}</Text>
          </View>
        </View>
        <View style={styles.panel}>
          <View style={styles.header}>
            <Text style={styles.title}>考试内容</Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.desc}>{examinationContent}</Text>
          </View>
        </View>
        <View style={styles.panel}>
          <View style={styles.header}>
            <Text style={styles.title}>考试资源</Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.desc}>{examinationResource}</Text>
          </View>
        </View>
        <View style={styles.panel}>
          <View style={styles.header}>
            <Text style={styles.title}>相关网站</Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.desc}>{website}</Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default connect(
  state => state.backgroundDetail,
  dispatch => bindActionCreators({backgroundDetailInit}, dispatch),
)(BackgroundDetail);

const styles = StyleSheet.create({
  repositoryDetail: {
    // paddingTop: Platform.OS && 30,
  },
  panel: {
    marginTop: 15,
    marginHorizontal: 15,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  header: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f7f7f7',
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
  },
  content: {
    padding: 15,
    minHeight: 200,
  },
  desc: {
    fontSize: 16,
  },
});
