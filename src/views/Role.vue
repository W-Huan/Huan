<template>
  <div class="top">
    <a class="exit" href="#/user/personal">返回</a>
    <span class="title">我的角色</span>
    <span class="save" @click="upload">保存</span>
  </div>
  <div class="content">
    <div class="item">我的职务</div>
    <div class="item">
      <input
        type="checkbox"
        name="校务处"
        id="0"
        value="校务处"
        v-model="role"
      />校务处
    </div>
    <div class="item">
      <input
        type="checkbox"
        name="年级处"
        id="1"
        value="年级处"
        v-model="role"
      />年级处
    </div>
    <div class="item">
      <input
        type="checkbox"
        name="班主任"
        id="2"
        value="班主任"
        v-model="role"
      />班主任
    </div>
    <div class="item">
      <input
        type="checkbox"
        name="教师"
        id="3"
        value="教师"
        v-model="role"
      />教师
    </div>
    <div class="item">
      <input
        type="checkbox"
        name="家长"
        id="4"
        value="家长"
        v-model="role"
      />家长
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const role = ref([]);

function upload() {
  console.log("role");
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
</style>
