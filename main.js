import Vue from 'vue';

// 创建 Vue 实例
// 若没有提供相关文件，将会采用 vue-cli 中自带的作为默认文件：如 el:'#app'
const vm = new Vue({
  el:'#app',
  render:(h)=>{  // h 相当于 _c 即 createElement
    return h('h1', {}, 'Hello Vue Router');
  }
});
