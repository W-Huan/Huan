<template>
  <div class="top">
    <a class="exit" href="personal.html">返回</a>
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
        @blur="getSchool"
      />
    </div>
    <div id="school-list" ref="school-list">
      <div class="exit-wrap">
        <span id="school-title">是否有您的学校呢</span>
        <span class="exit-btn" @click.stop="exitSchoolList">×</span>
      </div>
      <div id="school-options">
        <span v-for="school in schoolArr" :keys="school.id" class="options">
          {{ school.address }}
          <img class="img" :src="school.logo" alt="" />
        </span>
      </div>
    </div>
    <!-- tabindex="0"属性可使div触发获取焦点和失去焦点事件 -->
    <div
      id="head-address"
      tabindex="0"
      @click="showAddressArr"
      @blur="addressBlur"
    >
      <!-- 隐藏滚动条 -->
      <div class="address-wrap">
        学校地址：
        <span class="data">
          {{ address }}
        </span>
      </div>

      <div ref="address" id="address">
        <div class="exit-wrap">
          <span class="exit-btn" @click.stop="addressBlur">×</span>
        </div>
        <div class="address-wrap">
          <span id="address-title">
            <span @click="selectProvince">
              {{ province }}
            </span>
            <span @click="selectCity">
              {{ city }}
            </span>
            <span @click="selectCounty">
              {{ county }}
            </span>
            <span>
              {{ town }}
            </span>
          </span>
        </div>
        <hr />
        <div id="address-options">
          <span
            v-for="value in addressArr"
            class="options"
            @click.stop="selectAddress(value)"
          >
            {{ value }}
          </span>
        </div>
      </div>
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
      <span class="data" @click="showImageCut"> 请上传学校图片 </span>
      <div ref="cut-page" id="cut-page">
        <div class="exit-wrap">
          <span class="exit-btn" @click.stop="exitImageCut">×</span>
        </div>
        <div class="cut">
          <vue-cropper
            ref="cropper"
            :img="option.img"
            :output-size="option.outputSize"
            :output-type="option.outputType"
            :info="option.info"
            :can-scale="option.canScale"
            :auto-crop="option.autoCrop"
            :auto-crop-width="option.autoCropWidth"
            :auto-crop-height="option.autoCropHeight"
            :fixed="option.fixed"
            :fixed-number="option.fixedNumber"
            :full="option.full"
            :fixed-box="option.fixedBox"
            :can-move="option.canMove"
            :can-move-box="option.canMoveBox"
            :original="option.original"
            :center-box="option.centerBox"
            :high="option.high"
            :info-true="option.infoTrue"
            :max-img-size="option.maxImgSize"
            :enlarge="option.enlarge"
            :mode="option.mode"
            @real-time="realTime"
            @img-load="imgLoad"
          >
          </vue-cropper>
        </div>
        <div
          class="show-preview"
          :style="{
            width: previews.w + 'px',
            height: previews.h + 'px',
            overflow: 'hidden',
            'margin-left': '0.2rem',
            background: '#fff',
          }"
        >
          <div :style="previews.div">
            <img :src="previews.url" :style="previews.img" style="padding: 0" />
          </div>
        </div>
        <div class="cut-btn">
          <div class="control">
            <button @click="changeScale(1)">⊕ 放大</button>
            <button @click="changeScale(-1)">⊝ 缩小</button>
            <button @click="rotateLeft">↺ 左旋</button>
            <button @click="rotateRight">↻ 右旋</button>
          </div>
          <div class="file">
            <label for="uploadImage">
              <button id="load">选择图片</button>
              <input
                type="file"
                ref="imageFile"
                accept="image/jpeg, image/png"
                @change="loadImage($event)"
              />
            </label>
            <button id="save" @click="saveImage">完成</button>
          </div>
        </div>
      </div>
      <img
        class="img"
        src="../../data/image/xingtan.png"
        ref="image"
        alt="jpeg,jpg,png,bmp图片"
      />
    </div>
    <div id="info" v-show="info">
      {{ info }}
    </div>
  </div>
</template>

<script>
// import { VueCropper } from 'vue-cropper'
export default {
//   components: {
//     VueCropper,
//   },
  data() {
    return {
      tid: 0,
      name: "",
      address: "请输入学校地址",
      tailAddress: "",
      province: "省/直辖市",
      city: "省辖市",
      county: "区/县",
      town: "乡镇/街道",
      flag: 0,
      image: "",
      info: "",
      addressArr: [],
      schoolArr: [],
      previews: {},
      option: {
        img: "", //裁剪图片的地址
        outputSize: 1, //裁剪生成图片的质量(可选0.1 - 1)
        full: false, //false按原比例裁切图片，不失真
        outputType: "png", //裁剪生成图片的格式（jpeg || png || webp）
        fixed: true, //是否开启截图框宽高固定比例
        info: true, //图片大小信息
        canScale: true, //图片是否允许滚轮缩放
        autoCrop: true, //是否默认生成截图框
        // 只有自动截图开启 宽度高度才生效
        autoCropWidth: 315, //默认生成截图框宽度
        autoCropHeight: 120, //默认生成截图框高度
        fixedNumber: [1000, 382], //截图框的宽高比例
        fixedBox: true, //固定截图框大小，不允许改变
        canMove: true, //上传图片是否可以移动
        canMoveBox: false, //截图框能否拖动
        original: false, //上传图片按照原始比例渲染
        centerBox: false, //截图框是否被限制在图片里面
        high: false, //是否按照设备的dpr 输出等比例图片
        infoTrue: true, //true为展示真实输出图片宽高，false展示看到的截图框宽高
        maxImgSize: 3000, //限制图片最大宽度和高度
        enlarge: 1, //图片根据截图框输出比例倍数
        mode: "contain", //图片默认渲染方式
      },
    };
  },
  methods: {
    //实时预览函数
    realTime(data) {
      this.previews = data;
      // console.log(data)
    },
    imgLoad(msg) {
      console.log(msg);
    },
    cropMoving(data) {
      console.log(data, "截图框当前坐标");
    },
    // 放大或缩小
    changeScale(num) {
      num = num || 1;
      this.$refs.cropper.changeScale(num);
    },
    // 左旋转
    rotateLeft() {
      this.$refs.cropper.rotateLeft();
    },
    // 右旋转
    rotateRight() {
      this.$refs.cropper.rotateRight();
    },
    // 完成截图
    saveImage() {
      this.$refs["cut-page"].style.display = "none";
      this.$refs.cropper.getCropBlob((data) => {
        console.log(data);
        this.$refs.image.src = window.URL.createObjectURL(data);
        this.image = data;
      });
    },
    // 选择的图片
    loadImage(e) {
      // console.log(e.target.result)
      let value = e.target.value;
      if (!value) return;
      if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(value)) {
        alert("图片须是jpeg，jpg，png，bmp格式");
        return;
      }
      this.option.img = window.URL.createObjectURL(e.target.files[0]);
    },
    // 请求地址列表数据
    async getAddressArr(province, city, county) {
      await axios
        .get("http://192.168.3.12:5000/data/address", {
          params: {
            province: province,
            city: city,
            county: county,
          },
        })
        .then((response) => {
          this.addressArr = response.data.data;
          // console.log(response.data)
          // this.info = response.status
        })
        .catch((error) => {
          console.log(error);
          // this.info = error
        });
    },
    // 学校地址失去焦点时触发，隐藏地址列表
    addressBlur() {
      this.$refs.address.style.display = "none";
    },
    // 点击学校地址时触发，显示地址列表
    showAddressArr() {
      this.$refs.address.style.display = "block";
      if (!this.addressArr.length) {
        this.getAddressArr();
      }
    },
    // 从地址列表中选择
    async selectAddress(value) {
      if (this.flag === 0) {
        if (this.province !== value) {
          this.province = value;
          this.city = "省辖市";
          this.county = "区/县";
          this.town = "乡镇/街道";
        }
        await this.getAddressArr(this.province);
        if (this.addressArr.length === 1) {
          this.city = this.addressArr[0];
          this.getAddressArr(this.province, this.city);
          this.flag = 2;
        } else {
          this.flag = 1;
        }
      } else if (this.flag === 1) {
        if (this.city !== value) {
          this.city = value;
          this.county = "区/县";
          this.town = "乡镇/街道";
        }
        this.getAddressArr(this.province, this.city);
        this.flag = 2;
      } else if (this.flag === 2) {
        if (this.county !== value) {
          this.county = value;
          this.town = "乡镇/街道";
        }
        this.getAddressArr(this.province, this.city, this.county);
        this.flag = 3;
      } else {
        this.town = value;
        if (this.province === this.city) {
          this.address = this.province + this.county + this.town;
        } else {
          this.address = this.province + this.city + this.county + this.town;
        }
        this.$refs.address.style.display = "none";
      }
    },
    selectProvince() {
      this.getAddressArr();
      this.flag = 0;
    },
    selectCity() {
      this.getAddressArr(this.province);
      this.flag = 1;
    },
    selectCounty() {
      this.getAddressArr(this.province, this.city);
      this.flag = 2;
    },
    showImageCut() {
      this.$refs["cut-page"].style.display = "block";
    },
    exitImageCut() {
      this.$refs["cut-page"].style.display = "none";
    },
    exitSchoolList() {
      this.$refs["school-list"].style.display = "none";
    },
    // 输入完成，关闭键盘
    inputDone() {
      document.activeElement.blur(); //关闭手机软键盘
    },
    upload() {
      clearTimeout(this.tid);
      if (!this.name.trim()) {
        this.info = "学校名称为空";
        this.tid = setTimeout(() => {
          this.info = "";
        }, 2000);
        console.log("name or address is none");
        return;
      }
      if (!this.tailAddress.trim() || this.address.trim() == "请输入学校地址") {
        this.info = "学校地址不完整";
        this.tid = setTimeout(() => {
          this.info = "";
        }, 2000);
        console.log("name or address is none");
        return;
      }
      let params = new FormData();
      if (this.image) {
        params.append("image", this.image);
      }
      params.append("name", this.name.trim());
      params.append("address", this.address + this.tailAddress.trim());
      console.log(params);
      axios
        .post("http://192.168.3.12:5000/user/school", params, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((response) => {
          console.log(response.data);
          this.info = response.data;
        })
        .catch((error) => {
          console.log(error);
          this.info = error;
        });
    },
    getSchool() {
      if (!this.name) return;
      axios
        .get("http://192.168.3.12:5000/user/school", {
          params: { school: this.name },
        })
        .then((response) => {
          this.schoolArr = response.data.data;
          if (this.schoolArr.length) {
            this.$refs["school-list"].style.display = "block";
          } else {
            this.$refs["school-list"].style.display = "none";
            this.info = "暂无贵校，请填写详细信息添加学校";
            this.tid = setTimeout(() => {
              this.info = "";
            }, 2000);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  computed: {},
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
  position: relative;
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
.options {
  display: block;
}
.cut {
  width: 3.15rem;
  height: 1.77rem;
  padding: 0.1rem 0.2rem;
}
.img {
  width: 3.15rem;
  height: 1.2rem;
  margin-top: 0.15rem;
  border: 1px solid #36b1bf;
}
.cut-btn {
  padding: 0.2rem;
}
.control {
  width: 1.6rem;
  float: left;
}
.file {
  width: 1.1rem;
  float: right;
}
.cut-btn button {
  display: inline;
  margin: 0.05rem;
  white-space: nowrap;
  cursor: pointer;
  border: 0;
  box-sizing: border-box;
  outline: none;
  border-radius: 4px;
  color: #fff;
}
.control button {
  width: 0.65rem;
  padding: 0.05rem 0.12rem;
  background-color: #4ad9d9;
}
.exit-btn {
  float: right;
  font-size: 0.2rem;
}
.exit-wrap {
  overflow: hidden;
}
#cut-page .exit-btn {
  margin-right: 0.1rem;
  margin-top: 0.1rem;
}
#app {
  margin: auto;
  width: 3.75rem;
  background: #36b1bf;
}
#name,
#head-address,
#tail-address,
#image {
  padding: 0.15rem 0;
}
#address,
#cut-page,
#school-list {
  display: none;
  position: absolute;
  left: 0;
  border-radius: 0.1rem;
  overflow: hidden;
  background: #e9f1df;
  z-index: 1;
}
#school-list {
  padding: 0 0.2rem;
  z-index: 2;
  width: 3.15rem;
}
#school-list .img {
  border: 0;
  margin: 0.05rem 0 0.15rem 0;
}
#address {
  top: 1rem;
  width: 2.95rem;
  padding: 0 0.3rem;
}

#address-title,
#school-title {
  width: 2.95rem;
  float: left;
  color: #f2385a;
}
#address-title,
.address-wrap .data {
  height: 0.35rem;
  overflow-x: auto;
  white-space: nowrap;
}
#address-options,
#school-options {
  overflow-y: auto;
  width: 3.4rem;
}
#address hr {
  margin: 0.05rem 0;
  border: 0;
}
#cut-page {
  top: 0;
  /* display: block; */
}
#save {
  background-color: #f2385a;
  padding: 0.05rem 0.2rem;
  width: 1rem;
  float: right;
}
#load {
  background-color: #f5a503;
  padding: 0.05rem 0.2rem;
  width: 1rem;
  margin-left: 0.5rem;
  float: right;
}
#info {
  position: absolute;
  top: 0.3rem;
  width: 3.15rem;
  text-align: center;
  padding-bottom: 0.15rem;
  color: #f2385a;
}
* {
  padding: 0;
  margin: 0;
}
body {
  color: #36b1bf;
  font-size: 0.16rem;
}
a {
  text-decoration: none;
  color: #36b1bf;
  background: transparent;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
input {
  width: 2.3rem;
  font-size: 0.16rem;
  border: 0;
  background: transparent;
  color: #36b1bf;
  text-align: end;
}
input[type="file"] {
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
}
.cut-btn label {
  position: relative;
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
