import Vue from 'vue';
import router from './router';  // 导入路由配置
import App from './App.vue';

// 创建 Vue 实例
// 备注：若项目中未提供相关文件，将采用 vue-cli 自带的作为默认文件：如 el:'#app'
const vm = new Vue({
  el:'#app',
  router, // 将路由实例注册到 Vue 实例中
  render:(h)=>{  // h 相当于 _c 即 createElement
    return h(App);
  }
});
