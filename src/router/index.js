import { createRouter, createWebHashHistory } from "vue-router";

import Home from "../views/Home.vue";
import Notice from "../views/Notice.vue";
import Score from "../views/Score.vue";
import Form from "../views/Form.vue";
import User from "../views/User.vue";
import Personal from "../views/Personal.vue";
import School from "../views/School.vue";
import Class from "../views/Class.vue";
import Stuedent from "../views/Stuedent.vue"

const routes = [
  {
    name: "index",
    path: "/",
    children: [
      {
        name: "home",
        path: "/home",
        alias: "/",
        // redirect: "/",
        component: Home,
      },
      {
        name: "notice",
        path: "/notice",
        component: Notice,
      },
      {
        name: "score",
        path: "/score",
        component: Score,
      },
      {
        name: "form",
        path: "/form",
        component: Form,
      },
      {
        name: "user",
        path: "/user",
        component: User,
        children: [
          {
            name: "personal",
            path: "personal",
            component: Personal,
          },
          {
            name: "school",
            path: "school",
            component: School,
          },
          {
            name: "class",
            path: "class",
            component: Class,
          },
          {
            name: "stuedent",
            path: "stuedent",
            component: Stuedent,
          }
        ],
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
