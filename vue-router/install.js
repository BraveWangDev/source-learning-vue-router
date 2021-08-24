// 用于存储插件安装时传入的 Vue 并向外抛出，提供给插件中的其他文件使用
// export 的特点：如果导出的值发生变化，外部会取得变化后的新值；
export let _Vue;

/**
 * 插件安装入口 install 逻辑
 * @param {*} Vue     Vue 的构造函数
 * @param {*} options 插件的选项
 */
export default function install(Vue, options) {

  // 插件安装的入口
  _Vue = Vue; // 抛出 Vue 供其他文件使用

  // 通过生命周期，为所有组件都混入一个属性 router
  Vue.mixin({
    beforeCreate() { // this 指向当前组件实例
      // 将 new Vue 时传入的 router 实例共享给所有子组件
      if (this.$options.router) {// 根组件才有 router
        // console.log('父亲', this.$options.name)
        this._routerRoot = this; // 为根组件添加 _routerRoot 属性指向根组件自己
        this._router = this.$options.router;// this._router 指向 this.$options.router 
        // 在根组件中，调用路由实例上的 init 方法，完成插件的初始化
        this._router.init(this); // this 为根实例

        // 目标：让 this._router.history.current 成为响应式数据；
        // 作用：current用于渲染时会进行依赖收集，当current更新时可以触发视图更新；
        // 方案：在根组件实例上定义响应式数据 _route，将this._router.history.current对象中的属性依次代理到 _route 上；
        // 优势：当current对象中的任何属性发生变化时，都会触发响应式更新；
        // Vue.util.defineReactive: Vue 构造函数中提供的工具方法,用于定义响应式数据
        Vue.util.defineReactive(this, '_route', this._router.history.current);
      } else { // 子组件
        // console.log('儿子', this.$options.name)
        // 如果是子组件，就去找父亲上的_routerRoot属性，并继续传递给儿子
        this._routerRoot = this.$parent && this.$parent._routerRoot;
      }
      // 这样，所有组件都能够通过 this._routerRoot._router 获取到同一个 router 实例；
    }
  });

  Vue.component('router-link', {
    render: h => h('a', {}, '')
  });
  Vue.component('router-view', {
    render: h => h('div', {}, '')
  });
  Vue.prototype.$route = {};
  Vue.prototype.$router = {};
}


