import React from 'react';
import {StyleSheet} from 'react-native';
import {School, Content} from './page-components';
import {Tab} from '../../components';
export default class CaseList extends React.Component {
  childrenArr = [
    {
      name: '本科',
      component: () => <Content navigation={this.props.navigation} />,
    },
    {
      name: '硕士',
      component: () => <Content navigation={this.props.navigation} />,
    },
    {
      name: '博士',
      component: () => <Content navigation={this.props.navigation} />,
    },
  ];

  render() {
    const {navigation} = this.props;
    return (
      <Tab
        common={<School />}
        navigation={navigation}
        tabContent={this.childrenArr}
      />
    );
  }
}

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
