<template>
  <Nav />
  <UserHeader />
  <div class="content">
    <a href="#/user/school">
      我的学校
      <span>&nbsp;&nbsp;></span>
      <span>实验小学</span>
    </a>
    <a href="#">
      我的班级
      <span>></span>
    </a>
    <a href="#">
      我的学生
      <span>></span>
    </a>
    <a href="#">
      我的角色
      <span>&nbsp;&nbsp;></span>
      <span>校务</span>
    </a>
  </div>
  <a id="service" class="content" href="#">客服中心</a>
</template>

<script setup>
import Nav from "../components/Nav.vue"
import UserHeader from "../components/UserHeader.vue"

</script>

<style scoped>
.content a {
  display: block;
  padding: 0.15rem 0;
}
.content a span {
  float: right;
}
#service {
  display: block;
  text-align: center;
}
</style>
