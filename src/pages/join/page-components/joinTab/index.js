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
import {bindActionCreators} from 'redux';
import {joinTabInit} from './redux';

import {Empty} from '../../../../components';

class JoinTab extends React.Component {
  componentDidMount(): void {
    this.props.joinTabInit();
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
      data: {joinTab},
    } = this.props;
    console.warn(joinTab)
    if (!init) {
      return <ActivityIndicator style={{marginTop: 30}} />;
    }
    const {data} = joinTab;
    return (
      <Fragment>
        {data.length > 0 ? (
          data.map(v => (
            <TouchableWithoutFeedback
              key={v.id}
              onPress={() => this.linkToDetail(v.id)}>
              <View style={_styles.item}>
                <Image style={_styles.logo} source={{uri: v.image}} />
                <Text style={_styles.name} numberOfLines={1}>
                  {v.name}
                </Text>
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
  state => state.joinTab,
  dispatch => bindActionCreators({joinTabInit}, dispatch),
)(JoinTab);
