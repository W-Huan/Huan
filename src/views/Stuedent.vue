<template>
  <div class="top">
    <a class="exit" href="#/user/personal">返回</a>
    <span class="title">学生列表</span>
    <a class="save" href="#">添加</a>
  </div>
  <div class="content">
    <!-- <div class="item">
      Excel文件添加
      <input type="file" name="student" id="student" />
    </div>
    <div class="item">
      姓名：
      <input
        type="text"
        class="data"
        v-model="name"
        placeholder="请输入学生姓名"
        enterkeyhint="done"
        autocomplete="off"
        @keyup.enter="inputDone"
      />
    </div>
    <div class="item">
      学号：
      <input
        type="text"
        class="data"
        v-model="number"
        placeholder="请输入学生学号"
        enterkeyhint="done"
        autocomplete="off"
        @keyup.enter="inputDone"
      />
    </div> -->
    <div v-if="!studentArr.length">
      暂无学生，请&nbsp;<a href="#"><b>添加</b></a>
    </div>
    <ul v-else>
      <li>
        学号：姓名
      </li>
      <li v-for="student in studentArr">
        {{ student.id }}：{{ student.name }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from "vue";

const studentArr = ref([
  {
    id: 1,
    name: "stuedent",
  },
  {
    id: 2,
    name: "stuedent",
  },
  {
    id: 3,
    name: "stuedent",
  },
  {
    id: 4,
    name: "stuedent",
  },
]);
</script>

<style scoped>
.top {
  overflow: hidden;
  padding: 0.2rem 0;
}
.exit,
.title,
.save {
  display: block;
  float: left;
  color: #1c1d21;
  font-size: 0.2rem;
  width: 0.8rem;
  text-align: center;
}
.title {
  width: 2.15rem;
}
.save {
  color: #f2385a;
}
.content {
  margin: auto;
  padding: 0 0.2rem;
  background: rgb(213, 235, 225);
  width: 3.15rem;
  height: calc(100vh - 0.82rem);
  border-radius: 0.1rem;
  /* color: #f5a503; */
}
/* .item {
  padding: 0.15rem 0;
}
.data {
  width: 2.3rem;
  float: right;
  text-align: right;
} */

ul {
  padding-top: 0.15rem;
}
li {
  list-style: none;
  margin: 0.05rem;
}
</style>
