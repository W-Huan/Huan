import { createApp } from 'vue'
import router from './router'
import './style.css'
import App from './App.vue'

const app = createApp(App)
app.use(router)
app.mount('#app')

const deviceWidth = document.documentElement.clientWidth;   // 375
const deviceHeight = document.documentElement.clientHeight; // 667
// 计算根字体大小
const width = (deviceWidth < 540) ? deviceWidth : 540
// console.log(width)
const rootFontSize = width * 100 / 375;
// 设置根字体大小
document.documentElement.style.fontSize = rootFontSize + 'px';
// 计算address块高度
const appHeight = deviceHeight / rootFontSize
document.querySelector('#app').style.minHeight = (appHeight-1.12) + 'rem';