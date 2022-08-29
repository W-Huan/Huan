<template>
  <div class="top">
    <a class="exit" href="#/user/personal">返回</a>
    <span class="title">添加班级</span>
    <span class="save" @click="upload">保存</span>
  </div>
  <div class="content">
    <div id="grade" class="item" @click="showGradeC">
      年级：
      <span class="data">{{ grade }}</span>
    </div>
    <div id="class" class="item">
      班级：
      <input
        type="text"
        class="data"
        v-model="class_"
        placeholder="请输入班级编号"
        enterkeyhint="done"
        autocomplete="off"
        @click="showClassC"
        @keyup.enter="inputDone"
      />
    </div>
    <ul v-show="showGrade">
      <li v-for="grade in grades" @click.stop="selectGrade(grade)">
        {{ grade }}
      </li>
    </ul>
    <ul v-show="showClass" id="classes">
      <li v-for="_class in classes" @click.stop="selectClass(_class)">
        {{ _class }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from "vue";

function inputDone() {
  document.activeElement.blur(); //关闭手机软键盘
}

const grades = ["一年级", "二年级", "三年级", "四年级", "五年级", "六年级"];
const showGrade = ref(false);
const grade = ref("请输入年级编号");
function selectGrade(val) {
  grade.value = val;
  showGrade.value = false;
};
function showGradeC() {
  showGrade.value = true;
  showClass.value = false;
}

const class_ = ref("");
const showClass = ref(false);
const classes = [...Array(20)].map((_, k) => ++k);
function selectClass(val) {
  class_.value = val;
  showClass.value = false;
};
function showClassC() {
  showClass.value = true;
  showGrade.value = false;
}
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
.item {
  padding: 0.15rem 0;
}
.data {
  width: 2.3rem;
  float: right;
  text-align: right;
}

ul {
  margin-top: 20vh;
  height: calc(6em + 0.7rem);
  overflow-y: auto;
}
li {
  list-style: none;
  text-align: center;
  margin: 0.05rem;
  border-bottom: 1px solid #f5a503;
}
</style>
