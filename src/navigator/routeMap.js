import Login from '../pages/login';
import Register from '../pages/register';
import Concern from '../pages/concern';
import Background from '../pages/background';
import Library from '../pages/library';
import Repository from '../pages/repository';
import Note from '../pages/note';
import Setting from '../pages/setting';
import About from '../pages/about';

import Summer from '../pages/summer';
import SummerDetail from '../pages/summer-detail';
import Case from '../pages/case';

const router = [
  {
    name: 'Login',
    component: Login,
    options: {
      title: null,
      headerBackTitle: null,
      headerBackIcon: null,
      headerTruncatedBackTitle: null,
      headerTransparent: true, //设置头部透明}},
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
      title: '项目详情',
    },
  },
];

export default router;
