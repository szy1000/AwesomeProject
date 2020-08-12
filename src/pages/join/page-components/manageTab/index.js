import React, {Fragment} from 'react';
import {
  View,
  Image,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Text,
  StyleSheet,
} from 'react-native';
import Jump from '../../../../utils/jump';

import {connect} from 'react-redux';
import {bindActionCreators, manageTab} from 'redux';
import {manageTabInit} from './redux';

import {Empty} from '../../../../components';

class ManageTab extends React.Component {
  componentDidMount(): void {
    this.props.manageTabInit();
  }

  linkToDetail = id => {
    const {navigation} = this.props;
    Jump.linkToPage({
      url: 'CaseList',
      navigation,
      params: {
        id,
      },
    });
  };
  render() {
    const {
      init,
      data: {manageTab},
    } = this.props;
    if (!init) {
      return <ActivityIndicator style={{marginTop: 30}} />;
    }
    return (
      <Fragment>
        {manageTab.length > 0 ? (
          manageTab.map(v => (
            <TouchableWithoutFeedback
              key={v.id}
              onPress={() => this.linkToDetail(v.id)}>
              <View style={_styles.item}>
                <Image
                  style={_styles.logo}
                  source={
                    v.image
                      ? {uri: v.image}
                      : require('../../../../assets/images/logo.jpeg')
                  }
                />
                <Text style={_styles.name} numberOfLines={1}>
                  {v.title}
                </Text>
                <Text style={_styles.update}>{v.commentCount}更新</Text>
              </View>
            </TouchableWithoutFeedback>
          ))
        ) : (
          <Empty />
        )}
      </Fragment>
    );
  }
}

const _styles = StyleSheet.create({
  item: {
    padding: 15,
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  logo: {
    width: 30,
    height: 30,
  },
  name: {
    flex: 1,
    marginLeft: 15,
    fontSize: 16,
  },
  update: {
    fontSize: 12,
    color: '#666',
  },
});

export default connect(
  state => state.manageTab,
  dispatch => bindActionCreators({manageTabInit}, dispatch),
)(ManageTab);
