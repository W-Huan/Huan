<template>
  <div ref="cut_page" id="cut-page">
    <div class="exit-wrap">
      <span class="exit-btn" @click.stop="exitImageCut">×</span>
    </div>
    <div class="cropper">
      <VueCropper
        ref="croppers"
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
      </VueCropper>
    </div>
    <div
      class="show-preview"
      :style="{
        width: previews.w + 'px',
        height: previews.h + 'px',
        overflow: 'hidden',
        marginBottom: '0.2rem',
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
        <button @click="refreshCrop">☯ 重置</button>
        <button @click="rotateLeft">↺ 左旋</button>
        <button @click="rotateRight">↻ 右旋</button>
        <button @click="clearCrop">⊗ 清除</button>
      </div>
      <div class="file">
        <label for="uploadImage">
          <button id="load">➢ 选择</button>
          <input
            type="file"
            ref="imageFile"
            accept="image/jpeg, image/png"
            @change="loadImage($event)"
          />
        </label>
        <button id="save" @click="saveImage">✃ 完成</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import "vue-cropper/dist/index.css";
import { VueCropper } from "vue-cropper";
import { reactive, ref } from "vue";

const emit = defineEmits(["showImageCutC","showImage"]);

const option = reactive({
  img: "", //裁剪图片的地址
  outputSize: 1, //裁剪生成图片的质量(可选0.1 - 1)
  outputType: "png", //裁剪生成图片的格式（jpeg || png || webp）
  info: false, //图片大小信息
  canScale: true, //图片是否允许滚轮缩放
  autoCrop: true, //是否默认生成截图框
  autoCropWidth: 315, //默认生成截图框宽度
  autoCropHeight: 120, //默认生成截图框高度
  fixed: true, //是否开启截图框宽高固定比例
  fixedNumber: [1000, 382], //截图框的宽高比例
  full: false, //false按原比例裁切图片，不失真
  fixedBox: true, //固定截图框大小，不允许改变
  canMove: true, //上传图片是否可以移动
  canMoveBox: false, //截图框能否拖动
  original: false, //上传图片按照原始比例渲染
  centerBox: false, //截图框是否被限制在图片里面
  high: false, //是否按照设备的dpr 输出等比例图片
  infoTrue: false, //true为展示真实输出图片宽高，false展示看到的截图框宽高
  maxImgSize: 3000, //限制图片最大宽度和高度
  enlarge: 1, //图片根据截图框输出比例倍数
  mode: "contain", //图片默认渲染方式
});
const previews = ref({});

const croppers = ref(null);

const cut_page = ref(null);

//初始化函数
function imgLoad(msg) {
  console.log(msg);
};
//图片缩放
function changeScale(num) {
  num = num || 1;
  croppers.value.changeScale(num);
};
//向左旋转
function rotateLeft() {
  croppers.value.rotateLeft();
};
//向右旋转
function rotateRight() {
  croppers.value.rotateRight();
};
// 重置
function refreshCrop() {
  croppers.value.refresh()
};
// 清除
function clearCrop() {
  option.img = ""
};
//实时预览函数
function realTime(data) {
  previews.value = data;
};
//选择图片
function loadImage(e) {
  let value = e.target.value;
  if (!value) return;
  if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(value)) {
    alert("图片须是jpeg，jpg，png，bmp格式");
    return;
  }
  this.option.img = window.URL.createObjectURL(e.target.files[0]);
};
// 完成截图
function saveImage() {
  croppers.value.getCropBlob((data) => {
    emit("showImage", data)
    exitImageCut()
  });
};
function exitImageCut() {
  emit("showImageCutC", false);
}
</script>

<style scoped>
#cut-page {
  /* display: none; */
  position: absolute;
  top: 0.7rem;
  bottom: 0.1rem;
  left: 0.1rem;
  border-radius: 0.1rem;
  overflow: hidden;
  background: #e9f1df;
  z-index: 2;
  padding: 0 0.2rem;
  width: 3.15rem;
}
.cropper {
  width: 3.15rem;
  height: 1.77rem;
  margin: 0.1rem 0;
}

.control {
  width: 2.15rem;
  float: left;
}
.file {
  width: 1rem;
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
  width: 0.6rem;
  padding: 0.05rem;
  background-color: #4ad9d9;
}
.exit-btn {
  float: right;
  font-size: 0.2rem;
}
.exit-wrap {
  overflow: hidden;
}
.cut-btn label {
  position: relative;
}
/* #cut-page .exit-btn {
  margin-right: 0.1rem;
  margin-top: 0.1rem;
} */
#save {
  background-color: #f2385a;
  padding: 0.05rem;
  width: 0.9rem;
}
#load {
  background-color: #f5a503;
  padding: 0.05rem;
  width: 0.9rem;
}
input[type="file"] {
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
}
</style>
