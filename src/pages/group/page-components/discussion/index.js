import React from 'react';
import {
  Text,
  Image,
  View,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';
import {SearchInput} from '../../../../components';
import Item from '../item';
export default class Discussion extends React.Component {
  state = {
    active: true,
  };
  componentDidMount() {
    // const {
    //   route:
    // } = this.props;
    // console.log(params);
  }

  toggle = () => {
    this.setState(({active}) => ({
      active: !active,
    }));
  };
  render() {
    const {active} = this.state;
    const {navigation} = this.props;
    return (
      <View style={styles.discussion}>
        <View style={styles.wrapper}>
          <View style={styles.ipt_wrapper}>
            <SearchInput
              style={styles.ipt}
              placeholder={'请输入您要查询的关键字'}
            />
            <Image
              style={styles.search}
              accessibilityRole={'image'}
              source={require('./search.png')}
            />
          </View>

          <TouchableWithoutFeedback onPress={this.toggle}>
            <View style={styles.switch}>
              <Text style={[styles.switch_item, !active && styles.active]}>
                最新
              </Text>
              <Text style={[styles.switch_item, active && styles.active]}>
                热门
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.list}>
          <Item navigation={navigation} />
          <Item navigation={navigation} />
          <Item navigation={navigation} />
          <Item navigation={navigation} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  discussion: {
    // padding: 15,
  },

  wrapper: {
    padding: 15,
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  ipt_wrapper: {
    paddingRight: 40,
    position: 'relative',
    marginRight: 10,
    flex: 1,
    borderWidth: 1,
    borderColor: '#f7f7f7',
    backgroundColor: '#fff',
    borderRadius: 20,
  },
  search: {
    position: 'absolute',
    zIndex: 3,
    right: 10,
    top: 6,
    width: 16,
    height: 16,
    resizeMode: 'contain',
  },
  ipt: {
    paddingVertical: 5,
    paddingLeft: 10,
    height: 30,
    overflow: 'hidden',
  },
  switch: {
    height: 30,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: '#eee',
  },
  switch_item: {
    paddingHorizontal: 10,
    height: 30,
    lineHeight: 28,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#eee',
    overflow: 'hidden',
  },
  active: {
    color: '#12a8cd',
    borderColor: '#12a8cd',
    backgroundColor: '#fff',
  },

  list: {
    margin: 15,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
});
