import React from 'react';
import {
  View,
  Text,
  Image,
  Platform,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import {Banner} from './page-components';
import {Tab} from '../../components';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {repositoryDetailInit} from './redux';
import {queryItemReq} from './api';
import HTMLView from 'react-native-htmlview';

class HtmlContent extends React.Component {
  state = {
    html: '',
  };
  async componentDidMount(): void {
    const {id, resourceId, name} = this.props;

    const res = await queryItemReq({
      resource: 'university',
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
      <View>
        <HTMLView value={html} style={{color: '#000'}} />
      </View>
    );
  }
}

class RepositoryDetail extends React.Component {
  state = {};

  componentDidMount(): void {
    const {
      repositoryDetailInit,
      route: {params},
    } = this.props;
    repositoryDetailInit({
      id: params.id,
    });
  }

  render() {
    const {
      init,
      data,
      navigation,
      route: {params},
    } = this.props;
    if (!init) {
      return <ActivityIndicator />;
    }
    const {
      detail: {
        address,
        country,
        id,
        imageUrl,
        jiaotongRanking,
        name,
        nameEn,
        qsRanking,
        thamesRanking,
        usnewsRanking,
        website,
      },
      infoItem,
    } = data;
    console.log(infoItem);

    for (let i = 0; i < infoItem.length; i++) {
      infoItem[i].component = () => {
        if (infoItem[i].infoItem) {
          return (
            <HtmlContent
              {...infoItem[i]}
              resourceId={params.id}
              navigation={this.props.navigation}
              queryItem={params => this.props.queryItem(params)}
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
          return <Tab navigation={navigation} tabContent={infoItem[i].items} />;
        }
      };
    }

    return (
      <Tab
        common={
          <View style={styles.repositoryDetail}>
            <Banner imageUrl={[imageUrl]} />
            <View style={styles.school}>
              <View>
                <Image style={styles.logo} source={{uri: imageUrl}} />
              </View>
              <View style={styles.msgBox}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.enName}>{nameEn}</Text>
                <View style={styles.msgItem}>
                  <Image
                    style={styles.icon}
                    source={require('./images/link.png')}
                  />
                  <Text style={styles.link}>{website}</Text>
                </View>
                <View style={styles.msgItem}>
                  <Image
                    style={styles.icon}
                    source={require('./images/address.png')}
                  />
                  <Text style={styles.link}>
                    {country}
                    {address && `- ${address}`}
                  </Text>
                </View>

                <View style={styles.rankItem}>
                  <Text style={styles.rank}>
                    <Text style={styles.qs}>QS 排名</Text>
                    <Text style={styles.qsValue}>{qsRanking}</Text>
                  </Text>
                  <Text style={styles.rank}>USNEW 排名{usnewsRanking}</Text>
                </View>
                <View style={styles.rankItem}>
                  <Text style={styles.rank}>泰晤士排名{thamesRanking}</Text>
                  <Text style={styles.rank}>上海交大排名{jiaotongRanking}</Text>
                </View>
              </View>
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
  state => state.repositoryDetail,
  dispatch => bindActionCreators({repositoryDetailInit}, dispatch),
)(RepositoryDetail);

const styles = StyleSheet.create({
  repositoryDetail: {
    backgroundColor: '#fff',
    // paddingTop: Platform.OS && 30,
  },

  school: {
    flexDirection: 'row',
    position: 'relative',
    zIndex: 4,
    marginTop: -30,
    marginHorizontal: 15,
    borderRadius: 5,
    padding: 15,
    borderColor: '#ccc',
    borderWidth: 1,
    backgroundColor: '#fff',
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
    resizeMode: 'cover',
  },

  msgBox: {
    paddingLeft: 10,
    flex: 1,
  },

  name: {
    fontSize: 20,
  },
  enName: {
    color: '#999',
  },
  msgItem: {
    marginBottom: 5,
    flexDirection: 'row',
    alignContent: 'flex-end',
  },
  icon: {
    width: 11,
    height: 11,
    resizeMode: 'contain',
  },
  link: {
    color: '#666',
  },

  rankItem: {
    marginBottom: 10,
    flexDirection: 'row',
  },
  rank: {
    width: '50%',
  },

  qs: {
    borderWidth: 10,
    // borderStyle: 'solid',
    // borderColor: 'red',
    borderBottomWidth: 10,
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
    textShadowColor: '#ff0000',
  },
  qsValue: {
    fontSize: 20,
    color: '#12a8cd',
  },
});
