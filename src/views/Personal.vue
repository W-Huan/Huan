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
  <a id="service" class="content" href="#">客服中心</a>
</template>

<script setup>
import Nav from "../components/Nav.vue"
import UserHeader from "../components/UserHeader.vue"

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
#service {
  margin-bottom: 3em;
  display: block;
  text-align: center;
}
</style>
