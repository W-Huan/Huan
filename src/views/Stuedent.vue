<template>
  <div class="top">
    <a class="exit" href="#/user/personal">返回</a>
    <span class="title">添加学生</span>
    <span class="save" @click="upload">保存</span>
  </div>
</template>

<script>

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
}</style>
