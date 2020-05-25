import React from 'react';
import {View, StyleSheet, TouchableOpacity, Image, Text} from 'react-native';

export default class Panel extends React.Component {
  render() {
    const {title, more, moreFn, children} = this.props;
    return (
      <View style={styles.panel}>
        <View>
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            {more && (
              <TouchableOpacity style={styles.moreBox} onPress={moreFn}>
                <View>
                  <Text style={styles.more}>全部</Text>
                </View>
                <View>
                  <Image
                    style={styles.moreIcon}
                    source={require('./more.png')}
                  />
                </View>
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.content}>{children}</View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    borderBottomColor: '#f0f0f0',
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
  },
  moreBox: {
    flexDirection: 'row',
  },
  more: {
    color: '#999999',
  },
  moreIcon: {
    marginLeft: 5,
    width: 7,
    height: 12,
  },
  content: {
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
});
