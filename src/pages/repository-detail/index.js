import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  Dimensions,
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
import WebView from 'react-native-webview';
import AutoSizedImage from './AutoSizedImage';

const {width, height} = Dimensions.get('window');

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

  _renderNode(node, index, siblings, parent, defaultRenderer) {
    console.log(node.name);
    if (node.name === 'img') {
      const data = node.attribs;
      Image.getSize(data.src, (w, h) => {
        //这里的w和h就是图片的宽高
        // console.log(w, h);
        return <Text>hello</Text>;
        // return (
        //     <Image
        //       key={index}
        //       source={{uri: data.src}}
        //       resizeMode="cover"
        //       style={{height: h, width: width}}
        //     />
        // );
      });
      console.log('sssss');
      return (
        <Image
          key={index}
          source={{uri: data.src}}
          resizeMode="contain"
          style={{height: 500, width: width}}
        />

        // <AutoSizedImage
        //   key={index}
        //   source={{uri: data.src}}
        //   resizeMode="contain"
        //   style={{height: 0, width: width}}
        // />
      );
    }
  }

  render() {
    const {html} = this.state;
    return (
      <ScrollView>
        {/*<HTMLView*/}
        {/*  value={html}*/}
        {/*  renderNode={this._renderNode}*/}
        {/*  style={{color: '#000'}}*/}
        {/*  stylesheet={{*/}
        {/*    image: {*/}
        {/*      width: 200,*/}
        {/*    },*/}
        {/*  }}*/}
        {/*/>*/}

        <WebView
          style={{height: height - 40}}
          originWhitelist={['*']}
          source={{
            html: `
              <html>
                <head>
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                </head>
                <style>
                  img{
                    width: 100%;
                  }
                </style>
            
                <body>
                  ${html}
                </body>
              </html>
             `,
          }}
        />
      </ScrollView>
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
    console.log(this.props.data);

    if (!init) {
      return <ActivityIndicator />;
    }
    const {
      detail: {
        address,
        country,
        id,
        imageUrl = '',
        jiaotongRanking,
        logoUrl,
        name,
        nameEn,
        qsRanking,
        thamesRanking,
        usnewsRanking,
        website,
      },
      infoItem,
    } = data;
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

    console.log('imageUrl', imageUrl);
    return (
      <ScrollView scrollIndicatorInsets={{right: 1}}>
        <View style={{paddingBottom: 30}}>
          <Tab
            common={
              <View style={styles.repositoryDetail}>
                <Banner imageUrl={[imageUrl]} />
                <View style={styles.school}>
                  <View>
                    <Image
                      style={styles.logo}
                      source={
                        logoUrl
                          ? {uri: logoUrl}
                          : require('../../assets/images/logo.jpeg')
                      }
                    />
                  </View>
                  <View style={styles.msgBox}>
                    <Text style={styles.name}>{name}</Text>
                    <Text style={styles.enName}>{nameEn}</Text>
                    <View style={styles.msgItem}>
                      <Image
                        style={styles.icon}
                        source={require('./images/link.png')}
                      />
                      <Text style={styles.link} numberOfLines={1}>
                        {website}
                      </Text>
                    </View>
                    <View style={styles.msgItem}>
                      <Image
                        style={styles.icon}
                        source={require('./images/address.png')}
                      />
                      <Text style={styles.link} numberOfLines={1}>
                        {country}
                        {address && `- ${address}`}
                      </Text>
                    </View>

                    <View style={styles.rankItem}>
                      <Text style={styles.rank} numberOfLines={1}>
                        <Text style={styles.qs}>QS 排名</Text>
                        <Text style={styles.qsValue}>{qsRanking}</Text>
                      </Text>
                      <Text style={styles.rank} numberOfLines={1}>
                        <Text style={styles.usnews}>USNEW 排名</Text>
                        <Text style={styles.usnewsValue}>{usnewsRanking}</Text>
                      </Text>
                    </View>
                    <View style={styles.rankItem}>
                      <Text style={styles.rank} numberOfLines={1}>
                        <Text style={styles.thames}>泰晤士排名</Text>
                        <Text style={styles.thamesValue}>{thamesRanking}</Text>
                      </Text>

                      <Text style={styles.rank} numberOfLines={1}>
                        <Text style={styles.jiaotong}>上海交大排名</Text>
                        <Text style={styles.jiaotongValue}>
                          {jiaotongRanking}
                        </Text>
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            }
            navigation={navigation}
            tabContent={infoItem}
          />
        </View>
      </ScrollView>
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
    width: 80,
    height: 80,
    borderRadius: 40,
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
    borderBottomWidth: 10,
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
    textDecorationColor: '#12a8cd',
  },
  qsValue: {
    fontSize: 20,
    color: '#12a8cd',
  },
  usnews: {
    borderBottomWidth: 10,
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
    textDecorationColor: '#f4599e',
  },
  usnewsValue: {
    fontSize: 20,
    color: '#f4599e',
  },

  thames: {
    borderBottomWidth: 10,
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
    textDecorationColor: '#ff821d',
  },
  thamesValue: {
    fontSize: 20,
    color: '#ff821d',
  },

  jiaotong: {
    borderBottomWidth: 10,
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
    textDecorationColor: '#1cc10f',
  },
  jiaotongValue: {
    fontSize: 20,
    color: '#1cc10f',
  },
});
