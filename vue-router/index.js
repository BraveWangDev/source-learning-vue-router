import install from './install'
import createMatcher from './create-matcher';
import HashHistory from './history/hash';
import BrowserHistory from './history/history';

class VueRouter {
    constructor(options) {  // 传入配置对象
        // 根据用户的配置 和当前请求的路径 渲染对应的组件 

        // 创建匹配器 可用用于后续的匹配操作 
        // 用户没有传递配置 就默认传入一个空数组  
        // 1.match通过路由来匹配组件 
        // 2.addRoutes 动态添加匹配规则 

        // 处理路由配置
        this.matcher = createMatcher(options.routes || []);
        // 根据不同的路径进行切换
        options.mode = options.mode || 'hash'; // 默认没有传入就是hash模式
        switch (options.mode) {
            case 'hash':
                this.history = new HashHistory(this);
                break;
            case 'history':
                this.history = new BrowserHistory(this);
                break;
        }
    }
    // 路由初始化方法，供 install 安装时调用
    // 监听 hash 值变化，跳转到对应的路径中
    init(app) {
        // 当前的history实例：可能是HashHistory，也可能是BrowserHistory；
        const history = this.history;
        // 设置监听器：内部调用的是不同子类中的实现
        const setUpListener = () => {
            history.setupListener();
        }
        // 初始化时，获取当前hash值进行跳转, 并设置监听器
        history.transitionTo(
            history.getCurrentLocation(), // 获取当前的位置
            setUpListener
        )
    }
}
VueRouter.install = install;

// vue-router 插件将导出一个类，外部可通过 new Router({}) 创建实例并使用
export default VueRouter;