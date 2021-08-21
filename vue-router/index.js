import install from './install'
import createMatcher from './create-matcher';
// import HashHistory from './history/hash';
// import BrowserHistory from './history/history';

class VueRouter {
    constructor(options) {  // 传入配置对象
        // 根据用户的配置 和当前请求的路径 渲染对应的组件 

        // 创建匹配器 可用用于后续的匹配操作 
        // 用户没有传递配置 就默认传入一个空数组  
        // 1.match通过路由来匹配组件 
        // 2.addRoutes 动态添加匹配规则 

        // 处理路由配置
        this.matcher = createMatcher(options.routes || []);
    }
    // 路由初始化方法，供 install 安装时调用
    init(app) { 
            
    }
}
VueRouter.install = install;

// vue-router 插件将导出一个类，外部可通过 new Router({}) 创建实例并使用
export default VueRouter;