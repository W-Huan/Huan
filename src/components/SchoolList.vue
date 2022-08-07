<template>
  <div id="school-list" ref="school-list">
    <div class="exit-wrap">
      <span id="school-title">是否有您的学校呢</span>
      <span class="exit-btn" @click.stop="exitSchoolList">×</span>
    </div>
    <div id="school-options">
      <span v-for="school in schoolArr.list" :keys="school.id" class="options">
        {{ school.address }}
        <img class="img" :src="school.logo" alt="" />
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onBeforeUpdate, watch } from "vue";
import axios from "axios";

const schoolArr = reactive({ list: [] });

const props = defineProps({ name: String });

const emit = defineEmits(["showSchoolC", "getInfo"]);

function exitSchoolList() {
  emit("showSchoolC", false);
}

// onBeforeUpdate(() => {

// });
let tid
watch(
  () => props.name,
  () => {
    if (!props.name) return;
    axios
      .get("http://192.168.3.12:5000/user/school", {
        params: { school: props.name },
      })
      .then((response) => {
        schoolArr.list = response.data.data;
        if (schoolArr.list.length) {
          emit("showSchoolC", true);
        } else {
          emit("showSchoolC", false);
          let info = "暂无贵校，请填写详细信息添加学校";
          emit("getInfo", info);
          clearTimeout(tid)
          tid = setTimeout(() => {
            emit("getInfo", "");
          }, 2000);
          console.log(tid);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
);
</script>

<style scoped>
.exit-btn {
  float: right;
  font-size: 0.2rem;
}
.exit-wrap {
  overflow: hidden;
}
.options {
  display: block;
}
#school-list {
  position: absolute;
  top: 1.1rem;
  bottom: 0.1rem;
  left: 0.1rem;
  border-radius: 0.1rem;
  overflow: hidden;
  background: #e9f1df;
  z-index: 2;
  padding: 0 0.2rem;
  width: 3.15rem;
}
#school-options {
  overflow-y: auto;
  width: 3.7rem;
  height: calc(100vh - 1.55rem);
}
#school-list .img {
  width: 3.15rem;
  height: 1.2rem;
  margin: 0.05rem 0 0.15rem 0;
}
#school-title {
  float: left;
  color: #f2385a;
}
</style>
