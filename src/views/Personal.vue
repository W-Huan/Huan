<template>
  <Nav />
  <UserHeader />
  <div class="content">
    <a href="#/user/school">
      我的学校
      <span>&nbsp;&nbsp;></span>
      <span>实验小学</span>
    </a>
    <a href="#/user/class">
      我的班级
      <span>></span>
    </a>
    <a href="#/user/stuedent">
      我的学生
      <span>></span>
    </a>
    <a href="#">
      我的角色
      <span>&nbsp;&nbsp;></span>
      <span>校务处</span>
    </a>
  </div>
  <a id="service" class="content dis-block" href="#">客服中心</a>
  <a v-if="login" id="logout" class="content dis-block" @click="logout">注销</a>
  <a v-else id="login" class="content dis-block" href="#/user/login">登录</a>
</template>

<script setup>
import { ref, onMounted, inject } from "vue";
import { useRouter } from "vue-router";
import Nav from "../components/Nav.vue";
import UserHeader from "../components/UserHeader.vue";

const router = useRouter();
const reload = inject('reload')

const login = ref(false);

onMounted(() => {
  let data = localStorage.getItem("data");
  if (data !== null) {
    login.value = true;
  }
})

function logout() {
  localStorage.removeItem("data")
  login.value = false;
  reload()
  // router.go(0)
}
</script>

<style scoped>
.content {
  margin: auto;
  margin-top: 0.2rem;
  padding: 0.15rem 0.2rem;
  background: #e9f1df;
  width: 3.15rem;
  border-radius: 0.1rem;
}
.content a {
  display: block;
  padding: 0.15rem 0;
}
.content a span {
  float: right;
}
.dis-block {
  /* margin-bottom: 3em; */
  display: block;
  text-align: center;
}
</style>
