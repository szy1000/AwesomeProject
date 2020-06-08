import React from 'react';
import {
  Text,
  Image,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';

export default class Item extends React.Component {
  render() {
    const {
      icon,
      title,
      clickFn,
      children,
      extra,
      more = true,
      style,
    } = this.props;
    return (
      <TouchableWithoutFeedback onPress={clickFn}>
        <View style={styles.item}>
          <View style={styles.link}>
            {icon && (
              <View>
                <Image style={styles.icon} source={icon} />
              </View>
            )}
            <View style={[styles.title, {...style}]}>
              {title && <Text style={styles.content}>{title}</Text>}
              {children && <View style={styles.children}>{children}</View>}
            </View>
            <View style={styles.right}>
              <View style={styles.extra}>{extra}</View>
              {more && (
                <Image style={styles.more} source={require('./more.png')} />
              )}
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    paddingLeft: 20,
    backgroundColor: '#fff',
  },
  link: {
    paddingRight: 20,
    paddingTop: 20,
    paddingBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: '#eaeaea',
    borderBottomWidth: 1,
  },
  icon: {
    width: 14,
    height: 14,
  },

  title: {
    flex: 1,
    flexDirection: 'row',
  },
  children: {
    marginLeft: 15,
  },
  content: {
    fontSize: 16,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  extra: {
    marginRight: 10,
    color: '#aaa',
  },
  more: {
    width: 10,
    height: 18,
  },
});
