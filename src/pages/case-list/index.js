import React from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';
import {School} from './page-components';
import Content from './content.js';
import {Tab} from '../../components';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {caseListInit} from './redux';
import HTMLView from 'react-native-htmlview';


class CaseList extends React.Component {
  componentDidMount(): void {
    const {
      route: {params},
    } = this.props;
    this.props.caseListInit({
      pageNumber: 1,
      pageSize: 8,
      universityId: params.id,
    });
  }

  render() {
    const {
      init,
      data,
      navigation,
      route: {params},
    } = this.props;
    console.log(data)
    if (!init) {
      return <ActivityIndicator style={{marginTop: 30}} />;
    }
    const {degree} = data;
    for (let i = 0; i < degree.length; i++) {
      degree[i].component = () => (
        <Content
          degreeId={degree[i].id}
          universityId={params.id}
          navigation={this.props.navigation}
        />
      );
    }

    return (
      <Tab
        common={<School {...params} />}
        navigation={navigation}
        tabContent={degree}
      />
    );
  }
}

export default connect(
  state => state.caseList,
  dispatch => bindActionCreators({caseListInit}, dispatch),
)(CaseList);

const styles = StyleSheet.create({
  repository: {},
  selectArea: {
    paddingTop: 10,
    backgroundColor: '#fff',
  },

  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 15,
    marginBottom: 15,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f7f7f7',
  },
  active: {
    color: '#12a8cd',
  },
});
