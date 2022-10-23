<template>
  <Nav />
  <UserHeader />
  <div class="content">
    <a href="#/user/school">
      我的学校
      <span>&nbsp;&nbsp;></span>
      <span>{{ school }}</span>
    </a>
    <a href="#/user/class">
      我的班级
      <span>></span>
    </a>
    <a href="#/user/stuedent">
      我的学生
      <span>></span>
    </a>
    <a href="#/user/role">
      我的角色
      <span>&nbsp;&nbsp;></span>
      <span>{{ role }}</span>
    </a>
  </div>
  <a id="service" class="content dis-block" href="#">客服中心</a>
  <a v-if="login" id="logout" class="content dis-block" @click="logout">注销</a>
  <a v-else id="login" class="content dis-block" href="#/user/login">登录</a>
</template>

<script setup>
import { ref, onMounted, inject } from "vue";
// import { useRouter } from "vue-router";
import axios from "axios";
import Nav from "../components/Nav.vue";
import UserHeader from "../components/UserHeader.vue";

// const router = useRouter();
const reload = inject("reload");

const login = ref(false);

const school = ref("");
const role = ref("");

onMounted(() => {
  let user = localStorage.getItem("user");
  user = JSON.parse(user);
  if (user !== null && user.token !== null) {
    let data = localStorage.getItem("data");
    data = JSON.parse(data);
    if (data !== null && data.name === user.username) {
      school.value = data.school;
      role.value = data.role;
      login.value = true;
    } else {
      axios
        .get("http://192.168.3.12:5000/user/signin", {
          params: {
            token: user.token,
          },
        })
        .then((response) => {
          let data = response.data;
          console.log(data);
          if (data.msg === "success") {
            localStorage.setItem("data", JSON.stringify(data.info));
            school.value = data.info.school;
            role.value = data.info.role;
            login.value = true;
          } else {
            console.log(data.msg);
          }
        });
    }
  }
});

function logout() {
  localStorage.removeItem("user");
  localStorage.removeItem("data");
  login.value = false;
  reload();
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
