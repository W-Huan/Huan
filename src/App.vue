<script>
// import Home from './views/Home.vue';
// import Personal from './views/Personal.vue'
// import School from './views/School.vue'

export default {
  name: "App",
  // components: { Home, Personal, School },
  setup() {},
};

</script>

<template>
  <div class="nav">
    <router-link active-class="active" to="/">主页</router-link>
    <router-link active-class="active" to="/notice">通知</router-link>
    <router-link active-class="active" to="/score">成绩</router-link>
    <router-link active-class="active" to="/form">表单</router-link>
    <router-link active-class="active" to="/user">我的</router-link>
  </div>
  <router-view></router-view>
  <!-- <Home /> -->
  <!-- <School></School> -->

  
</template>


<style>
.nav {
  position: fixed;
  margin: auto;
  width: 3.75rem;
  background-color: #4ad9d9;
  border-top: 2px solid #f5a503;
  overflow: hidden;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
}
.nav a {
  width: 0.75rem;
  height: 3em;
  color: #1c1d21;
  line-height: 3em;
  text-align: center;
  display: block;
  float: left;
}
.nav .active {
  color: #f2385a;
}
.title {
  padding-top: 0.2rem;
  color: #f5a503;
  font-size: 0.2rem;
  text-align: center;
}
.content {
  margin: auto;
  margin-top: 0.2rem;
  padding: 0.15rem 0.2rem;
  background: #e9f1df;
  width: 3.15rem;
  border-radius: 0.1rem;
}
</style>
