import React, {Component} from 'react';
import {
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Text,
  View,
} from 'react-native';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {libraryDetailInit} from './redux';
import {queryContentReq} from './api';
import HTMLView from 'react-native-htmlview';
import {Tab} from '../../components';

import RecommendSchool from './content';
class HtmlContent extends React.Component {
  state = {
    html: '',
  };
  async componentDidMount(): void {
    const {id, resourceId} = this.props;

    const res = await queryContentReq({
      resource: 'subject',
      itemId: id,
      resourceId,
    });
    this.setState({
      html: res.content,
    });
  }

  render() {
    const {html} = this.state;
    return (
      <ScrollView>
        <HTMLView value={html} style={{color: '#000'}} />
      </ScrollView>
    );
  }
}

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
    const {
      init,
      data,
      navigation,
      route: {params},
    } = this.props;
    if (!init) {
      return <ActivityIndicator style={{marginTop: 30}} />;
    }
    const {
      detail: {subjectCategory},
      infoItem = [],
    } = data;

    if (infoItem.length > 0) {
      if (infoItem[infoItem.length - 1].name !== '推荐院校') {
        infoItem.push({
          name: '推荐院校',
          component: () => <RecommendSchool id={this.id} />,
        });
      }

      for (let i = 0; i < infoItem.length - 1; i++) {
        infoItem[i].component = () => {
          if (infoItem[i].infoItem) {
            return (
              <HtmlContent
                {...infoItem[i]}
                resourceId={params.id}
                navigation={this.props.navigation}
              />
            );
          } else {
            for (let j = 0; j < infoItem[i].items.length; j++) {
              infoItem[i].items[j].component = () => (
                <HtmlContent
                  {...infoItem[i].items[j]}
                  resourceId={params.id}
                  navigation={this.props.navigation}
                  queryItem={params => this.props.queryItem(params)}
                />
              );
            }
            return (
              <Tab navigation={navigation} tabContent={infoItem[i].items} />
            );
          }
        };
      }
    } else if (infoItem.length === 0) {
      infoItem.push({
        name: '推荐院校',
        component: () => (
          <RecommendSchool id={this.id} navigation={navigation} />
        ),
      });
    }

    return (
      <Tab
        common={
          <View style={styles.container}>
            <View style={styles.category}>
              <Text>所属学科：{subjectCategory}</Text>
            </View>
          </View>
        }
        navigation={navigation}
        tabContent={infoItem}
      />
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
