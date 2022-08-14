<script setup>
import { reactive, ref, toRefs } from "vue";

const name = ref("江离");
const photo = ref("/src/assets/images/1803.jpg");

const style = ref(`background: linear-gradient(
    to top,
    rgba(54, 177, 191, 1),
    rgba(54, 177, 191, 0)
  ),
  url(${photo.value}) no-repeat 0px 0px;
  background-size: 100% 100%;`);
</script>

<template>
  <div class="top" :style="style"></div>
  <img class="photo" :src="photo" alt="photo" />
  <span class="user">{{ name }}</span>
</template>

<style scoped>
.top {
  margin: auto;
  height: 2rem;
  /* 设置渐变 */
  /* background: linear-gradient(
      to top,
      rgba(54, 177, 191, 1),
      rgba(54, 177, 191, 0)
    ),
    url(/src/assets/images/01ch.jpg) no-repeat 0px 0px; */
  /* background-size: 100% 100%; */
  /* opacity: 0.5; */
  /* 设置模糊 */
  filter: blur(4px);
  -webkit-filter: blur(4px);
}
.user,
.photo {
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
}
.photo {
  top: 0.5rem;
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  border: 3px solid #f2385a;
}
.user {
  width: 3.75rem;
  color: #f5a503;
  top: 1.6rem;
  font-size: 1.5em;
  text-align: center;
  z-index: 1;
}
</style>
