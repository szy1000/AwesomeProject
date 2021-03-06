import React, {Fragment} from 'react';
import {
  View,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Text,
  StyleSheet,
} from 'react-native';
import {WhiteSpace, Item} from '../../components';
import Jump from '../../utils/jump';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {messageInit} from './redux';

class Message extends React.Component {
  componentDidMount(): void {
    this.props.messageInit();
  }

  linkTo = (url, id) => {
    const {navigation} = this.props;
    Jump.linkToPage({
      navigation,
      url,
      params: {
        id,
      },
    });
  };

  render() {
    const {
      init,
      data: {msg},
    } = this.props;
    if (!init) {
      return <ActivityIndicator style={{marginTop: 30}} />;
    }
    const {data} = msg;
    return (
      <View>
        {data.length > 0 ? (
          data.map(
            (
              {
                triggerUser,
                createTime,
                triggerActionName,
                resourceActionName,
                resourceName,
                resource,
                resourceId,
              },
              k,
            ) => (
              <Fragment>
                <Item key={k} more={false}>
                  <TouchableWithoutFeedback
                    onPress={() =>
                      this.linkTo(
                        resource === 'note' ? 'FindDetail' : 'GroupDetail',
                        resourceId,
                      )
                    }>
                    <Text>
                      {triggerUser.nickName} 在 {createTime} {triggerActionName}{' '}
                      了你 {resourceActionName} 的 {resourceName}
                    </Text>
                  </TouchableWithoutFeedback>
                </Item>
                <WhiteSpace size={'big'} />
              </Fragment>
            ),
          )
        ) : (
          <Item icon={require('./laba.png')} more={false}>
            <Text>系统通知</Text>
            <Text>暂时没有更多消息</Text>
          </Item>
        )}
      </View>
    );
  }
}

export default connect(
  state => state.message,
  dispatch => bindActionCreators({messageInit}, dispatch),
)(Message);

const styles = StyleSheet.create({
  item: {
    fontSize: 20,
    // color: '#ddd',
  },
  title: {
    justifyContent: 'center',
  },
});
