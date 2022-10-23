<template>
  <div>
    username
    <input type="text" v-model="username" />
  </div>
  <div>
    password
    <input type="password" name="password" id="password" v-model="password" />
  </div>
  <div>
    <input type="submit" value="Sing in" @click="singin" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const router = useRouter();

const username = ref("江离");
const password = ref("123456");

function singin() {
  axios
    .post("http://192.168.3.12:5000/user/signin", {
      username: username.value,
      password: password.value,
    })
    .then((response) => {
      let data = response.data;
      if (data.msg === "success") {
        localStorage.setItem("user", JSON.stringify(data.user));
        // localStorage.setItem("token", data.token);
        router.push({ name: "personal" });
      }else{
        console.log(data.msg);
      }
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    });
}
</script>

<style scoped>
div {
  /* background: aliceblue; */
  color: #000;
}
input {
  border: 1px solid #000;
  color: #000;
}
</style>
