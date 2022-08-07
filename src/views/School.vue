<template>
  <div class="top">
    <a class="exit" href="#/user/personal">返回</a>
    <span class="title">添加学校</span>
    <span class="save" @click="upload">保存</span>
  </div>
  <div class="info">
    <div id="name">
      学校名称：
      <input
        type="text"
        class="data"
        v-model="name"
        placeholder="请输入学校名称"
        enterkeyhint="done"
        autocomplete="off"
        @keyup.enter="inputDone"
      />
    </div>
    <SchoolList
      v-show="showSchool"
      :name="name"
      @getInfo="getInfo"
      @showSchoolC="showSchoolC"
    />
    <div
      id="head-address"
      tabindex="0"
      @click="showAddressArrC(true)"
      @blur="showAddressArrC(false)"
    >
      <!-- 隐藏滚动条 -->
      <div class="address-wrap">
        学校地址：
        <span class="data">
          {{ address }}
        </span>
      </div>
      <AddressList
        v-show="showAddressArr"
        @getAddress="getAddress"
        @showAddressArrC="showAddressArrC"
      />
    </div>
    <div id="tail-address">
      详细地址：
      <input
        type="text"
        class="data"
        v-model="tailAddress"
        placeholder="请输入详细地址"
        enterkeyhint="done"
        autocomplete="off"
        @keyup.enter="inputDone"
      />
    </div>
    <div id="image">
      学校图片：
      <span class="data" @click="showImageCutC(true)"> 请上传学校图片 </span>
      <CutPicture
        v-show="showImageCut"
        @showImageCutC="showImageCutC"
        @showImage="showImage"
      />
      <img class="img" :src="image" alt="jpeg,jpg,png,bmp图片" />
    </div>
    <div id="info" v-show="info">
      {{ info }}
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import SchoolList from "../components/SchoolList.vue";
import AddressList from "../components/AddressList.vue";
import CutPicture from "../components/CutPicture.vue";

let tid = 0;
const info = ref("");

// 输入完成，关闭键盘
function inputDone() {
  document.activeElement.blur(); //关闭手机软键盘
};
function getInfo(val) {
  info.value = val;
};

// 学校名称
const name = ref("");
const showSchool = ref(false);
function showSchoolC(val) {
  showSchool.value = val;
};

// 学校地址
const address = ref("请输入学校地址");
const tailAddress = ref("");
const showAddressArr = ref(false);
function showAddressArrC(val) {
  showAddressArr.value = val;
};
function getAddress(val) {
  address.value = val
  console.log(address.value)

}

// 学校图片
const image = ref("src/assets/images/xingtan.png");
const showImageCut = ref(false);
function showImageCutC(val) {
  showImageCut.value = val;
};
function showImage(data) {
  image.value = data;
};

// 上传数据
function upload() {
  clearTimeout(tid);
  if (!name.value.trim()) {
    info.value = "学校名称为空";
    tid = setTimeout(() => {
      info.value = "";
    }, 2000);
    console.log("name or address is none");
    return;
  }
  if (!tailAddress.value.trim() || address.value.trim() == "请输入学校地址") {
    info.value = "学校地址不完整";
    tid = setTimeout(() => {
      info = "";
    }, 2000);
    console.log("name or address is none");
    return;
  }
  let params = new FormData();
  if (image.value) {
    params.append("image", image.value);
  }
  params.append("name", name.value.trim());
  params.append("address", address.value + tailAddress.value.trim());
  console.log(params);
  axios
    .post("http://192.168.3.12:5000/user/school", params, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((response) => {
      console.log(response.data);
      info.value = response.data;
    })
    .catch((error) => {
      console.log(error);
      info.value = error;
    });
};
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
.info {
  background: #e9f1df;
  border-radius: 0.1rem;
  margin: 0 0.1rem;
  padding: 0 0.2rem;
  /* position: relative; */
  width: 3.15rem;
}
.data {
  width: 2.3rem;
  float: right;
  text-align: right;
}
.address-wrap {
  height: 0.2rem;
  overflow: hidden;
}
.img {
  width: 3.15rem;
  height: 1.2rem;
  margin-top: 0.15rem;
  border: 1px solid #36b1bf;
}
#name,
#head-address,
#tail-address,
#image {
  padding: 0.15rem 0;
}
.address-wrap .data {
  height: 0.35rem;
  overflow-x: auto;
  white-space: nowrap;
}
#info {
  position: absolute;
  top: 1.05rem;
  width: 3.15rem;
  text-align: center;
  padding-bottom: 0.15rem;
  color: #f2385a;
}
input {
  font-size: 0.16rem;
  border: 0;
  background: transparent;
  color: #36b1bf;
}
/* 设置input激活时边框 */
input:focus {
  outline: 1px solid #36b1bf;
}
/* 设置input激活时提示文字颜色 */
input:focus::-webkit-input-placeholder {
  color: transparent;
}
/* 设置input提示文字颜色 */
/* Safari，Chrome WebKit browsers */
input::-webkit-input-placeholder {
  color: #36b1bf;
}
/* 火狐 Mozilla Firefox 4 to 18  */
input:-moz-placeholder {
  color: #36b1bf;
}
/* 火狐 Mozilla Firefox 19+  */
input::-moz-placeholder {
  color: #36b1bf;
}
/* Internet Explorer 10+  */
input:-ms-input-placeholder {
  color: #36b1bf;
}
</style>
