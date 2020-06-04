import React from 'react';
import {
  View,
  Image,
  Button,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';
import Login from '../pages/login';
import Register from '../pages/register';
import Concern from '../pages/concern';
import Background from '../pages/background';
import BackgroundDetail from '../pages/background-detail';
import Library from '../pages/library';
import Repository from '../pages/repository';
import RepositoryDetail from '../pages/repository-detail';
import Note from '../pages/note';
import Setting from '../pages/setting';
import About from '../pages/about';

import Summer from '../pages/summer';
import SummerDetail from '../pages/summer-detail';
import Case from '../pages/case';
import CaseDetail from '../pages/case-detail';
import CaseList from '../pages/case-list';
import Group from '../pages/group';
import GroupAll from '../pages/group-all';
import FindDetail from '../pages/find-detail';
import EditInfo from '../pages/edit-info';
import Feedback from '../pages/feedback';
import Message from '../pages/message';
import Service from '../pages/service';
import Collect from '../pages/collect';
import Publish from '../pages/publish';
import Join from '../pages/join';
import Test from '../pages/test';

const router = [
  {
    name: 'Login',
    component: Login,
    options: {
      title: null,
      headerBackTitle: null,
      headerBackIcon: null,
      headerTruncatedBackTitle: null,
      headerTransparent: true, //设置头部透明,
    },
  },
  {
    name: 'Background',
    component: Background,
    options: {
      title: '背景提升',
      // headerShown: false, //删除头部
    },
  },
  {
    name: 'BackgroundDetail',
    component: BackgroundDetail,
    options: {
      title: '背景提升',
      // headerShown: false, //删除头部
    },
  },
  {
    name: 'Register',
    component: Register,
    options: {
      title: '注册',
    },
  },
  {
    name: 'Concern',
    component: Concern,
    options: {
      title: '我的关注',
    },
  },
  {
    name: 'Library',
    component: Library,
    options: {
      title: '专业库',
    },
  },
  {
    name: 'Repository',
    component: Repository,
    options: {
      title: '院校库',
    },
  },
  {
    name: 'RepositoryDetail',
    component: RepositoryDetail,
    options: {
      headerShown: false, //删除头部
    },
  },
  {
    name: 'Note',
    component: Note,
    options: {
      title: '笔记',
    },
  },
  {
    name: 'Setting',
    component: Setting,
    options: {
      title: '系统设置',
    },
  },
  {
    name: 'About',
    component: About,
    options: {
      title: '关于我们',
    },
  },
  {
    name: 'Case',
    component: Case,
    options: {
      title: '全球案例',
    },
  },
  {
    name: 'CaseList',
    component: CaseList,
    options: {
      title: '申请案例',
    },
  },
  {
    name: 'CaseDetail',
    component: CaseDetail,
    options: {
      title: '案例详情',
    },
  },

  {
    name: 'Summer',
    component: Summer,
    options: {
      title: '暑假项目',
    },
  },
  {
    name: 'SummerDetail',
    component: SummerDetail,
    options: {
      title: '暑假项目详情',
    },
  },

  {
    name: 'Group',
    component: Group,
    options: {
      title: '发现小组',
      headerBackTitle: null,
      headerTruncatedBackTitle: null,
      headerTransparent: true,
    },
  },

  {
    name: 'GroupAll',
    component: GroupAll,
    options: {
      title: '分类找小组',
    },
  },
  {
    name: 'FindDetail',
    component: FindDetail,
    options: {
      title: null,
      headerBackTitle: null,
      headerTruncatedBackTitle: null,
      headerTransparent: true,
    },
  },
  {
    name: 'EditInfo',
    component: EditInfo,
    options: {
      title: '编辑信息',
      headerBackTitle: null,
      headerTruncatedBackTitle: null,
    },
  },
  {
    name: 'Feedback',
    component: Feedback,
    options: {
      title: '意见反馈',
      headerBackTitle: null,
      headerTruncatedBackTitle: null,
      // headerLeft: props => (
      //   <View style={{flexDirection: 'row'}}>
      //     <TouchableWithoutFeedback
      //       onPress={() => {
      //         // navigation.goBack();
      //       }}>
      //       <Image
      //         style={styles.back}
      //         source={require('../assets/images/back.png')}
      //       />
      //     </TouchableWithoutFeedback>
      //     <TouchableWithoutFeedback
      //       onPress={() => {
      //         alert('退出');
      //       }}>
      //       <Image
      //         style={styles.back}
      //         source={require('../assets/images/close.png')}
      //       />
      //     </TouchableWithoutFeedback>
      //   </View>
      // ),
      headerRight: () => (
        <Button
          onPress={() => alert('This is a button!')}
          title="发送"
          color="#ddd"
        />
      ),
    },
  },
  {
    name: 'Message',
    component: Message,
    options: {
      title: '消息中心',
      headerBackTitle: null,
      headerTruncatedBackTitle: null,
    },
  },
  {
    name: 'Service',
    component: Service,
    options: {
      title: '客服中心',
      headerBackTitle: null,
      headerTruncatedBackTitle: null,
    },
  },
  {
    name: 'Collect',
    component: Collect,
    options: {
      title: '我的收藏',
      headerBackTitle: null,
      headerTruncatedBackTitle: null,
    },
  },
  {
    name: 'Publish',
    component: Publish,
    options: {
      title: '我的发布',
      headerBackTitle: null,
      headerTruncatedBackTitle: null,
    },
  },
  {
    name: 'Join',
    component: Join,
    options: {
      title: '加入',
      headerBackTitle: null,
      headerTruncatedBackTitle: null,
    },
  },
  {
    name: 'Test',
    component: Test,
    options: {
      title: 'Test',
      headerBackTitle: null,
      headerTruncatedBackTitle: null,
    },
  },
];

const styles = StyleSheet.create({
  back: {
    marginLeft: 10,
    width: 18,
    height: 17,
    resizeMode: 'cover',
  },
});
export default router;
