<template>
  <div id="address">
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
        <span @click="selectTown">
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
</template>

<script setup>
import axios from "axios";
import { ref, reactive, onMounted } from "vue";

onMounted(() => {
  getAddressArr();
})

const emit = defineEmits(["showAddressArrC", "getAddress"])

let flag = 0;

const province = ref("省/直辖市");
const city = ref("省辖市");
const county = ref("区/县");
const town = ref("乡镇/街道");
const addressArr = ref([]);

// 请求地址列表数据
async function getAddressArr(province, city, county) {
    // addressArr.value = [3,2,5,6];
  await axios
    .get("http://192.168.3.12:5000/data/address", {
      params: {
        province: province,
        city: city,
        county: county,
      },
    })
    .then((response) => {
      addressArr.value = response.data.data;
      // console.log(response.data)
      // this.info = response.status
    })
    .catch((error) => {
      console.log(error);
      // this.info = error
    });
}

// 从地址列表中选择
async function selectAddress(value) {
  if (flag === 0) {
    if (province.value !== value) {
      province.value = value;
      city.value = "省辖市";
      county.value = "区/县";
      town.value = "乡镇/街道";
    }
    await getAddressArr(province.value);
    if (this.addressArr.length === 1) {
      city.value = this.addressArr[0];
      getAddressArr(province.value, city.value);
      flag = 2;
    } else {
      flag = 1;
    }
  } else if (flag === 1) {
    if (city.value !== value) {
      city.value = value;
      county.value = "区/县";
      town.value = "乡镇/街道";
    }
    getAddressArr(province.value, city.value);
    flag = 2;
  } else if (flag === 2) {
    if (county.value !== value) {
      county.value = value;
      town.value = "乡镇/街道";
    }
    getAddressArr(province.value, city.value, county.value);
    flag = 3;
  } else {
    let address
    town.value = value;
    if (province.value === city.value) {
      address = province.value + county.value + town.value;
    } else {
      address = province.value + city.value + county.value + town.value;
    }
    emit("getAddress", address);
    emit("showAddressArrC", false);
  }
}
function selectProvince() {
  getAddressArr();
  flag = 0;
}
function selectCity() {
  getAddressArr(province.value);
  flag = 1;
}
function selectCounty() {
  getAddressArr(province.value, city.value);
  flag = 2;
}
function selectTown() {
  getAddressArr(province.value, city.value, county.value);
  flag = 3;
}

function addressBlur() {
  emit("showAddressArrC", false)
}
</script>

<style scoped>
.exit-btn {
  float: right;
  font-size: 0.2rem;
}
.exit-wrap {
  overflow: hidden;
}
.address-wrap {
  height: 0.2rem;
  overflow: hidden;
}
.options {
  display: block;
}
#address {
  /* display: none; */
  top: 1.6rem;
  bottom: 0.1rem;
  width: 2.95rem;
  padding: 0 0.3rem;
  position: absolute;
  left: 0.1rem;
  border-radius: 0.1rem;
  overflow: hidden;
  background: #e9f1df;
  z-index: 1;
}
#address-title {
  width: 2.95rem;
  float: left;
  color: #f2385a;
  height: 0.35rem;
  overflow-x: auto;
  white-space: nowrap;
}
#address-title span {
    margin-right: 0.1rem;
}
#address-options {
  overflow-y: auto;
  width: 3.4rem;
  max-height: calc(100vh - 2.35rem);
}
#address hr {
  margin: 0.05rem 0;
  border: 0;
}
</style>
