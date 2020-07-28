import React, {Component} from 'react';
import {StyleSheet, ActivityIndicator, Text, View} from 'react-native';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {libraryDetailInit} from './redux';

class LibraryDetail extends Component {
  componentDidMount(): void {
    const {
      route: {params},
      libraryDetailInit,
    } = this.props;
    this.id = params.id;
    libraryDetailInit(this.id);
  }

  render() {
    const {init, data} = this.props;
    if (!init) {
      return <ActivityIndicator style={{marginTop: 30}} />;
    }
    const {
      detail: {
        name,
        nameEn,
        schooling,
        subjectCategory,
        viewCount,
        hot,
        remarks,
      },
    } = data;
    console.log(data);
    return (
      <View style={styles.container}>
        <View style={styles.category}>
          <Text>专业分类：{subjectCategory}</Text>
          <Text>所属学科：{subjectCategory}</Text>
        </View>
      </View>
    );
  }
}

export default connect(
  state => state.libraryDetail,
  dispatch => bindActionCreators({libraryDetailInit}, dispatch),
)(LibraryDetail);

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  category: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
