import Vue from 'vue';
// import Router from './node_modules/vue-router';  // 官方的 vue-router
import Router from './vue-router';  // 自己的 vue-router
import Home from './views/Home';
import Mine from './views/Mine';

// 通过 Vue.use 使用 Router 插件：
// 全局注册两个组件：router-link、router-view；
// 为实例提供两个原型属性：$router，$route；
Vue.use(Router);

// 路由:不同的路径 渲染不同的组件 
// 路由导出后，需要被注册到 Vue 实例中
let router = new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',   // 路径
      // name:'', // 名字
      component: Home
    },
    {
      path: '/mine',
      // name:'',
      component: Mine,
      children: [{  // 子路由
        path: 'user', // 如果是 /user 会被认为根路径，所以不能有/
        component: {
          render: (h) => <h1>个人信息</h1>   // JSX
        }
      },
      {
        path: 'address',
        component: {
          render: (h) => <h1>地址管理</h1>
        }
      }
      ]
    }
  ]
});

// 导航被触发。
// 在失活的组件里调用 beforeRouteLeave 守卫。
// 调用全局的 beforeEach 守卫。
// 在重用的组件里调用 beforeRouteUpdate 守卫 (2.2+)。
// 在路由配置里调用 beforeEnter。
// 解析异步路由组件。
// 在被激活的组件里调用 beforeRouteEnter。
// 调用全局的 beforeResolve 守卫 (2.5+)。
// 导航被确认。
// 调用全局的 afterEach 钩子。
// 触发 DOM 更新。
// 调用 beforeRouteEnter 守卫中传给 next 的回调函数，创建好的组件实例会作为回调函数的参数传入。

// 当导航变化时,将依次执行以下两个函数
router.beforeEach((from,to,next)=>{ 
  console.log(1);
  setTimeout(() => {
      next();
  }, 1000);
})
router.beforeEach((from,to,next)=>{ 
  console.log(2);
  setTimeout(() => {
      next();
  }, 1000);
})

export default router