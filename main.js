import Vue from 'vue';
import router from './router'; // 导入配置完成的路由实例
import App from './App.vue';

// 备注：若项目中未提供相关文件，将采用 vue-cli 自带的作为默认文件：如 el:'#app'
const vm = new Vue({
  el:'#app',
  name:'root',
  router, // 将路由实例注册到 Vue 实例中
  render:(h)=>{  // h 相当于 _c 即 createElement
    return h(App);
  }
});
