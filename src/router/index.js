import { createRouter, createWebHashHistory } from 'vue-router';

import Home from '../views/Home.vue';
import Notice from '../views/Notice.vue';
import Score from '../views/Score.vue';
import Form from '../views/Form.vue';
import User from '../views/User.vue'
import Personal from '../views/Personal.vue';
import School from '../views/School.vue';

const routes = [
  {
    name: 'home',
    path: '/',
    component: Home,
  },
  {
    name: 'notice',
    path: '/notice',
    component: Notice,
  },
  {
    name: 'score',
    path: '/score',
    component: Score,
  },
  {
    name: 'form',
    path: '/form',
    component: Form,
  },
  {
    name: 'user',
    path: '/user',
    component: User,
    children: [
      {
        name: 'personal',
        path: 'personal',
        component: Personal,
      },
      {
        name: 'school',
        path: 'school',
        component: School,
      },
    ],
  },
];

const router = createRouter({
  // 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes, // `routes: routes` 的缩写
});
export default router;
