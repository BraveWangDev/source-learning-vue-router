import Vue from 'vue';
import Router from './node_modules/vue-router';
import Home from './views/Home';
import Mine from './views/Mine';

// 通过 Vue.use 使用 Router 插件：
// 全局注册两个组件：router-link、router-view；
// 为实例提供两个原型属性：$router，$route；
Vue.use(Router);

// 路由:不同的路径 渲染不同的组件 
// 路由导出后，需要被注册到 Vue 实例中
export default new Router({
  mode:'hash',
  routes:[
    {
      path:'/',   // 路径
      // name:'', // 名字
      component: Home
    },{
      path:'/mine',
      // name:'',
      component: Mine,
      children: [{  // 子路由
            path: 'user', // 如果是 /user 会被认为根路径，所以不能有/
            component: {
              render:(h)=><h1>个人信息</h1>   // JSX
            }
        },
        {
            path: 'address',
            component: {
              render:(h)=><h1>地址管理</h1>  
            }
        }
      ]
    }
  ]
});